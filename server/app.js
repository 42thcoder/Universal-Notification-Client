var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , sio = require('socket.io')
  , RedisStore = require('connect-redis')(express)
  , sessionStore = new RedisStore()
  , connect = require('connect')
  , cookieMethod = require('cookie')
  , settings = require('./settings');

//settings of express
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(settings.cookieSecrect));
  app.use(express.session({
    secrect: settings.cookieSecrect,
    store: sessionStore
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//route
routes(app);

//turn on the server and socket.io
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = sio.listen(server);
//let socket.io read the session.
io.configure(function() {
    io.set('authorization', function(data, callback) {
        if (data.headers.cookie) {
            var cookie = connect.utils.parseSignedCookies(
              cookieMethod.parse(decodeURIComponent(data.headers.cookie)), settings.cookieSecrect);
            console.log('------------ Here is the cookie ' + JSON.stringify(cookie));
            sessionStore.get(cookie['connect.sid'], function(err, session) {
                if (err || !session) {
                  console.log(session);
                  callback('Error', false);
                } else {
                  data.session = session;
                  callback(null, true);
                }
            });
        } else {
            callback('No cookie', false);
        }
    });
});

io.sockets.on('connection', function(socket) {
    var session = socket.handshake.session;
    console.log("----------------Here is the session " + JSON.stringify(session));

    socket.emit(session, "test");
});