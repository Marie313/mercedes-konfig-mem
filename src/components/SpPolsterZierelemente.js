import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import Mietumfang from "./Mietumfang";
import info from "../image/info.svg";
import ShowDetails from "./ShowDetails";

const SpPolsterZierelemente = ({motorSteps, namePolster, nameZier, collectpolster, collectzierelemente}) => {
    const [steps, setSteps] = useState ([]);
    const [buttid, setButtid] = useState({});
    const [selectedM, setSelectedM] = useState ("all");
    const [polsterZier, setPolsterZier] = useState([]);
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
            setPolsterZier(data2);
            setSelectedEquipmentFirst(data3);
        };
        
        fetchData(motorSteps);
    }, [motorSteps]);

    const showDetailBox = (id, name, imageUrls, edescription) => {
        setElementDetails([!elementDetails[0], id, name, edescription, imageUrls]);
    }

    const ifpolsterkonkret = (pZid, stepsceGe, pZthumbnail, pZname, pZprice, pZcode, pZcategory, description) => {
        if (pZid == stepsceGe){
            if(pZid != 'P*277'){
                return(
                    <div className="pzreturn">
                        <div className="frbox">
                            <img className="frpic" src={pZthumbnail}/>
                            <div className="frinline">
                                <div className="left">
                                    <div>
                                        <input checked={pZcategory == 'Zierteile' ? (nameZier ? nameZier == `${pZcode} ${pZname}` : selectedEquipmentFirst.includes(pZcode)) : (namePolster ? namePolster == `${pZcode} ${pZname}` : selectedEquipmentFirst.includes(pZid))} onChange={pZcategory == 'Zierteile' ? (() => collectzierelemente([pZprice, `${pZcode} ${pZname}`])) : (() => collectpolster([pZprice, `${pZcode} ${pZname}`]))} className="wb-round-button" type="checkbox"/>
                                    </div>
                                    <div className="frcodename">
                                        <p>{pZcode} {pZname}</p>
                                        <p className="frprice">{pZprice.toFixed(2)} EUR mtl.</p>
                                    </div>
                                </div>
                                <div className="rightfr">
                                    <button className="infoIconButtonFarben" onClick={() => showDetailBox(pZid, pZname, pZthumbnail, description)} ><img className="infoIcon" src={info} alt="info"/></button>
                                    {pZid == 'P*311' && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div className="pzreturn">
                        <div className="frboxnotavai">
                            <img className="frpicna" src={pZthumbnail}/>
                            <div className="frinline">
                                <div className="left">
                                    <div className="frcodename">
                                        <p className="notavaicodefr">{pZcode} {pZname}</p>
                                        <div className="notavaitextfr"><p>Leider nicht bestellbar</p></div>
                                    </div>
                                </div>
                                <div className="rightfr">
                                    {pZid == 'P*311' && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    const ifpolster = (stepsceGe) => {
        return(
            <div>
                {polsterZier.map((pZ) => (
                    <div>{ifpolsterkonkret(pZ.id, stepsceGe, pZ.thumbnailUrl, pZ.name, pZ.price, pZ.code, pZ.category, pZ.description)}</div>
                ))}
            </div> 
        )
    }

    const showbuttret = (stepscequipmentG, stepsctitle) => {
        if(stepsctitle == "Polster"){
            return(
                <div>
                    <select className="selctmp" value={selectedM} onChange={(event) => setSelectedM(event.target.value)}>
                        <option value="all">Alle</option>
                        {stepscequipmentG.map((stepsceG) =>(
                            <option value={stepsceG.headline}>{stepsceG.headline}</option>
                        ))}
                    </select>
                    <div>
                        {stepscequipmentG.map((stepsceG) => (
                            (selectedM == "all" || selectedM == stepsceG.headline) ? (
                                <div>
                                    <div className="stepsheadline"><h2>{stepsceG.headline}</h2></div>
                                    <div className="buttretfarbe" >
                                        {stepsceG.equipments.map((stepsceGe) => (
                                            <div >
                                                {ifpolster(stepsceGe)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    {stepscequipmentG.map((stepsceG) => (
                        <div className="buttretfarbe">
                            {stepsceG.equipments.map((stepsceGe) => (
                                <div >
                                    {ifpolster(stepsceGe)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )
        }
    }

    const arrowIcon = (stepsctitle) => {
        if (buttid[stepsctitle]){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }
    
    const mbody = (stepsid, stepsc) => {
        if (stepsid == 5){
            return (
                <div>
                {stepsc.map((stepsc) =>(
                    <div>
                        <div className={buttid[stepsc.title] ? 'mbuttonsclicked' : 'mbuttons'}>
                            <hr className="linem"/>
                            <button onClick={() => setButtid(prevButtid => ({...prevButtid, [stepsc.title]: !prevButtid[stepsc.title]}))}>
                                {stepsc.title}
                                <div className="moreButtonm">{arrowIcon(stepsc.title)}</div>
                            </button>
                        </div>
                        {buttid[stepsc.title] && showbuttret(stepsc.equipmentGroups, stepsc.title)}
                    </div>
                ))}
                <hr className="linem"/>
                <Mietumfang/>
                </div>
            )
        }
    }

    return (
        <div>  
            <div className="motorisierung">
                {steps.map((steps) => (
                    <div>
                        {mbody(steps.id, steps.categories)}
                    </div>
                ))}
            </div>
            <ShowDetails elementDetails={elementDetails} setElementDetails={setElementDetails}/>
        </div>
        
    );
}
 
export default SpPolsterZierelemente;