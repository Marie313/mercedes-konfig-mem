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
    npx json-server --watch data/A_180_Limousine.json --port 8012
    npx json-server --watch data/A_200_Limousine.json --port 8011
    npx json-server --watch data/A_220_4MATIC_Limousine.json --port 8010
    npx json-server --watch data/A_250_4MATIC_Limousine.json --port 8009
    npx json-server --watch data/Mercedes-AMG_A_35_4MATIC_Limousine.json --port 8008
    npx json-server --watch data/A_180_d_Limousine.json --port 8007
    npx json-server --watch data/A_200_d_Limousine.json --port 8006
    npx json-server --watch data/A_220_d_Limousine.json --port 8005
    npx json-server --watch data/A_250_e_Limousine.json --port 8004
    npx json-server --watch data/steps250e.json --port 8003
    npx json-server --watch data/type.json --port 8002
    npx json-server --watch data/cars.json --port 8001
    npx json-server --watch data/stepsAMG.json --port 8013
    npx json-server --watch data/steps2504MATIC.json --port 8014
    npx json-server --watch data/steps2204MATIC.json --port 8015
    npx json-server --watch data/steps250e.json --port 8016
    npx json-server --watch data/steps220d.json --port 8017
    npx json-server --watch data/steps200d.json --port 8018
    npx json-server --watch data/steps200.json --port 8019
    npx json-server --watch data/steps180.json --port 8020
    npx json-server --watch data/steps180d.json --port 8021
    */
