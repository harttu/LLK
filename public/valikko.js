angular.module('myApp')
.controller('valikkoController',['$scope','userData','$routeParams','$location','$window','$route', function($scope,userData,$routeParams,$location,$window,$route){
    
    var url = $location.url()
    console.log("Missä ollaan>"+url)
    
    console.log($routeParams)
    $scope.asetukset = {tehtava:"",
                        otsikko:"",
                        taso:'HELPPO',
                        kysymyksetLkm:5,
                        vaikeusTasoMinimi:0,
                        vaikeusTasoMaksimi:5,
                        ohjaus:undefined
                       }
    $scope.pisteet = {
        oikein:0,vaarin:0,monesko:1,maksimi:5,
        pisteet:function(){return this.oikein * 10;}
    };
    
    $scope.mene = function(kohde){
        var url = '/#/'+$scope.asetukset.tyyppi+kohde;
        //var url = 'index#/'+$scope.asetukset.tyyppi+kohde;
        console.log("Vertailu :"+url)
//        alert("Vertailu :"+url)
        $window.location.href = url;
    }
    
    if($routeParams.tyyppi){
        $scope.asetukset.tyyppi = $routeParams.tyyppi; 
        
        console.log("Asetin $scope.asetukset.tehtava:"+$scope.asetukset.tyyppi)    

        if($scope.asetukset.tyyppi === "roomalaiset"){
            $scope.asetukset.otsikko = "Roomalaiset numerot";
        }
        else if($scope.asetukset.tyyppi === "yksikko"){
            $scope.asetukset.otsikko = "Yksikkömuunnokset";
        }
        else if($scope.asetukset.tyyppi === "tabletti"){
            $scope.asetukset.otsikko = "Tablettitehtävät";
        }
        else if($scope.asetukset.tyyppi === "liuos"){
            $scope.asetukset.otsikko = "Liuostehtävät";
        }
        else if($scope.asetukset.tyyppi === "resepti"){
            $scope.asetukset.otsikko = "Reseptitehtävät";
        }
        
    }
}]);