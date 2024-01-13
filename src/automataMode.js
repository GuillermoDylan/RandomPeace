var isPaused = false;
class AutomataMode extends BaseMode {

    constructor() {
        super();
        this.array;
        this.cellAuto;
        this.iteration = 0;
    }

    setup() {
        super.setup();
        this.MAX_SOLDIERS = new FigureUtil().getMaxSoldiers();
        createCanvas(screen.width, screen.height);
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
            text("Iteración: " + this.iteration, windowWidth - 400, 50);
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

}

function keyPressed() {
    isPaused = !isPaused;
}