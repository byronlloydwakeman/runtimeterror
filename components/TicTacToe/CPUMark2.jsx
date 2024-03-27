export default class CPUMark2 
{
    static playerMove = 0;
    static playerFirstGo = true;

    static checkTwoInRowForNaughts(squares) {
        const winningArrays = [
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
                const emptyIndex = row.findIndex(el => el === '');
                if (emptyIndex !== -1) {
                    if (i < 3) {
                        return emptyIndex + (i * 3);
                    } else if (i < 6) {
                        return emptyIndex * 3 + (i - 3);
                    } else if (i === 6) {
                        if (emptyIndex === 0 && squares[4] === '') return 4;
                        else if (emptyIndex === 1 && squares[0] === '') return 0;
                        else if (emptyIndex === 1 && squares[8] === '') return 8;
                        else if (emptyIndex === 2 && squares[4] === '') return 4;
                    } else {
                        if (emptyIndex === 0 && squares[4] === '') return 4;
                        else if (emptyIndex === 0 && squares[2] === '') return 2;
                        else if (emptyIndex === 1 && squares[4] === '') return 4;
                        else if (emptyIndex === 2 && squares[4] === '') return 4;
                    }
                }
            }
        }
    
        return -1; 
    }

    //Check if crosses is about to win
    static checkTwoInRowForCrosses(squares) {
        const winningArrays = [
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
                const emptyIndex = row.findIndex(el => el === '');
                if (emptyIndex !== -1) {
                    if (i < 3) {
                        return emptyIndex + (i * 3);
                    } else if (i < 6) {
                        return emptyIndex * 3 + (i - 3);
                    } else if (i === 6) {
                        if (emptyIndex === 0 && squares[4] === '') return 4;
                        else if (emptyIndex === 1 && squares[0] === '') return 0;
                        else if (emptyIndex === 1 && squares[8] === '') return 8;
                        else if (emptyIndex === 2 && squares[4] === '') return 4;
                    } else {
                        if (emptyIndex === 0 && squares[4] === '') return 4;
                        else if (emptyIndex === 0 && squares[2] === '') return 2;
                        else if (emptyIndex === 1 && squares[4] === '') return 4;
                        else if (emptyIndex === 2 && squares[4] === '') return 4;
                    }
                }
            }
        }
    
        return -1; 
    }

    static checkFreeEdges(squares) {
        const edges = [1, 3, 5, 7]; // Indices of edges
        for (let i = 0; i < edges.length; i++) {
            if (squares[edges[i]] === '') {
                return edges[i];
            }
        }
        return -1; // No free edges
    }

    static findFreeSquare(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === '') {
                return i; // Return the index of the free square
            }
        }
        return -1; // If no free square is found
    }

    static findBestMove(squares)
    {
        console.log(this.playerFirstGo)
        if (this.playerFirstGo === true)
        {   
            this.playerFirstGo = false;
            // If player 1 doesntstart with a corner
            if (!(squares[0] == "" && squares[2] == "" && squares[6] == "" && squares[8] == ""))
            {
                this.playerMove = 1;
                return 4;
            }

            return this.findFreeSquare(squares);
        }
        else
        {
            var cpuWinner = this.checkTwoInRowForNaughts(squares);
            if(cpuWinner == -1) // No move to win :(
            {
                // Check if the player is about to win
                const player1Stopper = this.checkTwoInRowForCrosses(squares)
                // pLyaer 1 isnt about to win
                if(player1Stopper == -1)
                {
                    const freeEdges = this.checkFreeEdges(squares);
                    // There are no free edges and player 1 isnt about to win, just pick a free square
                    if (freeEdges == -1)
                    {
                        return this.findFreeSquare(squares);
                    }
                    else 
                    {
                        return freeEdges;
                    }
                }
                else
                {
                    return player1Stopper;
                }
            } 
            else {
                return cpuWinner;
            }


        }


    
    

    }
}

