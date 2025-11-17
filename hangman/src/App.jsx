import { useState } from "react";
import { languages } from "./language.js";
import clsx from "clsx";

/**
 * Goal: Allow the user to start guessing the letters
 *
 * Challenge: Update the keyboard when a letter is right
 * or wrong.
 *
 * Bonus: use the `clsx` package to easily add conditional
 * classNames to the keys of the keyboard. Check the docs
 * to learn how to use it 📖
 */

export default function AssemblyEndgame() {
  const randy = Math.floor(Math.random() * languages.length);

  const [currentWord, setCurrentWord] = useState(languages[randy].name);
  const [guessedLetters, setGuessedLetters] = useState([]);

  let wrongGuessedLetter = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function declare(letter) {
    const isGuessed = guessedLetters.includes(letter);
    const isTrue = isGuessed && currentWord.includes(letter);
    const isFalse = isGuessed && !isTrue;

    return clsx("button", {
      "bg-green-600 text-white": isTrue,
      "bg-red-600 text-white": isFalse,
      "bg-gray-200": !isGuessed,
    });
  }

  function addGuessedLetter(letter) {
    console.log("love rescued me", letter);

    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function newGame() {
    setCurrentWord(languages[randy].name);
  }

  //I want the state to hold the value to be guessed and that the place holder to be empty check boxes that display how many
  //words that are to be displayed

  //2. Now i want to make it that when a letter is guessed and it is in
  // the current word to be displayed

  //i have gotten the letter to be displayed.Now i want to display it

  //..................THIS TAKES LANGUAGES FROM LANGUAGES JS................................

  const languageElements = languages.map((lang, index) => {
    console.log("wrongGuessedLetter", wrongGuessedLetter, index);
    let youOut = wrongGuessedLetter > index;

    const classChanger = youOut ? "chip lost" : "chip";

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className={classChanger} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  //..................THIS DISPLAYS THE GAME STATUS................................
  function gameStatus() {
    console.log("this is the game Status as of now");
    let gameState;

    if (wrongGuessedLetter >= languages.length) {
        gameState = "lost"
      return (
        <>
          <h2>You Lose</h2>
          <p>Better Luck Next Time</p>
        </>
      );
    } else if (wrongGuessedLetter === 4) {
      gameState = "critical";
      return (
        <>
          <h2>Carefull Now</h2>
          <p>Your Guessed are halfway over</p>
        </>
      );
    } else {
        
      return (
        <>
          <h2>Play the Game</h2>
          <p>Lets Get guessing 🎉</p>
        </>
      );
    }
  }

  const letterElements = currentWord.split("").map((letter, index) => {
    const isTrue =
      guessedLetters.includes(letter) && currentWord.includes(letter);
    return <span> {isTrue ? letter.toUpperCase() : ""} </span>;
  });
  //.................THIS CHANGES THE KEYBOARD ELEMENTS.......................

  const keyboardElements = alphabet.split("").map((letter) => (
    <button
      className={declare(letter)}
      key={letter}
      onClick={() => addGuessedLetter(letter)}
    >
      {letter.toUpperCase()}
    </button>
  ));

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section className={ "game-status" + gamestate }>{gameStatus()}</section>

      <section className="language-chips">{languageElements}</section>

      <section className="word">{letterElements}</section>

      <section className="keyboard">{keyboardElements}</section>

      <button
        className="new-game"
        onClick={() => {
          newGame();
        }}
      >
        New Game
      </button>
    </main>
  );
}
