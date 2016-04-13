// closure begins
(function(window){
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
                potilaanNimi:"Matille",
                suhde:0,
                vanhaSuhde:0,
                paivitaKysymys:function(){this.vanhaSuhde = this.suhde;},
                esitaLiuoksenVahvuus:function(yksikko){
                    yksikko = yksikko || this.liuoksenYksikko;
                    return (this.liuoksenVahvuus / Math.pow(10,yksikot[yksikko]))+" "+yksikko;
                },
                esitaAnnos:function(yksikko){
                    yksikko = yksikko || this.annosYksikko;
                    return strip((this.annos() / Math.pow(10,yksikot[yksikko])))+" "+yksikko;
                },
                liuoksenVahvuus:0.050,
                annosYksikko:'mg',
                liuoksenYksikko:'mg',
                antoTapa:'',
                annos:function(){return this.liuoksenVahvuus*this.suhde;},
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
               },
               kysymysTeksti:""
        }
        this.asetukset = {
        }
        this.asetukset.taso = taso || 1;
    }
    
    
    
    Kysymys.prototype.luoKysymys = function(taso){
        console.log("Taso on = "+taso)
        var vaikeusAste = Math.round(O.linearMap(0,1,3,10,taso));
        console.log("roomalaiset:luoKysymys::vaikeusAste = "+vaikeusAste);
         var vanhaPermutaatio = [0,0,0]; // Tämä pitää lukea edellisestä kysymyksestä.
         var permutaatio = arvoPermutaatio(vaikeusAste,vanhaPermutaatio);
         console.debug("Vaikeustaso on "+vaikeusAste+" ja permutaatio on "+permutaatio);
         arvoSuhde(permutaatio[0],this.kysymys);
         arvoYksikkoJaAntoTapa(permutaatio[1],this.kysymys);
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
       
    }

    var yksikot = {g:0,mg:-3,mikrog:-6};
    
    Kysymys.prototype.esitaSelitys = function(){
        s = this.kysymys;
        k = this.kysymys;
        var yksikko;
        var muutettavaYksikko; 
        // muunnetaan yksiköt 
        if( k.annosYksikko !== k.liuoksenYksikko ){
            yksikko = "Koska annoksen ja liuoksen yksiköt ovat eri, ne pitää muuttaa ensin samoiksi."
            if( yksikot[k.annosYksikko] < yksikot[k.liuoksenYksikko] ){
                muutettavaYksikko = k.annosYksikko;
                yksikko +=  "<br /> Muutetaan "+k.esitaLiuoksenVahvuus()+" yksikköön "+k.annosYksikko+" => "+ k.esitaLiuoksenVahvuus(k.annosYksikko)+".";
            }
            else {
              muutettavaYksikko = k.liuoksenYksikko;
              yksikko += "<br /> Muutetaan "+k.esitaAnnos()+" yksikköön "+k.liuoksenYksikko + " => "+ k.esitaAnnos(k.liuoksenYksikko)+".";
            }
        }
        else{
            yksikko = "Koska annoksen ja liuoksen yksiköt ovat samat, yksikkömuunnosta ei tarvita. ";
        }

        var expression1 = "\\frac{"+s.esitaLiuoksenVahvuus(muutettavaYksikko)+"}{1 ml} = \\frac{"+s.esitaAnnos(muutettavaYksikko)+"}{X ml}";
        var expression2 = s.esitaLiuoksenVahvuus(muutettavaYksikko)+"\\times X ml"+" = "+s.esitaAnnos(muutettavaYksikko)+" \\times 1 ml";
        var expression3 = " X = \\frac{{"+s.esitaAnnos(muutettavaYksikko)+" \\times 1 ml}}{{"+s.esitaLiuoksenVahvuus(muutettavaYksikko)+"}} = "+s.suhde;

        var ajanKohta = "";
        var vastaus;
        // Päätellään pitääkö vastata päivässä vai kerralla yms
        if(k.antoAjanKohta === 1 ) {
            ajanKohta = "Potilas saa lääkettä yhden kerran päivässä. ";
        }
        else {
            ajanKohta = "Potilas saa lääkettä kaksi kertaa päivässä. ";
        }
//        if(s.kerrallaVaiPaivassa === 1) {
        ajanKohta += "Tehtävässä kysyttiin kuinka paljon lääkettä potilas saa "+k.kerrallaVaiPaivassaTeksti+".<br />";
        if( k.kerrallaVaiPaivassa === 2 && k.antoAjanKohta === 2){
            ajanKohta += "Eli verrannosta saatu tulos pitää kertoa kahdella "+2*k.suhde+" ml.";
            vastaus = 2*k.suhde;
        }
        else{
            ajanKohta += "Eli verrannosta saatu tulos on oikea sellaisenaan "+k.suhde+" ml.";
            vastaus = k.suhde;
        }


        var vastaus = "<h2>Ratkaisu</h2>" +
                      "<h3>Yksikkömuunnos</h3>" +
                      yksikko+
                      "<h3>Verranto</h3>"+
                      "<u><h4>Muodostetaan verranto</h4></u>"+
                      "$$"+expression1+"$$"+
                      "<u><h4>Kerrotaan ristiin</h4></u>"+
                      "$$"+expression2+"$$"+
                      "<u><h4>Sievennetään</h4></u>"+
                      "$$"+expression3+"$$"+
                      "<h3>Loppupäättely</h3>"+
                      ajanKohta+
                      "<h3>Vastaus</h3>"+
                      "Annetaan "+
                      vastaus+" ml "+
                      k.kerrallaVaiPaivassaTeksti+".";
       
       return vastaus;
    }
    
    Kysymys.prototype.esitaKysymys = function(){
        return this.kysymys.kysymysTeksti;
    }
    
    Kysymys.prototype.vastauksenYksikko = function(){
        return "ml";
    }
    
    Kysymys.prototype.kysymyksenYksikko = function(){
        return "";
    }
    
    Kysymys.prototype.esitaKysymyksenYksikko = function(){
    }
  
    function arvoTekstinMuotoilu(vaikeusAste,kysymys){
        var nimet = ["Potilaalle","Kallelle","Eskolle","Irmalle","Liisalle","Juhanille","Jormalle","Päiville"];
        k.potilaanNimi = nimet[Math.round(Math.random()*nimet.length - 1)];
        k = kysymys;
        var teksti;
        if( Math.random() < 0.5){
            teksti = k.potilaanNimi+" on määrätty "+
                     k.esitaAnnos()+" "+
                     k.antoAjanKohdanTeksti+
                     ( (k.antoTapa) ? " " : "") +
                     k.antoTapa + ". "+
                     "Lääkeliuoksen vahvuus on "+
                     k.esitaLiuoksenVahvuus()+"/ml. "+
                     " Kuinka monta millilitraa annat potilaalle "+
                     k.kerrallaVaiPaivassaTeksti+"?";
        }
        else{
             teksti ="Lääkeliuoksen vahvuus on "+
                     k.esitaLiuoksenVahvuus()+"/ml. " +
                     k.potilaanNimi + " on määräätty " +
                     k.esitaAnnos()+" "+
                     k.antoAjanKohdanTeksti+
                     ( (k.antoTapa) ? " " : "") +
                     k.antoTapa+". "+                     
                     " Kuinka monta millilitraa annat potilaalle "+
                     k.kerrallaVaiPaivassaTeksti+"?";

        }
        k.kysymysTeksti = teksti;
    }
    
    
    
    // Arpoo annettavan lääkemäärän ja liuoksenvahvuuden suhteen
    function arvoSuhde(vaikeusAste,kysymys){
        //console.warn("Kysymys on nyt:"+kysymys.suhde);
        var HELPPOLUKU = 10;
        var KESKILUKU = 5;
        var k = kysymys;
        var arpa = Math.ceil(Math.random() * 10)*10 / 1000;
        k.liuoksenVahvuus = arpa;
        //vaikeusAste = 2;
        //    
        //Ensimmäisellä vaikeusasteella, arvomme suhdeluvun väliltä 1 - 10   
        //
            
        if(vaikeusAste === 1)
        {
            var arpa = Math.ceil(Math.random() * HELPPOLUKU);
            k.suhde = arpa;
        }
        //
        // Toisella vaikeusasteella suhdeluku on muotoa : n + 0.25 tai n + 0.50 tai n + 0.75 missä n saa jonkun arvoista 1,2,3
        //
        else if(vaikeusAste === 2)
        {
            var arpa1 = Math.ceil(Math.random() * 3);
            var arpa2 = Math.ceil(Math.random() * 3);
            if( arpa2 === 1){
                k.suhde = (arpa1 + 0.25);
                k.liuoksenVahvuus = 0.020;
            }
            else if( arpa2 === 2){
                k.suhde = (arpa1 + 0.5);
                k.liuoksenVahvuus = 0.010;
            }
            else if( arpa2 === 3 ){
                k.suhde = (arpa1 + 0.75);
                k.liuoksenVahvuus = 0.020;
            }
            else{
                alert("Vikaan meni");
            }
            //  console.warn("      suhde on nyt "+k.suhde);
        }
        //
        //    Kolmannella vaikeusasteella arvomme luvun, joka on joku seuravista : 0.1, 0.2, 0.3, ..., 0.9
        //
        else if(vaikeusAste === 3)
        {
            var arpa = Math.ceil(Math.random() * 9) / 10;
            k.suhde = arpa;
            var arpa = Math.ceil(Math.random() * 2);
            if( arpa === 1){
                k.liuoksenVahvuus = 0.010;
            }
            else if( arpa === 2 ){
                k.liuoksenVahvuus = 0.020;
            }
            else{alert("Virhe");
                }
        }
        else{
            alert("Vika if-blockissa. VaikeusAste sai arvon"+vaikeusAste);
        }
            // lopuksi palautetaan muokattu objekti
          //  return k;
    }
    
    function arvoYksikkoJaAntoTapa(vaikeusAste,kysymys){
            k = kysymys;
            // Palautetaan oletusarvot
            k.antoTapa = "";
            k.annosYksikko = 'mg';
            k.liuoksenYksikko = 'mg';
            
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
            var antoTavat = ["i.m","v.m"];
            var arpa1 = Math.ceil(Math.random() * antoTavat.length) - 1;
            k.antoTapa= antoTavat[arpa1];
    //             console.warn("    "+k.antoTavat);
            }
            else if( arpa2 === 2)
            {
                k.antoTapa = "";
                var arpa1 = Math.ceil(Math.random() * 10);
                var arpa2 = Math.ceil(Math.random() * 2);
                console.warn(arpa1);
                if(arpa1 < 4 ){
                    
                if(k.liuoksenVahvuus > 0.005)
                {
                    k.liuoksenYksikko = 'g';
                }
                else{
                    k.liuoksenYksikko = 'mikrog';
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
            //  console.warn("      suhde on nyt "+k.suhde);
        }
        // asetetaan sekä hämy että tehdään yksikkömuunnos 
        else if(vaikeusAste === 3)
        {
            var antoTavat = ["i.m","v.m"];
            var arpa1 = Math.ceil(Math.random() * antoTavat.length) - 1;
            k.antoTapa= antoTavat[arpa1];
            
            var arpa1 = Math.ceil(Math.random() * 10);
            var arpa2 = Math.ceil(Math.random() * 2);
        
                if(arpa1 < 5 ){
                    
                if(k.liuoksenVahvuus > 0.005)
                {
                    k.liuoksenYksikko = 'g';
                }
                else{
                    k.liuoksenYksikko = 'mikrog';
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
//        return k;
    }

    
        //
    function arvoAntoAjanKohtaJaKerrallaVaiPaivassa(vaikeusAste,kysymys){
            k = kysymys;
            var paivanAjanKohtienNimet = [
            ["aamuisin","iltaisin","päivässä","X 1"], // annos otetaan vain kerran 
        ["aamuin illoin","aamulla ja illalla","X 2"] // annos otetaan kaksi kertaa pvmssä 
        ];
        var kerrallaVaiPaivassaTekstit = ["kerralla","päivässä"];  // Loppukysymys 
        
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
        //       var arpa = Math.floor(Math.random() * kerrallaVaiPaivassaTekstit.length);
    //        k.kerrallaVaiPaivassaTeksti = kerrallaVaiPaivassaTekstit[arpa];
        k.kerrallaVaiPaivassaTeksti = kerrallaVaiPaivassaTekstit[k.kerrallaVaiPaivassa-1];
            console.debug("Asetetiin kerrallaVaiPaivassaTekstiksi:"+k.kerrallaVaiPaivassaTeksti+" numeromuuttujan arvo oli:"+k.kerrallaVaiPaivassa)
    //        return k;
    }
    
    window.Kysymys.liuos = Kysymys;
    console.log("Lisätään liuos");//+window.Kysymys.tabletti)
    
}(window));
