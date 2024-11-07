import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const CarList = ({ selectedModell }) => {
  const [umstellung, setUmstellung] = useState([]); //Sammlung des series Objekts aus startpage.json
  const [umstellung2, setUmstellung2] = useState([]); //Sammlung des seriesGroups Objekts aus startpage.json
  const [focusedButton, setFocusedButton] = useState(null); //entspricht der id des geklickten Buttons/ geklickten bodytypes
  const [prompti, setPrompti] = useState([]); //Array mit umstellung Objekten, deren id dem geklicten bodytype entsprechen

  const uniqueSeriesGroups = umstellung.map(cars => cars.seriesGroup); //erstellt Array bestehnd aus den seriesGroups von umstellung

  useEffect(() => {
    const fetchData = async (fileName) => {
      const response = await fetch(`http://localhost:3057/${fileName}/series`);
      const response2 = await fetch(`http://localhost:3057/${fileName}/seriesGroups`);
      const data = await response.json();
      const data2 = await response2.json();
      setUmstellung(data);
      setUmstellung2(data2);
    };

    fetchData('startpage');
  }, []); //GET request um umstellung und umstellung2 mit Daten aus startpage.json zu befüllen

  const moreCars = (carsid) => { 
    if (focusedButton === carsid) //Abhängigkeit ob die übergebene id des bodytypes dem focusedButton entspricht (focused Button wird in showCar gesetzt)
      return (
        <button className="moreButton"><SlArrowUp /></button> //Pfeil nach oben, um einklappen der mehr angezeigten cars zu symbolisieren
      );
    return ( 
        <button className="moreButton"><SlArrowDown /></button> // Pfeil nach unten, um Möglichkeit des Anzeigen vor cars zu symbolisieren
    );
  };//Entscheidungslogik, ob der Pfeil bei den buttons zum Mehranzeigen, eine Pfeil navch oben oder Unten abbilden soll

  const showCar = (cars) => {
    const matchedCars = umstellung.filter((car) => cars.name === car.seriesGroup); //filtert die Liste der ganzen cars, nach cars die die seriesGroup haben, die gerade geklickt worden ist

    if (focusedButton){ //Selektion wenn focusedButton Wert hat
      setPrompti([]) //prompti wird auf leeres Array gesetzt (detailiertAnzeige wird ausgeblendet)
      setFocusedButton(null); //focusedButton wird null gestzt (Anzeigen des nach unten gerichteten Pfeils)
    }
    else{ //wenn focusedButton keinen Wert hat
      setPrompti(matchedCars); //prompti wird auf das zuvor erstellte matchedCars Array gestzt + detailierte Anzeige wird ausgelöst
      setFocusedButton(cars.id); //focusedButton wird auf den Wert von cars.id gestzt (Anzeige des nach oben gerichteten Pfeils)
    } //Logik zum setzen des focusedButton(unteranderem benötigt in moreCars) + setzen der Werte von prompti --> nötig für detailierte Ausgabe
  }; //Reaktion auf button Click
  
  const calcprompt = (name) => {
    var index = umstellung2.findIndex(umst => umst.name === name); //Ermittlung des index der seriesGroup (an welcher Stelle sie im Array stehen)

    if (index % 3 !== 0) {
      index = index + 1;
      if (index % 3 !== 0) {
        return('prompt2') //wenn index getilt durch drei Rest == 1 --> className == prompt2
      } 
      else {
        return('prompt3') //wenn index geteilt durch drei Rest == 2 --> className == prompt3
      }
    }
    return('prompt1') //wenn index ohne Rest durch 3 teilbar ist --> className == prompt1
  } //zur Entscheidung des classNames für prompti --> Relevant zur Verschiebung nach rechts/links in css

  const counts = new Map(); //Erstellung einer leeren Map (get, set, schlüssel-wert-paaere)
  const duplicates = []; //erstellen eines leeren Ararys, um es mit den doppelten seriesGroups zu befüllen

  uniqueSeriesGroups.forEach(item => {
    counts.set(item, (counts.get(item) || 0) + 1);
  }); //jedes Element des Arrays (bestehend aus den seriesGroups(multiple)) wird zu Map hinzugefügt, wobei der value (Anzahl des Vorkommens der jewiligen seriesGroup) gesetzt wird, nach Überprüfung ob der key (die seriesGroup) bereits vorkommt (+1)

  counts.forEach((count, item) => { //Reihenfolge der Paramter bei Map (value, key) !!!
    if (count > 1) {
      duplicates.push(item);
    }
  }) //für jedes Element der Map count wird überprüft, ob der value/ Wert (in dem Fall als count bezwichnet) größer eins ist, wenn dem so ist --> Element (key der Map) wird in duplicates gepushed
  
  return(
    <div className="returnALL">
      <div className="cars-map">
        {umstellung2.map((cars) => (
          <div>
            {duplicates.includes(cars.name)?
              <div>
                <div className="showReturn">
                  <button className={focusedButton === cars.id ? "clickred" : "notclickred" } onClick={() => {showCar(cars)}}>
                    <img src={cars.imageUrl} className="carsPic" />
                    <div className="backgroundcolor1">
                      <p className="carClass">{cars.name}</p>
                      {moreCars(cars.id)}
                    </div>
                  </button>
                </div>
                {prompti.some(car => car.seriesGroup === cars.name) ? ( 
                  <div className={calcprompt(cars.name)}>
                    {prompti.map((car) => (
                      <Link className="linkSpecificCarpr" to={{pathname: `/configurator/${car.name}`, state: { selectedModell }}}>
                        <div className="showReturn">
                          <img src={car.imageUrl} className="carsPicpr" alt={car.name} />
                          <div className="backgroundcolorpr">
                            <p className="carClass">{car.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            :
              <Link className="linkSpecificCar" to={{pathname: `/configurator/${cars.name}`, state: { selectedModell }}}>
                <div className="showReturn">
                  <img src={cars.imageUrl} className="carsPic" alt={cars.name} />
                  <div className="backgroundcolor">
                    <p className="carClass">{cars.name}</p>
                  </div>
                </div>
              </Link>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;