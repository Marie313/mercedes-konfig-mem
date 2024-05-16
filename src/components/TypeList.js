import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const TypeList = ({ selectedModell }) => {
  const [type, setType] = useState([]);
  const [showMoreCars, setShowMoreCars] = useState(false);
  const [typeback, setTypeback] = useState([]);
  const [buttonValues, setButtonValues] = useState({});
  const [NewTypeDiv, setNewTypeDiv] = useState("NewTypeDiv");
  const [focusedButton, setFocusedButton] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const typeData = [];
      for (let i = 0; i < 8; i++) {
        const response = await fetch(`http://localhost:8002/${i}`);
        const data = await response.json();
        typeData.push(data);
      }
      setTypeback(typeData);
      setType(typeData);
    };

    fetchData();
  }, []);

  const showReturn = (
    typesMietmodell,
    typesKaufmodell,
    typespic,
    typesclass,
    typesid,
    carsmoreCars
  ) => {
    if (selectedModell === "mietmodell") {
      if (typesMietmodell === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <div className={`showReturni${typesid}`}>
              <button className={focusedButton === typesid ? "clickred" : "ribbel" } onClick={() => {ShowCars(carsmoreCars, typesid, typesclass)}}>
                  <img src={typespic} className="carsPic" />
                  <div className="backgroundcolor1">
                    <p className="carClass">{typesclass}</p>
                    {moreCars(carsmoreCars, typesid, typesclass)}
                  </div>
              </button>
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${typesclass}`}>
            <div className="showReturn">
              <img src={typespic} className="carsPic" />
              <div className="backgroundcolor">
                <p className="carClass">{typesclass}</p>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className='showReturnFalse'>
          <img src={typespic} className="carsPic" />
          <div className="backgroundcolor">
            <p className="carClass">{typesclass}</p>
          </div>
        </div>
      );
    }
    if (selectedModell === "kaufmodell") {
      if (typesKaufmodell === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <div className={`showReturni${typesid}`}>
              <button className={focusedButton === typesid ? "clickred" : "ribbel" } onClick={() => {ShowCars(carsmoreCars, typesid, typesclass)}}>
                  <img src={typespic} className="carsPic" />
                  <div className="backgroundcolor1">
                    <p className="carClass">{typesclass}</p>
                    {moreCars(carsmoreCars, typesid, typesclass)}
                  </div>
              </button>
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${typesclass}`}>
            <div className="showReturn">
              <img src={typespic} className="carsPic" />
              <div className="backgroundcolor">
                <p className="carClass">{typesclass}</p>
                {moreCars(carsmoreCars, typesid, typesclass)}
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <img src={typespic} className="carsPic" />
          <div className="backgroundcolor">
            <p className="carClass">{typesclass}</p>
          </div>
        </div>
      );
    }
  };

  const moreCars = (typesmoreCars, typesid, typeskarosserie) => {
    
    if (typesmoreCars) {
      return (
        <button className="moreButton" onClick={ShowCars}>
          {buttonValues[typesid] === "down" ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      );
    }
    return null;
  };

  const ShowCars = async (typesmoreCars, typesid, typeskarosserie) => {
 
    if (focusedButton){
      setFocusedButton(null);
    }
    else{
    setFocusedButton(typesid);
    }
 
    const toggleButtonValue = () => {
    setButtonValues((prevState) => ({
      ...prevState,
      [typesid]: prevState[typesid] === "down" ? "up" : "down",
    }));
  };

  const toggleShowMoreCars = () => {
    setShowMoreCars(!showMoreCars);
  };

    if (!showMoreCars) {
      const carMoreData = [];
      for (let i = 0; i < 41; i++) {
        const response = await fetch(`http://localhost:8001/${i}`);
        const data = await response.json();
        if (data.karosserie === typeskarosserie) {
          carMoreData.push(data);
        }
      }
      const addition = (typesid) => {
        let add = 0;
        if (typesid % 3 !== 0) {
         typesid = typesid + 1;
          if (typesid % 3 !== 0) {
            typesid = typesid + 1;
            add = 2;
          } else {
            add = 1;
          }
        }
        return add;
      };
      const typeDiv = (carMoreDataLength) => {
        if(carMoreDataLength % 3 !== 0){
          carMoreDataLength = carMoreDataLength +1
          if((carMoreDataLength % 3 !== 0)){
            setNewTypeDiv("NewTypeDiv2");
            setType([
              ...type.slice(0, typesid + addition(typesid)),
              ...carMoreData.map((type) => ({ ...type, newCar: true }) ),
              ...type.slice(typesid + addition(typesid) -2 ),
            ]);
          }
          if((carMoreDataLength % 3 === 0) && (carMoreDataLength <= 3)){
            console.log("hi");
            setNewTypeDiv("NewTypeDiv1");
            setType([
              ...type.slice(0, typesid + addition(typesid)),
              ...carMoreData.map((type) => ({ ...type, newCar: true }) ),
              ...type.slice(typesid + addition(typesid) -1),
            ]);
          }
          else if((carMoreDataLength % 3 === 0)) {
            setNewTypeDiv("NewTypeDiv");
            setType([
              ...type.slice(0, typesid + addition(typesid)),
              ...carMoreData.map((type) => ({ ...type, newCar: true }) ),
              ...type.slice(typesid + addition(typesid) ),
            ]);
          }
        }
        else{
          setNewTypeDiv("NewTypeDiv");
          setType([
            ...type.slice(0, typesid + addition(typesid)),
            ...carMoreData.map((type) => ({ ...type, newCar: true }) ),
            ...type.slice(typesid + addition(typesid) ),
          ]);
        }
      }
      toggleShowMoreCars();
      toggleButtonValue();
      typeDiv(carMoreData.length);
    } else {
      setType(typeback);
      toggleShowMoreCars();
      toggleButtonValue();
    }
  };

  const BeforeShowReturn = (typesNewCar,typesmietmodell,typeskaufmodell,typespic,typesclass,typesmoreCars,typesid) => {
    if(typesNewCar){
      return(
      <div className={NewTypeDiv}>
          <div className={`cars-prview ${typesNewCar ? 'new-cars-row' : ''}`} key={typesid}>
          {showReturn(
              typesmietmodell,
              typeskaufmodell,
              typespic,
              typesclass,
              typesid,
              typesmoreCars
          )}
          </div>
      </div>
      );
    }
    if(!typesNewCar){
      return(
      <div className="OldTypeDiv">
          <div className={`cars-prview ${typesNewCar ? 'new-cars-row' : ''}`} key={typesid}>
          {showReturn(
              typesmietmodell,
              typeskaufmodell,
              typespic,
              typesclass,
              typesid,
              typesmoreCars
          )}
          </div>
      </div>
      );
    }
  }

  return (
    <div className="returnALL">
      <div className="cars-map">
        {type.map((types) => (
          <div>
            {BeforeShowReturn(types.newCar,types.mietmodell,types.kaufmodell,types.pic,types.class,types.moreCars,types.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeList;
