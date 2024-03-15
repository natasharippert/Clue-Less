const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // For generating unique session IDs
const {
    Card,
    character_cards,
    weapon_cards,
    room_cards,
    selectRandomCard,
    WinningHand,
    ShuffleDeck,
    DealCards,
    ResetDeck,
} = require('./cardLogic');
// Create a new express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the HTTP server object
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Allow your client origin
      methods: ["GET", "POST"], // Allowable methods
    },
  });

const PORT = process.env.PORT || 4000;

//store game sessions
const gameSessions = {};

// Listen for new connections and print a message to the console
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('startGame', (sessionId) => {
        const session = gameSessions[sessionId];
        if (session && session.players.includes(socket.id)) { // Simple validation
            console.log(`Starting game for session: ${sessionId}`);
            io.to(sessionId).emit('gameIsStarting');
            WinningHand(); // Select winning hand
            ShuffleDeck(); // Shuffle remaining cards
            const hands = DealCards(session.players.length);
            session.players.forEach((playerId, index) => {
                io.to(playerId).emit('dealtCards', hands[index]);
            });
        } else {
            // Handle error: session doesn't exist or player not in session
            console.log(`Error starting game for session: ${sessionId}`);
        }
    });

    socket.on('startNewGame', () => {
        console.log('Received startNewGame event');
        const sessionId = uuidv4(); // Generate a unique session ID
        gameSessions[sessionId] = { players: [socket.id] }; // Initialize session
        socket.join(sessionId); // Join the newly created session
        socket.emit('gameStarted', sessionId); // Notify the client with the session ID
        console.log(`New game started with session ID: ${sessionId}`);
    });

    socket.on('joinGame', (sessionId) => {
        if (gameSessions[sessionId]) { // Check if the session exists
            gameSessions[sessionId].players.push(socket.id); // Add player to the session
            socket.join(sessionId); // Join the session
            socket.emit('joinedGame', sessionId); // Confirm joining
            io.to(sessionId).emit('updatePlayers', gameSessions[sessionId].players); // Update all clients in the session
            console.log(`Player joined session: ${sessionId}`);
        } else {
            socket.emit('errorJoining', 'Session does not exist.');
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        // Here, you would ideally also handle removing players from sessions on disconnect
    });
});

// Start the server on the specified port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
