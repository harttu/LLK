 window.O = {};
 window.Kysymys = {};
  
  var linearMap  = function(X1,X2,Y1,Y2,X){
         return ( (Y2 - Y1) / (X2 - X1) ) * ( X - X1 ) + Y1; 
         //return (X-X1)/(X2-X1) * (Y2-Y1) + Y1;
    }
  O.linearMap = linearMap;
  
  angular.module('myApp.filters', []).
  filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);


myApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

myApp.filter('muotoileAika', function() {
    return function(input) {
      return (!!input) ? moment(input).lang("fi").calendar() : '';

      //return (!!input) ? moment(input).format("DD MM YY") : '';
    }
});

myApp.filter('prosentiksi', function() {
    return function(input) {
      return Math.round((input * 100),2) + '%';
    }
});

/*
myApp.controller('tuloksetController',function($http,$scope){
    $scope.nayta = function(kohde,paalla){
        console.log("painettu");
        kohde = paalla;
//        $scope.data.nakyvissa = paalla;
    }
    
    console.log("tuloksetController ajetaan")
    $scope.onnistunnut = false;
    $scope.eiOnnistunut = false;
    
    var haePeliTiedot = function(kayttaja,peliTyyppi,tallennusKohde){
        $http({
            method: 'GET',
            url: '/haePeli/'+kayttaja+'/'+peliTyyppi}).then(
        function successCallback(response) {
            $scope.onnistunut = true;
            if(response){
                console.log("Tällaista saatiin:")
                console.dir(response.data);
//                $scope.dataArray = response.data;
                $scope[tallennusKohde] = response.data;
//                tallennusKohde = response.data;
    //            $scope.userName = response.data.displayName;
            }
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("Ei onnistunut:"+response)
        $scope.eiOnnistunut = true;
    })
    }

//haePeliTiedot('jack','liuos','dataArray');

haePeliTiedot('jack','liuos','liuosArray');
haePeliTiedot('jack','tabletti','tablettiArray');
haePeliTiedot('jack','roomalaiset','roomalaisetArray');
haePeliTiedot('jack','resepti','reseptiArray');
haePeliTiedot('jack','yksikko','yksikkoArray');
    
})
*/

myApp.controller('signUpController',function($http,$scope){
    var kayttajaNimet = [];
    $scope.virheet = [];
    $scope.TILA = 'LUODAAN';
    var virheet = $scope.virheet;

    $scope.formi = {};
    $scope.formi.kayttajaTunnus = "";
    $scope.formi.salasana = "";
    $scope.formi.salasanaUudestaan = "";
    $scope.formi.etuNimi = "";
    $scope.formi.sukuNimi = "";
    $scope.formi.ryhma = "";
    $scope.formi.sahkoPosti = "";
    var kayttajaNimet = [];

    $http({
                method: 'GET',
                url: '/haeKayttajat'
            }).then(
                function successCallback(response) {
                    console.log("Käyttäjänimet saatiin. Ne ovat:");
                    console.dir(response.data);
                    kayttajaNimet = response.data;
                    
            }, function errorCallback(response) {
                console.error("Varattuja käyttäjätunnuksia ei saada!");
        })
                                
    $scope.laheta = function(){
        var salasana = $scope.formi.salasana;
        $scope.virheet = [];
        virheet = $scope.virheet;
        if( salasana !== $scope.formi.salasanaUudestaan){
            virheet.push("Salasanat eivät täsmää.");
        }
        if( salasana.length < 5 ){
            virheet.push("Salasana on liian lyhyt.");
        }
        if( ! $scope.formi.sahkoPosti ){
            virheet.push("Syötä sähköpostiosoite.");
        }
        if( ! $scope.formi.kayttajaTunnus ) {
            virheet.push("Syötä käyttäjänimi.");
        }
        
       for(var i = 0; i < kayttajaNimet.length;i++){
            console.log("Testataan onko:"+kayttajaNimet[i]+" sama kuin "+$scope.formi.kayttajaTunnus);
            if(kayttajaNimet[i] === $scope.formi.kayttajaTunnus ){
                virheet.push("Käyttäjätunnus on varattu.");
            }
        }
        
        if( virheet.length !== 0 ){
            console.log(virheet);
            $scope.formi.salasana = "";
            $scope.formi.salasanaUudestaan = "";

            return;
        }
        $scope.formi.aika = "22"
       $http({
                method: 'POST',
                url: "/signUp/",
                data: JSON.stringify({kayttajaTunnus:$scope.formi.kayttajaTunnus,
                                            salasana:$scope.formi.salasana,
                                            etuNimi:$scope.formi.etuNimi,
                                            sukuNimi:$scope.formi.sukuNimi,       
                                            ryhma:$scope.formi.ryhma,
                                            sahkoPosti:$scope.formi.sahkoPosti,
                                            luontiAika:moment.utc()
                                            }),
                headers: {'Content-Type': 'application/json'}
        }).success(function(data, status) {
                console.log("POST onnistui data:");
                console.dir(data.data);
                //data.data;
                console.log("status")
                console.log(status)
                //Ohjaa muualle
                $scope.TILA = 'LUOTU';
        }).error(function(data,status) {
            console.error('Ei onnistunut...')
        });
    }
})
