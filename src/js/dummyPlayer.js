export class RandomPlayer {
  constructor(matrix) {
    this.matrix = matrix;
    this.arrOfAvailablePosition = [];
  }

  getAvailablesPositions = () => {
    this.matrix.forEach((row, rowIdx) =>
      row.forEach((value, colIdx) => {
        if (!value) this.arrOfAvailablePosition.push([rowIdx, colIdx]);
      })
    );
    return this.arrOfAvailablePosition;
  };

  getRandomPosition = () => {
    const avaliblesPositions = this.getAvailablesPositions();
    const randomPositionIndex = Math.floor(
      Math.random() * avaliblesPositions.length
    );
    return avaliblesPositions[randomPositionIndex];
  };
}
