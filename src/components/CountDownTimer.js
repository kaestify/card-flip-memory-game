import { useState, useEffect } from "react";
import "./CountDownTimer.css";
import { useHistory } from "react-router-dom";
export default function CountDownTimer({ mode }) {
  console.log("timer", mode === "easy");
  const history = useHistory();
  const [counter, setCounter] = useState(null);
  useEffect(() => {
    setCounter(mode === "easy" ? 300 : mode === "medium" ? 180 : 60);
  }, [mode]);
  //   console.log(counter);
  useEffect(() => {
    if (counter === 0) {
      alert("You lose!");
      history.push("/");
      return;
    }
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter]);
  return <h4 className="blink">Timer: {counter} seconds</h4>;
}
