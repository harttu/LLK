myApp.controller('tuloksetController',function($http,$scope,userData){
    $scope.nayta = function(kohde,paalla){
        console.log("painettu");
        kohde = paalla;
//        $scope.data.nakyvissa = paalla;
    }
    console.log("TULOKET CONTROLLER AJETAAN!!!!!!!!")
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
  //  $scope.alusta = function(){
        var kayttaja = userData.getUser();
        haePeliTiedot(kayttaja,'liuos','liuosArray');
        haePeliTiedot(kayttaja,'tabletti','tablettiArray');
        haePeliTiedot(kayttaja,'roomalaiset','roomalaisetArray');
        haePeliTiedot(kayttaja,'resepti','reseptiArray');
        haePeliTiedot(kayttaja,'yksikko','yksikkoArray');
  //  }    
})
