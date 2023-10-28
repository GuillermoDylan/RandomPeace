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
    image(flowerThrower, soldiers[i].x, soldiers[i].y, 60, 70); 
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
  // circunferencia de radio 50 con centro en x,y
  x = x + random(-SOLDIER_RANDOM_RANGE, SOLDIER_RANDOM_RANGE);
  y = y + random(-SOLDIER_RANDOM_RANGE, SOLDIER_RANDOM_RANGE);

  soldiers.push(new Soldier(x, y, "red"));
  console.log("new Soldier added");
}