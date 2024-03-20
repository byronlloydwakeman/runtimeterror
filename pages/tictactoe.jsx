import React, { useEffect, useState } from 'react';
import { Square } from '../components/TicTacToe/Square.jsx';
import styles from './tictactoe.module.scss';
import Navbar from '../components/Navbar.jsx';
import NavbarBottom from '../components/NavbarBottom';
import winningArrays from '../public/winningSquares.json';

export default function TicTacToe() {
  const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', '']);
  const [player1, setPlayer1] = useState(true);
  const [winner, setWinner] = useState('Undecided');
  const [crossWinCount, setCrossWinCount] = useState(0);
  const [naughtsWinCount, setNaughtsWinCount] = useState(0);
  const winningCrossArrays = winningArrays.winningCrossArrays;
  const winningNaughtsArrays = winningArrays.winningNaughtsArrays;

  useEffect(() => {
    winningCrossArrays?.map((winningArray) => {
      const firstIndex = winningArray[1][0];
      const secondIndex = winningArray[1][1];
      const thirdIndex = winningArray[1][2];

      if (
        squares[firstIndex] == winningArray[0][firstIndex] &&
        squares[secondIndex] == winningArray[0][secondIndex] &&
        squares[thirdIndex] == winningArray[0][thirdIndex]
      ) {
        setWinner('crosses');
        setCrossWinCount((crossWinCount) => crossWinCount + 1);
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
        setWinner('naughts');
        setNaughtsWinCount((naughtsWinCount) => naughtsWinCount + 1);
      }
    });

    if (!squares.includes('')) {
      setWinner('Draw');
    }
  }, [player1, squares, winningCrossArrays, winningNaughtsArrays]);

  const resetBoard = () => {
    setSquares(['', '', '', '', '', '', '', '', '']);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
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
        <h1>Winner is: {winner}</h1>
        <button onClick={resetBoard}>Reset Board</button>
        <div>Cross win count: {crossWinCount}</div>
        <div>Naughts win count: {naughtsWinCount}</div>
      </div>
      <NavbarBottom />
    </div>
  );
}
