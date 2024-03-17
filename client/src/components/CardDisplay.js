// import React from 'react';
// //import './CardDisplay.css';

// const CardDisplay = () => {
//   return (
//     <div className="card-display">
//       Cards
//     </div>
//   );
// };

// export default CardDisplay;

import React from 'react';
//import './CardDisplay.css';
import { character_cards } from './Card';

const CardDisplay = ({ cards }) => {
  return (
    <div className="card-display">
      <h2>Your Cards</h2>
      <div className="cards-container"> {/* Add this wrapper */}
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.imageURL} alt={card.name} className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};


export default CardDisplay;