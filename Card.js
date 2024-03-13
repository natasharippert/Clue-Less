/* Card Class for Clue-Less*/

//Initialization
class Card {
    constructor(type, name, imageURL) {
        this.type = type;
        this.name = name;
        this.imageURL = imageURL;
    }

}

const Jim =new Card(character, Jim , images/Jim.png);
const Pam =new Card(character, Pam, images/Pam.png);
const Dwight = new Card(character, Dwight, images/Dwight.png);
const Angela = new Card(character, Angela, images/Angela.png);
const Michael = new Card(character, Michael, images/Michael.png);

/*Put all the same type of cards created together*/
function createTypes () {

}

/*Select one card from each type pile*/
function WinningHand () {

}

/*Put all remaining cards together and randomize them*/
function ShuffleDeck () {

}

/*Randomly assign X cards to each player*/
function DealCards () {

}

/*After end game, call winningHand, shuffleDeck, and dealCards*/
function ResetDeck () {

}

