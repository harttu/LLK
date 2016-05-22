var express = require('express');
var moment = require('moment');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

var bodyParser = require('body-parser')

//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/llk');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var PistePeli = mongoose.model('pistepeli', {kayttaja: String, peliTyyppi:String,
                                        vaikeusAste:String,kysymystenMaara:Number,
                                        oikeinSuhde:Number,
                                        kysymykset:Array,
                                        aika:String });
                                        
var Kayttaja = mongoose.model('kayttaja',{kayttajaTunnus:String,
                                          salasana:String,
                                          etuNimi:String,
                                          sukuNimi:String,
                                          aika:Number,
                                          ryhma:String,
                                          sahkoPosti:String,
                                          luontiAika:String
                                          });
// Tarviiko tämän
//require('connect-ensure-login').ensureLoggedIn()

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

// Tähän koodataan se miten passport tekee varsinaisen
// authenticoinnin.

function apu(username,cb){
   Kayttaja.findOne({kayttajaTunnus: username }, function (err, userObj) {
        console.log("<<<<<<<<<<CALLBACK SUORITETTIIN> HAE KAYTTAJA>>>>>>>>>>>>>>>>>>");
        if (err) {
            console.log(err);
            console.log('User not found!');
            //return cb(null, null);
            cb(null,null);
        } else if (userObj) {
            //return cb(null, userObj);
            console.log("Sain")
            console.log("sen salasana on=>"+userObj.salasana)
            //console.dir(userObj)
            cb(null,userObj);
        }
    }); 
}

passport.use(new Strategy(
  function(username, password, cb) {  
      console.log("Passport:");
      console.log(username);
      console.log(password);
//    db.users.findByUsername(username, function(err, user) {
      apu(username,function(err,user) {
          if (err) { console.log(">>err"); return cb(err); }
          if (!user) { console.log(">>!user"); return cb(null, false); }
          if (user.salasana != password) { console.log(">>user.salasana != password");
                        console.log("user=>"+user) 
                        console.log("user.salasana=>"+user.salasana);
                        return cb(null, false); }
          return cb(null, user);
    });
  }));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

function apu2(id,cb){
    Kayttaja.findById(id, function (err, userObj) {
        console.log("<<<<<<<<<<CALLBACK SUORITETTIIN> HAE ID>>>>>>>>>>>>>>>>>>");
        if (err) { 
            console.log(err);
            console.log('User not found!');
            //return cb(null, null);
            cb(err);
        } else if (userObj) {
            //return cb(null, userObj);
            console.log("Sain")
            console.log("sen salasana on=>"+userObj.salasana)
            //console.dir(userObj)
            cb(null,userObj);
        }
    }); 
}


