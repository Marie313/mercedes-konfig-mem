import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import MotorisierungInfos from "./MotorisierungInfos";

const SpMotorisierung = ({motorSteps, collectmotor}) => {
    const [steps, setSteps] = useState ([]);
    const [selectedM, setSelectedM] = useState ("all");
    const [buttid, setButtid] = useState({"Benziner" : true, "Diesel" : true, "Hybrid" : true});

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/steps`);
            const data = await response.json();
            setSteps(data);
        };
        fetchData(motorSteps);
    }, [motorSteps]);

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
                    {buttid[stepscheadline] && 
                        <div>
                            {stepscequipment.map((stepsce) => (
                                <div className="buttretmotor"><MotorisierungInfos stepsce={stepsce} motorSteps={motorSteps} collectmotor={collectmotor}/></div>
                            ))}
                        </div>
                    }
                </div>
            )
        }
    }
    
    const mbody = (stepsid, stepsc) => {
        if (stepsid == 2){
            return (
                <div>
                {stepsc.map((stepsc) => (
                    <div>
                        <select className="selctm" value={selectedM} onChange={(event) => setSelectedM(event.target.value)}>
                            <option value="all">Alle</option>
                            {stepsc.equipmentGroups.map((stepseqG)=>(
                                <option value={stepseqG.headline}>{stepseqG.headline}</option>
                            ))}
                        </select>
                        {stepsc.equipmentGroups.map((stepseqG) =>(
                            <div>{returnm(stepseqG.headline, stepseqG.equipments)}</div>
                        ))}
                        <hr className="linem"/>
                    </div>
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