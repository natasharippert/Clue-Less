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
import CharacterDisplay from './components/Character';

function App() {
  const [sessionId, setSessionId] = useState(null); // State to track the current session ID
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [participants, setParticipants] = useState([]);
  const socket = useContext(SocketContext);
  const [dealtCards, setDealtCards] = useState([]);
  const [character, setCharacter] = useState(null);

  const handleReceiveMessage = (message) => {
      console.log("Message received:", message);
      setMessages(prevMessages => [...prevMessages, message]);
   };
   
   socket.on('receiveMessage', handleReceiveMessage);
 
   

  useEffect(() => {
    socket.on('updatePlayers', setParticipants); // Update participants list on event

    socket.on('gameIsStarting', () => {
      setGameStarted(true);
      // You might want to deal cards here or ensure all game setup logic is triggered
  });

    socket.on('dealtCards', (cards) => {
        setDealtCards(cards); // Store dealt cards
    });

    socket.on('assignCharacter', (character) => {
      console.log('Received character:', character);
      if (character) {
          setCharacter(character);
      } else {
          console.log('Character data is null or undefined');
      }
  });

    return () => {
        socket.off('updatePlayers', setParticipants);
        socket.off('gameIsStarting');
        socket.off('dealtCards');
        socket.off('assignCharacter');
    };
}, [socket]);

console.log('Character in state:', character);

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
        {character && <CharacterDisplay character={character} />}
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
          <Controls          
            characters={character_cards} 
            rooms={room_cards}           
            weapons={weapon_cards}       
            onMakeMove={(dir) => {
               console.log(`Moving ${dir}`);
            }}
            socket={socket}
            sessionId={sessionId}
            playerName={playerName}
         />
          
        </div>
        <Notepad />
        </>
      )}
    </div>
  );
}

export default App;
