const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New user connected') 

    socket.emit('msg', 'Welcome to MyLitleChat')

    //Broadcast when a user connects
    socket.broadcast.emit('msg', 'A user has joined the chat');

    //Runs when client dissconects
    socket.on('disconnect', () => {
        io.emit('msg', 'A user has left the chat');
    })

    //Listen for chatMsg
    socket.on('chatMsg', (msg)=> {
        io.emit('msg', msg);
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));