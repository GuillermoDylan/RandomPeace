
var rp;
var imageFactory;
var userPlaced = false;
var flowerThrowers;

function preload() {
  imageFactory = new ImageFactory();
}

function setup() {
  createCanvas(screen.width, screen.height);
  soldiers = [50];
  flowerThrowers = [50];
  for (var i = 0; i < 50; i++) {
    flowerThrowers[i] = imageFactory.getFlowerThrower();
  }
  // TODO habría que cambiarlo, es de prueba
  rp = new RandomPlacer(flowerThrowers[0]);
}

function draw() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  background(255);

  for (var i = 0; i < soldiers.length; i++) {
    image(flowerThrowers[i], soldiers[i].x, soldiers[i].y, 60, 70);
  }

  // Luego habría que cambiarlo, es de prueba
  if (soldiers.length >= 50) {
    userPlaced = true;
  }

  // Cuando el usuario ya colocó todas sus piezas, colocamos las de la "IA"
  if (userPlaced) {
    for (var i = 0; i < soldiers.length; i++) {
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
  }
}

function mouseClicked() {
  if (userPlaced) {
    return;
  }
  addSoldier(mouseX, mouseY);
}

function addSoldier(x, y) {
  soldiers.push(new Soldier(x, y, "red"));
}