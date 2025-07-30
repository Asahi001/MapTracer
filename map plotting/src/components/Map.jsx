import React, { useState, useEffect, memo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
const Map = ({ car, position}) => {
  const pickupPoint = [17.466479, 78.425419];
  const dropPoint = [17.42212, 78.455212];
  const url = `https://maptracer.onrender.com/route`;
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // delete L.Icon.Default.prototype._getIconUrl;

  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl: markerIcon2x,
  //   iconUrl: markerIcon,
  //   shadowUrl: markerShadow,
  // });

  async function getCoordinates() {
    const res = await fetch(url);
    const data = await res.json();
    setRouteCoordinates(data);
  }

  useEffect(() => {
    getCoordinates();
  }, []);

  return (
    <MapContainer center={position} zoom={18} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={routeCoordinates} color="black" />
      <Marker position={pickupPoint}>
        <Popup>Starting Point</Popup>
      </Marker>
      {car()}
      <Marker position={dropPoint}>
        <Popup>End Point</Popup>
      </Marker>
    </MapContainer>
  );
};
  
export default memo(Map);
