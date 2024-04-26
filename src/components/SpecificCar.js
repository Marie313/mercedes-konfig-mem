import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";

const SpecificCar = () => {
    const [specific, setSpecific] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
        const specificData = [];
        const response = await fetch("http://localhost:8001/" + (id-1) )
        const data = await response.json();
        console.log(data);
        specificData.push(data)
        setSpecific(specificData);
        }
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