import Controller from "./controller.js";

const selectCellsNumber = document.querySelector(".select_cells_number");
const game = new Controller(selectCellsNumber.value);

const timerContent = "<span>00</span>دقیه <span>00</span>ثانیه";
let prevGame;

selectCellsNumber.addEventListener("change", (e) => {
  document.querySelector(".playground").innerHTML = "";

  game.stopTime();
  game.Elements.timer.innerHTML = timerContent;
  prevGame && prevGame.stopTime();
  prevGame && (prevGame.innerHTML = timerContent);

  const newGame = new Controller(e.target.value);

  prevGame = newGame;
});
