import React, { useState } from 'react';
//import './Controls.css';

const Controls = ({ characters, rooms, weapons, onMakeSuggestion }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const submitSuggestion = () => {
    onMakeSuggestion(selectedCharacter, selectedRoom, selectedWeapon);
    closeModal();
  };
  return (
    <div class="controller">
      <div class="movement-buttons">
        {/* Replace divs with button elements if they should be clickable */}
        <div class="button up">↑</div>
        <div class="button left">←</div>
        <div class="button right">→</div>
        <div class="button down">↓</div>
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