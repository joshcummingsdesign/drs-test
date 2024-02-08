// Function to draw a Koch snowflake
function kochSnowflake(turtle, order, size) {
    function snowflakeSide(turtle, order, size) {
        if (order === 0) {
            turtle.forward(size);
        } else {
            snowflakeSide(turtle, order - 1, size / 3);
            turtle.left(60);
            snowflakeSide(turtle, order - 1, size / 3);
            turtle.right(120);
            snowflakeSide(turtle, order - 1, size / 3);
            turtle.left(60);
            snowflakeSide(turtle, order - 1, size / 3);
        }
    }
    for (let i = 0; i < 3; i++) {
        snowflakeSide(turtle, order, size);
        turtle.right(120);
    }
}

// Turtle graphics implementation
class Turtle {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = 0;
        this.penDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
    }
    forward(distance) {
        const newX = this.x + Math.cos(this.angle) * distance;
        const newY = this.y + Math.sin(this.angle) * distance;
        console.log(newX);
        if (this.penDown) {
            this.ctx.lineTo(newX, newY);
            this.ctx.stroke();
        } else {
            this.ctx.moveTo(newX, newY);
        }
        this.x = newX;
        this.y = newY;
    }
    left(angle) {
        this.angle -= angle * (Math.PI / 180);
    }
    right(angle) {
        this.angle += angle * (Math.PI / 180);
    }
    penUp() {
        this.penDown = false;
    }
    penDown() {
        this.penDown = true;
    }
}

// Create canvas
const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

// Create turtle and draw the Koch snowflake
const turtle = new Turtle(canvas);
turtle.penDown();
kochSnowflake(turtle, 4, 300);
