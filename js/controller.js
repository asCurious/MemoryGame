import Elements from "./elements.js";

class Controller {
  constructor(cardsNumber) {
    this.Elements = new Elements(cardsNumber);
    this.prevCard;
    this.clickCard();
    this.startClock = true;
    this.time;
  }

  clickCard() {
    const { attempts, cards } = this.Elements;
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        this.startClock && this.setTime();
        attempts.click++;
        card.classList.add("change");
        if (attempts.click === 2) {
          cards.forEach((card) => {
            card.classList.add("pause");
            setTimeout(() => {
              card.classList.remove("pause");
            }, 1000);
          });
          if (this.prevCard.dataset.index === card.dataset.index) {
            attempts.correct++;
            card.classList.add("stop");
            this.prevCard.classList.add("stop");
          } else {
            attempts.wrong++;
            setTimeout(() => {
              card.classList.remove("change");
              this.prevCard.classList.remove("change");
            }, 1000);
          }
          attempts.click = 0;
          this.endGame(attempts);
          console.log(attempts.correct, attempts.wrong);
        } else {
          this.prevCard = card;
        }
        this.startClock = false;
      });
    });
  }
  endGame({ correct }) {
    const { cardsNumber, modal, modalBtn, wrong, attempts, timer, modalTime } =
      this.Elements;
    if (correct === cardsNumber / 2) {
      console.log("you won!!!");
      this.startClock = true;
      this.stopTime();
      modal.style.cssText = "visibility: visible; opacity: 1";
      const timerClone = timer.cloneNode(true);
      modalTime.append(timerClone);
      modalBtn.onclick = () => location.reload();
    } else {
      console.log("not yet!!!");
    }
  }

  setTime() {
    let int = 1;
    const { timer } = this.Elements;
    this.time = setInterval(() => {
      const seconds = int % 60;
      timer.children[1].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
      const minutes = Math.floor(int / 60);
      timer.children[0].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      int++;
    }, 1000);
  }

  stopTime() {
    clearInterval(this.time);
  }
}

export default Controller;
