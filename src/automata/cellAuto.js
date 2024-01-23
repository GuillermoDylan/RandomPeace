class CellAuto {
  constructor(array) {
    this.array = array;
    this.startTime = 0;
  }

  /**
   * Calcula una iteracion del automata celular
   * @returns {Array} El array de las posiciones tras la iteración
   * @param {Number} endTime por lo general, el tiempo actual para calcular la diferencia de tiempos entre iteraciones
   */
  computeIteration(endTime, flowerThrowers) {
    // Tiempo entre iteraciones: 0.09 segundos
    if ((endTime - this.startTime) < 500) {
      return this.array;
    }
    this.startTime = performance.now();
    const newArray = [];

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] == null || this.array[i] == undefined) {
        continue; // Skip the current figure if it is null or undefined
      }

      const currentFigure = this.array[i];
      const { x, y } = currentFigure;

      let closestNeighbours = null;
      let neighbours = 0;

      for (let j = 0; j < this.array.length; j++) {
        if (i === j || this.array[j] == undefined || this.array[j] == null) continue; // Skip the current figure

        const neighborFigure = this.array[j];
        const distance = Math.sqrt((neighborFigure.x - x) ** 2 + (neighborFigure.y - y) ** 2);

        // Si la distancia es menor a 300 y hay menos de 4 soldados vivos, se considera que el soldado está vivo
        if (distance <= 300) {
          closestNeighbours = neighborFigure;
          neighbours++;
        }
      }

      // Reglas del automata celular:
      // Si hay 1 o 2 soldados vivos, se mantiene vivo
      if (currentFigure != null && (neighbours === 2 || neighbours == 1)) {
        newArray.push(currentFigure);

        // Si hay 3 soldados vivos, la figura se cambia por su vecino más cercano
      } else if (currentFigure != null && neighbours === 3) {
        newArray.push(closestNeighbours);
      } else {
        let randomX = Math.floor(Math.random() * 201) - 100 + currentFigure.x;
        let randomY = Math.floor(Math.random() * 201) - 100 + currentFigure.y;

        // Check if the new coordinates are within the screen
        while (randomX > screen.width - 50 || randomX < 50) {
          randomX = Math.floor(Math.random() * 100) - 50 + currentFigure.x;
        }
        while (randomY > screen.height - 250 || randomY < 50) {
          randomY = Math.floor(Math.random() * 100) - 50 + currentFigure.y;
        }

        newArray.push(new FigureUtil().reescalar(randomX, randomY, flowerThrowers));
      }
    }

    this.array = newArray;
    return newArray;
  }

}

