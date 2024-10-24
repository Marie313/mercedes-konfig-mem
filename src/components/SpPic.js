import {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom.min";

const SpPic = (props) => {
    const { CarClass } = useParams(); //useParams hat den Wert des dynamischen Wertes der Url (siehe: pathname: {carsClass}`(CL.js, 116))

    const [specific, setSpecific] = useState({}); //sammelt Daten aus cars.json für die geklickte carClass um großes Bild aufrufen zu können

    useEffect(() => {
        const fetchData = async (fileName) => {
          const carData = [];
          for (let i = 0; i < 41; i++) {
            const response = await fetch(`http://localhost:3057/${fileName}/${i}`);
            const data = await response.json();
            if (data.class === CarClass) {
              carData.push(data);
            }
          }
          setSpecific(carData[0]);
          console.log(carData[0])
        };
    
        fetchData('cars');
    }, []); // Bild auf Grundlage gewählter carClass anzeigen
    
    const picSelect = (specificsSP) => {
        if(props.currentStep =="Polster & Zierelemente"){
          return (
            <img src='/images/A-KlasseLimousineIn.jpg' className="specificsPicIn" />
          )
        }
        return(
          <img src={specificsSP} className="specificsPic" />
        )
    } //Auswahl ob Bild von innen oder außen groß abgebildet werden soll (abhängig von der gewählten steps-Komponente)

    return (  
        <div>
          <div className="specific-item">
            {picSelect(specific.picSP)}
          </div>
        </div>
    );
}
 
export default SpPic;