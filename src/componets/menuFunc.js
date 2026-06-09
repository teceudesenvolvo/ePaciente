import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  MdLogout,
  MdOutlineAnalytics,
  MdOutlineAssignment,
  MdOutlineBloodtype,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineEvStation,
  MdOutlineGroups,
  MdOutlineHomeWork,
  MdOutlineLocalPharmacy,
  MdOutlineMedicalServices,
  MdOutlineNotificationsActive,
  MdOutlinePersonAddAlt,
  MdOutlinePersonSearch,
  MdOutlinePinDrop,
  MdOutlineSick,
  MdOutlineScreenshotMonitor,
  MdOutlineSummarize,
  MdOutlineBuild,
  MdOutlineWarehouse,
  MdMenu,
  MdClose,
  MdOutlineVideoCall,
} from 'react-icons/md';

const menuSections = [
  {
    title: 'Médico',
    items: [
      { path: '/funcionarios/medicos/consultas', icon: <MdOutlineMedicalServices />, label: 'Consultas' },
      { path: '/funcionarios/medicos/online', icon: <MdOutlineVideoCall />, label: 'Online' },
      { path: '/funcionarios/medicos/receitas', icon: <MdOutlineSummarize />, label: 'Receitas' },
      { path: '/funcionarios/medicos/exames', icon: <MdOutlineBloodtype />, label: 'Exames' },
      { path: '/funcionarios/medicos/encaminhamentos', icon: <MdOutlineAssignment />, label: 'Encaminhamentos' },
    ],
  },
  {
    title: 'Farmácia',
    items: [
      { path: '/funcionarios/farmacia/estoque', icon: <MdOutlineWarehouse />, label: 'Estoque' },
      { path: '/funcionarios/farmacia/medicamentos', icon: <MdOutlineLocalPharmacy />, label: 'Medicamentos' },
      { path: '/funcionarios/farmacia/solicitacoes', icon: <MdOutlineNotificationsActive />, label: 'Solicitações' },
    ],
  },
  {
    title: 'Recepção',
    items: [
      { path: '/funcionarios/recepcao/pacientes', icon: <MdOutlinePersonAddAlt />, label: 'Pacientes' },
      { path: '/funcionarios/recepcao/agendamentos', icon: <MdOutlineCalendarMonth />, label: 'Agendamentos' },
      { path: '/funcionarios/recepcao/exames', icon: <MdOutlineBloodtype />, label: 'Exames' },
      { path: '/funcionarios/recepcao/fila', icon: <MdOutlineGroups />, label: 'Fila' },
      { path: '/funcionarios/recepcao/painel', icon: <MdOutlineScreenshotMonitor />, label: 'Painel TV' },
    ],
  },
  {
    title: 'Enfermagem',
    items: [
      { path: '/funcionarios/enfermeiros/triagem', icon: <MdOutlineSick />, label: 'Triagem' },
      { path: '/funcionarios/enfermeiros/procedimentos', icon: <MdOutlineMedicalServices />, label: 'Procedimentos' },
      { path: '/funcionarios/enfermeiros/acompanhamentos', icon: <MdOutlineAnalytics />, label: 'Acompanhamentos' },
    ],
  },
  {
    title: 'Dentistas',
    items: [
      { path: '/funcionarios/dentistas/consultas', icon: <MdOutlineMedicalServices />, label: 'Consultas' },
      { path: '/funcionarios/dentistas/receitas', icon: <MdOutlineSummarize />, label: 'Receitas' },
      { path: '/funcionarios/dentistas/exames', icon: <MdOutlineBloodtype />, label: 'Exames' },
      { path: '/funcionarios/dentistas/encaminhamentos', icon: <MdOutlineAssignment />, label: 'Encaminhamentos' },
    ],
  },
  {
    title: 'ACS',
    items: [
      { path: '/funcionarios/acs/residencias', icon: <MdOutlineHomeWork />, label: 'Residências' },
      { path: '/funcionarios/acs/visitas', icon: <MdOutlinePersonSearch />, label: 'Visitas' },
      { path: '/funcionarios/acs/alertas', icon: <MdOutlineNotificationsActive />, label: 'Alertas' },
    ],
  },
  {
    title: 'Frotas',
    items: [
      { path: '/funcionarios/frotas', icon: <MdOutlineDirectionsCar />, label: 'Transportes' },
      { path: '/funcionarios/frotas/combustiveis', icon: <MdOutlineEvStation />, label: 'Combustíveis' },
      { path: '/funcionarios/frotas/manutencao', icon: <MdOutlineBuild />, label: 'Manutenção' },
      { path: '/funcionarios/frotas/rastreio', icon: <MdOutlinePinDrop />, label: 'Rastreio' },
    ],
  },
];

