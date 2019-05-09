
var sign = {

    clickX : new Array(),
    clickY : new Array(),
    clickDrag : new Array(),
    paint : "",
  
  
    init : function() {
      this.addClick();
      this.draw();
      this.mouseDown();
      this.mouseUp();
      this.mouseMove();
      this.events();
  
      var self = this;
  
      document.getElementById("clear").addEventListener("click", function(){
        self.clear();
      });
  
      document.getElementById("annuler").addEventListener("click", function(){
        self.clear();
      });
    },
  
    draw : function() {
      this.canvas = document.getElementById("sign");
      this.ctx = this.canvas.getContext("2d");
  
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
  
      this.ctx.strokeStyle = "#FFFFFF"; // couleur tracé
      this.ctx.lineJoin = "round"; // forme tracé
      this.ctx.lineWidth = 4; // taille tracé
  
      for (var i = 0; i < this.clickX.length; i++) {
        this.ctx.beginPath(); //create a path
        if (this.clickDrag[i] && i) {
          this.ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]); //move to
        } else {
          this.ctx.moveTo(this.clickX[i] - 1, this.clickY[i]); //move to
        }
  
        //draw a line
        this.ctx.lineTo(this.clickX[i], this.clickY[i]); 
        //filled with "ink"            
        this.ctx.stroke();
        //close path                               
        this.ctx.closePath();                              
      }
    },
  
    addClick : function(x, y, drag) {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(drag);
    },
  
    mouseDown : function(e) { 
      document.getElementById("sign").addEventListener("mousedown", function(e) {
        // récupération des coordonnées
        this.mouseX = e.pageX - this.offsetLeft; 
        this.mouseY = e.pageY - this.offsetTop;
  
        this.paint = true;
        sign.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        sign.draw();
      });
    },
  
    mouseUp : function() {
      $("#sign").mouseup(function() {
        this.paint = false;
      });
    },
  
    mouseMove : function(e) {
      if (this.paint) {
        sign.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        sign.draw();
      }
    },
  
    clear : function() {
      this.clickX = new Array();
      this.clickY = new Array();
      this.clickDrag = new Array();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  
    events : function() {
      // For desktop
      this.canvas.addEventListener("mousedown", this.mouseDown, false);
      this.canvas.addEventListener("mousemove", this.mouseMove, false);
      document.body.addEventListener("mouseup", this.mouseUp, false);
                  
      // For mobile
      this.canvas.addEventListener("touchstart", this.mouseDown, false);
      this.canvas.addEventListener("touchmove", this.mouseMove, true);
      this.canvas.addEventListener("touchend", this.mouseUp, false);
      document.body.addEventListener("touchcancel", this.mouseUp, false);
    },
  
  
  }
  