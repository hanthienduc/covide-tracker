import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  selectMapCountries,
  selectMapCenter,
  selectMapZoom,
} from "../features/mapSlice";
import { useSelector } from "react-redux";
import { selectCasesType } from "../features/countrySlice";
import { showDataOnMap } from "../util";

function Map() {
  const mapCenter = useSelector(selectMapCenter);
  const mapZoom = useSelector(selectMapZoom);
  const mapCountries = useSelector(selectMapCountries);
  const casesType = useSelector(selectCasesType);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      {mapCenter && (
        <MapContainer id="mapid" center={mapCenter} zoom={mapZoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <Marker position={mapCenter}>
            {/* <Popup>
             
            </Popup> */}
          </Marker>
          {/* Loop through countries and draw circles */}
          {mapCountries && showDataOnMap(mapCountries, casesType)}
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
