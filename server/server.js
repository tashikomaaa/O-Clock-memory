const express = require('express');
const mysql = require('mysql');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



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