import React from "react";
import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <header className="start__container">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </header>
  );
};

export default StartScreen;
