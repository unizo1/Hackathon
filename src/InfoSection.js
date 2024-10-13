// InfoSection.js

const InfoSection = ({ selectedBuilding, selectedInfo, onInfoClick }) => {
    return (
        <div className="info-section">
            <button onClick={() => onInfoClick('Info 1')}>Info 1</button>
            <button onClick={() => onInfoClick('Info 2')}>Info 2</button>
            <button onClick={() => onInfoClick('Info 3')}>Info 3</button>

            {selectedInfo === 'Info 1' && selectedBuilding ? (
                <div className="building-info">
                    <h2>{selectedBuilding.name}</h2>
                    {selectedBuilding.description}
                </div>
            ) : selectedInfo === 'Info 1' ? (
                <div>Select a building to see its information.</div>
            ) : null}

            {selectedInfo === 'Info 2' && (
                <div>
                    <h2>{"hello World"}</h2>
                </div>
            )}
        </div>
    );
};

export default InfoSection;
