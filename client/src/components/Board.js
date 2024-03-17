import React from 'react';
// import './GameBoard.css';
import { room_cards } from './Card';

const GameBoard = () => {
  // Simplified layout with explicit placement of rooms and hallways
  // "null" represents a blank space
  const layout = [
    room_cards[0].name, 'Hallway', room_cards[1].name, 'Hallway', room_cards[2].name,
    'Hallway', null, 'Hallway', null, 'Hallway',
    room_cards[3].name, 'Hallway', room_cards[4].name, 'Hallway', room_cards[5].name,
    'Hallway', null, 'Hallway', null, 'Hallway',
    room_cards[6].name, 'Hallway', room_cards[7].name, 'Hallway', room_cards[8].name
  ];

  return (
    <div class="game-board">
      {layout.map((item, index) => (
        <div key={index} class={`cell ${item ? (item.startsWith('Hallway') ? 'hallway' : 'room') : 'blank'}`}>
          {item || ''}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
