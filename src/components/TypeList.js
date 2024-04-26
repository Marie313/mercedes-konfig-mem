import { useState, useEffect} from "react";

const TypeList = ({selectedModell}) => {
    const [type, setType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const typeData = [];
            for (let i = 0; i < 7; i++) {
            const response = await fetch(`http://localhost:8002/${i}`);
            const data = await response.json();
            typeData.push(data);
            }
            setType(typeData);
        };
    
        fetchData();
    }, []);

    const showReturn = (typesMietmodell, typesKaufmodell, typespic, typesName) => {
          if (selectedModell === "mietmodell")  {
            if (typesMietmodell === true) return (
                <div className="showReturn">
                    <img src={typespic} className="carsPic" />
                    <div className="carClassDiv">
                        <p className="carClass">{typesName}</p>
                        <button className="moreButton">v</button>
                    </div>
                </div>
            );
            return (
            <div className="showReturnFalse">
                <img src={typespic} className="carsPic" />
                <div className="carClassDiv">
                    <p className="carClass">{typesName}</p>
                    <button className="moreButton">v</button>
                </div>
            </div>
            );
          }
          if (selectedModell === "kaufmodell")  {
            if (typesKaufmodell === true) return (
                <div className="showReturn">
                    <img src={typespic} className="carsPic" />
                    <div className="carClassDiv">
                        <p className="carClass">{typesName}</p>
                        <button className="moreButton">v</button>
                    </div>
                </div>
            );
            return (
            <div className="showReturnFalse">
                <img src={typespic} className="carsPic" />
                <div className="carClassDiv">
                    <p className="carClass">{typesName}</p>
                    <button className="moreButton">v</button>
                </div>
            </div>
            );
          }
    };

    return (
        <div className="returnALL">
        <div className="cars-map">
            {type.map((types) => (
            <div className="cars-prview" key={types.id}>
                <button>
                {showReturn(types.mietmodell, types.kaufmodell, types.pic_t, types.name)}
                </button>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default TypeList;
