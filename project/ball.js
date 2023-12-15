class Ball {
    constructor(field) {
        let locationOffset = 1;

        this.field = field;
        this.location = this.field.location.copy().add(p5.Vector.random2D().mult(locationOffset));
        this.velocity = new p5.Vector(0, 15);
        this.acceleration = new p5.Vector(0, 0);
        this.radius = 10;
        this.color = color(225, 200);
        this.vertices = [];
        this.verticesMaxLength = 0;
    }

    show() {
        if (this.verticesMaxLength > 0) {
            noFill();
            stroke(this.color);
            strokeWeight(2);

            strokeCap(ROUND);

            beginShape();
            for (const element of this.vertices) {
                vertex(element.x, element.y);
            }
            endShape();
        }

        noStroke();
        fill(this.color);

        circle(this.location.x, this.location.y, 2 * this.radius);
    }

    update() {
        this.acceleration.add(this.field.gravity);
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.set(0, 0);

        if (this.checkCollision()) {
            this.handleCollision();
        }

        if (this.verticesMaxLength > 0) {
            if (this.vertices.length >= this.verticesMaxLength) {
                this.vertices.shift();
            }
            this.vertices.push(this.location.copy());
        }
    }

    checkCollision() {
        return dist(this.location.x, this.location.y, this.field.location.x, this.field.location.y) >= this.field.radius - this.radius;
    }

    handleCollision() {
        let normalVector = p5.Vector.sub(this.location, this.field.location).normalize();

        let reflectionVector = p5.Vector.sub(this.velocity, normalVector.mult(2 * this.velocity.dot(normalVector)));
        this.velocity.set(reflectionVector);

        let directionVector = p5.Vector.sub(this.location, this.field.location).setMag(this.field.radius - this.radius);

        this.location = p5.Vector.add(this.field.location, directionVector);
    }
}