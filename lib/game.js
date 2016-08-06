const Ball = require('./ball.js');



class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("breakoutCanvas");
  let ctx = canvas.getContext("2d");

  var x = canvas.width/2;
  var y = canvas.height-30;
  let ball = new Ball(ctx, x, y, canvas);

  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw.bind(ball)();
  }, 10);

});
