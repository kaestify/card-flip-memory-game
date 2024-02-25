import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Game.css";
import SingleCard from "./components/SingleCard";
import CountDownTimer from "./components/CountDownTimer";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function Game() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [mode, setMode] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [maxTurns, setMaxTurns] = useState(null);
  const [newGame, setNewGame] = useState(false);
  const history = useHistory();

  useEffect(() => {
    //get mode
    console.log(localStorage.getItem("level"));
    setMode(localStorage.getItem("level"));
    if (mode === "easy") {
      setMaxTurns(30);
    } else if (mode === "medium") {
      setMaxTurns(15);
    } else {
      setMaxTurns(10);
    }
  }, [mode]);

  //shuffle cards
  const shuffleCards = () => {
    setNewGame(false);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setNewGame(true);
    console.log(cards);
  };

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (turns < maxTurns) {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    } else {
      // alert("You lose!");
      shuffleCards();
    }
  }, [choiceOne, choiceTwo, turns]);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (maxTurns - turns === 0 && newGame) {
      alert("You lose!");
      history.push("/");
    }
  }, [maxTurns, turns, newGame]);
  return (
    <div className="Game">
      <h1>Magic Match</h1>
      <p>Remaining Turns: {maxTurns - turns}</p>
      <CountDownTimer
        shuffleCards={shuffleCards}
        mode={mode}
        newGame={newGame}
      />
      <Link to="/">
        <button>New Game</button>
      </Link>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
