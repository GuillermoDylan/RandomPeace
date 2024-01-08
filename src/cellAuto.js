class CellAuto {
  constructor(array) {
    this.array = array;
    this.startTime = 0;
    this.endTime = 0;
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
  computeIteration() {
    if(this.endTime - this.startTime > 7000){
      return; // If the last iteration took more than 7 seconds, skip this iteration and wait till the next one
    }
    this.startTime = performance.now(); // Start the timer
    const newArray = []; // Create a new array to store the next iteration
    const positions = []; // Create an array to store the positions that have changed

    for (let i = 0; i < this.array.length; i++) {
      if(this.array[i] == null || this.array[i] == undefined){
        continue; // Skip the current soldier if it is null or undefined
      }

      const currentSoldier = this.array[i]; // Get the current soldier at position i
      const { x, y } = currentSoldier; // Get the x and y coordinates of the current soldier
      newArray[i] = new Soldier(x, y); // Create a new soldier with the same coordinates

      let closestSoldier = null; // Initialize the closest soldier as null
      let closestDistance = Infinity; // Initialize the closest distance as infinity
      let liveSoldiers = 0; // Initialize the count of live soldiers as 0

      for (let j = 0; j < this.array.length; j++) {
        if (i === j || this.array[j] == undefined || this.array[j] == null) continue; // Skip the current soldier

        const neighborSoldier = this.array[j]; // Get the neighbor soldier at position j
        const distance = Math.sqrt((neighborSoldier.x - x) ** 2 + (neighborSoldier.y - y) ** 2); // Calculate the distance between the current soldier and the neighbor

        if (distance <= 25 && liveSoldiers < 4) {
          closestSoldier = neighborSoldier; // Update the closest soldier if the distance is within the range and closer than the previous closest soldier
          closestDistance = distance; // Update the closest distance
          liveSoldiers++; // Increment the count of live soldiers
        }
      }

      if (currentSoldier != null && (liveSoldiers === 2 || liveSoldiers === 3)) {
        newArray[i] = currentSoldier; // Keep the current soldier if it is alive and has 2 or 3 live soldiers
        positions.push(currentSoldier); // Add the position to the list of changed positions
      } else if (currentSoldier == null && liveSoldiers === 3) {
        newArray[i] = closestSoldier; // Set the soldier to the closest neighbor if the current position is empty and has exactly 3 live soldiers
        positions.push(closestSoldier); // Add the position to the list of changed positions
      } else {
        newArray.splice(i,1); // Set the soldier to null if none of the above conditions are met
      }
    }

    this.array = newArray; // Update the array with the new iteration
    this.endTime = performance.now(); // Stop the timer
    return positions; // Return the list of changed positions
  }
}

