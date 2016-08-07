const Game = require('./lib/game.js');
const Instructions = require('./lib/instructions_modal.js');


document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("breakoutCanvas");
  let ctx = canvas.getContext("2d");
  console.log("game)");
  let game = new Game(canvas, ctx);

  let instructions = new Instructions();

  // var x = canvas.width/2;
  // var y = canvas.height-30;
  // let ball = new Ball(ctx, x, y, canvas);
  // let paddle = new Paddle(ctx, canvas);
  //
  // game.ball = ball;
  // game.paddle = paddle;
  // game.makeBricks(8);
  // game.paddle.draw();

  document.addEventListener("keydown", game.handleKeyStroke.bind(game));

  // document.addEventListener("keydown", game.paddle.updateMoveState.bind(game.paddle) );
  // document.addEventListener("keyup", game.paddle.resetMoveState.bind(game.paddle) );

  setInterval(game.draw.bind(game), 10);

});
