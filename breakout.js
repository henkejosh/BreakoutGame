const Game = require('./lib/game.js');
const Instructions = require('./lib/instructions_modal.js');

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("breakoutCanvas");
  let ctx = canvas.getContext("2d");

  let game = new Game(canvas, ctx);

  let instructions = new Instructions();

  document.addEventListener("keydown", game.handleKeyStroke.bind(game));

  setInterval(game.draw.bind(game), 10);
});
