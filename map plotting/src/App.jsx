import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Marker } from "react-leaflet";
import L from "leaflet";
import Map from "./components/Map";

// import startIconImage from "https://www.bing.com/th/id/OIP.IPelRMn689924nl8dX1q9wHaF7?w=238&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2";

export default function App() {
  const pickupPoint = [17.466479, 78.425419];
  const dropPoint = [17.42212, 78.455212];
  const [intervalTime, setIntervalTime] = useState(1000);

  const showManual = false;

  const url = `https://maptracer.onrender.com/route`;

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [position, setPosition] = useState(pickupPoint);
  const [angle, setAngle] = useState(0);
  const indexRef = useRef(0);

  async function getCoordinates() {
    const res = await fetch(url);
    const data = await res.json();
    setRouteCoordinates(data);
  }

  useEffect(() => {
    getCoordinates();
  }, []);

  const carIcon = new L.Icon({
    iconUrl: "http://localhost:5173/src/assets/images/car.png?t=1751688541985",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    className: "car-icon",
  });

  function getAngle(start, end) {
    const dy = end[0] - start[0];
    const dx = end[1] - start[1];
    const theta = Math.atan2(dy, dx);
    return (theta * 180) / Math.PI;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < routeCoordinates.length - 1) {
        const nextIndex = indexRef.current + 1;
        const current = routeCoordinates[indexRef.current];
        const next = routeCoordinates[nextIndex];
        setPosition(next);
        setAngle(getAngle(current, next));
        indexRef.current = nextIndex;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [routeCoordinates]);

  function car() {
    return (
      <>
        <Marker
          position={position}
          icon={carIcon}
          rotationAngle={angle}
          rotationOrigin="center"
        ></Marker>
      </>
    );
  }
  useMemo(() => {
    car();
  }, [angle]);

  const Route = () => {
    return <></>;
  };

  return (
    <>
      <form>
        {/* <div className="inputs-fields">
          <div className="fields">
            <label>Pick-Up Point Latitude</label>
            <input />
          </div>
          <div className="fields">
            <label>Pick-Up Point Longitude</label>
            <input />
          </div>
          <div className="fields">
            <label>Drop Point Latitude</label>
            <input />
          </div>
          <div className="fields">
            <label>Drop Point Longitude</label>
            <input />
          </div>
        </div> */}

        <div className="dash">
          <div>
            <strong>Starting Point: </strong>
            <span className="corr">{pickupPoint}:</span> Moosapet, Hyderabad.
          </div>
          <div>
            <strong>End Point: </strong>{" "}
            <span className="corr">{dropPoint}:</span> Nampalli, Hyderabad
          </div>
        </div>

        <div className="btn-container">
          {/* <button className="main-btn" type="button"onClick={() => {
            setIntervalTime()
          }}>Start</button>
          <button className="main-btn" type="button">Stop</button> */}
          <button className="main-btn">Reset</button>
        </div>
      </form>
      <Map car={car} position={position}/>
      <Route />
    </>
  );
}
