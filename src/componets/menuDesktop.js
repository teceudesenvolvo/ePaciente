import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
    MdOutlineHome,
    MdOutlineMedicalServices,
    MdOutlineBloodtype,
    MdOutlineVaccines,
    MdOutlineFireTruck,
    MdOutlineSummarize,
    MdOutlineNotifications,
    MdLogout
} from "react-icons/md";

const MenuDesktop = () => {
    const location = useLocation();
    const history = useHistory();
    const currentPath = location.pathname;

    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
    React.useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sidebar visibility logic (Apple style: hide on mobile and auth/landing pages)
    if (
        !isDesktop ||
        currentPath === '/' || // Landing Page
        currentPath.includes('/login') || // Login pages
        currentPath.includes('/register') || // Register pages
        currentPath.includes('/ubs/') ||
        currentPath.includes('/gestao/') ||
        currentPath.includes('/executivo/')
    ) {
        return null;
    }

    const menuGroups = [
        {
            id: 'principal',
            title: 'Principal',
            items: [
                { path: '/inicio', icon: <MdOutlineHome />, label: 'Início' },
                { path: '/Notificacoes', icon: <MdOutlineNotifications />, label: 'Notificações' },
            ]
        },
        {
            id: 'saude',
            title: 'Saúde',
            items: [
                { path: '/consultas', icon: <MdOutlineMedicalServices />, label: 'Consultas' },
                { path: '/exames', icon: <MdOutlineBloodtype />, label: 'Exames' },
                { path: '/vacinas', icon: <MdOutlineVaccines />, label: 'Vacinas' },
                { path: '/receitas', icon: <MdOutlineSummarize />, label: 'Receitas' },
            ]
        },
        {
            id: 'servicos',
            title: 'Serviços',
            items: [
                { path: '/transporte', icon: <MdOutlineFireTruck />, label: 'Transporte' },
            ]
        }
    ];

    return (
        <nav className='menuDesktop ep-animate-fade-in'>
            {/* Logo Section */}
            <div className="ep-sidebar-logo" onClick={() => history.push('/inicio')} style={{ cursor: 'pointer', marginBottom: '40px', display: 'flex' }}>
                <img 
                    src="https://intgest-executivo.s3.amazonaws.com/media/intgest_executivo/public/entidade/logotipo/sao_luis_do_curu1.png.600x600_q85_box-0%2C0%2C108%2C108_crop_detail.png" 
                    alt="Logo Município" 
                    style={{ objectFit: 'contain' }} 
                />
            </div>

            {/* User Profile Section */}
            <div className="ep-sidebar-profile" 
                 onClick={() => history.push('/perfil')}
                 style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px 0', marginBottom: '24px', display: 'flex', gap: '12px' }}>
                <div className="ep-avatar ep-avatar--md" style={{ background: '#28a745', color: 'white', fontWeight: 'bold' }}>L</div>
                <div className="ep-sidebar-profile-info ep-flex-col">
                    <span className="ep-text-sm ep-fw-bold" style={{ color: 'white', lineHeight: '1.2' }}>Leonardo R.</span>
                    <span className="ep-text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Cidadão Curuense</span>
                </div>
            </div>
            
            <div className="ep-flex-col ep-gap-8 ep-w-full ep-flex-1">
                {menuGroups.map((group) => (
                    <div key={group.id} className="ep-flex-col ep-gap-2">
                        {/* Divider/Título da Seção dinâmico como no exemplo */}
                        <span className="ep-sidebar-group-title ep-px-3" style={{ 
                            fontSize: '11px', 
                            fontWeight: '600', 
                            color: 'rgba(255, 255, 255, 0.5)', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                        }}>
                            {group.title}
                        </span>

                        {group.items.map((item) => {
                            const isActive = currentPath === item.path;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => history.push(item.path)}
                                    className={`ep-sidebar-item ${isActive ? 'ep-sidebar-item--active' : ''}`}
                                    style={{ 
                                        border: 'none', 
                                        background: isActive ? '#004a8d' : 'transparent', 
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        padding: '10px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span className="ep-sidebar-icon" style={{ color: 'white', fontSize: '20px', display: 'flex' }}>
                                        {item.icon}
                                    </span>
                                    <span className='nav-item' style={{ fontWeight: isActive ? '600' : '400', color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}>
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Logout Section */}
            <button 
                className="ep-sidebar-item ep-mt-auto ep-sidebar-item--logout" 
                onClick={() => history.push('/')}
                style={{ 
                    border: 'none', 
                    background: 'rgba(255,255,255,0.05)', 
                    cursor: 'pointer',
                    padding: '12px 0',
                    borderRadius: '8px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}
            >
                <MdLogout style={{ fontSize: '20px', color: '#ff4d6d' }} />
                <span className='nav-item' style={{ color: 'white' }}>Sair</span>
            </button>
        </nav>
    );
};

export default MenuDesktop;