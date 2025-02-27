import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useState, useEffect, useRef } from "react";

function App() {
  const generateNewDice = () => {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  };

  const [dice, setDice] = useState(() => generateNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  const rollDice = () => {
    if (!gameWon) {
      setDice((prev) =>
        prev.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateNewDice());
    }
  };

  const hold = (id) => {
    // setDice((prevDie) => {
    //   return prevDie.map((die) => {
    //     return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
    //   });
    // });

    setDice((prevDice) =>
      prevDice.map((die) =>
        id === die.id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  const diceElements = dice.map((dieObj) => (
    <Die
      value={dieObj.value}
      key={dieObj.id}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.
        <br /> Click each die to freeze it at its current value between rolls.
      </p>
      <div className="container">{diceElements}</div>
      <button
        onClick={rollDice}
        className="roll-dice"
        id={gameWon ? "new-game" : ""}
        ref={buttonRef}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
