class ImageFactory {


    constructor() {
        this.gitHubUrl = "./";
        this.colors = ["blue", "green", "yellow", "purple", "pink", "cyan"];
        this.peaceSymbol = loadImage(this.gitHubUrl + "img/peace_sign.svg")
    }

    getFlowerThrower() {
        return loadImage(this.gitHubUrl + "img/flower_thrower_" + this.getRandomColor() + ".svg");
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    getLoadingPeaceSymbol() {
        return this.peaceSymbol;
    }

}