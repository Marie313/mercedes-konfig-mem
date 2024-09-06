import {useParams, useLocation} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import SpMotorisierung from "./SpMotorisierung";
import SpLinesPakete from "./SpLinesPakete";
import SpFarbenRaeder from "./SpFarbenRaeder";
import SpPolsterZierelemente from "./SpPolsterZierelemente";
import SpAusstattung from "./SpAusstattung";
import SpMeinMercedesBenz from "./SpMeinMercedesBenz";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';
import { GrConsole } from "react-icons/gr";

// 1.
// Consider grouping related state variables into objects to reduce redundancy and improve readability.
// This will also make state management more efficient.
// For example you can group variables like motorName, motorSteps into a motor object.
// Similarly, lederPaket, lederPaketName, zusatzPaket etc. can be combined into a package object.
// The most logical approach is probably to have one large configuration object (could be split into steps)
// that handles and stores state changes
//
// 2.
// variable names in english
//
// 3.
// The use of different ports for each endpoint is unnecessary and leads to poor maintainability.
// The API should be consolidated to use a single port with distinct routes for different resources,
// this will simplify the codebase and make future changes much easier to manage.
// The current approach of handling motorSteps results in repetitive and redundant code.
// --> see https://x.com/ctrlshifti/status/1288745146759000064
// more code != more capability. very often: more code = more headache
//
//




