var myApp = angular.module('myApp',['ngRoute','ngSanitize','angularMoment']);

/*
myApp.service('userData',function(){
    console.log("userData-service ajetaan|||||||||||")
   // this.user = "guest";

});
*/



myApp.service('userData', ['$http',function($http){
   this.paivitaPeliTilanne = function(tilanne) {
        $http({
            method: 'POST',
            url: "/lisaaPeli/",
            data: JSON.stringify(tilanne),
            headers: {'Content-Type': 'application/json'}
    }).success(function(data, status) {
            console.log("POST onnistui");
            console.dir(data);
        });
    }
    this.setUser = function(name){ 
        console.log("userData > "+name);
        localStorage.setItem("userData_user", name);
    //    this.user = name; 
    }
    this.getUser = function(){ 
        return localStorage.getItem("userData_user") || "guest";
        //return user; 
        }
    this.logoutUser = function(){
        localStorage.setItem("userData_user", "guest");
    } 
}]);
 


myApp.service('farmService', function() {
    this.ateGrassTotal = 0;
    this.evalFarm = function(times,cows) {
        var grass = times - this.ateGrassTotal;
        var newCows = [];
        for(var i = 0;i < cows.length; i++){
            if(cows[i].eatGrass()){
                grass -= 1;
                this.ateGrassTotal += 1;
                newCows.push(cows[i]);
            }
        }
        return {grass:grass,cows:newCows}
    };
});

/*
myApp.controller('roomalaisetController',function($http,$scope){
// Simple GET request example:
$scope.paivitaServerille = function(){
    $http({
        method:'POST',
        url:'/angularData/roomalaiset',
        data:JSON.stringify($scope.tilanne),
        headers:{'Content-Type':'application/json'}
    }).success(function(data, status) {
            console.log("POST onnistui");
            console.dir(data);
        });        
    };


$scope.tilanne = [];

$scope.taso = 4;
$scope.oikein = function(){ $scope.taso++; $scope.tilanne.push([$scope.taso,1]); }
$scope.vaarin = function(){ $scope.tilanne.push([$scope.taso,0]); }

$scope.lahetaGET = function(){
    $http({
        method:'GET',
        url:'/angularData/roomalaiset'
    }).then(function(response) { //http
        $scope.tiedot = response.data;
        $scope.tilanne.push(response.data.pistepeli5.viimeinenPeli);
        $scope.taso = response.data.badge.nykyinenTaso;
    }) //then
}(); //this is an IIFE;


$scope.lahetaPOST = function() {    
        $http({
            method: 'POST',
            url: "/testJSONPOST/",
            data: JSON.stringify({data:123}),
            headers: {'Content-Type': 'application/json'}
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status) {
            console.log("POST onnistui");
            console.dir(data);
        });
    }
});
*/
/*
myApp.controller('logoutController',function($http,$scope,$window,$location){
    function logMeOut() {    
        console.log("Submitoitu");
        $http({
            method: 'GET',
            url: "/angularLogout/",
            //data: JSON.stringify({username:$scope.username,password:$scope.password}),
            //headers: {'Content-Type': 'application/json'}
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status) {
            console.log("logout onnistui");
            console.dir(data);
    });
    }
    logMeOut();
});




myApp.controller('logJackInController',function($http){
    $http({
        method:'POST',
        url:"/angularLogin/",
        data: "username=jack&password=secret",
        headers:{'Content-type':'application/x-www-form-urlencoded'}
    });
    
})

myApp.controller('loginController',function($http,$scope,$window,$location){
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
    
    $scope.submit2 = function() {    
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
            $window.location.href = "#/tulokset";
            
        }).error(function(data, status){
            console.log("POST onnistui, väärät tunnukset");
            $scope.errorMsg = true;
            console.dir(data);
            
        })
    }
});

*/

// - See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

myApp.config(function ($httpProvider) { 
    $httpProvider.interceptors.push(function($q, $location) { 
        return { response: function(response) { 
            // do something on success 
            return response; 
            }, 
            responseError: function(response) { 
                if (response.status === 401) {
                    console.log("SAIN 401!!!!!!1");
                    $location.url('/logIn'); 
                }
                return $q.reject(response); 
            } 
    }; 
    });
});

