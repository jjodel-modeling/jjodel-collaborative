import http from 'http';
import {Server, Socket} from 'socket.io';
import mongoose from 'mongoose';
import U from './common/u';
import {ActionsController} from "./controllers/actions";

/* Database */
(async function() {
    mongoose.Promise = Promise;
    let connection = false;
    while(!connection) {
        try {
            await mongoose.connect(process.env['MONGODB_URL'], {dbName: 'jjodel'});
            console.log('DB Connection done.');
            connection = true;
        } catch (error) {
            console.log(`DB Connection error (${process.env['MONGODB_URL']}), waiting 30 seconds...`);
            await U.sleep(30);
        }
    }

    /* Web Socket */
    const server = http.createServer();
    const io = new Server(server, {path: '/collaborative'});
    server.listen(5001);
    let users = 0;
    io.on('connection', async(socket: Socket) => {
        const project = socket.handshake.query.project as string;
        if(!project) return; users += 1;

        socket.join(project);
        console.log(socket.id + ' Connected to Project: ' + project);

        const actions = await ActionsController.get(project);
        for(const action of actions) {
            socket.emit('pullAction', action);
            console.log('INIT: Sending ' + action.timestamp);
        }

        socket.on('disconnect', () => {
            users -= 1;
            if(users === 0) {
                ActionsController.delete(project);
                console.log('Cleaning Actions from Project: ' + project);
            }
            socket.leave(project);
            console.log(`${socket.id} Disconnection (users=${users})`);
        });

        socket.on('pushAction', async(action) => {
            socket.broadcast.to(project).emit('pullAction', action);
            await ActionsController.create(action, project);
            console.log('Sending ' + action.timestamp);
        })
    });

})();
