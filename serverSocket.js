var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

require('connect-ensure-login').ensureLoggedIn()

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// socket routes
io.on('connection', function(socket){
 console.log('a user connected');
 
 socket.on('disconnect',function(){
    console.log("user disconnected");
  });

  socket.on('chat message', function(msg){
    console.log("Sain:"+msg);
    io.emit('chat message', msg);
  });

  socket.on('peli', function(msg){
	console.log("Sain:"+msg.taso);
  });

  socket.on('tieto',function(msg){
	console.log("Vastaanotettu data:"+JSON.stringify(msg));
	db.users.paivitaPeli(msg);
	console.log("Muutettu tietoalkio:"+db.users.palautaPeli(msg));
	socket.emit("tiedot",db.users.palautaPeli(msg));
  });

});

//});

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/work',
  function(req,res){
	res.render('work');
});

app.get('/roomalaiset',
  function(req,res){
    res.render('roomalaiset');
});	

app.post('/work',
 //   require('connect-ensure-login').ensureLoggedIn(),
    function(req,res){
	//console.dir(req);
	console.log("Tyyppi on "+req.body.tyyppi);
	if( req.body.tyyppi ){
		console.log("  Haetaan tiettyä tyypiä");
		var data = db.users.haePeliTyyppi("jack",req.body.tyyppi);
	}
	else {
		console.log("   Haetaan roomalaisia");
		var data = db.users.haePeliTyyppi("jack","roomalaiset");
	}
	//var data = JSON.stringify(db.users.haePeliTyyppi("jack","roomalaiset")); 
	//var data = db.users.haePeliTyyppi("jack","roomalaiset");
	console.log("data:"+data);
	res.json(data);
	//res.write(data);
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

http.listen(5000);
//app.listen(3000);
