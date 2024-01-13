var isPaused = false;
class AutomataMode extends BaseMode {

    constructor() {
        super();
        this.array;
        this.cellAuto;
        this.iteration = 0;
        this.iterationModifier = 0;
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
    }

    draw() {
        background(255);

        imageMode(CENTER);

        if (this.soldiers.length == 0) {
            //Texto descriptivo
            textSize(25);
            text("Pulsa cualquier tecla para pausar", windowWidth / 2 - 200, windowHeight / 2 + 50)
        }

        // Controlador de pausa y iteriaciones del automata
        if (isPaused) {
            textSize(50);
            if(this.iteration >= (this.iterationModifier + 1) * 1000) {
                this.iterationModifier = this.iteration / 100 + 100;
            }
            text("Iteración: " + this.iteration, windowWidth - 400 - (this.iterationModifier), 100);
            rect(windowWidth - 190, 120, 40, 110);
            rect(windowWidth - 130, 120, 40, 110);
        }

        for (var i = 0; i < this.soldiers.length; i++) {
            if (this.soldiers[i] != null || this.soldiers[i] != undefined) {
                image(this.flowerThrowers[i], this.soldiers[i].x, this.soldiers[i].y, this.soldiers[i].width, this.soldiers[i].height);
            }
        }

        if (this.soldiers.length >= this.MAX_SOLDIERS) {
            this.userPlaced = true;
        }

        // Automata celular
        if (this.userPlaced && !isPaused) {
            if (this.cellAuto === undefined || this.cellAuto === null) {
                this.cellAuto = new CellAuto(this.soldiers);
            }
            this.soldiers = this.cellAuto.computeIteration(performance.now(), this.flowerThrowers);
            this.iteration++;
        }
    }

    windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    displayInfo(){
        var modal = document.getElementById("modalAutomata");
        var span = document.getElementsByClassName("close")[2];
        
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

function keyPressed() {
    isPaused = !isPaused;
}