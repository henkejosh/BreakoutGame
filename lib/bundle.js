/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	var Instructions = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("breakoutCanvas");
	  var ctx = canvas.getContext("2d");
	
	  var game = new Game(canvas, ctx);
	
	  var instructions = new Instructions();
	
	  document.addEventListener("keydown", game.handleKeyStroke.bind(game));
	
	  // game.paddle.draw();
	  game.drawBackgroundImage();
	  setInterval(game.draw.bind(game), 10);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = __webpack_require__(2);
	var Paddle = __webpack_require__(3);
	var Brick = __webpack_require__(4);
	var Instructions = __webpack_require__(5);
	var LevelDetails = __webpack_require__(6);
	
	var Game = function () {
	  function Game(canvas, ctx) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    this.ctx = ctx;
	
	    this.paddle = new Paddle(ctx, canvas);
	    this.makeNewBall();
	
	    this.lives = 5;
	    this.score = 0;
	    this.level = 1;
	    this.makeBricks();
	
	    this.instructions = new Instructions();
	    this.paused = false;
	
	    this.newGameButton = document.getElementById("newGame");
	    this.newGameButton.addEventListener("click", this.newGame.bind(this));
	  }
	
	  _createClass(Game, [{
	    key: 'newGame',
	    value: function newGame() {
	      this.lives = 5;
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
	  }, {
	    key: 'pauseGame',
	    value: function pauseGame() {
	      this.ball.paused = this.paused;
	      this.paddle.paused = this.paused;
	      this.instructions.openModal();
	    }
	  }, {
	    key: 'handleKeyStroke',
	    value: function handleKeyStroke(e) {
	      e.preventDefault();
	      if (e.keyCode === 13) {
	        this.handlePause();
	      }
	    }
	  }, {
	    key: 'handlePause',
	    value: function handlePause() {
	      this.instructions.openCloseModal();
	      this.paused = !this.paused;
	      this.ball.paused = this.paused;
	      this.paddle.paused = this.paused;
	    }
	  }, {
	    key: 'challengerWon',
	    value: function challengerWon() {
	      this.paused = true;
	      this.instructions.header = "Congrats, you won! Play again?";
	    }
	  }, {
	    key: 'goToNextLevel',
	    value: function goToNextLevel() {
	      this.level += 1;
	      this.makeBricks();
	      this.makeNewBall();
	    }
	  }, {
	    key: 'bricksCleared',
	    value: function bricksCleared() {
	      if (this.bricks.length === 0) {
	        this.goToNextLevel();
	        this.drawBackgroundImage();
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      this.paused = true;
	      this.instructions.header = "GAME OVER!";
	    }
	  }, {
	    key: 'drawHeader',
	    value: function drawHeader() {
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
	  }, {
	    key: 'drawBackgroundImage',
	    value: function drawBackgroundImage() {
	      var canvas2 = document.getElementById("backgroundCanvas");
	      var ctx2 = canvas2.getContext('2d');
	      var image = new Image();
	
	      image.src = LevelDetails[this.level].image;
	
	      ctx2.drawImage(image, 0, 0, canvas2.width, canvas2.height);
	    }
	  }, {
	    key: 'drawLevel',
	    value: function drawLevel() {
	      this.ctx.font = "20px monospace";
	      this.ctx.fillStyle = "orange";
	      this.ctx.fillText("Level: " + this.level, 10, 20);
	    }
	  }, {
	    key: 'drawLives',
	    value: function drawLives() {
	      this.ctx.font = "20px monospace";
	      this.ctx.fillStyle = "green";
	      this.ctx.fillText("Balls: " + this.lives, 10, 50);
	    }
	  }, {
	    key: 'drawScore',
	    value: function drawScore() {
	      this.ctx.font = "20px monospace";
	      this.ctx.fillStyle = "blue";
	
	      var score = this.score + this.ball.bounces;
	      this.ctx.fillText("Score: " + score, 10, 80);
	    }
	  }, {
	    key: 'drawLevelTitle',
	    value: function drawLevelTitle() {
	      this.ctx.font = "30px monospace";
	      this.ctx.fillStyle = "black";
	      this.ctx.fillText('' + LevelDetails[this.level].name, 200, 58);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	      this.drawHeader();
	      this.paddle.draw();
	      this.ball.draw();
	
	      this.bricksCleared();
	      this.drawBackgroundImage();
	
	      this.bricks.forEach(function (brick) {
	        brick.draw();
	      });
	
	      if (this.ball.moving === false) {
	        this.tieBallToPaddle();
	      }
	
	      if (this.lives <= 0) {
	        this.gameOver();
	      }
	
	      if (this.paused) {
	        this.pauseGame();
	      }
	
	      if (this.level >= 7) {
	        this.challengerWon();
	      }
	
	      if (this.ball.dead) {
	        this.paddle.paused = true;
	        this.lives -= 1;
	        this.makeNewBall();
	        this.paddle.paused = false;
	      }
	
	      if (this.ball && this.paddle) {
	        this.ball.handlePaddleCollision(this.paddle);
	      }
	
	      this.allBricksCollision();
	    }
	  }, {
	    key: 'makeNewBall',
	    value: function makeNewBall() {
	      this.ball = new Ball(this.ctx, this.paddle.xStart + this.paddle.width / 2, this.paddle.yStart + this.paddle.height - 15, this.canvas);
	    }
	  }, {
	    key: 'tieBallToPaddle',
	    value: function tieBallToPaddle() {
	      this.ball.xStart = this.paddle.xStart + this.paddle.width / 2;
	      this.ball.yStart = this.paddle.yStart + this.paddle.height - 15;
	    }
	  }, {
	    key: 'allBricksCollision',
	    value: function allBricksCollision() {
	      var _this = this;
	
	      this.bricks.forEach(function (brick, idx) {
	        var that = _this;
	        if (_this.checkBrickCollision(brick)) {
	          that.bricks.splice(idx, 1);
	          that.score += 10;
	          return;
	        }
	      });
	    }
	  }, {
	    key: 'checkBrickCollision',
	    value: function checkBrickCollision(brick) {
	      var brickLeft = brick.xStart;
	      var brickRight = brick.xStart + brick.width;
	
	      var brickTop = brick.yStart;
	      var brickBottom = brick.yStart + brick.height;
	
	      var ballLeft = this.ball.xStart - this.ball.radius;
	      var ballRight = this.ball.xStart + this.ball.radius;
	
	      var ballTop = this.ball.yStart - this.ball.radius;
	      var ballBottom = this.ball.yStart + this.ball.radius;
	
	      var hSpeed = this.ball.horizDir;
	      var vSpeed = this.ball.vertDir;
	
	      // VERTICAL BOUNCE
	      // hits bottom of brick
	      if (ballTop <= brickBottom && ballTop > brickTop + 8 ||
	      // hits top of brick
	      ballBottom >= brickTop && ballBottom < brickBottom - 8) {
	        // left half of ball hits brick
	        if (ballLeft <= brickRight && ballLeft > brickLeft ||
	        // right half of ball hits brick
	        ballRight >= brickLeft && ballRight < brickRight) {
	          this.ball.verticalBounce();
	          return true;
	        }
	        // HORIZONTAL BOUNCE
	        // left half of ball hits brick
	      } else if (ballLeft <= brickRight && ballLeft > brickLeft + 8 ||
	      // right half of ball hits brick
	      ballRight > brickLeft && ballRight < brickRight - 8) {
	        // top hits bottom of brick
	        if (ballTop <= brickBottom && ballTop > brickTop ||
	        // bottom hits top of brick
	        ballBottom >= brickTop && ballBottom < brickBottom) {
	          this.ball.horizontalBounce();
	          return true;
	        }
	      }
	
	      return false;
	    }
	  }, {
	    key: 'getRandomInt',
	    value: function getRandomInt(min, max) {
	      min = Math.ceil(min);
	      max = Math.floor(max);
	      return Math.floor(Math.random() * (max - min)) + min;
	    }
	  }, {
	    key: 'makeBricks',
	    value: function makeBricks() {
	      var numBricks = 20 + this.level * 2;
	
	      var firstBrickY = 0;
	      var firstBrickX = 0;
	
	      var topOffset = 150;
	      var leftOffset = 6;
	      var width = 80 - this.level * 2;
	      var height = 15 - this.level;
	
	      if (width < 65) {
	        width = 65;
	      }
	      if (height < 11) {
	        height = 11;
	      }
	
	      var bricks = [];
	
	      for (var i = 0; i < numBricks; i++) {
	        var x = leftOffset + firstBrickX;
	        var y = topOffset + firstBrickY;
	
	        var brick = new Brick(this.ctx, x, y, width, height);
	        bricks.push(brick);
	        firstBrickX += leftOffset + brick.width;
	        if (firstBrickX + 80 > this.canvas.width) {
	          firstBrickY += 25;
	          firstBrickX = this.getRandomInt(leftOffset, this.canvas.width - 80);
	        }
	      }
	
	      this.bricks = bricks;
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = function () {
	  function Ball(ctx, xStart, yStart, canvas) {
	    _classCallCheck(this, Ball);
	
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
	
	  _createClass(Ball, [{
	    key: "updateMoveState",
	    value: function updateMoveState(e) {
	      e.preventDefault();
	      if (this.paused) {
	        return;
	      }
	
	      if (this.moving === false && this.dead === false) {
	
	        if (e.keyCode === 32) {
	          if (this.rightPressed) {
	            this.horizDir = 3;
	          } else if (this.leftPressed) {
	            this.horizDir = -3;
	          }
	          this.moving = true;
	          this.rightPressed = false;
	          this.leftPressed = false;
	        } else if (e.keyCode === 39) {
	          this.rightPressed = true;
	        } else if (e.keyCode === 37) {
	          this.leftPressed = true;
	        }
	      } else if (this.moving === true && this.dead === false) {
	        if (e.keyCode === 39) {
	          this.rightPressed = true;
	        } else if (e.keyCode === 37) {
	          this.leftPressed = true;
	        }
	      }
	    }
	  }, {
	    key: "resetMoveState",
	    value: function resetMoveState(e) {
	      e.preventDefault();
	      if (this.paused) {
	        return;
	      }
	
	      if (e.keyCode === 39) {
	        this.rightPressed = false;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = false;
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      this.wallsRedirect();
	
	      this.ctx.beginPath();
	      this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI * 2);
	
	      this.ctx.shadowColor = "#FFFFFF";
	      this.ctx.shadowOffsetX = 0;
	      this.ctx.shadowOffsetY = 0;
	      this.ctx.shadowBlur = 10;
	
	      this.ctx.fillStyle = "#EAF922";
	      this.ctx.fill();
	      this.ctx.closePath();
	
	      if (this.moving && !this.paused) {
	        this.xStart += this.horizDir;
	        this.yStart += this.vertDir;
	      }
	    }
	  }, {
	    key: "killBall",
	    value: function killBall() {
	      this.radius = 0;
	      this.dead = true;
	      this.moving = false;
	    }
	  }, {
	    key: "wallsRedirect",
	    value: function wallsRedirect() {
	      if (this.yStart - this.radius + this.vertDir < 100) {
	        this.verticalBounce();
	      } else if (this.yStart + this.vertDir - this.radius > this.canvas.height + 13) {
	
	        this.killBall();
	      }
	
	      if (this.xStart - this.radius + this.horizDir < 0) {
	        this.horizontalBounce();
	      } else if (this.xStart + this.radius + this.horizDir > this.canvas.width) {
	        this.horizontalBounce();
	      }
	    }
	  }, {
	    key: "verticalBounce",
	    value: function verticalBounce() {
	      this.vertDir *= -1;
	    }
	  }, {
	    key: "horizontalBounce",
	    value: function horizontalBounce() {
	      this.horizDir *= -1;
	    }
	  }, {
	    key: "handlePaddleCollision",
	    value: function handlePaddleCollision(paddle) {
	      if (this.moving === true) {
	        if (this.yStart + this.radius + this.vertDir >= paddle.yStart) {
	          if (this.xStart + this.radius > paddle.xStart && this.xStart < paddle.xStart + paddle.width || this.xStart - this.radius < paddle.xStart + paddle.width && this.xStart > paddle.xStart) {
	
	            // not passed the bpaddle
	            if (!(this.yStart + this.radius > paddle.yStart + 2)) {
	              // both moving left
	              if (this.leftPressed) {
	                this.horizDir -= 1;
	                // both moving right
	              } else if (this.rightPressed) {
	                this.horizDir += 1;
	              }
	
	              if (this.horizDir < -4) {
	                this.horizDir = -4;
	              } else if (this.horizDir > 4) {
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
	  }]);
	
	  return Ball;
	}();
	
	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Paddle = function () {
	  function Paddle(ctx, canvas) {
	    _classCallCheck(this, Paddle);
	
	    this.ctx = ctx;
	    this.canvas = canvas;
	    this.width = 95;
	    this.height = 10;
	
	    this.xStart = (this.canvas.width - this.width) / 2;
	    this.yStart = this.canvas.height - this.height - 10;
	
	    this.xSpeed = 4;
	
	    this.rightPressed = false;
	    this.leftPressed = false;
	
	    this.paused = false;
	
	    document.addEventListener("keydown", this.updateMoveState.bind(this));
	    document.addEventListener("keyup", this.resetMoveState.bind(this));
	  }
	
	  _createClass(Paddle, [{
	    key: "drawGradient",
	    value: function drawGradient() {
	      var gradient = this.ctx.createLinearGradient(this.xStart, this.yStart, this.width + this.xStart, this.height + this.yStart);
	
	      this.ctx.beginPath();
	      gradient.addColorStop(0, 'rgba(39, 46, 91, 1)');
	      gradient.addColorStop(.125, 'rgba(167, 182, 210, 1)');
	      gradient.addColorStop(.25, 'rgba(39, 46, 91, 1)');
	      gradient.addColorStop(.375, 'rgba(167, 182, 210, 1)');
	      gradient.addColorStop(.5, 'rgba(39, 46, 91, 1)');
	      gradient.addColorStop(.625, 'rgba(167, 182, 210, 1)');
	      gradient.addColorStop(.75, 'rgba(39, 46, 91, 1)');
	      gradient.addColorStop(.875, 'rgba(167, 182, 210, 1)');
	      gradient.addColorStop(1, 'rgba(39, 46, 91, 1)');
	
	      this.ctx.fillStyle = gradient;
	
	      this.ctx.fillRect(this.xStart, this.yStart, this.width, this.height);
	      this.ctx.closePath();
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      this.calculateMovements();
	      this.drawGradient();
	    }
	  }, {
	    key: "updateMoveState",
	    value: function updateMoveState(e) {
	      e.preventDefault();
	      if (this.paused) {
	        return;
	      }
	
	      if (e.keyCode === 39) {
	        this.rightPressed = true;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = true;
	      }
	    }
	  }, {
	    key: "resetMoveState",
	    value: function resetMoveState(e) {
	      e.preventDefault();
	      if (this.paused) {
	        return;
	      }
	
	      if (e.keyCode === 39) {
	        this.rightPressed = false;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = false;
	      }
	    }
	  }, {
	    key: "calculateMovements",
	    value: function calculateMovements() {
	      if (this.paused) {
	        return;
	      }
	
	      if (this.rightPressed && !(this.xStart + this.width + this.xSpeed > this.canvas.width)) {
	        this.xStart += this.xSpeed;
	      } else if (this.leftPressed && !(this.xStart - this.xSpeed < 0)) {
	        this.xStart -= this.xSpeed;
	      }
	    }
	  }]);
	
	  return Paddle;
	}();
	
	module.exports = Paddle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Brick = function () {
	  function Brick(ctx, x, y, width, height) {
	    _classCallCheck(this, Brick);
	
	    this.ctx = ctx;
	
	    this.xStart = x;
	    this.yStart = y;
	
	    this.width = width || 80;
	    this.height = height || 20;
	  }
	
	  _createClass(Brick, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx.beginPath();
	      this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
	      this.ctx.fillStyle = "#99493C";
	      this.ctx.fill();
	      this.ctx.closePath();
	    }
	  }]);
	
	  return Brick;
	}();
	
	module.exports = Brick;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Instructions = function () {
	  function Instructions() {
	    _classCallCheck(this, Instructions);
	
	    this.element = document.getElementById("instructionsModal");
	    this.header = "PAUSED";
	    this.open = false;
	    this.headerEl = document.getElementById("ModalHeader");
	  }
	
	  _createClass(Instructions, [{
	    key: "openModal",
	    value: function openModal() {
	      if (this.open === false) {
	        this.element.style.display = "block";
	        this.element.style.padding = "10px 50px";
	        this.headerEl.innerText = this.header;
	        this.open = true;
	      }
	    }
	  }, {
	    key: "openCloseModal",
	    value: function openCloseModal() {
	      if (this.open) {
	        this.closeModal();
	      } else if (this.open === false) {
	        this.openModal();
	      }
	    }
	  }, {
	    key: "closeModal",
	    value: function closeModal() {
	      if (this.open) {
	        this.element.style.display = "none";
	        this.open = false;
	      }
	    }
	  }]);
	
	  return Instructions;
	}();
	
	module.exports = Instructions;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var LevelDetails = {
	  1: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470597072/DC.jpg",
	    name: "National Mall, Washington, DC"
	  },
	  2: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470597072/grand_canyon.jpg",
	    name: "Grand Canyon National Park"
	  },
	  3: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470597072/yellowstone.jpg",
	    name: "Yellowstone National Park"
	  },
	  4: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470605787/Serengeti.jpg",
	    name: "Serengeti National Park, Tanzania"
	  },
	  5: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470605849/coney_island.jpg",
	    name: "Coney Island Boardwalk, NYC"
	  },
	  6: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470597072/yosemite.jpg",
	    name: "Yosemite National Park"
	  },
	  7: {
	    image: "https://res.cloudinary.com/dg2yejdpt/image/upload/v1470597072/yosemite.jpg",
	    name: "Yosemite National Park 2"
	  }
	};
	
	module.exports = LevelDetails;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map