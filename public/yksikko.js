(function(window){
    var liitteet = { "0":"g",
                    "-3":"mg",
                    "-6":"mikrog"
                    };  
      // Function Constructor  
    var Kysymys = function(taso){
        this.kysymys = {
                mantissa : 5,
                eksponentti : 0,
                kysyttyEksponentti : -3 
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
        if( this.kysymys.eksponentti > this.kysymys.kysyttyEksponentti){
            var pitkaString = "Pilkku siirtyy luvussa " + 
                            parseFloat(Math.round(this.kysymys.mantissa * 100) / 100).toFixed(3) + 
                            " " + 
                            this.kysymyksenYksikko() + 
                            " "  + 
                            Math.abs(this.kysymys.eksponentti - this.kysymys.kysyttyEksponentti) + 
                            " askelta oikealle.<br/>Eli oikea vastaus on " + 
                            this.oikeaVastaus() + 
                            " " + 
                            this.vastauksenYksikko() + 
                            "<br />";
            return pitkaString;
        }
        else {
            var pitkaString = "Pilkku siirtyy luvussa " + 
                               parseFloat(Math.round(this.kysymys.mantissa * 100) / 100).toFixed(3) + 
                               " "  + 
                               this.kysymyksenYksikko() +
                               " " +
                               Math.abs(this.kysymys.eksponentti - this.kysymys.kysyttyEksponentti) +
                               " askelta vasemmalle.<br/>Eli oikea vastaus on " + 
                               this.oikeaVastaus() + 
                               " " + 
                               this.vastauksenYksikko() +
                               "<br />";
            return pitkaString;
        }
    }
    
    Kysymys.prototype.esitaKysymys = function(){
        var liitteet = { "0":"g",
                         "-3":"mg",
                         "-6":"mikrog"
                         };                 
       var oikeaVastaus = Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000;
        
        var palautus = "Muunna luku " +this.kysymys.mantissa + //* Math.pow(10,this.kysymys.eksponentti) + 
                       " " + liitteet[this.kysymys.eksponentti] + 
                       " yksikköön " + liitteet[this.kysymys.kysyttyEksponentti] +
                       ".";
        return palautus;
    }
    
    Kysymys.prototype.oikeaVastaus = function(){
        return Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000;
    }
    
    Kysymys.prototype.vastauksenYksikko = function(){
        return liitteet[this.kysymys.kysyttyEksponentti];
    }
    
    Kysymys.prototype.kysymyksenYksikko = function(){
        return liitteet[this.kysymys.eksponentti];
    }
    
    Kysymys.prototype.esitaKysymyksenYksikko = function(){
        var liitteet = { "0":"g",
                         "-3":"mg",
                         "-6":"mikrog"
                         };                 
        return liitteet[this.kysymys.kysyttyEksponentti];
    }
    
    Kysymys.prototype.luoKysymys = function(taso) {
        if(taso){
            this.asetukset.taso = taso;
        }
         
        //var suhde = this.asetukset.suhde();
        var suhde = taso;
        var obj = this;
        console.log("Kysymyksen suhde on "+suhde);
        console.log("obj on ");
        console.dir(obj);
        

        var diskreetinJakaumanFunktio = function(tn1,tn2,tn3,tn4,tn5,tn6){
            // "use strict";
            var arpa1000 = Math.ceil(Math.random() * 9) * 1000;
            var arpa100 = Math.ceil(Math.random() * 9) * 100;
            var arpa10 = Math.ceil(Math.random() * 9) * 10;
            var arpa1 = Math.ceil(Math.random() * 9);
            
            var palautettavatArvot = [
                arpa1000,
                arpa1000+arpa100,
                arpa100+arpa10,
                arpa10,
                arpa1,
                arpa100 + arpa1
            ];
            console.log(palautettavatArvot)
            var arpa = Math.round(Math.random() * 100);
            var rajat = [0,
                            tn1,
                            tn1+tn2,
                            tn1+tn2+tn3,
                            tn1+tn2+tn3+tn4,
                            tn1+tn2+tn3+tn4+tn5,
                            tn1+tn2+tn3+tn4+tn5+tn6
                            ]
            console.log(rajat);                         
            for(var i = 0; i < rajat.length - 1; i++) {
                if( rajat[i] <= arpa && arpa <= rajat[i + 1] ){
                    console.log("i:n arvo on "+i+" arvan arvo on "+arpa)
                    return palautettavatArvot[i];
                }
            }                             
        }

        var asetaEkspJaKysyttyEksp = function(obj,eksp1,eksp2){
                    obj.kysymys.eksponentti = eksp1;
                    obj.kysymys.kysyttyEksponentti = eksp2; 
        }

        // Helpot kysymykset
        // Vain muunnoksia mg <-> g 
        if( suhde < 0.15) {
            asetaEkspJaKysyttyEksp(obj,0,-3); // g -> mg
            obj.kysymys.mantissa = diskreetinJakaumanFunktio(100,0,0,0,0,0) / 1000;
        }
        else if( 0.15 < suhde && suhde < 0.3 ) {
            // muunnos P(mg -> g) = P(g -> mg)
            if( Math.random() < 0.5) {
                asetaEkspJaKysyttyEksp(obj,0,-3); // g -> mg
                obj.kysymys.mantissa = diskreetinJakaumanFunktio(50,50,0,0,0,0) / 1000;
            }
            else { 
                asetaEkspJaKysyttyEksp(obj,-3,0); // mg -> g
                obj.kysymys.mantissa = diskreetinJakaumanFunktio(100,0,0,0,0,0); //* 1000;
            }  
        }
            // Normaalit kysymykset
        else if( suhde > 0.3 && suhde < 0.7) {
            // Sekä muunnoksia mg <-> g ja mg <->mikrog
            var raja = 0.7; // 70 % tn.:llä tulee perinteinen muutos mg <-> g
            // muunnos P(mg -> g) = P(g -> mg)
            if( Math.random() < raja ) {
                if( Math.random() < 0.5) {
                    asetaEkspJaKysyttyEksp(obj,0,-3); // g -> mg
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(10,20,20,30,30,0) / 1000;
                }
                else { 
                    asetaEkspJaKysyttyEksp(obj,-3,0); // mg -> g
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(10,20,20,30,30,0);// * 1000;
                }  
            }
            // Muunnos P( mikrog -> mg )
            else { 
                if( Math.random() < 0.5) {
                    asetaEkspJaKysyttyEksp(obj,-3,-6); // mg -> mikrog
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(50,50,0,0,0,0) / 1000;
                }
                else { 
                    asetaEkspJaKysyttyEksp(obj,-6,-3); // mikrog -> mg
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(30,40,30,0,0,0);// * 1000;
                }
            }  
        }
        // Vaikeat kysymykset
        else {
              // Sekä muunnoksia mg <-> g ja mg <->mikrog
            var raja1 = 0.2; // 30 % tn.:llä tulee perinteinen muutos mg <-> g
            var raja2 = 0.8;
            var arpa = Math.random();
            // muunnos P(mg -> g) = P(g -> mg)
            if( arpa < raja1 ) {
                if( Math.random() < 0.5) {
                    asetaEkspJaKysyttyEksp(obj,0,-3); // g -> mg
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(0,0,20,30,30,20) / 1000;
                }
                else { 
                    asetaEkspJaKysyttyEksp(obj,-3,0); // mg -> g
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(0,0,30,20,20,30);// * 1000;
                }  
            }
            // Muunnos P( mikrog -> mg )
            else if( raja1 < arpa && arpa < raja2 )  { 
                if( Math.random() < 0.5) {
                    asetaEkspJaKysyttyEksp(obj,-3,-6); // mg -> mikrog
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(0,0,20,30,30,20) / 1000;
                }
                else { 
                    asetaEkspJaKysyttyEksp(obj,-6,-3); // mikrog -> mg
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(0,0,20,30,30,20);
                }
            }
            else{
                if( Math.random() < 0.5) {
                    asetaEkspJaKysyttyEksp(obj,0,-6); // g -> mikrog
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(10,10,20,20,20,20) / 1000;
                }
                else { 
                    asetaEkspJaKysyttyEksp(obj,-6,0); // mikrog -> mg
                    obj.kysymys.mantissa = diskreetinJakaumanFunktio(10,20,20,20,20,10);
                }
            }
        }
    }
    
  //  window.Kysymys = {}; 
    
    window.Kysymys.yksikko = Kysymys;
    console.log("Lisätään yksikkoa");//+window.Kysymys.tabletti)

    
}(window));