passport.deserializeUser(function(id, cb) {
  apu2(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
  
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('morgan')('combined'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//app.use(passport.session())

// redirect all the calls to /assets to 
app.use('/assets', express.static(__dirname + '/public'));


// redirect all the calls to /assets to 
app.use('/directives', express.static(__dirname + '/html/directives'));


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// create application/json parser 
var jsonParser = bodyParser.json()

// ROUTEs.

// Define a middleware function to be used for every secured routes 
var auth = function(req, res, next){ 
    console.log("Suoritetaan auth ||| arvo:"+req.isAuthenticated())
    if (!req.isAuthenticated()) res.sendStatus(401);//res.send(401); 
    else next(); 
    }; //- See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
// route to test if the user is logged in or not 
app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); }); 
// route to log in 
app.post('/angularLogin', passport.authenticate('local'), function(req, res) { res.send(req.user.kayttajaTunnus); }); 
// route to log out 
app.post('/logout', function(req, res){ req.logOut(); res.send(200); });
// - See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

 app.get('/', function(req, res) { res.render('index.ejs', { user: req.user });});
 app.get('/index',function(req,res){ res.render("viewIndex.ejs"); }) 
 //app.get('/index2',function(req,res){ res.render("index.ejs"); }) 
 app.get('/roomalaiset',function(req,res){ res.render("roomalaiset.ejs"); })
 //app.get('/ohjaus',function(req,res){ res.render("index.ejs"); })
 app.get('/yksikko',function(req,res){ res.render("yksikko.ejs"); })
 app.get('/ohjaus',function(req,res){ res.render("ohjaus.ejs"); })
 app.get('/logIn',
//     require('connect-ensure-login').ensureLoggedOut('/kirjauduEnsin'), 
function(req,res){ res.render("angularLogin.ejs"); })
 app.get('/signUp',function(req,res){ res.render("signUp.ejs"); })
 app.get('/kirjauduEnsin',function(req,res){ res.render("kirjauduEnsin.ejs");})
 app.get('/profile',auth, function(req,res){ res.render("profiili.ejs"); })
 app.get('/valikko',function(req,res){ res.render("valikko.ejs"); })
 
 app.get('/logout', function(req,res){ 
     console.log('/logOut kutsuttu');
//    req.logout(); 
    res.render('logOut.ejs')
    
    });//res.render('index.ejs'); });
 //   */
 app.get('/tulokset', 
        auth,
        function(req,res){
            res.render("tulokset.ejs", {user:req.user.kayttajaTunnus/*,keys:Object.keys(req.user)*/}); // tähän user.username
        }
 );
 
 app.post("/lisaaPeli/",jsonParser,function(req,res){
     if (!req.body) return res.sendStatus(400);
     console.log("/lisaaPeli kutsuttu");
 //    console.dir(req)
//     console.dir(req.body)
    console.log("kayttaja: "+req.body.kayttaja+", peliTyyppi: "+req.body.peliTyyppi);
    PistePeli.find({kayttaja: req.body.kayttaja, peliTyyppi: req.body.peliTyyppi}, function (err, userObj) {
        console.log("<CALLBACK SUORITETTIIN>");
        if (err) {
            console.log("Ei toimi!!!!!!!");
            console.log(err);
        } else if (userObj) {
            console.log("Järjestä uudestaan");
            userObj.sort(function(a, b) { return parseFloat(b.oikeinSuhde) - parseFloat(a.oikeinSuhde);});

            console.log("Yritetään poistaa jotain");
            console.log("  userObj on:"+userObj.length)
            for(var i = 0; i < userObj.length;i++){
                if(i > 2){
                    console.log("Tämä pitäisi poistaa")
                    PistePeli.remove({ _id: userObj[i].id }, function(err) {
                        if (!err) {
                                console.log('notification! > Deleted');
                        }
                        else {
                                console.log('error');
                        }
                    });
                }
            }
    } else {
        console.log('User not found!');
    }
    });

     
     var peli = new PistePeli({kayttaja: req.body.kayttaja,peliTyyppi: req.body.peliTyyppi, 
                          vaikeusAste: req.body.vaikeusAste, kysymystenMaara:req.body.kysymystenMaara,
                          oikeinSuhde: req.body.oikeinSuhde,
                          kysymykset: req.body.data,
                          aika: req.body.aika });

    peli.save(function (err, userObj) {
        if (err) {
            console.log(err);
            res.json({nimi:err}) 
        }  else {
            console.log('saved successfully:', userObj);
            res.json(userObj);
        }
    });

});
 
app.get("/haePeli/:kayttaja/:peliTyyppi",
//  require('connect-ensure-login').ensureLoggedIn(),
  auth,
  function(req,res){
    //Lets try to Find a user
    PistePeli.find({kayttaja: req.params.kayttaja, peliTyyppi: req.params.peliTyyppi}, function (err, userObj) {
        console.log("<<<<<<<<<<CALLBACK SUORITETTIIN>>>>>>>>>>>>>>>>>>>");
        if (err) {
            console.log(err);
        } else if (userObj) {
// LAJITTELE PARHAAN MUKAAN
//                 userObj.sort(function(a, b) { return parseFloat(b.oikeinSuhde) - parseFloat(a.oikeinSuhde);});

        res.status(200).json(userObj);

        } else {
            console.log('User not found!');
        }
    });
});
 
 
 app.post("/angularPeliTilanne/",jsonParser,function(req,res){
     if (!req.body) return res.sendStatus(400);
     console.log("testJSONPOST")
     console.dir(req)
     console.dir(req.body)

     res.json({nimi:"OK"}) 
  
});

app.get('/haeKayttajat',function(req,res){
    // palauta kaikki käyttäjät 
    var kayttajat = [];
    Kayttaja.find().exec(function (arr,data) {
        data.forEach(function(that){kayttajat.push(that.kayttajaTunnus)});
        res.status(200).json(kayttajat);
  });
})



app.post("/signUp/",jsonParser,function(req,res){
     if (!req.body) return res.sendStatus(400);
     console.log(">>>>>>>>>>>>>signUp sain tiedot")
     console.dir(req.body)
     
     var kayttaja = new Kayttaja({kayttajaTunnus:req.body.kayttajaTunnus,
                                          salasana:req.body.salasana,
                                          etuNimi:req.body.etuNimi,
                                          sukuNimi:req.body.sukuNimi,
                                          ryhma:req.body.ryhma,
                                          sahkoPosti:req.body.sahkoPosti,
                                          luontiAika:req.body.luontiAika
                                          });

    kayttaja.save(function (err, userObj) {
        if (err) {
            console.log(err);
            res.json({nimi:err}) 
        }  else {
            console.log('saved successfully:', userObj);
            res.json(userObj);
        }
    });

     console.dir(req)
     console.dir(req.body)

//     res.json({nimi:"OK"}) 
  
});


app.listen(5000);
