import React, { useEffect, useState } from 'react';
import { Square } from '../components/TicTacToe/Square.jsx';
import styles from './tictactoe.module.scss';
import Navbar from '../components/Navbar.jsx';
import NavbarBottom from '../components/NavbarBottom';
import winningArrays from '../public/winningSquares.json';
import Button from '@mui/material/Button';

export default function TicTacToe() {
  const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', '']);
  const [player1, setPlayer1] = useState(true);
  const [winner, setWinner] = useState('Match in progress...');
  const [cpuEnabled, setCpuEnabled] = useState(false);
  const [crossWinCount, setCrossWinCount] = useState(0);
  const [naughtsWinCount, setNaughtsWinCount] = useState(0);
  const winningCrossArrays = winningArrays.winningCrossArrays;
  const winningNaughtsArrays = winningArrays.winningNaughtsArrays;

  const buttonStyle = {
    Button: {
      color: '#045149',
      border: '1px solid #045149',
      backgroundColor: 'white',
      padding: '5px 10px',
      '&:hover': {
        backgroundColor: '#045149 !important',
        boxShadow: 'none !important',
        borderColor: 'white',
        color: 'white',
      },
    },
  };

  useEffect(() => {
    winningCrossArrays?.map((winningArray) => {
      const firstIndex = winningArray[1][0];
      const secondIndex = winningArray[1][1];
      const thirdIndex = winningArray[1][2];

      if (!squares.includes('')) {
        setWinner('Draw!');
        setTimeout(() => {
          resetBoard();
        }, 1000);
      }

      if (
        squares[firstIndex] == winningArray[0][firstIndex] &&
        squares[secondIndex] == winningArray[0][secondIndex] &&
        squares[thirdIndex] == winningArray[0][thirdIndex]
      ) {
        setWinner('Crosses wins!');
        setCrossWinCount((crossWinCount) => crossWinCount + 1);
        setTimeout(() => {
          resetBoard();
        }, 1000);
      }
    });

    winningNaughtsArrays?.map((winningArray) => {
      const firstIndex = winningArray[1][0];
      const secondIndex = winningArray[1][1];
      const thirdIndex = winningArray[1][2];

      if (
        squares[firstIndex] == winningArray[0][firstIndex] &&
        squares[secondIndex] == winningArray[0][secondIndex] &&
        squares[thirdIndex] == winningArray[0][thirdIndex]
      ) {
        setWinner('Naughts wins!');
        setNaughtsWinCount((naughtsWinCount) => naughtsWinCount + 1);
        setTimeout(() => {
          resetBoard();
        }, 740);
      }
    });
  }, [player1, squares, winningCrossArrays, winningNaughtsArrays]);

  useEffect(() => {
    let crossCounter = 0;
    let naughtsCounter = 0;
    let freeIndexes = [];

    squares?.map((element, index) => {
      if (element == '❌') {
        crossCounter = crossCounter + 1;
      } else if (element == '⭕') {
        naughtsCounter = naughtsCounter + 1;
      } else {
        freeIndexes.push(index);
      }
    });

    let randomFreeIndex =
      freeIndexes[Math.floor(Math.random() * freeIndexes.length)];

    if (cpuEnabled) {
      setTimeout(() => {
        if (player1) {
          squares[randomFreeIndex] = '❌';
          setPlayer1(!player1);
        }
      }, 750);
    }
  }, [player1, squares, cpuEnabled]);

  const resetBoard = () => {
    setSquares(['', '', '', '', '', '', '', '', '']);
    setWinner('Match in progress...');
  };

  const handleCpu = () => {
    setCpuEnabled(!cpuEnabled);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.score_board}>
          <div>
            <span className={styles.O}>⭕</span> - {naughtsWinCount}
          </div>
          |
          <div>
            <span className={styles.X}>❌</span> - {crossWinCount}
          </div>
        </div>
        <div className={styles.square_container}>
          {Array.from(squares).map((el, ind) => (
            <Square
              key={ind}
              index={ind}
              player1={player1}
              playerHook={setPlayer1}
              squares={squares}
            />
          ))}
        </div>
        <h1 className={styles.match_result}>{winner}</h1>
        <div className={styles.button_group}>
          <Button size="small" sx={buttonStyle.Button} onClick={resetBoard}>
            Reset Board
          </Button>
          {!cpuEnabled ? (
            <Button size="small" sx={buttonStyle.Button} onClick={handleCpu}>
              Enable CPU
            </Button>
          ) : (
            <Button size="small" sx={buttonStyle.Button} onClick={handleCpu}>
              Disable CPU
            </Button>
          )}
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
}
