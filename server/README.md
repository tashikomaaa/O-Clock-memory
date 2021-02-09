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



