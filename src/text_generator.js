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
        var flowerIndex = indices[randomIndex]; // get the corresponding flower index
        indices.splice(randomIndex, 1); // remove the index from the array

        this.text.push(flowers[flowerIndex]); 
        /**for(let i = 0; i < this.number; i++){
            var randomX = Math.floor(Math.random() * (flowers.length));
            while(this.text.includes(flowers[randomX])){
                console.log(flowers[randomX] + " is already in the list")
                console.log(this.text)
                randomX = Math.floor(Math.random() * (flowers.length));
                console.log(flowers[randomX] + " is the new random flower")
            }
            this.text.push(flowers[randomX]); 
        }**/
    }

}