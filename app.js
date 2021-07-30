let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let  dotenv = require('dotenv');
dotenv.config();  


let session = require('express-session');
let app = express();

app.set('port', process.env.PORT || 4000);


let indexRouter = require('./routes/index');
let productosRouter = require('./routes/productos'); 
let clientesRouter = require('./routes/clientes');
let proveedoresRouter = require('./routes/proveedores');
let loginRouter = require('./routes/login');
let registrarseRouter = require('./routes/registrarse');
let logoutRouter = require('./routes/logout');



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
