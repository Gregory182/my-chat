const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utils/messages.js')

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log(socket.id) 

   
    socket.emit('msg', formatMessage('Bocik', 'Welcome to MyLitleChat'));


    //Broadcast when a user connects
    socket.broadcast.emit('msg', formatMessage('Bocik','A user has joined the chat'));
    
    //Listen for chatMsg
    socket.on('chatMsg', (msg)=> {
        io.emit('msg',formatMessage('Greg',msg));
    });

    //Runs when client dissconects
    socket.on('disconnect', () => {
        io.emit('msg', formatMessage('Bocik','A user has left the chat'));
        console.log(`wylogowano ${socket.id}`)
    })

});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));