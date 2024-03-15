import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../SocketContext'; // Adjust if necessary

const MainMenu = ({ setSessionId }) => {
  const [inputSessionId, setInputSessionId] = useState('');
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Setup socket event listeners for gameStarted and joinedGame
    socket.on('gameStarted', (id) => {
      console.log(`Game started with session ID: ${id}`);
      setSessionId(id);
    });

    socket.on('joinedGame', (id) => {
      console.log(`Joined game with session ID: ${id}`);
      setSessionId(id);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('gameStarted');
      socket.off('joinedGame');
    };
  }, [socket, setSessionId]); // Removed 'currentSessionId' dependency as it's no longer used

  const startNewGame = () => {
    console.log('Attempting to start a new game...');
    socket.emit('startNewGame');
  };

  const joinGame = () => {
    console.log(`Attempting to join game with ID: ${inputSessionId}`);
    socket.emit('joinGame', inputSessionId);
  };

  return (
    <div>
      <button onClick={startNewGame}>Start New Game</button>
      <input
        value={inputSessionId}
        onChange={(e) => setInputSessionId(e.target.value)}
      />
      <button onClick={joinGame}>Join Game</button>
    </div>
  );
};

export default MainMenu;
