
class Ball {
  constructor(ctx, xStart, yStart, canvas) {
    this.ctx = ctx;
    this.radius = 10;
    this.xStart = xStart;
    this.yStart = yStart;
    this.vertDir = -1;
    this.horizDir = 1;
    this.canvas = canvas;
  }

  draw() {
    this.wallsRedirect();
    this.ctx.beginPath();
    this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
    this.xStart += this.horizDir;
    this.yStart += this.vertDir;
  }

  wallsRedirect() {
    if(this.yStart - this.radius + this.vertDir < 0 ) {
      this.vertDir = 1;
    }

    if(this.xStart - this.radius + this.horizDir < 0) {
      this.horizDir = 1;
    } else if(this.xStart + this.radius + this.horizDir > this.canvas.width) {
      this.horizDir = -1;
    }
  }

  objectCollision(object) {

  }
}

module.exports = Ball;
