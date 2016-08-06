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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = __webpack_require__(1);
	var Paddle = __webpack_require__(2);
	
	var Game = function () {
	  function Game(canvas, ctx) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    this.ctx = ctx;
	  }
	
	  _createClass(Game, [{
	    key: 'draw',
	    value: function draw() {
	      if (this.ball) {
	        this.ball.draw.bind(this.ball)();
	      }
	      if (this.paddle) {
	        this.paddle.draw.bind(this.paddle)();
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("breakoutCanvas");
	  var ctx = canvas.getContext("2d");
	
	  var x = canvas.width / 2;
	  var y = canvas.height - 30;
	  var game = new Game(canvas, ctx);
	  var ball = new Ball(ctx, x, y, canvas);
	  var paddle = new Paddle(ctx, canvas);
	
	  game.ball = ball;
	  game.paddle = paddle;
	
	  document.addEventListener("keydown", paddle.updateMoveState.bind(paddle));
	  document.addEventListener("keyup", paddle.resetMoveState.bind(paddle));
	
	  setInterval(function () {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    // ball.draw.bind(ball)();
	    game.draw();
	  }, 10);
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
	    this.vertDir = -1;
	    this.horizDir = 1;
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
	        this.vertDir = 1;
	      }
	
	      if (this.xStart - this.radius + this.horizDir < 0) {
	        this.horizDir = 1;
	      } else if (this.xStart + this.radius + this.horizDir > this.canvas.width) {
	        this.horizDir = -1;
	      }
	    }
	  }, {
	    key: "objectCollision",
	    value: function objectCollision(object) {}
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
	      if (this.rightPressed && !(this.xStart + this.rightPressed + this.width > this.canvas.width)) {
	        this.xStart += 4;
	      } else if (this.leftPressed && !(this.xStart - this.rightPressed - this.width < 0)) {
	        this.xStart -= 4;
	      }
	    }
	  }]);
	
	  return Paddle;
	}();
	
	module.exports = Paddle;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map