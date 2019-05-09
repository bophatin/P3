

var Map = {

    stations : [],
    marker : [],

    init : function() {
        this.afficherMap();
        this.appelJCD(this);
    },
    
    afficherMap : function() {
        this.gmap = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: {lat: 45.764043, lng: 4.835659}
        }); 
    },
    
    appelJCD : function(self) {
        
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=2148612858eebd36c4e8677d32f641d4b84d2c7d", function (data) {

            this.stations = JSON.parse(data); // Transforme la chaîne de caractères JSON en objet JavaScript
            console.log(JSON.parse(data)); 
        
            this.stations.forEach(function(station) {

                // CRÉATION DES MARKERS
                var marker = new google.maps.Marker({
                    name : station.name,
                    address : station.address,
                    position : station.position,
                    status : station.status,
                    available_bikes : station.available_bikes,
                    available_bike_stands : station.available_bike_stands,
                    map : self.gmap,
                });

                // ECOUTE EVENEMENT CLICK MARKER
                marker.addListener("click", function(){ // l'event click sur un marker fait apparaître la fenêtre d'info station
                    console.log(marker);
                    var content = $("#content"); // cible le conteneur d'infos
                    content.css("display", "block"); // le bloc d'infos est visible

                    // Affichage des données en front
                    name = $(".name");
                    $(".name").html(station.name);

                    address = $(".address");
                    $(".address").html(station.address);

                    status = $(".status");
                    $(".status").html(station.status);

                    available_bikes = $(".available_bikes");
                    $(".available_bikes").html(station.available_bikes);

                    available_bike_stands = $(".available_bike_stands");
                    $(".available_bike_stands").html(station.available_bike_stands);
                });
            });
        });
    },




    
}








    