myApp.controller('logoutController',function($http,$scope,$window,$location,userData){
    function logMeOut() {    
        console.log("logout----------------------Submitoitu");
        $http({
            method: 'POST',
            url: "/logout/",
            //data: JSON.stringify({username:$scope.username,password:$scope.password}),
            //headers: {'Content-Type': 'application/json'}
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status) {
            console.log("logout onnistui");
            console.dir(data);
            userData.logoutUser();
            $window.location.reload();
            $location.path('/');
            $route.reload();
    }).error(function(data,status){
            console.log("logout EI onnistunut");
            console.dir(data);
    });
    }
    logMeOut();
});

/*
myApp.controller('loginController',['$http','$scope','$window','$location','userData',function($http,$scope,$window,$location,userData){
     $scope.submit2 = function() {    
        // TODO
        // Testaa onko käyttäjä jo kirjautuneena, jos on
        // niin älä anna lähettää
  
        console.log("Submitoitu2");
        $http({
            method: 'POST',
            url: "/angularLogin/",
            data: "username=" + $scope.username + "&" + "password=" + $scope.password,
            //data: JSON.stringify({username:$scope.username,password:$scope.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status) {
            console.log("POST onnistui");
            console.dir(data);
            userData.setUser(data);
            console.dir(status);
            $window.location.href = "#/tulokset";
            
        }).error(function(data, status){
            console.log("POST onnistui, väärät tunnukset");
            $scope.errorMsg = true;
            console.dir(data);
            
        })
    }
  
  
  // Vanha runko  
      $scope.submit = function() {    
        console.log("Submitoitu");
        $http({
            method: 'POST',
            url: "/angularLogin/",
            data: JSON.stringify({username:$scope.username,password:$scope.password}),
            headers: {'Content-Type': 'application/json'}
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status) {
            console.log("POST onnistui");
            console.dir(data);
        });
    }
  
}]);


//
// Käytetään tarvittaessa DEBUGauksessa. Idea on, että saadaan nopeasti käyttäjä kirjautumaan sisään
//
myApp.controller('logJackInController',function($http){
    $http({
        method:'POST',
        url:"/angularLogin/",
        data: "username=jack&password=secret",
        headers:{'Content-type':'application/x-www-form-urlencoded'}
    }).success(function(data, status) {
            console.log("POST onnistui");
            console.dir(data);
            console.dir(status);
            $window.location.href = "#/tulokset";
            
        }).error(function(data, status){
            console.log("POST onnistui, väärät tunnukset");
            $scope.errorMsg = true;
            console.dir(data);
            
        });
    
})
*/