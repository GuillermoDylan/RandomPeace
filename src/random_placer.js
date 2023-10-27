class RandomPlacer {
    
    constructor(maxPlacements) {
        this.x = 0;
        this.y = 0;
        this.list = [maxPlacements];
        /** 
        for(i = 0; i < maxPlacements; i++) {
            this.list[i] =  0; // TODO añadir aquí los "soldados"
        }
        **/
        this.img = loadImage("img/flower_thrower.svg");
        this.width = 0;
        this.height = 0;
    }

    place(width, height) {
        let x = Math.floor(Math.random() * ((width - 50) - 100)) + 100;
        let y = Math.floor(Math.random() * ((height - 50) - 100)) + 100;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        var array = this.aspectRatioWidth(60);
        var finalWidth = array[0];
        var finalHeight = array[1];
        var array = this.aspectRatioHeight(70, this.height);
        var finalWidth = array[0];
        var finalHeight = array[1];
        this.img.resize(finalWidth, finalHeight);
        imageMode(CENTER);
        image(this.img, this.x, this.y);
        console.log(finalWidth);
        console.log(finalHeight);
    }

    aspectRatioWidth(displayWidth){
        // Primero comprobar si hay que escalar la anchura
        var finalWidth = this.img.width;
        var finalHeight = this.img.height;
        if (this.img.width > displayWidth) {
            // La escalamos
            finalWidth = displayWidth;
            //Escalamos la altura
            finalHeight = (finalWidth * this.img.height) / this.img.width;
        }
        return [finalHeight, finalWidth];
    }
      
    aspectRatioHeight(finalHeight, displayHeight){
        // Después de aplicar el escalado de anchura, commprobamos la altura
        var finalWidth = 0;
        if (finalHeight > displayHeight) {
            // La escalamos si hace falta
            finalHeight = displayHeight;
            // Reescalamos la anchura si hace falta también
            finalWidth = (finalHeight * this.img.width) / this.img.height;
        }
        return [finalHeight, finalWidth];
    }
      

}