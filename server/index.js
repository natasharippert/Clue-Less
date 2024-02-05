const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create a new express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the HTTP server object
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

// Listen for new connections and print a message to the console
io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server on the specified port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
