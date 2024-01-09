
var rp;
var imageFactory;
var userPlaced = false;
var flowerThrowers;
var automaton;

function preload(){
  imageFactory = new ImageFactory();
}

function setup() {
  createCanvas(screen.width, screen.height);
  soldiers = [50];
  flowerThrowers = [50];
  for(var i = 0; i < 50; i++){
   flowerThrowers[i] = imageFactory.getFlowerThrower();
  }
  // TODO habría que cambiarlo, es de prueba
  //rp = new RandomPlacer(flowerThrowers[0]);
}

function draw() {
  background(255);
  if(!userPlaced){
    for (var i = 0;i < soldiers.length; i++) {
      image(flowerThrowers[i], soldiers[i].x, soldiers[i].y, 60, 70); 
    }

    // Luego habría que cambiarlo, es de prueba
    if(soldiers.length >= 25){
      userPlaced = true;
    }
  }else {
    if(automaton == null){
      automaton = new AutomataMode(soldiers, flowerThrowers);
    }
    automaton.draw();
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