// Simple character display component
import React from 'react';
const CharacterDisplay = ({ character }) => {
   if (!character) return null;  // Don't render if character is not set
   return (
     <div class="character-profile">
       <h3>Your Character: {character.name}</h3>
       <img id= "character-profile-image" src={character.imageURL} alt={character.name} />
     </div>
   );
 };
 
 export default CharacterDisplay;