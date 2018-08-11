/*
 * Create a list that holds all of your cards
 */
 const cardList = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'];
 
 const deck = document.querySelector('.deck'); // Selected Deck Class Element
 const ul = document.createDocumentFragment('ul'); // Created ul element to work on it & append it later in the DOM

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

 // Function to shuffle & create HTML of each card
 function createCard() {
 	const shuffleCards = shuffle(cardList);
 	shuffleCards.forEach(function(card){
 		const li = document.createElement('li');
 		const i = document.createElement('i');
 		li.setAttribute('class','card');
 		i.setAttribute('class',card);
 		li.appendChild(i);
 		ul.appendChild(li);
 	});
 	deck.appendChild(ul);
 }

// Appending the cards generated randomly to the deck
createCard();

let cards = document.querySelectorAll('.card'); // Stored cards in NodeList format array

const moves = document.querySelector('.moves'); // Stored moves element

const restartButton = document.querySelector('.restart'); // Stored restartButton element

const minutes = document.querySelector('.minutes');	// Stored minutes element
const seconds = document.querySelector('.seconds'); // Stored seconds element

let openedCards = []; // Initialize openCards array to store opened cards
let matchedCards = []; // Initialize matchedCards array to store matched cards

let timerId = 0; // Storing timerId to end the setInterval function
let timerOn = false; // Flag variable

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */