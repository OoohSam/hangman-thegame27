import { useState } from "react"
import { languages } from "./language.js"
import { clsx } from 'clsx'

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
    const [currentWord, setCurrentWord] = useState("python")
    const [guessedLetters, setGuessedLetters] = useState([])

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter] && setCurrentWord(prev=> [...prev,letter])
        )
    }
    
//..................THIS TAKES LANGUAGES FROM LANGUAGES JS................................

    const languageElements = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                className="chip"
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

//...................THIS ALTERS THE STATE AND CHANGES...............................

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>{letter.toUpperCase()}</span>
    ))
    
    //.................THIS CHANGES THE KEYBOARD ELEMENTS.......................

    const keyboardElements = alphabet.split("").map(letter => (
        <button
            className="iwillname"
            key={letter}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
    ))

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>

            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>

            <section className="language-chips">
                {languageElements}
            </section>

            <section className="word">
                {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            <button className="new-game">New Game</button>
        </main>
    )
}
