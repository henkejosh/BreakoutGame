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

	"use strict";
	
	var Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("breakoutCanvas");
	  var ctx = canvas.getContext("2d");
	  console.log("game)");
	  var game = new Game(canvas, ctx);
	  // var x = canvas.width/2;
	  // var y = canvas.height-30;
	  // let ball = new Ball(ctx, x, y, canvas);
	  // let paddle = new Paddle(ctx, canvas);
	  //
	  // game.ball = ball;
	  // game.paddle = paddle;
	  // game.makeBricks(8);
	  // game.paddle.draw();
	
	  // document.addEventListener("keydown", game.paddle.updateMoveState.bind(game.paddle) );
	  // document.addEventListener("keyup", game.paddle.resetMoveState.bind(game.paddle) );
	
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
	
	var Game = function () {
	  function Game(canvas, ctx) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    this.ctx = ctx;
	
	    this.paddle = new Paddle(ctx, canvas);
	    this.makeNewBall();
	
	    this.lives = 3;
	    this.score = 0;
	    this.level = 1;
	    this.makeBricks();
	  }
	
	  _createClass(Game, [{
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
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {}
	  }, {
	    key: 'drawHeader',
	    value: function drawHeader() {
	      this.drawScore();
	      this.drawLives();
	      this.drawLevel();
	    }
	  }, {
	    key: 'drawLevel',
	    value: function drawLevel() {
	      this.ctx.font = "20px Arial";
	      this.ctx.fillStyle = "orange";
	      this.ctx.fillText("Level: " + this.level, 10, 20);
	    }
	  }, {
	    key: 'drawLives',
	    value: function drawLives() {
	      this.ctx.font = "20px Arial";
	      this.ctx.fillStyle = "green";
	      this.ctx.fillText("Lives: " + this.lives, 200, 20);
	    }
	  }, {
	    key: 'drawScore',
	    value: function drawScore() {
	      this.ctx.font = "20px Arial";
	      this.ctx.fillStyle = "black";
	      var score = this.score + this.ball.bounces;
	
	      this.ctx.fillText("Score: " + score, 400, 20);
	    }
	  }, {
	    key: 'makeNewBall',
	    value: function makeNewBall() {
	      this.ball = new Ball(this.ctx, this.paddle.xStart + this.paddle.width / 2, this.paddle.yStart + this.paddle.height - 15, this.canvas);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      // this.drawScore();
	      this.drawHeader();
	      this.paddle.draw();
	      this.ball.draw();
	
	      this.bricksCleared();
	
	      this.bricks.forEach(function (brick) {
	        brick.draw();
	      });
	
	      if (this.ball.dead) {
	        this.lives -= 1;
	        this.makeNewBall();
	      }
	
	      if (this.ball && this.paddle) {
	        this.ball.handlePaddleCollision(this.paddle);
	      }
	
	      this.allBricksCollision();
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
	
	      var ballTop = this.ball.yStart;
	      var ballBottom = this.ball.yStart + this.ball.radius;
	
	      // top half of ball hits brick
	      if (ballTop < brickBottom && ballTop > brickTop ||
	      // bottom half of ball hits brick
	      ballBottom > brickTop && ballBottom < brickBottom) {
	        // left half of ball hits brick
	        if (ballLeft < brickRight && ballLeft > brickLeft ||
	        // right half of ball hits brick
	        ballRight > brickLeft && ballRight < brickRight) {
	          this.ball.verticalBounce();
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'makeBricks',
	    value: function makeBricks() {
	      var numBricks = 8 + this.level * 2;
	
	      var firstBrickY = 0;
	      var firstBrickX = 0;
	
	      var topOffset = 150;
	      var leftOffset = 10;
	      var bricks = [];
	
	      for (var i = 0; i < numBricks; i++) {
	        var x = leftOffset + firstBrickX;
	        var y = topOffset + firstBrickY;
	
	        var brick = new Brick(this.ctx, x, y);
	        bricks.push(brick);
	        firstBrickX += leftOffset + brick.width;
	        if (firstBrickX + 80 > this.canvas.width) {
	          firstBrickY += 25;
	          firstBrickX = 0;
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
	    this.horizDir = 3;
	    this.canvas = canvas;
	
	    this.moving = false;
	    this.dead = false;
	
	    this.bounces = 0;
	
	    document.addEventListener("keydown", this.updateMoveState.bind(this));
	    document.addEventListener("keyup", this.resetMoveState.bind(this));
	  }
	  //
	  // playBall() {
	  //   if(this.moving === false && this.dead === false) {
	  //     if(e.keyCode === 32) {
	  //       this.moving = true;
	  //     else if(e.keyCode === )
	  //   }
	  // }
	
	  _createClass(Ball, [{
	    key: "updateMoveState",
	    value: function updateMoveState(e) {
	      e.preventDefault();
	      if (this.moving === false && this.dead === false) {
	
	        if (e.keyCode === 32) {
	          this.moving = true;
	        } else if (e.keyCode === 39) {
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
	      if (e.keyCode === 39) {
	        this.rightPressed = false;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = false;
	      }
	    }
	  }, {
	    key: "calculateMovements",
	    value: function calculateMovements() {
	      // debugger;
	      if (this.rightPressed && !(this.xStart + this.radius + 4 > this.canvas.width)) {
	        this.xStart += 4;
	      } else if (this.leftPressed && !(this.xStart - 4 < 0)) {
	        this.xStart -= 4;
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      this.wallsRedirect();
	      this.ctx.beginPath();
	      this.calculateMovements();
	
	      this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI * 2);
	      this.ctx.fillStyle = "#0095DD";
	      this.ctx.fill();
	      this.ctx.closePath();
	
	      if (this.moving) {
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
	      } else if (this.yStart + this.radius + this.vertDir > this.canvas.height) {
	
	        console.log("YOU suck");
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
	          if (this.xStart > paddle.xStart && this.xStart < paddle.xStart + paddle.width) {
	            this.vertDir = -3;
	            this.bounces += 1;
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
	    this.width = 75;
	    this.height = 10;
	
	    this.xStart = (this.canvas.width - this.width) / 2;
	    this.yStart = this.canvas.height - this.height;
	
	    this.xSpeed = 4;
	
	    this.rightPressed = false;
	    this.leftPressed = false;
	
	    document.addEventListener("keydown", this.updateMoveState.bind(this));
	    document.addEventListener("keyup", this.resetMoveState.bind(this));
	  }
	
	  _createClass(Paddle, [{
	    key: "draw",
	    value: function draw() {
	      this.calculateMovements();
	
	      this.ctx.beginPath();
	      this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
	      this.ctx.fillStyle = "#0095DD";
	      this.ctx.fill();
	      this.ctx.closePath();
	    }
	  }, {
	    key: "updateMoveState",
	    value: function updateMoveState(e) {
	      e.preventDefault();
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
	      if (e.keyCode === 39) {
	        this.rightPressed = false;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = false;
	      }
	    }
	  }, {
	    key: "calculateMovements",
	    value: function calculateMovements() {
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
	  function Brick(ctx, x, y) {
	    _classCallCheck(this, Brick);
	
	    this.ctx = ctx;
	
	    this.xStart = x;
	    this.yStart = y;
	
	    this.width = 80;
	    this.height = 20;
	  }
	
	  _createClass(Brick, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx.beginPath();
	      this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
	      this.ctx.fillStyle = "#0095DD";
	      this.ctx.fill();
	      this.ctx.closePath();
	    }
	  }]);
	
	  return Brick;
	}();
	
	module.exports = Brick;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map