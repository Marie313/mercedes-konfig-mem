import {useParams, useLocation} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import SpecificCar from "./SpecificCar";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SpMeinMercedesBenz = ({motorSteps, motorName, linename, paketlinename, zusatzPaketname, winterPaketplusname, lederPaketname, nameraeder, namefarbe, namePolster, nameZier}) => {
    const [steps, setSteps] = useState ([]);
    const [models, setModels] = useState([]);
    const [showMotorisierung, setShowMotorisierung] = useState(false);
    const [showserie, setshowserie] = useState(false);
    const [showsonder, setshowsonder] = useState(false);
    const [showkonditionen, setshowkonditionen] = useState(false);
    const [showleistungsdaten, setshowleistungsdaten] = useState(false);
    const [showverbrauchsdaten, setshowverbrauchsdaten] = useState(true);
    const [showreifenlabel, setshowreifenlabel] = useState(false);

    useEffect(() => {
        if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8003/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8021/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8017/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8018/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8020/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8019/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8015/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_250_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8014/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
        else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8013/steps`);
              const data = await response.json();
              setSteps(data);
          };
          fetchData();
        }
    }, []);

    useEffect(() => {
        if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8003/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8021/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8017/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8018/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8020/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8019/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8015/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_250_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8014/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
        else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8013/models`);
              const data = await response.json();
              setModels(data);
          };
          fetchData();
        }
},[]);

    const showMotor = () => {
        return <SpecificCar/>
    }

    const iffarbenraeder = (title) => {
        if(title == 'Farben'){
            return(
                <div>
                    {namefarbe && <div className="summaryMotor">
                        <h2>{namefarbe}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                </div>
            )
        }
        else if(title == 'Räder'){
            return(
                <div>
                    {nameraeder && <div className="summaryMotor">
                        <h2>{nameraeder}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                </div>
            )
        }
    }

    const ifpolsterzier = (title) => {
        if(title == 'Polster'){
            return(
                <div>
                    {namePolster && <div className="summaryMotor">
                        <h2>{namePolster}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                </div>
            )
        }
        else if(title == 'Zierelemente'){
            return(
                <div>
                    {nameZier && <div className="summaryMotor">
                        <h2>{nameZier}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                </div>
            )
        }
    }

    const stepsheadline = (stepsid,stepstitle, stepscategories) => {
        if(stepsid == 2){
            return(
                <div>
                    <div className="stepsheadline">
                        <b>{stepstitle}</b>
                    </div>
                    <div className="summaryMotor">
                        <h2>{motorName}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>
                </div>
            )
        }
        else if(stepsid == 3){
            return(
                <div>
                    <div className="stepsheadline">
                        <b>{stepstitle}</b>
                    </div>
                    {linename && <div className="summaryMotor">
                        <h2>{linename}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                    {paketlinename && <div className="summaryMotor">
                        <h2>{paketlinename}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                    {winterPaketplusname && <div className="summaryMotor">
                        <h2>{winterPaketplusname}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                    {lederPaketname && <div className="summaryMotor">
                        <h2>{lederPaketname}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                    {zusatzPaketname && <div className="summaryMotor">
                        <h2>{zusatzPaketname}</h2>
                        <button className="pencil" onClick={() => showMotor()}><FaPencilAlt /></button>
                    </div>}
                </div>
            )
        }
        else if(stepsid == 4){
            return(
                <div>
                    {stepscategories.map((stepsc) => (
                        <div>
                            <div className="stepsheadline">
                                <b>{stepsc.title}</b>
                            </div>
                            {iffarbenraeder(stepsc.title)}
                        </div>
                    ))}
                </div>
            )
        }
        else if(stepsid == 5){
            return(
                <div>
                    {stepscategories.map((stepsc) => (
                        <div>
                            <div className="stepsheadline">
                                <b>{stepsc.title}</b>
                            </div>
                            {ifpolsterzier(stepsc.title)}
                        </div>
                    ))}
                </div>
            )
        }
    }

    const arrowIconserie = () => {
        if (showserie){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const arrowIconsonder = () => {
        if (showsonder){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const arrowIconkonditionen = () => {
        if (showkonditionen){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const arrowIconleistung = () => {
        if (showleistungsdaten){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const arrowIconverbrauch = () => {
        if (showverbrauchsdaten){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const arrowIconreifen = () => {
        if (showreifenlabel){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const clickreactionserie = () => {
        setshowserie(!showserie);
    }

    const clickreactionsonder = () => {
        setshowsonder(!showsonder);
    }

    const clickreactionkonditionen = () => {
        setshowkonditionen(!showkonditionen);
    }

    const clickreactionleistung = () => {
        setshowleistungsdaten(!showleistungsdaten);
    }

    const clickreactionverbrauch = () => {
        setshowverbrauchsdaten(!showverbrauchsdaten);
    }

    const clickreactionreifen = () => {
        setshowreifenlabel(!showreifenlabel);
    }

    const lesitungsdaten = () => {
        return( 
            <div className="divleistungsdaten">
                {models.map((models) => (
                    <div>{infoMotor(models.id, models.specifications, models.fuelConsumption)}</div>
                ))}
            </div>
        )
    }

    const infoMotor = (modelsid, modelsspecific, modelsfuel) => {
        if (motorSteps == modelsid){
            return(
                <div className="leistungsdaten">
                    <div className="daten">
                        <p>Leistung:</p>
                        <p>{modelsspecific.power}</p>
                    </div>
                    <div className="daten">
                        <p>Masse:</p>
                        <p>{modelsfuel.weight}</p>
                    </div>
                    <div className="daten">
                        <p>Zylinder:</p>
                        <p>{modelsspecific.cylinders}</p>
                    </div>
                    <div className="daten">
                        <p>Hubraum:</p>
                        <p>{modelsspecific.capacity}</p>
                    </div>
                    <div className="daten">
                        <p>Getriebe:</p>
                        <p>{modelsspecific.gear}</p>
                    </div>
                    <div className="daten">
                        <p>Beschleunigung 0-100 km/h:</p>
                        <p>{modelsspecific.acceleration}</p>
                    </div>
                    <div className="daten">
                        <p>Höchstgeschwindigkeit:</p>
                        <p>{modelsspecific.maxSpeed}</p>
                    </div>
                </div>
            )
        }
    }

    return (  
        <div className="motorisierung">
            <div className="elementssummary">
                {steps.map((steps) => (
                    <div>
                        {stepsheadline(steps.id, steps.title, steps.categories)}
                    </div>
                ))}
            </div>
            <div className="summary">
                <div className={showserie ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreactionserie()}>
                            Serienausstatung
                            <div className="moreButtonm">{arrowIconserie()}</div>
                        </button>
                </div>
                <div className={showsonder ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreactionsonder()}>
                            Sonderausstattung
                            <div className="moreButtonm">{arrowIconsonder()}</div>
                        </button>
                </div>
                <div className={showkonditionen ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreactionkonditionen()}>
                            Konditionen und Preise
                            <div className="moreButtonm">{arrowIconkonditionen()}</div>
                        </button>
                </div>
                <div className={showleistungsdaten ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreactionleistung()}>
                            Leistungsdaten
                            <div className="moreButtonm">{arrowIconleistung()}</div>
                        </button>
                </div>
                {showleistungsdaten && lesitungsdaten()}
                <div className={showverbrauchsdaten ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreactionverbrauch()}>
                            Verbrauchsdaten
                            <div className="moreButtonm">{arrowIconverbrauch()}</div>
                        </button>
                </div>
                <div className={showreifenlabel ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreactionreifen()}>
                            EU-Reifenlabel
                            <div className="moreButtonm">{arrowIconreifen()}</div>
                        </button>
                        <hr className="linem"/>
                </div>
            </div>
            <div className="searchdiv">
                <h2>Suchen Sie hier nach einem Ausstattungscode oder geben Sie einen Suchbegriff ein:</h2>
                <input className="searchbar" type="text" placeholder="Ausstattungscode oder Suchbegriff"/>
                <p className="ppricelist">Ausstattungscodes und -benennungen entnehmen SIe bitte der jeweiligen</p>
                <a href="https://members-int.mercedes-benz.de/portal/fa/public/homepage.html#pricelists" target="_blank" className="linkpricelist">Preisliste im Downloadcenter.</a>
            </div>
            <div className="emaildiv">
                <h2>Möchten Sie Ihre Konfiguration per E-Mail versenden?</h2>
                <input className="emailinput" type="text" value="nadja.seeliger@mercedes-benz.com"/>
                <button className="emailbutton">Senden</button>
            </div>
            <div className="mietumfang"> 
                <img className="mietumfangimg" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>
                <p className="mietumfangp">Ausstattungsumfang im Mietmodell</p>
            </div>
        </div> 
    );
}
 
export default SpMeinMercedesBenz;