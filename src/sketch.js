var mySvg; 
var placed = false;
var rp;

function preload(){
	mySvg = loadImage("img/flower_thrower.svg");
}

function setup() {
  createCanvas(screen.width, screen.height);
  rp = new RandomPlacer(10)
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