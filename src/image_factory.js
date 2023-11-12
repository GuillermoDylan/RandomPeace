class ImageFactory {

    
    constructor(){
        this.gitHubUrl = "/RandomPeace/src/";
    }

    getFlowerThrower() {
        //return loadImage(this.gitHubUrl + "img/flower_thrower.svg");
        return loadImage("img/flower_thrower.svg");
    }

}