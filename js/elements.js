class Elements {
  constructor(cardsNumber) {
    this.cardsNumber = cardsNumber;
    this.playground = document.querySelector(".playground");
    this.cardsIndex = [];
    this.doubleIndex();
    this.createCard();

    this.cards = document.querySelectorAll(".card");
    this.attempts = {
      correct: 0,
      wrong: 0,
      click: 0,
    };

    this.modal = document.querySelector(".modal");
    this.modalBtn = document.querySelector(".modal_btn");
    this.wrong = document.querySelector(".wrong");
    this.restartBtn = document.querySelector(".restart_btn");
    this.timer = document.querySelector(".timer");
    this.modalTime = document.querySelector(".modal_time");
    this.restartGame();
  }

  shuffleIndexes(arrey) {
    return arrey.sort(() => Math.random() - 0.5);
  }

  doubleIndex() {
    for (let i = 1; i <= this.cardsNumber; i++) {
      i <= this.cardsNumber / 2
        ? this.cardsIndex.push(i)
        : this.cardsIndex.push(i - this.cardsNumber / 2);
    }
  }
  createCard() {
    this.playground.style.gridTemplateRows = `repeat(${Math.sqrt(
      this.cardsNumber
    )}, 1fr)`;
    this.playground.style.gridTemplateColumns = `repeat(${Math.sqrt(
      this.cardsNumber
    )}, 1fr)`;
    this.shuffleIndexes(this.cardsIndex).forEach((index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-index", index);
      const img = document.createElement("img");
      img.src = `/image/pic-${index}.png`;
      card.append(img);
      this.playground.append(card);
    });
  }

  restartGame() {
    this.restartBtn.onclick = () => {
      this.modal.style.cssText =
        "visibility: visible; opacity: 1; transition: opacity .5s";
      const modalContent = this.modal.firstElementChild;
      modalContent.innerHTML =
        "<h2 class= 'modal_text'>میخوای از بازی خارج بشی؟</h2><div><button class= 'btn yes_btn'>بله</button><button class= 'btn cancel_btn'>خیر</button></div>";
      modalContent.style.cssText = "height: 20rem";
      modalContent.querySelector(".cancel_btn").onclick = () => {
        this.modal.style.cssText =
          "visibility: hidden; opacity: 0; transition: opacity .5s";
      };
      modalContent.querySelector(".yes_btn").onclick = () => {
        location.reload();
      };
    };
  }
}

export default Elements;
