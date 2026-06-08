import React, { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { FaPlus, FaTools, FaWrench } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
  error: '#E53E3E',
};

const servicosBase = [
  { veiculo: 'CAR-12', servico: 'Suspensão dianteira', prazo: 'Imediato', custo: 'R$ 3.200,00', risco: 'Alto' },
  { veiculo: 'VAN-04', servico: 'Troca de pneus', prazo: '12 dias', custo: 'R$ 2.400,00', risco: 'Médio' },
  { veiculo: 'AMB-01', servico: 'Revisão preventiva', prazo: '20 dias', custo: 'R$ 1.850,00', risco: 'Baixo' },
];

const statusClass = (risco) => {
  if (risco === 'Alto') return 'ep-badge--error';
  if (risco === 'Médio') return 'ep-badge--warning';
  return 'ep-badge--success';
};

const FrotasManutencao = () => {
  const [servicos, setServicos] = useState(servicosBase);

  const abrirOrdem = () => {
    setServicos([
      { veiculo: 'VAN-07', servico: 'Alinhamento e balanceamento', prazo: '7 dias', custo: 'R$ 620,00', risco: 'Baixo' },
      ...servicos,
    ]);
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6" onClick={abrirOrdem}>
          <FaPlus /> Abrir ordem de serviço
        </button>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.error, color: 'white' }}><FaTools /></div>
            <div><div className="ep-text-sm ep-text-muted">Críticas</div><div className="ep-font-xl ep-fw-bold ep-mt-1">1</div></div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: 72, height: 72 }}><Doughnut data={{ labels: ['Previsto', 'Saldo'], datasets: [{ data: [7400, 12600], backgroundColor: [CHART_COLORS.warning, 'rgba(255,149,0,0.14)'], borderWidth: 0 }] }} options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} /></div>
            <div><div className="ep-text-sm ep-text-muted">Orçamento previsto</div><div className="ep-font-xl ep-fw-bold ep-mt-1">37%</div></div>
          </div>
          <div className="ep-card ep-card--flat">
            <div style={{ height: 72 }}><Line data={{ labels: ['S1', 'S2', 'S3', 'S4'], datasets: [{ data: [1800, 2400, 5200, 7400], borderColor: CHART_COLORS.error, backgroundColor: 'rgba(229,62,62,0.1)', fill: true, tension: 0.35 }] }} options={{ maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }} /></div>
            <div className="ep-text-xs ep-text-muted ep-mt-2">Projeção de custos</div>
          </div>
        </div>

        <div className="ep-section-header"><h3 className="ep-section-title">Ordens e previsões</h3></div>
        <div className="ep-flex-col ep-gap-3">
          {servicos.map((item, index) => (
            <div key={`${item.veiculo}-${index}`} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div className="ep-flex ep-items-center ep-gap-3">
                <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.primary, color: 'white' }}><FaWrench /></div>
                <div>
                  <div className="ep-fw-bold">{item.veiculo} · {item.servico}</div>
                  <div className="ep-text-xs ep-text-muted">Prazo: {item.prazo} · Custo previsto: {item.custo}</div>
                </div>
              </div>
              <span className={`ep-badge ${statusClass(item.risco)}`}>{item.risco}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrotasManutencao;
