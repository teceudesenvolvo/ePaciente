import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaCalendarCheck, FaStethoscope, FaVial, FaSyringe, FaBus, FaFileMedical } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const Home = () => {
  const history = useHistory();
  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        {/* Next Appointment Card */}
        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
            <span className="ep-badge ep-badge--neutral" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Próximo Compromisso
            </span>
            <span className="ep-text-sm ep-fw-bold">Em 5 dias</span>
          </div>
          
          <h3 className="ep-font-lg ep-fw-bold ep-mb-2">Consulta Clínica Geral</h3>
          <p className="ep-text-sm ep-mb-4" style={{ opacity: 0.9 }}>
            Segunda, 10/06 · 09:00 · UBS Centro
          </p>
          
          <div className="ep-flex ep-gap-2">
            <button className="ep-btn ep-btn--sm" style={{ background: 'white', color: 'var(--color-primary-dark)' }}>
              Ver Detalhes
            </button>
            <button className="ep-btn ep-btn--sm" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Como Chegar
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <h3 className="ep-section-title ep-mb-4">Acesso Rápido</h3>
        
        <div className="ep-quick-grid">
          <button className="ep-quick-action" onClick={() => history.push('/consultas')}>
            <div className="ep-quick-action__icon" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
              <FaCalendarCheck />
            </div>
            <span className="ep-quick-action__label">Agendar<br/>Consulta</span>
          </button>
          
          <button className="ep-quick-action" onClick={() => history.push('/consultas')}>
            <div className="ep-quick-action__icon" style={{ background: 'var(--color-info-light)', color: 'var(--color-info)' }}>
              <FaStethoscope />
            </div>
            <span className="ep-quick-action__label">Telemedicina</span>
          </button>
          
          <button className="ep-quick-action" onClick={() => history.push('/exames')}>
            <div className="ep-quick-action__icon" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
              <FaVial />
            </div>
            <span className="ep-quick-action__label">Agendar<br/>Exame</span>
          </button>
          
          <button className="ep-quick-action" onClick={() => history.push('/carteira')}>
            <div className="ep-quick-action__icon" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
              <FaSyringe />
            </div>
            <span className="ep-quick-action__label">Calendário<br/>Vacinas</span>
          </button>
          
          <button className="ep-quick-action" onClick={() => history.push('/transporte')}>
            <div className="ep-quick-action__icon" style={{ background: 'var(--color-error-light)', color: 'var(--color-error)' }}>
              <FaBus />
            </div>
            <span className="ep-quick-action__label">Transporte</span>
          </button>
          
          <button className="ep-quick-action" onClick={() => history.push('/carteira')}>
            <div className="ep-quick-action__icon" style={{ background: 'var(--color-n200)', color: 'var(--color-n700)' }}>
              <FaFileMedical />
            </div>
            <span className="ep-quick-action__label">Receitas<br/>Digitais</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;