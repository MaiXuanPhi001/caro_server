const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongodb = require('./connects/mongoDB')
const socketio = require("socket.io");
const session = require('express-session')

const usersRouter = require('./routes/api/user');
const matchRouter = require('./routes/api/match')
const otpRouter = require('./routes/api/otps')

const app = express();
const server = require('http').createServer(app);
const io = socketio(server);
mongodb.connect().then()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mykey',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/api/user', usersRouter)
app.use('/api/match', matchRouter)
app.use('/api/otp', otpRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  socket.on('client-find-match', data => {
    io.emit('server-find-match', data)
  })

  socket.on('client-find-match-success', data => {
    io.emit('server-find-match-success', data)
  })

  socket.on('client-attack', data => {
    io.emit('server-attack', data)
  })

  socket.on('client-done-match', data => {
    io.emit('server-done-match', data)
  })

});

module.exports = { app: app, server: server }
