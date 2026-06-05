import React, { useState } from 'react';
import { FaVideo, FaUserCheck, FaClock } from 'react-icons/fa';

const GestaoTelemedicina = () => {
  const [activeTab, setActiveTab] = useState('online');

  const medicos = [
    { id: 1, nome: 'Dr. Carlos Mendes', esp: 'Clínico Geral', status: 'online', emConsulta: true, time: '12:00' },
    { id: 2, nome: 'Dra. Fernanda Lima', esp: 'Pediatra', status: 'online', emConsulta: false, time: '00:00' },
    { id: 3, nome: 'Dr. João Paulo', esp: 'Psiquiatra', status: 'offline', emConsulta: false, time: '00:00' },
  ];

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Regulação de Telemedicina</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-grid-3 ep-mb-6">
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--success"><FaVideo /></div>
            <div className="ep-kpi__value">12</div>
            <div className="ep-kpi__label">Salas Ativas</div>
          </div>
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--warning"><FaUserCheck /></div>
            <div className="ep-kpi__value">45</div>
            <div className="ep-kpi__label">Em Fila</div>
          </div>
          <div className="ep-kpi">
            <div className="ep-kpi__icon ep-kpi__icon--info"><FaClock /></div>
            <div className="ep-kpi__value">8m</div>
            <div className="ep-kpi__label">Tempo Médio</div>
          </div>
        </div>

        <div className="ep-tabs">
          <button className={`ep-tab ${activeTab === 'online' ? 'ep-tab--active' : ''}`} onClick={() => setActiveTab('online')}>
            Médicos Online (2)
          </button>
          <button className={`ep-tab ${activeTab === 'offline' ? 'ep-tab--active' : ''}`} onClick={() => setActiveTab('offline')}>
            Offline (1)
          </button>
        </div>

        <div className="ep-flex-col ep-gap-3 ep-mt-4">
          {medicos.filter(m => m.status === activeTab).map(m => (
            <div key={m.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center">
                <div className="ep-flex ep-items-center ep-gap-3">
                  <div className={`ep-status-dot ep-status-dot--${m.status === 'online' ? 'success' : 'neutral'}`}></div>
                  <div>
                    <div className="ep-fw-bold">{m.nome}</div>
                    <div className="ep-text-sm ep-text-muted">{m.esp}</div>
                  </div>
                </div>
                <div>
                  {m.emConsulta ? (
                    <div className="ep-flex-col ep-items-end">
                      <span className="ep-badge ep-badge--warning">Em Consulta</span>
                      <span className="ep-text-xs ep-text-muted ep-mt-1">{m.time}</span>
                    </div>
                  ) : m.status === 'online' ? (
                    <span className="ep-badge ep-badge--success">Livre</span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoTelemedicina;
