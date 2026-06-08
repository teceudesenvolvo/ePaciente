import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
    // FaArrowLeft, 
    FaBell, 
    FaUserCircle 
} from 'react-icons/fa';

const HeaderTop = ({ customTitle, customClick, showBack = true, children }) => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  // Configuração centralizada de títulos e rotas de retorno
  const config = {
    '/notificacoes': { title: 'Notificações' },
    '/consultas': { title: 'Minhas Consultas' },
    '/exames': { title: 'Meus Exames' },
    '/vacinas': { title: 'Vacinação' },
    '/transporte': { title: 'Solicitar Transporte' },
    '/perfil': { title: 'Meu Perfil' },
    '/receitas': { title: 'Minhas Receitas' },
    '/medicamentos': { title: 'Medicamentos' },
    '/telemedicina': { title: 'Telemedicina' },
    '/gestao/dashboard': { title: 'Painel do Secretário' },
    '/gestao/usuarios': { title: 'Gestão de Usuários' },
    '/gestao/unidades': { title: 'Gestão de Unidades' },
    '/gestao/funcoes': { title: 'Funções e Permissões' },
    '/gestao/rh': { title: 'Recursos Humanos' },
    '/gestao/contabilidade': { title: 'Contabilidade' },
    '/gestao/ponto-eletronico': { title: 'Ponto Eletrônico' },
    '/gestao/ponto-geolocalizacao': { title: 'Ponto por Geolocalização' },
    '/gestao/telemedicina': { title: 'Monitoramento Online' },
    '/gestao/transportes': { title: 'Logística de Transportes' },
    '/gestao/ouvidoria': { title: 'Ouvidoria' },
    '/gestao/campanhas': { title: 'Gestão de Campanhas' },
    '/gestao/perfil': { title: 'Perfil do Secretário' },
    '/gestao/notificacoes': { title: 'Notificações da Gestão' },
    '/executivo/dashboard': { title: 'Painel Executivo da Saúde' },
    '/executivo/ouvidoria': { title: 'Ouvidoria Executiva' },
    '/executivo/mapa': { title: 'Mapa Geográfico de Saúde' },
    '/executivo/transparencia': { title: 'Portal da Transparência' },
    '/executivo/alertas': { title: 'Alertas Médicos' },
    '/executivo/planos': { title: 'Planos de Ação' },
    '/executivo/analises': { title: 'Análises Executivas' },
    '/executivo/perfil': { title: 'Perfil Prefeito' },
    '/executivo/notificacoes': { title: 'Notificações Executivas' },
    '/funcionarios/medicos/consultas': { title: 'Médicos · Consultas' },
    '/funcionarios/medicos/receitas': { title: 'Médicos · Receitas' },
    '/funcionarios/medicos/exames': { title: 'Médicos · Exames' },
    '/funcionarios/medicos/encaminhamentos': { title: 'Médicos · Encaminhamentos' },
    '/funcionarios/farmacia/estoque': { title: 'Farmácia · Estoque' },
    '/funcionarios/farmacia/medicamentos': { title: 'Farmácia · Medicamentos' },
    '/funcionarios/farmacia/solicitacoes': { title: 'Farmácia · Solicitações' },
    '/funcionarios/recepcao/agendamentos': { title: 'Recepção · Agendamentos' },
    '/funcionarios/recepcao/exames': { title: 'Recepção · Exames' },
    '/funcionarios/recepcao/fila': { title: 'Recepção · Fila' },
    '/funcionarios/enfermeiros/triagem': { title: 'Enfermeiros · Triagem' },
    '/funcionarios/enfermeiros/procedimentos': { title: 'Enfermeiros · Procedimentos' },
    '/funcionarios/enfermeiros/acompanhamentos': { title: 'Enfermeiros · Acompanhamentos' },
    '/funcionarios/dentistas/consultas': { title: 'Dentistas · Consultas' },
    '/funcionarios/dentistas/receitas': { title: 'Dentistas · Receitas' },
    '/funcionarios/dentistas/exames': { title: 'Dentistas · Exames' },
    '/funcionarios/dentistas/encaminhamentos': { title: 'Dentistas · Encaminhamentos' },
    '/funcionarios/acs/residencias': { title: 'ACS · Residências' },
    '/funcionarios/acs/visitas': { title: 'ACS · Visitas' },
    '/funcionarios/acs/alertas': { title: 'ACS · Alertas' },
    '/funcionarios/frotas': { title: 'Frotas · Transportes' },
    '/funcionarios/frotas/combustiveis': { title: 'Frotas · Combustíveis' },
    '/funcionarios/frotas/manutencao': { title: 'Frotas · Manutenção' },
    '/funcionarios/frotas/rastreio': { title: 'Frotas · Rastreio' },
    '/ubs/dashboard': { title: 'Painel da Unidade' },
    '/ubs/agenda': { title: 'Agenda da Unidade' },
    '/ubs/recepcao': { title: 'Recepção' },
    '/ubs/estoque': { title: 'Gestão de Estoque' },
  };

  // Layout especial para a Home (Olá, Usuário + Data + Ícones)
  if (path === '/inicio' || path === '/home' || path.endsWith('/dashboard')) {
    const userName = 'Leonardo';
    const currentDate = new Date().toLocaleDateString('pt-BR', { 
      weekday: 'long', day: 'numeric', month: 'long' 
    });

    return (
      <div className="ep-page-header ep-justify-between ep-items-center">
        <div className="ep-flex-col ep-justify-center">
          {path.endsWith('/dashboard') ? (
            <h2 className="ep-section-title">
              {config[path]?.title}
            </h2>
          ) : (
            <h2 className="ep-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Olá, {userName} <span role="img" aria-label="wave">👋</span>
            </h2>
          )}
          <p className="ep-text-sm ep-text-muted" style={{ textTransform: 'capitalize' }}>
            {currentDate}
          </p>
        </div>
        <div className="ep-flex ep-items-center ep-gap-3">
          <button className="ep-back-btn" onClick={() => {
            if (path.includes('/gestao/')) history.push('/gestao/notificacoes');
            else if (path.includes('/executivo/')) history.push('/executivo/notificacoes');
            else history.push('/notificacoes');
          }}><FaBell /></button>
          <button className="ep-back-btn" onClick={() => {
            if (path.includes('/gestao/')) history.push('/gestao/perfil');
            else if (path.includes('/executivo/')) history.push('/executivo/perfil');
            else history.push('/perfil');
          }}><FaUserCircle /></button>
        </div>
      </div>
    );
  }

  const page = config[path];
  if (!page && !customTitle) return null; // Não renderiza em páginas como Login/Landing

  const title = customTitle || page?.title;
//   const backAction = customClick || (() => history.push(page?.back || '/inicio'));

  return (
    <div className="ep-page-header ep-justify-between ep-items-center">
      <div className="ep-flex ep-items-center">
        {/* {showBack && (
          <button className="ep-back-btn ep-hide-desktop" onClick={backAction}>
            <FaArrowLeft />
          </button>
        )} */}
        <h1 className="ep-page-title">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default HeaderTop;
