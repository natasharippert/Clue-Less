// GameLobby.js
import React, { useContext } from 'react';
import { SocketContext } from './SocketContext';
import { character_cards } from './Card';

const GameLobby = ({ sessionId, participants, onStartGame }) => {
  const socket = useContext(SocketContext);

  const handleStartGame = () => {
    socket.emit('startGame', sessionId); // Notify the server to start the game
    onStartGame(); // Client-side transition to game view
  };

  return (
    <div>
      <a href="MainMenu.js" class="back-button">
        <h2>Back</h2>
      </a>
      <h1>Game Lobby</h1>
      <p>Session Code: {sessionId}</p>
      <br></br><br></br><br></br>
      <div class="lobby-middle">
        <div class="participants">
            <h3>Participants:</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
        </div>
        <div class="characters">
        <h3>Select your player:</h3>
          {character_cards.map((card, index) => (
              <img
                key={index}
                src={card.imageURL}
                alt={card.name}
                style={{ width: '50px', margin: '10px', cursor: 'pointer' }}
              />
            ))}
        </div>
      </div><br></br><br></br><br></br>
      <button class="menu-button" onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default GameLobby;
