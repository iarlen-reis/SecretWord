import React from "react";
import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <>
      <header className="game__over">
        <h1>Fim de jogo!</h1>
        <h2>
          A sua pontuação foi: <span>{score}</span>
        </h2>
        <button onClick={retry}>Novo jogo</button>
      </header>
    </>
  );
};

export default GameOver;
