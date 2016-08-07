class Brick {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.xStart = x;
    this.yStart = y;

    this.width = 80;
    this.height = 20;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
    // this.ctx.fillStyle = "#0095DD";
    this.ctx.fillStyle = "#99493C";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

module.exports = Brick;
