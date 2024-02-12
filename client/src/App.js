import React, { useEffect } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import GameBoard from './components/Board';
import MessageBoard from './components/MessageBoard';
import Controls from './components/Controls';
import CardDisplay from './components/CardDisplay';
import Notepad from './components/Notepad';

const ENDPOINT = "http://127.0.0.1:4000"; // Adjust if your server's location differs

function App() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    return () => socket.disconnect(); // Clean up on component unmount
  }, []);

  return (
    <div className="App">
      <h2>Clue-Less Game</h2>
      <div className="top-row">
        <MessageBoard />
        <GameBoard />
      </div>
      <div className="bottom-row">
        <Controls />
        <CardDisplay />
      </div>
      <Notepad />
    </div>
  );
}

export default App;
