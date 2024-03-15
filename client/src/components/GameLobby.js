// GameLobby.js
import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const GameLobby = ({ sessionId, participants, onStartGame }) => {
  const socket = useContext(SocketContext);

  const handleStartGame = () => {
    socket.emit('startGame', sessionId); // Notify the server to start the game
    onStartGame(); // Client-side transition to game view
  };

  return (
    <div>
      <h2>Game Lobby</h2>
      <p>Session Code: {sessionId}</p>
      <h3>Participants:</h3>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default GameLobby;
