import React, { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  guessedLetters,
  wrongLatters,
  pickedWord,
  letters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>
        Você ainda tem {guesses} {guesses > 1 ? "tentativas" : "tentativa"}
      </p>
      <div className="word__container">
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span key={index} className="letter">
              {letter}
            </span>
          ) : (
            <span key={index} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letter__container">
        <p>Tente adivinhar um letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="latter"
            maxLength={1}
            required
            onChange={(event) => setLetter(event.target.value)}
            value={letter}
            ref={letterInputRef}
            autoComplete="off"
          />
          <button>jogar!</button>
        </form>
      </div>
      <div className="tryletter__container">
        <p>Letras já utilizadas:</p>
        {wrongLatters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
