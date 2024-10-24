import {useEffect, useState} from "react";
import SpMotorisierung from "./SpMotorisierung";
import SpLinesPakete from "./SpLinesPakete";
import SpFarbenRaeder from "./SpFarbenRaeder";
import SpPolsterZierelemente from "./SpPolsterZierelemente";
import SpAusstattung from "./SpAusstattung";
import SpMeinMercedesBenz from "./SpMeinMercedesBenz";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import cancel from "../image/cancel.svg";
import {useHistory} from 'react-router-dom';

const SpNav = (props) => {
    const MySwal = withReactContent(Swal); //für sweetalert
    const location = useLocation(); //useLocation hat den Wert des gesmaten Url-Objekts (siehe: pathname: `/configurator/${carsClass}`(CL.js, 116))
    const history = useHistory();
    const {selectedModell}  = location.state || {};
    const [specificModel, setSpecificModel] = useState('Mietmodell'); //notwendig für Schriftzug (Mietmodell/Kaufmodell)
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleSummary, setIsVisibleSummary] = useState(false);

    const handleBau = () => {
      setIsVisible(!isVisible)
    }// alert der bei dem Versuch zur Startseite zurückzukeheren geworfen wird

    const backHome = () => {
      history.push('/');
    }

    const changeNav = (stepsid) => {
      props.updateNavSelection(props.navSteps[stepsid-1]); // -1 wegen der Differenz zwischen der stepsid aus den json und dem Index des jeweiligen Elements in meiner navSteps
    } //wird aufgerufen wenn anderes Navbar-Element (=step) über mMercedes aufgerufen wird (hier Motorisierung)

    const deleteElementSmry = (stepsid, linestype, zpname, zppreis) => {
      console.log(stepsid);
      if(stepsid == 3){
        if(linestype == 'winterpaket'){
          props.collectwinterpaketplus([0,null])
        }
        else if(linestype == 'lederpaket'){
          props.collectlederpaket([0,null])
        }
        else if(linestype == 'zusatzpaket'){
          props.collectzusatzpaket([[zpname.slice(0, 3), zppreis],[zpname, false]])
        }
        else{
          setIsVisibleSummary(!isVisibleSummary)
        }
      }
      else if(stepsid == 5 || stepsid == 4){
        setIsVisibleSummary(!isVisibleSummary)
      }
    }

    useEffect(() => {
        if (selectedModell === "mietmodell") {
          setSpecificModel("Mietmodell");
        }
        if (selectedModell === "kaufmodell") {
          setSpecificModel("Kaufmodell");
        }
    }, [selectedModell]); // Schriftzug unter Navbar dynamisch anpassen 

    return (
      <div>
        <div className="spbodyheadline">
            <div className="navButtonContainer">
                <button className="navButtonBau" onClick={handleBau}>Baureihe</button>
                {props.navSteps.map((step)=>(
                    <div>
                      {step != "Baureihe" && <button className={props.currentStep == step ? "navButtonActive" : "navButton"} onClick={() => props.updateNavSelection(step)}>{step}</button>}
                    </div>
                ))}
            </div>
            <h1 className="headlineSpecific">
              Neubestellung {props.elementName.motorName} im {specificModel}
              {console.log(props.elementName.equipment)}
            </h1>
            <div className="specificBody">
                {props.currentStep == 'Motorisierung' && <SpMotorisierung motorSteps={props.elementName.motorSteps} collectmotor={props.collectmotor}/>}
                {props.currentStep == 'Lines & Pakete' && <SpLinesPakete motorSteps={props.elementName.motorSteps} linename={props.elementName.line} paketlinename={props.elementName.packageLine} lederPaketname={props.elementName.leatherPackage} zusatzPaketname={props.elementName.addPackage} winterpaketplusname={props.elementName.winterPackagePlus} collectline={props.collectline} collectpaketline={props.collectpaketline} collectwinterpaketplus={props.collectwinterpaketplus} collectlederpaket={props.collectlederpaket} collectzusatzpaket={props.collectzusatzpaket}/>}
                {props.currentStep == 'Farben & Räder' && <SpFarbenRaeder motorSteps={props.elementName.motorSteps} namefarbe={props.elementName.color} nameraeder={props.elementName.wheels} collectfarben={props.collectfarben} collectraeder={props.collectraeder}/>}
                {props.currentStep == 'Polster & Zierelemente' && <SpPolsterZierelemente motorSteps={props.elementName.motorSteps} namePolster={props.elementName.upholstery} nameZier={props.elementName.decorativeElements} collectpolster={props.collectpolster} collectzierelemente={props.collectzierelemente}/>}
                {props.currentStep == 'Ausstattungen' && <SpAusstattung elementName={props.elementName} collectausstattung={props.collectausstattung} collectline={props.collectline} collectpaketline={props.collectpaketline} collectwinterpaketplus={props.collectwinterpaketplus} collectlederpaket={props.collectlederpaket} collectzusatzpaket={props.collectzusatzpaket} collectfarben={props.collectfarben} collectraeder={props.collectraeder} collectpolster={props.collectpolster} collectzierelemente={props.collectzierelemente}/>}
                {props.currentStep == 'Mein Mercedes-Benz' && <SpMeinMercedesBenz elementName={props.elementName} elementPrice={props.elementPrice} changeNav={changeNav} deleteElementSmry={deleteElementSmry} mietrate={props.mietrate} miles={props.miles} collectausstattung={props.collectausstattung} collectline={props.collectline} collectpaketline={props.collectpaketline} collectwinterpaketplus={props.collectwinterpaketplus} collectlederpaket={props.collectlederpaket} collectzusatzpaket={props.collectzusatzpaket} collectfarben={props.collectfarben} collectraeder={props.collectraeder} collectzierelemente={props.collectzierelemente} collectpolster={props.collectpolster} setIsVisibleSummary={setIsVisibleSummary} isVisibleSummary={isVisibleSummary}/>}
            </div>
        </div>
        <div className="linesside">
            {isVisible && (
                <div className="displaydeatils">
                    <div className="detailBox">
                        <div className="canceldetailbtn"><button onClick={handleBau}><img className="cancelicon" src={cancel}/></button></div>
                        <h2 className="hinweis">Hinweis:</h2>
                        <p>Möchten Sie den Konfigurationsprozess wirklich verlassen?</p>
                        <button onClick={backHome} className="goBackBtn">Ja</button><button onClick={handleBau} className="goBackBtn">Nein</button>
                    </div>
                </div>
            )}
        </div>
      </div> 
    );
}
 
export default SpNav;