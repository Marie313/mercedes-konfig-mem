/*"selectedEquipments": [
        "P*311",
        "873",
        "310",
        "58U",
        "88B",
        "U10",
        "942",
        "72B",
        "B53",
        "218",
        "475",
        "70B",
        "294",
        "20U",
        "B59",
        "345",
        "426",
        "362",
        "859",
        "458",
        "79B",
        "355",
        "537",
        "38U",
        "351",
        "B30",
        "9B2",
        "82B",
        "R01",
        "B51",
        "485",
        "PAV",
        "PBG",
        "PSE",
        "P59",
        "52H",
        "25R"
    ],*/

    {frcategory == 'Felgen' ? <input checked={selectedFelge == frcode} onChange={() => changeSelectedFelge(frcode)} className="farbenCheck" type="checkbox"/> : <input checked={selectedFarbe == frcode} onChange={() => changeSelectedFarbe(frcode)} className="farbenCheck" type="checkbox"/>}

    /*
    npm run start
    node src/expressApp.js
    */

    /* 
    App.js
        Toolbar.js
            CarList3.js
            TypeList.js
                SpecificCar.js
                    SpPic.js
                    SpNav.js
                        SpMenu.js
                        SpMotorisierung.js
                            MotorisierungInfos.js
                        SpLinesPakete.js
                            Mietumfang.js
                        SpFarbenRaeder.js
                            Mietumfang.js
                        SpPolsterZierelemente.js
                            Mietumfang.js
                        SpAusstattung.js
                            ElementSearch.js
                            Mietumfang.js
                        SpMeinMercedes.js
                            SummarySerie.js
                            SummarySonder.js
                            SummaryKonditionen.js
                            SummaryLeistungsdaten.js
                            SummaryReifenlabel.js
                            SummaryVerbrauchsdaten.js
                            ElementSearch.js
                            EmailSummary.js
                            Mietumfang.js
    */

    /*
    {
        "A_180_Limousine": [],
        "A_200_Limousine": [],
        "A_220_4MATIC_Limousine": [],
        "A_250_4MATIC_Limousine": [],
        "Mercedes-AMG_A_35_4MATIC_Limousine": [],
        "A_180_d_Limousine": [],
        "A_200_d_Limousine": [],
        "A_220_d_Limousine": [],
        "A_250_e_Limousine": [],
        "step250e": [],
        "type": [],
        "cars": [],
        "stepsAMG": [],
        "steps2504MATIC": [],
        "steps2204MATIC": [],
        "steps250e": [],
        "steps220d": [],
        "steps200d": [],
        "steps200": [],
        "steps180": [],
        "steps180d": []
    }
    */

    /*
        {
            "/A_180_Limousine": "/A_180_Limousine",
            "/A_200_Limousine": "/A_200_Limousine",
            "/A_220_4MATIC_Limousine": "/A_220_4MATIC_Limousine",
            "/A_250_4MATIC_Limousine": "/A_250_4MATIC_Limousine",
            "/Mercedes-AMG_A_35_4MATIC_Limousine": "/Mercedes-AMG_A_35_4MATIC_Limousine",
            "/A_180_d_Limousine": "/A_180_d_Limousine",
            "/A_200_d_Limousine": "/A_200_d_Limousine",
            "/A_220_d_Limousine": "/A_220_d_Limousine",
            "/A_250_e_Limousine": "/A_250_e_Limousine",
            "/step250e": "/steps250e",
            "/type": "/type",
            "/cars": "/cars",
            "/stepsAMG": "/stepsAMG",
            "/steps2504MATIC": "/steps2504MATIC",
            "/steps2204MATIC": "/steps2204MATIC",
            "/steps250e": "/steps250e",
            "/steps220d": "/steps220d",
            "/steps200d": "/steps200d",
            "/steps200": "/steps200",
            "/steps180": "/steps180",
            "/steps180d": "/steps180d"
        }
    */

collectzusatzpaket(selectedZusatzPaket.includes(lpcode) ? -lpprice : lpprice);
        collectnamezusatzpaket(!selectedZusatzPaket.includes(lpcode) && `${lpcode} ${lpname}`);


        <div>
                    <div className="stepsheadline">
                        <b>{stepstitle}</b>
                    </div>
                    {linename && <div className="summaryMotor">
                        <h2>{linename}</h2>
                        <div>
                            <button className="pencil" onClick={() => showLine()}><FaPencilAlt /></button>
                            <button className="garbage" onClick={() => showLine()}><BsFillTrashFill /></button>
                        </div>
                    </div>}
                    {paketlinename && <div className="summaryMotor">
                        <h2>{paketlinename}</h2>
                        <div>
                            <button className="pencil" onClick={() => showLine()}><FaPencilAlt /></button>
                            <button className="garbage" onClick={() => showLine()}><BsFillTrashFill /></button>
                        </div>
                    </div>}
                    {winterPaketplusname && <div className="summaryMotor">
                        <h2>{winterPaketplusname}</h2>
                        <div>
                            <button className="pencil" onClick={() => showLine()}><FaPencilAlt /></button>
                            <button className="garbage" onClick={() => showLine()}><BsFillTrashFill /></button>
                        </div>
                    </div>}
                    {lederPaketname && <div className="summaryMotor">
                        <h2>{lederPaketname}</h2>
                        <div>
                            <button className="pencil" onClick={() => showLine()}><FaPencilAlt /></button>
                            <button className="garbage" onClick={() => showLine()}><BsFillTrashFill /></button>
                        </div>
                    </div>}
                    {zusatzPaketname && zusatzPaketname.map((zpname)=>(
                        <div className="summaryMotor">
                            <h2>{zpname}</h2>
                            <div>
                                <button className="pencil" onClick={() => showLine()}><FaPencilAlt /></button>
                                <button className="garbage" onClick={() => showLine()}><BsFillTrashFill /></button>
                            </div>
                        </div>
                    ))}
                </div>