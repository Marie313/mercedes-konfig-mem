import { useEffect, useState } from "react";

const CarList = ({selectedModell}) => {
  const [car, setCar] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/cars")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCar(data);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const carData = [];
        for (let i = 0; i < 25; i++) {
          const response = await fetch(`http://localhost:8001/${i}`);
          const data = await response.json();
          carData.push(data);
        }
        setCar(carData);
    };
  
    fetchData();
  }, []);

  const showReturn = (carsMietModelle, carsKaufModelle, carspic, carsClass) => {
      if (selectedModell==="mietmodell"){
      	if (carsMietModelle === true) return (
          <div className="showReturn">
            <img src={carspic} className="carsPic" />
            <div className="carClassDiv">
              <p className="carClass">{carsClass}</p>
            </div>
          </div>
        );
        if (carsMietModelle === false) return (
          <div className="showReturnFalse">
            <img src={carspic} className="carsPic" />
            <div className="carClassDiv">
              <p className="carClass">{carsClass}</p>
            </div>
          </div>
        );
      }
      if (selectedModell==="kaufmodell"){
      	if (carsKaufModelle === true) return (
          <div className="showReturn">
            <img src={carspic} className="carsPic" />
            <div className="carClassDiv">
              <p className="carClass">{carsClass}</p>
            </div>
          </div>
        );
        if (carsKaufModelle === false) return (
        <div className="showReturnFalse">
          <img src={carspic} className="carsPic" />
          <div className="carClassDiv">
            <p className="carClass">{carsClass}</p>
          </div>
        </div>
        );
      }
  };
  

  return (
    <div className="returnALL">
      <div className="cars-map">
        {car.map((cars) => (
          <div className="cars-prview" key={cars.id}>
            {showReturn(cars.mietmodell, cars.kaufmodell , cars.pic, cars.class)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
