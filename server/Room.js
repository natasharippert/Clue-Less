// Room object

//NOTE: can I use name val pairs???
function Room(name, up=null, left=null, right=null, down=null, passage=null, occupants=new Set(), weapons=new Set(), occupancy = 50) {
   return {
      name: name,
		up: up,
		left: left,
		right: right,
		down: down,
		passage: passage,
		occupants: occupants,
      weapons: weapons,
      occupancy: occupancy,

      // Move the character to the requested position
      removePlayer(player){
            occupants.delete(player);
      }, // end removePlayer

      addPlayer(player){
         occupants.add(player);
      }, // end addPlayer

      
      // Move the weapon to the requested position
      removeWeapon(weapon){
         occupants.delete(weapon);
      }, // end removeWeapon

      addWeapon(weapon){
         occupants.add(weapon);
      }, // end addWeapon
         

   } // end obj

} // end Room