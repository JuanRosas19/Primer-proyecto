var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var app = express();

app.set('port', process.env.PORT || 3000);


var indexRouter = require('./routes/index');
var productosRouter = require('./routes/productos');
var clientesRouter = require('./routes/clientes');
var proveedoresRouter = require('./routes/proveedores');
var loginRouter = require('./routes/login');
var registrarseRouter = require('./routes/registrarse');
var logoutRouter = require('./routes/logout');



app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);
app.use('/proveedores', proveedoresRouter);
app.use('/login', loginRouter);
app.use('/registrarse', registrarseRouter);
app.use('/logout', logoutRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`Servidor en linea con el puerto ${app.get('port')}`);
});


module.exports = app;
