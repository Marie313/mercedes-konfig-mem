import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const SummaryReifenlabel = () => {
    const [showreifenlabel, setshowreifenlabel] = useState(false);

    const arrowIconreifen = () => {
        if (showreifenlabel){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    return (  
        <div>
            <div className={showreifenlabel ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => setshowreifenlabel(!showreifenlabel)}>
                            EU-Reifenlabel
                            <div className="moreButtonm">{arrowIconreifen()}</div>
                        </button>
                </div>
                {showreifenlabel && 
                    <div className="divleistungsdaten">
                        <p>
                            Für viele Mercedes-Benz Modelle sind je Typ und gewähltem Rad verschiedene Reifentypen erprobt und zugelassen. 
                            Da im Produktionsprozess Ihres Mercedes-Benz die Reifenauswahl entsprechend der technischen Anforderungen und der 
                            Reifenverfügbarkeit erst kurz vor Fertigstellung des Fahrzeugs erfolgt, ist es ggf. nicht möglich Ihnen bereits 
                            zum Zeitpunkt der Bestellung die Informationen zu Ihrer spezifischen Bereifung zukommen zu lassen.
                        </p>
                        <b><p>Eine Beeinflussung der Reifenwahl durch Sie oder Ihren Verkaufsberater ist nicht möglich.</p></b>
                    </div>
                }
        </div>
    );
}
 
export default SummaryReifenlabel;