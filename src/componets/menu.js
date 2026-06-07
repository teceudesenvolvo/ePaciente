import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FaHome, FaCalendarCheck, FaIdCard, FaBus, FaUserCircle } from 'react-icons/fa';

const Menu = () => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't show mobile menu on desktop, auth screens or non-citizen panels
  if (
    !isMobile ||
    currentPath === '/' ||
    currentPath.includes('/login') || 
    currentPath.includes('/register') || // Register pages
    currentPath.includes('/ubs/') ||
    currentPath.includes('/gestao/') ||
    currentPath.includes('/executivo/')
  ) {
    return null;
  }

  const navItems = [
    { path: '/inicio', icon: <FaHome />, label: 'Início' },
    { path: '/consultas', icon: <FaCalendarCheck />, label: 'Consultas' },
    { path: '/exames', icon: <FaIdCard />, label: 'Exames' },
    { path: '/transporte', icon: <FaBus />, label: 'Transporte' },
    { path: '/perfil', icon: <FaUserCircle />, label: 'Perfil' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: 'var(--nav-height-mobile)',
      backgroundColor: 'var(--color-white)',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 900,
      paddingBottom: 'var(--safe-bottom)',
    }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        return (
          <button
            key={item.path}
            onClick={() => history.push(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              height: '100%',
              flex: 1,
              gap: '4px',
              color: isActive ? 'var(--color-primary-dark)' : 'var(--color-n400)',
              position: 'relative',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                width: '40%',
                height: '3px',
                background: 'var(--gradient-primary)',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
              }} />
            )}
            <div style={{ 
              fontSize: '22px', 
              transition: 'transform 0.2s',
              transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)'
            }}>
              {item.icon}
            </div>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: isActive ? '600' : '500',
              transition: 'color 0.2s'
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Menu;