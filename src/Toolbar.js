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
    
    return ( 
        <div className="toolbar">
            <h2 className="h2">Wählen Sie Ihr Bezugsmodell</h2>
            <select>
                <option value="option1">Mietmodell</option>
                <option value="option2">Kaufmodell</option>
            </select>
            <h2 className="h2">Wählen Sie Ihren gewünschten Liefretermin</h2>
            <select>
                <option value="option2.1">06/2024</option>
                <option value="option2.2">07/2024</option>
                <option value="option2.3">08/2024</option>
                <option value="option2.4">09/2024</option>
                <option value="option2.5">10/2024</option>
                <option value="option2.6">11/2024</option>
                <option value="option2.7">12/2024</option>
                <option value="option2.8">01/2025</option>
                <option value="option2.9">02/2025</option>
                <option value="option2.11">03/2025</option>
                <option value="option2.12">04/2025</option>
                <option value="option2.13">05/2025</option>
                <option value="option2.14">06/2025</option>
                <option value="option2.15">07/2025</option>
                <option value="option2.16">08/2025</option>
                <option value="option2.17">09/2025</option>
                <option value="option2.18">10/2025</option>
                <option value="option2.19">11/2025</option>
                <option value="option2.20">12/2025</option>
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