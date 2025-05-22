// components/MapSelector.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return null;
}

export default function MapSelector({ position, setPosition }) {
  return (
    <MapContainer center={[14.5995, 120.9842]} zoom={5} scrollWheelZoom={false} className="w-full h-full rounded-md">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && <Marker position={position} />}
      <LocationMarker setPosition={setPosition} />
    </MapContainer>
  );
}
