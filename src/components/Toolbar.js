import { useState } from "react";
import CarList from "./CarList";
import TypeList from "./TypeList";

const Toolbar = () => {
    
    const [checkbox1Checked, setCheckbox1Checked] = useState(true);
    const [checkbox2Checked, setCheckbox2Checked] = useState(false);
    const [selectedModell, setSelectedModell] = useState("mietmodell");

    const handleCheckbox1 = () => {
        setCheckbox1Checked(true);
        setCheckbox2Checked(false);
    }
    const handleCheckbox2 = () => {
        setCheckbox1Checked(false);
        setCheckbox2Checked(true);
    }
    const handleModellChange = (event) => {
        setSelectedModell(event.target.value);
    }

    const generateOptions = () => {
        const options = [];
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
        for (let i = 0; i < 24; i++) {
            const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
            const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
            options.push(
                <option key={formattedDate} value={formattedDate}>{formattedDate}</option>
            );
        }
        return options;
    };

    return ( 
        <div className="content">
        <div className="toolbar">
            <h2 className="h2">Wählen Sie Ihr Bezugsmodell</h2>
            <select value={selectedModell} onChange={handleModellChange}>
                <option value="mietmodell">Mietmodell</option>
                <option value="kaufmodell">Kaufmodell</option>
            </select > 
            <h2 className="h2">Wählen Sie Ihren gewünschten Liefretermin</h2>
            <div className="selct">
                <select >
                        {generateOptions()}
                </select>
            </div>
            <h2 className="h2">Wonach sollen die Fahrzeuge sortiert werden?</h2>
            <div className="inlinecheck">
                <input type="checkbox" className="checkbox" checked={checkbox1Checked} onChange={handleCheckbox1} />
                <p>nach Baureihe</p>
            </div>
            <div className="inlinecheck">
                <input type="checkbox" className="checkbox" checked={checkbox2Checked} onChange={handleCheckbox2} />
                <p>nach Karosserie</p>
            </div>
        </div>
        {checkbox1Checked && <CarList selectedModell={selectedModell}/>}
        {checkbox2Checked && <TypeList selectedModell={selectedModell}/>}
        </div>
    );
    
}
 
export default Toolbar;