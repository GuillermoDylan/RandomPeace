"use strict";
class BaseMode {

    constructor() {
        this.rp;
        this.userPlaced = false;
        this.flowerThrowers;
        this.textGenerator;
    }


    setup() {
        createCanvas(windowWidth, windowHeight);
        // ajusta automáticamente el número de soldados a colocar en función del ancho de la pantalla
        this.MAX_SOLDIERS = new FigureUtil().getMaxSoldiers();

        this.SOLDIER_RANDOM_RANGE = 150;
        this.soldiers = []; // Aquí no hace falta establecer el tamaño por ser unidimensionales, además
        // si lo añadiesemos se nos añadiría dentro un "soldado" nuevo automáticamente
        this.flowerThrowers = [];
        for (var i = 0; i < 50; i++) {
            this.flowerThrowers[i] = imageFactory.getFlowerThrower();
        }

        // Posicionador aleatorio para la "IA"
        this.rp = new RandomPlacer(this.flowerThrowers[0]);

        this.textGenerator = new TextGenerator(50);
        // Generamos las flores
        this.textGenerator.generateText();
    }

    draw() {
        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        background(255);

        imageMode(CENTER);

        for (var i = 0; i < this.soldiers.length; i++) {
            image(this.flowerThrowers[i], this.soldiers[i].x, this.soldiers[i].y, this.soldiers[i].width, this.soldiers[i].height);
        }

        if (this.soldiers.length >= this.MAX_SOLDIERS) {
            this.userPlaced = true;
        }

        // Posiciones de "IA"
        if (this.userPlaced) {
            for (var i = 0; i < this.soldiers.length; i++) {
                // Generamos la posición aleatoria
                this.rp.place(width, height, i);
                // Obtenemos sus coordenadas y tamaño
                var coords = this.rp.draw(i);
                push();
                // Scale -1, 1 means reverse the x axis, keep y the same.
                scale(-1, 1);
                // Because the x-axis is reversed, we need to draw at different x position.
                image(this.flowerThrowers[i], coords[0], coords[1], coords[2], coords[3]);
                pop();
            }
            // Colocamos el texto de las flores
            this.textGenerator.draw(this.soldiers);
        }

    }

    windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    mouseClicked() {
        if (this.userPlaced) {
            return;
        }
        this.addSoldier(mouseX, mouseY);
    }

    touchStarted() {
        if (this.userPlaced) {
            return;
        }
        this.addSoldier(mouseX, mouseY);
    }

    addSoldier(x, y) {
        var positioner = new FigureUtil();

        this.soldiers.push(positioner.createNewFigure(x, y, this.flowerThrowers));
        console.log("new Soldier added");
    }

    displayInfo(){
        var modal = document.getElementById("modalBaseMode");
        var span = document.getElementsByClassName("close")[0];
        
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }
          
          // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

}