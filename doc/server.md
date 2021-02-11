 # L'API
Maintenant on va parler sérieux !

Avant de commencer notre api on va avoir besoin d'une base de donées.

Pour ça j'ai choisie Mysql, plus répendu et plus rapide à prendre en main.

### La base de données

On aura besoin d'une base de donées qui va s'appeller `oclock` avec une table `players` qui dispose de deux row `name - varchar/ unique` et `score - int`

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


On va Pouvoir créer deux dossier:
- un pour la config de la connection
- un pour la connection elle même

Comme suit:

```
-server
    -config
        -db.config.js
    -models
        -db.js
```


dans le fichiers db.config.js

```js
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MOT_DE_PASSE",
    DB: "oclock"
  };
```

dans le fichiers db.js 

```js
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
```

