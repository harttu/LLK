// closure begins
(function(window){
    var nimet = ["Potilaalle","Kallelle","Eskolle","Irmalle","Liisalle","Juhanille","Jormalle","Päiville"];
    var haePermutaatiot = function(vaikeusAste){
        // Astetaan oletusalku arvo, jos alkuarvoa ei ole annettu
        vaikeusAste = vaikeusAste || 3;
        do
            if(  vaikeusAste === 3 ){
            return [[1,1,1]]; }
            else if(vaikeusAste === 4) {
                return [[2,1,1],[1,2,1],[2,1,1]]; }
            else if(vaikeusAste === 5) {
                return [[3,1,1],[1,3,1],[1,1,3],[2,2,1],[2,1,2],[1,2,2]] }
            else if(vaikeusAste === 6) {
                return [[2,2,2],[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]; }
            else if(vaikeusAste === 7) {
                return [[3,2,2],[2,3,2],[2,2,3],[3,3,1],[3,1,3],[1,3,3]]; }
            else if(vaikeusAste === 8) {
                return [[3,3,2,],[3,2,3],[2,3,3]]; }
            else if(vaikeusAste === 9 ){
                return [[3,3,3]]; }
            else{
                console.debug("permutaatio:Arvon satunnaisen"+vaikeusAste);
                vaikeusAste = Math.round(Math.random() * 6 + 3); }   
            while(true)
    }
                    
    var arvoPermutaatio = function(vaikeusAste,vanhaPermutaatio){
        vaikeusAste = vaikeusAste || 3;
        do {
            var permutaatiot = haePermutaatiot(vaikeusAste);
            var arpa = Math.floor(Math.random() * permutaatiot.length)
            var palautettavaPermutaatio = permutaatiot[arpa]
            } while(_.isEqual(palautettavaPermutaatio,vanhaPermutaatio));
        console.debug("arvoPermutaatio:palautettavaPermutaatio="+palautettavaPermutaatio);
    
        return palautettavaPermutaatio;
    };
    
    // Function Constructor  
    var Kysymys = function(taso){
        var yksikot = {g:0,mg:-3,mikrog:-6};

        this.kysymys = {
                potilaanNimi:'Kallelle',
                teksti:'',
                suhde:0,  //
                vanhaSuhde:0, //
                paivitaKysymys:function(){this.vanhaSuhde = this.suhde;},
                esitaTabletinVahvuus:function(yksikko){
                    yksikko = yksikko || this.tabletinYksikko;
                    return (this.tabletinVahvuus / Math.pow(10,yksikot[yksikko]))+" "+yksikko;
                },
                esitaAnnos:function(yksikko){
                    yksikko = yksikko || this.annosYksikko;
                    return strip(this.annos() / Math.pow(10,yksikot[yksikko]))+" "+yksikko;
                },
                tabletinVahvuus:0.050,
                annosYksikko:'mg',
                tabletinYksikko:'mg',
                tabletinTyyppi:'',
                annos:function(){return this.tabletinVahvuus*this.suhde;},
                antoAjanKohta:1,
                antoAjanKohtaTeksti:'päivässä',
                kerrallaVaiPaivassa:1,
                kerrallaVaiPaivassaTeksti:'kerralla',
                oikeaVastaus:function(){
                    
                    
                    if(this.kerrallaVaiPaivassa === 1 && this.antoAjanKohta === 1){
                        return this.suhde;}
                    else if(this.kerrallaVaiPaivassa === 1 && this.antoAjanKohta === 2){
                        return this.suhde;}
                    else if(this.kerrallaVaiPaivassa === 2 && this.antoAjanKohta === 1){
                        return this.suhde;}
                    else if(this.kerrallaVaiPaivassa === 2 && this.antoAjanKohta === 2){
                        return this.suhde * this.antoAjanKohta;}
                    else{
                        console.debug("Virhe");
                        return this.suhde;
                    }

            }
            
        }
        this.asetukset = {
        }
        this.asetukset.taso = taso || 1;
    }
    
     Kysymys.prototype.luoKysymys = function(taso){
        //
        // Arvotaan ensin luku tason mukaan
        // 
        //
        //
        console.log("Taso on = "+taso)
        var vaikeusAste = Math.round(O.linearMap(0,1,3,10,taso));
        console.log("roomalaiset:luoKysymys::vaikeusAste = "+vaikeusAste);
         var vanhaPermutaatio = [0,0,0]; // Tämä pitää lukea edellisestä kysymyksestä.
         var permutaatio = arvoPermutaatio(vaikeusAste,vanhaPermutaatio);
         console.debug("Vaikeustaso on "+vaikeusAste+" ja permutaatio on "+permutaatio);
         arvoSuhde(permutaatio[0],this.kysymys);
         arvoYksikkoJaTabletinTyyppi(permutaatio[1],this.kysymys);
         arvoAntoAjanKohtaJaKerrallaVaiPaivassa(permutaatio[2],this.kysymys);
         arvoTekstinMuotoilu(permutaatio[1],this.kysymys);
     }  
   
    Kysymys.prototype.asetaTaso = function(suhde){
        this.asetukset.taso = suhde * this.maksimi;
    }
    
    Kysymys.prototype.oikeaVastaus = function(){
        console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{>"+this.kysymys.oikeaVastaus());
        return this.kysymys.oikeaVastaus();
    }
    
    Kysymys.prototype.tarkistaVastaus = function(vastaus) {
        var k = this.kysymys;
        if( k.kerrallaVaiPaivassa === 2 && k.antoAjanKohta === 2){
            var oikeaVastaus = 2*k.suhde;
        }
        else{
            var oikeaVastaus = k.suhde;
        }
        console.log("Oikea vastaus on:"+oikeaVastaus);
        console.log("Sinun vastauksesi:"+vastaus);
        if( vastaus == oikeaVastaus){
            return true;
        }
        else{
            return false;
        }
    }

    var yksikot = {g:0,mg:-3,mikrog:-6};
    Kysymys.prototype.esitaSelitys = function(){
//        console.log("########### MUOTOILE VASTAUS ############");
//        console.debug("muotoileVastaus annosYksikko:"+ k.annosYksikko +" tabletinYksikko:"+k.tabletinYksikko);
        k = this.kysymys;
        var teksti;
        var yksikkoMuunnos = ""; 
        teksti = {yksikko :"",
                  ajanKohta:""
                        };
        var muutettavaYksikko; 
        // muunnetaan yksiköt 
        if( k.annosYksikko !== k.tabletinYksikko ){
            if( yksikot[k.annosYksikko] < yksikot[k.tabletinYksikko] ){
                muutettavaYksikko = k.annosYksikko;
                yksikkoMuunnos =  "<h3><u>Yksikkömuunnos</u></h3>"
                + "Muutetaan "+k.esitaTabletinVahvuus()+" yksikköön "+k.annosYksikko+" => "+ k.esitaTabletinVahvuus(k.annosYksikko)+".</br>";
           }
            else {
              muutettavaYksikko = k.tabletinYksikko;
              yksikkoMuunnos = "<h3>Yksikkömuunnos</h3>"
              + "Muutetaan "+k.esitaAnnos()+" yksikköön "+k.tabletinYksikko + " => "+ k.esitaAnnos(k.tabletinYksikko)+".</br>";
            }
        }
        
        //  Muotoile muuttujiin valmiiksi verrantomatematiikka 
  //      console.log(teksti.yksikko);
        var expression = "$$\\frac{"+k.esitaTabletinVahvuus(muutettavaYksikko)+"}{1 tabl} = \\frac{"+k.esitaAnnos(muutettavaYksikko)+"}{x tabl}$$";
        
        var expression2 = "$$" + 
k.esitaTabletinVahvuus(muutettavaYksikko)+"\\times x tabl"+
            " = "+k.esitaAnnos(muutettavaYksikko)+" \\times 1 tabl $$";
        var expression3 = "$$ x = \\frac{{"+k.esitaAnnos(muutettavaYksikko)+" \\times 1 tabl}}{{"+k.esitaTabletinVahvuus(muutettavaYksikko)+"}} = "+k.suhde+"$$";
            
        var kertaaPaivassa;
        // Päätellään pitääkö vastata päivässä vai kerralla yms
        if(k.antoAjanKohta === 1 )
            kertaaPaivassa = "Potilas saa lääkettä yhden kerran päivässä. ";
        else {
            kertaaPaivassa = "Potilas saa lääkettä kaksi kertaa päivässä. ";
        }

        var ajanKohta = "";

       ajanKohta += "Tehtävässä kysyttiin kuinka paljon lääkettä potilas saa "+k.kerrallaVaiPaivassaTeksti+". ";
  
        if( k.kerrallaVaiPaivassa === 2 && k.antoAjanKohta === 2){
            ajanKohta += "Eli verrannosta saatu tulos pitää kertoa kahdella.";
            var vastaus = vastaus(2*k.suhde);
        }
        else{
            ajanKohta += "Eli verrannosta saatu tulos on oikea sellaisenaan.";
            var vastaus = vastaus(k.suhde);
        }
//        return teksti;
        
        
        return yksikkoMuunnos 
        + "<h3><u>Verranto</u></h3>Muodostetaan verranto ja kerrotaan ristiin."
        + expression 
        + "Ratkaistaan saadusta yhtälöstä tuntematon x."  
        + expression2  
        + expression3 
        + "<h3><u>Loppupäättely</u></h3>"
        + kertaaPaivassa 
        + ajanKohta
        + "<h3><u>Vastaus</u></h3>" 
        + vastaus;// + " JA " +expr;
    
            function vastaus(suhde){
                // 0 25 Annan yhden neljäsosa tabletin kerralla/päivässä.
                // 0 50 Annan yhden puolikkaan tabletin kerralla/päivässä.
                // 0 75 Annan kolme neljäsosa tablettia kerralla/päivässä.

                // 1    Annan yhden kokonaisen tabletin kerralla/päivässä
                // 1 25 Annan yhden kokonaisen ja yhden neljäsosa tabletin kerralla/päivässä.
                // 1 50 Annan yhden kokonaisen ja yhden puolikkaan tabletin kerralla/päivässä.
                // 1 75 Annan yhden kokonaisen ja kolme neljäsosa tabletia kerralla/päivässä.

                //2/3    Annan kaksi/kolme tablettia kerralla/päivässä.
                //2/3 25 Annan kaksi/kolme kokonaista ja yhden neljäsosa tabletin kerralla/päivässä.
                //2/3 75 Annan kaksi/kolme kokonaista ja kolme neljäsosa tablettia kerralla/päivässä.
                //2/3 50 Annan kaksi/kolme kokonaista ja yhden puolikkaan tabletin kerralla/päivässä.
                    
                var D = 0;
                var lukuSanat = ["nolla","yksi","kaksi","kolme","neljä","viisi","kuusi","seitsemän","kahdeksan","yhdeksän"];
                    
                // Vastauksessa desimaalilukuja
                if( suhde % 1 > 0){
                    var intPart = (suhde+"").split(".")[0];
                    var decPart = (suhde+"").split(".")[1];
                    if(D) console.debug("intPart="+intPart+" decPart="+decPart);
                    
                    if( intPart == 0){
                        var intTeksti = ""; }
                    else if( intPart == 1){
                        var intTeksti = "yhden kokonaisen ja "; }
                    else{
                        var intTeksti = lukuSanat[intPart]+" kokonaista ja "; }
                    
                    if( decPart == 25){
                        var decTeksti = "yhden neljäsosa tabletin"; }
                    else if( decPart == 5){2
                        var decTeksti = "yhden puolikkaan tabletin"; }
                    else if( decPart == 75){
                        var decTeksti = "kolme neljäsosa tablettia";}
                }
                else{
                    if(D) console.debug("suhde="+intPart);

                    if( suhde == 1){
                        var intTeksti = "yhden kokonaisen tabletin";}
                    else{
                        var intTeksti = lukuSanat[suhde]+" kokonaista tablettia";}
                    var decTeksti = "";
                }
                return "Annan "+intTeksti+decTeksti+".";
        }    
       
    
    }
    
    
    
    Kysymys.prototype.esitaKysymys = function(){
        "use strict";
 //       console.log("########### MUOTOILE KYSYMYS ############");

        k = this.kysymys;
        var teksti;
//        teksti = "Potilaalle on määrätty "+k.esitaAnnos()+" "+k.antoAjanKohdanTeksti+". "+"Tablettien vahvuus on "+k.esitaTabletinVahvuus()+"."+" Kuinka monta tablettia annat potilaalle "+k.kerrallaVaiPaivassaTeksti+"?";
 //       this.teksti = teksti;
        teksti = k.teksti;
        return teksti;
    
    }
    
    Kysymys.prototype.vastauksenYksikko = function(){
        return "tablettia";
    }
    
    Kysymys.prototype.kysymyksenYksikko = function(){
        return "";
    }
    
    Kysymys.prototype.esitaKysymyksenYksikko = function(){
    }
  
    var arvoTekstinMuotoilu = function(vaikeusAste,kysymys){
        k = kysymys;
        k.potilaanNimi = nimet[Math.floor(Math.random() * nimet.length)];
        var potilasMaarays = k.potilaanNimi+" on määrätty "+k.esitaAnnos()+" "+k.antoAjanKohdanTeksti+".";
        var tablettienVahvuus = "Tablettien vahvuus on "+k.esitaTabletinVahvuus()+".";
        var kysymysLause = "Kuinka monta tablettia annat potilaalle "+k.kerrallaVaiPaivassaTeksti+"?";
        var arpa = Math.random();

        if(vaikeusAste === 1) {
            k.potilaanNimi = nimet[0];
            k.teksti = potilasMaarays + " " + tablettienVahvuus + " " + kysymysLause;    
        }
        else if(vaikeusAste === 2) {
            if( arpa < 0.5){
                k.teksti = potilasMaarays + " " + tablettienVahvuus + " " + kysymysLause; }
            else{
                k.teksti = tablettienVahvuus + " " + potilasMaarays + " " + kysymysLause; }
        }
        else{
            if( arpa < 0.5){
                k.teksti = potilasMaarays + " " + tablettienVahvuus + " " + kysymysLause; }
            else{
                k.teksti = tablettienVahvuus + " " + potilasMaarays + " " + kysymysLause; }
        }
    }
    
    
    var arvoAntoAjanKohtaJaKerrallaVaiPaivassa = function(vaikeusAste,kysymys){
           k = kysymys;
           var paivanAjanKohtienNimet = [
                ["aamuisin","iltaisin","päivässä","X 1"], 
                ["aamuin illoin","aamulla ja illalla","X 2"] 
            ];
            
            var kerrallaVaiPaivassaTekstit = ["kerralla","päivässä"];  
    
           if(vaikeusAste === 1){
               k.antoAjanKohta = 1;
               k.kerrallaVaiPaivassa = 1; 
           }
           if(vaikeusAste === 2){
               k.antoAjanKohta = 2;
               k.kerrallaVaiPaivassa = 2; 
          }
          if(vaikeusAste === 3){
              var arpa1 = Math.ceil(Math.random()*2);
              if(arpa1 === 1){
                  k.antoAjanKohta = 2;
                  k.kerrallaVaiPaivassa = 1;
              }
              else if(arpa1 === 2){
                  k.antoAjanKohta = 2;
                  k.kerrallaVaiPaivassa = 2;
           }
       }
// Arvotaan joku teksteistä 'aamulla', 'illalla',.. tai 'aamuin illoin','aamulla ja illalla', ... 
        var arpa = Math.floor(Math.random() * paivanAjanKohtienNimet[k.antoAjanKohta - 1].length);
        k.antoAjanKohdanTeksti = paivanAjanKohtienNimet[k.antoAjanKohta - 1][arpa];
// Arvotaaan 'kerralla' vai 'päivässä' teksti 
//           var arpa = Math.floor(Math.random() * kerrallaVaiPaivassaTekstit.length);
//        k.kerrallaVaiPaivassaTeksti = kerrallaVaiPaivassaTekstit[arpa];
        k.kerrallaVaiPaivassaTeksti = kerrallaVaiPaivassaTekstit[k.kerrallaVaiPaivassa-1];
        
    }
 

    // Arpoo sen käytetäänkö termejä i.m yms hämäämään tehtävässä
    // arvotaan myös muunnetaanko jompikumpi yksiköistä johonkin e
    // yksikköön
    var arvoYksikkoJaTabletinTyyppi = function(vaikeusAste,kysymys){   
    
        k = kysymys;
        // Palautetaan oletusarvot
         k.tabletinTyyppi = "";
         k.annosYksikko = 'mg';
         k.tabletinYksikko = 'mg';
            
        // ei aseteta mitään 
        if(vaikeusAste === 1)
        {

        }
        // asetetaan 'i.m'-hämy tai tehdään yksikkömuunnos 
        else if(vaikeusAste === 2)
        {
            var arpa2 = Math.ceil(Math.random() * 2);
            if( arpa2 === 1)
            {
            var tabletinTyypit = ["","(kapseli)","(depotabletti)","(enterotabletti)","(resoribletti)"];
            var arpa1 = Math.ceil(Math.random() * tabletinTyypit.length) - 1;
            k.tabletinTyyppi= tabletinTyypit[arpa1];
            }
            else if( arpa2 === 2)
            {
                k.tabletinTyyppi = "";
                var arpa1 = Math.ceil(Math.random() * 10);
                var arpa2 = Math.ceil(Math.random() * 2);
                console.warn(arpa1);
                if(arpa1 < 4 ){
                    
                if(k.tabletinVahvuus > 0.005)
                {
                    k.tabletinYksikko = 'g';
                }
                else{
                    k.tabletinYksikko = 'mikrog';
                    }
                }
                else {
                if(k.annos() > 0.005)
                {
                    k.annosYksikko = 'g';
                }
                else{
                    k.annosYksikko = 'mikrog';
                    }
                }
            }
        }
        // asetetaan sekä hämy että tehdään yksikkömuunnos */
        else if(vaikeusAste === 3)
        {                      //    liivate pääl  imeyt hit. ohutsuolessa  suolessa            kielen alle,nop. vaik
            var tabletinTyypit = ["","(kapseli)",     "(depotabletti)",   "(enterotabletti)","(resoribletti)"];
            var arpa1 = Math.ceil(Math.random() * tabletinTyypit.length) - 1;
            k.tabletinTyyppi= tabletinTyypit[arpa1];
            
            var arpa1 = Math.ceil(Math.random() * 10);
            var arpa2 = Math.ceil(Math.random() * 2);
        
                if(arpa1 < 5 ){
                    
                if(k.tabletinVahvuus > 0.005)
                {
                    k.tabletinYksikko = 'g';
                }
                else{
                    k.tabletinYksikko = 'mikrog';
                    }
                }
                else {
                if(k.annos() > 0.005)
                {
                    k.annosYksikko = 'g';
                }
                else{
                    k.annosYksikko = 'mikrog';
                    }
                }
        }
        else{
            alert("Vika if-blockissa. VaikeusAste sai arvon"+vaikeusAste);
        }
    }


    // Arpoo annettavan lääkemäärän ja liuoksenvahvuuden suhteen
    var arvoSuhde = function(vaikeusAste,kysymys){

    var varaPaavi = 0;
    do{
        var HELPPOLUKU = 3;
        var KESKILUKU = 5;
        var k = kysymys;
        var arpa = Math.ceil(Math.random() * 10)*10 / 1000;
        k.tabletinVahvuus = arpa;
        // Ensimmäisellä vaikeusasteella, arvomme suhdeluvun 1 tai jonkun joukosta 1,2,3 
        //
        if(vaikeusAste === 1)
        {
            var arpa = Math.random();
            console.log("arvoSuhde:vaikeusAste=1:arpa"+arpa)
            if( arpa > 0.7 ){
                k.suhde = 1;
            }
            else{
                var arpa = Math.ceil(Math.random() * HELPPOLUKU);
                k.suhde = arpa;
            }
        }
        // Toisella vaikeusasteella suhdeluku on muotoa : n + 0.25 tai n + 0.50 tai n + 0.75 missä n saa jonkun arvoista 1,2,3
        //
        else if(vaikeusAste === 2)
        {
            var arpa = Math.random();
            console.log("arvoSuhde:vaikeusAste=2:arpa"+arpa)
            // 20 % todennäköidyydellä 2 tai 3
            if( arpa > 0.8){
                k.suhde = Math.ceil(Math.random() * 2) + 1;
            }
            // 80 % todennäköisyydellä arvotaan 0.5, 1.5 tai 2.5
            //if else( 0.8 > arpa > 0.3)
            else
            {
                k.suhde = Math.round(Math.random() * 3 - 0.5) + 0.5; 
            }
        }
        // Kolmannella vaikeusasteella arvomme luvun, joka on joku seuravista : 0.1, 0.2, 0.3, ..., 0.9
        //
        else if(vaikeusAste === 3)
        {
            var arpa = Math.random();
            console.log("arvoSuhde:vaikeusAste=3:arpa"+arpa)
            // 20 % todennäköisyydellä arvotaan 0.5, 1.5 tai 2.5
            if( arpa > 0.8){
                k.suhde = Math.round(Math.random() * 3 - 0.5) + 0.5; 
            }
            // 50 % todennäköisyydellä arvotaan 0.25, 1.25,tai 2.25
            else if( 0.8 > arpa > 0.3)
            {
                k.suhde = Math.round(Math.random() * 3 - 0.5) + 0.25; 
            }
            // 30 % tn:llä 0.75 tai 1.75 tablettia
            else{
                k.suhde = Math.round(Math.random() * 1 - 0.5) + 0.75;
            }
        }
        else{
            alert("Vika if-blockissa. VaikeusAste sai arvon"+vaikeusAste);
        }
            varaPaavi++;
            console.log("@@@ vanhaSuhde:"+k.vanhaSuhde+" suhde:"+k.suhde);
            
    } while( k.suhde === k.vanhaSuhde )// && varaPaavi < 130)
        if(varaPaavi > 129){
            console.log("!!!!!!!!!!!!!!!VARAPAAVI LOPUSSA")
        }
    }
    
    window.Kysymys.tabletti = Kysymys;
    console.log("Lisätään tabletti");//+window.Kysymys.tabletti)
    
}(window));
