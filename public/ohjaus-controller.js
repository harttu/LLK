
angular.module('myApp')
.controller('ohjausController',
    ['$scope','$routeParams','$location','$window','$route','userData',
    function($scope,$routeParams,$location,$window,$route,userData){
     
     
    $scope.kayttajaNimi = userData.getUser();   
    /*   
    if( userData.getUser() === "guest")
    {
        $scope.kayttajaNimi = "";
    }*/
    
    $scope.kysymykset = []; 
    $scope.yhteenvetoKysymykset = {kysymykset:[]};
       
//    var self = this;
    console.log("This on ");
    console.dir(this);
    
    $scope.pisteet = {oikein: 0,
                      vaarin: 0,
                      monesko: 1,
                      maksimi: 5,
                      //parasTulos:0,
                      laskeArvosana:function(){return (this.oikein/this.maksimi);}};
        
    $scope.asetukset = {taso:'helppo',
                        kysymyksetLkm:5,
                        vaikeusTasoMinimi:0,
                        vaikeusTasoMaksimi:3,
                        }
    //
    // Laskee sopivan tason luotavaan kysymykseen
    // Käytännössä on vain lineaarikuvaus
    // tasot annetaan välillä 0 ja 1
    // 
    // linearMap siis palauttaa arvon välillä 0 - 1
    // ja lähettää tämän muodostettavalle kysymykselle
    // sen jälkeen kysymys säätää tämän tason itselleen 
    // sopivaksi
    $scope.asetukset.ohjaus = function(){
        var palautettava = O.linearMap(1, this.kysymyksetLkm,
                           this.vaikeusTasoMinimi, this.vaikeusTasoMaksimi,
                           $scope.pisteet.monesko);
        console.log("X1="+1+" X2="+this.kysymyksetLkm+" Y1="+this.vaikeusTasoMinimi+" Y2="+this.vaikeusTasoMaksimi+
        " X="+$scope.pisteet.monesko+" =>"+palautettava);
        return palautettava;
       
    }
    
    $scope.asetukset.peliMoodi = "PISTEET"
    
    $scope.yritaUudelleen = function(){
        //var osoite = $routeParams.peliLaji+"/"+$routeParams.peliMoodi+"/"+$routeParams.taso+"/"+$routeParams.kysymyksienLkm;
        $route.reload();
    }
    
    //
    // ALUSTA
    $scope.alusta = function(){        
        console.log("routeparams:");
        console.dir($routeParams);
        
        $scope.asetukset.peliLaji = $routeParams.peliLaji;
        $scope.asetukset.peliMoodi = $routeParams.peliMoodi;
        $scope.asetukset.taso = $routeParams.taso;         
        $scope.pisteet.maksimi = parseInt($routeParams.kysymyksienLkm);
        $scope.asetukset.kysymyksetLkm = parseInt($routeParams.kysymyksienLkm);
        
        //
        // AlkuAsetukset
        if($scope.asetukset.peliMoodi === 'pistepeli'){
    //        $scope.asetukset.peliMoodi = "PISTEET"
            
            if($scope.asetukset.taso === 'helppo'){
                    $scope.asetukset.vaikeusTasoMinimi = 0;//1;
                    $scope.asetukset.vaikeusTasoMaksimi = 0.3;//3;
            }
            else if($scope.asetukset.taso === 'normaali'){
                    $scope.asetukset.vaikeusTasoMinimi = 0.3;//3;
                    $scope.asetukset.vaikeusTasoMaksimi = 0.7;//7;
            }
            else if($scope.asetukset.taso === 'vaikea'){
                    $scope.asetukset.vaikeusTasoMinimi = 0.7;//7;
                    $scope.asetukset.vaikeusTasoMaksimi = 1;//10;
            }
        }
        $scope.kysymys = new Kysymys[$scope.asetukset.peliLaji]();
        $scope.kysymys.luoKysymys($scope.asetukset.ohjaus());
        console.log("Kysymyksen taso tulee olemaan:"+$scope.asetukset.ohjaus())
        console.log("Kysymys on valmis:")
        console.dir($scope.kysymys);
            
        $scope.vastausKentta = { arvo:"" };
        $scope.TILA = 'UUSI';
            
        $scope.pisteet.oikein = 0;
        $scope.pisteet.vaarin = 0;
        $scope.pisteet.monesko = 1;
    }
       
    $scope.vastausKentta = { arvo:"" };
    /* TILA kertoo ohjelman tilan: 0 - Uusi kysymys, 1 - Vastaus oli oikein, 2 - Vastaus oli väärin, 3 - Kysymykset loppuneet viimeinen oikein, 4 - Kysymykset loppuneet viimeinen väärin*/
    $scope.TILA = 'UUSI';
    
    $scope.esitaKysymys = function(){
        return $scope.kysymys.esitaKysymys();
    }    

    $scope.esitaKysymyksenYksikko = function(){
        return $scope.kysymys.esitaKysymyksenYksikko();
    }

    $scope.esitaSelitys = function(){
        console.log($scope.kysymys.esitaSelitys());
        //setTimeout(function(){$scope.$apply();},1000);
        setTimeout(function(){
            console.log('Päivitys Math'); 
            function f(x) { console.log("-->"+x); };
            MathJax.Hub.Queue([f,15],["Typeset",MathJax.Hub,"matikka"]);
      //      MathJax.Callback.Queue([f,12],["Typeset",MathJax.Hub,"matikka"]);
            
            },1000);
            
        var returnTeksti = $scope.kysymys.esitaSelitys();
        console.log("Tämä sivulle:->"+returnTeksti);
        return returnTeksti;
    }
    
    $scope.matikka = function() {
        MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"matikka"],["Typeset",MathJax.Hub]);
    }
    
    $scope.debugOikein = function(){
        $scope.vastausKentta.arvo = $scope.kysymys.oikeaVastaus();
        $scope.vastaa();
        $scope.seuraavaKysymys();
    }
    $scope.debugVaarin = function(){
        $scope.vastausKentta.arvo = $scope.kysymys.oikeaVastaus() + 1;
        $scope.vastaa();
        $scope.seuraavaKysymys();
    }    
    
    function validoi(luku){
        // jos on käytetty pilkkua, vaihda pilkku pisteeksi
        if(typeof luku !== "undefined") {
    // obj is a valid variable, do something here.
            var validi = luku.toString().replace(/,/g , '.');
            validi = parseFloat(validi);
            return validi;
        }
/*        else if( isNaN(luku) ){
            return "-";
        }*/
        else{
            return 0;
        }
    }    
        
    //
    // VASTAA
    // 1. Tarkistaa onko vastaus oikein
    //   1. Korottaa oikein menneitä pisteitä
    //   2. Muuttaa VIEWin tilaksi OIKEIN
    //      Talletetaan että vastaus oli oikein
    // 2.Vastaus oli vaarin
    //   1. Korottaa vaarin menneitä pisteitä
    //   2. Muuttaa VIEWin tilaksi VAARIN
    //      Talletetaan, että vastaus oli väärin

    $scope.vastaa = function() {
        // Validoi muoto 
        var vastaus = validoi($scope.vastausKentta.arvo);
        //var vastaus = parseFloat($scope.vast2ausKentta.arvo)//.toFixed(3);//validoi($scope.vastaus)
            console.log("Vastasit ->"+vastaus+"<- Sen tyyppi on:"+typeof vastaus);
            console.log("Oikea vastaus on ->"+$scope.kysymys.oikeaVastaus()+"<- Sen tyyppi on:"+$scope.kysymys.oikeaVastaus());
            
            
        if( vastaus == $scope.kysymys.oikeaVastaus() ){
            console.debug("Oikein!");
            $scope.pisteet.oikein++;
            var serverille = {vastaus:vastaus + " " + $scope.kysymys.vastauksenYksikko(),
                                    oikeaVastaus:$scope.kysymys.oikeaVastaus() + " " + $scope.kysymys.vastauksenYksikko(),
                                    monesko:$scope.pisteet.monesko,
                                    kysymysTeksti:$scope.kysymys.esitaKysymys(),
                                    oikein:true };
            //$scope.kysymykset.push({vastaus:vastaus,monesko:$scope.pisteet.monesko,kysymys:$scope.kysymys,oikein:true});
            //console.log("<<<<<>>>>>>>>>>>>>>>Lisään kysymyksiin:");
            //console.dir(serverille);
            $scope.kysymykset.push(serverille);
            $scope.TILA = 'OIKEIN';
        }
        else{
            $scope.pisteet.vaarin++;
            console.debug("Väärin");
            $scope.TILA = 'VAARIN';
            //$scope.kysymykset.push({monesko:$scope.pisteet.monesko,kysymys:$scope.kysymys,oikein:false})
            $scope.kysymykset.push({vastaus:vastaus + " " + $scope.kysymys.vastauksenYksikko(),
                        oikeaVastaus:$scope.kysymys.oikeaVastaus() + " " + $scope.kysymys.vastauksenYksikko(),
                        monesko:$scope.pisteet.monesko,
                        kysymysTeksti:$scope.kysymys.esitaKysymys(),
                        oikein:false});
        }
        
    } // Vastaa-funktio loppuu
    
    //
    // SEURAAVA
    // 1.asettaa VIEWssä vastauskenttään tyhjän arvon
    // 
    // 2.Talleta vanha kysymys
    //
    // 3.Tutkii oliko edellinen viimeine tehtävä
    //     Se oli
    //       Aseta VIEW näyttämään loppupisteen
    //       Laheta kysymysten tiedot serverille
    //     Se ei ollut
    //       Aseta VIEW näyttämään uusi kysymys
    //       Korota tehtyjen kysymysten määrää
    //       Talleta vanha kysymys
    //       Luo uusi kysymys sopivan tason mukaisesti
    //
    $scope.seuraavaKysymys = function(){        
        $scope.vastausKentta.arvo = "";
       
        if($scope.pisteet.monesko === $scope.pisteet.maksimi){
                console.log(">Sama oli joten asetetaan tila LOPPU")
                $scope.TILA = 'LOPPU';
                //
                // Jos käyttäjä on kirjautunut, niin päivitä tiedot serverille
                // 
                //
                var serverille = {peliTyyppi:$scope.asetukset.tyyppi,
                                             kysymystenMaara:$scope.asetukset.kysymyksetLkm,
                                             vaikeusAste:$scope.asetukset.taso,
                                             oikeinSuhde:$scope.pisteet.laskeArvosana(),
                                             data:$scope.kysymykset,
                                             aika:moment.utc(),
                                             kayttaja:userData.getUser() };
                console.log("<<<<<<<<<<<<<<<<<<< lähetetään serverille.");
                console.dir(serverille);
                userData.paivitaPeliTilanne(serverille);
                $scope.yhteenvetoKysymykset.kysymykset = serverille.data;
                
            }
        else{
            console.log(">Sama oli joten asetetaan tila UUSI")
            $scope.TILA = 'UUSI';
            $scope.pisteet.monesko++;
            $scope.kysymys = new Kysymys[$scope.asetukset.peliLaji]();
            $scope.kysymys.luoKysymys($scope.asetukset.ohjaus());
        }
        console.log("Kysymykset")
        console.dir($scope.kysymykset);
       
        }; // seuraavaKysymys-funktio loppuu

     
    if($routeParams.peliLaji){
        $scope.asetukset.tyyppi = $routeParams.peliLaji; 
        
        console.log("Asetin $scope.asetukset.tehtava:"+$scope.asetukset.tyyppi)    

        if($scope.asetukset.tyyppi === "roomalaiset"){
            $scope.asetukset.peliTyyppi = "Roomalaiset numerot";
        }
        else if($scope.asetukset.tyyppi === "yksikko"){
            $scope.asetukset.peliTyyppi = "Yksikkömuunnokset";
        }
        else if($scope.asetukset.tyyppi === "tabletti"){
            $scope.asetukset.peliTyyppi = "Tablettitehtävät";
        }
        else if($scope.asetukset.tyyppi === "liuos"){
            $scope.asetukset.peliTyyppi = "Liuostehtävät";
        }
        else if($scope.asetukset.tyyppi === "resepti"){
            $scope.asetukset.peliTyyppi = "Reseptitehtävät";
        }
        
    }


    $scope.alusta();
}]);
