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
  };

  // Layout especial para a Home (Olá, Usuário + Data + Ícones)
  if (path === '/inicio' || path === '/home') {
    const userName = 'Leonardo';
    const currentDate = new Date().toLocaleDateString('pt-BR', { 
      weekday: 'long', day: 'numeric', month: 'long' 
    });

    return (
      <div className="ep-page-header ep-justify-between ep-items-center">
        <div className="ep-flex-col ep-justify-center">
          <h2 className="ep-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Olá, {userName} <span role="img" aria-label="wave">👋</span>
          </h2>
          <p className="ep-text-sm ep-text-muted" style={{ textTransform: 'capitalize' }}>
            {currentDate}
          </p>
        </div>
        <div className="ep-flex ep-items-center ep-gap-3">
          <button className="ep-back-btn" onClick={() => history.push('/notificacoes')}><FaBell /></button>
          <button className="ep-back-btn" onClick={() => history.push('/perfil')}><FaUserCircle /></button>
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