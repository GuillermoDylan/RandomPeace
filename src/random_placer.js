/**
 * Recive una imagen y la coloca en una posición aleatoria de la pantalla
 */
class RandomPlacer {
    
    /**
     * Importante: la imagen ya debe estar cargada
     * @param {Image} image 
     */
    constructor(image, maxPlaced = 50) {
        this.x = 0;
        this.y = 0;
        this.img = image;
        this.width = 0;
        this.height = 0;
        this.list = [];
    }

    /**
     * Genera la posición aleatoria para la imagen
     * Importante ejecutar este método antes que draw()
     * @param {number} width 
     * @param {number} height 
     */
    place(width, height, i) {
        if(this.list[i] == undefined){
            let x = Math.floor(Math.random() * ((width - 50) - 100)) + 100;
            let y = Math.floor(Math.random() * ((height - 50) - 100)) + 100;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.list[i] = [x, y];
        }
    }

    /**
     * Dibuja la imagen en la posición aleatoria
     * Importante ejecutar este método después de place()
     */
    draw(i) {
        var array = this.aspectRatioWidth(60);
        var finalWidth = array[0];
        var finalHeight = array[1];
        var array = this.aspectRatioHeight(70,finalWidth, this.height);
        var finalWidth = array[0];
        var finalHeight = array[1];
        // Because the x-axis is reversed, we need to draw at different x position.
        return [-this.list[i][0], this.list[i][1], finalWidth, finalHeight];
    }

    /**
     * Mantiene la relación de aspecto de la imagen en función de la anchura
     * @param {number} displayWidth 
     * @returns 
     */
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
      
    /**
     * Mantiene la relación de aspecto de la imagen en función de la altura
     * @param {number} finalHeight 
     * @param {number} finalWidth 
     * @param {number} displayHeight 
     * @returns 
     */
    aspectRatioHeight(finalHeight, finalWidth, displayHeight){
        // Después de aplicar el escalado de anchura, commprobamos la altura
        var finalWidth = finalWidth;
        if (finalHeight > displayHeight) {
            // La escalamos si hace falta
            finalHeight = displayHeight;
            // Reescalamos la anchura si hace falta también
            finalWidth = (finalHeight * this.img.width) / this.img.height;
        }
        return [finalHeight, finalWidth];
    }
      

}