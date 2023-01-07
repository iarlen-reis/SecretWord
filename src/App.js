// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
// React
import { useCallback, useEffect, useState } from "react";
// CSS
import "./App.css";
// Data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const guessesNumber = 3;

  const [gameStage, setGameState] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLatters] = useState([]);
  const [wrongLatters, setWorongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);

    // Selecionando caterogia aleatoriamente:
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Selecionando palavra aleatoria da categoria:
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  // Função passada via props para mudar o componente na tela ao clicar no botão
  const startGame = useCallback(() => {
    // Função para limpar tudo antes de iniciar o jogo.
    clearLetterStates();
    // Função de pegar palavra e categoria
    const { word, category } = pickWordAndCategory();

    // Fatiando a palavra em array:
    let wordLatter = word.split("");

    wordLatter = wordLatter.map((letra) => letra.toLowerCase());

    // preenchendo states:

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLatter);

    setGameState(stages[1].name);
  }, [pickWordAndCategory]);

  // Função que verificar letra e se tiver excedido a quantidade de tentativas vai para pagina de game over.
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    // Verificando se a letra já foi usada.

    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLatters.includes(normalizeLetter)
    ) {
      return;
    }

    // Adicionando as letras digitas as letras utilizadas:

    if (letters.includes(normalizeLetter)) {
      setGuessedLatters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter,
      ]);
    } else {
      setWorongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter,
      ]);
      setGuesses((actualGesses) => actualGesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLatters([]);
    setWorongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // Alterando a tela para "end" se a tentativa restante for menor ou igual a 0:
      clearLetterStates();
      setGameState(stages[2].name);
    }
  }, [guesses]);

  // check win condition:
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // win coddition

    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // Resert game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // Função que vai reniciar o jogo:
  const retry = () => {
    setScore(0);
    setGuesses(guessesNumber);

    setGameState(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          guessedLetters={guessedLetters}
          wrongLatters={wrongLatters}
          pickedWord={pickedWord}
          letters={letters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
