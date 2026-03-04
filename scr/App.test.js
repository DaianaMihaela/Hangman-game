import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});























import React, { useState } from "react";
import "./styles.css";

const presetGrid = [
  ["5", "3", "", "", "7", "", "", "", ""],
  ["6", "", "", "1", "9", "5", "", "", ""],
  ["", "9", "8", "", "", "", "", "6", ""],
  ["8", "", "", "", "6", "", "", "", "3"],
  ["4", "", "", "8", "", "3", "", "", "1"],
  ["7", "", "", "", "2", "", "", "", "6"],
  ["", "6", "", "", "", "", "2", "8", ""],
  ["", "", "", "4", "1", "9", "", "", "5"],
  ["", "", "", "", "8", "", "", "7", "9"],
];

const solutionGrid = [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
];

export default function SudokuApp() {
  const [grid, setGrid] = useState(presetGrid);
  const [initialGrid] = useState(presetGrid);
  const [message, setMessage] = useState("");

  const handleChange = (row, col, value) => {
    if (initialGrid[row][col] === "" && (/^[1-9]$/.test(value) || value === "")) {
      if (value === solutionGrid[row][col]) {
        const newGrid = grid.map((r) => [...r]);
        newGrid[row][col] = value;
        setGrid(newGrid);
        setMessage("");
      } else {
        const newGrid = grid.map((r) => [...r]);
        newGrid[row][col] = "";
        setGrid(newGrid);
        showTemporaryMessage("❌ Mutare greșită!");
      }
    }
  };  

  const showTemporaryMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000); // notificare dispare după 2 secunde
  };

  const handleSolve = () => {
    setGrid(solutionGrid);
    setMessage("✅ Sudoku rezolvat automat!");
  };

  const handleValidate = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== solutionGrid[row][col]) {
          setMessage("❌ Soluția este greșită!");
          return;
        }
      }
    }
    setMessage("✅ Felicitări! Ai rezolvat corect Sudoku-ul!");
  };

  const handleReset = () => {
    setGrid(presetGrid);
    setMessage("🔄 Sudoku resetat!");
  };

  return (
    <div className="sudoku-container">
      <h1 className="title">Sudoku Game</h1>

      {message && <div className="notification">{message}</div>}

      <div className="sudoku-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== "";
            const cellClass = `
              cell 
              ${isInitial ? "cell-initial" : ""}
              ${colIndex % 3 === 0 ? "cell-border-left" : ""}
              ${rowIndex % 3 === 0 ? "cell-border-top" : ""}
            `;
            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className={cellClass}
                maxLength="1"
                readOnly={isInitial}
              />
            );
          })
        )}
      </div>

      <div className="button-container">
        <button onClick={handleSolve} className="btn btn-solve">
          Rezolvă
        </button>
        <button onClick={handleValidate} className="btn btn-validate">
          Validează
        </button>
        <button onClick={handleReset} className="btn btn-reset">
          Reset
        </button>
      </div>
    </div>
  );
}
