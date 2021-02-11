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
  sql.query('select * from players where score = (select max(score) from players)',(err, result) => {   
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
