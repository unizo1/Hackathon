import React, { useState } from 'react';

const InfoSection = ({ selectedBuilding, selectedInfo, onInfoClick }) => {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const events = [
    {
      eventName: 'Hackathon 2024',
      date: 'October 15, 2024',
      location: 'GMU Campus',
      url: 'https://patriothacks.org',
    },
    {
      eventName: 'GMU vs University of Maryland',
      date: 'October 15, 2024',
      location: 'Fairfax, VA',
      url: 'https://gomason.com/sports/mens-soccer',
    },
    {
      eventName: 'Pokemon Club',
      date: 'October 16, 2024',
      location: 'Horizon Center',
      url: 'https://mason360.gmu.edu/pokemon/rsvp_boot?id=2274320',
    },
  ];

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const url = `http://127.0.0.1:5000/?input=${encodeURIComponent(input)}`;
      console.log('Sending request to:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      setAiResponse(data.response);
    } catch (error) {
      console.error('Detailed error:', error);
      setError(`Failed to get AI response: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="info-section">
      <button onClick={() => onInfoClick('Info 1')}>Map</button>
      <button onClick={() => onInfoClick('Info 2')}>Upcoming Events</button>
      <button onClick={() => onInfoClick('Info 3')}>Events for me</button>
      
      {!selectedInfo && (
        <div style={{ marginTop: '20px' }}>
          <h2>Please select a button to view information.</h2>
        </div>
      )}

      {selectedInfo === 'Info 1' && selectedBuilding ? (
        <div className="building-info">
          <h2>{selectedBuilding.name}</h2>
          <p>{selectedBuilding.description}</p>
        </div>
      ) : selectedInfo === 'Info 1' ? (
        <div>Select a building to see its information.</div>
      ) : null}

      {selectedInfo === 'Info 2' && (
        <div>
          <h2>Upcoming Events</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {events.map((event, index) => (
              <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <h3>{event.eventName}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <a href={event.url} target="_blank" rel="noopener noreferrer">Event Link</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedInfo === 'Info 3' && (
        <div>
          <h2>Enter your input:</h2>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type here..."
          />
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p className="error">{error}</p>}
          {aiResponse && (
            <div className="ai-response">
              <h3>AI Response:</h3>
              <p>{aiResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoSection;
