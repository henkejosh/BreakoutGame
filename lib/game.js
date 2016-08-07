const Ball = require('./ball.js');
const Paddle = require('./paddle.js');
const Brick = require('./brick.js');
const Instructions = require('./instructions_modal.js');
const LevelDetails = require('./level_details.js');


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

  challengerWon() {
    this.paused = true;
    this.instructions.header = "Congrats, you won! Play again?";
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

  drawHeader() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, 100);
    this.ctx.fillStyle = "rgba(241,241,241, .5)";
    this.ctx.fill();
    this.ctx.closePath();

    this.drawScore();
    this.drawLives();
    this.drawLevel();
    this.drawLevelTitle();
  }

  drawBackgroundImage() {
    let canvas2 = document.getElementById("backgroundCanvas");
    let ctx2 = canvas2.getContext('2d');
    let image = new Image();

    image.src = LevelDetails[this.level].image;

    ctx2.drawImage(image, 0, 0, canvas2.width, canvas2.height);
  }

  drawLevel() {
    this.ctx.font = "20px monospace";
    this.ctx.fillStyle = "orange";
    this.ctx.fillText("Level: " + this.level, 10, 20);
  }

  drawLives() {
    this.ctx.font = "20px monospace";
    this.ctx.fillStyle = "green";
    this.ctx.fillText("Balls: " + this.lives, 10, 50);
  }

  drawScore() {
    this.ctx.font = "20px monospace";
    this.ctx.fillStyle = "blue";

    let score = this.score + this.ball.bounces;
    this.ctx.fillText("Score: " + score, 10, 80);
  }

  drawLevelTitle() {
    this.ctx.font = "30px monospace";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`${LevelDetails[this.level].name}`, 200, 58);
  }

  makeNewBall() {
    this.ball = new Ball(this.ctx, this.paddle.xStart + this.paddle.width/2,
      this.paddle.yStart + this.paddle.height - 15, this.canvas);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawHeader();
    this.paddle.draw();
    this.ball.draw();

    this.bricksCleared();
    this.drawBackgroundImage();

    this.bricks.forEach( brick => {
      brick.draw();
    });

    if(this.lives <= 0) { this.gameOver(); }

    if(this.paused) { this.pauseGame(); }

    if(this.level >= 7) { this.challengerWon(); }

    if(this.ball.dead) {
      this.paddle.paused = true;
      this.lives -= 1;
      this.makeNewBall();
      this.paddle.paused = false;
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
    const brickLeft = brick.xStart;
    const brickRight = brick.xStart + brick.width;

    const brickTop = brick.yStart;
    const brickBottom = brick.yStart + brick.height;

    const ballLeft = this.ball.xStart - this.ball.radius;
    const ballRight = this.ball.xStart + this.ball.radius;

    const ballTop = this.ball.yStart - this.ball.radius;
    const ballBottom = this.ball.yStart + this.ball.radius;

    const hSpeed = this.ball.horizDir;
    const vSpeed = this.ball.vertDir;

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

    return false;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeBricks() {
    const numBricks = 20 + (this.level * 2);

    let firstBrickY = 0;
    let firstBrickX = 0;

    const topOffset = 150;
    const leftOffset = 6;
    let width = 80 - (this.level * 2);
    let height = 15 - (this.level);

    if(width < 65) { width = 65; }
    if(height < 11) { height = 11; }

    let bricks = [];

    for(let i = 0; i < numBricks; i++) {
      let x = (leftOffset + firstBrickX);
      let y = (topOffset + firstBrickY);

      let brick = new Brick(this.ctx, x, y, width, height);
      bricks.push(brick);
      firstBrickX += leftOffset + brick.width;
      if (firstBrickX + 80 > this.canvas.width) {
        firstBrickY += 25;
        firstBrickX = this.getRandomInt(leftOffset, this.canvas.width - 80);
      }
    }

    this.bricks = bricks;
  }
}

module.exports = Game;
