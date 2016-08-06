class Paddle {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = 75;
    this.height = 10;

    this.xStart = (this.canvas.width - this.width) / 2;
    this.yStart = this.canvas.height - this.height;

    this.rightPressed = false;
    this.leftPressed = false;
  }

  draw() {
    this.calculateMovements();

    this.ctx.beginPath();
    this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  updateMoveState(e) {
    // debugger;
    e.preventDefault();
    if(e.keyCode === 39) {
      this.rightPressed = true;
    } else if(e.keyCode === 37) {
      this.leftPressed = true;
    }
  }

  resetMoveState(e) {
    e.preventDefault();
    if(e.keyCode === 39) {
      this.rightPressed = false;
    } else if(e.keyCode === 37) {
      this.leftPressed = false;
    }
  }

  calculateMovements() {
    if (this.rightPressed && !(this.xStart + this.rightPressed + this.width > this.canvas.width)) {
      this.xStart += 4;
    } else if (this.leftPressed && !(this.xStart - this.rightPressed - this.width < 0)) {
      this.xStart -= 4;
    }
  }
}

module.exports = Paddle;
