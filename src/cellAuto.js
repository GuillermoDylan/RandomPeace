class CellAuto {
  constructor(array) {
    this.array = array;
    this.startTime = 0;
  }

  /**
   * Computes the next iteration of the cellular automaton.
   * @returns {Array} An array of positions that have changed in the iteration.
   * 
   * Conways Rules:
   * Birth rule: An empty, or “dead,” cell with precisely three “live” neighbors (full cells) becomes live.
   * Death rule: A live cell with zero or one neighbors dies of isolation; a live cell with four or more neighbors dies of overcrowding.
   * Survival rule: A live cell with two or three neighbors remains alive.
   */
  computeIteration(endTime) {
    if((endTime - this.startTime) < 90){
      return this.array; // If the last iteration took more than 7 seconds, skip this iteration and wait till the next one
    }
    this.startTime = performance.now(); // Start the timer
    const newArray = []; // Create a new array to store the next iteration
    const positions = []; // Create an array to store the positions that have changed

    for (let i = 0; i < this.array.length; i++) {
      if(this.array[i] == null || this.array[i] == undefined){
        continue; // Skip the current figure if it is null or undefined
      }

      const currentFigure = this.array[i]; // Get the current figure at position i
      const { x, y } = currentFigure; // Get the x and y coordinates of the current figure
      newArray[i] = new Soldier(x, y); // Create a new figure with the same coordinates

      let closestNeighbours = null; // Initialize the closest figure as null
      let neighbours = 0; // Initialize the count of live figures as 0

      for (let j = 0; j < this.array.length; j++) {
        if (i === j || this.array[j] == undefined || this.array[j] == null) continue; // Skip the current figure

        const neighborFigure = this.array[j]; // Get the neighbor figure at position j
        const distance = Math.sqrt((neighborFigure.x - x) ** 2 + (neighborFigure.y - y) ** 2); // Calculate the distance between the current figure and the neighbor

        // Si la distancia es menor a 300 y hay menos de 4 soldados vivos, se considera que el soldado está vivo
        if (distance <= 300) {
          closestNeighbours = neighborFigure; // Update the closest figure if the distance is within the range and closer than the previous closest figure
          neighbours++; // Increment the count of live figures
        }
      }

      if (currentFigure != null && (neighbours === 2 || neighbours === 1)) {
        newArray[i] = currentFigure; // Keep the current figure if it is alive and has 2 or 3 live figures
        positions.push(currentFigure); // Add the position to the list of changed positions
      } else if (currentFigure != null && neighbours === 3) {
        newArray[i] = closestNeighbours; // Set the figure to the closest neighbor if the current position is empty and has exactly 3 live figures
        positions.push(closestNeighbours); // Add the position to the list of changed positions
      } else {
        // Move the figure from that place to another (distance maximum is 100, minimum is -100)
        let randomX = Math.floor(Math.random() * 201) - 100 + currentFigure.x;
        let randomY = Math.floor(Math.random() * 201) - 100 + currentFigure.y;
        // Check if the new coordinates are within the screen
        while(randomX > screen.width){
          randomX = Math.floor(Math.random() * 100) - 50 + currentFigure.x;
        }
        while(randomY > screen.height){
          randomY = Math.floor(Math.random() * 100) - 50 + currentFigure.y;
        }
        newArray[i] = new Soldier(randomX, randomY); // Create a new figure with the random coordinates
        positions.push(newArray[i]); // Add the position to the list of changed positions
        //newArray.splice(i,1); // Set the figure to null if none of the above conditions are met
      }
    }

    this.array = newArray; // Update the array with the new iteration
    return positions; // Return the list of changed positions
  }
}

