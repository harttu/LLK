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
        // TOTHINK 
        // Toinen vaihtoehto olisi kysyä serveriltä username 
        return localStorage.getItem("userData_user") || "Vieras";
        }
    this.logoutUser = function(){
        localStorage.setItem("userData_user", "Vieras");
    } 
}]);
 