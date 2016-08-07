class Paddle {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = 75;
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
    let gradient = this.ctx.createLinearGradient(this.xStart, this.yStart, this.width + this.xStart, 0);

    this.ctx.beginPath();
    gradient.addColorStop(0,'red');
    // gradient.addColorStop(.5,'rgb(0,255,0)');
    gradient.addColorStop(1,'blue');

    // this.ctx.rect(this.xStart, this.yStart, this.width, this.height);

    // this.ctx.rect(this.xStart, this.yStart, 80, 100);
    this.ctx.fillStyle = gradient;
    // this.ctx.fill();
    this.ctx.fillRect(this.xStart, this.yStart, this.width, this.height);
    this.ctx.closePath();
  }

  draw() {
    this.calculateMovements();
    this.drawGradient();
    // this.ctx.beginPath();
    // this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
    // this.ctx.fillStyle = "#336EBD";
    // this.ctx.fill();
    // this.ctx.closePath();
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
