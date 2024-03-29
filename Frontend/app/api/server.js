// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const rooms = new Set();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createRoom', () => {
        const roomName = generateRoomName();
        rooms.add(roomName);
        socket.join(roomName);
        socket.emit('roomCreated', roomName);
    });

    socket.on('joinRoom', (roomName) => {
        if (rooms.has(roomName)) {
            socket.join(roomName);
            io.to(roomName).emit('userJoined', socket.id);
        } else {
            socket.emit('invalidRoom');
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const generateRoomName = () => {
    return Math.random().toString(36).substring(7); // Generate a random room name
};

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
