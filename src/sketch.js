
const pages = "";var mySvg; 
var placed = false;
var rp;
var imageFactory;

function preload(){
  //#ifdef pages 
	mySvg = loadImage("/img/peace_soldiers.svg");
  flowerThrower = loadImage("/img/flower_thrower.svg");
  //#endif
  imageFactory = new ImageFactory();
	mySvg = imageFactory.getFlowerThrower();
}

function setup() {
  createCanvas(screen.width, screen.height);
  soldiers = [];
  rp = new RandomPlacer(imageFactory.getFlowerThrower())
}

function draw() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  background(255);
  imageMode(CENTER);
  image(mySvg, 500, 500);
  for (var i = 0; i < soldiers.length; i++) {
    image(flowerThrower, soldiers[i].x, soldiers[i].y, 60, 70); 
  }

  if(!placed){
    rp.place(width, height);
    placed = true;
  }
  rp.draw();
}

function mouseClicked() {
  addSoldier(mouseX, mouseY);
}

function addSoldier(x,y) {
  soldiers.push(new Soldier(x, y, "red"));
}