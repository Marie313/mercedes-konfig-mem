import { useState, useEffect } from "react";
import cancel from "../image/cancel.svg";

const ConsumptionLabel2 = ({setIsVisible, models, name, herkunft}) => {
    const [consumptionLabels, setConsumptionLabels] = useState();

    useEffect(() => {
        const filteredLabels = models.filter(model => model.name === name).map(model => model.consumptionLabel);;
        
        setConsumptionLabels(filteredLabels);
    }, [models, name]); // Funktion zm wählen des korrkten consumptionLabel

    return ( 
        <div>
            {herkunft == 'motor' && <div className="canceldetailbtn"><button onClick={() => setIsVisible(false)}><img className="cancelicon" src={cancel}/></button></div>}
            <owcc-energy-consumption-labeling id="app" label-data={consumptionLabels}></owcc-energy-consumption-labeling>
        </div>
    );
}
 
export default ConsumptionLabel2;