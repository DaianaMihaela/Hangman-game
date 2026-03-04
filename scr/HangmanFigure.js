import React from 'react';
import './styles.css';

const HangmanFigure = ({ wrongGuesses }) => {
  const hangmanParts = [
    <div key="base" className="base" />, 
    <div key="pole" className="pole" />,
    <div key="top" className="top" />,
    <div key="rope" className="rope" />, 
    wrongGuesses >= 1 ? <div key="head" className="head" /> : null, 
    wrongGuesses >= 2 ? <div key="body" className="body" /> : null, 
    wrongGuesses >= 3 ? <div key="left-arm" className="left-arm" /> : null, 
    wrongGuesses >= 4 ? <div key="right-arm" className="right-arm" /> : null, 
    wrongGuesses >= 5 ? <div key="left-leg" className="left-leg" /> : null, 
    wrongGuesses >= 6 ? <div key="right-leg" className="right-leg" /> : null, 
  ];

  return (
    <div className="hangman-figure">
      {hangmanParts}
    </div>
  );
};

export default HangmanFigure;

const checkCompletion = () => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val === 0 || isConflict(row, col, val)) {
        setMessage("Puzzle incomplet sau invalid.");
        return;
      }
    }
  }
  setMessage("Felicitări, Sudoku complet!");
};

const resetBoard = () => {
  setBoard(initialBoard);
  setMessage("");
};

const Cell = ({ value, row, col }) => {
  const conflict = isConflict(row, col, value);
  const readOnly = initialBoard[row][col] !== 0;

  return (
    <input
      type="text"
      value={value === 0 ? "" : value}
      onChange={(e) => handleChange(row, col, e.target.value)}
      maxLength="1"
      className={`cell ${conflict ? "conflict" : ""}`}
      readOnly={readOnly}
    />
  );
};