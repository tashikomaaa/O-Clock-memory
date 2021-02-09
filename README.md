# Bienvenu à vous !

Salut à tous, tout d'abord on va vérifier que l'on dispose tous du même environement de travail (histoire de se facilité la tache).

Pour ma part je travail avec:

- visual studio code
- sous-system linux pour windows (WSL)
- Docker pour windows


# Le projet

Aujourd'hui on va créer un **jeu de memory** !

## Les outils

Pour les besoins de ce projet on va travailler et découvrir les outils suivants:

- Docker
- Node.js
- Css
- Html 5
- JavaScript vanilla
- Mysql

## Déscription du projet

Le but est de créer le jeu Memory.
### Fonctionnalités
- Au commencement du jeu, des cartes sont disposées face cachée à l'écran.
- Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est
validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner
une nouvelle paire de cartes.
- Une compteur de temps, avec une barre de progression, s’affiche en dessous du
plateau.
- Le joueur gagne s'il arrive à découvrir toutes les paires avant la fin du temps imparti.
- Chaque temps de partie effectuée doit être sauvegardée en base de données.
Avant le début du jeu, les meilleurs temps s’affichent à l’écran.

# On est parti !


On va commencer par créer deux dossiers:
- `server`
- `client`

vous allez avoir besoin des ressources(images) qui ce trouve dans le repo.
placez les dans un dossier qui s'appellera `images` dans le dossier `client`

## La structure du plateau de jeu

On va commencer par créer la structure du plateau de jeu.

Nous allons avoir besoin d'une grille qui va contenir nos cartes.

Pour ce faire on créer dans notre dossier `client` un fichier `index.html`.

On va pouvoir y écrire en premier la base d'un fichier HTML 5.

```
<!DOCTYPE  html>
<html  lang="fr">
<head>
	<meta  charset="utf-8">
	<title>Memory Game</title>
	<meta  name="description"  content="">
	<meta  name="viewport"  content="width=device-width, initial-scale=1">
</head>
<body>
</body>
</html>
```

### La grille de jeu

Maintenant que l'on a notre squellette de base on peut y ajouter notre grille.
On va d'abord créer un container dans lequel on va placer une liste avec comme id `deck-carte` et comme class `deck` :

```
<div  class="container">
	<ul  class="deck"  id="deck-carte">
	</ul>
</div>
```

ensuite on ajoute nos cartes :

```
<ul  class="deck"  id="deck-carte">
	<li  class="card"  type="js">
	<image  src="images/js.png" />
	</li>
	<li  class="card"  type="github">
	<image  src="images/github.png" />
	</li>
	<li  class="card match"  type="node">
	<image  src="images/node.png" />
	</li>
	<li  class="card"  type="oclock"  >
	<image  src="images/oclock.png" />
	</li>
	<li  class="card"  type="ubuntu">
	<image  src="images/ubuntu.png" />
	</li>
	<li  class="card match"  type="node">
	<image  src="images/node.png" />
	</li>
	<li  class="card"  type="html">
	<image  src="images/html-5.png" />
	</li>
	<li  class="card"  type="css">
	<image  src="images/css-3.png" />
	</li>
	<li  class="card"  type="js">
	<image  src="images/js.png" />
	</li>
	<li  class="card"  type="vscode">
	<image  src="images/vscode.png" />
	</li>
	<li  class="card"  type="html">
	<image  src="images/html-5.png" />
	</li>
	<li  class="card"  type="vscode">
	<image  src="images/vscode.png" />
	</li>
	<li  class="card open show"  type="oclock">
	<image  src="images/oclock.png" />
	</li>
	<li  class="card"  type="css">
	<image  src="images/css-3.png" />
	</li>
	<li  class="card"  type="github">
	<image  src="images/github.png" />
	</li>
	<li  class="card"  type="ubuntu">
	<image  src="images/ubuntu.png" />
	</li>
</ul>
```
En gros on ajoute deux copie de chaque carte.
Ok pour le moment on est d'accord ça ne ressemble à rien !

## Un peu de style mille sabords !

On va donner un peu de style à tous ça !

tout d'abord on créer dans `client` un dossier `css`, dans lequel on créer un fichier `app.css`

### Et la magie opère

Dans notre fichier `app.css` on aura donc:

- pour la page :
```
html {
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

html,
body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

body {
	background: #ffffff;
	font-family: 'Permanent Marker', cursive;
	font-size: 16px;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
```

- pour le deck:
```
.deck {
	width: 90%;
	background: #716F71;
	padding: 1rem;
	border-radius: 4px;
	box-shadow: 8px  9px  26px  0  rgba(46, 61, 73, 0.5);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	margin: 0  0  3em;
}

  

.deck  .card {
	height: 3.7rem;
	width: 3.7rem;
	margin: 0.2rem  0.2rem;
	background: #141214;;
	font-size: 0;
	color: #ffffff;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 5px  2px  20px  0  rgba(46, 61, 73, 0.5);
}

.deck  .card  img{
	height: 100%;
}
```

