import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import Mietumfang from "./Mietumfang";
import ElementSearch from "./ElementSearch";
import info from "../image/info.svg";
import ShowDetails from "./ShowDetails";

const SpAusstattung = ({elementName, collectausstattung, collectline, collectpaketline, collectwinterpaketplus, collectlederpaket, collectzusatzpaket, collectfarben, collectraeder, collectpolster, collectzierelemente}) => {
    const [steps, setSteps] = useState ([]);
    const [buttid, setButtid] = useState({});
    const [ausstattung, setAusstattung] = useState ([]);
    const [selectedausstattungname, setSelectedAusstattungName] = useState(elementName.equipment);
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
            setAusstattung(data2);
            setSelectedEquipmentFirst(data3)
        };
        
        fetchData(elementName.motorSteps);
    }, [elementName.motorSteps]);

    useEffect(() => {
        setSelectedAusstattungName(elementName.equipment)
    }, [elementName.equipment]);

    const selectedAusstattung = (ausid, ausname, ausprice) => {
        setSelectedAusstattungName(prevSelectedAus => {
            if (prevSelectedAus.includes(`${ausid} ${ausname}`)) {
              return prevSelectedAus.filter(code => code !== `${ausid} ${ausname}`);
            } 
            else {
              return [...prevSelectedAus, `${ausid} ${ausname}`];
            }
        });
        collectausstattung([selectedausstattungname.includes(`${ausid} ${ausname}`) ? [ausid, ausprice, false] : [ausid, ausprice, true], selectedausstattungname.includes(`${ausid} ${ausname}`) ? [`${ausid} ${ausname}`, false] : [`${ausid} ${ausname}`, true]]); //Erinnerung: evtl. in Zukunft gleiches Problem wie in Lines!
    }

    const showDetailBox = (id, name, description, imageUrls) => {
        setElementDetails([!elementDetails[0], id, name, description, imageUrls]);
    }

    const showausstattung = (stepsceGe, ausid, auscode, ausname, ausprice, auscategory, description, ausimg) => {
        if(stepsceGe == ausid){
            if(ausid != 645 && !auscategory.startsWith('Fahrhilfen >')){
                return(
                    <div className="auselement">
                        <div className="leftaus">
                            <input className="ausstattungcheck"  type="checkbox" onChange={() => selectedAusstattung(ausid, ausname, ausprice)} checked={selectedausstattungname ? selectedausstattungname.includes(`${ausid} ${ausname}`) : selectedEquipmentFirst.includes(ausid)}/>
                            <p className="austext">{auscode} {ausname}</p>
                            <button className="infoIconButtonAus" onClick={() => showDetailBox(ausid, ausname, description, ausimg)}><img className="infoIcon" src={info} alt="info"/></button>
                        </div>
                        <div className="rightaus">
                            <p className="priceaus">{ausprice.toFixed(2)} EUR mtl.</p>
                            {ausid == 'PSE' && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div className="auselementnotavai">
                        <div className="auselementnotavaijusty">
                            <div className="leftaus">
                                <input disabled className="ausstattungchecknotavai" type="checkbox"/>
                                <p className="austext">{auscode} {ausname}</p>
                            </div>
                            <div className="rightaus">
                                <p className="priceaus">{ausprice.toFixed(2)} EUR mtl.</p>
                                {ausid == 'PSE' && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                            </div>
                        </div>
                        <div className="notavaitextaus">
                            <p>Leider nicht bestellbar</p>
                        </div>
                    </div>
                )
            }
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

    const clickreaction = (stepsctitle) => {
        setButtid(prevButtid => ({
            ...prevButtid,
            [stepsctitle]: !prevButtid[stepsctitle] // Zustand umschalten
        }));
    }
    
    const mbody = (stepsid, stepsc) => {
        if (stepsid == 6){
            return (
                <div>
                    <ElementSearch collectausstattung={collectausstattung} collectline={collectline} collectpaketline={collectpaketline} collectwinterpaketplus={collectwinterpaketplus} collectlederpaket={collectlederpaket} collectzusatzpaket={collectzusatzpaket} collectfarben={collectfarben} collectraeder={collectraeder} collectpolster={collectpolster} collectzierelemente={collectzierelemente} elementName={elementName}/>
                    {stepsc.map((stepsc) =>(
                        <div>
                            <div className={buttid[stepsc.title] ? 'mbuttonsclicked' : 'mbuttons'}>
                                <hr className="linem"/>
                                <button onClick={() => clickreaction(stepsc.title)}>
                                    {stepsc.title}
                                    <div className="moreButtonm">{arrowIcon(stepsc.title)}</div>
                                </button>
                            </div>
                            {buttid[stepsc.title] &&
                                <div>
                                    {stepsc.equipmentGroups.map((stepsceG) => (
                                        <div>
                                            <div className="stepsheadline"><h2>{stepsceG.headline}</h2></div>
                                            <div className="buttretaus">
                                                {stepsceG.equipments.map((stepsceGe) => (
                                                    <div className="ausstattungmargin"> 
                                                        {ausstattung.map((ausstattungen) => (
                                                            <div>{showausstattung(stepsceGe, ausstattungen.id, ausstattungen.code, ausstattungen.name, ausstattungen.price, ausstattungen.category, ausstattungen.description, ausstattungen.imageUrls)}</div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
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
 
export default SpAusstattung;