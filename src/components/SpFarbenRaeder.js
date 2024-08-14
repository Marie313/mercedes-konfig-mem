import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";


const SpFarbenRaeder = ({motorSteps, collectfarben, collectraeder, collectnamefarbe, collectnameraeder}) => {
    const [steps, setSteps] = useState ([]);
    const [buttid, setButtid] = useState({});
    const [farben, setFarben] = useState({});
    const [selectedFarbe,setSelectedFarbe] = useState('191');
    const [selectedFelge,setSelectedFelge] = useState('25R');

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
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8021/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8017/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_d_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8018/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_180_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8020/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_200_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8019/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_220_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8015/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'A_250_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8014/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
        else if(motorSteps === 'Mercedes-AMG_A_35_4MATIC_Limousine'){
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8013/equipments`);
              const data = await response.json();
              setFarben(data);
          };
          fetchData();
        }
    }, []);

    const changeSelectedFarbe = (frcode, frprice, frname) => {
        setSelectedFarbe(frcode);
        collectfarben(frprice);
        collectnamefarbe(`${frcode} ${frname}`);
    }

    const changeSelectedFelge = (frcode, frprice, frname) => {
        setSelectedFelge(frcode);
        collectraeder(frprice);
        collectnameraeder(`${frcode} ${frname}`);
    }

    const showfr = (stepsceGe) => {
        return(
            <div>
                {farben.map((farben) => (
                    <div>{showcw(stepsceGe, farben.id, farben.thumbnailUrl, farben.code, farben.name, farben.price, farben.category)}</div>
                ))}
            </div>
        )
    }

    const showcw = (stepsceGe, frid, frpic, frcode, frname, frprice, frcategory) => {
        if(stepsceGe == frid){
            if(stepsceGe != 'L*696' && stepsceGe != 'L*662'){
                return(
                    <div className="frreturn">
                        <div className="frbox">
                            <img className="frpic" src={frpic}/>
                            <div className="frinline">
                                <div className="left">
                                    <div>
                                        <input checked={frcategory == 'Felgen' ? (selectedFelge == frcode) : (selectedFarbe == frcode)} onChange={frcategory == 'Felgen' ? (() => changeSelectedFelge(frcode, frprice. frname)) : (() => changeSelectedFarbe(frcode, frprice, frname))} className="farbenCheck" type="checkbox"/>
                                    </div>
                                    <div className="frcodename">
                                        <p>{frcode} {frname}</p>
                                        <p className="frprice">{frprice.toFixed(2)} EUR mtl.</p>
                                    </div>
                                </div>
                                <div className="rightfr">
                                    {frid == 'L*191' && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div className="frreturn">
                        <div className="frboxnotavai">
                            <img className="frpicna" src={frpic}/>
                            <div className="frinline">
                                <div className="left">
                                    <div className="frcodename">
                                        <p className="notavaicodefr">{frcode} {frname}</p>
                                        <div className="notavaitextfr"><p>Leider nicht bestellbar</p></div>
                                    </div>
                                </div>
                                <div className="rightfr">
                                    {frid == 'L*191' && <img className="mietumfangimgint" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.7 31.6' fill='%2300adef'%3E%3Cpath d='M21.9 0H0v4h21.9V0zm-9.6 23c.5-1.2 1.2-2.3 2.1-3.1H6.9v-1.8h10.8c.7-.2 1.3-.3 2.1-.3.7 0 1.4.1 2 .3V4.9H0v23h12.1c-.2-.7-.3-1.5-.3-2.3 0-.3 0-.7.1-1h-5v-1.8h5.4v.2zM6.9 8.2h12.9V10H6.9V8.2zm0 4.9h12.9v1.8H6.9v-1.8zM5.2 24.7H2.1v-1.8h3.1v1.8zm0-4.9H2.1V18h3.1v1.8zm0-4.9H2.1v-1.8h3.1v1.8zm0-4.9H2.1V8.2h3.1V10zm14.6 9.8c-3.3 0-5.9 2.6-5.9 5.9s2.7 5.9 5.9 5.9c3.3 0 5.9-2.6 5.9-5.9.1-3.2-2.6-5.9-5.9-5.9zm-1.3 9.4L17.3 28l-2-2 1.2-1.2 2 2 4.7-4.7 1.2 1.2-5.9 5.9z'/%3E%3C/svg%3E"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    const showbuttret = (stepscequipmentG) => {
        return(
            <div>
                {stepscequipmentG.map((stepsceG) => (
                    <div className="buttretfarbe">
                        {stepsceG.equipments.map((stepsceGe) => (
                            <div>{showfr(stepsceGe)}</div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    const clickreaction = (stepsctitle) => {
        setButtid(prevButtid => ({
            ...prevButtid,
            [stepsctitle]: !prevButtid[stepsctitle] 
        }));
    }

    const arrowIcon = (stepsctitle) => {
        if (buttid[stepsctitle]){
            return (<SlArrowUp/>)
        }
        else{
            return (<SlArrowDown/>)
        }
    }

    const returnm = (stepsctitle, stepscequipmentG) => {
            return(
                <div>
                    <div className={buttid[stepsctitle] ? 'mbuttonsclicked' : 'mbuttons'}>
                        <hr className="linem"/>
                        <button onClick={() => clickreaction(stepsctitle)}>
                            {stepsctitle}
                            <div className="moreButtonm">{arrowIcon(stepsctitle)}</div>
                        </button>
                    </div>
                    {buttid[stepsctitle] && showbuttret(stepscequipmentG)}
                </div>
            )
    }
    
    const mbody = (stepsid, stepsc) => {
        if (stepsid == 4){
            return (
                <div>
                {stepsc.map((stepsc) =>(
                    <div>{returnm(stepsc.title, stepsc.equipmentGroups)}</div>
                ))}
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
                    {mbody(steps.id, steps.categories)}
                </div>
            ))}
        </div> 
    );
}
 
export default SpFarbenRaeder;