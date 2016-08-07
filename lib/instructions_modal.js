
class Instructions {
  constructor() {
    this.element = document.getElementById("instructionsModal");
    this.header = "PAUSED";
    this.open = false;
    this.headerEl = document.getElementById("ModalHeader");
  }

  openModal() {
    if (this.open === false) {
      this.element.style.display = "block";
      this.element.style.padding = "10px 50px";
      this.headerEl.innerText = this.header;
      this.open = true;
    }
  }

  openCloseModal() {
    if(this.open) {
      this.closeModal();
    } else if (this.open === false) {
      this.openModal();
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
