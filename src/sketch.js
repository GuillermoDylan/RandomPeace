const pages = "";



var mySvg;

function preload() {
//#ifdef pages 
	mySvg = loadImage("/img/peace_soldiers.svg");
  flowerThrower = loadImage("/img/flower_thrower.svg");
//#endif
}

function setup() {
  createCanvas(1920, 1080);
  soldiers = [];
}

function draw() {
  background(255);
  imageMode(CENTER);
  image(mySvg, 500, 500);
  for (var i = 0; i < soldiers.length; i++) {
    image(flowerThrower, soldiers[i].x, soldiers[i].y, 60, 70); 
  }
}

function mouseClicked() {
  addSoldier(mouseX, mouseY);
}

function addSoldier(x,y) {
  soldiers.push(new Soldier(x, y, "red"));
}