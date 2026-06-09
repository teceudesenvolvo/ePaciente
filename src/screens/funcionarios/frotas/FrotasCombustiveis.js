import React, { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaGasPump, FaPlus, FaReceipt } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';
import '../../../utils/chartSetup';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
  purple: '#5856d6',
};

const abastecimentosBase = [
  { veiculo: 'AMB-01', motorista: 'Rafael Oliveira', litros: 48, valor: 'R$ 298,56', km: '38.420', posto: 'Posto Centro' },
  { veiculo: 'VAN-04', motorista: 'Cláudia Martins', litros: 42, valor: 'R$ 261,24', km: '51.180', posto: 'Posto Curu' },
  { veiculo: 'CAR-12', motorista: 'João Batista', litros: 31, valor: 'R$ 192,51', km: '22.904', posto: 'Posto Centro' },
];

const FrotasCombustiveis = () => {
  const [abastecimentos, setAbastecimentos] = useState(abastecimentosBase);

  const registrarAbastecimento = () => {
    setAbastecimentos([
      { veiculo: 'VAN-07', motorista: 'Marina Sousa', litros: 39, valor: 'R$ 242,19', km: '17.210', posto: 'Posto Curu' },
      ...abastecimentos,
    ]);
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6" onClick={registrarAbastecimento}>
          <FaPlus /> Registrar abastecimento
        </button>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.warning, color: 'white' }}><FaGasPump /></div>
            <div><div className="ep-text-sm ep-text-muted">Litros no mês</div><div className="ep-font-xl ep-fw-bold ep-mt-1">1.284 L</div></div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: 72, height: 72 }}><Doughnut data={{ labels: ['Usado', 'Meta'], datasets: [{ data: [64, 36], backgroundColor: [CHART_COLORS.primary, 'rgba(0,122,255,0.12)'], borderWidth: 0 }] }} options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} /></div>
            <div><div className="ep-text-sm ep-text-muted">Meta consumida</div><div className="ep-font-xl ep-fw-bold ep-mt-1">64%</div></div>
          </div>
          <div className="ep-card ep-card--flat">
            <div style={{ height: 72 }}><Line data={{ labels: ['S1', 'S2', 'S3', 'S4'], datasets: [{ data: [980, 1140, 1220, 1284], borderColor: CHART_COLORS.success, backgroundColor: 'rgba(0,196,140,0.12)', fill: true, tension: 0.35 }] }} options={chartOptions} /></div>
            <div className="ep-text-xs ep-text-muted ep-mt-2">Evolução de consumo</div>
          </div>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6">
          <h3 className="ep-font-lg ep-fw-bold ep-mb-4">Consumo por veículo</h3>
          <div style={{ height: 170 }}>
            <Bar data={{ labels: ['AMB-01', 'VAN-04', 'CAR-12', 'VAN-07'], datasets: [{ data: [428, 312, 184, 360], backgroundColor: [CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.warning, CHART_COLORS.purple], borderRadius: 8 }] }} options={chartOptions} />
          </div>
        </div>

        <div className="ep-section-header"><h3 className="ep-section-title">Últimos abastecimentos</h3></div>
        <div className="ep-flex-col ep-gap-3">
          {abastecimentos.map((item, index) => (
            <div key={`${item.veiculo}-${index}`} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div className="ep-flex ep-items-center ep-gap-3">
                <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.primary, color: 'white' }}><FaReceipt /></div>
                <div>
                  <div className="ep-fw-bold">{item.veiculo} · {item.litros} L</div>
                  <div className="ep-text-xs ep-text-muted">{item.motorista} · Km {item.km} · {item.posto}</div>
                </div>
              </div>
              <span className="ep-badge ep-badge--primary">{item.valor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrotasCombustiveis;
