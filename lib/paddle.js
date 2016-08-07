class Paddle {
  constructor(ctx, canvas) {
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

    document.addEventListener("keydown", this.updateMoveState.bind(this) );
    document.addEventListener("keyup", this.resetMoveState.bind(this) );
  }

  drawGradient() {
    let gradient = this.ctx.createLinearGradient(this.xStart, this.yStart, this.width + this.xStart, this.height + this.yStart);

    this.ctx.beginPath();
    gradient.addColorStop(0,'rgba(39, 46, 91, 1)');
    gradient.addColorStop(.125,'rgba(167, 182, 210, 1)');
    gradient.addColorStop(.25,'rgba(39, 46, 91, 1)');
    gradient.addColorStop(.375,'rgba(167, 182, 210, 1)');
    gradient.addColorStop(.5,'rgba(39, 46, 91, 1)');
    gradient.addColorStop(.625,'rgba(167, 182, 210, 1)');
    gradient.addColorStop(.75,'rgba(39, 46, 91, 1)');
    gradient.addColorStop(.875,'rgba(167, 182, 210, 1)');
    gradient.addColorStop(1,'rgba(39, 46, 91, 1)');

    this.ctx.fillStyle = gradient;

    this.ctx.fillRect(this.xStart, this.yStart, this.width, this.height);
    this.ctx.closePath();
  }

  draw() {
    this.calculateMovements();
    this.drawGradient();
  }

  updateMoveState(e) {
    e.preventDefault();
    if(this.paused) { return; }

    if(e.keyCode === 39) {
      this.rightPressed = true;
    } else if(e.keyCode === 37) {
      this.leftPressed = true;
    }
  }

  resetMoveState(e) {
    e.preventDefault();
    if(this.paused) { return; }

    if(e.keyCode === 39) {
      this.rightPressed = false;
    } else if(e.keyCode === 37) {
      this.leftPressed = false;
    }
  }

  calculateMovements() {
    if(this.paused) { return; }

    if (this.rightPressed && !(this.xStart + this.width + this.xSpeed > this.canvas.width)) {
      this.xStart += this.xSpeed;
    } else if (this.leftPressed && !(this.xStart - this.xSpeed < 0)) {
      this.xStart -= this.xSpeed;
    }
  }
}

module.exports = Paddle;
