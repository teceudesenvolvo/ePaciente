import React from 'react';
import { FaAmbulance } from 'react-icons/fa';

const DEFAULT_BOUNDS = {
  north: -3.62,
  south: -3.75,
  east: -39.18,
  west: -39.32,
};

const getPosition = (vehicle, bounds) => {
  const left = ((vehicle.lng - bounds.west) / (bounds.east - bounds.west)) * 100;
  const top = ((bounds.north - vehicle.lat) / (bounds.north - bounds.south)) * 100;
  return {
    left: `${Math.min(92, Math.max(8, left))}%`,
    top: `${Math.min(88, Math.max(10, top))}%`,
  };
};

const FleetMap = ({ vehicles, selectedId, onSelect, height = 320, bounds = DEFAULT_BOUNDS }) => {
  const center = vehicles.find((vehicle) => vehicle.id === selectedId) || vehicles[0];
  const bbox = `${bounds.west},${bounds.south},${bounds.east},${bounds.north}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${center.lat},${center.lng}`;

  return (
    <div style={{ height, position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#e8f3ff' }}>
      <iframe
        title="Mapa de rastreio da frota"
        src={mapUrl}
        style={{ border: 0, width: '100%', height: '100%', filter: 'saturate(0.95)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.04))', pointerEvents: 'none' }} />
      {vehicles.map((vehicle) => {
        const position = getPosition(vehicle, bounds);
        return (
          <button
            key={vehicle.id}
            onClick={() => onSelect(vehicle)}
            title={`${vehicle.id} · ${vehicle.status}`}
            style={{
              position: 'absolute',
              left: position.left,
              top: position.top,
              transform: 'translate(-50%, -50%)',
              width: 44,
              height: 44,
              border: selectedId === vehicle.id ? '3px solid white' : '2px solid rgba(255,255,255,0.82)',
              borderRadius: 12,
              background: vehicle.cor,
              color: 'white',
              boxShadow: '0 10px 24px rgba(0,0,0,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            <FaAmbulance />
          </button>
        );
      })}
    </div>
  );
};

export default FleetMap;
