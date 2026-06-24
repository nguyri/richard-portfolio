import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ClimbingMap.css'; 
import L from 'leaflet';

// Custom Pin Icons - Configured to use pure CSS classes
const defaultDot = L.divIcon({
  className: 'climbing-pin default',
  html: '<div></div>',
  iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -10]
});

const hoverDot = L.divIcon({
  className: 'climbing-pin hover',
  html: '<div></div>',
  iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -12]
});

const activeDot = L.divIcon({
  className: 'climbing-pin active', // Fixed to match your CSS class setup
  html: '<div></div>',
  iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -12]
});

// Map Internal Controller (Handles automatic resizing and zoom animation)
function MapController({ activeCrag, cragData }) {
  const map = useMap(); 

  // Fixes layout rendering quirks instantly on load
  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [map]);

  // Performs the smooth camera glide when activeCrag updates OR resets
  useEffect(() => {
    if (activeCrag) {
      // Zoom into the selected crag
      const selectedCrag = cragData.find(c => c.id === activeCrag);
      if (selectedCrag) {
        map.flyTo([selectedCrag.lat, selectedCrag.lng], 13, { duration: 1.5 });
      }
    } else {
      // --- THE RESET FIX ---
      // Removed the "if (!activeCrag) return" blocker. 
      // Now, when activeCrag resets to null, the camera glides back to safety.
      map.flyTo([51.0447, -115.2000], 10, { duration: 1.5 });
    }
  }, [activeCrag, cragData, map]);

  return null;
}

export default function ClimbingMap({ cragData, activeCrag, setActiveCrag, hoveredCrag, setHoveredCrag }) {
  
  // Helper function to pick the correct map pin state
  const getMarkerIcon = (cragId) => {
    if (activeCrag === cragId) return activeDot;
    if (hoveredCrag === cragId) return hoverDot;
    return defaultDot;
  };

  return (
    <MapContainer 
      center={[51.0447, -115.2000]} 
      zoom={10} 
      style={{ height: "100%", width: "100%" }}
    >
      <MapController activeCrag={activeCrag} cragData={cragData} />

      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a>'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
      />
      
      {cragData.map((crag) => (
        <Marker 
          key={crag.id} 
          position={[crag.lat, crag.lng]}
          icon={getMarkerIcon(crag.id)}
          eventHandlers={{ 
            // Updated to use the toggle logic so pins can deselect themselves too!
            click: () => setActiveCrag(activeCrag === crag.id ? null : crag.id),
            mouseover: () => setHoveredCrag(crag.id),
            mouseout: () => setHoveredCrag(null)
          }}
        >
          <Popup>
            <strong>{crag.name}</strong><br />
            Approach: {crag.approach} mins
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}