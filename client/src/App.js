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
class Card {
  constructor(type, name, imageURL) {
      this.type = type;
      this.name = name;
      this.imageURL = imageURL;
  }

}

// six characters
const character_cards = [
  new Card('character', 'Jim', 'images/card_jim.png'),
  new Card('character', 'Pam', 'images/card_pam.png'),
  new Card('character', 'Dwight', 'images/card_dwight.png'),
  new Card('character', 'Angela', 'images/card_angela.png'),
  new Card('character', 'Michael', 'images/card_michael.png'),
  new Card('character', 'Andy', 'images/card_andy.png')
];

// six weapons
const weapon_cards = [
  new Card('weapon', 'Dundie Trophy', 'images/card_trophy.png'),
  new Card('weapon', 'Poisoned Pretzel', 'images/card_pretzel.png'),
  new Card('weapon', 'Coffee Mug', 'images/card_mug.png'),
  new Card('weapon', 'Bacon Grill', 'images/card_grill.png'),
  new Card('weapon', 'Dunder Mifflin Paper', 'images/card_paper.png'),
  new Card('weapon', 'Rabid Bat', 'images/card_bat.png')
]

// nine rooms
const room_cards = [
  new Card('room', 'Reception', 'images/card_reception.png'),
  new Card('room', 'Conference Room', 'images/card_conference.png'),
  new Card('room', 'Break Room', 'images/card_break.png'),
  new Card('room', 'Annex', 'images/card_annex.png'),
  new Card('room', 'Accounting', 'images/card_accounting.png'),
  new Card('room', 'Parking lot', 'images/card_parking.png'),
  new Card('room', 'Warehouse', 'images/card_warehouse.png'),
  new Card('room', 'Kitchen', 'images/card_kitchen.png'),
  new Card('room', 'Michaels Office', 'images/card_office.png'),
]

function App() {
  const [sessionId, setSessionId] = useState(null); // State to track the current session ID
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [participants, setParticipants] = useState([]);
  const socket = useContext(SocketContext);
  const [dealtCards, setDealtCards] = useState([]);
  const [character, setCharacter] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('updatePlayers', setParticipants); // Update participants list on event

    socket.on('gameIsStarting', () => {
      setGameStarted(true);
      // You might want to deal cards here or ensure all game setup logic is triggered
  });

  socket.on('suggestionMade', data => {
    setMessages(messages => [...messages, `Suggestion: ${data.character} in the ${data.room} with the ${data.weapon}`]);
});

  socket.on('joinGame', (sessionId) => {
    console.log(`Joining session: ${sessionId}`); // Ensure this is logging correctly
    socket.join(sessionId);
  });

//   socket.on('receiveMessage', message => {
//     setMessages(messages => [...messages, message]);
// });

const handleReceiveMessage = (message) => {
  console.log("Message received:", message);
  setMessages(prevMessages => [...prevMessages, message]);
};

socket.on('receiveMessage', handleReceiveMessage);

  

    socket.on('dealtCards', (cards) => {
        setDealtCards(cards); // Store dealt cards
    });

    // socket.on('receiveMessage', (message) => {
    //   console.log('New message received:', message); // Debugging output
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

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
        socket.off('suggestionMade');
        socket.off('receiveMessage');
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
        {suggestion && (
            <p>Suggestion: {suggestion.character} in the {suggestion.room} with the {suggestion.weapon}</p>
          )}
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
          onMakeSuggestion={(char, room, weap) => {
            console.log(`Suggestion made with ${char}, ${room}, ${weap}`);
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
