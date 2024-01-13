class FigureUtil {
    constructor() {
        if (FigureUtil.instance) {
            return FigureUtil.instance;
        }
        FigureUtil.instance = this;
        this.X_BOUND_LEFT = 500;
        this.X_BOUND_RIGHT = 1400;
        this.Y_BOUND_DOWN = 230;
        this.Y_BOUND_UP = 0;
        this.SOLDIER_RANDOM_RANGE = 150;
    }

    getMaxSoldiers(max) {
        // max || 25 siginifica que 
        // si no se le pasa el parámetro max, se le asigna 25 por "defecto"
        var MAX_SOLDIERS = map(windowWidth, 300, 1920, 5, max || 25);
        MAX_SOLDIERS = int(MAX_SOLDIERS / 5) * 5;
        return MAX_SOLDIERS;
    }

    getMaxSoldiersForMultiuser() {
        return this.getMaxSoldiers(15);
    }

    /**
     * Genera una figura nueva con poisicones aleatorias relativas a las originales
     * @param {Number} x posicion x original
     * @param {Number} y posicion y original
     * @param {Array} flowerThrowers array de imagenes para escalar el tamaño
     * @param {Boolean} multiUserEnabled si es modo multiusuario o no
     */
    createNewFigure(x, y, flowerThrowers, multiUserEnabled) {
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        x = x + random(-this.SOLDIER_RANDOM_RANGE, this.SOLDIER_RANDOM_RANGE);
        y = y + random(-this.SOLDIER_RANDOM_RANGE, this.SOLDIER_RANDOM_RANGE);

        if (!multiUserEnabled) {
            while (y <= this.Y_BOUND_DOWN && x >= this.X_BOUND_LEFT && this.X_BOUND_RIGHT <= 1400 || y < this.Y_BOUND_UP) {
                y = y + random(-this.SOLDIER_RANDOM_RANGE, this.SOLDIER_RANDOM_RANGE);
            }
        }

        // si el soldado aparece arriba del todo se pintara con 0.8 veces su tamaño 0.04
        // si el soldado aparece abajo del todo se pintara con 0.4 veces su tamaño 0.12
        let sizeFactor = map(y, 0, height, 0.08, 0.4);
        let soldierWidth = flowerThrowers[0].width * sizeFactor;
        let soldierHeight = flowerThrowers[0].height * sizeFactor;
        let rotation = random(TWO_PI);

        return new Soldier(x, y, "red", soldierWidth, soldierHeight, rotation);
    }


    reescalar(x, y, flowerThrowers) {
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        // si el soldado aparece arriba del todo se pintara con 0.8 veces su tamaño 0.04
        // si el soldado aparece abajo del todo se pintara con 0.4 veces su tamaño 0.12
        let sizeFactor = map(y, 0, height, 0.08, 0.4);
        let soldierWidth = flowerThrowers[0].width * sizeFactor;
        let soldierHeight = flowerThrowers[0].height * sizeFactor;
        let rotation = random(TWO_PI);
        return new Soldier(x, y, "red", soldierWidth, soldierHeight, rotation);
    }
}