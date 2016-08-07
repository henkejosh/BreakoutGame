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

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(this.ball) { this.ball.draw.bind(this.ball)(); }
    if(this.paddle) { this.paddle.draw.bind(this.paddle)(); }
    if(this.bricks) {
      this.bricks.forEach( brick => {
        brick.draw();
      });
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

    const topOffset = 10;
    const leftOffset = 10;
    let bricks = [];

    for(let i = 0; i < numBricks; i++) {
      let x = (leftOffset + firstBrickX);

      let brick = new Brick(this.ctx, x, firstBrickY);
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
//
// document.addEventListener("DOMContentLoaded", function() {
//   let canvas = document.getElementById("breakoutCanvas");
//   let ctx = canvas.getContext("2d");
//   console.log("game)");
//   let game = new Game(canvas, ctx);
//   debugger;
//   // var x = canvas.width/2;
//   // var y = canvas.height-30;
//   // let ball = new Ball(ctx, x, y, canvas);
//   // let paddle = new Paddle(ctx, canvas);
//   //
//   // game.ball = ball;
//   // game.paddle = paddle;
//   // game.makeBricks(8);
//   game.paddle.draw();
//
//   document.addEventListener("keydown", game.paddle.updateMoveState.bind(game.paddle) );
//   document.addEventListener("keyup", game.paddle.resetMoveState.bind(game.paddle) );
//
//   setInterval(game.draw.bind(game)(), 10);
//
// });


module.exports = Game;
