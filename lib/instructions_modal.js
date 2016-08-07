
class Instructions {
  constructor() {
    this.element = document.getElementById("instructionsModal");
    this.open = false;
  }

  openModal() {
    if (this.open === false) {
      this.element.style.display = "block";
      this.open = true;
    }
  }

  openCloseModal() {
    if(this.open) {
      this.element.style.display = "none";
      this.open = false;
    } else if (this.open === false) {
      this.element.style.display = "block";
      this.element.style.padding = "10px 50px";
      this.open = true;
    }
  }

  closeModal() {
    if(this.open) {
      this.element.style.display = "none";
      this.open = false;
    }
  }
}

module.exports = Instructions;
