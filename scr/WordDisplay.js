import React from 'react';
import './styles.css';

export default function WordDisplay({ displayedWord = "_ _ _ _ _" }) {
  return <div className="word-display">{displayedWord}</div>;
}
