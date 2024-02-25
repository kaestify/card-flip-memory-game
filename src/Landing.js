import "./Landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-div">
      <Link to="/chooselevel">
        <button className="landing-button">Enter Game</button>
      </Link>
    </div>
  );
}
