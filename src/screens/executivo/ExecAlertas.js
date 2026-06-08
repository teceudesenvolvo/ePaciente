import React from 'react';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Line } from 'react-chartjs-2';
import { FaBell, FaExclamationTriangle } from 'react-icons/fa';

const ExecAlertas = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 14, font: { size: 11 } } } },
    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } },
  };

  const alertas = [
    { titulo: 'Dengue em elevação', texto: 'Bairro Alto registra aumento semanal de notificações.', nivel: 'Crítico' },
    { titulo: 'Estoque de antibióticos', texto: 'Rede municipal de saúde próxima ao nível mínimo de segurança.', nivel: 'Atenção' },
    { titulo: 'Síndrome respiratória', texto: 'Crescimento em atendimentos pediátricos na UBS Centro.', nivel: 'Atenção' },
  ];

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Alertas por Semana</h4>
            <div style={{ height: 230 }}>
              <Line data={{ labels: ['S1', 'S2', 'S3', 'S4'], datasets: [{ label: 'Alertas', data: [7, 11, 9, 15], borderColor: '#ff3b30', backgroundColor: 'rgba(255,59,48,0.1)', fill: true, tension: 0.35 }] }} options={chartOptions} />
            </div>
          </div>
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Alertas por Tipo</h4>
            <div style={{ height: 230 }}>
              <Bar data={{ labels: ['Epidem.', 'Estoque', 'Fila', 'Frota'], datasets: [{ label: 'Ocorrências', data: [15, 8, 6, 4], backgroundColor: ['#ff3b30', '#ff9500', '#007aff', '#5856d6'], borderRadius: 8 }] }} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {alertas.map((alerta) => (
            <div key={alerta.titulo} className="ep-card ep-card--flat" style={{ borderLeft: `4px solid ${alerta.nivel === 'Crítico' ? 'var(--color-error)' : 'var(--color-warning)'}` }}>
              <div className="ep-flex ep-justify-between ep-items-center">
                <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold"><FaBell /> {alerta.titulo}</div>
                <span className={`ep-badge ${alerta.nivel === 'Crítico' ? 'ep-badge--error' : 'ep-badge--warning'}`}>{alerta.nivel}</span>
              </div>
              <p className="ep-text-sm ep-text-muted ep-mt-2"><FaExclamationTriangle /> {alerta.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecAlertas;
