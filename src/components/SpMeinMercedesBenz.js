import { useEffect, useState } from "react";
import EmailSummary from "./EmailSummary";
import ElementSearch from "./ElementSearch";
import Mietumfang from "./Mietumfang";
import SummaryReifenlabel from "./SummaryReifenlabel";
import SummaryVerbrauchsdaten from "./SummaryVerbrauchsdaten";
import SummaryLeistungsdaten from "./SummaryLeistungsdaten";
import SummaryKonditionen from "./SummaryKonditionen";
import SummarySonder from "./SummarySonder";
import SummarySerie from "./SummarySerie";
import pencil from "../image/pencil.svg";
import garbage from "../image/garbage.svg";
import cancel from "../image/cancel.svg";

const SpMeinMercedesBenz = ({elementName, elementPrice, changeNav, deleteElementSmry, mietrate, miles, collectausstattung,collectline, collectpaketline, collectwinterpaketplus, collectlederpaket, collectzusatzpaket, collectfarben, collectraeder, collectzierelemente, collectpolster,  setIsVisibleSummary, isVisibleSummary}) => {
    const [steps, setSteps] = useState ([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchData = async (fileName) => {
            const response = await fetch(`http://localhost:3057/${fileName}/steps`);
            const response2 = await fetch(`http://localhost:3057/${fileName}/models`);
            const data = await response.json();
            const data2 = await response2.json();
            setSteps(data);
            setModels(data2);
        };
        
        fetchData(elementName.motorSteps);
    }, [elementName.motorSteps]);

    const editOnly = (stepsid) => {
        return(
            <div className="summaryLines">
                <h2 className="h2Summary">{stepsid == 4 ? elementName.color : elementName.upholstery}</h2>
                <div className="summaryRight">
                    <b><p className="sonderauspreis">{stepsid == 4 ? elementPrice.color : elementPrice.upholstery} EUR mtl.</p></b>
                    <div className="buttonssmry">
                        <button className="pencil" onClick={() => changeNav(stepsid)}><img className="pencilIcon" src={pencil} alt="pencil"/></button>
                    </div>
                </div>
            </div>
        )
    }

    const editAndDelete = (stepsid, ident) => {
        return(
            <div>
                <div className="summaryLines">
                    <h2 className="h2Summary">{stepsid == 4 ? elementName.wheels : stepsid == 5 ? elementName.decorativeElements : ident == 'line' ? elementName.line : ident == 'paketline' ? elementName.packageLine : ident == 'winterpaket' ? elementName.winterPackagePlus : ident == 'lederpaket' && elementName.leatherPackage}</h2>
                    <div className="summaryRight">
                        <b><p className="sonderauspreis">{stepsid == 4 ? elementPrice.wheels : stepsid == 5 ? elementPrice.decorativeElements : ident == 'line' ? elementPrice.line : ident == 'paketline' ? elementPrice.packageLine : ident == 'winterpaket' ? elementPrice.winterPackagePlus : ident == 'lederpaket' && elementPrice.leatherPackage} EUR mtl.</p></b>
                        <div className="buttonssmry">
                            <button className="pencil" onClick={() => changeNav(stepsid)}><img className="pencilIcon" src={pencil} alt="pencil"/></button>
                            <button className="garbage" onClick={() => deleteElementSmry(stepsid, ident)}><img className="garbageIcon" src={garbage} alt="garbage"/></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const stepsheadline = (stepsid, stepstitle, stepscategories) => {
        if(stepsid == 2){
            return(
                <div>
                    <div className="stepsheadline">
                        <b>{stepstitle}</b>
                    </div>
                    <div className="summaryMotor">
                        <h2>{elementName.motorName}</h2>
                        <button className="pencil" onClick={() => changeNav(stepsid)}><img className="pencilIcon" src={pencil} alt="pencil"/></button>
                    </div>
                </div>
            )
        }
        else if(stepsid == 3){
            return(
                <div>
                    <div className="stepsheadline">
                        <b>{stepstitle}</b>
                    </div>
                    {elementName.line && <div>{editAndDelete(stepsid, 'line')}</div>}
                    {elementName.packageLine && <div>{editAndDelete(stepsid, 'paketline')}</div>}
                    {elementName.winterPackagePlus && <div>{editAndDelete(stepsid, 'winterpaket')}</div>}
                    {elementName.leatherPackage && <div>{editAndDelete(stepsid, 'lederpaket')}</div>}
                    {elementName.addPackage && elementName.addPackage.map((zpname, i)=>(
                        <div className="summaryLines">
                            <h2 className="h2Summary">{zpname}</h2>
                            <div className="summaryRight">
                                <b><p className="sonderauspreis">{elementPrice.addPackage[i][1]} EUR mtl.</p></b>
                                <div className="buttonssmry">
                                    <button className="pencil" onClick={() => changeNav(stepsid)}><img className="pencilIcon" src={pencil} alt="pencil"/></button>
                                    <button className="garbage" onClick={() => deleteElementSmry(stepsid, 'zusatzpaket', zpname, elementPrice.addPackage[i][1])}><img className="garbageIcon" src={garbage} alt="garbage"/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else if(stepsid == 4 || stepsid == 5){
            return(
                <div>
                    {stepscategories.map((stepsc) => (
                        <div>
                            <div className="stepsheadline">
                                <b>{stepsc.title}</b>
                            </div>
                            {(stepsid === 4 ? elementName.wheels : elementName.decorativeElements) && stepsc.title == 'Polster' || stepsc.title == 'Farben' ?  editOnly(stepsid) : (stepsc.title == 'Zierelemente' || stepsc.title == 'Räder') && editAndDelete(stepsid)}
                        </div>
                    ))}
                </div>
            )
        }
    }  

    return (
        <div>
            <div className="motorisierung">
                <div className="elementssummary">
                    {steps.map((steps) => (
                        <div>
                            {stepsheadline(steps.id, steps.title, steps.categories)}
                        </div>
                    ))}
                </div>
                <div className="summary">
                    <SummarySerie motorSteps={elementName.motorSteps}/>
                    <SummarySonder motorSteps={elementName.motorSteps}/>
                    <SummaryKonditionen mietrate={mietrate} miles={miles}/>
                    <SummaryLeistungsdaten motorSteps={elementName.motorSteps}/>
                    <SummaryVerbrauchsdaten elementName={elementName} models={models}/>
                    <SummaryReifenlabel/>
                    <hr className="linem"/>
                </div>
                <ElementSearch collectausstattung={collectausstattung} collectline={collectline} collectpaketline={collectpaketline} collectwinterpaketplus={collectwinterpaketplus} collectlederpaket={collectlederpaket} collectzusatzpaket={collectzusatzpaket} collectfarben={collectfarben} collectraeder={collectraeder} collectpolster={collectpolster} collectzierelemente={collectzierelemente} elementName={elementName}/>
                <EmailSummary/>
                <Mietumfang/>
            </div> 
            <div className="linesside">
                {isVisibleSummary && (
                    <div className="displaydeatils">
                        <div className="detailBox">
                            <div className="canceldetailbtn"><button onClick={() => setIsVisibleSummary(!isVisibleSummary)}><img className="cancelicon" src={cancel}/></button></div>
                            <h2 className="hinweis">Entfernen des Elements fehlgeschlagen!</h2>
                            <p>Das von Ihnen gewählte Element konnte nicht entfernt werden, da kein Ersatz definiert worden ist!</p>
                            <button onClick={() => setIsVisibleSummary(!isVisibleSummary)} className="goBackBtn">OK</button>
                        </div>
                    </div>
                )}
            </div>
        </div>  
    );
}
 
export default SpMeinMercedesBenz;