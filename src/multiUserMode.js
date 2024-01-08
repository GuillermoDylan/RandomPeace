"use strict";
var num = 0;
class MultiUser {

    constructor() {
        this.rp;
        this.imageFactory;
        this.userPlaced = false;
        this.flowerThrowers;
        this.webSocket;
        this.sentJSON = false;
        this.usersPositions = [];
        this.numberOfUsers = 0;
        this.loadingScreen;
        this.alphaV = 0;
    }

    preload() {
        this.imageFactory = new ImageFactory();
        this.loadingScreen = new LoadingScreen();
    }

    setup() {
        createCanvas(screen.width, screen.height);
        this.soldiers = [50];
        this.flowerThrowers = [50];
        for (var i = 0; i < 50; i++) {
            this.flowerThrowers[i] = this.imageFactory.getFlowerThrower();
        }

        this.webSocket = new WebSocketAdapter()
    }

    draw() {
        background(255);
        if (!this.webSocket.wasConnectionSuccesfull()) {
            text("La sesión está llena, por favor vuelve a intentarlo más tarde", windowWidth / 2, windowHeight / 2);
            return;
        }

        // Manejo de mensajes de WebSocket
        this.webSocket.getSocket().onmessage = (event) => {
            var data = JSON.parse(event.data)
            console.log(data)
            console.log(typeof (data))
            // data contiene los arrays de cada jugador, solo tenemos que mostrarlos en pantalla
            if (typeof (data) === "number") {
                console.log("entra")
                this.numberOfUsers = data
                num = data;
            }else {
                this.usersPositions = data
                this.numberOfUsers = data.length
            };;
       };

        for (var i = 0; i < this.soldiers.length; i++) {
            image(this.flowerThrowers[i], this.soldiers[i].x, this.soldiers[i].y, 60, 70);
        }

        // Luego habría que cambiarlo, es de prueba
        if (this.soldiers.length >= 5) {
            this.userPlaced = true;
        }

        // Cuando el usuario ya colocó todas sus piezas, esperamos a el resto de usuarios
        if (this.userPlaced && !this.sentJSON) {
            // Creamos el json con las posiciones del usuario
            // CUIDADO: este solo se envía una sola vez
            var tupleArray = []
            //json = "{\n\"positions\":[\n"
            for (var i = 0; i < this.soldiers.length; i++) {
                if (this.soldiers[i].x != undefined)
                    //json += "[" + soldiers[i].x + "," + soldiers[i].y + "],\n"
                    tupleArray.push([this.soldiers[i].x, this.soldiers[i].y])
            }
            //json += "\n]\n}"
            var json = JSON.stringify({
                positions: tupleArray
            })

            // Mandamos el mensaje al websocket
            this.webSocket.sendMessage(json)

            // Marcamos como enviado
            this.sentJSON = true
        }

        if (this.alphaV >= 255 && this.userPlaced && this.sentJSON && this.usersPositions.length > 0) {
            // Primer nivel: usuarios
            for (var i = 0; i < this.usersPositions.length; i++) {
                // Segundo nivel: figuras del usuario
                for (var j = 0; j < this.usersPositions[i].length; j++) {
                    // Tercer nivel: posición x e y de cada figura
                    image(this.flowerThrowers[i], this.usersPositions[i][j][0], this.usersPositions[i][j][1], 60, 70);
                }
            }
        }

        // Mostramos la pantalla de "carga" mientras que el usuario ya haya colocado y falten jugadores
        // Importante hacerlo al final, así no interferimos en el "dibujado" del resto de figuras
        if (this.userPlaced && this.numberOfUsers > 0 && this.numberOfUsers <= 4) {
            if (!this.loadingScreen.isFinished()) {
                if (this.alphaV == 255) {
                    background(255);
                }
                else {
                    background(255, 255, 255, this.alphaV);
                }
                this.loadingScreen.draw(this.imageFactory, this.numberOfUsers);
                textSize(100);
                fill(0);
                text(this.numberOfUsers + "/4", 10, 100);
                if (this.alphaV < 255) {
                    this.alphaV = this.alphaV + 1;
                }
            }
        }

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
        this.soldiers.push(new Soldier(x, y, "red"));
    }

}