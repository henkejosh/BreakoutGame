
class Ball {
  constructor(ctx, xStart, yStart, canvas) {
    this.ctx = ctx;
    this.radius = 10;
    this.xStart = xStart;
    this.yStart = yStart;
    this.vertDir = -3;
    this.horizDir = 3;
    this.canvas = canvas;

    this.moving = false;
    this.dead = false;

    this.bounces = 0;

    document.addEventListener("keydown", this.playBall.bind(this));
  }

  playBall(e) {
    e.preventDefault();
    // debugger;
    if(this.moving === false && e.keyCode === 32 && this.dead === false){
      this.moving = true;
    }
  }

  draw() {
    this.wallsRedirect();
    this.ctx.beginPath();
    this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();

    if(this.moving) {
      this.xStart += this.horizDir;
      this.yStart += this.vertDir;
    }
  }

  killBall() {
    this.radius = 0;
    this.dead = true;
    this.moving = false;
  }

  wallsRedirect() {
    if(this.yStart - this.radius + this.vertDir < 100 ) {
      this.verticalBounce();
    } else if(this.yStart + this.radius + this.vertDir > this.canvas.height) {

      console.log("YOU suck");
      this.killBall();
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
          this.vertDir = -3;
          this.bounces += 1;
        }
    }
  }
}

module.exports = Ball;
