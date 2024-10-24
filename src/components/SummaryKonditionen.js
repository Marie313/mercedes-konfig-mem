import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";

const SummaryKonditionen = ({ mietrate, miles }) => {
  const [showkonditionen, setshowkonditionen] = useState(false);

  const arrowIconkonditionen = () => {
    if (showkonditionen) {
      return <SlArrowUp />;
    } else {
      return <SlArrowDown />;
    }
  };

  return (
    <div className={showkonditionen ? "mbuttonsclicked" : "mbuttons"}>
      <hr className="linem" />
      <button onClick={() => setshowkonditionen(!showkonditionen)}>
        Konditionen und Preise
        <div className="moreButtonm">{arrowIconkonditionen()}</div>
      </button>
      {showkonditionen && 
        <div className="divleistungsdaten">
          <div className="inline">
            <b>
              <p>
                Ihre exklusive mtl. Rate<sup>1</sup>:
              </p>
            </b>
            <b>
              <p className="sonderauspreis">{mietrate} EUR</p>
            </b>
          </div>
          <hr className="hrkon" />
          <div className="inline">
            <p className="fahrleistung">Fahrleistung im Mietzeitraum:</p>
            <p className="sonderauspreis">{miles} km</p>
          </div>
          <hr className="hrkon" />
          <div className="konditionenInc">
            <p className="Incp">In der Rate ist Folgendes inklusive:</p>
            <div className="konditionenInline">
              <TbPointFilled className="pointkond" />
              <p className="Incp">
                Haftpflichtversicherung (unbegrenzte Deckungssumme)
              </p>
            </div>
            <div className="konditionenInline">
              <TbPointFilled className="pointkond" />
              <p className="Incp">Vollkaskoversicherung</p>
            </div>
            <div className="konditionenInline">
              <TbPointFilled className="pointkond" />
              <p className="Incp">Alle anfallenden Kundendienste</p>
            </div>
          </div>
          <p className="konditionensmall">
            <sup>1</sup>Zzgl. eines Abschlags in Höhe von 200,00 EUR bei
            Vertragsende.
          </p>
        </div>
      }
    </div>
  );
};

export default SummaryKonditionen;
