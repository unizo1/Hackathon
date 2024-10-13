// Map.js

import React, { useState } from 'react';
import buildings from './buildings'; // Import the buildings data
import MapComponent from './MapComponent'; // Import your new map component
import InfoSection from './InfoSection'; // Import the info section component

import './map.css';

const Map = () => {
    // GMU coordinates
    const position = [38.830915043700806, -77.30686332757305];

    // State to manage the selected building
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    // State to manage info section
    const [selectedInfo, setSelectedInfo] = useState('');

    // Function to set selected info and clear selected building
    const handleInfoClick = (info) => {
        setSelectedInfo(info); // Set the selected info when a link is clicked
        setSelectedBuilding(null); // Clear the selected building
    };

    return (
        <div className="map-container">
            <MapComponent 
                position={position} 
                buildings={buildings} // Pass buildings as a prop
                setSelectedBuilding={setSelectedBuilding} // Pass setter function
            />
            <InfoSection 
                selectedBuilding={selectedBuilding} 
                selectedInfo={selectedInfo} 
                onInfoClick={handleInfoClick} // Pass callback for info button clicks
            />
        </div>
    );
};

export default Map;
