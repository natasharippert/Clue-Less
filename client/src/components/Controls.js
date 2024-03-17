import React from 'react';
//import './Controls.css';

const Controls = () => {
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
        <button class="button suggest">suggest</button>
      </div>
    </div>
  );
};

export default Controls;