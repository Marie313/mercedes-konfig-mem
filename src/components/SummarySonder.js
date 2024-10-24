import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SummarySonder = ({motorSteps}) => {
    const [showsonder, setshowsonder] = useState(false);
    const [equipmentsUpdate, setequipmentsUpdate] = useState([]);

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/equipmentsUpdate`);
            const data = await response.json();
            setequipmentsUpdate(data);
        };
        
        fetchData(motorSteps);
    }, [motorSteps]);

    const arrowIconsonder = () => {
        if (showsonder){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    return (  
        <div>
            <div className={showsonder ? 'mbuttonsclicked' : 'mbuttons'}>
                <hr className="linem"/>
                <button onClick={() => setshowsonder(!showsonder)}>
                    Sonderausstattung
                    <div className="moreButtonm">{arrowIconsonder()}</div>
                </button>
            </div>
            {showsonder && 
                <div>
                    {equipmentsUpdate.map((eU) => (
                        <div>
                            {eU.price !== 0.0 && 
                                <div className="summaryMotor">
                                    <b><p>{eU.id} {eU.name}</p></b><b><p className="sonderauspreis">{eU.price} EUR mtl.</p></b>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
 
export default SummarySonder;