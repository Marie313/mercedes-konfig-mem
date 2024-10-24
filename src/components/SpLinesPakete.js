import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";
import Mietumfang from "./Mietumfang";
import info from "../image/info.svg";
import ShowDetails from "./ShowDetails";

const SpLinesPakete = ({motorSteps, linename, paketlinename, lederPaketname, zusatzPaketname, winterpaketplusname, collectline, collectpaketline, collectwinterpaketplus, collectlederpaket, collectzusatzpaket}) => {
    const [steps, setSteps] = useState ([]);
    const [show, setShow] = useState (true);
    const [arrow, setArrow] = useState(<SlArrowDown/>);
    const [equipments, setEquipments] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [selectedLederPaketName, setSelectedLederPaketName] = useState(lederPaketname);
    const [selectedZusatzPaketName, setSelectedZusatzPaketName] = useState(zusatzPaketname);
    const [selectedEquipmentFirst, setSelectedEquipmentFirst] = useState([]);
    const [elementDetails, setElementDetails] = useState([false, '', '', '', []]); // [0] --> isVisible | [1] --> id | [2] --> name | [3] --> description | [4] --> imageurl |

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/steps`);
            const response2 = await fetch(`http://localhost:3057/${fileName}/equipments`);
            const response3 = await fetch(`http://localhost:3057/${fileName}/selectedEquipments`);
            const data = await response.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setSteps(data);
            setEquipments(data2);
            setSelectedEquipmentFirst(data3);
        };
        fetchData(motorSteps);
    }, [motorSteps]);

    const changeSelectedPaketeLines = (lpcode, lpprice, lpname) => collectpaketline([lpprice, `${lpcode} ${lpname}`]);
    const changeSelectedLines = (lpcode, lpprice, lpname) => collectline([lpprice, `${lpcode} ${lpname}`]);
    const changeSelectedWinterPaketPlus = (lpcode, lpprice, lpname) => collectwinterpaketplus([lpprice, `${lpcode} ${lpname}`]);
    const changeSelectedLederPaket = (lpcode, lpprice, lpname) => {
        setSelectedLederPaketName((prevLeder) => {
            if(prevLeder == `${lpcode} ${lpname}`){
                return null
            }
            return `${lpcode} ${lpname}`
        });
        collectlederpaket([selectedLederPaketName == `${lpcode} ${lpname}` ? null : lpprice, selectedLederPaketName == `${lpcode} ${lpname}` ? null : `${lpcode} ${lpname}`]);
    }
    const changeSelectedZusatzPaket = (lpcode, lpprice, lpname) => {
        setSelectedZusatzPaketName(prevState => {
            if (prevState.includes(`${lpcode} ${lpname}`)) {
              return prevState.filter(code => code !== `${lpcode} ${lpname}`);
            } 
            return [...prevState, `${lpcode} ${lpname}`];
          });
        collectzusatzpaket([selectedZusatzPaketName.includes(`${lpcode} ${lpname}`) ? [lpcode, lpprice, false] : [lpcode, lpprice, true], selectedZusatzPaketName.includes(`${lpcode} ${lpname}`) ? [`${lpcode} ${lpname}`, false] : [`${lpcode} ${lpname}`, true]]);
    };

    const clickreaction = () => {
        if(show){
            setShow(false);
            setArrow(<SlArrowUp/>);
        }
        else if(!show){
            setShow(true);
            setArrow(<SlArrowDown/>);
        }
    }

    const changeShowDetails = (equipmentsid) => {
        setShowDetails(prevButtid => ({
            ...prevButtid, [equipmentsid]: !prevButtid[equipmentsid]
        }));
    }

    const isChecked = (ecategorys, equipmentsid, stepsceGe, equipmentsname) => {
        if(stepsceGe == 'PSE' || stepsceGe == 'PSI' || stepsceGe == 'PSJ' || stepsceGe == 'PSN' || stepsceGe == 'PSQ' || stepsceGe == 'PSD' || stepsceGe == 'PSM' || stepsceGe == 'PSF'){
            return paketlinename ? paketlinename == `${equipmentsid} ${equipmentsname}` : selectedEquipmentFirst.includes(equipmentsid);
        }
        if(ecategorys == 'Pakete > Lines'){
            return linename ? linename == `${equipmentsid} ${equipmentsname}` : selectedEquipmentFirst.includes(equipmentsid);
        }
        if(equipmentsid == 'PGC' || equipmentsid == 'PGG'){
            return winterpaketplusname ? winterpaketplusname == `${equipmentsid} ${equipmentsname}` : selectedEquipmentFirst.includes(equipmentsid);
        }
        if(equipmentsid == 'P34' || equipmentsid == 'P39'){
            return selectedLederPaketName ? selectedLederPaketName == `${equipmentsid} ${equipmentsname}`: selectedEquipmentFirst.includes(equipmentsid);
        }
        else{
            return selectedZusatzPaketName ? selectedZusatzPaketName.includes(`${equipmentsid} ${equipmentsname}`) : selectedEquipmentFirst.includes(stepsceGe);
        }
    }

    const showDetailBox = (eid, ename, description, eimageUrls) => {
        setElementDetails([!elementDetails[0], eid, ename, description, eimageUrls]);
    }

    const infoMotor = (stepsceGe, equipmentsid, equipmentsname, equipmentsprice, equipmentsthumbnail, equipmentsincludedEqs, ecategorys, description, eimageUrls) => {
        if(stepsceGe == equipmentsid){
            if(stepsceGe != 'PSD' && stepsceGe != 'P00' && stepsceGe != 'PGC' && stepsceGe != 'PGG'){
                return(
                    <div>
                        <div className="inline">
                            <div className="left">
                                <input className="motorCheck" type="checkbox" checked={isChecked(ecategorys, equipmentsid, stepsceGe, equipmentsname)} onChange={(event) => {
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
                                    <h2 className="motorname">{equipmentsid} {equipmentsname} <button onClick={() => showDetailBox(equipmentsid, equipmentsname, description, eimageUrls)} className="infoIconButton"><img className="infoIcon" src={info} alt="info"/></button></h2>
                                    {equipmentsincludedEqs && <button onClick={() => changeShowDetails(equipmentsid)} className="detailsbutton">{showDetails[equipmentsid] ? 'Weniger Details' : 'Mehr Details'}</button>}
                                    {showDetails[equipmentsid] &&
                                        <div>{equipmentsincludedEqs.map((included) => (
                                                <div className="details">
                                                    <TbPointFilled className="point" />
                                                    <p className="detailstext">{included.split('|')[0]}</p>
                                                </div>
                                        ))}</div>
                                    }
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
    
    const mbody = (stepsid, stepstitle, stepsc) => {
        if (stepsid == 3){
            return (
                <div>
                    <hr className="linem"/>
                    <div className={show ? 'mbuttonsclicked' : 'mbuttons'}>
                        <button onClick={() => clickreaction()}>
                            {stepstitle}
                            <div className="moreButtonm">{arrow}</div>
                        </button>
                    </div>
                    {show && 
                        <div>{stepsc.map((stepsc) => (
                            <div>
                                <div>{stepsc.equipmentGroups.map((stepsceG) => (
                                    <div>
                                        {stepsceG.headline && (<div className="stepsheadline"><h2>{stepsceG.headline}</h2></div>)}
                                        {stepsceG.equipments.map((stepsceGe) => (
                                            <div className="buttretlines">
                                                {equipments.map((equipments) => <div>{infoMotor(stepsceGe, equipments.id, equipments.name, equipments.price, equipments.thumbnailUrl, equipments.includedEqs, equipments.category, equipments.description, equipments.imageUrls)}</div>)}
                                            </div>
                                        ))}
                                    </div>
                                ))}</div>
                            </div>
                        ))}</div>
                    }
                    <hr className="linem"/>
                    <Mietumfang/>
                </div>
            )
        }
    }
    
    return ( 
        <div>
            <div className="motorisierung">
                {steps.map((steps) => <div>{mbody(steps.id, steps.title, steps.categories)}</div>)}
            </div> 
            <ShowDetails elementDetails={elementDetails} setElementDetails={setElementDetails}/>
        </div>
    );
}
export default SpLinesPakete;