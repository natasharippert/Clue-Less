// This is the driver for the game


function main() {
   // Get server info, num players, 


   // Initialize users


   // Initialize rooms

   // Initialize cards
   let ccards = [];
   let wcards = [];
   let rcards = [];

   let secretFolder = pickCrime(ccards, wcards, rcards);


   // Initialize players
   let players = [];





   // Deal cards
   



   // Start Gameplay
   let gameOver = false;
   let activePlayer = players[0];
   let action = "";
   let hasMoved, hasSuggested, correctAcc;
   let move = "";
   let accusation, suggestion;
   let winner;

   while (!gameOver) {
      activePlayer.myTurn = true;



      while (activePlayer.myTurn) {
         action = pollAction();
         hasMoved = false;
         hasSuggested = false;

         switch (action){
            case  "move" :
               if (hasMoved || hasSuggested) {
                  // tell user they can't move again
               }
               else {
                  move = pollAction();

                  if (activePlayer.room[move] != null && !activePlayer.room.isfull()) {
                     activePlayer.move(move);

                     hasMoved = true;
                  }
                  else {
                     // tell user that move is not allowed
                  }
               } 
            
               break;
            case  "suggestion" :
               if (hasSuggested) {
                  // tell user they can't move again
               }
               else {
                  suggestion = makeSuggestion(activePlayer, suspect, weapon, activePlayer.room);
                  hasSuggested = true;
               }
               break;
            case  "accusation" :
               accusation = makeSuggestion(activePlayer, suspect, weapon, room, true);

               if (checkAccusation(accusation, secretFolder)) {
                  gameOver = true;
                  winner = activePlayer;
               }

               break;
            case  "end" :
               activePlayer.myTurn = false;
               break;
         } // end action
            


      } // end turn

      activePlayer = activePlayer.next;



   } // end game





}


function makeSuggestion(player, suspect, weapon, room, accusation = false) {
   // if (!accusation && room != player.room) {
   //    error("")
   // }
   if (accusation) {
      player.active = false;
      player.myTurn = false;
   }

   let suggestion = {
      "suspect": suspect, 
      "weapon": weapon, 
      "room": room
   };
   return suggestion;
}

function checkAccusation(accusation, secret) {
   let result = false;
   if (secret.suspect.name == accusation.suspect && secret.weapon.name == accusation.weapon && secret.room.name == accusation.room) {
      result =  true;
   }

   return result;

}


function pollSuggestion(player, suggestion) {
   
}

function pickCrime(ccards, wcards, rcards) {

}

