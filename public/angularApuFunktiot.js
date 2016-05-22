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

