import http from 'http';
import {Server, Socket} from 'socket.io';
import mongoose from 'mongoose';
import U from './common/u';
import {ActionsController} from './controllers/actions';
import Action from './data/Action';

/* Web Socket */
const PORT = 5001;
const server = http.createServer();
const io = new Server(server, {
    cors: {origin: 'http://localhost:3000'},
    path: '/collaborative'
});
server.listen(PORT);
console.log('********** JJodel Collaborative Server v1.2  **********');
console.log(`Server Listening on port ${PORT}.`);

(async function() {
    /* Database */
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

    const users = {};
    io.on('connection', async(socket: Socket) => {
        const project = socket.handshake.query.project as string;
        if(!project) return;
        if(!users[project]) users[project] = 0;

        /* Adding the user to the channel. */
        users[project] += 1;
        socket.join(project);
        console.log('New User Connected to Project: ' + project);
        const action = Action.SET_FIELD(project, 'onlineUsers', '=', users[project], false);
        /* Since the user is connecting and NOT connected, I cannot use socket.to(project).emit */
        socket.emit('pullAction', action);
        socket.broadcast.to(project).emit('pullAction', action);

        /* Pulling actions. */
        const actions = await ActionsController.get(project);
        for(const action of actions) {
            socket.emit('pullAction', action);
            console.log(`Initializing: ${Action.toString(action)}`);
        }

        socket.on('disconnect', () => {
            /* Removing the user from the channel. */
            users[project] -= 1;
            const action = Action.SET_FIELD(project, 'onlineUsers', '=', users[project], false);
            socket.broadcast.to(project).emit('pullAction', action);
            if(users[project] === 0) {
                ActionsController.delete(project);
                console.log('Cleaning Actions from Project: ' + project);
            }
            socket.leave(project);
            console.log(`${socket.id} Disconnection (users=${users[project]})`);
        });

        socket.on('pushAction', async(action) => {
            /* Sharing the action. */
            socket.broadcast.to(project).emit('pullAction', action);
            await ActionsController.create(action, project);
            console.log(`${action['sender']} is Sending: ${Action.toString(action)}`);
        })
    });

})();
