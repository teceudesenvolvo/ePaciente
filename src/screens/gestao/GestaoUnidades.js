import React from 'react';
import { FaClinicMedical, FaPlus } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar } from 'react-chartjs-2';

const unidades = [
  { nome: 'UBS Centro', bairro: 'Centro', equipe: 18, status: 'Operacional', ocupacao: 62 },
  { nome: 'UBS Curu', bairro: 'Zona Rural', equipe: 11, status: 'Operacional', ocupacao: 48 },
  { nome: 'Hospital Municipal', bairro: 'Centro', equipe: 42, status: 'Atenção', ocupacao: 86 },
];

const GestaoUnidades = () => {
  const chartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false, max: 100 }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6">
          <FaPlus /> Nova Unidade
        </button>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Unidades de saúde</h3>
        </div>

        <div className="ep-flex-col ep-gap-4">
          {unidades.map((unidade) => (
            <div key={unidade.nome} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center">
                <div className="ep-flex ep-items-center ep-gap-3">
                  <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}>
                    <FaClinicMedical />
                  </div>
                  <div>
                    <div className="ep-fw-bold">{unidade.nome}</div>
                    <div className="ep-text-sm ep-text-muted">{unidade.bairro} · {unidade.equipe} profissionais</div>
                  </div>
                </div>
                <span className={`ep-badge ${unidade.status === 'Operacional' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                  {unidade.status}
                </span>
              </div>
              <div className="ep-mt-4">
                <div className="ep-flex ep-justify-between ep-text-xs ep-text-muted ep-mb-2">
                  <span>Ocupação</span>
                  <span>{unidade.ocupacao}%</span>
                </div>
                <div style={{ height: 34 }}>
                  <Bar
                    data={{
                      labels: [unidade.nome],
                      datasets: [{
                        data: [unidade.ocupacao],
                        backgroundColor: unidade.ocupacao > 80 ? 'var(--color-warning)' : 'var(--color-success)',
                        borderRadius: 8,
                      }],
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoUnidades;
