const Ball = require('./ball.js');
const Paddle = require('./paddle.js');
const Brick = require('./brick.js');


class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.paddle = new Paddle(ctx, canvas);
    this.makeNewBall();

    this.lives = 3;
    this.score = 0;
    this.level = 1;
    this.makeBricks();
  }

  goToNextLevel() {
    this.level += 1;
    this.makeBricks();
    this.makeNewBall();
  }

  bricksCleared() {
    if(this.bricks.length === 0) {
      this.goToNextLevel();
    }
  }

  gameOver() {
    
  }

  drawHeader() {
    this.drawScore();
    this.drawLives();
    this.drawLevel();
  }

  drawLevel() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "orange";
    this.ctx.fillText("Level: " + this.level, 10, 20);
  }

  drawLives() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "green";
    this.ctx.fillText("Lives: " + this.lives, 200, 20);
  }

  drawScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    let score = this.score + this.ball.bounces;

    this.ctx.fillText("Score: " + score, 400, 20);
  }

  makeNewBall() {
    this.ball = new Ball(this.ctx, this.paddle.xStart + this.paddle.width/2,
      this.paddle.yStart + this.paddle.height - 15, this.canvas);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.drawScore();
    this.drawHeader();
    this.paddle.draw();
    this.ball.draw();

    this.bricksCleared();

    this.bricks.forEach( brick => {
      brick.draw();
    });

    if(this.ball.dead) {
      this.lives -= 1;
      this.makeNewBall();
    }

    if(this.ball && this.paddle) {
      this.ball.handlePaddleCollision(this.paddle);
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

  makeBricks() {
    const numBricks = 8 + (this.level * 2);

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
