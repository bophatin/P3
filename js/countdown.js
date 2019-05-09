
var Countdown = {

	init : function() {
		this.decompte();
	},

	decompte : function() {

			var countdownResa = sessionStorage.getItem("dateBook");
			var dateObject = new Date(countdownResa);

			var decompte = setInterval(function() {

				var timeNow = new Date(); 
				var diffTime = timeNow - Number(countdownResa);

				var compteur = Math.floor(((20 * 60 * 1000) - diffTime) / 1000 ); 

				var minutes = Math.floor(compteur / 60);
				var secondes = compteur % 60; 

				// Affichage en front
				$("#countdown").html(minutes + " min et " + secondes + " sec");
				
				if (minutes === 0 && secondes === 0) {
					clearInterval(decompte);
					sessionStorage.clear();
					$(".nomStation").html("La réservation a expiré !");  
				}

			}, 0);



		// EVENEMENT CLICK BOUTON ANNULER = STOP DECOMPTE
		document.getElementById("annuler").addEventListener("click", function() {
			clearInterval(decompte);
		});
	}

}