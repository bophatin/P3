                          
var Booking = {

    content : $("#content"),

    init : function() {
        var self = this;

        document.getElementById("valider").addEventListener("click", function() {
            self.showCanvas();
        });

        document.getElementById("butt-book").addEventListener("click", function() {
            self.drawCanvas();
        });

        document.getElementById("annuler").addEventListener("click", function() {
            self.cancel();
        });

        this.refresh();
    },

    storage : function() {
        this.dateBook = new Date().getTime();
        this.nameBook = $(".name").text();
        this.adressBook = $(".address").text();

        // Sauvegarde data
        sessionStorage.setItem("dateBook", this.dateBook); 
        sessionStorage.setItem("nameBook", this.nameBook);
        sessionStorage.setItem("adressBook", this.adressBook);

        // Récupération datas
        this.dataHeure = sessionStorage.getItem("dateBook");
        this.dataName = sessionStorage.getItem("nameBook");
        this.dataAddress = sessionStorage.getItem("adressBook");
    },

    showCanvas : function() {
        this.availableBikes = $(".available_bikes").text();
        this.statusStation = $(".status").text();

        if (this.availableBikes >= 1 && this.statusStation === "OPEN") { 
            $("#container-canvas").css("display", "block");
            sign.init();
        } else {
            $("#container-canvas").css("display", "none");
            alert("Sorry, il n'y a pas de vélo disponibe");
        }
    },

    refresh : function() {
        if (sessionStorage.length >= 1) {
            this.dataName = sessionStorage.getItem("nameBook");
            this.dataAddress = sessionStorage.getItem("adressBook");
            this.dataHeure = sessionStorage.getItem("dateBook");
            $(".nomStation").html(this.dataName);
            $(".nomAdresse").html(this.dataAddress);
            $("#countdown").html(Countdown.init());
        }
    },

    drawCanvas : function() {
        var canv = $("#sign");

        if (canv.length >= 1) {
            this.storage();
            $(".nomStation").html(this.dataName);
            $(".nomAdresse").html(this.dataAddress);
            $("#countdown").html(Countdown.init());
        } else {
            alert("Vous devez d'abord signer avant de réserver votre vélo");
        }
    },

    cancel : function() {
        sessionStorage.clear(); // Suppression datas
        $(".nomStation").html("Annulé");
        $(".nomAdresse").html("Annulé");
        $("#countdown").html("Annulé");
        this.content.css("display", "none");
        $("#container-canvas").css("display", "none");
        console.log("RÉSA ANNULÉE");
    }

}

