"use strict";
var mode = new MultiUser();

function preload() {
    mode.preload();
}

function setup() {
    mode.setup();
}

function draw() {
    mode.draw();
}

function mouseClicked() {
    //mode.mouseClicked();
}

function windowResized() {
    mode.windowResized();
}

// Esto está solo para probar si funcionaría en móvil
function touchStarted() {
    mode.touchStarted();
}