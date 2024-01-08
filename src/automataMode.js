class AutomataMode {

    constructor(array, flowerThrowers) {
        this.array = array;
        this.flowerThrowers = flowerThrowers;
        this.cellAuto = new CellAuto(array);
        this.iteration = 0;
    }

    setup(){
        createCanvas(screen.width, screen.height);
    }

    async draw(){

        this.array = this.cellAuto.computeIteration();

        for (var i = 0;i < this.array.length; i++) {
            image(this.flowerThrowers[i], this.array[i].x, this.array[i].y, 60, 70); 
        }
        
        // sleep en Javascript...
        //await new Promise(r => setTimeout(r, 5000));
        //console.log("Iteration: " + this.iteration)
        this.iteration++;
    }

}