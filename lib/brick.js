class Brick {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;

    this.xStart = x;
    this.yStart = y;

    this.width = width || 80;
    this.height = height || 20;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.xStart, this.yStart, this.width, this.height);
    this.ctx.fillStyle = "#99493C";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

module.exports = Brick;
