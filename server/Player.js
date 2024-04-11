// player object

function Player(userID, name, charName, startRoom, nextPlayer) {
   return {
      userID: userID,
      name: name,
      character: charName,
      room: startRoom,
      cardList: [],
      next: nextPlayer,
      myTurn: false,
      active: true,

      // Move the character to the requested position
      move(direction){
         moved = false;

         switch (direction){
            case  "left" :
               this.room.removePlayer(this)
               this.room.left.addPlayer(this)
               moved = true;
               break; 
            case  "right" :
               this.room.removePlayer(this)
               this.room.right.addPlayer(this)
               moved = true;
               break; 
            case  "up" :
               this.room.removePlayer(this)
               this.room.up.addPlayer(this)
               moved = true;
               break; 
            case  "down" :
               this.room.removePlayer(this)
               this.room.down.addPlayer(this)
               moved = true;
               break; 
            case  "passage" :
               this.room.removePlayer(this)
               this.room.passage.addPlayer(this)
               moved = true;
               break; 
         } // end switch

         // Change room property
         this.room = this.room[direction];

         return moved;
      }, // end move

      


      // Like move, but can go anywhere bc of someone’s suggestion
      jump(room) {
         this.room = room;
      },

      // allow player to decide which card to show if polled successfully
      showCard(cardArray) {
         // show all cards to player and make them select one
      }, // end showCard

      // checks for matches when polled 
      checkPoll(suggestion) {
         let matches = [];
         
         for (let ic = 0; ic < length(this.cardList); ic++) {
            for (let is = 0; is < length(suggestion); is++) {
               if (this.cardList[ic].name === suggestion[is]) {
                  matches.push(this.cardList[ic]);
               }
            }
         }

         return matches;
      },

      // Sets property that is the object the userID interfaces with
      setInterface(userID){
         // connect to server GUI for given player
      }, // end setInterface


      // $$$$$$$$$$$$$$$$$$$$$$$
      // generalfunc
      genfun() {},
      //$$$$$$$$$$$$$$$$$$$$$$$$


   } // end obj

} // end Player


module.exports = { Player };