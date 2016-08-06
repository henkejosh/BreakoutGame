
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
    // debugger;
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
    if(this.yStart + this.vertDir < 0 ) {
      this.vertDir = 1;
    }

    if(this.xStart + this.horizDir < 0) {
      this.horizDir = 1;
    } else if(this.xStart + this.horizDir > this.canvas.width) {
      this.horizDir = -1;
    }
  }
}

// Ball.prototype.draw = function(x, y) {
//   debugger;
//   this.ctx.beginPath();
//   this.ctx.arc(x, y, 10, 0, Math.PI*2);
//   this.ctx.fillStyle = "#0095DD";
//   this.ctx.fill();
//   this.ctx.closePath();
// };

module.exports = Ball;