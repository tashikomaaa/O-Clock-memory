 # L'API
Maintenant on va parler sérieux !

Avant de commencer notre api on va avoir besoin d'une base de donées.

Pour ça j'ai choisie Mysql, plus répendu et plus rapide à prendre en main.

### La base de données

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
const mysql = require('mysql');

// recupère le HOST depuis Environment ou utilise le defaut
const host = process.env.DB_HOST || 'localhost';

// recupère l'utilisateur depuis Environment ou utilise le default
const user = process.env.DB_USER || 'root';

// recupère le Password pour la DB depuis Environment ou utilise le default
const password = process.env.DB_PASS || '';

// recupère la Database depuis Environment ou utilise default
const database = process.env.DB_DATABASE || 'oclock';

//   Créez la connexion avec les détails requis
const con = mysql.createConnection({
  host, user, password, database,
});

const query = "SELECT * FROM tweets";
 
// établir une connexion à la base de données.
con.connect(function(err) {
  if (err) throw err;

  // si la connexion est réussie
  con.query(query, (err, result, fields) => {
    // si une erreur lors de l'exécution de la requête ci-dessus, renvoie une erreur
    if (err) throw err;

    //   s'il n'y a pas d'erreur, vous avez le résultat
    console.log(result);
 });
});
```



