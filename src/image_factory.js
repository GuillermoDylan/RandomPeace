class ImageFactory {

    gitHubUrl = "/RandomPeace/";

    constructor(){

    }

    getFlowerThrower() {
        return loadImage(gitHubUrl + "img/flower_thrower.svg");
    }

}