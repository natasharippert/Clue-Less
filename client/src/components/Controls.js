import React, { useState } from 'react';
import { SocketContext } from './SocketContext';
//import './Controls.css';

const Controls = ({ characters, rooms, weapons, onMakeSuggestion, socket, sessionId, playerName }) => {
  // const socket = useContext(SocketContext); 
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const submitSuggestion = () => {
    console.log(`Suggestion made with ${selectedCharacter}, ${selectedRoom}, ${selectedWeapon}`);
        onMakeSuggestion(selectedCharacter, selectedRoom, selectedWeapon);
        socket.emit('makeSuggestion', {
            character: selectedCharacter,
            room: selectedRoom,
            weapon: selectedWeapon,
            sessionId,
            playerName
        });
    closeModal();
  };

  // const submitMove = (dir) => {
  //   console.log(`Moving ${dir}`);
  //   onMakeMove(dir);
  //       socket.emit('makeMove', {
  //           direction: dir,
  //           sessionId,
  //           playerName
  //       });
  // };

  const handleMove = (direction) => {
    console.log(`Move ${direction}`);
    socket.emit('playerMove', {
      direction,
      sessionId,
      playerName
  });
  };

  return (
    <div class="controller">
      <div class="movement-buttons">
        {/* Replace divs with button elements if they should be clickable */}
        <button className="button up" onClick={() => handleMove('up')}>↑</button>
        <button className="button left" onClick={() => handleMove('left')}>←</button>
        <button className="button right" onClick={() => handleMove('right')}>→</button>
        <button className="button down" onClick={() => handleMove('down')}>↓</button>
      </div>
      <div class="action-buttons">
        <button class="button accuse">accuse</button>
        <button class="button suggest" onClick={openModal}>suggest</button>
      </div>
      {showModal && (
        <div className="modal">
          <h3>Make a Suggestion</h3>
          <select value={selectedCharacter} onChange={e => setSelectedCharacter(e.target.value)}>
            <option value="">Select Character</option>
            {characters.map(char => (
              <option key={char.name} value={char.name}>{char.name}</option>
            ))}
          </select>
          <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.name} value={room.name}>{room.name}</option>
            ))}
          </select>
          <select value={selectedWeapon} onChange={e => setSelectedWeapon(e.target.value)}>
            <option value="">Select Weapon</option>
            {weapons.map(weapon => (
              <option key={weapon.name} value={weapon.name}>{weapon.name}</option>
            ))}
          </select>
          <button onClick={submitSuggestion}>Submit</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Controls;