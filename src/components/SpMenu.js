import {useEffect, useState} from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useHistory} from 'react-router-dom';
import cancel from "../image/cancel.svg";

const SpMenu = (props) => {
  const MySwal = withReactContent(Swal); //für sweetalert
  const history = useHistory(); //für handleBau()(aufgerufenn in dem sweetalert zum zurückkehren zur Startseite) für den Button zum Abbrechen
  const [isVisible, setIsVisible] = useState(false);

  const [stickyMenu, setStickyMenu] = useState({
    price: '',
    rentrate: '',
    dates: [],
    milesoptions: [],
  }) // relevante Daten für Menü auf rechter Seite

  useEffect(() => {
    const fetchData = async (fileName) => {
        const response = await fetch(`http://localhost:3057/${fileName}/deliveryDates`);
        const response2 = await fetch(`http://localhost:3057/${fileName}/stickyMenu`);
        const data = await response.json();
        const data2 = await response2.json();
        setStickyMenu((prevState) => ({
          ...prevState,
          price: data2.listPriceSum,
          rentrate: data2.rentRate,
          dates: data,       
          milesoptions: data2.rentalMileageOptions,
        }));
    };
    
    fetchData(props.motorSteps);
  }, [props.motorSteps]);

  const handleBau = () => {
    setIsVisible(!isVisible)
  }// alert der bei dem Versuch zur Startseite zurückzukeheren geworfen wird

  const backHome = () => {
    history.push('/');
  }

  const calculatemietrate = () => {
    const mietrate = (stickyMenu.rentrate - 55.11) + props.elementPrice.color + props.elementPrice.wheels + props.elementPrice.upholstery + props.elementPrice.decorativeElements + props.elementPrice.line + props.elementPrice.packageLine + props.elementPrice.winterPackagePlus + props.elementPrice.leatherPackage + props.elementPrice.addPackage.reduce((acc, [id, price]) => acc + price, 0) + props.elementPrice.equipment.reduce((acc, [id, price]) => acc + price, 0);
    props.setMietrate(mietrate.toFixed(2));
    return (mietrate.toFixed(2));
  } //berechnet Mietrate bei Veränderung der ausgewählten Elemente auf den steps-Komponeneten

  const priceFormat = () => {
    const formattedNumber = new Intl.NumberFormat('de-DE').format(stickyMenu.price.toFixed(2));
    return (formattedNumber)
  } //Formattierung für Bruttolistenpreis in rechter Menüleiste

  const weiterButton = () => {
    const currentIndex = props.navSteps.indexOf(props.currentStep); // ermittelt Index, bei dem der Wert des Arrayelements dem currentStep entspricht
    if (currentIndex == 6){
      console.log('Bestellbutton geklicked');
    }
    else{
      props.updateNavSelection(props.navSteps[currentIndex +1]);
    }
  } // Funktion für den weiter-Button in der rechten Menüleiste (navigiert immer zu dem nächsten step)

  const weiter = props.currentStep == 'Mein Mercedes-Benz' ? 'Bestellen' : 'Weiter'; //Weiter-Button in  rechter Menüleiste soll VAlue auf steps-Komponente mMercedes ändern

  return ( 
    <div>
      <div className="overall">
        <div className="price">
            <div className="listprice">
              <p>Bruttolistenpreis</p>
              <p className="wb-price--small">{stickyMenu.price ? `${priceFormat()} EUR` : `${stickyMenu.price} EUR`}</p>
            </div>
          <b>
            <div className="mietrate">
              <p>monatliche Mietrate</p>
              <p className="wb-price--large">{calculatemietrate()} EUR</p>
            </div>
          </b>
        </div>
        <div className="driveGet">
          <p>Gewünschte Fahrleistung:</p>
          <select className="smselect" onChange={(event) => props.setMiles(event.target.value)}>
            {stickyMenu.milesoptions.map((miles) =>(
              <option value={miles}>{miles} km</option>
            ))}
          </select>
          <p>Möglicher Liefretermin</p>
          <select className="smselect">
            {stickyMenu.dates.map((dates) =>(
              <option value={dates.name}>{dates.name}</option>
            ))}
          </select>
        </div>
        <div className="buttonssp">
          <button className="spweiter" onClick={weiterButton}>{weiter}</button>
          <button className="spnewkonfig" onClick={handleBau}>Neue Konfiguration</button>
        </div>
      </div>
      <div className="linesside">
        {isVisible && (
          <div className="displaydeatils">
              <div className="detailBox">
                  <div className="canceldetailbtn"><button onClick={handleBau}><img className="cancelicon" src={cancel}/></button></div>
                  <h2 className="hinweis">Hinweis:</h2>
                  <p>Möchten Sie den Konfigurationsprozess wirklich verlassen?</p>
                  <button onClick={backHome} className="goBackBtn">Ja</button><button onClick={handleBau} className="goBackBtn">Nein</button>
              </div>
          </div>
        )}
      </div>
    </div> 
  );
}
 
export default SpMenu;