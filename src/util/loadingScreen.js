class LoadingScreen {

    constructor() {
        this.fadeInFirst = 0;
        this.fadeInSecond = 0;
        this.fadeInThird = 0;
        this.fadeInLast = 0;
        this.startMS = 0;
    }

    draw(imgFactory, numberOfUsers) {
        // Dibujamos el circulo de carga (Simbolo de la paz)
        let spinnerSpeed = 0.0035; // Adjust the speed as needed
        // Calculate the rotation angle
        let rotationAngle = frameCount * spinnerSpeed * TWO_PI;
        // Save the initial transformation state
        push();
        tint(255, this.fadeInFirst);
        // Translate to the mouse position
        translate(width / 2, (height / 2) - 200);
        // Apply rotation
        rotate(rotationAngle);
        // Get the image and its dimensions
        let loadingSymbol = imgFactory.getLoadingPeaceSymbol();
        // Set the image mode to center
        imageMode(CENTER);
        // Display the image with scaled dimensions
        image(loadingSymbol, 0, 0, 300, 300);
        // Restore the initial transformation state
        pop();


        // Incrementamos el fade in de las dos primeras imagenes condicionalmente
        this.fadeInFirst = this.fadeInFirst < 255 ? this.fadeInFirst + 1 : 255;

        push();
        translate(width / 2, (height / 2) - 200);
        // Y al primer usuario (Siempre habrá mínimo 1)
        var imageSoldierLeft = imgFactory.getPeaceSoldierRight();
        var rescaledSize = this.rescale(imageSoldierLeft, 500);
        image(imageSoldierLeft, -40, 70, rescaledSize[0], rescaledSize[1]);

        // Si hay 2 jugadores, dibujamos el segundo
        if (numberOfUsers >= 2) {
            tint(255, this.fadeInSecond);
            var imageSoldierRight = imgFactory.getPeaceSoldierLeft();
            var rescaledSize = this.rescale(imageSoldierRight, 400);
            image(imageSoldierRight, -345, 160, rescaledSize[0], rescaledSize[1]);
            // Incrementamos su fade in condicionalmente
            this.fadeInSecond = this.fadeInSecond < 255 ? this.fadeInSecond + 1 : 255;
        }

        // Si hay 3, dibujamos el tercero
        if (numberOfUsers >= 3) {
            tint(255, this.fadeInThird);
            var imageButterfly = imgFactory.getButterfly();
            var rescaledSize = this.rescale(imageButterfly, 600);
            image(imageButterfly, 280, -200, rescaledSize[0], rescaledSize[1]);
            // Incrementamos su fade in condicionalmente
            this.fadeInThird = this.fadeInThird < 255 ? this.fadeInThird + 1 : 255;
        }

        // Dibujamos la ultima figura
        if (numberOfUsers == 4) {
            scale(-1, 1);
            tint(255, this.fadeInLast);
            var imageFlowerThrower = imgFactory.getFlowerThrowerBase();
            var rescaledSize = this.rescale(imageFlowerThrower, 300);
            image(imageFlowerThrower, 300, 40, rescaledSize[0], rescaledSize[1]);
            // Incrementamos su fade in condicionalmente
            this.fadeInLast = this.fadeInLast < 255 ? this.fadeInLast + 1 : 255;
        }
        pop();
    }

    isFinished() {
        if (this.fadeInLast == 254) {
            this.startMS = Date.now();
            return this.startMS - Date.now() < 3000;
        }
        return false;
    }

    rescale(img, imageSize) {
        let imageWidth = img.width;
        let imageHeight = img.height;
        // Calculate scaled dimensions while preserving aspect ratio
        let scaledWidth, scaledHeight;
        if (imageWidth > imageHeight) {
            scaledWidth = imageSize;
            scaledHeight = (imageSize / imageWidth) * imageHeight;
        } else {
            scaledHeight = imageSize;
            scaledWidth = (imageSize / imageHeight) * imageWidth;
        }
        return [scaledWidth, scaledHeight]
    }
}
