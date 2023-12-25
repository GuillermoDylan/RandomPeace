
var rp;
var imageFactory;
var userPlaced = false;
var flowerThrowers;
var webSocket;
var sentJSON = false

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
  // TODO no se si aquí o antes de crear todos los objetos
  webSocket = new WebSocketAdapter()
  var text, content = webSocket.connect()
  console.log(text)
  console.log(content)
}

function draw() {
  background(255);

  for (var i = 0; i < soldiers.length; i++) {
    image(flowerThrowers[i], soldiers[i].x, soldiers[i].y, 60, 70);
  }

  // Luego habría que cambiarlo, es de prueba
  if (soldiers.length >= 50) {
    userPlaced = true;
  }

  // Cuando el usuario ya colocó todas sus piezas, esperamos a el resto de usuarios
  if (userPlaced && !sentJSON) {
    // Creamos el json con las posiciones del usuario
    // CUIDADO: este solo se envía una sola vez
    tupleArray = []
    //json = "{\n\"positions\":[\n"
    for (var i = 0; i < soldiers.length; i++) {
      if (soldiers[i].x != undefined)
        //json += "[" + soldiers[i].x + "," + soldiers[i].y + "],\n"
        tupleArray.push([soldiers[i].x, soldiers[i].y])
    }
    //json += "\n]\n}"
    json = JSON.stringify({
      positions: tupleArray
    })

    // Mandamos el mensaje al websocket
    webSocket.sendMessage(json)

    // Marcamos como enviado
    sentJSON = true
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