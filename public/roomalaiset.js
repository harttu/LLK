(function(window){
     var roomalaiset =[
                        ["","I","II","III","IV","V","VI","VII","VIII","IX"],
                        ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
                       ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
                       ["","M","MM","MMM","MT","T","TM","TMM","TMMM"],
                    ]; 
    // Function Constructor  
    var Kysymys = function(taso){
        this.kysymys = {
                luku : 5,
                roomalaisina : 0,
        }
        this.asetukset = {
            taso: 1,
            maksimi : 10,
            suhde : function() { return this.taso/this.maksimi }
        }
        this.asetukset.taso = taso || 1;
    }
    
    Kysymys.prototype.asetaTaso = function(suhde){
        this.asetukset.taso = suhde * this.maksimi;
    }
    
    Kysymys.prototype.tarkistaVastaus = function(vastaus) {
        var oikeaVastaus = Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000;
        console.log("Oikea vastaus on:"+oikeaVastaus)
        if( vastaus === Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000 ) {
            return true;
        }
        else{
            return  false;
        }
    }
    
    Kysymys.prototype.esitaSelitys = function(){
        "use strict";
        var selitys = "";
        var intialainen = [];
        var roomalainen = [];
        for(var i = 0; i < this.kysymys.luvut.length; i++){
            if( this.kysymys.luvut[i] ){
                selitys = selitys + 
                          roomalaiset[3-i][this.kysymys.luvut[i]] + 
                          " on " + 
                          this.kysymys.luvut[i] * Math.pow(10,3-i) +
                          "<br />"; 
                 intialainen.push(this.kysymys.luvut[i] * Math.pow(10,3-i));
                 roomalainen.push(roomalaiset[3-i][this.kysymys.luvut[i]])
            }    
        }
        selitys += "<br/>";
        
        for(var i = 0; i < intialainen.length; i++){
            console.log("DEBUG i="+i+" length="+intialainen.length)
            if( i + 1 !== intialainen.length ){
                selitys = selitys + intialainen[i] + " + ";
            }
            else{
                selitys = selitys + intialainen[i] + " = ";
            }
        }
        selitys += this.kysymys.luku;
        /*
        var apuSelitys = "<br />";
        for(var i = 0; i < roomalainen.length; i++){
            console.log("DEBUG i="+i+" length="+roomalainen.length)
           // if( i + 1 !== intialainen.length ){
            apuSelitys = roomalainen[i] + " " + apuSelitys;
           // }
            //else{
            //    selitys = selitys + intialainen[i] + " = ";
            //}
        }
        apuSelitys = this.kysymys.roomalaisina + " = " + apuSelitys;
        apuSelitys += "<br />";
        selitys = apuSelitys + selitys;
        */
        selitys = "<br />" + this.kysymys.roomalaisina + ":ssä <br /> " + selitys + "<br />";
        return selitys;
       
    }
    
    Kysymys.prototype.esitaKysymys = function(){
        var liitteet = { "0":"g",
                         "-3":"mg",
                         "-6":"mikrog"
                         };                 
       var oikeaVastaus = Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000;
        
        var palautus = "Kirjoita numeroina " +this.kysymys.roomalaisina + ".";
        return palautus;
    }
    
    Kysymys.prototype.oikeaVastaus = function(){
        return Math.floor(this.kysymys.luku);
    }
    
    Kysymys.prototype.vastauksenYksikko = function(){
        return "";
    }
    
    Kysymys.prototype.kysymyksenYksikko = function(){
        return "";
    }
    
    Kysymys.prototype.esitaKysymyksenYksikko = function(){
        var liitteet = { "0":"g",
                         "-3":"mg",
                         "-6":"mikrog"
                         };                 
        return liitteet[this.kysymys.kysyttyEksponentti];
    }
    
    Kysymys.prototype.luoKysymys = function(taso){
        //
        // Arvotaan ensin luku tason mukaan
        // 
        //
        //
        console.log("Taso on = "+taso)
        var vaikeusAste = Math.round(O.linearMap(0,1,0,6,taso));
        console.log("roomalaiset:luoKysymys::vaikeusAste = "+vaikeusAste);
        var ykkoset = kymmenet = sadat = tuhannet = 0;
        
            if( vaikeusAste === 0){
                // Kysytään lukuja väliltä 1 - 10 '0u 
                //luku = Math.round((Math.random() * 9), 1) + 1; 
                //luku = Math.floor(Math.random() * 9) + 1;
                
                // Arvotaan 
                if( Math.random() < 0.9){
                    ykkoset = Math.round((Math.random() * 8), 1) + 1;
                }
                else{
                    kymmenet = 1;
                }
            }
            else if( vaikeusAste === 1) {
                // Kysytään joku lukuja väliltä 20 - 90, tasakymmenen välein
                kymmenet = (Math.round((Math.random() * 7), 1) + 2); 
            }
            else if( vaikeusAste === 2) {
                // Kysytään joku luku väliltä 100 - 900, tasasatasin 
                if( Math.random() < 0.9){
                    sadat = ( Math.round(Math.random() * 8, 1) + 1 );
                }
                // Tai valitaan 1000
                else{
                    tuhannet = 1;
                } 
            }
            else if( vaikeusAste === 3 ){
                // Kysytään lukuja väliltä 11-99, mutta ei tasakymmeniä
                kymmenet = Math.round((Math.random() * 8), 1) + 1;
                ykkoset = Math.round((Math.random() * 8), 1) + 1;
            }
            else if( vaikeusAste === 4 ) {
                // Kysytään luku muotoa, ab0, missä a ja b eivät ole nollia
                sadat = Math.round((Math.random() * 8), 1) + 1;
                kymmenet = Math.round((Math.random() * 8), 1) + 1;
            }
            else if( vaikeusAste === 5 ) {
                // Kysytään luku muotoa a0b, missä a ja b eivät ole nollia
                sadat = Math.round((Math.random() * 8), 1) + 1;
                ykkoset = Math.round((Math.random() * 8), 1) + 1;
            }
            else if( vaikeusAste === 6 ) {
                // Kysytään luku muotoa abc, missä a,b ja c eivät ole nollia
                sadat = Math.round((Math.random() * 8), 1) + 1;
                kymmenet = Math.round((Math.random() * 8), 1) + 1;
                ykkoset = Math.round((Math.random() * 8), 1) + 1;
            }
            else{
                var arpa = Math.round(Math.random()*6) + 1;
                console.log("Arvotaan Satunnainen");
                //var luku = $scope.luoUusiRoomalaisetKysymys(arpa,edellinen);
            }
           
     var oikeaVastaus = 1000*tuhannet + 100*sadat + 10*kymmenet + 1*ykkoset;
     var luvut = [tuhannet,sadat,kymmenet,ykkoset];
     var roomalaisetTekstina  = roomalaiset[3][tuhannet]+roomalaiset[2][sadat]+roomalaiset[1][kymmenet]+roomalaiset[0][ykkoset];
     this.kysymys.luku = oikeaVastaus;
     this.kysymys.luvut = luvut;
     this.kysymys.roomalaisina = roomalaisetTekstina;
    }

    window.Kysymys.roomalaiset = Kysymys;    
    console.log("Lisätään roomalaiset");//+window.Kysymys.roomalaiset)

}(window));