import { CheckWinner } from "./src/js/checkWinner.js";
import { BackgroundWinner } from "./src/js/bgWinner.js";
import { RandomPlayer } from "./src/js/dummyPlayer.js";
import { disableClickedCell, getCellPosition } from "./src/js/utils.js";

// Players
const players = document.querySelectorAll(".player");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
// Cells
const cells = document.querySelectorAll(".cell");
//BTN Restart
const btn = document.querySelector(".btn-restart");
// Overlay
const overlay = document.querySelector(".overlay");
// Mode
const pvrMode = document.querySelector(".toggle");

let tags = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
let matrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const clearGrid = () => {
  cells.forEach(cell => {
    // reset cell values
    cell.innerText = "";
    // add hidden class to overlay
    overlay.classList.add("hidden");
    // enable cells
    if (cell.disabled) cell.disabled = false;
    if (cell.classList.contains("background-winner"))
      cell.classList.remove("background-winner");
  });

  // resetar matrix
  matrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  // resetar tag
  tags = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  // remove background winner class
};

let player1Socore = 0;
let player2Socore = 0;

const playGame = e => {
  const cell = e.target;
  const cellPosition = getCellPosition(cell);
  const tag = tags.shift();
  // fill up the matrix
  matrix[cellPosition[0]].splice(cellPosition[1], 1, tag);
  cell.innerText = tag === "x" ? "X" : "O";
  let winnerObj = new CheckWinner(matrix).whoWon();
  // disable clicked cell
  cell.disabled = true;

  const pvrModeIsChecked = pvrMode.checked;
  // call randon player class
  const randomPlayer = new RandomPlayer(matrix);
  const randPosition = randomPlayer.getRandomPosition();

  if (pvrModeIsChecked && randPosition) {
    // fill up the matrix
    matrix[randPosition[0]].splice(randPosition[1], 1, tags.shift());

    winnerObj = new CheckWinner(matrix).whoWon();

    player1.classList.toggle("bb-teal");
    player2.classList.toggle("bb-teal");

    setTimeout(() => {
      const randomCell = document.querySelector(
        `.cell${randPosition[0]}x${randPosition[1]}`
      );
      randomCell.innerText = "O";
      randomCell.disabled = true;
    }, 500);
  }

  // check for winner or draw

  const winner = winnerObj.winner;
  const draw = winnerObj.draw;

  if (draw) {
    overlay.firstElementChild.innerText = "Draw!";
    overlay.classList.remove("hidden");

    setTimeout(() => {
      clearGrid();
    }, 2000);
  }

  // game finish
  if (winner) {
    disableClickedCell(cells);

    const position = Object.entries(winnerObj)[0];
    // set background depending of the position
    const bgWinner = new BackgroundWinner(position);
    bgWinner.setBackgroundWinner();
    overlay.classList.remove("hidden");

    overlay.firstElementChild.innerText =
      winner === "x" ? "Play 01 Wins!" : "Play 02 Wins!";

    setTimeout(() => {
      if (winner === "x") {
        player1Socore += 1;
        player1.lastElementChild.innerText = player1Socore;
      } else {
        player2Socore += 1;
        player2.lastElementChild.innerText = player2Socore;
      }
      clearGrid();
    }, 2000);
  }
};

//EVENT LISTENERS
players.forEach(player =>
  // swite player border bottom
  player.addEventListener("click", e => {
    const el = e.target;
    if (el.tagName !== "DIV") return;
    const clickedPlayer = el;
    clickedPlayer === player1
      ? player2.classList.remove("bb-teal")
      : player1.classList.remove("bb-teal");
    clickedPlayer.classList.toggle("bb-teal");
  })
);

cells.forEach(cell => cell.addEventListener("click", playGame));

btn.addEventListener("click", () => {
  clearGrid();
  // reset display
  player1.lastElementChild.innerText = "-";
  player2.lastElementChild.innerText = "-";
  player1Socore = 0;
  player2Socore = 0;
});

window.addEventListener("load", () => {
  player1.classList.add("bb-teal");
});
