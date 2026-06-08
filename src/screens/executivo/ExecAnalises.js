import React from 'react';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Line } from 'react-chartjs-2';

const ExecAnalises = () => {
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
        <div className="ep-grid-2 ep-gap-4">
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Tendência de Demanda</h4>
            <div style={{ height: 260 }}>
              <Line
                data={{ labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ label: 'Atendimentos', data: [8200, 9100, 8800, 9600, 10300, 11200], borderColor: '#007aff', backgroundColor: 'rgba(0,122,255,0.1)', fill: true, tension: 0.35 }] }}
                options={chartOptions}
              />
            </div>
          </div>
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Eficiência por Serviço de Saúde</h4>
            <div style={{ height: 260 }}>
              <Bar
                data={{ labels: ['UBS', 'Transp.', 'Ouvid.', 'Estoque'], datasets: [{ label: 'Índice', data: [82, 74, 91, 68], backgroundColor: ['#34c759', '#5856d6', '#007aff', '#ff9500'], borderRadius: 8 }] }}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        <div className="ep-card ep-card--flat ep-mt-6">
          <h3 className="ep-section-title ep-mb-3">Leitura Executiva</h3>
          <p className="ep-text-sm ep-text-muted">A demanda cresce nos últimos três meses, com gargalo principal em estoque e transporte sanitário. Recomenda-se priorizar reposição crítica e ampliar agenda de veículos nas rotas rurais.</p>
        </div>
      </div>
    </div>
  );
};

export default ExecAnalises;
