import { useState } from "react";
import { useHistory } from "react-router";
import "./ChooseLevel.css";
export default function ChooseLevel() {
  const history = useHistory();
  const [mode, setMode] = useState(null);

  const chooseLevel = (level) => {
    localStorage.removeItem("level");
    localStorage.setItem("level", level);
    setMode(level);
  };

  const handleConfirm = () => {
    if (!mode) {
      alert("Select a level.");
    } else {
      history.push("/game");
    }
  };

  return (
    <div>
      <p>Select a difficulty level: </p>
      <div className="game-level">
        <li
          className={localStorage.getItem("level") === "easy" ? "chosen" : ""}
          onClick={() => chooseLevel("easy")}
        >
          Easy
        </li>

        <p className="instructions">
          Finish the game within 5 mins and 30 turns.
        </p>
      </div>
      <div className="game-level">
        <li
          className={localStorage.getItem("level") === "medium" ? "chosen" : ""}
          onClick={() => chooseLevel("medium")}
        >
          Medium{" "}
        </li>
        <p className="instructions">
          Finish the game within 3 mins and 15 turns.
        </p>
      </div>
      <div className="game-level">
        <li
          className={localStorage.getItem("level") === "hard" ? "chosen" : ""}
          onClick={() => chooseLevel("hard")}
        >
          Hard{" "}
        </li>
        <p className="instructions">
          Finish the game within 1 min and 10 turns.
        </p>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
}
