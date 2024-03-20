import { motion } from "framer-motion";
import styles from "./square.module.scss";

export const Square = ({index, player1, playerHook, squares}) => {
    function clicked() {
        // Change go
        playerHook(player => !player);
        if (!squares[index])
        {
            squares[index] = player1 == true ? "❌" : "⭕";
        }
    }

    return (
        // <motion.div
        //     initial={{ scale: 0 }}
        //     animate={{ scale: 1 }}
        //     className={styles.square}
        //     onClick={clicked}>
        //         <motion.span>
        //             {squares[index]}
        //         </motion.span>
        // </motion.div>
        <motion.button
            onClick={clicked}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.square}
            style={{ overflow: 'hidden' }}
        >
            <motion.span
            style={{ display: 'inline-block', overflow: 'hidden' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={squares[index] == "❌" ? styles.X : styles.O}
            >
            {squares[index]}
            </motion.span>
        </motion.button>
    )
}