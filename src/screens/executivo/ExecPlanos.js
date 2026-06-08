import React from 'react';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Doughnut } from 'react-chartjs-2';
import { FaClipboardCheck, FaPlus } from 'react-icons/fa';

const planos = [
  { nome: 'Mutirão de exames laboratoriais', prazo: '20/06', status: 'Em execução', progresso: 64 },
  { nome: 'Reforço no combate à dengue', prazo: '28/06', status: 'Planejado', progresso: 35 },
  { nome: 'Reposição de estoque crítico', prazo: '14/06', status: 'Urgente', progresso: 48 },
];

const ExecPlanos = () => {
  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6"><FaPlus /> Novo Plano de Ação</button>

        <div className="ep-flex-col ep-gap-4">
          {planos.map((plano) => (
            <div key={plano.nome} className="ep-card ep-card--flat">
              <div className="ep-flex ep-items-center ep-gap-4">
                <div style={{ width: 74, height: 74, flexShrink: 0 }}>
                  <Doughnut
                    data={{ labels: ['Concluído', 'Restante'], datasets: [{ data: [plano.progresso, 100 - plano.progresso], backgroundColor: ['#ff9500', 'rgba(255,149,0,0.16)'], borderWidth: 0 }] }}
                    options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold"><FaClipboardCheck /> {plano.nome}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">Prazo: {plano.prazo} · Progresso: {plano.progresso}%</div>
                </div>
                <span className={`ep-badge ${plano.status === 'Urgente' ? 'ep-badge--error' : 'ep-badge--warning'}`}>{plano.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecPlanos;