const SpecificCar = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [specific, setSpecific] = useState([]);
  const [specificModell, setSpecificModell] = useState('Mietmodell');
  const [bau, setBau] = useState(false);
  const [motor, setMotor] = useState(true);
  const [lines, setLines] = useState(false);
  const [farben, setFarben] = useState(false);
  const [polster, setPolster] = useState(false);
  const [aussattung, setAusstattung] = useState(false);
  const [mMercedes, setMMercedes] = useState(false);
  const [steps, setSteps] = useState([]);
  const [dates, setDates] = useState([]);
  const [milesoptions, setMilesoption] = useState([]);
  const [price, setPrice] = useState();
  const [rentrate, setRentrate] = useState();
  const [zinssatz, setZinssatz] = useState(1);
  const [farbe, setFarbe] = useState(7.5);
  const [raeder, setRaeder] = useState(0);
  const [polsterprice, setPolsterprice] = useState(0);
  const [zierelemente, setZierelemente] = useState(0);
  const [line, setLine] = useState(11.01);
  const [linename, setLinename] = useState('P59 Progressive');
  const [paketline, setPaketline] = useState(33.8);
  const [paketlinename, setPaketlinename] = useState('PSE Progressive Line Advanced');
  const [lederPaket, setLederPaket] = useState(0);
  const [lederPaketname, setLederPaketname] = useState();
  const [zusatzPaket, setZusatzPaket] = useState(0);
  const [zusatzPaketname, setZusatzPaketname] = useState('P49 Spiegel-Paket');
  const [winterPaketplus, setWinterPaketPlus] = useState(0);
  const [winterPaketplusname, setWinterPaketPlusname] = useState();
  const [motorSteps, setMotorSteps] = useState('A_250_e_Limousine_mit_EQ_Hybrid_Technologie');
  const [motorName, setMotorName] = useState('A 250 e Limousine mit EQ Hybrid Technologie');
  const [namefarbe, setNameFarbe] = useState('191 Metalliclack kosmosschwarz');
  const [nameraeder, setNameRaeder] = useState('25R 43,2 cm (17") Leichtmetallräder im 5-Doppelspeichen-Design');
  const [namePolster, setNamePolster] = useState('311 Ledernachbildung ARTICO / Stoff Betrix schwarz');
  const [nameZier, setNameZier] = useState('52H Zierelemente Carbonoptik dunkel');

  const handleBau = () => {

    MySwal.fire({
      title: "Zurückkehren zur Startseite?",
      text: "Die Daten Ihres konfigurierten Fahrzeuges werden nicht gespeichert!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ok"
  }).then((result) => {
      if (result.isConfirmed) {
        history.push('/');
      }
  });
  }

  const handleMotor = () => {
    setBau(false);
    setMotor(true);
    setLines(false);
    setFarben(false);
    setPolster(false);
    setAusstattung(false);
    setMMercedes(false);
  }

  const handleLines = () => {
    setBau(false);
    setMotor(false);
    setLines(true);
    setFarben(false);
    setPolster(false);
    setAusstattung(false);
    setMMercedes(false);
  }

  const handleFarben = () => {
    setBau(false);
    setMotor(false);
    setLines(false);
    setFarben(true);
    setPolster(false);
    setAusstattung(false);
    setMMercedes(false);
  }

  const handlePolster = () => {
    setBau(false);
    setMotor(false);
    setLines(false);
    setFarben(false);
    setPolster(true);
    setAusstattung(false);
    setMMercedes(false);
  }

  const handleAussattung = () => {
    setBau(false);
    setMotor(false);
    setLines(false);
    setFarben(false);
    setPolster(false);
    setAusstattung(true);
    setMMercedes(false);
  }

  const handleMMercedes = () => {
    setBau(false);
    setMotor(false);
    setLines(false);
    setFarben(false);
    setPolster(false);
    setAusstattung(false);
    setMMercedes(true);
  }

  const { classe } = useParams();
  const location = useLocation();
  const { selectedModell } = location.state || {};

  useEffect(() => {
    if (selectedModell === "mietmodell") {
      setSpecificModell("Mietmodell");
    }
    if (selectedModell === "kaufmodell") {
      setSpecificModell("Kaufmodell");
    }
  }, [selectedModell]);

  useEffect(() => {
    const fetchData = async () => {
      const carData = [];
      for (let i = 0; i < 41; i++) {
        const response = await fetch(`http://localhost:8001/${i}`);
        const data = await response.json();
        if (data.class === classe) {
          carData.push(data);
        }
      }
      setSpecific(carData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8003/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_180_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8021/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_220_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8017/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_200_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8018/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_180_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8020/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_200_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8019/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_220_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8015/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_250_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8014/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }
    else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8013/steps`);
          const data = await response.json();
          setSteps(data);
      };
      fetchData();
    }

  }, [motorSteps]);

  useEffect(() => {
    if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8003/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_180_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8021/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_220_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8017/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_200_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8018/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_180_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8020/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_200_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8019/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_220_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8015/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'A_250_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8014/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
    else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8013/deliveryDates`);
          const data = await response.json();
          setDates(data);
      };
      fetchData();
    }
  },[motorSteps]);

  useEffect(() => {
    if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8003/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_180_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8021/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_220_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8017/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_200_d_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8018/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_180_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8020/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_200_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8019/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_220_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8015/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'A_250_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8014/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
      const fetchData = async () => {
          const response = await fetch(`http://localhost:8013/stickyMenu`);
          const data = await response.json();
          setMilesoption(data.rentalMileageOptions);
          setRentrate(data.rentRate);
          setPrice(data.listPriceSum);
      };
      fetchData();
    }
    else{
    }
  },[motorSteps]);

  const collectmotor = (zinssatz) => {
    setZinssatz(zinssatz);
  }
  const collectmotorsteps = (motor) => {
    setMotorSteps(motor);
  }
  const collectmotorname = (motorname) => {
    setMotorName(motorname)
  }
  const collectfarben = (farben) => {
    setFarbe(farben);
  }
  const collectraeder = (raeder) => {
    setRaeder(raeder);
  }
  const collectpolster = (polster) => {
    setPolsterprice(polster);
  }
  const collectzierelemente = (zierelemente) => {
    setZierelemente(zierelemente);
  }
  const collectline = (line) => {
    setLine(line);
  }
  const collectnameline = (linename) => {
    setLinename(linename);
  }
  const collectpaketline = (paketline) => {
    setPaketline(paketline);
  }
  const collectnamepaketline = (paketlinename) => {
    setPaketlinename(paketlinename);
  }
  const collectwinterpaketplus = (winterpaketplus) => {
    setWinterPaketPlus(winterpaketplus);
  }
  const collectnamewinterpaketplus = (winterpaketplusname) => {
    setWinterPaketPlusname(winterpaketplusname);
  }
  const collectlederpaket = (leder) => {
    setLederPaket(leder);
  }
  const collectnamelederpaket = (ledername) => {
    setLederPaketname(ledername);
  }
  const collectzusatzpaket = (zusatz) => {
    setZusatzPaket(zusatz);
  }
  const collectnamezusatzpaket = (zusatzname) => {
    setZusatzPaketname(zusatzname);
  }
  const collectnamefarbe = (farbename) => {
    setNameFarbe(farbename)
  }
  const collectnameraeder = (raedername) => {
    setNameRaeder(raedername)
  }
  const collectnamepolster = (polsetrname) => {
    setNamePolster(polsetrname)
  }
  const collectnamezier = (ziername) => {
    setNameZier(ziername)
  }

  const calculatemietrate = () => {
    const mietrate = (rentrate * zinssatz - 52.31) + farbe + raeder + polsterprice + zierelemente + line + paketline + winterPaketplus + lederPaket + zusatzPaket;
    return (mietrate.toFixed(2));
  }

  const tryid = (stepsid, stepstitle) => {
    if(stepsid == 2){
      return (<button className={motor ? "navButtonActive" : "navButton"} onClick={handleMotor}>{stepstitle}</button>);
    }
    if(stepsid == 3){
      return (<button className={lines ? "navButtonActive" : "navButton"} onClick={handleLines}>{stepstitle}</button>);
    }
    if(stepsid == 4){
      return (<button className={farben ? "navButtonActive" : "navButton"} onClick={handleFarben}>{stepstitle}</button>);
    }
    if(stepsid == 5){
      return (<button className={polster ? "navButtonActive" : "navButton"} onClick={handlePolster}>{stepstitle}</button>);
    }
    if(stepsid == 6){
      return (<button className={aussattung ? "navButtonActive" : "navButton"} onClick={handleAussattung}>{stepstitle}</button>);
    }
    if(stepsid == 7){
      return (<button className={mMercedes ? "navButtonActive" : "navButton"} onClick={handleMMercedes}>{stepstitle}</button>);
    }
  }

  const picSelect = (specificsSP, specificsIn) => {
    if (polster){
      return (
        <img src={specificsIn} className="specificsPicIn" />
      )
    }
    else{
      return(
        <img src={specificsSP} className="specificsPic" />
      )
    }
  }

  const priceFormat = () => {

    const formattedNumber = new Intl.NumberFormat('de-DE').format(price.toFixed(2));

    return (formattedNumber)
  }

  return (
    <div className="specific-preview">
      {specific.map((specifics) => (
        <div className="specific-item">
          {picSelect(specifics.picSP, specifics.picIn)}
        </div>
      ))}
      <div className="navButtonContainer">
      <button className={bau ? "navButtonActive" : "navButton"} onClick={handleBau}>Baureihe</button>
        {steps.map((steps) => (
          <div className="navButtoncontainer">
            {tryid(steps.id, steps.title)}
          </div>
        ))}
      </div>
      <div className="overall">
        <div className="price">
            <div className="listprice">
              <p>Bruttolistenpreis</p>
              <p>{price ? `${priceFormat()} EUR` : `${price} EUR`}</p>
            </div>
          <b>
            <div className="mietrate">
              <p>monatliche Mietrate</p>
              <p>{calculatemietrate()} EUR</p>
            </div>
          </b>
        </div>
        <div className="driveGet">
          <p>Gewünschte Fahrleistung:</p>
          <select className="smselect">
            {milesoptions.map((miles) =>(
              <option>{miles} km</option>
            ))}
          </select>
          <p>Möglicher Liefretermin</p>
          <select className="smselect">
            {dates.map((dates) =>(
              <option value={dates.id}>{dates.name}</option>
            ))}
          </select>
        </div>
        <div className="buttonssp">
          <button className="spweiter">Weiter</button>
          <button className="spnewkonfig" onClick={handleBau}>Neue Konfiguration</button>
        </div>
      </div>
      <div className="headline">
        {specific.map((specifics) => (
          <h1 className="headlineSpecific">
            Neubestellung {motorName} im {specificModell}
          </h1>
        ))}
      </div>
      <div className="specificBody">
        {motor && <SpMotorisierung motorSteps={motorSteps} collectmotor={collectmotor} collectmotorsteps={collectmotorsteps} collectmotorname={collectmotorname}/>}
        {lines && <SpLinesPakete motorSteps={motorSteps} collectline={collectline} collectpaketline={collectpaketline} collectwinterpaketplus={collectwinterpaketplus} collectlederpaket={collectlederpaket} collectzusatzpaket={collectzusatzpaket} collectnamelederpaket={collectnamelederpaket} collectnamezusatzpaket={collectnamezusatzpaket} collectnamewinterpaketplus={collectnamewinterpaketplus} collectnameline={collectnameline} collectnamepaketline={collectnamepaketline}/>}
        {farben && <SpFarbenRaeder motorSteps={motorSteps} collectfarben={collectfarben} collectraeder={collectraeder} collectnamefarbe={collectnamefarbe} collectnameraeder={collectnameraeder}/>}
        {polster && <SpPolsterZierelemente motorSteps={motorSteps} collectpolster={collectpolster} collectzierelemente={collectzierelemente} collectnamepolster={collectnamepolster} collectnamezier={collectnamezier}/>}
        {aussattung && <SpAusstattung motorSteps={motorSteps}/>}
        {mMercedes && <SpMeinMercedesBenz motorSteps={motorSteps} motorName={motorName} linename={linename} paketlinename={paketlinename} zusatzPaketname={zusatzPaketname} winterPaketplusname={winterPaketplusname} lederPaketname={lederPaketname} nameraeder={nameraeder} namefarbe={namefarbe} namePolster={namePolster} nameZier={nameZier}/>}
      </div>
    </div>
  );
};

export default SpecificCar;
