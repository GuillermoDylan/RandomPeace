class TextGenerator {

    /**
     * Geneates number amount of text for the flowers to display
     * @param {Number} number 
     */
    constructor(number){
        this.number = number;
        this.text = [];
        this.generateText();
        this.fileName = "../res/flowers.txt"
    }

    getText(){
        return this.text;
    }

    async generateText(){
        var text = await FileReader.read("/res/flowers.txt");
        var flowers = text.split("\n");
        for(let i = 0; i < this.number; i++){
            this.text.push(flowers[i]);
        }
    }

}