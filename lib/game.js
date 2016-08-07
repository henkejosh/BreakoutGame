const Ball = require('./ball.js');
const Paddle = require('./paddle.js');
const Brick = require('./brick.js');
const Instructions = require('./instructions_modal.js');


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

    this.instructions = new Instructions();
    this.paused = false;

    this.newGameButton = document.getElementById("newGame");
    this.newGameButton.addEventListener("click", this.newGame.bind(this));
  }

  newGame() {
    this.lives = 3;
    this.score = 0;
    this.level = 1;

    this.paddle = new Paddle(this.ctx, this.canvas);
    this.makeNewBall();
    this.makeBricks();

    this.instructions.closeModal();
    this.instructions = new Instructions();

    this.newGameButton = document.getElementById("newGame");
    this.newGameButton.addEventListener("click", this.newGame.bind(this));

    this.paused = false;
  }

  pauseGame() {
    this.ball.paused = this.paused;
    this.paddle.paused = this.paused;
    this.instructions.openModal();
  }

  handleKeyStroke(e){
    e.preventDefault();
    if(e.keyCode === 13) { this.handlePause(); }
  }

  handlePause() {
    this.instructions.openCloseModal();
    this.paused = !this.paused;
    this.ball.paused = this.paused;
    this.paddle.paused = this.paused;
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
    this.paused = true;
    this.instructions.header = "GAME OVER!";
  }

  drawBackground() {
    this.ctx.beginPath();
    this.ctx.rect(0, 100, this.canvas.width, this.canvas.height - 100);
    this.ctx.fillStyle = "#F1F1F1";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawHeader() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, 100);
    this.ctx.fillStyle = "rgba(241,241,241, .5)";
    this.ctx.fill();
    this.ctx.closePath();

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
    this.ctx.fillText("Balls: " + this.lives, 200, 20);
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

    this.drawHeader();
    // this.drawBackground();
    this.paddle.draw();
    this.ball.draw();

    this.bricksCleared();

    this.bricks.forEach( brick => {
      brick.draw();
    });

    if(this.lives <= 0) { this.gameOver(); }

    if(this.paused) { this.pauseGame(); }

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

    // VERTICAL BOUNCE
    // hits bottom of brick
    if((ballTop <= brickBottom && ballTop > brickTop + 8) ||
    // hits top of brick
    (ballBottom >= brickTop && ballBottom < brickBottom - 8)) {
      // left half of ball hits brick
      if((ballLeft <= brickRight && ballLeft > brickLeft) ||
      // right half of ball hits brick
        (ballRight >= brickLeft && ballRight < brickRight)) {
          this.ball.verticalBounce();
          return true;
      }
      // HORIZONTAL BOUNCE
      // left half of ball hits brick
    } else if((ballLeft <= brickRight && ballLeft > brickLeft + 8) ||
      // right half of ball hits brick
      (ballRight > brickLeft && ballRight < brickRight - 8)) {
        // top hits bottom of brick
        if((ballTop <= brickBottom && ballTop > brickTop) ||
        // bottom hits top of brick
          (ballBottom >= brickTop && ballBottom < brickBottom)) {
            this.ball.horizontalBounce();
            return true;
        }
    }

    // // top half of ball hits brick
    // if((ballTop < brickBottom && ballTop > brickTop) ||
    // // bottom half of ball hits brick
    //   (ballBottom > brickTop && ballBottom < brickBottom)) {
    //     // left half of ball hits brick
    //     if((ballLeft < brickRight && ballLeft > brickLeft) ||
    //     // right half of ball hits brick
    //       (ballRight > brickLeft && ballRight < brickRight)) {
    //         this.ball.verticalBounce();
    //         return true;
    //     }
    // }
    
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
