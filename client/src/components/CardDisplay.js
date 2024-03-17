// import React from 'react';
// //import './CardDisplay.css';

// const CardDisplay = () => {
//   return (
//     <div class="card-display">
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
    <div class="card-display">
      <h2>Your Cards</h2>
      <div class="cards-container"> {/* Add this wrapper */}
        {cards.map((card, index) => (
          <div key={index} class="card">
            <img src={card.imageURL} alt={card.name} class="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};


export default CardDisplay;