const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app= express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

//  db연결
connection.connect();

app.get('/api/customers',(req, res) => {
  connection.query("SELECT * FROM `CUSTOMER`",
    (err, rows, fields) => {  //쿼리를 날려서 가져온 정보를 rows에 담아서 보낸다.
        res.send(rows); 
    }
  );
});
app.listen(port, () => console.log(`Listening on port ${port}`));