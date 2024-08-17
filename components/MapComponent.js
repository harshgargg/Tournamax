import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/MapView.module.css'; // Import the CSS module
import { useEffect, useState } from 'react';

const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];


const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });


  function SetViewOnClick({ coords }) {
    const map = useMap();
  
    useEffect(() => {
      if (coords) {
        map.setView(coords, map.getZoom());
      }
    }, [coords, map]);
  
    return null;
  }
  
const MapComponent = () => {
      
    const [center, setCenter] = useState([20.5937, 78.9629]);

    const handleMarkerClick = (position) => {
        setCenter(position);
    };

  return (
    <div className={styles['map-container']}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={customIcon}>
            <div onClick={() => handleMarkerClick( marker.position )}>
                {marker.label}
            </div>
            <Popup>
            </Popup>
          </Marker>
        ))}
        <SetViewOnClick coords={center}/>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
