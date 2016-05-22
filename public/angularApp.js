var myApp = angular.module('myApp',['ngRoute','ngSanitize','angularMoment']);

/*
angular.module('myApp', [])
  .controller('exitController', function($scope, $window) {
    $scope.onExit = function() {
        alert("Haluatko lähteä")
      return ('bye bye');
    };

   $window.onbeforeunload =  $scope.onExit;
  });
/*
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
*/

// - Teoriapläjäys SPA ja login: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

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

myApp.directive("yhteenveto",function(){
    return { 
        replace:true,
        templateUrl:'/directives/yhteenveto.html',
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
