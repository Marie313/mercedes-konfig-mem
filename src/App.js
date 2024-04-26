import "./App.css";
import Toolbar from "./components/Toolbar";
import SpecificCar from "./components/SpecificCar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const title = "Willkommen im Konfigurator";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>{title}</h1>
            <Toolbar />
          </Route>
          <Route path="/specificCar/:id">
            <SpecificCar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
