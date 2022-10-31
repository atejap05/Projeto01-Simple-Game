// POSICOES
const ROWS_COORDS = [
  ["0x0", "0x1", "0x2"],
  ["1x0", "1x1", "1x2"],
  ["2x0", "2x1", "2x2"],
];
const COLS_COORDS = [
  ["0x0", "1x0", "2x0"],
  ["0x1", "1x1", "2x1"],
  ["0x2", "1x2", "2x2"],
];
const DP_COORDS = ["0x0", "1x1", "2x2"];
const DS_COORDS = ["0x2", "1x1", "2x0"];

export class BackgroundWinner {
  constructor(position) {
    this.ROWS_COORDS = ROWS_COORDS;
    this.COLS_COORDS = COLS_COORDS;
    this.DP_COORDS = DP_COORDS;
    this.DS_COORDS = DS_COORDS;
    //FIXME: position[1] para as diagonais nao é um id é um boolean
    this.idx = position[1];
    this.position = position[0];
  }

  applayBackground = arr => {
    arr.forEach(coord => {
      document
        .querySelector(`.cell${coord}`)
        .classList.add("background-winner");
    });
  };

  switchMatrix = arr => {
    switch (this.idx) {
      case 0:
        this.applayBackground(arr[0]);
        break;

      case 1:
        this.applayBackground(arr[1]);
        break;

      case 2:
        this.applayBackground(arr[2]);
        break;
      default:
        // case this.idx is a boolean value
        break;
    }
  };

  setBackgroundWinner = () => {
    switch (this.position) {
      case "dp":
        this.applayBackground(this.DP_COORDS);
        break;
      case "ds":
        this.applayBackground(this.DS_COORDS);
        break;
      case "rowIdx":
        this.switchMatrix(this.ROWS_COORDS);
        break;
      case "colIdx":
        this.switchMatrix(this.COLS_COORDS);
      default:
        break;
    }
  };
}