myApp.config(function($routeProvider) {
    $routeProvider
//    .when('/', {
 //       templateUrl: '/home',
  //      controller:function(){}//'indexController'
  //  })
    .when('/',{
        templateUrl:'/index'
    })
    .when('/roomalaiset',{
        templateUrl:'/roomalaiset',
        controller:'roomalaisetController'
    })
    .when('/yksikko',{
        templateUrl:'/yksikko',
        controller:'yksikko'
    })
    .when('/:peliLaji/:peliMoodi/:taso/:kysymyksienLkm',{
        templateUrl:'/ohjaus',
        controller:'ohjausController'
    })
    .when('/profiili',{
        templateUrl:'/profile',
        controller:'profiiliController'
    })/*
    .when('/login',{
        templateUrl:'/login',
        controller:'loginController'
    })
    .when('/logout',{
        templateUrl:'/logout',
        controller:'logoutController'
    })*/
    .when('/logJackIn',{
        template:'<h2>Jack is in.</h2>',
        controller:'logJackInController'
    })
    .when('/valikko/:tyyppi',{
        templateUrl:'/valikko',
        controller:'valikkoController'
    })
    .when('/logIn',{
        templateUrl:'/logIn',
        controller:'loginController'
    })//*/
    .when('/signIn',{
        templateUrl:'/signIn',
        controller:''
    })
    .when('/signUp',{
        templateUrl:'/signUp',
        controller:'signUpController'
    })
    .when('/logOut',{
        templateUrl:'/logout',
        controller:'logoutController'
    })
    .when('/tulokset',{
        templateUrl:'/tulokset',
        controller:'tuloksetController'
    })
  //  .otherwise( { redirectTo: '/' });
});

/*
myApp.directive("loppupisteet",function(){
    return { 
        replace:true,
        templateUrl:'/directives/loppupisteet.html',
    }
});
*/
myApp.directive("loppupisteet2",function(){
    return { 
        replace:true,
        templateUrl:'/directives/loppupisteet2.html',
    }
});

myApp.directive("test",function(){
    return { 
        replace:true,
        templateUrl:'/directives/test.html',
    }
});


myApp.directive("peliyhteenveto",function(){
    return { 
        replace:true,
        templateUrl:'/directives/peliyhteenveto.html',
    }
});

myApp.directive("peliyhteenveto2",function(){
    return { 
 //       replace:true,
        scope:{ darray: '='},
        templateUrl:'/directives/peliyhteenveto2.html',
    }
});

myApp.directive("kayttaja",function(){
    return { 
 //       replace:true,
        scope:{ user: '='},
        templateUrl:'/directives/kayttaja.html',
    }
});


myApp.directive("otsikko2",function(){
    return { 
        replace:true,
        transclude:true,
        template:'<div class="well"><p class="h2 otsikonTyyli"><ng-transclude></ng-transclude></p></div>',
    }
});

myApp.directive("otsikko",function(){
return {
    restrict:'AE',/*replace only if Element, Attribute , Class and coMment */
    replace:true,
    templateUrl:'directives/otsikko.html',
    transclude:true,
    scope:{
        pisteet: "=pisteet",/* objekti  */
        alaNayta:'=alaNayta',
        kysymysTeksti:'@kysymysTeksti', /* @ = pelkkää tekstiä*/
        kuva:"="
    },
    compile: function(element, attrs){
       if (!attrs.kysymysTeksti) { 
           attrs.kysymysTeksti = 'Kysymys'; 
       }
      if (!attrs.kuva) { 
           attrs.kuva = 'Kysymys'; 
       }
        console.log("DIR compile:teksti"+attrs.kysymysTeksti)
    },
/*
    link: function(scope, element, attrs, controllers) {
           console.log(scope)
           console.log(attrs)
    }
    */
}
});
  
function strip(number) {
    return (parseFloat(number.toPrecision(12)))
};

String.prototype.reverse = function() {
    var s = "";
    var i = this.length;
    while (i>0) {
        s += this.substring(i-1,i);
        i--;
    }
    return s;
}


MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: "none",
    "HTML-CSS": {
        showMathMenu: false,
//        linebreaks: { automatic: true } 
    },
     displayAlign: "left"
     
});

MathJax.Hub.Configured();

myApp.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.$watch($attrs.mathjaxBind, function(value) {
                console.log("mathjaxBind:value="+value)
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                console.log("¤¤>elementissa");
                console.dir($element);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
});
