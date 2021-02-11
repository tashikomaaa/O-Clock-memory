// tableau de cartes
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck de toutes les cartes en jeu
const deck = document.getElementById("deck-carte");

// déclaration de la variable pour les cartes matcher
let matchedCard = document.getElementsByClassName("match");

 // close icon in modal
 let closeStart = document.querySelector('.closeStart');
 let closeWin = document.querySelector(".closeWin");
 let closeLoose = document.querySelector(".closeLoose");

 // declare modal
 let modalWin = document.getElementById("popup1");
 let modalLoose = document.getElementById("popup2");
 let modalStart = document.getElementById("popup3");


// declare sounds
const timerSoung = document.getElementById("2minutes");
const winSoung   = document.getElementById("winSoung");
const loseSoung  = document.getElementById("loseSoung");

 // array fpour les cartes "ouvertes"
var openedCards = [];

let best = document.getElementById('best');
// GET Request.
fetch('http://localhost:3000/best', { method: "GET", headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "true"}})
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => best.innerHTML = `notre champion.ne est ${json[0].name} avec un score de ${json[0].score}/100`)   //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors

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

function  startGame(){
	
	timerSoung.play()
	closeModal();
	modalStart.classList.remove("show");
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
	var  display = document.querySelector('.timer');
	clearInterval(countdown);
	startTimer(100, display);
	//display.innerHTML = "2 mins 0 secs";
	
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
var countdown;
var score = 0;
function startTimer(duration) {
	
	var percent = duration / 100;
	
    var timer = duration;
	var reverse_counter = 0;
    countdown = setInterval(function () {
		score = duration - reverse_counter;
		document.getElementById("pbar").style.width = ++reverse_counter +"%";
        if (reverse_counter == duration) {
			clearInterval(countdown)
			timerSoung.pause();
			loseSoung.play();
            loose()
            reverse_counter = duration;
        }
    }, 1000);

}
function saveScore(){
	const name = document.getElementById('name').value;
/* 	var score = timer.innerHTML; */
	fetch("http://localhost:3000/player",
	{
		method: "POST",
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify({name: name, score: score})
	})
	.then(function(res){ return res.json(); })
	.then(function(data){ 
		modalWin.classList.remove("show");
		alert("votre score à bien été sauvegarder !")
		modalStart.classList.add("show");
		})
}

function  congratulations(){
	if (matchedCard.length == 16){
		timerSoung.pause()
		winSoung.play();
		clearInterval(countdown);
		finalTime = score;
		// on enregistre le score

		// on montre la modal si on a toutes les cartes matcher
		modalWin.classList.add("show");
		document.getElementById("totalTime").innerHTML = finalTime;
		// on ferme la modal
		closeModal();
	};
}
function loose() {
	timerSoung.pause()
		clearInterval(countdown);
		modalLoose.classList.add("show");
		closeModal();
};

function closeModal(){
    closeWin.addEventListener("click", function(e){
        modalWin.classList.remove("show");
    });
    closeLoose.addEventListener("click", function(e){
        modalLoose.classList.remove("show");
    })
	closeStart.addEventListener("click", function(e){
		modalStart.classList.remove("show");
	})
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