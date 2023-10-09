import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import {MongoClient} from 'mongodb';
import express from 'express';
import {RoomRouter} from './routes/room';

/* Web Socket */
const server = createServer();
const io = new Server(server, {path: '/collaborative'});

io.on('connection', async(socket: Socket) => {
    const code = socket.handshake.query.code as string;

    const client = await MongoClient.connect(process.env.MONGODB_URL + '/jjodel')
    const db = client.db('rooms');
    const collection = await db.collection(code);

    socket.join(code);
    console.log(socket.id + ' Connection with code: ' + code);

    socket.on('disconnect', () => {
        client.close();
        socket.leave(code);
        console.log(socket.id + ' Disconnection');
    });

    socket.on('pushAction', async(action) => {
        socket.broadcast.to(code).emit('pullAction', action);
        await collection.insertOne(action);
        console.log('Sending ' + JSON.stringify(action));
    })
});

server.listen(5001);

/* Rest */
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/collaborative/rooms', RoomRouter)
app.listen(5002);
