import React, { useEffect, useState } from 'react';
import { Square } from '../../components/TicTacToe/Square.jsx';
import styles from './tictactoe.module.scss';
import Navbar from '../../components/Navbars/Navbar.jsx';
import NavbarBottom from '../../components/Navbars/NavbarBottom.jsx';
import winningArrays from '../../public/winningSquares.json';
import Button from '@mui/material/Button';
// import { CPU } from '../../components/TicTacToe/CPU.jsx';
import CPUMark2 from '../../components/TicTacToe/CPUMark2.jsx';

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
    if (cpuEnabled) {
      setTimeout(() => {
        if (!player1) {
          const squareIndex = CPUMark2.findBestMove(squares);
          // let squareIndex = CPU(squares);
          squares[squareIndex] = '⭕';
          setPlayer1(true);
        }
      }, 700);
    }
  }, [player1, squares, cpuEnabled]);

  const resetBoard = () => {
    // CPU is in a bizaare state so this re-freshes everything.
    window.location.reload();
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
