import React from 'react';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ExecOuvidoria = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 14, font: { size: 11 } } } },
    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Demandas por Serviço de Saúde</h4>
            <div style={{ height: 240 }}>
              <Bar
                data={{
                  labels: ['UBS', 'Hospital', 'Farmácia', 'Transporte'],
                  datasets: [{ label: 'Protocolos', data: [72, 51, 38, 29], backgroundColor: '#ff9500', borderRadius: 8 }],
                }}
                options={chartOptions}
              />
            </div>
          </div>
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Situação Geral</h4>
            <div style={{ height: 240 }}>
              <Doughnut
                data={{
                  labels: ['Resolvidos', 'Em análise', 'Atrasados'],
                  datasets: [{ data: [68, 24, 8], backgroundColor: ['#34c759', '#007aff', '#ff3b30'], borderWidth: 0 }],
                }}
                options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } } }}
              />
            </div>
          </div>
        </div>

        <div className="ep-flex-col ep-gap-3">
          <div className="ep-card ep-card--flat" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold ep-mb-2"><FaExclamationTriangle className="ep-text-warning" /> UBS concentram maior volume</div>
            <p className="ep-text-sm ep-text-muted">Priorizar respostas sobre agendamento e disponibilidade de medicamentos.</p>
          </div>
          <div className="ep-card ep-card--flat" style={{ borderLeft: '4px solid var(--color-success)' }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold ep-mb-2"><FaCheckCircle className="ep-text-success" /> 68% resolvidos no prazo</div>
            <p className="ep-text-sm ep-text-muted">Índice acima da meta mensal de atendimento da ouvidoria da saúde.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecOuvidoria;
