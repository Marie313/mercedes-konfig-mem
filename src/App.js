import "./App.css";
import Toolbar from "./components/Toolbar";
import CarList from "./components/CarList";

const title = "Willkommen im Konfigurator";

function App() {
  return (
    <div className="App">
      <h1>{title}</h1>
      <div className="content">
        <Toolbar />
        <CarList />
      </div>
    </div>
  );
}

export default App;
