class CellAuto {
  constructor(array) {
    this.array = array;
  }

  computeIteration() {
    const newArray = [];

    for (let i = 0; i < this.array.length; i++) {
      newArray[i] = [];

      for (let j = 0; j < this.array[i].length; j++) {
        const currentFigure = this.array[i][j];
        let closestNeighbor = null;
        let closestDistance = Infinity;

        for (let x = 0; x < this.array.length; x++) {
          for (let y = 0; y < this.array[x].length; y++) {
            if (x === i && y === j) continue; // Skip current position

            const neighborFigure = this.array[x][y];
            const distance = Math.sqrt((x - i) ** 2 + (y - j) ** 2);

            if (distance >= 25 && distance < closestDistance) {
              closestNeighbor = neighborFigure;
              closestDistance = distance;
            }
          }
        }
        newArray[i][j] = closestNeighbor;
      }
    }

    this.array = newArray;
  }
}
