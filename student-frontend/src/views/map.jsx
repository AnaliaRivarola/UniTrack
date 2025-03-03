// map.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import L from "leaflet";
import markerIcon from "../assets/icono2.png"; // Imagen personalizada

const socket = io("http://localhost:5000"); // Reemplaza con la URL de tu backend si es diferente

// Crear icono personalizado 🚌
const busIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [27, 50], // Tamaño del ícono
  iconAnchor: [20, 40], // Punto donde toca el mapa
  popupAnchor: [0, -40] // Ajuste del popup
});

export const MapView = () => {
  const [position, setPosition] = useState({ lat: -27.333, lng: -55.866 }); // Coordenadas iniciales de Encarnación

  useEffect(() => {
    socket.on("ubicacionActualizada", (data) => {
      console.log("📍 Nueva ubicación recibida:", data);

      // Verificar si hay un cambio en la ubicación antes de actualizar
      if (data.latitud !== position.lat || data.longitud !== position.lng) {
        setPosition({ lat: data.latitud, lng: data.longitud });
      }
    });

    return () => {
      socket.off("ubicacionActualizada");
    };
  }, [position]); // Se ejecuta cuando cambia la posición

  return (
    <MapContainer center={position} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={busIcon}>
        <Popup>
          🚍 Transporte en tiempo real
        </Popup>
      </Marker>
    </MapContainer>
  );
};
