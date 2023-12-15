class Field {
    constructor() {
        let initialNumBalls = 50;
        let margin = 30;
        
        this.location = new p5.Vector(width / 2, height / 2);
        this.radius = min(width, height) / 2 - margin;
        this.gravity = new p5.Vector(0, 0.5);
        this.balls = [];
        this.addBalls(initialNumBalls);
        this.color = color(225);
    }

    show() {
        noFill();
        stroke(this.color);
        strokeWeight(2);

        circle(this.location.x, this.location.y, 2 * this.radius);
    }

    addBalls(n) {
        for (let i = 0; i < n; i++) {
            this.balls.push(new Ball(this));
        }
    }
}