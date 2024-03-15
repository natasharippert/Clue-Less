// player object

function Player(userID, name, startRoom, nextPlayer) {
   return {
      userID: userID,
      name: name,
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

         return moved;
      }, // end move

      

      // polls suggestion around table
      pollSuggestion(suggestion) {

      },

      // Like move, but can go anywhere bc of someone’s suggestion
      jump(room) {
         this.room = room;
      },


      // allow player to decide what card to show when polled 
      showCard(card) {},

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