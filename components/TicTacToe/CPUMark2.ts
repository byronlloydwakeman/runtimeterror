export default class CPUMark2 {
    static playerMove: number = 0;
    static playerFirstGo: boolean = true;

    static checkTwoInRowForNaughts(squares: string[]): number {
        let toReturn: number = -1;
        const winningArrays: number[][] = [
            [0, 1, 2], // Rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // Columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // Diagonals
            [2, 4, 6]
        ];

        for (let i = 0; i < winningArrays.length; i++) {
            const [a, b, c] = winningArrays[i];
            const row = [squares[a], squares[b], squares[c]];
            const countCrosses = row.filter(el => el === '⭕').length;
            if (countCrosses === 2 && row.includes('')) {
                [a, b, c].forEach((el) => {
                    if (squares[el] === "") {
                        toReturn = el;
                        return;
                    }
                })
            }
        }
        return toReturn;
    }

    static checkTwoInRowForCrosses(squares: string[]): number {
        let toReturn: number = -1;
        const winningArrays: number[][] = [
            [0, 1, 2], // Rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // Columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // Diagonals
            [2, 4, 6]
        ];

        for (let i = 0; i < winningArrays.length; i++) {
            const [a, b, c] = winningArrays[i];
            const row = [squares[a], squares[b], squares[c]];
            const countCrosses = row.filter(el => el === '❌').length;
            if (countCrosses === 2 && row.includes('')) {
                [a, b, c].forEach((el) => {
                    if (squares[el] === "") {
                        toReturn = el;
                        return;
                    }
                })
            }
        }
        return toReturn;
    }

    static checkFreeEdges(squares: string[]): number {
        const edges: number[] = [1, 3, 5, 7]; // Indices of edges
        for (let i = 0; i < edges.length; i++) {
            if (squares[edges[i]] === '') {
                return edges[i];
            }
        }
        return -1; // No free edges
    }

    static findFreeSquare(squares: string[]): number {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === '') {
                return i; // Return the index of the free square
            }
        }
        return -1; // If no free square is found
    }

    static checkFreeCorner(squares: string[]): number {
        const corners: number[] = [0, 2, 6, 8]; // Indices of corners
        for (let i = 0; i < corners.length; i++) {
            if (squares[corners[i]] === '') {
                return corners[i];
            }
        }
        return -1; // No free corner
    }

    static findBestMove(squares: string[]): number {
        if (this.playerFirstGo === true) {
            this.playerFirstGo = false;
            // If player 1 doesnt start with a corner
            if (!(squares[0] === "" && squares[2] === "" && squares[6] === "" && squares[8] === "")) {
                this.playerMove = 1;
                return 4;
            }
            else if (squares[4] !== "") {
                this.playerMove = 2;
            }
            return this.findFreeSquare(squares);
        }
        else {
            // If the player first went for a corner
            if (this.playerMove === 1) {
                let cpuWinner = this.checkTwoInRowForNaughts(squares);
                // Check if the player is about to win
                let player1Stopper = this.checkTwoInRowForCrosses(squares)
                // Player 1 isnt about to win
                if (player1Stopper === -1) {
                    if (cpuWinner === -1) { // No move to win :(
                        return this.findFreeSquare(squares);
                    }
                    else {
                        return cpuWinner;
                    }
                }
                else {
                    return player1Stopper;
                }
            }
            // If the player went for the center
            else if (this.playerMove === 2) {
                // So it now reaches the else statement.
                this.playerMove = -1;

                let player1Stopper = this.checkTwoInRowForCrosses(squares);
                if (player1Stopper === -1) {
                    // Player has gone in the center, so go in a corner
                    return this.checkFreeCorner(squares);
                }
                else {
                    return player1Stopper;
                }
            }
            else {
                // Prioritize not losing over trying to win.

                // Check if the player is about to win
                let player1Stopper = this.checkTwoInRowForCrosses(squares);
                if (player1Stopper === -1) {
                    let cpuWinner = this.checkTwoInRowForNaughts(squares);
                    if (cpuWinner === -1) { // No move to win :(
                        return this.findFreeSquare(squares);
                    }
                    else {
                        return cpuWinner;
                    }
                }
                else {
                    return player1Stopper;
                }
            }
        }
    }
}
