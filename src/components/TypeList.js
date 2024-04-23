import { useState, useEffect} from "react";

const TypeList = () => {
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

    const showReturn = (typesMietmodell, typespic, typesName) => {
        if (typesMietmodell === true) return (
            <div className="showReturn">
                <img src={typespic} className="carsPic" />
                <div className="carClassDiv">
                    <p className="carClass">{typesName}</p>
                </div>
            </div>
        );
        return (
        <div className="showReturnFalse">
            <img src={typespic} className="carsPic" />
            <div className="carClassDiv">
                <p className="carClass">{typesName}</p>
            </div>
        </div>
        );
    };

    return (
        <div className="returnALL">
        <div className="cars-map">
            {type.map((types) => (
            <div className="cars-prview" key={types.id}>
                {showReturn(types.mietmodell, types.pic_t, types.name)}
            </div>
            ))}
        </div>
        </div>
    );
    };

export default TypeList;
