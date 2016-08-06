const Ball = require('./ball.js');
const Paddle = require('./paddle.js');



class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {
    if(this.ball) { this.ball.draw.bind(this.ball)(); }
    if(this.paddle) { this.paddle.draw.bind(this.paddle)(); }

    if(this.ball && this.paddle) {
      this.ball.handlePaddleCollision(this.paddle);
    }
  }

  ballCollision(object) {

  }
}

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("breakoutCanvas");
  let ctx = canvas.getContext("2d");

  var x = canvas.width/2;
  var y = canvas.height-30;
  let game = new Game(canvas, ctx);
  let ball = new Ball(ctx, x, y, canvas);
  let paddle = new Paddle(ctx, canvas);

  game.ball = ball;
  game.paddle = paddle;

  document.addEventListener("keydown", paddle.updateMoveState.bind(paddle) );
  document.addEventListener("keyup", paddle.resetMoveState.bind(paddle) );

  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw();

  }, 10);

});
