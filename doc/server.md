 # L'API
Maintenant on va parler sérieux !

Avant de commencer notre api on va avoir besoin d'une base de donées.

Pour ça j'ai choisie Mysql, plus répendu et plus rapide à prendre en main.

### La base de données
On va commncer par l'installer.
Pour ceux qui dispose de ubuntu(os, ou sous systeme windows)
on va pouvoir faire
 `sudo apt install mysql-server`
Une fois installer on va faire
`sudo mysql_secure_installation`

Maintenant, si vous essayez de vous connecter à Mysql en utilisant l'utilisateur root (commande ci-dessous), vous vous retrouverez avec le message Access Denied root@localhost
`mysql -u root -p`

Tout d'abord, démarrez le shell MySQL en exécutant la commande suivante en tant que sudo:
`sudo mysql` 
Dans l'invite MySQL, entrez la commande suivante qui vous permet de vérifier la méthode d'authentification / le plugin que tous vos comptes MySQL utilisent actuellement:
`mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;`

Dans la sortie, vous pouvez voir que root utilise le plugin auth-socket pour l'authentification par défaut.

Vous avez maintenant 2 options
##
## Option 1: changer la méthode d'authentification pour root

Notre objectif ici est que l'utilisateur root doit s'authentifier avec un mot de passe sur MySQL.

`mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';` 

À partir de maintenant, votre root n'aura plus le mot de passe que vous avez spécifié lors de l'exécution du script de sécurité inclus, mais ce mot de passe fort que vous avez spécifié dans la commande mentionnée ci-dessus.

### Reloading the grant tables

Il est maintenant temps de dire au serveur d'utiliser les nouveaux paramètres de privilège à partir de maintenant. Exécutez la commande suivante dans l'invite MySQL pour recharger les grant tables et enregistrer vos modifications:
`mysql> FLUSH PRIVILEGES;` 

### Re-checker la methode d'authentification  pour les utilisateurs MySQL
`mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;`
Maintenant que votre utilisateur root est configuré pour se connecter au shell MySQL via un mot de passe sécurisé.

### Vérifiez l'état de mysql.service

`systemctl status mysql.service`

  
En vous connectant à MySQL Admin en tant que root et en exécutant n'importe quelle commande administrative MySQL Admin est un client qui vous permet d'effectuer des opérations administratives sur MySQL. 

Exécutons l'une des commandes administratives à travers elle comme exemple pour vérifier si le système fonctionne correctement et que notre root est configurée pour l'utiliser.

`sudo mysqladmin -p -u root version`


## Option 2: Créer un nouvel utilisateur
Tout d'abord, démarrez le shell MySQL en exécutant la commande suivante en tant que sudo:

`sudo mysql`

Commençons par créer un nouvel utilisateur dans le shell MySQL:

`mysql >CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';`
À ce stade, newuser n'a aucune autorisation pour faire quoi que ce soit avec les bases de données. En fait, même si un nouvel utilisateur tente de se connecter (avec le mot de passe, password), il ne pourra pas accéder au shell MySQL.

Par conséquent, la première chose à faire est de permettre à l'utilisateur d'accéder aux informations dont il aura besoin.

`mysql> GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';`

Une fois que vous avez finalisé les autorisations que vous souhaitez configurer pour vos nouveaux utilisateurs, assurez-vous toujours de recharger tous les privilèges.

`mysql > FLUSH PRIVILEGES;`

Connexion maintenant à l'aide de la commande 
`mysql -u username -p`


Voilà pour le setup de la DB.

##
### Maintenant le server

  

On va avoir besoin de plusieurs outils

  

```

npm i -S express body-parser

```

  

Maintenant, nous configurons le serveur d'application express de base avec le fichier `server.js` suivant:

```js

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

```

  

Comme vous pouvez le voir, comme avec l'appel de fonction app.get
- Nous définissons une Route sur notre serveur
- Le serveur répondra aux appels GET pour cette route
- Le rappel le traitera de la manière suivante:
`(req, res) => res.send('Hello World!')`
Et pour cet itinéraire, la réponse sera `Hello World`.

Et si nous écrivons la même ligne comme suit:
```js
app.post('/', (req, res) => res.send('Hello POST World!'))
```
C'est la même chose que GET.
Sauf que avec la méthode .post, le serveur répondra aux requêtes POST sur ces Routes avec la chaîne `Hello POST World`.

Comme nous utilisons la base de données MySQL ici, nous devons configurer l'accès à la base de données pour Node.js.
Pour cela, nous aurons besoin du package `mysql` pour Node.js. Allons-y et installons le package en tant que dépendance principale.

```sh
npm i -S mysql
```

Après avoir installé `mysql`, nous pouvons écrire notre code de base pour nous connecter à la base de données, puis obtenir des données d'une table. Il peut s'écrire comme suit:

```js
const express = require('express');
const bodyParser = require("body-parser");
const sql = require('./models/db.js');
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get('/', (req, res) => {
  res.json({ message: "Bienvenu sur l'API Oclock memory" });
});

// Get the best score
app.get('/best', (req, res) => {
  sql.query('select name, MAX(score) as score from players',(err, result) => {   
    if (err) {
        console.log("error: ", err);
        return;
      }
      res.send(result);
    });
});

''
// Create a new or Update player
app.post("/player",  (req, res) => {
  sql.query(`INSERT INTO players (name, score) VALUES ('${req.body.name}', ${req.body.score}) ON DUPLICATE KEY UPDATE score = ${req.body.score};`,
  (err, result) => {
        
    if (err) {
        console.log("error: ", err);
        return;
      }
      res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

```



