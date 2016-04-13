
myApp.controller('profiiliController',function($http,$scope,userData,farmService){
    console.log(">>>>>>>>>>>>profiiliController ajettu");
    $scope.onnistunnut = false;
    $scope.eiOnnistunut = false;
    $scope.user = userData.getUser();
    $scope.testi2 = "Testi2";
    $scope.farmTieto = farmService.ateGrassTotal;
    
    haeKayttajaTiedot = function(){
        $http({
            method: 'GET',
            url: '/getUserInfoApi'}).then(
        function successCallback(response) {
            $scope.onnistunut = true;
            if(response.data){
                console.log("Tällainen käyttäjä:"+response.data.displayName)
                console.dir(response.data);
                $scope.userName = response.data.displayName;
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

    haeKayttajaTiedot();
})
