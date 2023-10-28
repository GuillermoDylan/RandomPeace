var mySvg; 
var placed = false;
var rp;
var imageFactory;

function preload(){
  imageFactory = new ImageFactory();
	mySvg = imageFactory.getFlowerThrower();
}

function setup() {
  createCanvas(screen.width, screen.height);
  rp = new RandomPlacer(imageFactory.getFlowerThrower())
}

function draw() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  background(255);
  if(!placed){
    rp.place(width, height);
    placed = true;
  }
  rp.draw();
}