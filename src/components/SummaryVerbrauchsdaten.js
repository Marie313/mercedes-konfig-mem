import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SummaryVerbrauchsdaten = () => {
    const [showverbrauchsdaten, setshowverbrauchsdaten] = useState(true);

    const clickreactionverbrauch = () => {
        setshowverbrauchsdaten(!showverbrauchsdaten);
    }

    const arrowIconverbrauch = () => {
        if (showverbrauchsdaten){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    return (  
        <div>
            <div className={showverbrauchsdaten ? 'mbuttonsclicked' : 'mbuttons'}>
                <hr className="linem"/>
                <button onClick={() => clickreactionverbrauch()}>
                    Verbrauchsdaten
                    <div className="moreButtonm">{arrowIconverbrauch()}</div>
                </button>
            </div>
        </div>
    );
}
 
export default SummaryVerbrauchsdaten;