const MenuFunc = () => {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!currentPath.includes('/funcionarios/')) return null;

  const handleNavigate = (path) => {
    history.push(path);
    setIsOpen(false);
  };

  if (!isDesktop) {
    return (
      <>
        <button
          aria-label="Abrir menu"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '14px',
            left: '14px',
            width: 44,
            height: 44,
            border: 'none',
            borderRadius: 12,
            background: 'var(--gradient-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            zIndex: 1200,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          }}
        >
          <MdMenu />
        </button>

        {isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1300 }}>
            <button aria-label="Fechar menu" onClick={() => setIsOpen(false)} style={{ position: 'absolute', inset: 0, border: 0, background: 'rgba(0,0,0,0.38)' }} />
            <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 304, maxWidth: '88vw', background: 'var(--gradient-primary)', padding: '22px 14px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '20px 0 45px rgba(0,0,0,0.24)' }}>
              <div className="ep-flex ep-items-center ep-justify-between ep-mb-3">
                <div className="ep-flex ep-items-center ep-gap-3">
                  <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white', fontWeight: 'bold' }}>F</div>
                  <div className="ep-flex-col">
                    <span className="ep-text-sm ep-fw-bold" style={{ color: 'white' }}>Funcionários</span>
                    <span className="ep-text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>São Luís do Curu</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ width: 36, height: 36, border: 0, borderRadius: 10, background: 'rgba(255,255,255,0.14)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  <MdClose />
                </button>
              </div>

              <div className="ep-flex-col ep-gap-3" style={{ overflowY: 'auto', paddingBottom: 18 }}>
                {menuSections.map((section) => (
                  <div key={section.title} className="ep-flex-col ep-gap-2">
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px' }}>{section.title}</span>
                    {section.items.map((item) => {
                      const isActive = currentPath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigate(item.path)}
                          className="ep-flex ep-items-center ep-gap-3"
                          style={{
                            width: '100%',
                            border: 'none',
                            background: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                            color: 'white',
                            cursor: 'pointer',
                            borderRadius: 10,
                            padding: '12px 14px',
                            textAlign: 'left',
                          }}
                        >
                          <span style={{ fontSize: 22, display: 'flex' }}>{item.icon}</span>
                          <span style={{ fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        )}
      </>
    );
  }

  return (
    <nav className="menuDesktop ep-animate-fade-in" style={{ background: 'var(--gradient-primary)', borderRight: '1px solid rgba(255,255,255,0.16)' }}>
      <div className="ep-sidebar-logo" onClick={() => history.push('/')} style={{ cursor: 'pointer', marginBottom: '40px', display: 'flex' }}>
        <img
          src="https://intgest-executivo.s3.amazonaws.com/media/intgest_executivo/public/entidade/logotipo/sao_luis_do_curu1.png.600x600_q85_box-0%2C0%2C108%2C108_crop_detail.png"
          alt="Logo Município"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="ep-sidebar-profile" style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '12px', padding: '12px 0', marginBottom: '32px', display: 'flex', gap: '12px' }}>
        <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white', fontWeight: 'bold' }}>
          F
        </div>
        <div className="ep-sidebar-profile-info ep-flex-col">
          <span className="ep-text-sm ep-fw-bold" style={{ color: 'white', lineHeight: '1.2' }}>Funcionários</span>
          <span className="ep-text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>São Luís do Curu</span>
        </div>
      </div>

      <div className="ep-flex-col ep-gap-2 ep-w-full ep-flex-1" style={{ overflowY: 'auto', overflowX: 'hidden', paddingBottom: '12px' }}>
        {menuSections.map((section) => (
          <div key={section.title} className="ep-flex-col ep-gap-2" style={{ marginBottom: '10px' }}>
            <span className="ep-sidebar-group-title ep-px-3" style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '2px',
            }}>
              {section.title}
            </span>

            {section.items.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => history.push(item.path)}
                  className={`ep-sidebar-item ${isActive ? 'ep-sidebar-item--active' : ''}`}
                  style={{
                    border: 'none',
                    background: isActive ? 'var(--color-primary)' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    padding: '10px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="ep-sidebar-icon" style={{ color: 'white', fontSize: '20px', display: 'flex' }}>
                    {item.icon}
                  </span>
                  <span className="nav-item" style={{ fontWeight: isActive ? '600' : '400', color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <button
        className="ep-sidebar-item ep-mt-auto"
        onClick={() => history.push('/login')}
        style={{
          border: 'none',
          background: 'rgba(255,255,255,0.05)',
          cursor: 'pointer',
          padding: '12px 0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <MdLogout style={{ fontSize: '20px', color: '#ff4d6d' }} />
        <span className="nav-item" style={{ color: 'white' }}>Sair</span>
      </button>
    </nav>
  );
};

export default MenuFunc;
