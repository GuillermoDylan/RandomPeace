var j = 0;
class AutomataMode extends BaseMode {

    constructor() {
        super();
        this.array;
        this.flowerThrowers;
        this.cellAuto;
        this.iteration = 0;
    }

    preload() {
    }

    setup() {
        super.setup();
        createCanvas(screen.width, screen.height);
    }

    async draw() {
        background(255);

        imageMode(CENTER);

        for (var i = 0; i < this.soldiers.length; i++) {
            if (this.soldiers[i] != null || this.soldiers[i] != undefined) {
                image(this.flowerThrowers[i], this.soldiers[i].x, this.soldiers[i].y, this.soldiers[i].width, this.soldiers[i].height);
            }
        }

        if (this.soldiers.length >= this.MAX_SOLDIERS) {
            this.userPlaced = true;
        }

        // Automata celular
        if (this.userPlaced) {
            if (this.cellAuto === undefined || this.cellAuto === null) {
                this.cellAuto = new CellAuto(this.soldiers);
            }
            this.soldiers = this.cellAuto.computeIteration(performance.now(), this.flowerThrowers);
            this.iteration++;
        }
    }

}