
class LoadingScreen {

    draw(imgFactory) {
        let spinnerSpeed = 10;

        let step = frameCount % (spinnerSpeed * 7.25);
        let angle = map(step, 0, spinnerSpeed * 7.25, 0, TWO_PI);

        push();
        image(imageFactory.getLoadingPeaceSymbol(), width / 2, height / 2)
        rotate(angle);
        pop();
    }

}