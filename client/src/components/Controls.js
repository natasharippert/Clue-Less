import React from 'react';
//import './Controls.css';

const Controls = () => {
  return (
    <div className="controller">
      <div className="movement-buttons">
        {/* Replace divs with button elements if they should be clickable */}
        <div className="button up">↑</div>
        <div className="button left">←</div>
        <div className="button right">→</div>
        <div className="button down">↓</div>
      </div>
      <div className="action-buttons">
        <button className="button accuse">accuse</button>
        <button className="button suggest">suggest</button>
      </div>
    </div>
  );
};

export default Controls;