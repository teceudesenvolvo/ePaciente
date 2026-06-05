import React from 'react';
import { FaCalendarCheck, FaUserClock, FaTimesCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const UBSDashboard = () => {
  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <div>
          <h1 className="ep-page-title">UBS Centro</h1>
          <p className="ep-text-sm ep-text-muted">Quinta-feira, 05/06</p>
        </div>
      </div>
      
      <div className="ep-content ep-animate-fade-up">
        {/* KPIs */}
        <div className="ep-grid-2 ep-mb-6">
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--info"><FaCalendarCheck /></div>
            <div className="ep-kpi__value">24</div>
            <div className="ep-kpi__label">Agendados</div>
          </div>
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--success"><FaCheckCircle /></div>
            <div className="ep-kpi__value">18</div>
            <div className="ep-kpi__label">Realizados</div>
          </div>
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--warning"><FaUserClock /></div>
            <div className="ep-kpi__value">6</div>
            <div className="ep-kpi__label">Aguardando</div>
          </div>
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--error"><FaTimesCircle /></div>
            <div className="ep-kpi__value">3</div>
            <div className="ep-kpi__label">Faltas</div>
          </div>
        </div>

        {/* Alerta Estoque */}
        <div className="ep-alert ep-alert--error ep-mb-6">
          <span className="ep-alert__icon"><FaExclamationTriangle /></span>
          <div>
            <div className="ep-alert__title">Alerta de Estoque</div>
            <div className="ep-alert__text">Luvas P atingiu nível crítico (12 unid.)</div>
          </div>
        </div>

        {/* Resumo da Agenda */}
        <div className="ep-section-header">
          <h3 className="ep-section-title">Agenda — Dr. Marcos Silva</h3>
          <a href="/ubs/agenda" className="ep-section-link">Ver todas</a>
        </div>

        <div className="ep-card ep-card--flat ep-flex-col ep-gap-3">
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-text-sm ep-fw-bold" style={{ width: 45 }}>07:00</div>
            <div className="ep-status-dot ep-status-dot--success"></div>
            <div className="ep-flex-col">
              <span className="ep-text-sm ep-fw-semibold">João Costa</span>
              <span className="ep-text-xs ep-text-muted">Clínica Geral</span>
            </div>
          </div>
          <div className="ep-divider" style={{ margin: 'var(--sp-2) 0' }}></div>
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-text-sm ep-fw-bold" style={{ width: 45 }}>07:30</div>
            <div className="ep-status-dot ep-status-dot--warning"></div>
            <div className="ep-flex-col">
              <span className="ep-text-sm ep-fw-semibold">Maria Souza</span>
              <span className="ep-text-xs ep-text-muted">Aguardando Triagem</span>
            </div>
          </div>
          <div className="ep-divider" style={{ margin: 'var(--sp-2) 0' }}></div>
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-text-sm ep-fw-bold ep-text-muted" style={{ width: 45 }}>08:00</div>
            <div className="ep-status-dot ep-status-dot--neutral"></div>
            <div className="ep-flex-col">
              <span className="ep-text-sm ep-fw-semibold">Pedro Lima</span>
              <span className="ep-text-xs ep-text-muted">Agendado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UBSDashboard;
