
angular.module('myApp')
.controller('yksikkoController',
    ['$scope','$routeParams','$location','$window','$route','userData', function($scope,$routeParams,$location,$window,$route,userData){
        
    var kysymykset = [];    
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
    $scope.asetukset.ohjaus = function(){
        var palautettava = O.linearMap(1, this.kysymyksetLkm,
                           this.vaikeusTasoMinimi, this.vaikeusTasoMaksimi,
                           $scope.pisteet.monesko);
        console.log("X1="+1+" X2="+this.kysymyksetLkm+" Y1="+this.vaikeusTasoMinimi+" Y2="+this.vaikeusTasoMaksimi+
        " X="+$scope.pisteet.monesko+" =>"+palautettava);
        return palautettava;
       
    }
    
    $scope.asetukset.peliMoodi = "PISTEET"
    //
    // ALUSTA
    $scope.alusta = function(){        
        console.log("routeparams:");
        console.dir($routeParams);
        
        $scope.asetukset.peliLaji = $routeParams.peliLaji;
        $scope.asetukset.peliMoodi = $routeParams.peliMoodi;
        $scope.asetukset.taso = $routeParams.taso;         
        $scope.pisteet.maksimi = parseInt($routeParams.kysymyksienLkm);
        
        //
        // AlkuAsetukset
        if($scope.asetukset.peliMoodi === 'pistepeli'){
    //        $scope.asetukset.peliMoodi = "PISTEET"
            
            if($scope.asetukset.taso === 'helppo'){
                    $scope.asetukset.vaikeusTasoMinimi = 1;
                    $scope.asetukset.vaikeusTasoMaksimi = 3;
            }
            else if($scope.asetukset.taso === 'normaali'){
                    $scope.asetukset.vaikeusTasoMinimi = 3;
                    $scope.asetukset.vaikeusTasoMaksimi = 7;
            }
            else if($scope.asetukset.taso === 'vaikea'){
                    $scope.asetukset.vaikeusTasoMinimi = 7;
                    $scope.asetukset.vaikeusTasoMaksimi = 10;
            }
        }
        $scope.kysymys = new Kysymys[$scope.asetukset.peliLaji]();
        $scope.kysymys.luoKysymys($scope.asetukset.ohjaus());
        console.log("Kysymyksen taso tulee olemaan:"+$scope.asetukset.ohjaus())
        console.log("Kysymys on valmis:")
        console.dir($scope.kysymys);

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
        var vastaus = parseFloat($scope.vastausKentta.arvo)//.toFixed(3);//validoi($scope.vastaus)
            console.log("Vastasit "+vastaus);
            
        if( $scope.vastausKentta.arvo == $scope.kysymys.oikeaVastaus() ){
            console.debug("Oikein!");
            $scope.pisteet.oikein++;
            kysymykset.push({kysymys:$scope.kysymys,oikein:true});
            $scope.TILA = 'OIKEIN';
        }
        else{
            $scope.pisteet.vaarin++;
            console.debug("Väärin");
            $scope.TILA = 'VAARIN';
            kysymykset.push({kysymys:$scope.kysymys,oikein:false})
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
                userData.paivitaPeliTilanne(kysymykset);
            }
        else{
            console.log(">Sama oli joten asetetaan tila UUSI")
            $scope.TILA = 'UUSI';
            $scope.pisteet.monesko++;
            $scope.kysymys = new Kysymys[$scope.asetukset.peliLaji]();
            $scope.kysymys.luoKysymys($scope.asetukset.ohjaus());
        }
        console.log("Kysymykset")
        console.dir(kysymykset);
       
        }; // seuraavaKysymys-funktio loppuu


    $scope.alusta();
}]);
