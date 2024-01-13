class TextGenerator {

    /**
     * Geneates number amount of text for the flowers to display
     * @param {Number} number 
     */
    constructor(number) {
        // * 2 para que sean los dos "bandos"
        this.number = number * 2;
        this.flowers = [];
        this.generateText();
    }

    async generateText() {
        var text = await FileReader.read("./res/flowers.txt");
        var flowers = text.split("\n");
        var indices = Array.from({ length: flowers.length }, (_, i) => i); // array of indices
        var numberThrown = 0;

        for (let i = 0; i < this.number; i++) {
            var randomIndex = Math.floor(Math.random() * indices.length); // get a random index
            var flowerIndex = indices[randomIndex]; // get the corresponding flower index
            indices.splice(randomIndex, 1); // remove the index from the array

            // Máximo 3, mínimo 0
            numberThrown = Math.floor(Math.random() * 4);
            if (numberThrown > 0)
                this.flowers.push(flowers[flowerIndex] + " " + numberThrown);
        }
    }

    draw(soldiers) {
        var x = 500;
        var y = 1;
        for (var i = 0; i < soldiers.length; i++) {
            fill(0);
            textSize(20);
            text(this.flowers[i], x, (y * 25));
            y++;
            if (i > 0 && i % 5 == 0) {
                x += 180;
                y = 1;
            }
        }
    }

}