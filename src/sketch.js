var rp;
var imageFactory;
var userPlaced = true;
var flowerThrowers;
var textGenerator;
var flowers = [];

function preload() {
  imageFactory = new ImageFactory();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // ajusta automáticamente el número de soldados a colocar en función del ancho de la pantalla
  MAX_SOLDIERS = map(windowWidth, 300, 1920, 5, 25);
  MAX_SOLDIERS = int(MAX_SOLDIERS / 5) * 5;
  
  SOLDIER_RANDOM_RANGE = 150;
  soldiers = [MAX_SOLDIERS];
  flowerThrowers = [MAX_SOLDIERS];
  for(var i = 0; i < 50; i++){
   flowerThrowers[i] = imageFactory.getFlowerThrower();
  }
  // TODO habría que cambiarlo, es de prueba
  rp = new RandomPlacer(flowerThrowers[0]);
  textGenerator = new TextGenerator(50);
  generateText();
}

function draw() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  background(255);

  imageMode(CENTER);

  for (var i = 0;i < soldiers.length; i++) {
    image(flowerThrowers[i], soldiers[i].x, soldiers[i].y, soldiers[i].width, soldiers[i].height); 
  }

  // Luego habría que cambiarlo, es de prueba
  if(soldiers.length >= MAX_SOLDIERS){
    userPlaced = false;
  }

  // Posiciones de "IA"
  if(!userPlaced){
    for (var i = 0;i < soldiers.length; i++) {
      // Generamos la posición aleatoria
      rp.place(width, height, i);
      // Obtenemos sus coordenadas y tamaño
      var coords = rp.draw(i);
      push();
      // Scale -1, 1 means reverse the x axis, keep y the same.
      scale(-1, 1);
      // Because the x-axis is reversed, we need to draw at different x position.
      image(flowerThrowers[i], coords[0], coords[1], coords[2], coords[3]);
      pop();
    }
    // Colocamos el texto de las flores
    var x = 500;
    var y = 1;
    for(var i = 0; i < soldiers.length; i++){
      fill(0);
      textSize(20);
      text(flowers[i], x,  (y * 25));
      y++;
      if(i>0 && i%5 == 0){
          x += 180;
          y = 1;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  if(!userPlaced){
    return;
  }
  addSoldier(mouseX, mouseY);
}

function addSoldier(x,y) {
  if (soldiers.length > MAX_SOLDIERS) {
    console.log("Max soldiers reached");
    return;
  }
  // circunferencia de radio 150 con centro en x,y
  x = x + random(-SOLDIER_RANDOM_RANGE, SOLDIER_RANDOM_RANGE);
  y = y + random(-SOLDIER_RANDOM_RANGE, SOLDIER_RANDOM_RANGE);

  // si el soldado aparece arriba del todo se pintara con 0.8 veces su tamaño 0.04
  // si el soldado aparece abajo del todo se pintara con 0.4 veces su tamaño 0.12
  let sizeFactor = map(y, 0, height, 0.08, 0.4);
  let soldierWidth = flowerThrowers[0].width * sizeFactor;
  let soldierHeight = flowerThrowers[0].height * sizeFactor;

  let rotation = random(TWO_PI);

  soldiers.push(new Soldier(x, y, "red", soldierWidth, soldierHeight, rotation));
  console.log("new Soldier added");
}

function generateText(){
  flowers = textGenerator.getText();
}