const player = require('C:\\Users\\kurow\\Documents\\A_MAIN\\JHU\\EN605_601\\projectRepository\\server\\Player.js');
const roomClass = require('C:\\Users\\kurow\\Documents\\A_MAIN\\JHU\\EN605_601\\projectRepository\\server\\Room.js');

// const prompt = require('prompt-sync')({sigint: true});


const prompt = require('prompt');

// Moving rooms test case

function roomLinks(roomArray) {
   let hwURL = 'dummy';
   /*
       0  1  2
       3  4  5
       6  7  8 
    */
    // room 0 
    roomArray[0].right = new roomClass.Room('hallway', hwURL, 1);
    roomArray[0].right.right = roomArray[1];
    roomArray[0].right.left = roomArray[0];
    roomArray[0].down = new roomClass.Room('hallway', hwURL, 1);
    roomArray[0].down.down = roomArray[3];
    roomArray[0].down.up = roomArray[0];
    roomArray[0].passage = roomArray[8];
    // room 1 
    roomArray[1].right = new roomClass.Room('hallway', hwURL, 1);
    roomArray[1].right.right = roomArray[2];
    roomArray[1].right.left = roomArray[1];
    roomArray[1].left = new roomClass.Room('hallway', hwURL, 1);
    roomArray[1].left.left = roomArray[0];
    roomArray[1].left.right = roomArray[1];
    roomArray[1].down = new roomClass.Room('hallway', hwURL, 1);
    roomArray[1].down.down = roomArray[4];
    roomArray[1].down.up = roomArray[1];
    // room 2 
    roomArray[2].left = new roomClass.Room('hallway', hwURL, 1);
    roomArray[2].left.left = roomArray[1];
    roomArray[2].left.right = roomArray[2];
    roomArray[2].down = new roomClass.Room('hallway', hwURL, 1);
    roomArray[2].down.down = roomArray[5];
    roomArray[2].down.up = roomArray[2];
    roomArray[2].passage = roomArray[6];
    // room 3 
    roomArray[3].right = new roomClass.Room('hallway', hwURL, 1);
    roomArray[3].right.right = roomArray[4];
    roomArray[3].right.left = roomArray[3];
    roomArray[3].up = new roomClass.Room('hallway', hwURL, 1);
    roomArray[3].up.up = roomArray[0];
    roomArray[3].up.down = roomArray[3];
    roomArray[3].down = new roomClass.Room('hallway', hwURL, 1);
    roomArray[3].down.down = roomArray[6];
    roomArray[3].down.up = roomArray[3];
    // room 4 
    roomArray[4].right = new roomClass.Room('hallway', hwURL, 1);
    roomArray[4].right.right = roomArray[5];
    roomArray[4].right.left = roomArray[4];
    roomArray[4].left = new roomClass.Room('hallway', hwURL, 1);
    roomArray[4].left.left = roomArray[3];
    roomArray[4].left.right = roomArray[4];
    roomArray[4].up = new roomClass.Room('hallway', hwURL, 1);
    roomArray[4].up.up = roomArray[1];
    roomArray[4].up.down = roomArray[4];
    roomArray[4].down = new roomClass.Room('hallway', hwURL, 1);
    roomArray[4].down.down = roomArray[7];
    roomArray[4].down.up = roomArray[4];
    // room 5 
    roomArray[5].left = new roomClass.Room('hallway', hwURL, 1);
    roomArray[5].left.left = roomArray[4];
    roomArray[5].left.right = roomArray[5];
    roomArray[5].up = new roomClass.Room('hallway', hwURL, 1);
    roomArray[5].up.up = roomArray[2];
    roomArray[5].up.down = roomArray[5];
    roomArray[5].down = new roomClass.Room('hallway', hwURL, 1);
    roomArray[5].down.down = roomArray[8];
    roomArray[5].down.up = roomArray[5];
    // room 6 
    roomArray[6].right = new roomClass.Room('hallway', hwURL, 1);
    roomArray[6].right.right = roomArray[7];
    roomArray[6].right.left = roomArray[6];
    roomArray[6].up = new roomClass.Room('hallway', hwURL, 1);
    roomArray[6].up.up = roomArray[3];
    roomArray[6].up.down = roomArray[6];
    roomArray[6].passage = roomArray[2];
    // room 7 
    roomArray[7].right = new roomClass.Room('hallway', hwURL, 1);
    roomArray[7].right.right = roomArray[8];
    roomArray[7].right.left = roomArray[7];
    roomArray[7].left = new roomClass.Room('hallway', hwURL, 1);
    roomArray[7].left.left = roomArray[6];
    roomArray[7].left.right = roomArray[7];
    roomArray[7].up = new roomClass.Room('hallway', hwURL, 1);
    roomArray[7].up.up = roomArray[4];
    roomArray[7].up.down = roomArray[7];
    // room 8
    roomArray[8].left = new roomClass.Room('hallway', hwURL, 1);
    roomArray[8].left.left = roomArray[7];
    roomArray[8].left.right = roomArray[8];
    roomArray[8].up = new roomClass.Room('hallway', hwURL, 1);
    roomArray[8].up.up = roomArray[5];
    roomArray[8].up.down = roomArray[8];
    roomArray[8].passage = roomArray[0];
    
 } // end roomLinks

