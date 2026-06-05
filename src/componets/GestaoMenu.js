import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FaChartLine, FaStethoscope, FaBus, FaBullhorn } from 'react-icons/fa';

const GestaoMenu = () => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;

  if (!currentPath.includes('/gestao/')) return null;

  const navItems = [
    { path: '/gestao/dashboard', icon: <FaChartLine />, label: 'Dashboard' },
    { path: '/gestao/telemedicina', icon: <FaStethoscope />, label: 'Telemedicina' },
    { path: '/gestao/transportes', icon: <FaBus />, label: 'Transportes' },
    { path: '/gestao/campanhas', icon: <FaBullhorn />, label: 'Campanhas' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: 'var(--nav-height-mobile)',
      backgroundColor: 'var(--color-primary-dark)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 900,
      paddingBottom: 'var(--safe-bottom)',
    }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => history.push(item.path)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', height: '100%', flex: 1, gap: '4px',
              color: isActive ? 'var(--color-white)' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent', position: 'relative'
            }}
          >
            {isActive && (
              <div style={{ position: 'absolute', top: 0, width: '40%', height: '3px', background: 'var(--color-white)' }} />
            )}
            <div style={{ fontSize: '20px', transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)', transition: 'transform 0.2s' }}>
              {item.icon}
            </div>
            <span style={{ fontSize: '10px', fontWeight: isActive ? '600' : '500' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default GestaoMenu;
