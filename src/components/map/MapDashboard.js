import React, { useState } from 'react';
import ClimbingMap from './ClimbingMap';
import './ClimbingMap.css';
import cragData from './ClimbingMapData';

export default function MapDashboard() {
  const [activeCrag, setActiveCrag] = useState(null);
  const [hoveredCrag, setHoveredCrag] = useState(null); // Track mouse-overs across components

  return (
    <div className="map-dashboard">
      
      {/* MAP LAYER */}
      <div className="map-wrapper">
        <ClimbingMap 
          cragData={cragData}
          activeCrag={activeCrag}
          setActiveCrag={setActiveCrag}
          hoveredCrag={hoveredCrag}
          setHoveredCrag={setHoveredCrag}
        />
      </div>

      {/* TABLE LAYER */}
      <div className="table-container">
        <table className="map-table">
          <thead>
            <tr>
              <th>Crag</th>
              <th>Drive (:m)</th>
              <th>Approach (:m)</th>
              <th>Total (h:m)</th>
            </tr>
          </thead>
          <tbody>
            {cragData.map((crag) => (
            <tr 
                key={crag.id} 
                onClick={() => {
                // Toggle logic: if it's already active, deactivate it (set to null)
                setActiveCrag(activeCrag === crag.id ? null : crag.id);
                }}
                onMouseEnter={() => setHoveredCrag(crag.id)}
                onMouseLeave={() => setHoveredCrag(null)}
                className={`${activeCrag === crag.id ? "row-active" : ""} ${hoveredCrag === crag.id ? "row-hovered" : ""}`}
                style={{ cursor: 'pointer' }}
            >
                <td><strong>{crag.name}</strong></td>
                <td>{crag.drive}</td>
                <td>{crag.approach}</td>
                <td>{crag.total}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}