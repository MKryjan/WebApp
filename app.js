const http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  port: "3306",
  password: "password",
  database: "APP",
  //insecureAuth : true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

  app.get('/login.pug', function (req, res) {
    res.render(
      'login.pug', {
        //greeting: 'Logowanie'
      },
      function (err, html) {
        if (err) console.log(err);
        res.status(200).send(html);
      }
    );
  });
  app.get('/index.pug', function (req, res) {
    res.render('index.pug', {
      greeting: 'Witaj w aplikacji'
    });
  });
  app.get('/form.pug', function (req, res) {
    res.render('form.pug', {
      //greeting: 'Witaj w aplikacji'
    });
  });
  app.get('/profile.pug', function (req, res) {
    res.render('profile.pug', {
      //greeting:'Użytkowniku: '
    });
  });
  app.get('/products', function (req, res) {
    res.render('products.pug');
  });
  app.get('/search', function (req, res) {
      con.query('SELECT product from tab where product like "%'+ req.query.key +'%"', function (err, rows, fields) {
        if (err) throw err;
        var data = [];
        for (i = 0; i < rows.length; i++) {
          data.push(rows[i].product)
        }
        res.end(JSON.stringify(data));
        console.log(JSON.stringify(data));
     });
    });
 
  /*app.get('/', function (req, res) {
    res.render('index.pug');
  });*/
  // {msg: JSON.stringify(parsedData[0].product) }
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Serwer Express nasłuchujący na porcie' + app.get('port'));
  });



