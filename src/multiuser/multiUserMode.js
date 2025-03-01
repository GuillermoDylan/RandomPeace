class MultiUser extends BaseMode {

    constructor() {
        super();
        this.webSocket;
        this.sentJSON = false;
        this.usersPositions = [];
        this.numberOfUsers = 0;
        this.loadingScreen;
        this.alphaV = 0;
    }

    setup() {
        createCanvas(windowWidth, windowHeight);
        this.MAX_SOLDIERS = new FigureUtil().getMaxSoldiersForMultiuser();
        this.loadingScreen = new LoadingScreen();
        this.soldiers = [];
        this.flowerThrowers = [];
        for (var i = 0; i < 50; i++) {
            this.flowerThrowers[i] = imageFactory.getFlowerThrower();
        }

        this.webSocket = new WebSocketAdapter()
    }

    draw() {
        background(255);

        // En caso de que la sesión esté llena o de que el servidor esté inactivo
        if (!this.webSocket.wasConnectionSuccesfull()) {
            this.soldiers = [1]; // Para evitar que salga el texto de hacer click
            textSize(40);
            text("  No se pudo conectar con el servidor\nPor favor vuelve a intentarlo más tarde",
                windowWidth / 2 - 400, windowHeight / 2);
            return;
        }

        // Manejo de mensajes de WebSocket
        this.webSocket.getSocket().onmessage = (event) => {
            var data = JSON.parse(event.data)
            // data contiene los arrays de cada jugador, solo tenemos que mostrarlos en pantalla
            if (typeof (data) === "number") {
                this.numberOfUsers = data
            } else {
                this.usersPositions = data
                this.numberOfUsers = data.length
            };
        };

        for (var i = 0; i < this.soldiers.length; i++) {
            image(this.flowerThrowers[i], this.soldiers[i].x, this.soldiers[i].y, this.soldiers[i].width, this.soldiers[i].height);
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
            for (var i = 0; i < this.soldiers.length; i++) {
                if (this.soldiers[i].x != undefined)
                    tupleArray.push([Math.trunc(this.soldiers[i].x), Math.trunc(this.soldiers[i].y)])
            }
            var json = JSON.stringify({
                positions: tupleArray
            })

            // Mandamos el mensaje al websocket
            this.webSocket.sendMessage(json)

            // Marcamos como enviado
            this.sentJSON = true
        }

        if (this.alphaV >= 254 && this.userPlaced && this.sentJSON && this.usersPositions.length > 0) {
            // Primer nivel: usuarios
            for (var i = 0; i < this.usersPositions.length; i++) {
                // Segundo nivel: figuras del usuario
                for (var j = 0; j < this.usersPositions[i].length; j++) {
                    // Tercer nivel: posición x e y de cada figura
                    var figure = new FigureUtil().reescalar(this.usersPositions[i][j][0], this.usersPositions[i][j][1], this.flowerThrowers)
                    image(this.flowerThrowers[i], figure.x, figure.y, figure.width, figure.height);
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
                this.loadingScreen.draw(imageFactory, this.numberOfUsers);
                textSize(100);
                fill(0);
                text(this.numberOfUsers + "/4", windowWidth - 250, 80);
                if (this.alphaV < 255) {
                    this.alphaV = this.alphaV + 1;
                }
            }
        }

    }

    mouseClicked() {
        if (this.userPlaced || !this.webSocket.wasConnectionSuccesfull()) {
            return;
        }
        this.addSoldier(mouseX, mouseY);
    }

    touchStarted() {
        if (this.userPlaced || !this.webSocket.wasConnectionSuccesfull()) {
            return;
        }
        this.addSoldier(mouseX, mouseY);
    }

    addSoldier(x, y) {
        var positioner = new FigureUtil();

        // Ese true del final indica que puede colocar las figuras encima de donde estaría
        // el texto del modo "base"
        this.soldiers.push(positioner.createNewFigure(x, y, this.flowerThrowers, true));
        console.log("new Soldier added");
    }

    displayInfo(){
        var modal = document.getElementById("modalMultiUser");
        var span = document.getElementsByClassName("close")[1];
        
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