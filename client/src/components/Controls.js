import React from 'react';
//import './Controls.css';

const Controls =  ({ characters, rooms, weapons, onMakeMove, socket, sessionId, playerName  })  => {

   const submitMove = (dir) => {
      console.log(`Moving ${dir}`);
      onMakeMove(dir);
          socket.emit('makeMove', {
              direction: dir,
              sessionID,
              playerName
          });
    };

  return (
    <div class="controller">
      <div class="movement-buttons">
        {/* Replace divs with button elements if they should be clickable */}
        <div class="button up"
        onClick={submitMove("up")}
        >↑</div>
        <div class="button left"
        onClick={submitMove("left")}
        >←</div>
        <div class="button right"
        onClick={submitMove("right")}
        >→</div>
        <div class="button down"
        onClick={submitMove("down")}
        >↓</div>
        <div class="button passage"
        onClick={submitMove("passage")}
        >P</div>
      </div>
      <div class="action-buttons">
        <button class="button accuse">accuse</button>
        <button class="button suggest">suggest</button>
      </div>
    </div>
  );
};




export default Controls;