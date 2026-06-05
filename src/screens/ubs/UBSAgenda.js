import React from 'react';
import { FaUserMd, FaPlay } from 'react-icons/fa';

const UBSAgenda = () => {
  const [view, setView] = React.useState('dia');

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Agenda Médica</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-tabs">
          <button className={`ep-tab ${view === 'dia' ? 'ep-tab--active' : ''}`} onClick={() => setView('dia')}>
            Hoje
          </button>
          <button className={`ep-tab ${view === 'semana' ? 'ep-tab--active' : ''}`} onClick={() => setView('semana')}>
            Semana
          </button>
        </div>

        <div className="ep-input-group">
          <select className="ep-select">
            <option>Dr. Marcos Silva - Clínico Geral</option>
            <option>Dra. Ana Costa - Pediatra</option>
          </select>
        </div>

        <div className="ep-card ep-card--flat ep-mt-4">
          <div className="ep-flex-col ep-gap-4">
            
            <div className="ep-flex ep-gap-4">
              <div className="ep-text-sm ep-fw-bold ep-text-muted" style={{ width: 45, paddingTop: 8 }}>07:00</div>
              <div className="ep-card" style={{ flex: 1, background: 'var(--color-success-light)', borderLeft: '4px solid var(--color-success)', padding: 'var(--sp-3)' }}>
                <div className="ep-flex ep-justify-between">
                  <span className="ep-fw-semibold">João Costa</span>
                  <span className="ep-text-xs">Consulta</span>
                </div>
                <div className="ep-mt-3 ep-flex ep-justify-between ep-items-center">
                  <span className="ep-badge ep-badge--success">Atendido</span>
                </div>
              </div>
            </div>

            <div className="ep-flex ep-gap-4">
              <div className="ep-text-sm ep-fw-bold" style={{ width: 45, paddingTop: 8, color: 'var(--color-primary-dark)' }}>07:30</div>
              <div className="ep-card" style={{ flex: 1, background: 'var(--color-warning-light)', borderLeft: '4px solid var(--color-warning)', padding: 'var(--sp-3)' }}>
                <div className="ep-flex ep-justify-between">
                  <span className="ep-fw-semibold">Maria Souza</span>
                  <span className="ep-text-xs">Retorno</span>
                </div>
                <div className="ep-mt-3 ep-flex ep-justify-between ep-items-center">
                  <span className="ep-badge ep-badge--warning">Aguardando</span>
                  <button className="ep-btn ep-btn--sm ep-btn--primary"><FaPlay /> Iniciar</button>
                </div>
              </div>
            </div>

            <div className="ep-flex ep-gap-4">
              <div className="ep-text-sm ep-fw-bold ep-text-muted" style={{ width: 45, paddingTop: 8 }}>08:00</div>
              <div className="ep-card ep-card--flat" style={{ flex: 1, borderLeft: '4px solid var(--color-n300)', padding: 'var(--sp-3)' }}>
                <div className="ep-flex ep-justify-between">
                  <span className="ep-fw-semibold">Pedro Lima</span>
                  <span className="ep-text-xs">Consulta</span>
                </div>
                <div className="ep-mt-3">
                  <span className="ep-badge ep-badge--neutral">Agendado</span>
                </div>
              </div>
            </div>

            <div className="ep-flex ep-gap-4">
              <div className="ep-text-sm ep-fw-bold ep-text-muted" style={{ width: 45, paddingTop: 8 }}>08:30</div>
              <div className="ep-card ep-card--flat" style={{ flex: 1, border: '2px dashed var(--color-n200)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="ep-text-sm ep-text-muted">Horário Livre</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UBSAgenda;
