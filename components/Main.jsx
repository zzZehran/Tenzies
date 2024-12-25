import Die from "./Die";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function Main() {
  const [dice, setDice] = useState(() => allNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(
    function () {
      if (gameWon) {
        buttonRef.current.focus();
      }
    },
    [gameWon]
  );

  function allNewDice() {
    const diceArray = [];
    for (let i = 1; i <= 10; i++) {
      const rand = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
      diceArray.push(rand);
    }
    return diceArray;
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((element) =>
        element.id == id
          ? { ...element, isHeld: !element.isHeld }
          : { ...element }
      )
    );
  }

  const diceElements = dice.map((dieObj, index) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
    />
  ));

  function changeDice() {
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((element) =>
          element.isHeld == false
            ? { ...element, value: Math.floor(Math.random() * 6) + 1 }
            : { ...element }
        )
      );
    } else {
      setDice(allNewDice());
    }
  }

  // useEffect(function () {}, [gameWon]);

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} onClick={changeDice} className="roll-btn">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
