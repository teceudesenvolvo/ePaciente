import React from 'react';
import { FaBullhorn, FaPlus, FaPaperPlane } from 'react-icons/fa';

const GestaoCampanhas = () => {
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
          <h3 className="ep-section-title">Campanhas Ativas</h3>
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
            <div className="ep-mt-3 ep-text-xs">
              <span className="ep-fw-semibold">Métricas:</span> 4.5k notificações enviadas · 32% taxa de abertura
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
