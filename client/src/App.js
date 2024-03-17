import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './components/SocketContext';
import './App.css';
// Import components
import MainMenu from './components/MainMenu';
import GameLobby from './components/GameLobby'; 
import GameBoard from './components/Board';
import MessageBoard from './components/MessageBoard';
import Controls from './components/Controls';
import CardDisplay from './components/CardDisplay';
import Notepad from './components/Notepad';

function App() {
  const [sessionId, setSessionId] = useState(null); // State to track the current session ID
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [participants, setParticipants] = useState([]);
  const socket = useContext(SocketContext);
  const [dealtCards, setDealtCards] = useState([]);

  useEffect(() => {
    socket.on('updatePlayers', setParticipants); // Update participants list on event

    socket.on('gameIsStarting', () => {
      setGameStarted(true);
      // You might want to deal cards here or ensure all game setup logic is triggered
  });

    socket.on('dealtCards', (cards) => {
        setDealtCards(cards); // Store dealt cards
    });

    return () => {
        socket.off('updatePlayers', setParticipants);
        socket.off('gameIsStarting');
        socket.off('dealtCards');
    };
}, [socket]);

  return (
    <div class="App">
      
      {!sessionId ? (
        <MainMenu setSessionId={setSessionId} setParticipants={setParticipants}/>
      ) : !gameStarted ? (
        <GameLobby sessionId={sessionId} participants={participants} onStartGame={() => setGameStarted(true)} />
      ) : (
        // Game view
        <>
        <h2>Clue-Less Game</h2>
          <div class="top-row">
            <div class="left-side-main">
              <MessageBoard sessionId={sessionId}/>
              <CardDisplay cards={dealtCards} />
            </div>
            <div class="right-side-main">
              <GameBoard />
            </div> 
        </div>
        <div class="bottom-row">
          <Controls />
          
        </div>
        <Notepad />
        </>
      )}
    </div>
  );
}

export default App;
