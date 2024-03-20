import React, { useState } from "react";
import { Square } from "../components/TicTacToe/Square.jsx";

import styles from "./tictactoe.module.scss"
import Navbar from "../components/Navbar.jsx";

export default function TicTacToe() {

    const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
    const [player1, setPlayer1] = useState(true);

    return (
        <div className={styles.container}>
          <Navbar />
            <div className={styles.square_container}>
                {Array.from(squares).map((el, ind) => (
                    <Square index={ind} player1={player1} playerHook={setPlayer1} squares={squares}/>
                ))}
            </div>
        </div>
    )
}