import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SpMotorisierung = ({motorSteps, collectmotor, collectmotorsteps, collectmotorname}) => {
    const [steps, setSteps] = useState ([]);
    const [models, setModels] = useState ([]);
    const [selectedM, setSelectedM] = useState ("all");
    const [buttid, setButtid] = useState({"Benziner" : true, "Diesel" : true, "Hybrid" : true});
    const [selectedMotor,setSelectedMotor] = useState('A_250_e_Limousine_mit_EQ_Hybrid_Technologie');

    useEffect(() => {
        if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8003/steps`);
              const data = await response.json();
              setSteps(data)
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
    },[]);

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

    const changeSelect = (event) => {
        setSelectedM(event.target.value)
    }

    const changeSelectedMotor = (modelId, modelsrenperc, modelsname) => {
        setSelectedMotor(modelId);
        collectmotorname(modelsname);
        collectmotor(modelsrenperc);
        collectmotorsteps(modelId)
    }

    const showbuttret = (stepscequipment) => {
        return(
            <div>
                {stepscequipment.map((stepsce) => (
                    <div className="buttretmotor">{informationMotor(stepsce)}</div>
                ))}
            </div>
        )
    }

    const informationMotor = (stepsce) => {
        return( 
            <div>
                {models.map((models) => (
                    <div>{infoMotor(stepsce, models.id, models.name, models.specifications, models.fuelConsumption, models.rentalPercentage)}</div>
                ))}
            </div>
        )
    }

    const infoMotor = (stepsce, modelsid, modelsname, modelsspecific, modelsfuel, modelsrenperc) => {
        if(stepsce == modelsid){
            if(modelsfuel?.wltp.hybrid){
                return(
                    <div>
                            <div className="inline">
                                <div className="left">
                                    <input className="motorCheck" checked={selectedMotor == modelsid} onChange={() => changeSelectedMotor( modelsid, modelsrenperc, modelsname)} type="checkbox"/>
                                    <h2 className="motorname">{modelsname}</h2>
                                </div>
                                <div className="right">
                                    <h2 className="motorname">Zinssatz {modelsrenperc.toFixed(2)}%</h2>
                                </div>
                            </div>
                            <div className="blocks">
                            <div className="blockone">
                            <div className="inline">
                                <p className="pmotorstrong">Antrieb:</p>
                                <p className="pmotorflex">{modelsspecific?.engineType}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Leistung:</p>
                                <p className="pmotorflex">{modelsspecific?.power}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Zylinder:</p>
                                <p className="pmotorflex">{modelsspecific?.cylinders}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Hubraum:</p>
                                <p className="pmotorflex">{modelsspecific?.capacity}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Getriebe:</p>
                                <p className="pmotorflex">{modelsspecific?.gear}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Beschleunigung 0-100 km/h:</p>
                                <p className="pmotorflex">{modelsspecific?.acceleration}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Höchstgeschwindigkeit:</p>
                                <p className="pmotorflex">{modelsspecific?.maxSpeed}</p>
                            </div>
                        </div>
                        <div className="blocktwo">
                            <div className="inline">
                                <p className="pmotorstrong">Kraftstoffverbrauch gewichtet, kombiniert:</p>
                                <p className="pmotorflex">{modelsfuel?.wltp.weighted}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">Stromverbrauch gewichtet, kombiniert:</p>
                                <p className="pmotorflex">{modelsfuel?.wltp.powerConsumptionWeighted}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">CO2-Emission gewichtet, kombiniert:</p>
                                <p className="pmotorflex">{modelsfuel?.wltp.co2Weighted}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">CO2-Klasse (gewichtet, kombiniert):</p>
                                <p className="pmotorflex">{modelsfuel?.co2ClassWeighted}</p>
                            </div>
                            <div className="inline">
                                <p className="pmotorstrong">CO2-Klasse (bei entladener Batterie):</p>
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
                                <input className="motorCheck" type="checkbox" checked={selectedMotor == modelsid} onChange={() => changeSelectedMotor(modelsid, modelsrenperc, modelsname)}/>
                                <h2 className="motorname">{modelsname}</h2>
                            </div>
                            <div className="right">
                                <h2 className="motorname">Zinssatz {modelsrenperc.toFixed(2)}%</h2>
                            </div>
                        </div>
                        <div className="blocks">
                        <div className="blockone">
                        <div className="inline">
                            <p className="pmotorstrong">Antrieb:</p>
                            <p className="pmotorflex">{modelsspecific?.engineType}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">Leistung:</p>
                            <p className="pmotorflex">{modelsspecific?.power}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">Zylinder:</p>
                            <p className="pmotorflex">{modelsspecific?.cylinders}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">Hubraum:</p>
                            <p className="pmotorflex">{modelsspecific?.capacity}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">Getriebe:</p>
                            <p className="pmotorflex">{modelsspecific?.gear}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">Beschleunigung 0-100 km/h:</p>
                            <p className="pmotorflex">{modelsspecific?.acceleration}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">Höchstgeschwindigkeit:</p>
                            <p className="pmotorflex">{modelsspecific?.maxSpeed}</p>
                        </div>
                    </div>
                    <div className="blocktwo">
                        <div className="inline">
                            <p className="pmotorstrong">Kraftstoffverbrauch kombiniert:</p>
                            <p className="pmotorflex">{modelsfuel?.wltp.total}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">CO2-Emission kombiniert:</p>
                            <p className="pmotorflex">{modelsfuel?.wltp.co2Total}</p>
                        </div>
                        <div className="inline">
                            <p className="pmotorstrong">CO2-Klasse:</p>
                            <p className="pmotorflex">{modelsfuel?.co2Class}</p>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    }

    const clickreaction = (stepscheadline) => {
        setButtid(prevButtid => ({
            ...prevButtid,
            [stepscheadline]: !prevButtid[stepscheadline] // Zustand umschalten
        }));
    }

    const arrowIcon = (stepscheadline) => {
        if (buttid[stepscheadline]){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const returnm = (stepscheadline, stepscequipment) => {
        if (selectedM == "all" || selectedM == stepscheadline){
            return(
                <div>
                    <div className={buttid[stepscheadline] ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreaction(stepscheadline)}>
                            {stepscheadline}
                            <div className="moreButtonm">{arrowIcon(stepscheadline)}</div>
                        </button>
                    </div>
                    {buttid[stepscheadline] && showbuttret(stepscequipment)}
                </div>
            )
        }
    }

    const mapstepsc = (stepseqG) => {
        return(
            <div>
                <select className="selctm" value={selectedM} onChange={changeSelect}>
                    <option value="all">Alle</option>
                    {stepseqG.map((stepseqG) =>(
                        <option value={stepseqG.headline}>{stepseqG.headline}</option>
                    ))}
                </select>
                {stepseqG.map((stepseqG) =>(
                    <div>{returnm(stepseqG.headline, stepseqG.equipments)}</div>
                ))}
                <hr className="linem"/>
            </div>
        )
    }
    
    const mbody = (stepsid, stepsc) => {
        if (stepsid == 2){
            return (
                <div>
                {stepsc.map((stepsc) => (
                    <div>{mapstepsc(stepsc.equipmentGroups)}</div>
                ))}
                </div>
            )
        }
    }

    return ( 
        <div className="motorisierung">
            {steps.map((steps) => (
                <div>
                    {mbody(steps.id, steps.categories)}
                </div>
            ))}
        </div> 
    );
}
 
export default SpMotorisierung;