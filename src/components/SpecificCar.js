import {useEffect, useState} from "react";
import SpNav from "./SpNav";
import SpPic from "./SpPic";
import SpMenu from "./SpMenu";
import loader from "../image/loader_overlay.gif";

const SpecificCar = () => {
  const [showComponent, setShowComponent] = useState(false); // für Timeout Funktion (anzeigen des loading gifs --> setShowComponent wird erst nach 1000ms true gesetzt)
  const [mietrate, setMietrate] = useState();
  const [miles, setMiles] = useState('1 - 9.099 km');

  const navSteps = ["Baureihe", "Motorisierung", "Lines & Pakete", "Farben & Räder", "Polster & Zierelemente", "Ausstattungen", "Mein Mercedes-Benz"];
  const [currentStep, setCurrentStep] = useState("Motorisierung");
  //relevante Daten für Navbar(welcher Unterpunkt aufgerufen?) 

  const [elementPrice, setElementPrice] = useState({
    interestRate: 1,
    line: 11.01,
    packageLine: 33.8,
    leatherPackage: 0,
    addPackage: [['P44', 0], ['P49', 0], ['PAV', 2.8]],
    winterPackagePlus: 0,
    color: 7.5,
    wheels: 0,
    upholstery: 0,
    decorativeElements: 0,
    equipment: [],
  }); //Sammeln der Preise der gewählten Elemente zur Berechnung vom Endpreis
  
  const [elementName, setElementName] = useState ({
    motorName: 'A 250 e Limousine mit EQ Hybrid Technologie',
    motorSteps: 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie',
    line: 'P59 Progressive', 
    packageLine: 'PSE Progressive Line Advanced',
    leatherPackage: '',
    addPackage: ['P44 Park-Paket mit Rückfahrkamera', 'P49 Spiegel-Paket', 'PAV Winter-Paket'],
    winterPackagePlus: '',
    color: '191 Metalliclack kosmosschwarz',
    wheels: '25R 43,2 cm (17\'\') Leichtmetallräder im 5-Doppelspeichen-Design',
    upholstery: '311 Ledernachbildung ARTICO / Stoff Bertrix schwarz',
    decorativeElements: '52H Zierelemente Carbonoptik dunkel',
    equipment: [],
  }); // Sammeln der Namen der gewählten Elemente für die Summary auf mMercedes Komponente
  console.log(elementName.equipment);
  
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true);
    }, 1000); // Verzögerung von 1 Sekunde
  }, []);

  const deleteElementSummary = (key) => {
    setElementName((prevState) => ({
      ...prevState, [key]: null,
    }));
  }

  const collectmotor = (motor) => {
    setElementPrice((prevState) => ({
      ...prevState,       
      interestRate: motor[1],
    }));
    setElementName((prevState) => ({
      ...prevState, motorName: motor[0], motorSteps: motor[2],
    }));
  } // sammelt Daten aus Motor-Komponente

  const collectfarben = (farben) => {
    setElementPrice((prevState) => ({
      ...prevState, color: farben[0],
    }));
    setElementName((prevState) => ({
      ...prevState, color: farben[1],
    }));
  } //sammelt Daten über Fahrzeugfarbe in FarbenRaeder-Komponente

  const collectraeder = (raeder) => {
    setElementPrice((prevState) => ({
      ...prevState, wheels: raeder[0],
    }));
    setElementName((prevState) => ({
      ...prevState, wheels: raeder[1],
    }));
  } //sammelt Daten über Räder in FarbenRaeder-Komponente

  const collectpolster = (polster) => {
    setElementPrice((prevState) => ({
      ...prevState, upholstery: polster[0],
    }));
    setElementName((prevState) => ({
      ...prevState, upholstery: polster[1],
    }));
  } //sammelt Daten über Sitzpolster in PolsterZierelemente-Komponente

  const collectzierelemente = (zierelemente) => {
    setElementPrice((prevState) => ({
      ...prevState, decorativeElements: zierelemente[0],
    }));
    setElementName((prevState) => ({
      ...prevState, decorativeElements: zierelemente[1],
    }));
  } //sammelt Daten über Zierelemente in PolsterZierelemente-Komponente

  const collectline = (line) => {
    setElementPrice((prevState) => ({
      ...prevState, line: line[0],
    }));
    setElementName((prevState) => ({
      ...prevState, line: line[1],
    }));
  } 
  
  const collectpaketline = (paketline) => {
    setElementPrice((prevState) => ({
      ...prevState, packageLine: paketline[0],
    }));
    setElementName((prevState) => ({
      ...prevState, packageLine: paketline[1],
    }));
  }

  const collectwinterpaketplus = (winterpaketplus) => {
    setElementPrice((prevState) => ({
      ...prevState, winterPackagePlus: winterpaketplus[0],
    }));
    setElementName((prevState) => ({
      ...prevState, winterPackagePlus: winterpaketplus[1],
    }));
  }

  const collectlederpaket = (leder) => {
    setElementPrice((prevState) => ({
      ...prevState, leatherPackage: leder[0],
    }));
    setElementName((prevState) => ({
      ...prevState, leatherPackage: leder[1],
    }));
  }

  const collectzusatzpaket = (zusatz) => {
    setElementPrice((prevState) => {
      const prevzpname = prevState.addPackage || [];
      const zppreised =  [zusatz[0][0], zusatz[0][1]];
      console.log(zppreised)
      console.log(elementPrice.addPackage)
      if (zusatz[0][2]) {
          return {
            ...prevState, addPackage: [...prevzpname, zppreised],
          };
      } 
      else {
        return {
          ...prevState, addPackage: prevzpname.filter(z => z[0] !== zppreised[0]),
        };
      }
    });
    setElementName((prevState) => {
      const prevzpname = prevState.addPackage || [];
      if (zusatz[1][1]) {
          return {
            ...prevState, addPackage: [...prevzpname, zusatz[1][0]],
          };
      } 
      else {
        return {
          ...prevState, addPackage: prevzpname.filter(z => z !== zusatz[1][0]),
        };
      }
    });
  }//sammeln Daten aus LinesPakete-Komponente

  const collectausstattung = (ausstattung) => {
    setElementPrice((prevState) => {
      const prevname = prevState.equipment || [];
      const auspreised =  [ausstattung[0][0], ausstattung[0][1]];
      if (ausstattung[0][2]) {
          return {
            ...prevState, equipment: [...prevname, auspreised],
          };
      } 
      else {
        return {
          ...prevState, equipment: prevname.filter(z => z[0] !== auspreised[0]),
        };
      }
    });
    setElementName((prevState) => {
      const prevname = prevState.equipment || [];
      if (ausstattung[1][1]) {
          return {
            ...prevState, equipment: [...prevname, ausstattung[1][0]],
          };
      } 
      else {
        return {
          ...prevState, equipment: prevname.filter(z => z !== ausstattung[1][0]),
        };
      }
    });
  } //sammelt Daten aus Ausstattung-Komponente

  const updateNavSelection = (id) => {
    setCurrentStep(id);
  };

  return (<div>{showComponent ? 
  <div className="specific-preview"> <SpPic currentStep={currentStep}/> 
    <div className="menuandnav"><SpNav deleteElementSummary={deleteElementSummary} elementName={elementName} collectmotor={collectmotor} collectline={collectline} 
    collectpaketline={collectpaketline} collectwinterpaketplus={collectwinterpaketplus} collectlederpaket={collectlederpaket} 
    collectzusatzpaket={collectzusatzpaket} collectfarben={collectfarben} collectraeder={collectraeder} collectpolster={collectpolster} 
    collectzierelemente={collectzierelemente} collectausstattung={collectausstattung} navSteps={navSteps} currentStep={currentStep} 
    updateNavSelection={updateNavSelection} elementPrice={elementPrice} mietrate={mietrate} miles={miles}/>
    <SpMenu setMietrate={setMietrate} setMiles={setMiles} motorSteps= {elementName.motorSteps} currentStep={currentStep} navSteps={navSteps} updateNavSelection={updateNavSelection} elementPrice={elementPrice}/>
    </div>
  </div> 
  : 
  <div className="loaderdiv"><img className="loader" src={loader} alt="Ladeanimation" /></div>}</div>); 
  //return aller Elemente die nicht über die einzelnen steps-Komponenten gelöst werden oder des loading difs während der Timeout Funktion
};

export default SpecificCar; 