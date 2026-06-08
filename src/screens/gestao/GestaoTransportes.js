import React from 'react';
import { FaMapMarkedAlt, FaCheck, FaTimes } from 'react-icons/fa';
import '../../utils/chartSetup';
import { Doughnut } from 'react-chartjs-2';

const GestaoTransportes = () => {
  const solicitacoes = [
    { id: 101, paciente: 'Antônio Marcos', origem: 'Sítio das Pedras', destino: 'Hospital Municipal', data: '12/06', just: 'Hemodiálise', status: 'pendente' },
    { id: 102, paciente: 'Lúcia Silva', origem: 'Bairro Alto', destino: 'Clínica Visão', data: '13/06', just: 'Cirurgia Catarata', status: 'aprovado' },
  ];

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Regulação de Transportes</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <FaMapMarkedAlt style={{ fontSize: 24 }} />
            <div style={{ flex: 1 }}>
              <h3 className="ep-font-lg ep-fw-bold">Frota Municipal</h3>
              <p className="ep-text-sm" style={{ opacity: 0.9 }}>Operação e manutenção da frota</p>
            </div>
            <div style={{ width: 74, height: 74 }}>
              <Doughnut
                data={{ labels: ['Operacionais', 'Manutenção'], datasets: [{ data: [12, 2], backgroundColor: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.28)'], borderWidth: 0 }] }}
                options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Solicitações Pendentes (1)</h3>
        </div>

        <div className="ep-flex-col ep-gap-4">
          {solicitacoes.filter(s => s.status === 'pendente').map(s => (
            <div key={s.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between">
                <div>
                  <div className="ep-fw-bold">{s.paciente}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">Data: {s.data}</div>
                  <div className="ep-text-sm ep-mt-2"><strong>De:</strong> {s.origem} <br/> <strong>Para:</strong> {s.destino}</div>
                  <div className="ep-text-sm ep-mt-2 ep-p-2" style={{ background: 'var(--color-n50)', borderRadius: '4px' }}>
                    <strong>Justificativa:</strong> {s.just}
                  </div>
                </div>
              </div>
              <div className="ep-flex ep-gap-2 ep-mt-4">
                <button className="ep-btn ep-btn--ghost ep-btn--full" style={{ color: 'var(--color-error)' }}><FaTimes /> Recusar</button>
                <button className="ep-btn ep-btn--primary ep-btn--full"><FaCheck /> Aprovar e Alocar</button>
              </div>
            </div>
          ))}
        </div>

        <div className="ep-section-header ep-mt-6">
          <h3 className="ep-section-title">Aprovados Recentes</h3>
        </div>
        <div className="ep-flex-col ep-gap-3">
          {solicitacoes.filter(s => s.status === 'aprovado').map(s => (
            <div key={s.id} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
               <div>
                  <div className="ep-fw-bold">{s.paciente}</div>
                  <div className="ep-text-xs ep-text-muted">{s.origem} → {s.destino}</div>
               </div>
               <span className="ep-badge ep-badge--success">Van 04</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoTransportes;