// Initialize rooms (Copied from Driver.js)
let rooms = [
   new roomClass.Room('Reception', 'images/card_reception.png'),
   new roomClass.Room('Conference Room', 'images/card_conference.png'),
   new roomClass.Room('Break Room', 'images/card_break.png'),
   new roomClass.Room('Annex', 'images/card_annex.png'),
   new roomClass.Room('Accounting', 'images/card_accounting.png'),
   new roomClass.Room('Parking lot', 'images/card_parking.png'),
   new roomClass.Room('Warehouse', 'images/card_warehouse.png'),
   new roomClass.Room('Kitchen', 'images/card_kitchen.png'),
   new roomClass.Room('Michaels Office', 'images/card_office.png'),
]

roomLinks(rooms);

let startRooms = new Map;
   startRooms['Jim'] = rooms[7].left;
   startRooms['Pam'] = rooms[3].down;
   startRooms['Dwight'] = rooms[2].down;
   startRooms['Angela'] = rooms[1].right;
   startRooms['Michael'] = rooms[8].left;
   startRooms['Andy'] = rooms[0].down;

// Create a player instance
let nextPlayer = null;
let charName = 'Dwight';
let playerName = "John Doe";
let pid = 123456;
let testPlayer = new player.Player(pid, playerName, charName, startRooms[charName], nextPlayer);


console.log("Current room: " + testPlayer.room.name);
testPlayer.move("up");
console.log("Moving up");
console.log("Current room: " + testPlayer.room.name);
testPlayer.move("passage")
console.log("Moving passage");
console.log("Current room: " + testPlayer.room.name);
testPlayer.move("right");
console.log("Moving right");
console.log("Current room: " + testPlayer.room.name);
testPlayer.move("right");
console.log("Moving right");
console.log("Current room: " + testPlayer.room.name);
testPlayer.move("right");
console.log("Moving right");
testPlayer.move("right");
console.log("Moving right");
console.log("Current room: " + testPlayer.room.name);




// prompt.start();



// function onErr(err) {
//     console.log(err);
//     return 1;
// }


// let hasMoved = false;

// while (!hasMoved) {

//       // let move =  prompt('What is your name?');

//       let move = prompt.get(['username', 'email'], function (err, result) {
//          if (err) { return onErr(err); }
//          console.log('Command-line input received:');
//          console.log('  Username: ' + result.username);
//          console.log('  Email: ' + result.email);
//          return result
//      });

//       if (activePlayer.room[move] != null && !activePlayer.room.isfull()) {
//          hasMoved = activePlayer.move(move);

//       }
//       else {
//          // tell user that move is not allowed
//          console.log("You cannot move that direction!!!")
//       }


// }

// a = 1;

