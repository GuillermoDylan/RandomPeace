
const pages = "";var mySvg;
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
  // TODO habría que cambiarlo, es de prueba
  rp = new RandomPlacer(imageFactory.getFlowerThrower(), 50);
}

function draw() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  background(255);

  for (var i = 0;i < soldiers.length; i++) {
    image(flowerThrower, soldiers[i].x, soldiers[i].y, 60, 70); 
  }

  // Luego habría que cambiarlo, es de prueba
  if(soldiers.length >= 50){
    userPlaced = true;
  }
  
  if(userPlaced){
    for (var i = 0;i < soldiers.length; i++) {
      // Generamos la posición aleatoria
      rp.place(width, height, i);
      // Obtenemos sus coordenadas y tamaño
      var coords = rp.draw(i);
      push();
      // Scale -1, 1 means reverse the x axis, keep y the same.
      scale(-1, 1);
      // Because the x-axis is reversed, we need to draw at different x position.
      image(flowerThrower, coords[0], coords[1], coords[2], coords[3]);
      pop();
    }
  }
}

function mouseClicked() {
  if(userPlaced){
    return;
  }
  addSoldier(mouseX, mouseY);
}

function addSoldier(x,y) {
  soldiers.push(new Soldier(x, y, "red"));
}