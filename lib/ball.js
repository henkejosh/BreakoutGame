
class Ball {
  constructor(ctx, xStart, yStart, canvas) {
    this.ctx = ctx;
    this.radius = 10;
    this.xStart = xStart;
    this.yStart = yStart;
    this.vertDir = -3;
    this.horizDir = 1;
    this.canvas = canvas;

    this.moving = false;
    this.dead = false;

    this.bounces = 0;

    this.paused = false;

    document.addEventListener("keydown", this.updateMoveState.bind(this));
    document.addEventListener("keyup", this.resetMoveState.bind(this));
  }

  updateMoveState(e) {
    e.preventDefault();
    if(this.paused) { return; }

    if(this.moving === false && this.dead === false) {

      if(e.keyCode === 32) {
        if(this.rightPressed) {
          this.horizDir = 3;
        } else if(this.leftPressed) {
          this.horizDir = -3;
        }
        this.moving = true;
        this.rightPressed = false;
        this.leftPressed = false;
      } else if(e.keyCode === 39) {
        this.rightPressed = true;
      } else if(e.keyCode === 37) {
        this.leftPressed = true;
      }
    } else if(this.moving === true && this.dead === false) {
        if(e.keyCode === 39) {
        this.rightPressed = true;
      } else if(e.keyCode === 37) {
        this.leftPressed = true;
      }
    }
  }

  resetMoveState(e) {
    e.preventDefault();
    if(this.paused) { return; }

    if(e.keyCode === 39) {
      this.rightPressed = false;
    } else if(e.keyCode === 37) {
      this.leftPressed = false;
    }
  }

  draw() {
    this.wallsRedirect();

    this.ctx.beginPath();
    this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI*2);

    this.ctx.shadowColor = "#FFFFFF";
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 10;

    this.ctx.fillStyle = "#EAF922";
    this.ctx.fill();
    this.ctx.closePath();

    if(this.moving && !this.paused) {
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
    } else if(this.yStart + this.vertDir - this.radius > this.canvas.height + 13) {

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
    if(this.moving === true) {
      if(this.yStart + this.radius + this.vertDir >= paddle.yStart) {
        if((this.xStart + this.radius > paddle.xStart &&
          this.xStart < paddle.xStart + paddle.width) ||

          (this.xStart - this.radius < paddle.xStart + paddle.width &&
            this.xStart > paddle.xStart)) {

          // not passed the bpaddle
          if(!(this.yStart + this.radius > paddle.yStart + 2)) {
              // both moving left
              if(this.leftPressed) {
                this.horizDir -= 1;
                // both moving right
              } else if(this.rightPressed) {
                this.horizDir += 1;
              }

              if(this.horizDir < -4) {
                this.horizDir = -4;
              } else if(this.horizDir > 4) {
                this.horizDir = 4;
              }

              this.vertDir = -3;
              this.bounces += 1;
          } else {
            this.horizDir *= -1;
          }
        }
      }
    }
  }
}

module.exports = Ball;
