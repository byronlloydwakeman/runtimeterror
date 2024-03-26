import winningArrays from '../../public/winningSquares.json';

export const CPU = (squares) => {
    return findBestMove(squares);
}

// If X wins its a score of + 10
// If O wins its a score of - 10
function heuristic(squares)
{
    const winningCrossArrays = winningArrays.winningCrossArrays;
    const winningNaughtsArrays = winningArrays.winningNaughtsArrays;
    
    const crossArrays = winningCrossArrays[0][0];
    const naughtsArrays = winningNaughtsArrays[0][0];

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2?.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    for (let i = 1; i < winningCrossArrays.length; i++) {
        const currentArray = crossArrays[i][0];
        if (arraysEqual(squares, currentArray)) {
            
            return 10;
        }
    }

    for (let i = 1; i < winningNaughtsArrays.length; i++) {
        const currentArray = naughtsArrays[i][0];
        if (arraysEqual(squares, currentArray)) {
            return -10;
        }
    }

    return 0;
}

function minimax(squares, depth, isMax)
{
    let boardScore = heuristic(squares);

    if (boardScore == 10 || boardScore == -10)
        return boardScore;

    // Is there are no empty squares left
    if (!squares.includes("")){
        return 0;
    }

    if (isMax)
    {
        let best = -1000;

        squares.map((el, index) => {
            if (el == "")
            {
                squares[index] = "⭕";

                let minimaxVal = minimax(squares, depth + 1, !isMax);

                best = Math.min(best, minimaxVal);

                //Undo move
                squares[index] = "";
            }
        })

        return best;
    }
    else 
    {
        let best = 1000;

        squares.map((el, index) => {
            if (el == "")
            {
                squares[index] = "❌";
                
                let minimaxVal = minimax(squares, depth + 1, !isMax);

                best = Math.max(best, minimaxVal);

                //Undo move
                squares[index] = ""
            }
        })

        return best;
    }
}

function findBestMove(squares)
{
    var bestMove = -1000;
    var bestIndex = 0;

    squares.map((el, index) => {
        //If current move is better than the best, it's now the best.
        if (squares[index] == "")
        {
            console.log(squares);
            squares[index] = "⭕";
            console.log(squares);

            let curMove = minimax(squares, 0, false);

            squares[index] = "";

            console.log(`curMove - ${curMove}`);

            if (curMove > bestMove)
            {
                bestIndex = index;
                bestMove = curMove;
            }
        }
    }, []);

    console.log(bestIndex);
    return bestIndex;
}