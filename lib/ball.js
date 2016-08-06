
class Ball {
  constructor(ctx, xStart, yStart, canvas) {
    this.ctx = ctx;
    this.radius = 10;
    this.xStart = xStart;
    this.yStart = yStart;
    this.vertDir = -3;
    this.horizDir = 3;
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
      this.verticalBounce();
    } else if(this.yStart + this.radius + this.vertDir > this.canvas.height) {
      // alert("You suck!");
      console.log("YOU suck");
      // document.location.reload();
    }

    if(this.xStart - this.radius + this.horizDir < 0) {
      this.horizontalBounce();
    } else if(this.xStart + this.radius + this.horizDir > this.canvas.width) {
      this.horizontalBounce();
    }
  }

  verticalBounce() {
    this.vertDir *= -1;
  }

  horizontalBounce() {
    this.horizDir *= -1;
  }

  handlePaddleCollision(paddle) {
    if(this.yStart + this.radius + this.vertDir >= paddle.yStart) {
      if(this.xStart > paddle.xStart &&
          this.xStart < paddle.xStart + paddle.width) {
          this.verticalBounce();
        }
    }
  }
}

module.exports = Ball;
