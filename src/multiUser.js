
var rp;
var imageFactory;
var userPlaced = false;
var flowerThrowers;
var webSocket;
var sentJSON = false;
var usersPositions = [];
var numberOfUsers = 0;
var loadingScreen;
var alphaV = 0;

function preload() {
  imageFactory = new ImageFactory();
  loadingScreen = new LoadingScreen();
}

function setup() {
  createCanvas(screen.width, screen.height);
  soldiers = [50];
  flowerThrowers = [50];
  for (var i = 0; i < 50; i++) {
    flowerThrowers[i] = imageFactory.getFlowerThrower();
  }

  webSocket = new WebSocketAdapter()
}

function draw() {
  background(255);
  if (!webSocket.wasConnectionSuccesfull()) {
    text("La sesión está llena, por favor vuelve a intentarlo más tarde", windowWidth / 2, windowHeight / 2);
    return;
  }

  // Manejo de mensajes de WebSocket
  webSocket.getSocket().onmessage = function (event) {
    data = JSON.parse(event.data)
    console.log(data)
    console.log(typeof (data))
    // data contiene los arrays de cada jugador, solo tenemos que mostrarlos en pantalla
    if (typeof (data) === "number") {
      console.log("entra")
      numberOfUsers = data
    }
    usersPositions = data
  };

  for (var i = 0; i < soldiers.length; i++) {
    image(flowerThrowers[i], soldiers[i].x, soldiers[i].y, 60, 70);
  }

  // Luego habría que cambiarlo, es de prueba
  if (soldiers.length >= 5) {
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

  if (alphaV >= 255 && userPlaced && sentJSON && usersPositions.length > 0) {
    // Primer nivel: usuarios
    for (var i = 0; i < usersPositions.length; i++) {
      // Segundo nivel: figuras del usuario
      for (var j = 0; j < usersPositions[i].length; j++) {
        // Tercer nivel: posición x e y de cada figura
        image(flowerThrowers[i], usersPositions[i][j][0], usersPositions[i][j][1], 60, 70);
      }
    }
  }

  // Mostramos la pantalla de "carga" mientras que el usuario ya haya colocado y falten jugadores
  // Importante hacerlo al final, así no interferimos en el "dibujado" del resto de figuras
  if (userPlaced && numberOfUsers > 0 && numberOfUsers <= 4) {
    if (!loadingScreen.isFinished()) {
      if (alphaV == 255) {
        background(255);
      }
      else {
        background(255, 255, 255, alphaV);
      }
      loadingScreen.draw(imageFactory, numberOfUsers);
      textSize(100);
      fill(0);
      text(numberOfUsers + "/4", 10, 100);
      if (alphaV < 255) {
        alphaV = alphaV + 1;
      }
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