## Maintenant vu que nous sommes des petits foufou, on va s'amuser avec le CSS3 !

### Lorsque les cartes sont face ouverte:

```
.deck  .card.open {
	transform: rotateY(0);
	background: #33FFDD;
	cursor: default;
	animation-name: flipInY;
	-webkit-backface-visibility: visible  !important;
	backface-visibility: visible  !important;
	animation-duration: .75s;
}

.deck  .card.open  img {
	height: 100%;
	display: block;
}
```

### Lorsque les cartes  les mêmes :
```
.deck  .card.match {
	cursor: default;
	background: #33FF4C;
	font-size: 33px;
	animation-name: rubberBand;
	-webkit-backface-visibility: visible  !important;
	backface-visibility: visible  !important;
	animation-duration: .75s;
}
.deck  .card.match  img{
	height: 100%;
	display: block;
}
```

### Lorsque les cartes ne sont pas les même :
```
.deck  .card.unmatched {
	animation-name: pulse;
	-webkit-backface-visibility: visible  !important;
	backface-visibility: visible  !important;
	animation-duration: .75s;
	background: #FF333F;
}
```

### et pour finir quand les cartes ne sont plus clickable(elle ont étées matcher avec une autres):
```
.deck  .card.disabled {
	pointer-events: none;
	opacity: 0.9;
}
```

il ne nous reste plus qu'a écrire nos animations:
```
/* animations */

@keyframes  flipInY {
	from {
		transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
		animation-timing-function: ease-in;
		opacity: 0;
	}
	40% {
		transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
		animation-timing-function: ease-in;
	}
	60% {
		transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
		opacity: 1;
	}
	80% {
		transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
	}
	to {
		transform: perspective(400px);
	}
}

@keyframes  rubberBand {
	from {
		transform: scale3d(1, 1, 1);
	}
	30% {
		transform: scale3d(1.25, 0.75, 1);
	}
	40% {
		transform: scale3d(0.75, 1.25, 1);
	}
	50% {
		transform: scale3d(1.15, 0.85, 1);
	}
	65% {
		transform: scale3d(.95, 1.05, 1);
	}
	75% {
		transform: scale3d(1.05, .95, 1);
	}
	to {
		transform: scale3d(1, 1, 1);
	}
}

@keyframes  pulse {
	from {
		transform: scale3d(1, 1, 1);
	}
	50% {
		transform: scale3d(1.2, 1.2, 1.2);
	}
	to {
		transform: scale3d(1, 1, 1);
	}
}
```


### Ce que nous faisont ici
Nous faisons en sorte de retourner les cartes et d'afficher les images lorsque la class de la carte change.
Et pour que tou ceci fonctionne on va pouvoir ajouter dans le head de notre fichier `index.html`:
```
	<link  rel="stylesheet"  href="css/app.css">
```

##

### Vous: 
- Mais comment elle change la class de la carte ?!
### Moi:
- Très bonne question, on y vient !


## La Logique JavaScript

On va donc pouvoir se penchger sur la logique de jeu.

on sait que:
- on a besoin d'un tableau dans lequel on va mettres nos cartes
- on a besoin d'un tableau avec les cartes "ouverte" dedans
- on a besoin de mélanger nos cartes (shuffle)
- on a besoin de checker si les cartes "ouverte" sont les même
- on a besoin d'un timer

On va donc avoir besoin dans notre dossier `client`, dun' dossier `js` dans lequel on va placer notre fichier `àpp.js`.

### On y va pour le JavaScript
On va donc commencer par récuperer nos cartes et les placer dans un tableau.

Pour ce faire on va pouvoir ecrire :
```
// tableau de cartes

let  card = document.getElementsByClassName("card"); // on recupère tout les elements qui ont la class card
let  cards = [...card]; // on les places dans un tableau
```

on va aussi avoir besoin du deck avec toutes les cartes
```
// deck de toutes les cartes en jeu
const  deck = document.getElementById("deck-carte");
```

on a besoin d'une variable pour les cartes "matcher":
```
// déclaration de la variable pour les cartes matcher
let  matchedCard = document.getElementsByClassName("match");
```
on va avoir besoin de donner a nos cartes des events:
```
for (var  i = 0; i < cards.length; i++){
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click",congratulations);
};
```


## 
### Maintenant que nous avons nos cartes

En premier on va avoir besoin de les mélanger.

On va donc créer une fonction shuffle, qui va prendre un array en argument et retourner un array.
A l'intérieur on va randomiser l'index de nos cartes.

```
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
```

Au chargement/reload de la page on lance le jeu

```
document.body.onload = startGame(); // quand la page est chargée ou reload on lance le jeu
```

