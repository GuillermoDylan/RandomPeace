var mySvg; 

function preload(){
	mySvg = loadImage("/img/peace_soldiers.svg");

}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(255);
  imageMode(CENTER);
  image(mySvg, 0, 0);
}