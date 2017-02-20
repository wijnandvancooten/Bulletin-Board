const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require ('pug'),
      Sequelize = require ('sequelize');

var app = express(),
          sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres'});

var noticesRouter = require('./routes/notices');


app.use(express.static('public'));


var notice = sequelize.define('notice', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ecended: false}));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
	response.render('notice');
});

app.post('/notices', (request, response) => {
  notice.create(request.body);
  //.then(() => {
  //response.redirect('/board');
});


//probebly for deleting a message in the bulletin-board//
//app.use(mothedOverride((req, res) =>{
//  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
//    var method = req.body._method;
//    delete req.body._mthod;
//    return method;
//  }})
//);


//server is running on port 3000//
sequelize.sync().then(() => {
  app.listen(3000, function() {
    console.log('Web server started on port 3000');
  });
});
