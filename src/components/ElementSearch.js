import { useState, useEffect } from "react";
import cancel from "../image/cancel.svg";

const ElementSearch = ({collectausstattung, collectline, collectpaketline, collectwinterpaketplus, collectlederpaket, collectzusatzpaket, collectfarben, collectraeder, collectpolster, collectzierelemente, elementName}) => {
  
  const [ausstattung, setAusstattung] = useState([]);
  const [searchresult, setSearchresult] = useState([false, '']);
  const [detailContent, setDetailContent] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [detailKey, setDeatilKey] = useState();
  const [showDetailedErgebnis, setShowDetailedErgebnis] = useState(false);
  const [ausids, setAusids] = useState([]);
  const [aus, setAus] = useState([]);
  const [lines, setLines] = useState([]);
  const [farben, setFarben] = useState([]);
  const [polster, setPolster] = useState([]);
  const [zierelemente, setZierelemente] = useState([]);
  const [raeder, setRaeder] = useState([]);
  // Sammlung der useStates

  useEffect(() => {
    const fetchData = async (fileName) => {
      const response = await fetch(`http://localhost:3057/${fileName}/steps`);
      const response2 = await fetch(`http://localhost:3057/${fileName}/equipments`);
      const data = await response.json(); // steps und dazugehörige Elemente
      const data2 = await response2.json(); // alle Element mit id's, code's, namen etc.
      data?.forEach((dataItem) => {dataItem.categories?.forEach((category) => {category.equipmentGroups?.forEach((equipmentGroup) => {equipmentGroup.equipments?.forEach((equipment) => {ausids.push(equipment)})})})});
      //id's aus den einzelnen steps sammeln, um später vergleich zu können
      data[1].categories[0].equipmentGroups.map((eG) => eG.equipments.map((eGe) => lines.push(eGe))); //sammeln der id's für lines
      data[2].categories[0].equipmentGroups.map((eG) => eG.equipments.map((eGe) => farben.push(eGe))); //sammeln der id's für farben
      data[2].categories[1].equipmentGroups.map((eG) => eG.equipments.map((eGe) => raeder.push(eGe))); //sammeln der id's für räder
      data[3].categories[0].equipmentGroups.map((eG) => eG.equipments.map((eGe) => polster.push(eGe))); //sammeln der id's für polster
      data[3].categories[1].equipmentGroups.map((eG) => eG.equipments.map((eGe) => zierelemente.push(eGe))); //sammeln der id's für zierelemente
      data[4].categories.map((cat) => cat.equipmentGroups.map((eG) => eG.equipments.map((eGe) => aus.push(eGe)))); //sammeln der id's für ausstattung
      //notwendig um später Entscheidung über collect Funktion treffen zu können
      setAusstattung(data2); // sammeln der Informationen aller Elemente
    };

    fetchData(elementName.motorSteps); //Funktionsaufruf + Parameterübergabe
  }, [elementName.motorSteps]); //erneute Ausführung bei Änderung der motorSteps

  const inputChange = (event) => { //Funktion wird bei Änderungen im input Feld ausgeführt
    let input = event.target.value;
    setInputSearch(input); //speichert übernimmt Wert des Input Feldes (eingegebene Daten)
    setDetailContent([]); //bei Änderung des Input Feldes wird detailContent geleert --> keine mehrfach Ausgabe von gleichen Elementen + garantiert passende Ausgabe der Elemente

    let match = ausstattung.filter((aus) => aus.code.toLowerCase() === input.toLowerCase()); //Element aus ausstattungen, bei dem id mit dem eingegebenen Wert übereinstimmen (notwendig bei Suche nach id!) --> toLowerCase um Groß- / Kleinschreibung zu ignorieren

    if(match.length == 0){
      match = ausstattung.filter((aus) => (aus.name).toLowerCase().includes(input.toLowerCase()))
    } // wenn kein Treffer bei Suche nach id --> vergleicht Elemente aus ausstattung mit einegegbenen Wert (notwendig bei Suche nach Namen!) --> toLowerCase um Groß- / Kleinschreibung zu ignorieren

    if(input.length > 2){ //erst aktiv, wenn drei Zeichen eingegeben
      match.forEach(match => {
        if (ausids.includes(match?.id)) {
          if (
            (elementName.equipment && elementName.equipment.includes(`${match.code} ${match.name}`)) ||
            (elementName.line && elementName.line.includes(`${match.code} ${match.name}`)) ||
            (elementName.packageLine && elementName.packageLine.includes(`${match.code} ${match.name}`)) ||
            (elementName.leatherPackage && elementName.leatherPackage.includes(`${match.code} ${match.name}`)) ||
            (elementName.winterPackagePlus && elementName.winterPackagePlus.includes(`${match.code} ${match.name}`)) ||
            (elementName.addPackage && elementName.addPackage.includes(`${match.code} ${match.name}`)) ||
            (elementName.color && elementName.color.includes(`${match.code} ${match.name}`)) ||
            (elementName.wheels && elementName.wheels.includes(`${match.code} ${match.name}`)) ||
            (elementName.upholstery && elementName.upholstery.includes(`${match.code} ${match.name}`)) ||
            (elementName.decorativeElements && elementName.decorativeElements.includes(`${match.code} ${match.name}`))) {
            setSearchresult([false, "Die Ausstattung ist bereits ausgewählt"]);
          } //Selektion, wenn gesuchtes Element bereits aktiviert ist
          else {
            setSearchresult([true, match.name]);
            setDetailContent(prevContent => [...prevContent,[match.id, match.name, match.code, match.description, match.price, match.imageUrls.length === 0 ? [match.thumbnailUrl, "thumb"] : [match.imageUrls, "img"]]]); //prevContent notwendig wegen forEach --> damit alle passenden Element gesetzt werden, nicht nur das letzte
          } //Selektion wenn passende Elemente gefunden wurden
        } 
        else{
          setSearchresult([false, "Diese Ausstattung ist leider nicht verfügbar"]);
        } // Selektion wenn kein passendes Element zu der Sucheingabe existiert
      })
      if(match.length == 0){
        setSearchresult([false, "Diese Ausstattung ist leider nicht verfügbar"]);
      } // Selektion wenn match scheinbar existiert, tatsächich aber nicht vorhanden ist
    }
    else{
      setSearchresult('');
      setDetailContent([]);
    } //Selektion wenn input kleiner als drei ist --> keine Suche/ kein Ergebnis
  }

  const showDetailErgebnis = (key) => {
    if (searchresult[0]) {
      setShowDetailedErgebnis(true); // detailierte Anzeige wird aktiviert
      setDeatilKey(key); // Übergabe des index des Buttons der geklickt worden ist
      setInputSearch(""); // Wert des Inputs wird zurückgesetzt
      setSearchresult(""); // zuücksetzen der Suchergebnisse
    }
  }; // Reaktion wenn auf eines der Suchergebnisse geklickt wird
  const cancelbtn = () => {
    setShowDetailedErgebnis(false);
  }; // Reaktion auf Kreuz Btn --> ausblenden der detailierten Anzeige

  const übernehemnBtn = () => {
    if (aus.includes(detailContent[detailKey][0])) { // deatilKey entspricht dem index des geklickten Buttons (v.a. relevant bei )
      collectausstattung([
        [detailContent[detailKey][0], detailContent[detailKey][4], true], // [id, preis, true]
        [`${detailContent[detailKey][0]} ${detailContent[detailKey][1]}`, true], // [id name]
      ]); // Selektion, wenn id des gewählten Elements in ausstattung enthalten ist
    } 
    else if (lines.includes(detailContent[detailKey][0])) {
      if (detailContent[detailKey][0] == 950 || detailContent[detailKey][0] == "P59") {
        collectline([detailContent[detailKey][4], `${detailContent[detailKey][0]} ${detailContent[detailKey][1]}`]);
      } else if (detailContent[detailKey][0] == "P34" || detailContent[detailKey][0] == "P39") {
        collectlederpaket([detailContent[detailKey][4], `${detailContent[detailKey][0]} ${detailContent[detailKey][1]}`]);
      } else if (detailContent[detailKey][0] == "PSD" || detailContent[detailKey][0] == "PSE" || detailContent[detailKey][0] == "PSI" || detailContent[detailKey][0] == "PSM" || detailContent[detailKey][0] == "PSF" || detailContent[detailKey][0] == "PSJ" || detailContent[detailKey][0] == "PSN" || detailContent[detailKey][0] == "PSQ") {
        collectpaketline([detailContent[detailKey][4], `${detailContent[detailKey][0]} ${detailContent[detailKey][1]}`]);
      } else if (detailContent[detailKey][0] == "PGC" || detailContent[detailKey][0] == "PGG") {
        collectwinterpaketplus([detailContent[detailKey][4], `${detailContent[detailKey][0]} ${detailContent[detailKey][1]}`]);
      } else {
        collectzusatzpaket([[detailContent[detailKey][0], detailContent[detailKey][4], true], [`${detailContent[detailKey][0]} ${detailContent[detailKey][1]}`, true],]);
      }
    } // Selektion, wenn id des gewählten Elements in lines enthalten ist --> ÜBERARBEITEN!!!
    else if (farben.includes(detailContent[detailKey][0])) {
      collectfarben([detailContent[detailKey][4], `${detailContent[detailKey][2]} ${detailContent[detailKey][1]}`]);
    } // Selektion, wenn id des gewählten Elements in farben enthalten ist
    else if (raeder.includes(detailContent[detailKey][0])) {
      collectraeder([detailContent[detailKey][4], `${detailContent[detailKey][2]} ${detailContent[detailKey][1]}`]);
    } // Selektion, wenn id des gewählten Elements in räder enthalten ist
    else if (zierelemente.includes(detailContent[detailKey][0])) {
      collectzierelemente([detailContent[detailKey][4], `${detailContent[detailKey][2]} ${detailContent[detailKey][1]}`]);
    } // Selektion, wenn id des gewählten Elements in zierelemente enthalten ist
    else if (polster.includes(detailContent[detailKey][0])) {
      collectpolster([detailContent[detailKey][4], `${detailContent[detailKey][2]} ${detailContent[detailKey][1]}`]);
    } // Selektion, wenn id des gewählten Elements in polster enthalten ist
    else {
      console.log("nothing");
    } // Selektion, wenn id des gewählten Elements nirgendwo enthalten ist
    setShowDetailedErgebnis(false); // ausblenden der detailierten Anzeige
  };

  return (
    <div>
      <div className="searchdiv">
        <h2>
          Suchen Sie hier nach einem Ausstattungscode oder geben Sie einen
          Suchbegriff ein:
        </h2>
        <input className="searchbar" placeholder="Ausstattungscode oder Suchbegriff" value={inputSearch} onChange={inputChange}/>
        {searchresult && ( //Selektion ob searchresult existiert
          searchresult[0] ? //Selektion ob erstes Element true ist
            (detailContent.length > 1 ? //Selektion wenn das Suchergebnis multi ist
              detailContent.map((dC, index) => (
                <button className="ergebnisinput" onClick={() => showDetailErgebnis(index)} style={{ top: `${index * 56 + 114}px` }}>
                  {dC[1]}
                </button> 
              ))
            : //Selektion wenn das Suchergebnis single ist
              <button className="ergebnisinput" onClick={() => showDetailErgebnis(0)}>
                {searchresult[1]}
              </button>
            )
          : //Selektion wenn erstes Element false ist
            searchresult[1] != '' &&
              <button className="ergebnisinput" onClick={() => showDetailErgebnis(0)}>
                {searchresult[1]}
              </button> 
        )}
        <p className="ppricelist">
          Ausstattungscodes und -benennungen entnehmen Sie bitte der jeweiligen
        </p>
        <a href="https://members-int.mercedes-benz.de/portal/fa/public/homepage.html#pricelists" target="_blank" className="linkpricelist">Preisliste im Downloadcenter.</a>
      </div>
      <div className="linesside">
        {showDetailedErgebnis && ( //Anzeige der detailierten Infos
          <div className="displaydeatils">
            <div className="detailBoxSearch">
              <div className="canceldetailbtn">
                <button onClick={cancelbtn}>
                  <img className="cancelicon" src={cancel} />
                </button>
              </div>
              <h3>{detailContent[detailKey][0]} {detailContent[detailKey][1]}</h3>
              <div className="flexSearch">
                <div className="flexLeft">
                  <img className={detailContent[detailKey][5][1] == "img" ? "imgSearch" : "thumbSearch"} src={detailContent[detailKey][5][0]}/>
                </div>
                <div className="flexRight">
                  <h3 className="detailSearchRate">Mtl. Rate <b>{detailContent[detailKey][4]} EUR</b></h3>
                  <p dangerouslySetInnerHTML={{ __html: detailContent[detailKey][3] }}></p>
                  <button onClick={übernehemnBtn} className="SearchDetailBtn"> Übernehmen </button>
                  <button onClick={cancelbtn} className="SearchDetailBtn"> Verwerfen </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementSearch;