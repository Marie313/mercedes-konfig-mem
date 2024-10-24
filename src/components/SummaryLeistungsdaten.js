import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SummaryLeistungsdaten = ({motorSteps}) => {
    const [showleistungsdaten, setshowleistungsdaten] = useState(false);
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/models`);
            const data = await response.json();
            setModels(data);
        };
        
        fetchData(motorSteps);
    }, [motorSteps]);

    const infoMotor = (modelsid, modelsspecific, modelsfuel) => {
        if (motorSteps == modelsid){
            return(
                <div className="leistungsdaten">
                    <div className="daten">
                        <b><p>Leistung:</p></b>
                        <p>{modelsspecific.power}</p>
                    </div>
                    <div className="daten">
                        <b><p>Masse:</p></b>
                        <p>{modelsfuel.weight}</p>
                    </div>
                    <div className="daten">
                        <b><p>Zylinder:</p></b>
                        <p>{modelsspecific.cylinders}</p>
                    </div>
                    <div className="daten">
                        <b><p>Hubraum:</p></b>
                        <p>{modelsspecific.capacity}</p>
                    </div>
                    <div className="daten">
                        <b><p>Getriebe:</p></b>
                        <p>{modelsspecific.gear}</p>
                    </div>
                    <div className="daten">
                        <b><p>Beschleunigung 0-100 km/h:</p></b>
                        <p>{modelsspecific.acceleration}</p>
                    </div>
                    <div className="daten">
                        <b><p>Höchstgeschwindigkeit:</p></b>
                        <p>{modelsspecific.maxSpeed}</p>
                    </div>
                </div>
            )
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

    return (  
        <div>
            <div className={showleistungsdaten ? 'mbuttonsclicked' : 'mbuttons'}>
                <hr className="linem"/>
                <button onClick={() => setshowleistungsdaten(!showleistungsdaten)}>
                    Leistungsdaten
                    <div className="moreButtonm">{arrowIconleistung()}</div>
                </button>
            </div>
            {showleistungsdaten && 
                <div className="divleistungsdaten">
                    {models.map((models) => (
                        <div>{infoMotor(models.id, models.specifications, models.fuelConsumption)}</div>
                    ))}
                </div>
            }
        </div>
    );
}
 
export default SummaryLeistungsdaten;