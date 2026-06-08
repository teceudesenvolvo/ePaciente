import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
    MdOutlineDashboard,
    MdOutlineCalendarMonth,
    MdOutlineGroups,
    MdOutlineWarehouse,
    MdOutlineVideocam,
    MdOutlineDirectionsBus,
    MdOutlineMap,
    MdOutlineHistoryEdu,
    MdOutlinePeopleAlt,
    MdOutlineDomain,
    MdOutlineManageAccounts,
    MdOutlineBadge,
    MdOutlineAttachMoney,
    MdOutlineAccessTime,
    MdOutlineMyLocation,
    MdOutlineRateReview,
    MdOutlineCampaign,
    MdOutlineNotificationsActive,
    MdOutlineAssignment,
    MdOutlineAnalytics,
    MdOutlineBloodtype,
    MdOutlineSummarize,
    MdOutlinePersonSearch,
    MdOutlineAccountCircle,
    MdLogout
} from "react-icons/md";

const MenuDashboard = () => {
    const location = useLocation();
    const history = useHistory();
    const currentPath = location.pathname;

    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
    React.useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detecta o papel do painel baseado na URL para trocar os itens
    let role = null;
    if (currentPath.includes('/ubs/')) role = 'ubs';
    else if (currentPath.includes('/gestao/')) role = 'gestao';
    else if (currentPath.includes('/executivo/')) role = 'executivo';

    // Se não for desktop ou não estiver em uma rota administrativa, não renderiza
    if (!isDesktop || !role) return null;

    const roleConfigs = {
        ubs: {
            label: 'UBS',
            title: 'Painel Unidade',
            color: 'var(--color-primary)',
            items: [
                { path: '/ubs/dashboard', icon: <MdOutlineDashboard />, label: 'Dashboard' },
                { path: '/ubs/agenda', icon: <MdOutlineCalendarMonth />, label: 'Agenda' },
                { path: '/ubs/recepcao', icon: <MdOutlineGroups />, label: 'Recepção' },
                { path: '/ubs/estoque', icon: <MdOutlineWarehouse />, label: 'Estoque' },
                { path: '/ubs/telemedicina', icon: <MdOutlineVideocam />, label: 'Telemedicina' },
                { path: '/ubs/exames', icon: <MdOutlineBloodtype />, label: 'Exames' },
                { path: '/ubs/receitas', icon: <MdOutlineSummarize />, label: 'Receitas' },
                { path: '/ubs/pacientes', icon: <MdOutlinePersonSearch />, label: 'Pacientes' },
            ]
        },
        gestao: {
            label: 'Gestão',
            title: 'Painel Secretário',
            color: 'var(--color-success)',
            items: [
                { path: '/gestao/dashboard', icon: <MdOutlineDashboard />, label: 'Dashboard' },
                { path: '/gestao/usuarios', icon: <MdOutlinePeopleAlt />, label: 'Usuários' },
                { path: '/gestao/unidades', icon: <MdOutlineDomain />, label: 'Unidades' },
                { path: '/gestao/funcoes', icon: <MdOutlineManageAccounts />, label: 'Funções' },
                { path: '/gestao/rh', icon: <MdOutlineBadge />, label: 'RH' },
                { path: '/gestao/contabilidade', icon: <MdOutlineAttachMoney />, label: 'Contabilidade' },
                { path: '/gestao/ponto-eletronico', icon: <MdOutlineAccessTime />, label: 'Ponto Eletr.' },
                { path: '/gestao/ponto-geolocalizacao', icon: <MdOutlineMyLocation />, label: 'Ponto Geo' },
                { path: '/gestao/transportes', icon: <MdOutlineDirectionsBus />, label: 'Transporte' },
                { path: '/gestao/ouvidoria', icon: <MdOutlineRateReview />, label: 'Ouvidoria' },
                { path: '/gestao/campanhas', icon: <MdOutlineCampaign />, label: 'Campanhas' },
                { path: '/gestao/perfil', icon: <MdOutlineAccountCircle />, label: 'Perfil' },
            ]
        },
        executivo: {
            label: 'Executivo',
            title: 'Saúde Municipal',
            color: 'var(--color-warning)',
            items: [
                { path: '/executivo/dashboard', icon: <MdOutlineDashboard />, label: 'Dashboard' },
                { path: '/executivo/ouvidoria', icon: <MdOutlineRateReview />, label: 'Ouvidoria' },
                { path: '/executivo/mapa', icon: <MdOutlineMap />, label: 'Mapa Saúde' },
                { path: '/executivo/transparencia', icon: <MdOutlineHistoryEdu />, label: 'Transparência' },
                { path: '/executivo/alertas', icon: <MdOutlineNotificationsActive />, label: 'Alertas Med.' },
                { path: '/executivo/planos', icon: <MdOutlineAssignment />, label: 'Planos de Ação' },
                { path: '/executivo/analises', icon: <MdOutlineAnalytics />, label: 'Análises' },
                { path: '/executivo/perfil', icon: <MdOutlineAccountCircle />, label: 'Perfil Prefeito' },
            ]
        }
    };

    const config = roleConfigs[role];

    return (
        <nav className='menuDesktop ep-animate-fade-in' style={{ background: 'var(--gradient-primary)', borderRight: '1px solid rgba(255,255,255,0.16)' }}>
            {/* Logo */}
            <div className="ep-sidebar-logo" onClick={() => history.push('/')} style={{ cursor: 'pointer', marginBottom: '40px', display: 'flex' }}>
                <img 
                    src="https://intgest-executivo.s3.amazonaws.com/media/intgest_executivo/public/entidade/logotipo/sao_luis_do_curu1.png.600x600_q85_box-0%2C0%2C108%2C108_crop_detail.png" 
                    alt="Logo Município" 
                    style={{ objectFit: 'contain' }} 
                />
            </div>

            {/* Identificador do Painel */}
            <div className="ep-sidebar-profile" style={{ background: 'rgba(255,255,255,0.14)', borderRadius: '12px', padding: '12px 0', marginBottom: '32px', display: 'flex', gap: '12px' }}>
                <div className="ep-avatar ep-avatar--md" style={{ background: config.color, color: 'white', fontWeight: 'bold' }}>
                    {config.label.charAt(0)}
                </div>
                <div className="ep-sidebar-profile-info ep-flex-col">
                    <span className="ep-text-sm ep-fw-bold" style={{ color: 'white', lineHeight: '1.2' }}>{config.title}</span>
                    <span className="ep-text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>São Luís do Curu</span>
                </div>
            </div>

            <div className="ep-flex-col ep-gap-2 ep-w-full ep-flex-1" style={{ overflowY: 'auto', overflowX: 'hidden', paddingBottom: '12px' }}>
                <span className="ep-sidebar-group-title ep-px-3" style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: 'rgba(255, 255, 255, 0.4)', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '8px'
                }}>
                    Navegação
                </span>

                {config.items.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => history.push(item.path)}
                            className={`ep-sidebar-item ${isActive ? 'ep-sidebar-item--active' : ''}`}
                            style={{ 
                                border: 'none', 
                                background: isActive ? config.color : 'transparent', 
                                cursor: 'pointer',
                                borderRadius: '8px',
                                padding: '12px 0',
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

            {/* Sair */}
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
                    gap: '12px'
                }}
            >
                <MdLogout style={{ fontSize: '20px', color: '#ff4d6d' }} />
                <span className='nav-item' style={{ color: 'white' }}>Sair</span>
            </button>
        </nav>
    );
};

export default MenuDashboard;
