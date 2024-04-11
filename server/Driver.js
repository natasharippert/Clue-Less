// This is the driver for the game


function main() {
   /*  
   $$$$$$$$$$$$$$$
   $$$$$ NOTE $$$$
   $$$$$$$$$$$$$$$
   
   should all of these be moved to another smaller js file that runs
   local to the host's PC and then calls this? I guess the host would have
   to have this downloaded and running on their pc, so it would moreso
   be a modularity thing

   //Initialize Server


   // Get server info, num players, 


   // Initialize users
   let users;


   //Lobby logic


   $$$$$$$$$$$$$$$
   $$ END NOTE $$$
   $$$$$$$$$$$$$$$
   */ 


   // Initialize rooms
   const rooms = [
      new Room('Reception', 'images/card_reception.png'),
      new Room('Conference Room', 'images/card_conference.png'),
      new Room('Break Room', 'images/card_break.png'),
      new Room('Annex', 'images/card_annex.png'),
      new Room('Accounting', 'images/card_accounting.png'),
      new Room('Parking lot', 'images/card_parking.png'),
      new Room('Warehouse', 'images/card_warehouse.png'),
      new Room('Kitchen', 'images/card_kitchen.png'),
      new Room('Michaels Office', 'images/card_office.png'),
   ]

   roomLinks(rooms);

   let startRooms;
   startRooms['Jim'] = rooms[7].left;
   startRooms['Pam'] = rooms[3].down;
   startRooms['Dwight'] = rooms[2].down;
   startRooms['Angela'] = rooms[1].right;
   startRooms['Michael'] = rooms[8].left;
   startRooms['Andy'] = rooms[0].down;

   // Initialize cards
   // six characters
   const character_cards = [
      new Card('character', 'Jim', 'images/card_jim.png'),
      new Card('character', 'Pam', 'images/card_pam.png'),
      new Card('character', 'Dwight', 'images/card_dwight.png'),
      new Card('character', 'Angela', 'images/card_angela.png'),
      new Card('character', 'Michael', 'images/card_michael.png'),
      new Card('character', 'Andy', 'images/card_andy.png')
   ];

   // six weapons
   const weapon_cards = [
      new Card('weapon', 'Dundie Trophy', 'images/card_trophy.png'),
      new Card('weapon', 'Poisoned Pretzel', 'images/card_pretzel.png'),
      new Card('weapon', 'Coffee Mug', 'images/card_mug.png'),
      new Card('weapon', 'Bacon Grill', 'images/card_grill.png'),
      new Card('weapon', 'Dunder Mifflin Paper', 'images/card_paper.png'),
      new Card('weapon', 'Rabid Bat', 'images/card_bat.png')
   ]

   // nine rooms
   const room_cards = [];
   for (let ir = 0; ir < rooms.length; ir++) {
      room_cards.push(new Card('room', rooms[ir].name, rooms[ir].imgURL ))
   }



   let secretFolder = pickCrime(character_cards, weapon_cards, room_cards);

   let allCards = Deck.mergeDecks([character_cards, weapon_cards, room_cards]);

   // Initialize players
   let players = [];

   let nextPlayer;
   for (let ip = users.length - 1; ip >= 0 ; ip--) {
      startRoom = startRooms[users.charName];
      if (ip == users.length - 1) {
         nextPlayer = null;
      }
      else {
         nextPlayer = players[ip+1];
      }
      players[ip] = new Player(users.ID, users.name, users.charName, startRoom, nextPlayer);
   }

   // Linked list loops around like play around table
   players[ip = users.length - 1].next = players[0];



   // Deal cards
   let hands = allCards.dealAll(players.length);

   // assign hands to players
   for (let ip = 0; ip < players.length; ip++) {
      players[ip].cardList = hands[ip];
   }

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
                     hasMoved = activePlayer.move(move);
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
   else {
      room = player.room;
   }

   let suggestion = {
      "suspect": suspect, 
      "weapon": weapon, 
      "room": room
   };
   return suggestion;
} // end makeSuggestion

function checkAccusation(accusation, secret) {
   let result = false;
   if (secret.suspect.name == accusation.suspect && secret.weapon.name == accusation.weapon && secret.room.name == accusation.room) {
      result =  true;
   }

   return result;

} // checkAccusation


function pollSuggestion(player, suggestion) {
   let match = false;

   let hotSeat = player.next(); 
   let cardMatches= [];
   while (!match) {
      cardMatches = hotSeat.checkPoll(suggestion);

      if (cardMatches.length > 0) {
         match = true;
      }
      else if (hotSeat.next != null) {
         hotSeat = hotSeat.next;
      }
      else {
         match = true;
      }
   } // end while

   if (cardMatches.length > 0) {
      hotSeat.showCard(cardMatches);
   }
   else {
      console.log("No matches!!!");
   }
} // end pollSuggestion

function pickCrime(ccards, wcards, rcards) {
   return [ccards.dealOne(), wcards.dealOne(), rcards.dealOne(), ];
} // end pickCrime

