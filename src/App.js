import { Switch, Route, BrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import Game from "./Game";
import ChooseLevel from "./ChooseLevel";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/chooselevel">
            <ChooseLevel />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
