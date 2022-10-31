import { CheckWinner } from "./src/js/checkWinner.js";
import { BackgroundWinner } from "./src/js/bgWinner.js";

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

let tags = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
let matrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let player1Socore = 0;
let player2Socore = 0;

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

const switchMarkup = e => {
  const cell = e.target;
  // TODO: criar funcao getCellPosition
  const cellPosition = cell.classList[1]
    .slice(4, 7)
    .split("x")
    .map(idx => +idx);

  const tag = tags.shift();

  // fill up the matrix
  matrix[cellPosition[0]].splice(cellPosition[1], 1, tag);
  cell.innerText = tag === "x" ? "X" : "O";

  // disable clicked cell
  cell.disabled = true;

  // check for winner or draw
  const winnerObj = new CheckWinner(matrix).whoWon();
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

cells.forEach(cell => cell.addEventListener("click", switchMarkup));

btn.addEventListener("click", () => {
  clearGrid();
  // reset display
  player1.lastElementChild.innerText = "-";
  player2.lastElementChild.innerText = "-";
  player1Socore = 0;
  player2Socore = 0;
});

// ON LOAD EVENTS
window.addEventListener("load", () => {
  player1.classList.add("bb-teal");
});
