class ImageFactory {


    constructor() {
        this.gitHubUrl = "./";
        this.colors = ["blue", "green", "yellow", "purple", "pink", "cyan"];
        this.peaceSymbol = loadImage(this.gitHubUrl + "img/peace_sign.svg")
        this.peaceSoldierLeft = loadImage(this.gitHubUrl + "img/peace_soldier_left.svg");
        this.peaceSoldierRight = loadImage(this.gitHubUrl + "img/peace_soldier_right.svg");
        this.butterfly = loadImage(this.gitHubUrl + "img/butterfly_suicide.svg");
        this.flowerTrhower = loadImage(this.gitHubUrl + "img/flower_thrower.svg");
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

    getPeaceSoldierLeft() {
        return this.peaceSoldierLeft;
    }

    getPeaceSoldierRight() {
        return this.peaceSoldierRight;
    }

    getButterfly() {
        return this.butterfly;
    }

    getFlowerThrowerBase() {
        return this.flowerTrhower;
    }

}