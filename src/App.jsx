import { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [scpList, setScpList] = useState([]);
  const [selectedSCP, setSelectedSCP] = useState(null);

  useEffect(() => {
    fetch("/SCPData.json")
      .then((res) => res.json())
      .then((data) => setScpList(data));
  }, []);

  const handleSelect = (index) => {
    setSelectedSCP(index);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedSCP(null);
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2 className="logo">SCP NAV</h2>
        <ul className="nav-list">
          {scpList.map((scp, index) => (
            <li key={index} onClick={() => handleSelect(index)}>
              {scp.model}
            </li>
          ))}
        </ul>
      </nav>

      <div className="main-content">
        {selectedSCP === null ? (
          <div className="welcome">
            <h1>Welcome to the SCP Archive</h1>
            <p>Select a file from the navigation panel to view its containment information.</p>
          </div>
        ) : (
          <div className="scp-detail">
            <button onClick={handleBack}>⬅ Back</button>
            {scpList[selectedSCP].image && (
              <img
                src={scpList[selectedSCP].image}
                alt={scpList[selectedSCP].model}
                className="scp-detail-image"
              />
            )}
            <h2>{scpList[selectedSCP].model}</h2>
            <h4>{scpList[selectedSCP].tagline}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>
              {scpList[selectedSCP].content.replace(/::/g, '\n\n')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
