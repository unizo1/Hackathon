// MapComponent.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ position, buildings, setSelectedBuilding }) => {
    const customIcon = new Icon({
        iconUrl: '/food-marker.png', // Path to your image in the public folder
        iconSize: [40, 41], // Width and height of the icon in pixels
    });

    const bounds = [
        [38.82435079380124, -77.32786355949808], // Southwest corner (latitude, longitude)
        [38.835757227355224, -77.29701586708764], // Northeast corner (latitude, longitude)
    ];

    const boundCoordinates = [
        bounds[0], // Southwest
        [bounds[0][0], bounds[1][1]], // Southeast
        bounds[1], // Northeast
        [bounds[1][0], bounds[0][1]], // Northwest
        bounds[0], // Back to Southwest
    ];

    const polylineStyle = {
        color: 'red',
        weight: 2,
        dashArray: '5, 5', // Dotted line
    };

    return (
        <MapContainer 
            center={position} 
            zoom={17} 
            minZoom={16} 
            maxZoom={18}
            scrollWheelZoom={true} 
            className="leaflet-container"
            bounds={bounds} // Set the bounds here
            maxBounds={bounds} // Prevents panning outside the bounds
            maxBoundsVisibile={true} // Optional: Shows a visual indication of the bounds
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Draw polyline */}
            <Polyline positions={boundCoordinates} pathOptions={polylineStyle} />

            {/* Place markers on the map */}
            {buildings.map((building, index) => (
                <Marker 
                    key={index} 
                    position={building.position} 
                    icon={customIcon} 
                    eventHandlers={{
                        click: () => {
                            setSelectedBuilding(building); // Set the selected building on marker click
                        },
                    }}
                >
                    <Popup>
                        <h2>{building.name}</h2>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
