export class CheckWinner {
  constructor(matrix) {
    this.matrix = matrix;
  }

  getMainDiagonal = () => {
    return this.matrix.map((row, i) => row[i]);
  };

  getSecDiagonal = () => {
    const rowArr = this.matrix.map((row, i) => {
      return [...row].reverse()[i];
    });
    return rowArr.reverse();
  };

  getColsMatrix = () => {
    const cols = [];
    for (let i = 0; i <= 2; i++) {
      const col = [];
      for (let j = 0; j <= 2; j++) {
        col.push(this.matrix[j][i]);
      }
      cols.push(col);
    }
    return cols;
  };

  gameOver = () => {
    return this.matrix.flat().every(value => value === "x" || value === "o");
  };

  getWinnerDetails = () => {
    const colsMatrix = this.getColsMatrix();
    const mainDiagonal = this.getMainDiagonal();
    const secDiagonal = this.getSecDiagonal();

    const winnerDetails = {};
    // checa rows and cols
    this.matrix.forEach((row, idx) => {
      if (row.every(value => value === "x")) {
        winnerDetails.rowIdx = idx;
        winnerDetails.winner = "x";
      } else if (row.every(value => value === "o")) {
        winnerDetails.rowIdx = idx;
        winnerDetails.winner = "o";
      }
    });

    colsMatrix.forEach((col, idx) => {
      if (col.every(value => value === "x")) {
        winnerDetails.colIdx = idx;
        winnerDetails.winner = "x";
      } else if (col.every(value => value === "o")) {
        winnerDetails.colIdx = idx;
        winnerDetails.winner = "o";
      }
    });

    // checa diagonais
    if (mainDiagonal.every(value => value === "x")) {
      winnerDetails.dp = true;
      winnerDetails.winner = "x";
    } else if (mainDiagonal.every(value => value === "o")) {
      winnerDetails.dp = true;
      winnerDetails.winner = "o";
    }

    if (secDiagonal.every(value => value === "x")) {
      winnerDetails.ds = true;
      winnerDetails.winner = "x";
    } else if (secDiagonal.every(value => value === "o")) {
      winnerDetails.ds = true;
      winnerDetails.winner = "o";
    }

    return winnerDetails;
  };

  whoWon = () => {
    const winnerDetails = this.getWinnerDetails();
    const gameFinish = this.gameOver();

    if (!winnerDetails.winner && gameFinish) winnerDetails.draw = true;

    return winnerDetails;
  };
}
