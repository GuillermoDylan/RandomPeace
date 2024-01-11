/**
 * Recive una imagen y la coloca en una posición aleatoria de la pantalla
 */
class RandomPlacer {

    /**
     * Importante: la imagen ya debe estar cargada
     * @param {Image} image
     * @param {BaseMode} baseMode El propio contexto de la applicación
     */
    constructor(image, baseMode) {
        this.x = 0;
        this.y = 0;
        this.img = image;
        this.width = 0;
        this.height = 0;
        this.list = [];
        this.baseMode = baseMode;
    }

    /**
     * Genera la posición aleatoria para la imagen
     * Importante ejecutar este método antes que draw()
     * @param {number} width 
     * @param {number} height 
     */
    place(width, height, i) {
        if (this.list[i] == undefined) {
            let x = Math.floor(Math.random() * ((width - 50) - 100)) + 100;
            let y = Math.floor(Math.random() * ((height - 50) - 100)) + 100;
            while (y <= this.baseMode.Y_BOUND_DOWN && x >= this.baseMode.X_BOUND_LEFT && this.baseMode.X_BOUND_RIGHT <= 1400 || y < this.baseMode.Y_BOUND_UP) {
                x = Math.floor(Math.random() * ((width - 50) - 100)) + 100;
                y = Math.floor(Math.random() * ((height - 50) - 100)) + 100;
            }
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
     * @param {Number} la posición en el array a dibujar
     */
    draw(i) {
        // si el soldado aparece arriba del todo se pintara con 0.8 veces su tamaño
        // si el soldado aparece abajo del todo se pintara con 0.4 veces su tamaño
        let sizeFactor = map(this.list[i][1], 0, windowHeight, 0.08, 0.4);
        let soldierWidth = this.img.width * sizeFactor;
        let soldierHeight = this.img.height * sizeFactor;
        // Because the x-axis is reversed, we need to draw at different x position.        
        return [-this.list[i][0], this.list[i][1], soldierWidth, soldierHeight];
    }

    /**
     * Mantiene la relación de aspecto de la imagen en función de la anchura
     * @param {number} displayWidth 
     * @returns 
     */
    aspectRatioWidth(displayWidth) {
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
    aspectRatioHeight(finalHeight, finalWidth, displayHeight) {
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