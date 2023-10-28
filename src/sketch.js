
const pages = "";var mySvg; 
var placed = false;
var rp;
var imageFactory;
var userPlaced = false;

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

  for (var i = 0; !userPlaced && i < soldiers.length; i++) {
    image(flowerThrower, soldiers[i].x, soldiers[i].y, 60, 70); 
  }

  // Luego habría que cambiarlo, es de prueba
  if(soldiers.length > 50){
    userPlaced = true;
  }

  if(!placed && userPlaced){
    rp.place(width, height);
    placed = true;
  }else if(userPlaced){
    var coords = rp.draw();
    push();
    // Scale -1, 1 means reverse the x axis, keep y the same.
    scale(-1, 1);
    // Because the x-axis is reversed, we need to draw at different x position.
    image(flowerThrower, coords[0], coords[1], coords[2], coords[3]);
    pop();
  }
}

function mouseClicked() {
  addSoldier(mouseX, mouseY);
}

function addSoldier(x,y) {
  soldiers.push(new Soldier(x, y, "red"));
}