import { useState } from "react";

const EmailSummary = () => {
    const [emailValue, setEmailValue] = useState('nadja.seeliger@mercedes-benz.com');

    const handleEMailChange = (event) => {
        setEmailValue(event.target.value);
    };

    return (
            <div className="emaildiv">
                <h2>Möchten Sie Ihre Konfiguration per E-Mail versenden?</h2>
                <input className="emailinput" type="email" value={emailValue} onChange={handleEMailChange} placeholder="Geben Sie Ihre E-Mail- Adresse ein"/>
                <button className="emailbutton">Senden</button>
            </div>
    );
}
 
export default EmailSummary;