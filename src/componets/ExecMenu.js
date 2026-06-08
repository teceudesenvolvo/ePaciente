import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FaBell, FaChartLine, FaCity, FaClipboardList, FaCommentDots, FaMapMarkedAlt, FaSearchDollar, FaUserCircle } from 'react-icons/fa';

const ExecMenu = () => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide if not mobile or not an Executivo route
  if (!isMobile || !currentPath.includes('/executivo/')) return null;

  const navItems = [
    { path: '/executivo/dashboard', icon: <FaCity />, label: 'Dashboard' },
    { path: '/executivo/ouvidoria', icon: <FaCommentDots />, label: 'Ouvidoria' },
    { path: '/executivo/mapa', icon: <FaMapMarkedAlt />, label: 'Mapa Saúde' },
    { path: '/executivo/transparencia', icon: <FaSearchDollar />, label: 'Transparência' },
    { path: '/executivo/alertas', icon: <FaBell />, label: 'Alertas' },
    { path: '/executivo/planos', icon: <FaClipboardList />, label: 'Planos' },
    { path: '/executivo/analises', icon: <FaChartLine />, label: 'Análises' },
    { path: '/executivo/perfil', icon: <FaUserCircle />, label: 'Perfil' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0, // Position at the bottom
      width: '100%',
      height: 'var(--nav-height-mobile)',
      backgroundColor: 'var(--color-n900)',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 900,
      paddingBottom: 'var(--safe-bottom)',
      overflowX: 'auto',
    }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => history.push(item.path)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', height: '100%', flex: '0 0 76px', gap: '4px',
              color: isActive ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent', position: 'relative'
            }}
          >
            {isActive && (
              <div style={{ position: 'absolute', top: 0, width: '40%', height: '3px', background: 'var(--color-primary-light)' }} />
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

export default ExecMenu;
