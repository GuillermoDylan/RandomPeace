var mySvg;

function preload() {
	mySvg = loadImage("/img/peace_soldiers.svg");
  flowerThrower = loadImage("/img/flower_thrower.svg");
}

function setup() {
  createCanvas(1920, 1080);
  MAX_SOLDIERS = 50;
  SOLDIER_RANDOM_RANGE = 150;
  soldiers = [];
}

function draw() {
  background(255);
  imageMode(CENTER);
  //image(mySvg, 500, 500);
  for (var i = 0; i < soldiers.length; i++) {
    // translate(width/2, height/2);
    // rotate(soldiers[i].rotation);
    image(flowerThrower, soldiers[i].x, soldiers[i].y, soldiers[i].width, soldiers[i].height); 
  }
}

function mouseClicked() {
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

  // si el soldado aparece arriba del todo se pintara con 0.8 veces su tamaño
  // si el soldado aparece abajo del todo se pintara con 0.4 veces su tamaño
  let sizeFactor = map(y, 0, height, 0.08, 0.4);
  let soldierWidth = flowerThrower.width * sizeFactor;
  let soldierHeight = flowerThrower.height * sizeFactor;

  let rotation = random(TWO_PI);

  soldiers.push(new Soldier(x, y, "red", soldierWidth, soldierHeight, rotation));
  console.log("new Soldier added");
}