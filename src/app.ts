import {createServer} from 'http';
import {Server, Socket} from 'socket.io';

const server = createServer();
const io = new Server(server, {
    // delete this line (setupProxy.js on client)
    cors: {origin: 'http://localhost:3000'}
});

io.on('connection', (socket: Socket) => {
    const code = socket.handshake.query.code as string;
    socket.join(code);
    console.log(socket.id + ' Connection with code: ' + code);
    socket.on('disconnect', () => {
        socket.leave(code);
        console.log(socket.id + ' Disconnection');
    });
    socket.on('pushAction', (action) => {
        socket.broadcast.to(code).emit('pullAction', action);
        console.log('Sending ' + JSON.stringify(action));
    })
});




server.listen(5000);
