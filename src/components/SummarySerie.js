import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SummarySerie = ({motorSteps}) => {
    const [showserie, setshowserie] = useState(false);
    const [equipmentsUpdate, setequipmentsUpdate] = useState([]);

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/equipmentsUpdate`);
            const data = await response.json();
            setequipmentsUpdate(data);
        };
        
        fetchData(motorSteps);
    }, [motorSteps]);

    const arrowIconserie = () => {
        if (showserie){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    return (  
        <div>
            <div className={showserie ? 'mbuttonsclicked' : 'mbuttons'}>
                <hr className="linem"/>
                <button onClick={() =>setshowserie(!showserie)}>
                    Serienausstatung
                    <div className="moreButtonm">{arrowIconserie()}</div>
                </button>
            </div>
            {showserie && 
                <div>
                    {equipmentsUpdate.map((eU) => (
                        <div>
                            {eU.price == 0.0 && 
                                <div className="summaryMotor">
                                    <b><p>{eU.id} {eU.name}</p></b>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
 
export default SummarySerie;