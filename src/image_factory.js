class ImageFactory {

    
    constructor(){
        this.gitHubUrl = "/RandomPeace/src/";
    }

    getFlowerThrower() {
        return loadImage(this.gitHubUrl + "img/flower_thrower.svg");
    }

}