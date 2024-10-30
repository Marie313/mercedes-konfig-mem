import cancel from "../image/cancel.svg";
import { useState, useEffect } from "react";

const ConsumptionLabel = ({setIsVisible, models, name, herkunft}) => {
    const [consumptionLabels, setConsumptionLabels] = useState();

    useEffect(() => {
        const filteredLabels = JSON.parse(models.filter(model => model.name === name).map(model => model.consumptionLabel));
        
        setConsumptionLabels(filteredLabels);
    }, [models, name]);

    // Log the current state of consumptionLabels
    console.log("Current Consumption Labels:", consumptionLabels?.baseData);
    console.log("Current Consumption Labels:", consumptionLabels?.co2LabelContainer);
    console.log("Current Consumption Labels:", consumptionLabels?.costs);
    console.log("Current Consumption Labels:", consumptionLabels?.energyConsumption);
    console.log("Current Consumption Labels:", consumptionLabels?.footer);
    console.log("Current Consumption Labels:", consumptionLabels?.footnotes);
    console.log("Current Consumption Labels:", consumptionLabels?.furtherConsumptionData);


    return ( 
        <div className="CLbgrd">
            {herkunft == 'motor' && <div className="canceldetailbtn"><button onClick={() => setIsVisible(false)}><img className="cancelicon" src={cancel}/></button></div>}
            <div className="consumptionLabel">  
                <h2 className="CLheadline">Information über den Energieverbrauch und die CO₂-Emissionen des neuen Pkw</h2>
            </div>
            <div className="consumptionLabelBody">
                {consumptionLabels?.baseData.map((bD) => (
                    <div className="baseData">
                        <p className="labelCL">{bD.label}:</p>
                        <p>{bD.value}</p>
                    </div>
                ))}
            </div> 
            <div className="consumptionLabelBody">
                {consumptionLabels?.energyConsumption.map((eC) => (
                    <div className="baseData">
                        <p className="labelCL">{eC.label}:</p>
                        <p>{eC.value}<sup>{eC.footnotes}</sup></p>
                    </div>
                ))}
            </div> 
            <div className="alloverCO2">
                <div className="consumptionLabelBodyCO2class">
                    <div className="CO2class">
                        <div>
                            <p className="labelCLCO2">{consumptionLabels?.co2LabelContainer.label}</p>
                            <p>{consumptionLabels?.co2LabelContainer.subLabel}</p>
                            <svg className="classLabel" fill="lightgrey" viewBox="0 0 1120 660">
                                <path fill="#00a551" d="M0,100 L105,100 L140,135 L105,170 L0,170 L0,100 z"></path>
                                <text fill="white" x="14" y="152.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>A</text>
                                <path fill="#43b538" d="M0,180 L140,180 L175,215 L140,250 L0,250 L0,180 z"></path>
                                <text fill="white" x="14" y="232.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>B</text>
                                <path fill="black" d="M525,180 L630,180 L630,250 L525,250 L490,215 L525,180 z"></path>
                                <text fill="white" x="560" y="232.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>{consumptionLabels?.co2LabelContainer.energyEfficiencyClass}</text>
                                <path fill="#abd52b" d="M0,260 L175,260 L210,295 L175,330 L0,330 L0,260 z"></path>
                                <text fill="white" x="14" y="312.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>C</text>
                                <path fill="#fdf02e" d="M0,340 L210,340 L245,375 L210,410 L0,410 L0,340 z"></path>
                                <text fill="white" x="14" y="392.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>D</text>
                                <path fill="#f9ac29" d="M0,420 L245,420 L280,455 L245,490 L0,490 L0,420 z"></path>
                                <text fill="white" x="14" y="472.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>E</text>
                                {consumptionLabels?.co2LabelContainer.energyEfficiencyClassSecondary && (
                                    <>
                                        <path fill="black" d="M805,420 L910,420 L910,490 L805,490 L770,455 L805,420 z"></path> 
                                        <text fill="white" x="840" y="472.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>{consumptionLabels?.co2LabelContainer.energyEfficiencyClassSecondary}</text> 
                                        <line x1="700" x2="700" y1="90" y2="650" stroke="black" stroke-width="3"></line>
                                    </>
                                )}
                                <path fill="#f15626" d="M0,500 L280,500 L315,535 L280,570 L0,570 L0,500 z"></path>
                                <text fill="white" x="14" y="552.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>F</text>
                                <path fill="#ec232c" d="M0,580 L315,580 L350,615 L315,650 L0,650 L0,580 z"></path>
                                <text fill="white" x="14" y="632.5" style={{fontSize: '52.5px', fontFamily: 'sans-serif'}}>G</text>
                                <text fill="black" x="490" y="0" style={{textAlign: 'center', fontSize: '35px', width: '1px'}}>
                                    <tspan dy="35px" x="490">gewichtet</tspan>
                                    <tspan dy="35px" x="490">kombiniert</tspan>
                                </text>
                                {consumptionLabels?.co2LabelContainer.energyEfficiencyClassSecondary &&
                                    <text fill="black" x="770" y="0" style={{textAlign: 'center', fontSize: '35px', width: '1px'}}>
                                        <tspan dy="35px" x="770">bei&nbsp;entladener</tspan>
                                        <tspan dy="35px" x="770">Batterie</tspan>
                                    </text>
                                }   
                            </svg>
                        </div>
                    </div>
                </div>  
                <div className="consumptionLabelBodyCO2more">
                    <p className="wA">Weitere Angaben:</p>
                    {consumptionLabels?.furtherConsumptionData.map((fCD) => (
                        <div>
                            <div className="furtherCD">
                                <p className="labelCLCO2">{fCD.label}:</p>
                                <p>{fCD.value}<sup>{fCD.footnotes}</sup></p>
                            </div>
                            {fCD.subvalues.map((fCDsv) => (
                                <div className="baseData">
                                    <p>{fCDsv.label}:</p>
                                    <p>{fCDsv.value}<sup>{fCD.footnotes}</sup></p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>  
            </div>
            <div className="consumptionLabelBody">
                {consumptionLabels?.costs.map((costs) => (
                    <div className="ConsumpCat">
                        <div className="baseData">
                            <p className="labelCL">{costs.label}:</p>
                            <p>{costs.value}</p>
                        </div>
                        {costs.subvalues?.map((costssub) => (
                            <div className="baseData">
                                <p>{costssub.label}:</p>
                                <p>{costssub.value}<sup>{costs.footnotes}</sup></p>
                            </div>
                        ))}
                    </div>
                ))}
            </div> 
            <div className="consumptionLabelBody">
                <div className="footnotes">
                    <p>{consumptionLabels?.footnotes[" "]}</p>
                    <p><sup>1 </sup>{consumptionLabels?.footnotes["1"]}</p>
                    <p><sup>2 </sup>{consumptionLabels?.footnotes["2"]}</p>
                </div>
            </div>  
            <div className="gedate"><p className="labelCL">erstellt am:</p><p> {new Date().toLocaleDateString()}</p></div>
        </div>
    );
}
 
export default ConsumptionLabel;