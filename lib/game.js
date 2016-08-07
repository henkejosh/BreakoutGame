const Ball = require('./ball.js');
const Paddle = require('./paddle.js');
const Brick = require('./brick.js');


class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    const x = canvas.width/2;
    const y = canvas.height-30;
    this.ball = new Ball(ctx, x, y, canvas);

    this.paddle = new Paddle(ctx, canvas);
    this.makeBricks(8);
    this.lives = 3;
    this.score = 0;
  }

  drawScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    let score = this.score + this.ball.bounces;

    this.ctx.fillText("Score: " + score, 10, 20);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScore();
    this.ball.draw();
    this.paddle.draw();

    this.bricks.forEach( brick => {
      brick.draw();
    });

    if(this.ball.dead) {
      this.lives -= 1;
      this.ball = new Ball(this.ctx, this.canvas.width/2,
        this.canvas.height - 30, this.canvas);
    }

    if(this.ball && this.paddle) {
      this.ball.handlePaddleCollision(this.paddle);
    }

    if(this.ball && this.ball.dead) {
      // document.location.reload();
    }

    this.allBricksCollision();
  }

  allBricksCollision() {
    this.bricks.forEach( (brick, idx) => {
      let that = this;
      if(this.checkBrickCollision(brick)) {
        that.bricks.splice(idx, 1);
        that.score += 10;
        return;
      }
    });
  }

  checkBrickCollision(brick) {
    let brickLeft = brick.xStart;
    let brickRight = brick.xStart + brick.width;

    let brickTop = brick.yStart;
    let brickBottom = brick.yStart + brick.height;

    let ballLeft = this.ball.xStart - this.ball.radius;
    let ballRight = this.ball.xStart + this.ball.radius;

    let ballTop = this.ball.yStart;
    let ballBottom = this.ball.yStart + this.ball.radius;

    // top half of ball hits brick
    if((ballTop < brickBottom && ballTop > brickTop) ||
    // bottom half of ball hits brick
      (ballBottom > brickTop && ballBottom < brickBottom)) {
        // left half of ball hits brick
        if((ballLeft < brickRight && ballLeft > brickLeft) ||
        // right half of ball hits brick
          (ballRight > brickLeft && ballRight < brickRight)) {
            this.ball.verticalBounce();
            return true;
        }
    }
    return false;
  }

  makeBricks(numBricks) {
    let firstBrickY = 0;
    let firstBrickX = 0;

    const topOffset = 150;
    const leftOffset = 10;
    let bricks = [];

    for(let i = 0; i < numBricks; i++) {
      let x = (leftOffset + firstBrickX);
      let y = (topOffset + firstBrickY);

      let brick = new Brick(this.ctx, x, y);
      bricks.push(brick);
      firstBrickX += leftOffset + brick.width;
      if (firstBrickX + 80 > this.canvas.width) {
        firstBrickY += 25;
        firstBrickX = 0;
      }
    }

    this.bricks = bricks;
  }
}

module.exports = Game;
