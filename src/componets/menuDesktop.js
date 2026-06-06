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
import logo from '../assets/e-paciente-color-txt-15.png'; // Importe o logo

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
            <div className="ep-sidebar-logo" onClick={() => history.push('/inicio')} style={{ cursor: 'pointer', filter: 'brightness(0) invert(1)', marginBottom: '32px' }}>
                <img src={logo} alt="ePaciente" style={{ height: '32px', objectFit: 'contain' }} />
            </div>

            {/* User Profile Section */}
            <div className="ep-sidebar-profile" 
                 onClick={() => history.push('/perfil')}
                 style={{ cursor: 'pointer' }}>
                <div className="ep-avatar ep-avatar--md" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>L</div>
                <div className="ep-flex-col">
                    <span className="ep-text-sm ep-fw-bold" style={{ color: 'white', lineHeight: '1.2' }}>Leonardo R.</span>
                    <span className="ep-text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Cidadão Curuense</span>
                </div>
            </div>
            
            <div className="ep-flex-col ep-gap-6 ep-w-full ep-flex-1 ep-mt-8">
                {menuGroups.map((group) => (
                    <div key={group.id} className="ep-flex-col ep-gap-2">
                        {/* Divider/Título da Seção dinâmico como no exemplo */}
                        <span className="ep-px-3" style={{ 
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
                                    style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                >
                                    <span className="ep-sidebar-icon" style={{ color: 'white' }}>
                                        {item.icon}
                                    </span>
                                    <span className='nav-item' style={{ fontWeight: isActive ? '600' : '400', color: 'white' }}>
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
                onClick={() => history.push('/login')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
                <MdLogout style={{ fontSize: '20px' }} />
                <span className='nav-item' style={{ color: 'white' }}>Sair</span>
            </button>
        </nav>
    );
};

export default MenuDesktop;