Maintenant la fonction qui lance le jeu 

```
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
	startTimer(twoMinutes, display);
	display.innerHTML = "2 mins 0 secs";
	clearInterval(interval);
}
```

on créer une variable pour les class pour show, open et disabled:
```
var  displayCard = function (){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};
```
Maintenant on va ajouter les cartes ouvertes dans le tableau des cartes ouvertes (oui c'est plutot logique vous me direz) et on va vérifez si elles sont les mêmes
```
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
```

Pour les cartes Matched:
```
function  matched(){
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
} 
```

Pour les cartes unmatched:
```
function  unmatched(){
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
```
et enfin pour les cartes matched on les disabled:
```
function  disable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
	});
}
function  enable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.remove('disabled');
		for(var  i = 0; i < matchedCard.length; i++){
			matchedCard[i].classList.add("disabled");
		}
	});
}
```

Maintenant le timer :
```
var  second = 0, minute = 2; hour = 0;
var  timer = document.querySelector(".timer");
var  interval;
function  startTimer(duration, display) {
	var  timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.innerHTML = minutes + " min " + seconds + " secs";
		if (--timer < 0) {
			timer = duration;
		}
	}, 1000);
}
```

## YEAH notre jeu fonctionne !

Mais il nous manque encore quelque petites chose !

On va faire une modal pour afficher la victoire ou la défaite de nos joueurs.

Dans notre html on va donc pouvoir ajouter  :

```
<div  id="popup1"  class="overlay">
	<div  class="popup">
		<h2>Bravo 🎉</h2>
		<a  class="close"  href=#  >×</a>
		<div  class="content-1">
			Bravo vous tu à gagner 🎉🎉
		</div>
		<div  class="content-2">
			<p>avec comme temps <span  id=totalTime>  </span>  </p>
		</div>
		<button  id="play-again"onclick="playAgain()">
			jouer encore ? 😄</a>
		</button>
	</div>
</div>
```

La on a donc une modal qui va s'ouvrir quand on fini le jeu, mais il faut encore ecrire la logique pour qu'elle s'ouvre.

On y va !

Dans notre fichier `app.js` on peut donc écrire :

tout d'abord on a besoin de notre modal:
```
// declare modal
let  modalWin = document.getElementById("popup1");
```
ensuite la fonction pour l'afficher:
```
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
```
pour fermer la modal:
```
function  closeModal(){
	closeicon.addEventListener("click", function(e){
		modalWin.classList.remove("show");
		startGame();
	});
}
```
Et pour le bouton rejouer :
```
function  playAgain(){
	modal.classList.remove("show");
	startGame();
}
```

Maintenant que l'on à notre condition de victoire qui est faite il nous faut notre condition de défaite !
Je sais c'est pas super de devoir penser à ça mais bon pas le choix !

On va donc devoir faire en sorte que lorsque le temps c'est écouler une modal s'ouvre si le joueur n'a pas retourner toutes les cartes.

Pour ce faire on va ajouter dans notre `ìndex.html` :
```
<div  id="popup2"  class="overlay">
	<div  class="popup">
		<h2>Perdu</h2>
		<a  class="close"  href=#  >×</a>
		<div  class="content-1">
			Tu à dépasser le temps donné !
		</div>
		<button  id="play-again"onclick="playAgain()">
			jouer encore ? 😄</a>
		</button>
	</div>
</div>
```

Et dans notre fichier `app.js` :
on va recupérer notre modal, en dessous de la déclaration de la modalWin 
```
let  modalLoose = document.getElementById("popup2");
```

ensuite pour l'ouvrir quand le temps est fini il faut donc aller dans la fonction timer:
```
function  startTimer(duration, display) {
	var  timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.innerHTML = minutes + " min " + seconds + " secs";
		if (--timer < 0) {
			loose() // on rajoute ici l'appel a notre fonction loose
			timer = duration;
		}
	}, 1000);
}
```

Et enfin la fonction loose:
```
function  loose() {
	clearInterval(interval);
	modalLoose.classList.add("show");
	closeModal();
};
```

Maintenant on va devoir ajouter notre modalLoose dans nos fonction closeModal et playAgain, pour ça il suffit de copier la modalWin et de lui changer sont nom:
```
function  closeModal(){
	closeicon.addEventListener("click", function(e){
		modalWin.classList.remove("show");
		modalLoose.classList.remove("show");
		startGame();
	});
} 

function  playAgain(){
	modalWin.classList.remove("show");
	modalLoose.classList.remove("show");
	startGame();
}
```

## Et voilà !


Il ne nous reste plus qu'à rajouter notre API pour sauvegarder nos meilleur résultat en base de données.

## On se donne rendez-vous dans le dossier [server](https://github.com/tashikomaaa/O-Clock-memory/tree/main/server) !


