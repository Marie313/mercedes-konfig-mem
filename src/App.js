import "./App.css";
import Toolbar from "./components/Toolbar";
import SpecificCar from "./components/SpecificCar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const title = "Willkommen im Konfigurator";

// 1.
// Camel case isn't used for web routes because URLs are case-insensitive and should be easily readable.
// Using lowercase with hyphens improves readability and SEO.
// i.e. specificCar --> specific-car
// + when creating path names, think less of the purpose of the route in your eyes as the developer
// (selecting a specific car). The general purpose of the route is to configure the selected car. Something like
// /configurator would be more appropriate
//
// 2.
// class not classe
//
//

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>{title}</h1>
            <Toolbar />
          </Route>
          <Route path="/specificCar/:classe">
            <SpecificCar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
