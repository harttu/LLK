
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