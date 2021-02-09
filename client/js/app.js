// tableau de cartes
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck de toutes les cartes en jeu
const deck = document.getElementById("deck-carte");

// déclaration de la variable pour les cartes matcher
let matchedCard = document.getElementsByClassName("match");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modalWin = document.getElementById("popup1");
 let modalLoose = document.getElementById("popup2");

 // array fpour les cartes "ouvertes"
var openedCards = [];


function  shuffle(array) {
	var  currentIndex = array.length, temporaryValue, randomIndex; // vaut le nombre total de cartes

	while (currentIndex !== 0) { //tant que currenIndex ne vaut pas 0
		randomIndex = Math.floor(Math.random() * currentIndex); // on creer un index random
		currentIndex -= 1; // on décrémante currentIndex pour signifier que une cartes a été mélanger
		temporaryValue = array[currentIndex]; //on récupère la carte
		array[currentIndex] = array[randomIndex]; // on change sont index
		array[randomIndex] = temporaryValue; // on remet la carte au nouvel index
	}

	return  array; // une fois fini on retourne le paquet de cartes
};

document.body.onload = startGame();

function  startGame(){
	// on vide le tableau des cartes ouvertes
	openedCards = [];
	// on mélange les cartes
	cards = shuffle(cards);
	// on enlève toutes les class ajouter au cartes
	for (var  i = 0; i < cards.length; i++){
		deck.innerHTML = "";
		[].forEach.call(cards, function(item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}
	//reset le timer
	var  twoMinutes = 60 * 2;
	var  display = document.querySelector('.timer');
	startTimer(30, display);
	display.innerHTML = "2 mins 0 secs";
	clearInterval(interval);
}


var  displayCard = function (){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};

function  cardOpen() {
	openedCards.push(this);
	var  len = openedCards.length;
	if(len === 2){
		if(openedCards[0].type === openedCards[1].type){
			matched();
		} else {
			unmatched();
		}
	}
};


function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

var second = 0, minute = 2; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + " min " + seconds + " secs";

        if (--timer < 0) {
            loose()
            timer = duration;
        }
    }, 1000);
}

function  congratulations(){
	if (matchedCard.length == 16){
		clearInterval(interval);
		finalTime = timer.innerHTML;
		// on montre la modal si on a toutes les cartes matcher
		modalWin.classList.add("show");
		document.getElementById("totalTime").innerHTML = finalTime;
		// on ferme la modal
		closeModal();
	};
}
function loose() {
		clearInterval(interval);
		modalLoose.classList.add("show");
		closeModal();
};

function closeModal(){
    closeicon.addEventListener("click", function(e){
        modalWin.classList.remove("show");
        modalLoose.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    modalWin.classList.remove("show");
    modalLoose.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};