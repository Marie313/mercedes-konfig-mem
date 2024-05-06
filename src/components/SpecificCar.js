import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";

const SpecificCar = () => {
    const [specific, setSpecific] = useState([]);

    const { classe } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          const carData = [];
          for (let i = 0; i < 41; i++) {
            const response = await fetch(`http://localhost:8001/${i}`);
            const data = await response.json();
            if (data.class === classe) {
                carData.push(data);
              }
          }
          setSpecific(carData);
        };
    
        fetchData();
    }, []);

    return ( 
        <div className="specific-preview">
            {specific.map((specifics) => (
                <h2 className="headlineSpecific">{specifics.class}</h2>
            ))}
        </div>
    );
}
 
export default SpecificCar;