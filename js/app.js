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

let moveCounter = 0; // Initialize moveCounter for storing moves

const heading = document.querySelector('.heading');

const scorePanel = document.querySelector('.score-panel');

const cMessage = document.querySelector('.message');
const cMoves = document.querySelector('.cMoves');
const cMin = document.querySelector('.cMin');
const cSec = document.querySelector('.cSec');
const cPlay = document.querySelector('.cPlay');
const cClose = document.querySelector('.cClose');

const copyright = document.querySelector('.copyright');

deck.addEventListener('click',function(e) {
	let minCounter = 0;
	let secCounter = 0;

	if(matchedCards.length === 16) {
		timerOn = false;
		clearInterval(timerId);
		popup();
		return;
	}

	if(e.target.classList.contains('card') && !timerOn) {
		timerOn = true;
		minCounter = 0;
		secCounter = 0;
		timerId = setInterval(timer,1000);
	}

	function timer() {
		if(secCounter >= 59) {
			secCounter = 0;
			minCounter++;
			minutes.textContent = minCounter < 10 ? '0'+minCounter : minCounter;
		}
		secCounter++;
		seconds.textContent = secCounter < 10 ? '0'+secCounter : secCounter;
	}
});

//Added listener to each card in deck
cards.forEach(function(card) {
	card.addEventListener('click',show);
});

function show(e) {
	if(openedCards.length >= 2 || e.target.classList.contains('open','show') || e.target.classList.contains('match')) {
		return;
	}

	e.target.classList.add('open','show','disable');
	openedCards.push(e.target);
	if(openedCards.length === 2) {
		moveCounter++;
		moves.textContent=moveCounter;
		matchCard();
	}
}

//function defined for match cards
function matchCard() {
	if(openedCards[0].firstElementChild.getAttribute('class') === openedCards[1].firstElementChild.getAttribute('class')) {
		openedCards.map(function(card) {
			card.className = 'card match disable';
			matchedCards.push(card);
		});
		openedCards = [];
	} else {
		openedCards.map(function(card) {
			card.className = 'card fail disable';
			setTimeout(function(){
				card.classList.remove('open','show','disable','fail');	
			},1000);
		});
		openedCards = [];
	}
} 

// Function to declare congratulation message
function popup() {
	heading.style.cssText = 'opacity: 0.2';
	scorePanel.style.cssText = 'opacity: 0.2';
	deck.style.cssText = 'opacity: 0.2';
	copyright.style.cssText = 'opacity: 0.2';
	cMessage.style.cssText = 'display: block';
	restartButton.classList.add('disable');
	copyright.classList.add('disable');
	cMoves.textContent = moves.textContent;
	cMin.textContent = minutes.textContent;
	cSec.textContent = seconds.textContent;
}

// Adding close button functionality on congratulations message popup
cClose.addEventListener('click', close);

// Adding event listener to restart button
restartButton.addEventListener('click', function() {
	restart(deck, ul);
});

// Added restart button functionality
function restart(parentTag, fragment) {
	const newList = [];
	cards.forEach(function(card) {
		newList.push(card);
	});
	parentTag.innerHTML = '';
	cards = shuffle(newList);
	for (let card of cards) {
		fragment.appendChild(card);
	}
	parentTag.appendChild(fragment);
	if (openedCards.length === 0 && matchedCards.length === 0 && moveCounter === 0) {
		return;
	}
	matchedCards.map(function(card) {
		card.classList.remove('match','disable');
	});
	openedCards.map(function(card) {
		card.classList.remove('open','show','disable');
	});
	moveCounter = 0;
	moves.textContent = moveCounter;
	minutes.textContent = '00';
	seconds.textContent = '00';
	openedCards = [];
	matchedCards = [];
	timerOn = false;
	clearInterval(timerId);
}

// Added close function to close the congratulations popup
function close () {
	cMessage.style.cssText = 'display: none';
	heading.style.cssText = 'opacity: 1';
	scorePanel.style.cssText = 'opacity: 1';
	deck.style.cssText = 'opacity: 1';
	copyright.style.cssText = 'opacity: 1';
	restartButton.classList.remove('disable');
	copyright.classList.remove('disable');
}

//Adding event listener to play again button in congratulations popup
cPlay.addEventListener('click',function() {
	restart(deck,ul);
	close();
});