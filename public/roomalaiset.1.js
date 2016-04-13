/*
angular.module('myApp')
.controller('reseptitController',['$scope','userData','$routeParams','$location','$window','$route', function($scope,userData,$routeParams,$location,$window,$route){
    
$scope.pisteet = {oikein: 0,vaarin: 0,monesko: 1,maksimi: 3,parasTulos:0,                 laskeArvosana:function(){return (this.oikein/this.maksimi);}};
var url = $location.url()
console.log("Missä ollaan>"+url)
    
console.log($routeParams)
$scope.asetukset = {taso:'Helppo',
                    otsikkoTaso:'Helppo',
                        kysymyksetLkm:5,
                        vaikeusTasoMinimi:0,
                        vaikeusTasoMaksimi:5,
                        ohjaus:undefined
                       }
    
$scope.mene = function(kohde){
        console.log("Vertailu :"+'index.html#'+$location.url())
        if( kohde === 'index.html#'+$location.url()){
            console.log("Nyt tarttis ladata uudestaan");
            $route.reload();
        }
        console.log("mene kohteeseen:"+kohde)
        $window.location.href = kohde;//'/index.html';
    }
    
if($routeParams.taso){
        $scope.asetukset.taso = $routeParams.taso; 
        console.log("Asetin $scope.asetukset.taso:"+$scope.asetukset.taso)    
            if($routeParams.kysymyksetLkm){
                $scope.pisteet.maksimi = parseInt($routeParams.kysymyksetLkm);
                console.log("Asetin $scope.pisteet.maksimi:"+$scope.pisteet.maksimi)
                //$scope.asetukset.kysymyksetLkm = $routeParams.kysymyksetLkm; 
            }
    }
    
if($scope.asetukset.taso === 'Helppo'){
        $scope.asetukset.otsikkoTaso = "Helppo";
        $scope.asetukset.vaikeusTasoMinimi = 1;
        $scope.asetukset.vaikeusTasoMaksimi = 3;
    }
else if($scope.asetukset.taso === 'Normaali'){
        $scope.asetukset.otsikkoTaso = "Normaali";
        $scope.asetukset.vaikeusTasoMinimi = 3;
        $scope.asetukset.vaikeusTasoMaksimi = 5;
    }
else if($scope.asetukset.taso === 'Vaikea'){
        $scope.asetukset.otsikkoTaso = "Vaikea";
        $scope.asetukset.vaikeusTasoMinimi = 5;
        $scope.asetukset.vaikeusTasoMaksimi = 7;
    }

// Palauttaa seuraavan kysymykset oikean tason
$scope.asetukset.ohjaus = function(pisteet){
        var mon = pisteet.oikein+pisteet.vaarin+1
        var ratio = mon/pisteet.maksimi;
        var minimi = this.vaikeusTasoMinimi;
        var maksimi = this.vaikeusTasoMaksimi;
        var erotus = maksimi - minimi;
        console.debug("Suhde:"+ratio);
        console.log("Maksimi:"+maksimi)
        console.debug("Minimi:"+minimi)
        //console.debug(Math.round(ratio*erotus)+minimi)
        var vastaus = Math.round(ratio*erotus)+minimi
        console.debug("Taso:"+vastaus)
        return vastaus
    }
    
$scope.TILA = 'UUSI';/*UUSI, VAARIN, OIKEIN, LOPPU 
$scope.kysymys = {
                 kenelle:"Matille",          
                 tabletinVahvuus:600,
                antoAjanKohta:"päivässä",
                laakeKerroin:3,         // 600*3 = 1800 
                paivaKerroin:2,         // kahdesti päivässä 
                paivanAikanaTabletteja:function(){return this.paivaKerroin*this.laakeKerroin;}, 
                maarattyAnnos:function(){return this.tabletinVahvuus*this.laakeKerroin;},
              //  tablettiKerroin:0,
                tablettienKplNumeroina:50, tablettienKplRoomalaisilla:function(){return $scope.muunnaDesimaaleiksi(this.tablettienKplNumeroina).tulos},
                vastaus:function(){return this.tablettienKplNumeroina/(this.laakeKerroin*this.paivaKerroin);},
                vastausFloor:function(){return Math.floor(this.vastaus());} 
                };
    
$scope.edellinenVastaus = $scope.kysymys.vastaus();
    
var arvoN = function(max){
    return Math.ceil(Math.random() * max);
}                                  

$scope.vastausKentta = {arvo:""};
//$scope.taso = 1;
//var DEBUG_taso = 3;


// Palauttaa seuraavan tason
//
var palautaSeuraavaTaso = function() {
    var taso = $scope.asetukset.ohjaus($scope.pisteet);
    return taso;
}
$scope.taso = palautaSeuraavaTaso();

// Päivittää nykyisen tilanteen
//
var kirjaaTilanne = function(tyyppi,taso,oikeinVaarin) {
    userData.lisaaTilanne(tyyppi,taso,oikeinVaarin);
}

// luoKysymys saa argumeteikseen
// muokattavan kysymyksen, vaikeusasteen ja edellisen kysymyksen
//                                          (tässä tapauksessa edellise kysymyksen vastauksen)

    // Aloitetaan helposta tasosta
    //$scope.kysymys = luoKysymys($scope.kysymys,1,0);
    // userData serviceen
    $scope.kayttaja = userData.username;
    $scope.tilanne = userData.tilanne;
        $scope.$watch('kayttaja',function(){
        userData.username = $scope.kayttaja;
        userData.tilanne = $scope.tilanne;
    });
    
    $scope.pisteet.parasTulos = userData.palautaParasTulos("resepti")

    // service loppu

//    $scope.status = "";
$scope.serverille = function(){
    userData.paivitaServerille();
}

    
$scope.yritaUudelleen = function(){
        $scope.TILA = 'UUSI';
        $scope.pisteet.oikein = 0;
        $scope.pisteet.vaarin = 0;
        $scope.pisteet.monesko = 0;
    }

var luoKysymys = function(kysymys,vaikeus,edellinenVastaus) {
    console.log("Vanha vastaus oli:"+edellinenVastaus)
    console.log("Vaikeustaso on:"+vaikeus)
    
    var kuka = ["Potilaalle","Matille","Liisalle","Kalervolle","Ainolle"];
    var arpa = arvoN(kuka.length) - 1;
    kysymys.kenelle = kuka[arpa]
    
    var annostus = 1;
    //var arvoN(20) * 10;
    
    arpa = vaikeus;// arvoN(4);
    
    var varmistin = 0;
    var antoMahdollisuudet = [[],
["kerran päivässä"," x 1","aamuisin","iltaisin"],
[" x 2","kahdesti päivässä","aamulla ja illalla"],
["kolme kertaa päivässä"," x 3","kolmesti päivässä"]
                             ];

    
    do
    {
    arpa = vaikeus;
    console.log("Vaikeustaso on:"+vaikeus)
    
    // Helpoin taso
    // Tablettien määrä = päivien määrä
    if( arpa === 1 ){ 
        kysymys.laakeKerroin = 1;arvoN(3);
        kysymys.paivaKerroin = 1;
    //    var antoMahdollisuudet = ["kerran päivässä","1x1","aamuisin","iltaisin"];
        arpa = arvoN(antoMahdollisuudet[kysymys.paivaKerroin].length) - 1; // arvotaan yksi ylemmistä
        kysymys.antoAjanKohta = antoMahdollisuudet[arpa]; // asetetaan se
        var laakeMahdollisuudet = [50,100,200,400];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        arpa = arvoN(10)*10;
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
    // 
    }
    // Toiseksi Helpoin taso
    // Tablettien määrä = päivien määrä
    // Kesto on tasa viikkoja => 7 * Rand(1 - 8)
    else if( arpa === 2 ){ 
        kysymys.laakeKerroin = 1;arvoN(3);
        kysymys.paivaKerroin = 1;
        //var antoMahdollisuudet = ["kerran päivässä","1x1","aamuisin","iltaisin"];
        //arpa = arvoN(antoMahdollisuudet.length) - 1; // arvotaan yksi ylemmistä
        //kysymys.antoAjanKohta = antoMahdollisuudet[arpa]; // asetetaan se
        var laakeMahdollisuudet = [50,100,200,400];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        //arpa = arvoN(10)*10;
        // Arvotaan luku 7än kertotaulusta
        arpa = Math.round(Math.random() * 7 + 1) * 7;
        console.log(arpa)
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
    // 
    }
    // Toiseksi Helpoin taso
    // Tablettien määrä = Rand(2,3)
    // Kesto = 10 * Tablettien määrä * Rand(1,2)
    // Eli vastauksista tulee kivoja
    else if( arpa === 3 ){ 
        kysymys.laakeKerroin = arvoN(2) + 1;
        kysymys.paivaKerroin = 1;
        //var antoMahdollisuudet = ["kerran päivässä","1x1","aamuisin","iltaisin"];
        //arpa = arvoN(antoMahdollisuudet.length) - 1; // arvotaan yksi ylemmistä
        //kysymys.antoAjanKohta = antoMahdollisuudet[arpa]; // asetetaan se
        var laakeMahdollisuudet = [50,100,200,400];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        //arpa = arvoN(10)*10;
        arpa = 10 * Math.round(Math.random() + 1) * kysymys.laakeKerroin;
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
    }

    else if( arpa === 4 ){
        kysymys.laakeKerroin = 2;//arvoN(2) + arpa;
        kysymys.paivaKerroin = 2;//arvoN(2) + (1 - arpa);
        var laakeMahdollisuudet = [50,100,200,400];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        // Vastaukseksi tasakymmeniä 
        arpa = 10 * Math.round(Math.random() + 3) * kysymys.laakeKerroin;
        console.warn("Tabl.#:"+arpa)
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
        
    }
    else if( arpa === 5) { // Annetaan kaksi kertaa päivässä 
        arpa = Math.round(Math.random()) // 0 tai 1
        kysymys.laakeKerroin = arvoN(2) + arpa;
        kysymys.paivaKerroin = arvoN(2) + (1 - arpa);
        //var antoMahdollisuudet = ["1x2","kahdesti päivässä","aamulla ja illalla"];
        //arpa = arvoN(antoMahdollisuudet.length) - 1;
        //kysymys.antoAjanKohta = antoMahdollisuudet[arpa];
        var laakeMahdollisuudet = [25,50,100];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        // Arvotaan luku 7än kertotaulusta
        arpa = 10 * Math.round(Math.random() + 1) * kysymys.laakeKerroin;
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
    }
    else if( arpa === 6) {
        kysymys.laakeKerroin = arvoN(2);
        kysymys.paivaKerroin = 3;
        //var antoMahdollisuudet = ["kolme kertaa päivässä","1x3","kolmesti päivässä"];
        //arpa = arvoN(antoMahdollisuudet.length) - 1;
        //kysymys.antoAjanKohta = antoMahdollisuudet[arpa];
        var laakeMahdollisuudet = [100,200,300,400];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        //arpa = arvoN(5)*2 + 6;
        arpa = Math.round(Math.random() * 7 + 1) * 7;
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
    }
    else if( arpa === 7) {
         kysymys.laakeKerroin = arvoN(2) + 1;
        kysymys.paivaKerroin = arvoN(2) + 1;
        //var antoMahdollisuudet = ["kolme kertaa päivässä","1x3","kolmesti päivässä"];
        //arpa = arvoN(antoMahdollisuudet.length) - 1;
        //kysymys.antoAjanKohta = antoMahdollisuudet[arpa];
        var laakeMahdollisuudet = [10,20,30,50];
        arpa = arvoN(laakeMahdollisuudet.length) - 1;
        kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
        arpa = arvoN(5)*2 + 6;
        kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
    }

    else{
        console.warn("Arpa saavutti kielletyn arvon:"+arpa);
    }

    // arvotaav sopiva teksti, päivässä, aamuin illoin, 1x2 jne
    arpa = arvoN(antoMahdollisuudet[kysymys.paivaKerroin].length) - 1;
    // asetetaan se
    kysymys.antoAjanKohta = antoMahdollisuudet[kysymys.paivaKerroin][arpa];

        
    if(varmistin > 50){
        return null;
    }
        varmistin++;
        console.log("Uusi:"+kysymys.vastaus())
        console.log("Vanha:"+edellinenVastaus)
    } while( kysymys.vastaus() === edellinenVastaus ) // jos tämä totta,niin mennään takaisin ylös 
        
    return kysymys;
}
    
// tätä kutsutaan, kun sivulla painetaan vastaa
$scope.vastaa = function(){
        if(parseInt($scope.vastausKentta.arvo) === parseInt($scope.kysymys.vastaus()) )
        {
            console.log("Oikein");
            $scope.TILA = 'OIKEIN';
                        // tyyppi,  taso,       1 = oikein
            kirjaaTilanne("resepti",$scope.taso,1);
            $scope.pisteet.oikein++;
            $scope.taso = palautaSeuraavaTaso();
            
            //if($scope.taso < 8){
            //    $scope.taso++; // Korotetaan tasoa
            //}
        }
        else
        {
            console.log("Vaarin");
            $scope.TILA = 'VAARIN';
                        // tyyppi,  taso,       0 = väärin
            kirjaaTilanne("resepti",$scope.taso,0);
            //userData.lisaaTilanne("resepti",$scope.taso,0);
            $scope.pisteet.vaarin++;
            //  Muotoillaan väärinkohdan infoteksti 
            $scope.vihje = "";
            var lista = 
     $scope.muunnaDesimaaleiksi($scope.kysymys.tablettienKplNumeroina).komponentit;
            for( var i = lista.length - 1; i >= 0; i--){
                console.warn(lista);
                var ele = parseInt(lista[i]);
                console.debug(ele);
                if(ele === 0 || ele === NaN ){
                    console.debug("Ele ei käy, joten skipataan");
                   continue;
                }
                    $scope.vihje = $scope.vihje+" "+ $scope.roomalaiset[i][parseInt(ele)]+" = "+parseInt(ele) * Math.pow(10,i);
            }
            //$scope.kysymys = Math.floor((Math.random() * 999));
        
        }
    }; // vastaa-funktio loppuu
    
$scope.seuraava = function(){
        $scope.vastausKentta.arvo = "";
        if($scope.pisteet.monesko === $scope.pisteet.maksimi){ 
            userData.paivitaParasTulos("resepti",$scope.oikein)
            $scope.TILA = 'LOPPU';
        }
        else{
            $scope.TILA = 'UUSI';
            $scope.pisteet.monesko++;
            // uuden kysymyksen luominen
            $scope.kysymys = luoKysymys($scope.kysymys,$scope.taso,$scope.kysymys.vastaus())
        }

    };

        
// Alusta peli ensimmäistä kysymystä varten
//
$scope.alusta = function(){
    $scope.pisteet.monesko = 1;
    $scope.pisteet.oikein = 0;
    $scope.pisteet.vaarin = 0;
    $scope.taso = $scope.asetukset.ohjaus($scope.pisteet);
    $scope.kysymys = luoKysymys($scope.kysymys,$scope.taso,0);
    $scope.TILA = 'UUSI';
}

$scope.alusta();

    
    $scope.roomalaiset =[["","I","II","III","IV","V","VI","VII","VIII","IX"],               ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]
]; 
    
    $scope.muunnaDesimaaleiksi = function(arvo){
        
     var roomalaiset =[["","I","II","III","IV","V","VI","VII","VIII","IX"],               ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]
]; 
        
        
        var lukuTekstina = String(arvo);
  //      console.warn(lukuTekstina);
    var lukuTekstinaKaannettyna = lukuTekstina.reverse();
        var indexit = [];
        var indexit2 = []
        for(var i = 0; i < lukuTekstina.length; i++)
        {
indexit.push(lukuTekstinaKaannettyna[i]);
            indexit2.unshift(lukuTekstinaKaannettyna[i]);
    //        console.log(roomalaiset[i][lukuTekstinaKaannettyna[i]]);
      //      console.info(indexit.length);
        //     "14"
            
        }
        var valmis = "";
        var valmis2 = "";
        for(var i = 0; i < indexit.length;i++)
        {
            valmis = roomalaiset[i][indexit[i]] + valmis;
            //valmis
//            console.log($scope.roomalaiset[i][indexit[i]]);
        }
//        console.log(valmis);
        return {tulos:valmis,komponentit:indexit};
    };  // muunnaDesimmaleiksi-funktio loppuu
    
//    }; // funktio1 loppuu
}]); 

*/

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
        return this.kysymys.luku;
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
        var vaikeusAste = Math.round(O.linearMap(0,10,0,6,taso));
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