import { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import ConsumptionLabel from "./ConsumptionLabel";

const SummaryVerbrauchsdaten = ({ elementName, models }) => {
  const [isVisible, setIsVisible] = useState(true);

  const clickreactionverbrauch = () => {
    setIsVisible(!isVisible);
  };

  const arrowIconverbrauch = () => {
    if (isVisible) {
      return <SlArrowUp />;
    } else {
      return <SlArrowDown />;
    }
  };

  return (
    <div>
      <div className={isVisible ? "mbuttonsclicked" : "mbuttons"}>
        <hr className="linem" />
        <button onClick={() => clickreactionverbrauch()}>
          Verbrauchsdaten
          <div className="moreButtonm">{arrowIconverbrauch()}</div>
        </button>
      </div>
      {isVisible && (
        <div className="divverbrauchsdaten">
          <ConsumptionLabel
            setIsVisible={setIsVisible}
            models={models}
            name={elementName.motorName}
            herkunft={"summary"}
          />
        </div>
      )}
    </div>
  );
};

export default SummaryVerbrauchsdaten;
