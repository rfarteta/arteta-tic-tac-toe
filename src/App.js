import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Grid from "./Components/Grid";
import ResetBtn from "./Components/ResetBtn";
import Score from "./Components/Score";

function App() {
  const [blocks, setBlocks] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [xscore, setXscore] = useState(0);
  const [oscore, setOscore] = useState(0);

  const checkEndTheGame = () => {
    for (let grid of blocks) {
      if (!grid) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (blocks[a] && blocks[a] === blocks[b] && blocks[a] === blocks[c]) {
        return blocks[a];
      }
    }
    return null;
  };

  const updateGrids = (index) => {
    if (blocks[index] || winner) {
      return;
    }
    const s = blocks;
    s[index] = turn;
    setBlocks(s);
    setTurn(turn === "x" ? "o" : "x");
    const W = checkWinner();
    if (W) {
      if (W == "x") {
        setXscore(xscore + 1);
      } else if (W == "o") {
        setOscore(oscore + 1);
      }

      setWinner(W);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const newGame = () => {
    setBlocks(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
  };

  return (
    <div className="w-fit text-center items-center justify-center grid my-20 mx-auto">
      <h1> TIC x TAC x TOE </h1>
      <ResetBtn newGame={newGame} />
      <Score xscore={xscore} oscore={oscore} />
      <div className="grid gap-2 grid-col grid-cols-3 items-center justify-center">
        {Array.from("012345678").map((index) => (
          <Grid
            key={index}
            index={index}
            updateGrids={updateGrids}
            cls={blocks[index]}
          />
        ))}
      </div>
      <div
        className={`turn flex justify-center my-5 mx-auto w-fit relative rounded-md ${
          turn === "x" ? "left" : "right"
        }`}
      >
        <Grid className="turn-block" cls="x" />
        <Grid className="turn-block" cls="o" />
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            key={"parent-box"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="winner"
          >
            <motion.div
              key={"child-box"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text"
            >
              <motion.h2
                initial={{ scale: 0, y: 100 }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    y: { delay: 0.7 },
                    duration: 0.7,
                  },
                }}
              >
                {winner === "x | o" ? "Draw !!" : "Winner !!"}
              </motion.h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.3,
                    duration: 0.2,
                  },
                }}
                className="win"
              >
                {winner === "x | o" ? (
                  <>
                    <Grid className="win-block" cls="x" />
                    <Grid className="win-block" cls="o" />
                  </>
                ) : (
                  <>
                    <Grid className="win-block" cls={winner} />
                  </>
                )}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 1.5, duration: 0.3 },
                }}
              >
                <ResetBtn newGame={newGame} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
