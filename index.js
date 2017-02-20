const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require ('pug'),
      Sequelize = require ('sequelize');

var app = express(),
          sequelize = new sequelize('bulletin-board', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres'});

var noticesRouter = require('./routes/notices');

var notice = sequelize.define('notice', {
  title: sequelize.STRING,
  body: sequelize.TEXT
});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ecended: false}));

//probebly for deleting a message in the bulletin-board
app.use(mothedOverride((req, res) =>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._mthod;
    return method;
  }})
);
