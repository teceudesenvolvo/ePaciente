import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FaChartBar, FaCalendarAlt, FaUserClock, FaBox } from 'react-icons/fa';

const UBSMenu = () => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;

  if (!currentPath.includes('/ubs/')) return null;

  const navItems = [
    { path: '/ubs/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/ubs/agenda', icon: <FaCalendarAlt />, label: 'Agenda' },
    { path: '/ubs/recepcao', icon: <FaUserClock />, label: 'Recepção' },
    { path: '/ubs/estoque', icon: <FaBox />, label: 'Estoque' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: 'var(--nav-height-mobile)',
      backgroundColor: 'var(--color-n800)',
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
              color: isActive ? 'var(--color-white)' : 'var(--color-n400)',
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent', position: 'relative'
            }}
          >
            {isActive && (
              <div style={{ position: 'absolute', top: 0, width: '40%', height: '3px', background: 'var(--color-primary)' }} />
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

export default UBSMenu;
