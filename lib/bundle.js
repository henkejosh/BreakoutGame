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
	
	// const Ball = require('./lib/ball.js');
	// const Paddle = require('./lib/paddle.js');
	// const Brick = require('./lib/brick.js');
	var Game = __webpack_require__(4);
	
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
	  game.paddle.draw();
	
	  document.addEventListener("keydown", game.paddle.updateMoveState.bind(game.paddle));
	  document.addEventListener("keyup", game.paddle.resetMoveState.bind(game.paddle));
	
	  setInterval(game.draw.bind(game), 10);
	});

/***/ },
/* 1 */
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
	  }
	
	  _createClass(Ball, [{
	    key: "draw",
	    value: function draw() {
	      this.wallsRedirect();
	      this.ctx.beginPath();
	      this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI * 2);
	      this.ctx.fillStyle = "#0095DD";
	      this.ctx.fill();
	      this.ctx.closePath();
	      this.xStart += this.horizDir;
	      this.yStart += this.vertDir;
	    }
	  }, {
	    key: "wallsRedirect",
	    value: function wallsRedirect() {
	      if (this.yStart - this.radius + this.vertDir < 0) {
	        this.verticalBounce();
	      } else if (this.yStart + this.radius + this.vertDir > this.canvas.height) {
	        // alert("You suck!");
	        console.log("YOU suck");
	        // document.location.reload();
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
	      if (this.yStart + this.radius + this.vertDir >= paddle.yStart) {
	        if (this.xStart > paddle.xStart && this.xStart < paddle.xStart + paddle.width) {
	          this.verticalBounce();
	        }
	      }
	    }
	  }]);
	
	  return Ball;
	}();
	
	module.exports = Ball;

/***/ },
/* 2 */
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
	      // debugger;
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
/* 3 */
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = __webpack_require__(1);
	var Paddle = __webpack_require__(2);
	var Brick = __webpack_require__(3);
	
	var Game = function () {
	  function Game(canvas, ctx) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    this.ctx = ctx;
	
	    var x = canvas.width / 2;
	    var y = canvas.height - 30;
	    this.ball = new Ball(ctx, x, y, canvas);
	    this.paddle = new Paddle(ctx, canvas);
	    this.makeBricks(8);
	  }
	
	  _createClass(Game, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	      if (this.ball) {
	        this.ball.draw.bind(this.ball)();
	      }
	      if (this.paddle) {
	        this.paddle.draw.bind(this.paddle)();
	      }
	      if (this.bricks) {
	        this.bricks.forEach(function (brick) {
	          brick.draw();
	        });
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
	    value: function makeBricks(numBricks) {
	      var firstBrickY = 0;
	      var firstBrickX = 0;
	
	      var topOffset = 10;
	      var leftOffset = 10;
	      var bricks = [];
	
	      for (var i = 0; i < numBricks; i++) {
	        var x = leftOffset + firstBrickX;
	
	        var brick = new Brick(this.ctx, x, firstBrickY);
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map