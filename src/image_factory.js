class ImageFactory {

    
    constructor(){
        this.gitHubUrl = "./";
        this.colors = ["blue", "green", "yellow", "purple", "pink", "cyan"];
    }

    getFlowerThrower() {
        return loadImage(this.gitHubUrl + "img/flower_thrower_" + this.getRandomColor() + ".svg");
    }

    getRandomColor(){
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

}