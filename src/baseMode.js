"use strict";
class BaseMode {

    constructor() {
        this.rp;
        this.imageFactory;
        this.userPlaced = false;
        this.flowerThrowers;
    }

    preload() {
        this.imageFactory = new ImageFactory();
    }

    setup() {
        createCanvas(windowWidth, windowHeight);
        // ajusta automáticamente el número de soldados a colocar en función del ancho de la pantalla
        this.MAX_SOLDIERS = map(windowWidth, 300, 1920, 5, 25);
        this.MAX_SOLDIERS = int(this.MAX_SOLDIERS / 5) * 5;

        this.SOLDIER_RANDOM_RANGE = 150;
        this.soldiers = []; // Aquí no hace falta establecer el tamaño por ser unidimensionales, además
        // si lo añadiesemos se nos añadiría dentro un "soldado" nuevo automáticamente
        this.flowerThrowers = [];
        for (var i = 0; i < 50; i++) {
            this.flowerThrowers[i] = this.imageFactory.getFlowerThrower();
        }
        // TODO habría que cambiarlo, es de prueba
        this.rp = new RandomPlacer(this.flowerThrowers[0]);
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
        if (this.soldiers.length > this.MAX_SOLDIERS) {
            console.log("Max soldiers reached");
            return;
        }
        // circunferencia de radio 150 con centro en x,y
        x = x + random(-this.SOLDIER_RANDOM_RANGE, this.SOLDIER_RANDOM_RANGE);
        y = y + random(-this.SOLDIER_RANDOM_RANGE, this.SOLDIER_RANDOM_RANGE);

        // si el soldado aparece arriba del todo se pintara con 0.8 veces su tamaño 0.04
        // si el soldado aparece abajo del todo se pintara con 0.4 veces su tamaño 0.12
        let sizeFactor = map(y, 0, height, 0.08, 0.4);
        let soldierWidth = this.flowerThrowers[0].width * sizeFactor;
        let soldierHeight = this.flowerThrowers[0].height * sizeFactor;

        let rotation = random(TWO_PI);

        this.soldiers.push(new Soldier(x, y, "red", soldierWidth, soldierHeight, rotation));
        console.log("new Soldier added");
    }

}