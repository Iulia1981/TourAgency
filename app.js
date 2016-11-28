var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//создаем порт
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

//маршруты для домашней страницы 
app.get('/', function(req, res){
  res.render('home');
});

var fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно."
];

//маршруты для страницы About
app.get('/about', function (req,res){
  var randomFortune =
      fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express running at http://localhost:' + app.get('port') + ':Press Ctrl+C for finish');
});

module.exports = app;
