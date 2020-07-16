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

const multer = require('multer');
const moment =  require('moment');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './upload');  // 파일이 저장되는 경로입니다.
    },
    filename: function(req, file, cb) {
      cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname);  // 저장되는 파일명
    }
  });
  

// const upload = multer({dest: './upload'});
const upload = multer({storage: storage});



app.get('/api/customers',(req, res) => {
  connection.query("SELECT * FROM `CUSTOMER` WHERE isDeleted = 0",
    (err, rows, fields) => {  //쿼리를 날려서 가져온 정보를 rows에 담아서 보낸다.
        res.send(rows); 
    }
  );
});

app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO `CUSTOMER` VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })

});

app.delete('/api/customers/:id',  (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted =1 WHERE id = ?';

    let params = [req.params.id];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        })


})

app.listen(port, () => console.log(`Listening on port ${port}`));