function roomLinks(roomArray) {
  /*
      0  1  2
      3  4  5
      6  7  8 
   */
   // room 0 
   roomArray[0].right = new Room('hallway', hwURL, 1);
   roomArray[0].right.right = roomArray[1];
	roomArray[0].right.left = roomArray[0];
   roomArray[0].down = new Room('hallway', hwURL, 1);
   roomArray[0].down.down = roomArray[3];
	roomArray[0].down.up = roomArray[0];
   roomArray[0].passage = roomArray[8];
   // room 1 
   roomArray[1].right = new Room('hallway', hwURL, 1);
   roomArray[1].right.right = roomArray[2];
	roomArray[1].right.left = roomArray[1];
   roomArray[1].left = new Room('hallway', hwURL, 1);
   roomArray[1].left.left = roomArray[0];
	roomArray[1].left.right = roomArray[1];
   roomArray[1].down = new Room('hallway', hwURL, 1);
   roomArray[1].down.down = roomArray[4];
	roomArray[1].down.up = roomArray[1];
   // room 2 
   roomArray[2].left = new Room('hallway', hwURL, 1);
   roomArray[2].left.left = roomArray[1];
	roomArray[2].left.right = roomArray[2];
   roomArray[2].down = new Room('hallway', hwURL, 1);
   roomArray[2].down.down = roomArray[5];
	roomArray[2].down.up = roomArray[2];
   roomArray[2].passage = roomArray[6];
   // room 3 
   roomArray[3].right = new Room('hallway', hwURL, 1);
   roomArray[3].right.right = roomArray[4];
	roomArray[3].right.left = roomArray[3];
   roomArray[3].up = new Room('hallway', hwURL, 1);
   roomArray[3].up.up = roomArray[0];
	roomArray[3].up.down = roomArray[3];
   roomArray[3].down = new Room('hallway', hwURL, 1);
   roomArray[3].down.down = roomArray[6];
	roomArray[3].down.up = roomArray[3];
   // room 4 
   roomArray[4].right = new Room('hallway', hwURL, 1);
   roomArray[4].right.right = roomArray[5];
	roomArray[4].right.left = roomArray[4];
   roomArray[4].left = new Room('hallway', hwURL, 1);
   roomArray[4].left.left = roomArray[3];
	roomArray[4].left.right = roomArray[4];
   roomArray[4].up = new Room('hallway', hwURL, 1);
   roomArray[4].up.up = roomArray[1];
	roomArray[4].up.down = roomArray[4];
   roomArray[4].down = new Room('hallway', hwURL, 1);
   roomArray[4].down.down = roomArray[7];
	roomArray[4].down.up = roomArray[4];
   // room 5 
   roomArray[5].left = new Room('hallway', hwURL, 1);
   roomArray[5].left.left = roomArray[4];
	roomArray[5].left.right = roomArray[5];
   roomArray[5].up = new Room('hallway', hwURL, 1);
   roomArray[5].up.up = roomArray[2];
	roomArray[5].up.down = roomArray[5];
   roomArray[5].down = new Room('hallway', hwURL, 1);
   roomArray[5].down.down = roomArray[8];
	roomArray[5].down.up = roomArray[5];
   // room 6 
   roomArray[6].right = new Room('hallway', hwURL, 1);
   roomArray[6].right.right = roomArray[7];
	roomArray[6].right.left = roomArray[6];
   roomArray[6].up = new Room('hallway', hwURL, 1);
   roomArray[6].up.up = roomArray[3];
	roomArray[6].up.down = roomArray[6];
   roomArray[6].passage = roomArray[2];
   // room 7 
   roomArray[7].right = new Room('hallway', hwURL, 1);
   roomArray[7].right.right = roomArray[8];
	roomArray[7].right.left = roomArray[7];
   roomArray[7].left = new Room('hallway', hwURL, 1);
   roomArray[7].left.left = roomArray[6];
	roomArray[7].left.right = roomArray[7];
   roomArray[7].up = new Room('hallway', hwURL, 1);
   roomArray[7].up.up = roomArray[4];
	roomArray[7].up.down = roomArray[7];
   // room 8
   roomArray[8].left = new Room('hallway', hwURL, 1);
   roomArray[8].left.left = roomArray[7];
	roomArray[8].left.right = roomArray[8];
   roomArray[8].up = new Room('hallway', hwURL, 1);
   roomArray[8].up.up = roomArray[5];
	roomArray[8].up.down = roomArray[8];
   roomArray[8].passage = roomArray[0];
   
} // end roomLinks




// get index of string in array that matches target string
function strMatch(str, array) {
   let idx = 0;
   let found = false;
   while (found && idx < array.length) {
      if (array[idx] === str) {
         found = true;
      } 
      else {
         idx++;
      }
   }

   if (!found) {
      idx = -1;
   }

   return idx;
}

// Convert array of objects' given property to an array of that property
function grabProps(array, propChar) {
   let out = [];
   for (i = 0; i < array.length; i++) {
      out[i] = array[i][propChar];
   }

   return out;
}