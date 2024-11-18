import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '80vh' };
const defaultCenter = { lat: 0, lng: 0 };

function MapComponent({ coordinates, isSimulating, intervalTime, onSimulationComplete }) {
    const [dronePosition, setDronePosition] = useState(defaultCenter);
    const [path, setPath] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let interval;
        if (isSimulating && index < coordinates.length) {
            interval = setInterval(() => {
                const newPosition = coordinates[index];
                setDronePosition(newPosition);
                setPath((prevPath) => [...prevPath, newPosition]);
                setIndex(index + 1);
            }, intervalTime);
        } else if (index >= coordinates.length) {
            onSimulationComplete();
        }
        return () => clearInterval(interval);
    }, [isSimulating, index, coordinates, intervalTime, onSimulationComplete]);

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={2}
                center={defaultCenter}
            >
                <Marker position={dronePosition} />
                <Polyline
                    path={path}
                    options={{ strokeColor: '#FF0000', strokeWeight: 2 }}
                />
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;
