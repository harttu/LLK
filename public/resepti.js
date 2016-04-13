(function(window){
    

     var roomalaiset =[
                        ["","I","II","III","IV","V","VI","VII","VIII","IX"],
                        ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
                       ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
                       ["","M","MM","MMM","MT","T","TM","TMM","TMMM"],
                    ]; 
    // Function Constructor  
    var Kysymys = function(taso){
        
        this.kysymys = {
                kenelle:"Matille",
                potilaanNimiEnsin:true,       
                tabletinVahvuus:600,
                antoAjanKohta:"päivässä",
                laakeKerroin:3,         // 600*3 = 1800 
                paivaKerroin:2,         // kahdesti päivässä 
                paivanAikanaTabletteja:function(){return this.paivaKerroin*this.laakeKerroin;}, 
                maarattyAnnos:function(){return this.tabletinVahvuus*this.laakeKerroin;},
            //  tablettiKerroin:0,
                tablettienKplNumeroina:50,
                tablettienKplRoomalaisilla:function(){return muunnaDesimaaleiksi(this.tablettienKplNumeroina).tulos},
                vastaus:function(){return this.tablettienKplNumeroina/(this.laakeKerroin*this.paivaKerroin);},
                vastausFloor:function(){return Math.floor(this.vastaus());},
                kysymysTeksti:"" 
            };

        this.asetukset = {
            taso: 1,
            maksimi : 10,
            suhde : function() { return this.taso/this.maksimi }
        }
        this.asetukset.taso = taso || 1;
    }
  

    Kysymys.prototype.asetaTaso = function(suhde){
        this.asetukset.taso = suhde * this.maksimi;
    }
    
    Kysymys.prototype.esitaKysymyksenYksikko = function(){
        return " kokonaista päivää.";
    }
    
    Kysymys.prototype.vastauksenYksikko = function(){
        return "kokonaista päivää";
    }
    Kysymys.prototype.tarkistaVastaus = function(vastaus) {
        /*
        var oikeaVastaus = Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000;
        console.log("Oikea vastaus on:"+oikeaVastaus)
        if( vastaus === Math.round(this.kysymys.mantissa * Math.pow(10,this.kysymys.eksponentti-this.kysymys.kysyttyEksponentti) * 1000000)/1000000 ) {
            return true;
        }
        else{
            return  false;
        }
        */
    }
    var jorma = 0;
    Kysymys.prototype.esitaSelitys = function(){
            var vihje = "";
            var lista = muunnaDesimaaleiksi(this.kysymys.tablettienKplNumeroina).komponentit;
            for( var i = lista.length - 1; i >= 0; i--){
                //console.warn(lista);
                var ele = parseInt(lista[i]);
                //console.debug(ele);
                if(ele === 0 || ele === NaN ){
                    console.debug("Ele ei käy, joten skipataan");
                   continue;
                }
                else{
                    vihje = vihje+" "+ roomalaiset[i][parseInt(ele)]+" = "+parseInt(ele) * Math.pow(10,i);
                    jorma++;
                    console.log("JORMA");
                }
            }
                //$scope.kysymys = Math.floor((Math.random() * 999));
        var oikeanVastauksenAlku = "<h3>Oikea vastaus</h3><br />";
        
        if(jorma === 1) {
        oikeanVastauksenAlku += "Tabletteja on määrätty " +
                                vihje +
                            ".";
        }
        else{
            oikeanVastauksenAlku += "Oikea Tabletteja on määrätty " +
                                vihje +
                                " , eli " +
                                this.kysymys.tablettienKplRoomalaisilla() +
                                " = " +
                                this.kysymys.tablettienKplNumeroina +
                                ".";  
        }
            
        var palautettava = oikeanVastauksenAlku +
                            "<br />" +
                            "Päivässä tabletteja otetaan " +
                            + this.kysymys.paivaKerroin +
                            " kertaa ja kerralla otetaan " +
                            this.kysymys.laakeKerroin +
                            " tablettia." +
                            "<br />" +
                            "Eli päivän aikana otetaan <b>" +
                            this.kysymys.paivanAikanaTabletteja() +
                            " tablettia</b>." +
                            " Tällöin " +
                            this.kysymys.tablettienKplNumeroina +
                            " tablettia kestää: " +
                            this.kysymys.tablettienKplNumeroina +
                            " / " +
                            this.kysymys.paivanAikanaTabletteja() +
                            " = " +
                            this.kysymys.vastaus() + 
                            " päivää."+
                            "<br />"+
                            "<h3>Vastaus</h3>"+
                            "Tabletit kestävät "+
                            this.kysymys.vastaus() + 
                            " päivää.";
          return palautettava;
    }
    
    Kysymys.prototype.esitaKysymys = function(){
       //var palautus = this.kysymys.kenelle + " on määrätty " + this.kysymys.maarattyAnnos() + " mg " + 
       //this.kysymys.antoAjanKohta + ". Tabletin vahvuus on " + this.kysymys.tabletinVahvuus + " mg ja niitä on määrätty " +
       //this.kysymys.tablettienKplRoomalaisilla() + ". " +
       //"<br />" + 
       //" Kuinka monta päivää kuuri kestää?";
       // return palautus;
       return this.kysymys.kysymysTeksti;
    }
    
    Kysymys.prototype.oikeaVastaus = function(){
        return Math.floor(this.kysymys.vastaus());
    }
        
    
    Kysymys.prototype.luoKysymys = function(vaikeus,edellinenVastaus) {
        var kysymys = this.kysymys;
        console.log("Vanha vastaus oli:"+edellinenVastaus)
        console.log("Vaikeustaso on:"+vaikeus)
        vaikeus = Math.round(O.linearMap(0,1,1,7,vaikeus));
        console.log(" ja muunnoksen jälkeen se on:"+vaikeus)
        kysymys.potilaanNimiEnsin = Math.random() < 0.5;
        
        var kuka = ["Potilaalle","Matille","Liisalle","Kalervolle","Ainolle"];
        var arpa = arvoN(kuka.length) - 1;
        kysymys.kenelle = kuka[arpa]
        
        var annostus = 1;
        //var arvoN(20) * 10;
        
        arpa = vaikeus;// arvoN(4);
        
        var varmistin = 0;
        var antoMahdollisuudet = [[],
            ["kerran päivässä"," x 1","aamuisin","iltaisin"],
            [" x 2","kahdesti päivässä","aamulla ja illalla"],
            ["kolme kertaa päivässä"," x 3","kolmesti päivässä"]
            ];

        
        do
        {
            arpa = vaikeus;
            console.log("Vaikeustaso on:"+vaikeus)
            
            // Helpoin taso
            // Tablettien määrä = päivien määrä
            if( arpa === 1 ){ 
                kysymys.laakeKerroin = 1;arvoN(3);
                kysymys.paivaKerroin = 1;
            //    var antoMahdollisuudet = ["kerran päivässä","1x1","aamuisin","iltaisin"];
                arpa = arvoN(antoMahdollisuudet[kysymys.paivaKerroin].length) - 1; // arvotaan yksi ylemmistä
                kysymys.antoAjanKohta = antoMahdollisuudet[arpa]; // asetetaan se
                var laakeMahdollisuudet = [50,100,200,400];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                arpa = arvoN(10)*10;
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
            // 
            }
            // Toiseksi Helpoin taso
            // Tablettien määrä = päivien määrä
            // Kesto on tasa viikkoja => 7 * Rand(1 - 8)
            else if( arpa === 2 ){ 
                kysymys.laakeKerroin = 1;arvoN(3);
                kysymys.paivaKerroin = 1;
                //var antoMahdollisuudet = ["kerran päivässä","1x1","aamuisin","iltaisin"];
                //arpa = arvoN(antoMahdollisuudet.length) - 1; // arvotaan yksi ylemmistä
                //kysymys.antoAjanKohta = antoMahdollisuudet[arpa]; // asetetaan se
                var laakeMahdollisuudet = [50,100,200,400];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                //arpa = arvoN(10)*10;
                // Arvotaan luku 7än kertotaulusta
                arpa = Math.round(Math.random() * 7 + 1) * 7;
                console.log(arpa)
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
            // 
            }
            // Toiseksi Helpoin taso
            // Tablettien määrä = Rand(2,3)
            // Kesto = 10 * Tablettien määrä * Rand(1,2)
            // Eli vastauksista tulee kivoja
            else if( arpa === 3 ){ 
                kysymys.laakeKerroin = arvoN(2) + 1;
                kysymys.paivaKerroin = 1;
                //var antoMahdollisuudet = ["kerran päivässä","1x1","aamuisin","iltaisin"];
                //arpa = arvoN(antoMahdollisuudet.length) - 1; // arvotaan yksi ylemmistä
                //kysymys.antoAjanKohta = antoMahdollisuudet[arpa]; // asetetaan se
                var laakeMahdollisuudet = [50,100,200,400];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                //arpa = arvoN(10)*10;
                arpa = 10 * Math.round(Math.random() + 1) * kysymys.laakeKerroin;
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
            }

            else if( arpa === 4 ){
                kysymys.laakeKerroin = 2;//arvoN(2) + arpa;
                kysymys.paivaKerroin = 2;//arvoN(2) + (1 - arpa);
                var laakeMahdollisuudet = [50,100,200,400];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                // Vastaukseksi tasakymmeniä 
                arpa = 10 * Math.round(Math.random() + 3) * kysymys.laakeKerroin;
                console.warn("Tabl.#:"+arpa)
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
                
            }
            else if( arpa === 5) { // Annetaan kaksi kertaa päivässä 
                arpa = Math.round(Math.random()) // 0 tai 1
                kysymys.laakeKerroin = arvoN(2) + arpa;
                kysymys.paivaKerroin = arvoN(2) + (1 - arpa);
                //var antoMahdollisuudet = ["1x2","kahdesti päivässä","aamulla ja illalla"];
                //arpa = arvoN(antoMahdollisuudet.length) - 1;
                //kysymys.antoAjanKohta = antoMahdollisuudet[arpa];
                var laakeMahdollisuudet = [25,50,100];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                // Arvotaan luku 7än kertotaulusta
                arpa = 10 * Math.round(Math.random() + 1) * kysymys.laakeKerroin;
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
            }
            else if( arpa === 6) {
                kysymys.laakeKerroin = arvoN(2);
                kysymys.paivaKerroin = 3;
                //var antoMahdollisuudet = ["kolme kertaa päivässä","1x3","kolmesti päivässä"];
                //arpa = arvoN(antoMahdollisuudet.length) - 1;
                //kysymys.antoAjanKohta = antoMahdollisuudet[arpa];
                var laakeMahdollisuudet = [100,200,300,400];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                //arpa = arvoN(5)*2 + 6;
                arpa = Math.round(Math.random() * 7 + 1) * 7;
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
            }
            else if( arpa === 7) {
                kysymys.laakeKerroin = arvoN(2) + 1;
                kysymys.paivaKerroin = arvoN(2) + 1;
                //var antoMahdollisuudet = ["kolme kertaa päivässä","1x3","kolmesti päivässä"];
                //arpa = arvoN(antoMahdollisuudet.length) - 1;
                //kysymys.antoAjanKohta = antoMahdollisuudet[arpa];
                var laakeMahdollisuudet = [10,20,30,50];
                arpa = arvoN(laakeMahdollisuudet.length) - 1;
                kysymys.tabletinVahvuus = laakeMahdollisuudet[arpa];
                arpa = arvoN(5)*2 + 6;
                kysymys.tablettienKplNumeroina = kysymys.laakeKerroin * kysymys.paivaKerroin * arpa;
            }

            else{
                console.warn("Arpa saavutti kielletyn arvon:"+arpa);
            }

            // arvotaav sopiva teksti, päivässä, aamuin illoin, 1x2 jne
            arpa = arvoN(antoMahdollisuudet[kysymys.paivaKerroin].length) - 1;
            // asetetaan se
            kysymys.antoAjanKohta = antoMahdollisuudet[kysymys.paivaKerroin][arpa];

                
            if(varmistin > 50){
                return null;
            }
                varmistin++;
                console.log("Uusi:"+kysymys.vastaus())
                console.log("Vanha:"+edellinenVastaus)
        } while( kysymys.vastaus() === edellinenVastaus ) // jos tämä totta,niin mennään takaisin ylös 
        
        if( kysymys.potilaanNimiEnsin){
            kysymys.kysymysTeksti = this.kysymys.kenelle + " on määrätty lääkettä " + 
                                    this.kysymys.maarattyAnnos() + " mg " + 
                                    this.kysymys.antoAjanKohta + ". Tabletin vahvuus on " + 
                                    this.kysymys.tabletinVahvuus + " mg ja niitä on määrätty " +
                                    this.kysymys.tablettienKplRoomalaisilla() + ". " +
                                    "<br />" + " Kuinka monta päivää kuuri kestää?";
        }
        else{
            kysymys.kysymysTeksti = "Tabletin vahvuus on " + this.kysymys.tabletinVahvuus + 
                                    " mg ja niitä on määrätty " + this.kysymys.tablettienKplRoomalaisilla() + 
                                    ". " + this.kysymys.kenelle + " on määrätty lääkettä " + 
                                    this.kysymys.maarattyAnnos() + " mg " + 
                                    this.kysymys.antoAjanKohta + "." + 
                                    "<br />" + " Kuinka monta päivää kuuri kestää?";
        }      
     //   return kysymys;
    
    }    

    window.Kysymys.resepti = Kysymys;    
    console.log("Lisätään resepti");//+window.Kysymys.roomalaiset)

function arvoN(max){
    return Math.ceil(Math.random() * max);
}             

function muunnaDesimaaleiksi(arvo){
        
     var roomalaiset =[["","I","II","III","IV","V","VI","VII","VIII","IX"],               ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]
]; 
        
        
        var lukuTekstina = String(arvo);
  //      console.warn(lukuTekstina);
    var lukuTekstinaKaannettyna = lukuTekstina.reverse();
        var indexit = [];
        var indexit2 = []
        for(var i = 0; i < lukuTekstina.length; i++)
        {
indexit.push(lukuTekstinaKaannettyna[i]);
            indexit2.unshift(lukuTekstinaKaannettyna[i]);
    //        console.log(roomalaiset[i][lukuTekstinaKaannettyna[i]]);
      //      console.info(indexit.length);
        //     "14"
            
        }
        var valmis = "";
        var valmis2 = "";
        for(var i = 0; i < indexit.length;i++)
        {
            valmis = roomalaiset[i][indexit[i]] + valmis;
            //valmis
//            console.log($scope.roomalaiset[i][indexit[i]]);
        }
//        console.log(valmis);
        return {tulos:valmis,komponentit:indexit};
    };  // muunnaDesimmaleiksi-funktio loppuu
   
}(window));
