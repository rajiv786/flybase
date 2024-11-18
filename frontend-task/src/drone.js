import React, { useState } from 'react';
import MapComponent from './MapComponent';

function DroneSimulation() {
    const [coordinates, setCoordinates] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [intervalTime, setIntervalTime] = useState(1000); // Default interval time in ms

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCoordinates = JSON.parse(formData.get('coordinates'));
        setCoordinates(newCoordinates);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            const parsedCoordinates = JSON.parse(text);
            setCoordinates(parsedCoordinates);
        };
        reader.readAsText(file);
    };

    const handleSimulate = () => setIsSimulating(true);
    const handlePause = () => setIsSimulating(false);
    const handleResume = () => setIsSimulating(true);

    const handleSpeedChange = (e) => {
        setIntervalTime(Number(e.target.value));
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    name="coordinates"
                    placeholder='Enter coordinates as JSON (e.g. [{"lat": 37.7749, "lng": -122.4194}, ...])'
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <input type="file" onChange={handleFileUpload} accept=".json" />

            <div>
                <button onClick={handleSimulate}>Simulate</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleResume}>Resume</button>
            </div>

            <label>Interval (ms): </label>
            <input
                type="number"
                value={intervalTime}
                onChange={handleSpeedChange}
                min="500"
                step="100"
            />

            <MapComponent
                coordinates={coordinates}
                isSimulating={isSimulating}
                intervalTime={intervalTime}
                onSimulationComplete={() => setIsSimulating(false)}
            />
        </div>
    );
}

export default DroneSimulation;
