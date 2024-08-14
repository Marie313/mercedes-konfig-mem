import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";

const SpLinesPakete = ({motorSteps, collectline, collectpaketline, collectwinterpaketplus, collectlederpaket, collectzusatzpaket, collectnamelederpaket, collectnamezusatzpaket, collectnamewinterpaketplus, collectnameline, collectnamepaketline}) => {
    const [steps, setSteps] = useState ([]);
    const [show, setShow] = useState (true);
    const [equipments, setEquipments] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [selectedPaketeLines, setSelectedPaketeLines] = useState('PSE');
    const [selectedLines, setSelectedLines] = useState('P59');
    const [selectedWinterPaketPlus, setSelectedWinterPaketPlus] = useState();
    const [selectedLederPaket, setSelectedLederPaket] = useState();
    const [selectedZusatzPaket, setSelectedZusatzPaket] = useState([]);
    const [mietumfang, setMietumfang] = useState(false);

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
    }, []);

    useEffect(() => {
        if(motorSteps === 'A_250_e_Limousine_mit_EQ_Hybrid_Technologie'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8003/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8021/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8017/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8018/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8020/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8019/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8015/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_250_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8014/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
        else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8013/equipments`);
              const data = await response.json();
              setEquipments(data);
          };
          fetchData();
        }
    
    }, []);

    const changeSelectedPaketeLines = (lpcode, lpprice, lpname) => {
        setSelectedPaketeLines(lpcode);
        collectpaketline(lpprice);
        collectnamepaketline(`${lpcode} ${lpname}`);
    }

    const changeSelectedLines = (lpcode, lpprice, lpname) => {
        setSelectedLines(lpcode);
        collectline(lpprice);
        collectnameline(`${lpcode} ${lpname}`);
    }

    const changeSelectedWinterPaketPlus = (lpcode, lpprice, lpname) => {
        setSelectedWinterPaketPlus(lpcode);
        collectwinterpaketplus(lpprice);
        collectnamewinterpaketplus(`${lpcode} ${lpname}`);
    }

    const changeSelectedLederPaket = (lpcode, lpprice, lpname) => {
        setSelectedLederPaket(lpcode);
        collectlederpaket(lpprice);
        collectnamelederpaket(`${lpcode} ${lpname}`);
    }

    const changeSelectedZusatzPaket = (lpcode, lpprice, lpname, onChange) => {
        setSelectedZusatzPaket(prevSelectedZusatzPaket => {
          if (prevSelectedZusatzPaket.includes(lpcode)) {
            return prevSelectedZusatzPaket.filter(code => code !== lpcode);
          } else {
            return [...prevSelectedZusatzPaket, lpcode];
          }
        });
        if (onChange) {
            collectzusatzpaket(lpprice);
        } else {
            collectzusatzpaket(0);
        }
        collectnamezusatzpaket(`${lpcode} ${lpname}`);
      };

    const arrowIcon = () => {
        if (show){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const clickreaction = () => {
        if(show){
            setShow(false);
        }
        if(!show){
            setShow(true);
        }
    }

    const changeShowDetails = (equipmentsid) => {
        setShowDetails(prevButtid => ({
            ...prevButtid,
            [equipmentsid]: !prevButtid[equipmentsid]
        }));
    }

    const buttret = (stepsc) => {
        return(
            <div>
                {stepsc.map((stepsc) => (
                    <div>{mapstepsc(stepsc.equipmentGroups)}</div>
                ))}
            </div>
        )
    }
    const mapstepsc = (stepsceG) => {
        return(
            <div>
                {stepsceG.map((stepsceG) => (
                    <div>{mapstepsceG(stepsceG.equipments, stepsceG.headline)}</div>
                ))}
            </div>
        )
    }
    const mapstepsceG = (stepsceGe, stepsceGheadline) => {
        return(
            <div>
                {stepsceGheadline && (<div className="stepsheadline"><h2>{stepsceGheadline}</h2></div>)}
                {stepsceGe.map((stepsceGe) => (
                    <div className="buttretlines">{informationLines(stepsceGe)}</div>
                ))}
            </div>
        )
    }
    const informationLines = (stepsceGe) => {
        return( 
            <div>
                {equipments.map((equipments) => (
                    <div>{infoMotor(stepsceGe, equipments.id, equipments.name, equipments.price, equipments.thumbnailUrl, equipments.includedEqs, equipments.category)}</div>
                ))}
            </div>
        )
    }
    const possibleDetails = (equipmentsincludedEqs) => {
        return(
            <div>
                {equipmentsincludedEqs.map((included) => (
                    <div className="details">
                        <TbPointFilled className="point" />
                        <p className="detailstext">{included.split('|')[0]}</p>
                    </div>
                ))}
            </div>
        )
    }

    const isChecked = (ecategorys, equipmentsid, stepsceGe) => {

        if(stepsceGe == 'PSE' || stepsceGe == 'PSI' || stepsceGe == 'PSJ' || stepsceGe == 'PSN' || stepsceGe == 'PSQ' || stepsceGe == 'PSD' || stepsceGe == 'PSM' || stepsceGe == 'PSF'){
            return selectedPaketeLines == equipmentsid;
        }
        if(ecategorys == 'Pakete > Lines'){
            return selectedLines == equipmentsid;
        }
        if(equipmentsid == 'PGC' || equipmentsid == 'PGG'){
            return selectedWinterPaketPlus == equipmentsid;
        }
        if(equipmentsid == 'P34' || equipmentsid == 'P39'){
            return selectedLederPaket == equipmentsid
        }
        else{
            return selectedZusatzPaket.includes(equipmentsid)
        }
    }


    const infoMotor = (stepsceGe, equipmentsid, equipmentsname, equipmentsprice, equipmentsthumbnail, equipmentsincludedEqs, ecategorys) => {
        
        if(stepsceGe == equipmentsid){
            if(stepsceGe != 'PSD' && stepsceGe != 'P00' && stepsceGe != 'PGC' && stepsceGe != 'PGG'){
                return(
                    <div>
                        <div className="inline">
                            <div className="left">
                                <input className="motorCheck" type="checkbox" checked={isChecked(ecategorys, equipmentsid, stepsceGe, equipmentsprice)} onChange={(event) => {
                                    if (stepsceGe == 'PSE' || stepsceGe == 'PSI' || stepsceGe == 'PSJ' || stepsceGe == 'PSN' || stepsceGe == 'PSQ' || stepsceGe == 'PSD' || stepsceGe == 'PSM' || stepsceGe == 'PSF' ){ 
                                        changeSelectedPaketeLines(equipmentsid, equipmentsprice, equipmentsname);
                                    }   
                                    else if (ecategorys == 'Pakete > Lines'){
                                        changeSelectedLines(equipmentsid, equipmentsprice, equipmentsname);
                                    }
                                    else if (equipmentsid == 'PGC' || equipmentsid == 'PGG'){
                                        changeSelectedWinterPaketPlus(equipmentsid, equipmentsprice, equipmentsname);
                                    }
                                    else if (equipmentsid == 'P34' || equipmentsid == 'P39'){
                                        changeSelectedLederPaket(equipmentsid, equipmentsprice, equipmentsname);
                                    }
                                    else{
                                        changeSelectedZusatzPaket(equipmentsid, equipmentsprice, equipmentsname, event.target.checked);
                                    }
                                }}/>
                                {equipmentsthumbnail && <img className="picpl" src={equipmentsthumbnail}/>}
                                <div className="flexc">
                                <h2 className="motorname">{equipmentsid} {equipmentsname}</h2>
                                {equipmentsincludedEqs && <button onClick={() => changeShowDetails(equipmentsid)} className="detailsbutton">{showDetails[equipmentsid] ? 'Weniger Details' : 'Mehr Details'}</button>}
                                {showDetails[equipmentsid] && possibleDetails(equipmentsincludedEqs)}
                                </div>
                            </div>
                            <div className="right">
                                <h2>{equipmentsprice} EUR mtl.</h2>
                                {(equipmentsid == 'PSE' || equipmentsid == 'PAV') && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div className="notavailable">
                        <div className="inline">
                            <div className="left">
                                <input disabled className="motorChecknotavai" type="checkbox" />
                                {equipmentsthumbnail && <img className="picplna" src={equipmentsthumbnail}/>}
                                {equipmentsid == 'P34' && <img className="picplna" src='https://assets.oneweb.mercedes-benz.com/bbd/images/v1/9080/1/83/e52481c58c8796dcc98611e4bd3e3f9502217.jpg'/>}
                                <div className="flexc">
                                <h2 className="motornamena">{equipmentsid} {equipmentsname}</h2>
                                <div className="notavaitext"><p>Leider nicht bestellbar</p></div>
                                </div>
                            </div>
                            <div className="rightna">
                                <h2>{equipmentsprice} EUR mtl.</h2>
                                {(equipmentsid == 'PSE' || equipmentsid == 'PAV') && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    
    const mbody = (stepsid, stepstitle, stepsc) => {
        if (stepsid == 3){
            return (
                <div>
                <hr className="linem"/>
                <div className={show ? 'mbuttonsclicked' : 'mbuttons'}>
                    <button onClick={() => clickreaction()}>
                        {stepstitle}
                        <div className="moreButtonm">{arrowIcon()}</div>
                    </button>
                </div>
                {show && buttret(stepsc)}
                <hr className="linem"/>
                <div className="mietumfang"> 
                    <img className="mietumfangimg" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>
                    <p className="mietumfangp">Ausstattungsumfang im Mietmodell</p>
                </div>
                </div>
            )
        }
    }

    return ( 
        <div className="motorisierung">
            {steps.map((steps) => (
                <div>
                    {mbody(steps.id, steps.title, steps.categories)}
                </div>
            ))}
        </div> 
    );
}
 
export default SpLinesPakete;