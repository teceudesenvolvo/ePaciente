import React from 'react';
import { FaClock, FaComments, FaCheckCircle } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
};

const protocolos = [
  { id: 'OUV-2048', assunto: 'Demora no agendamento', unidade: 'UBS Centro', prazo: 'Hoje', status: 'Aberto' },
  { id: 'OUV-2041', assunto: 'Elogio ao atendimento', unidade: 'Hospital Municipal', prazo: '12/06', status: 'Em análise' },
  { id: 'OUV-2033', assunto: 'Solicitação de medicamento', unidade: 'Farmácia Central', prazo: 'Respondido', status: 'Resolvido' },
];

const GestaoOuvidoria = () => {
  const miniOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-3 ep-mb-6">
          <div className="ep-card ep-card--flat">
            <FaComments className="ep-text-muted" />
            <div style={{ height: 58, marginTop: 8 }}>
              <Line
                data={{ labels: ['S', 'T', 'Q', 'Q', 'S'], datasets: [{ data: [21, 28, 25, 31, 36], borderColor: CHART_COLORS.primary, backgroundColor: 'rgba(0, 122, 255, 0.12)', fill: true, tension: 0.35 }] }}
                options={miniOptions}
              />
            </div>
            <div className="ep-text-xs ep-text-muted ep-mt-2">Protocolos abertos · 36</div>
          </div>
          <div className="ep-card ep-card--flat">
            <FaClock className="ep-text-warning" />
            <div style={{ height: 58, marginTop: 8 }}>
              <Bar
                data={{ labels: ['Hoje', '24h', '48h'], datasets: [{ data: [3, 2, 2], backgroundColor: CHART_COLORS.warning, borderRadius: 6 }] }}
                options={miniOptions}
              />
            </div>
            <div className="ep-text-xs ep-text-muted ep-mt-2">Perto do prazo · 7</div>
          </div>
          <div className="ep-card ep-card--flat">
            <FaCheckCircle className="ep-text-success" />
            <div style={{ height: 66, marginTop: 8 }}>
              <Doughnut
                data={{ labels: ['No prazo', 'Fora'], datasets: [{ data: [92, 8], backgroundColor: [CHART_COLORS.success, 'rgba(52, 199, 89, 0.14)'], borderWidth: 0 }] }}
                options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
            <div className="ep-text-xs ep-text-muted ep-mt-2">Resolvidos no prazo · 92%</div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Protocolos recentes</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {protocolos.map((protocolo) => (
            <div key={protocolo.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center">
                <div>
                  <div className="ep-text-xs ep-text-muted">{protocolo.id}</div>
                  <div className="ep-fw-bold ep-mt-1">{protocolo.assunto}</div>
                  <div className="ep-text-sm ep-text-muted">{protocolo.unidade}</div>
                </div>
                <span className={`ep-badge ${protocolo.status === 'Resolvido' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                  {protocolo.status}
                </span>
              </div>
              <div className="ep-text-xs ep-text-muted ep-mt-3">Prazo: {protocolo.prazo}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoOuvidoria;
