import React, { useState, useEffect } from 'react';
import HangmanFigure from './HangmanFigure';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import words from './words';
import './styles.css';

const App = () => {
  const [word] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [difficulty, setDifficulty] = useState('usor'); 
  const maxWrong = 6;

  useEffect(() => {
    if (difficulty === 'usor') {
      setGuessedLetters([word[0], word[word.length - 1]]);
    } else {
      setGuessedLetters([]);
    }
  }, [word, difficulty]);

  const handleLetterClick = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
      setWrongLetters((prev) => [...prev, letter]);
    }
  };

  const getDisplayedWord = () => {
    return word
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  };

  const isWinner = word.split('').every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrong;

  useEffect(() => {
    if (isWinner || isLoser) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [isWinner, isLoser]);

  return (
    <div className="app-container">
      <h1>Spânzurătoarea</h1>

      <div className="difficulty-select">
        <label htmlFor="difficulty">Dificultate:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="usor">Ușor</option>
          <option value="greu">Greu</option>
        </select>
      </div>

      <div className="wrong-letters-container">
        {wrongLetters.length > 0 ? (
          <>
            <strong>Litere greșite:</strong> {wrongLetters.join(', ')}
          </>
        ) : (
          <span>Nu ai greșit nici o literă încă!</span>
        )}
      </div>


      <HangmanFigure wrongGuesses={wrongGuesses} />
      <WordDisplay displayedWord={getDisplayedWord()} />
      <Keyboard onLetterClick={handleLetterClick} guessedLetters={guessedLetters} />

      {isWinner && <p className="message win">Ai câștigat! 🎉</p>}
      {isLoser && (
        <p className="message lose">
          Ai pierdut! Cuvântul era: <strong>{word}</strong>
        </p>
      )}
    </div>
  );
};



return (
  <div className="App">
    <h1>Sudoku</h1>
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cellValue}
              row={rowIndex}
              col={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
    <div className="buttons">
      <button onClick={checkCompletion}>Check</button>
      <button onClick={resetBoard}>Reset</button>
    </div>
    <p className="message">{message}</p>
  </div>
);
//}

export default App;
