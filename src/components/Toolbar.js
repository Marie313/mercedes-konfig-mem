import { useState } from "react";

const Toolbar = () => {
    
    const [checkbox1Checked, setCheckbox1Checked] = useState(false);
    const [checkbox2Checked, setCheckbox2Checked] = useState(false);

    const handleCheckbox1 = () => {
        setCheckbox1Checked(true);
        setCheckbox2Checked(false);
    }
    const handleCheckbox2 = () => {
        setCheckbox1Checked(false);
        setCheckbox2Checked(true);
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
        <div className="toolbar">
            <h2 className="h2">Wählen Sie Ihr Bezugsmodell</h2>
            <select>
                <option value="option1">Mietmodell</option>
                <option value="option2">Kaufmodell</option>
            </select>
            <h2 className="h2">Wählen Sie Ihren gewünschten Liefretermin</h2>
            <select>
                {generateOptions()}
            </select>
            <h2 className="h2">Wonach sollen die Fahrzeuge sortiert werden?</h2>
            <div className="inlinecheck">
                <input type="checkbox" className="checkbox" checked={checkbox1Checked} onClick={handleCheckbox1} />
                <p>nach Baureihe</p>
            </div>
            <div className="inlinecheck">
                <input type="checkbox" className="checkbox" checked={checkbox2Checked} onClick={handleCheckbox2} />
                <p>nach Karosserie</p>
            </div>
        </div>
    );
}
 
export default Toolbar;