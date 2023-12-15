let field;

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 255);

    field = new Field();
}

function draw() {
    background(35);

    field.show();
    for (const ball of field.balls) {
        ball.update();
        ball.show();
    }
}