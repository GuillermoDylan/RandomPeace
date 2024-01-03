
class LoadingScreen {

    draw() {
        let spinnerSize = 192;
        let spinnerSpeed = 10;
        let spinnerColor = color(33, 150, 243);

        let step = frameCount % (spinnerSpeed * 7.25);
        let angle = map(step, 0, spinnerSpeed * 7.25, 0, TWO_PI);

        push();
        translate(width / 2, height / 2);
        rotate(angle);
        noFill();
        stroke(spinnerColor);
        strokeWeight(spinnerSize / 10);
        strokeCap(SQUARE);
        arc(0, 0, spinnerSize - (spinnerSize / 20), spinnerSize - (spinnerSize / 20), 0, PI + HALF_PI, OPEN);
        pop();

        stroke(spinnerColor);
        strokeWeight(spinnerSize / 10);
        line(width / 2, height / 2 - 96, width / 2, height / 2 + 96,);
        stroke(0);
        strokeWeight(0);
    }

}