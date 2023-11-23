class TextGenerator {

    /**
     * Geneates number amount of text for the flowers to display
     * @param {Number} number 
     */
    constructor(number){
        this.number = number;
        this.text = [];
        this.generateText();
    }

    /**
     * @returns {String[]}
     */
    getText(){
        return this.text;
    }

    async generateText(){
        var text = await FileReader.read("./res/flowers.txt");
        var flowers = text.split("\n");
        var indices = Array.from({length: flowers.length}, (_, i) => i); // array of indices
        var numberThrown = 0;

        for(let i = 0; i < this.number; i++){
            var randomIndex = Math.floor(Math.random() * indices.length); // get a random index
            var flowerIndex = indices[randomIndex]; // get the corresponding flower index
            indices.splice(randomIndex, 1); // remove the index from the array

            // TODO vamos a calcular las flores de cada color...
            // o hacer que sea un número aleatorio?

            // Máximo 3, mínimo 0
            numberThrown = Math.floor(Math.random() * 4);
            if(numberThrown > 0)
                this.text.push(flowers[flowerIndex] + " x" + numberThrown);
        }
    }

}