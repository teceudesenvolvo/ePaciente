import React from 'react';
import { FaPlus, FaPaperPlane } from 'react-icons/fa';
import '../../utils/chartSetup';
import { Bar, Doughnut } from 'react-chartjs-2';

const GestaoCampanhas = () => {
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Campanhas e Notificações</h1>
      </div>
      
      <div className="ep-content">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6">
          <FaPlus /> Nova Campanha
        </button>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Campanhas Ativas (1)</h3>
        </div>

        <div className="ep-flex-col ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <div className="ep-flex ep-justify-between">
              <div>
                <div className="ep-fw-bold">Vacinação contra Gripe</div>
                <div className="ep-text-sm ep-text-muted ep-mt-1">Público: Idosos 60+</div>
              </div>
              <span className="ep-badge ep-badge--primary">Ativa</span>
            </div>
            <div className="ep-grid-2 ep-gap-4 ep-mt-4">
              <div style={{ height: 58 }}>
                <Bar
                  data={{ labels: ['Enviadas', 'Entregues', 'Abertas'], datasets: [{ data: [4500, 4210, 1440], backgroundColor: ['#5856d6', '#5ac8fa', 'var(--color-success)'], borderRadius: 6 }] }}
                  options={chartOptions}
                />
              </div>
              <div className="ep-flex ep-items-center ep-gap-3">
                <div style={{ width: 58, height: 58 }}>
                  <Doughnut
                    data={{ labels: ['Abertura', 'Não aberta'], datasets: [{ data: [32, 68], backgroundColor: ['var(--color-success)', 'rgba(52, 199, 89, 0.14)'], borderWidth: 0 }] }}
                    options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                  />
                </div>
                <span className="ep-text-xs ep-text-muted">Taxa de abertura · 32%</span>
              </div>
            </div>
          </div>

          <div className="ep-card ep-card--flat" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <div className="ep-flex ep-justify-between">
              <div>
                <div className="ep-fw-bold">Combate à Dengue</div>
                <div className="ep-text-sm ep-text-muted ep-mt-1">Público: Todos</div>
              </div>
              <span className="ep-badge ep-badge--warning">Programada</span>
            </div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Envio Rápido (Push)</h3>
        </div>

        <form className="ep-card ep-card--flat">
          <div className="ep-input-group">
            <label className="ep-label">Título da Notificação</label>
            <input type="text" className="ep-input" placeholder="Ex: UBS Centro fechada amanhã" />
          </div>
          <div className="ep-input-group">
            <label className="ep-label">Mensagem</label>
            <textarea className="ep-input" style={{ height: '80px', paddingTop: '12px' }} placeholder="Digite a mensagem..."></textarea>
          </div>
          <div className="ep-input-group">
            <label className="ep-label">Público Alvo</label>
            <select className="ep-select">
              <option>Todos os cidadãos</option>
              <option>Pacientes UBS Centro</option>
              <option>Mulheres 40-60 anos</option>
            </select>
          </div>
          <button type="button" className="ep-btn ep-btn--secondary ep-btn--full ep-mt-4">
            <FaPaperPlane /> Enviar Agora
          </button>
        </form>

      </div>
    </div>
  );
};

export default GestaoCampanhas;
