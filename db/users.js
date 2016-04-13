var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', 
emails: [ { value: 'jack@example.com' } ] , 
roomalaiset:{ 
	badge: { parasTulos:"7", nykyinenTaso:"3"}, 
	pistepeli5:{ viimeinenPeli:[[1,1],[2,1],[2,0],[3,1],[4,0]] },
	    }, 
reseptit:{ 
	badge: { parasTulos:"3", nykyinenTaso:"3"}, 
	pistepeli5:{viimeinenPeli:[[1,0],[2,0],[2,1],[3,0],[4,0]]} 
	 }, 
}, 
{ id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', 
emails: [ { value: 'jill@example.com' } ],
roomalaiset:{ 
	badge: { parasTulos:"1", nykyinenTaso:"1"}, 
	pistepeli5:{ viimeinenPeli:[[5,1],[5,1],[6,1],[6,1],[7,1]] },
	    }, 
reseptit:{ 
	badge: { parasTulos:"2", nykyinenTaso:"2"}, 
	pistepeli5:{viimeinenPeli:[[5,0],[5,0],[5,1],[6,0],[7,0]]} 
	 },
}
];
exports.palautaPeli = function(msg) { 
	return records[msg.kayttaja].roomalaiset.pistepeli5.viimeinenPeli;
};
exports.paivitaPeli = function(msg) {
	var temp = records[msg.kayttaja].roomalaiset.pistepeli5.viimeinenPeli;
	console.log("  paivitaPeli:"+temp);
	//temp.unshift(msg.tieto);
	//records[0].roomalaiset.pistepeli5.viimeinePeli.pop();
	temp.push(msg.sisalto);
	console.log("  paivitaPeli:"+temp);	
};
exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}
// tietokantaa varten
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/llk');
/*
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
//*/
exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
      // hae tietokannasta tiedot,jos ne saadaan talleta tulokset taulukkoon records
      Kayttaja.find({kayttajaTunnus: username }, function (err, userObj) {
        console.log("<<<<<<<<<<CALLBACK SUORITETTIIN> HAE KAYTTAJA>>>>>>>>>>>>>>>>>>");
        if (err) {
            console.log(err);
            console.log('User not found!');
            return cb(null, null);

        } else if (userObj) {
             return cb(null, userObj);
        }
    /* ALKUPERÄINEN, JOKA LUKEE VAIN STATIC
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
  */
});
});
}


exports.haePeliTyyppi = function(username, tyyppi){
//process.nextTick(function(){
	for (var i = 0, len = records.length; i < len; i++) {
		var record = records[i];
		if (record.username === username) {
			var palautettava = record[tyyppi];
			if( palautettava ) {  
				console.log("haePeliTyyppi palautan löydetyn:"+palautettava);
				return palautettava;
			}
			else {
				console.log("haePeliTyyppi ei löytynyt tyyppiä:"+tyyppi);
				return "";	
			}
		}
	}
	console.log("haePeliTyyppi palautan tyhjän");
	return [0,null];
};
//}

exports.lisaaJackille = function(data){
    records[0].roomalaiset.pistepeli5.viimeinenPeli.push(data);
}
