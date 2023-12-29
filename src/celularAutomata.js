class CellularAutomata {
    constructor() {
        this.RESET_TIME = 1000; // in millisecond
        this.TICK_TIME = 32;    // in millisecond
        this.SIZE = 50;         // in cells

        // Cell rules
        this.DIE = -1;
        this.BIRTH = 1;
        this.NO_CHANGE = 0;

        // RULES index of items is neighbor count. 
        // 5 Items as rules for count 4,5,6,7,8 have same outcome
        // First rule set for dead cells, second for live cells
        this.RULES = [
            [this.NO_CHANGE, this.NO_CHANGE, this.NO_CHANGE, this.BIRTH, this.NO_CHANGE],
            [this.DIE, this.DIE, this.NO_CHANGE, this.NO_CHANGE, this.DIE]
        ];
        // MAX_COUNT max living neighbors to count
        this.MAX_COUNT = this.RULES[0].length - 1;

        // next two arrays are offsets to neighbors as 1D and 2D coords
        this.NEIGHBOR_OFFSETS = [
            -this.SIZE - 1, -this.SIZE, -this.SIZE + 1,
            -1,                1,
            this.SIZE - 1,  this.SIZE,  this.SIZE + 1
        ];
        this.EDGE_OFFSETS = [ // as coord pairs, x, y for cells at edge
            -1, -1, 0, -1, 1, -1,
            -1, 0,         1, 0,
            -1, 1,  0, 1,  1, 1
        ];

        // double buffered board state
        this.BOARDS = [new Array(this.SIZE * this.SIZE).fill(0), new Array(this.SIZE * this.SIZE).fill(0)];
        this.currentState = 0;

        // start game
        this.randomize();
        this.tick();
    }

    randomize(density = 0.1) {
        const b = this.BOARDS[this.currentState % 2];
        var i = b.length;
        while (i--) { b[i] = Math.random() < density ? 1 : 0 }
        this.render();
    }

    render() {
        const b = this.BOARDS[this.currentState % 2], d32 = this.display.buf32;
        var i = b.length;
        while (i--) { d32[i] = this.PIXELS[b[i]] }
    }

    update() {
        var x, y = this.SIZE, idx = this.SIZE * this.SIZE - 1, count, k, total = 0;

        // Aliases for various constants and references to keep code line sizes short. 
        const ps = this.BOARDS[this.currentState % 2];        // prev state
        const ns = this.BOARDS[(this.currentState + 1) % 2]; // new state
        const NO = this.NEIGHBOR_OFFSETS, EO = this.EDGE_OFFSETS, S = this.SIZE, S1 = this.SIZE - 1;
        while (y--) {
            x = this.SIZE;
            while (x--) {
                count = 0;
                if (x === 0 || x === S1 || y === 0 || y === S1) {
                    k = 0;
                    while (k < EO.length && count < this.MAX_COUNT) {
                        const idxMod = (x + S + EO[k]) % S + ((y + S + EO[k + 1]) % S) * S;
                        count += ps[idxMod];
                        k += 2;
                    }
                } else {
                    k = 0;
                    while (k < NO.length && count < this.MAX_COUNT) { count += ps[idx + NO[k++]] }
                }
                const useRule = this.RULES[ps[idx]][count];
                if (useRule === this.DIE) { ns[idx] = 0 }
                else if (useRule === this.BIRTH) { ns[idx] = 1 }
                else { ns[idx] = ps[idx] }
                total += ns[idx];
                idx--;
            }
        }
        return total;
    }

    tick() {
        const living = this.update();
        this.currentState++;
        this.render();
        if (living) {
            setTimeout(this.tick.bind(this), this.TICK_TIME);
        } else {
            this.randomize();
            setTimeout(this.tick.bind(this), this.RESET_TIME);
        }
    }
}
