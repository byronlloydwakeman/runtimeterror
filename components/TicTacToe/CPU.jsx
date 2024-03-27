import winningArrays from '../../public/winningSquares.json';

export const CPU = (squares) => {
  return findBestMove(squares);
};

// If X wins its a score of + 10
// If O wins its a score of - 10
function heuristic(squares, depth) {
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

    function findWinner (){
        for (let i = 0; i < winningArrays.length; i++) {
            const [a, b, c] = winningArrays[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
    }

    const winner = findWinner();

    if (winner === "⭕"){
        console.log("naughts won that one");
        return -100 + depth;
    }
    else if(winner === "❌"){
        console.log("crosses won that one");
        return 100 - depth;
    }

    return 0;

//   function arraysEqual(arr1, arr2) {
//     if (arr1.length !== arr2?.length) return false;
//     for (let i = 0; i < arr1.length; i++) {
//       if (arr1[i] !== arr2[i]) return false;
//     }
//     return true;
//   }

//   console.log(`squares - ${squares}`);

//   for (let i = 1; i < winningCrossArrays.length; i++) {
//     const currentArray = winningCrossArrays[i][0];
//     const equal = arraysEqual(squares, currentArray)
//     console.log(`current cross array - ${currentArray}`);
//     console.log(`equal? - ${equal}`)
//     if (equal) {
        // console.log("crosses won that one");
        // return 10 - depth;
//     }
//   }

//   for (let i = 1; i < winningNaughtsArrays.length; i++) {
//     const currentArray = winningNaughtsArrays[i][0];
//     const equal = arraysEqual(squares, currentArray);
//     console.log(`current naughts array - ${currentArray}`);
//     console.log(`equal? - ${equal}`);
//     if (equal) {
        // console.log("naughts won that one");
        // return -10 + depth;
//     }
//   }
}

function minimax(squares, depth, isMax) {
    let boardScore = heuristic(squares, depth);
    console.log(boardScore);

    console.log(`depth -${depth}`);

    if (boardScore === 100 || boardScore === -100) return boardScore;
  
    // Is there are no empty squares left
    if (!squares.includes('')) {
        return 0;
    }
  
    if (isMax) {
        var best = -100; // Initialize best to a very low value

        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === '') 
            {
                const tempSquares = [...squares];
                tempSquares[i] = '❌';

                let minimaxVal = minimax(tempSquares, depth + 1, !isMax);
                console.log(`current best - ${best}, minimaxVal - ${minimaxVal}`);
                console.log(`max best - ${best}`)

                best = Math.max(best, minimaxVal);
            }
        }
  
        return best;
    } else {
        var best = 100; // Initialize best to a very high value
  
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === '') {
                const tempSquares = [...squares];
                tempSquares[i] = '⭕';

                let minimaxVal = minimax(tempSquares, depth + 1, !isMax);
                console.log(`current best - ${best}, minimaxVal - ${minimaxVal}`);
                console.log(`min best - ${best}`)

                best = Math.min(best, minimaxVal);

                //Undo move
                squares[i] = '';
            }
        }
  
        return best;
    }
  }
  
  

function findBestMove(squares) {
  var bestVal = -100;
  var bestIndex = 0;

  squares.map((el, index) => {
    //If current move is better than the best, it's now the best.
    if (squares[index] == '') {
      console.log(squares);
      squares[index] = '⭕';
      console.log(squares);

      let moveVal = minimax(squares, 0, false);
        
      console.log(`moveVal - ${moveVal}`);
      squares[index] = '';

      if (moveVal > bestVal) {
        bestIndex = index;
        bestVal = moveVal;
      }
    }
  }, []);

  console.log(bestIndex);
  return bestIndex;
}
