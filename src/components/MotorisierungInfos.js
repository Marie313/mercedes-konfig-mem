import { useState, useEffect } from "react";
import info from "../image/info.svg";
import cancel from "../image/cancel.svg";

const MotorisierungInfos = ({stepsce, motorSteps, collectmotor}) => {
    const [models, setModels] = useState ([]);
    const [isVisible, setIsVisible] = useState(false);
    const [name, setname] = useState('');

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/models`);
            const data = await response.json();
            setModels(data);
        };
        fetchData(motorSteps);
    }, [motorSteps]);

    const showDetailBox = (name) => {
        setIsVisible(!isVisible);
        setname(name);
    }

    const infoMotor = (stepsce, modelsid, modelsname, modelsspecific, modelsfuel, modelsrenperc) => {
        if(stepsce == modelsid){
            if(modelsfuel?.wltp.hybrid){
                return(
                    <div>
                        <div className="inline">
                            <div className="left">
                                <input className="wb-round-button" checked={motorSteps==modelsid} onChange={() => collectmotor([modelsname, modelsrenperc, modelsid])} type="checkbox"/>
                                <h2 className="motorname">{modelsname}</h2>
                                <button className="infoIconButtonMotor" onClick={() => showDetailBox(modelsname)}><img className="infoIcon" src={info} alt="info"/></button>
                            </div>
                            <div className="right">
                                <h2 className="motorname">Zinssatz {modelsrenperc.toFixed(2)}%</h2>
                            </div>
                        </div>
                        <div className="blocks">
                            <div className="blockone">
                                <div className="inline">
                                    <strong className="pmotorstrong">Antrieb:</strong>
                                    <p className="pmotorflex">{modelsspecific?.engineType}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Leistung:</strong>
                                    <p className="pmotorflex">{modelsspecific?.power}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Zylinder:</strong>
                                    <p className="pmotorflex">{modelsspecific?.cylinders}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Hubraum:</strong>
                                    <p className="pmotorflex">{modelsspecific?.capacity}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Getriebe:</strong>
                                    <p className="pmotorflex">{modelsspecific?.gear}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Beschleunigung 0-100 km/h:</strong>
                                    <p className="pmotorflex">{modelsspecific?.acceleration}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Höchstgeschwindigkeit:</strong>
                                    <p className="pmotorflex">{modelsspecific?.maxSpeed}</p>
                                </div>
                            </div>
                            <div className="blocktwo">
                                <div className="inline">
                                    <strong className="pmotorstrong">Kraftstoffverbrauch gewichtet, kombiniert:</strong>
                                    <p className="pmotorflex">{modelsfuel?.wltp.weighted}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">Stromverbrauch gewichtet, kombiniert:</strong>
                                    <p className="pmotorflex">{modelsfuel?.wltp.powerConsumptionWeighted}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">CO<sub>2</sub>-Emission gewichtet, kombiniert:</strong>
                                    <p className="pmotorflex">{modelsfuel?.wltp.co2Weighted}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">CO<sub>2</sub>-Klasse (gewichtet, kombiniert):</strong>
                                    <p className="pmotorflex">{modelsfuel?.co2ClassWeighted}</p>
                                </div>
                                <div className="inline">
                                    <strong className="pmotorstrong">CO<sub>2</sub>-Klasse (bei entladener Batterie):</strong>
                                    <p className="pmotorflex">{modelsfuel?.co2Class}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )    
            }
            return(
                <div>
                    <div className="inline">
                        <div className="left">
                            <input className="wb-round-button" type="checkbox" checked={motorSteps==modelsid} onChange={() => collectmotor([modelsname, modelsrenperc, modelsid])}/>
                            <h2 className="motorname">{modelsname}</h2>
                            <button className="infoIconButtonMotor" onClick={() => showDetailBox(modelsname)}><img className="infoIcon" src={info} alt="info"/></button>
                        </div>
                        <div className="right">
                            <h2 className="motorname">Zinssatz {modelsrenperc.toFixed(2)}%</h2>
                        </div>
                    </div>
                    <div className="blocks">
                        <div className="blockone">
                            <div className="inline">
                                <strong className="pmotorstrong">Antrieb:</strong>
                                <p className="pmotorflex">{modelsspecific?.engineType}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">Leistung:</strong>
                                <p className="pmotorflex">{modelsspecific?.power}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">Zylinder:</strong>
                                <p className="pmotorflex">{modelsspecific?.cylinders}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">Hubraum:</strong>
                                <p className="pmotorflex">{modelsspecific?.capacity}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">Getriebe:</strong>
                                <p className="pmotorflex">{modelsspecific?.gear}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">Beschleunigung 0-100 km/h:</strong>
                                <p className="pmotorflex">{modelsspecific?.acceleration}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">Höchstgeschwindigkeit:</strong>
                                <p className="pmotorflex">{modelsspecific?.maxSpeed}</p>
                            </div>
                        </div>
                        <div className="blocktwo">
                            <div className="inline">
                                <strong className="pmotorstrong">Kraftstoffverbrauch kombiniert:</strong>
                                <p className="pmotorflex">{modelsfuel?.wltp.total}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">CO<sub>2</sub>-Emission kombiniert:</strong>
                                <p className="pmotorflex">{modelsfuel?.wltp.co2Total}</p>
                            </div>
                            <div className="inline">
                                <strong className="pmotorstrong">CO<sub>2</sub>-Klasse:</strong>
                                <p className="pmotorflex">{modelsfuel?.co2Class}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (  
        <div>
            {models.map((models) => (
                <div>{infoMotor(stepsce, models.id, models.name, models.specifications, models.fuelConsumption, models.rentalPercentage)}</div>
            ))}
            <div className="linesside">
                {isVisible && (
                    <div className="displaydeatils">
                        <div className="detailBox">
                            <div className="canceldetailbtn"><button onClick={() => setIsVisible(false)}><img className="cancelicon" src={cancel}/></button></div>
                            <h3>{name}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default MotorisierungInfos;