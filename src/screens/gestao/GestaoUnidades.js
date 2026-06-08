import React, { useState } from 'react';
import { FaClinicMedical, FaPlus, FaTimes } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar } from 'react-chartjs-2';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
};

const unidadesBase = [
  { nome: 'UBS Centro', bairro: 'Centro', equipe: 18, status: 'Operacional', ocupacao: 62 },
  { nome: 'UBS Curu', bairro: 'Zona Rural', equipe: 11, status: 'Operacional', ocupacao: 48 },
  { nome: 'Hospital Municipal', bairro: 'Centro', equipe: 42, status: 'Atenção', ocupacao: 86 },
];

const GestaoUnidades = () => {
  const [unidades, setUnidades] = useState(unidadesBase);
  const [showModal, setShowModal] = useState(false);
  const [novaUnidade, setNovaUnidade] = useState({ nome: '', bairro: '', equipe: 8, status: 'Operacional', ocupacao: 35 });

  const handleCreate = (event) => {
    event.preventDefault();
    const nome = novaUnidade.nome.trim() || 'Nova Unidade de Saúde';
    const bairro = novaUnidade.bairro.trim() || 'Centro';
    setUnidades([{ ...novaUnidade, nome, bairro, equipe: Number(novaUnidade.equipe), ocupacao: Number(novaUnidade.ocupacao) }, ...unidades]);
    setNovaUnidade({ nome: '', bairro: '', equipe: 8, status: 'Operacional', ocupacao: 35 });
    setShowModal(false);
  };

  const chartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false, max: 100 }, y: { display: false } },
    colors: { color: 'var(--color-text)' },
    lineColor: '#ccc',
    barColor: '#ccc',
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6" onClick={() => setShowModal(true)}>
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
                        backgroundColor: unidade.ocupacao > 80 ? CHART_COLORS.warning : CHART_COLORS.success,
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

      {showModal && (
        <div className="ep-modal-overlay" onClick={() => setShowModal(false)}>
          <form className="ep-modal" style={{ maxWidth: 460 }} onClick={(event) => event.stopPropagation()} onSubmit={handleCreate}>
            <button type="button" className="ep-close-btn" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <h3 className="ep-font-lg ep-fw-bold ep-mb-4">Nova unidade</h3>
            <div className="ep-input-group">
              <label className="ep-label">Nome</label>
              <input className="ep-input" value={novaUnidade.nome} onChange={(event) => setNovaUnidade({ ...novaUnidade, nome: event.target.value })} placeholder="Ex: UBS Lagoa Nova" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Bairro</label>
              <input className="ep-input" value={novaUnidade.bairro} onChange={(event) => setNovaUnidade({ ...novaUnidade, bairro: event.target.value })} placeholder="Ex: Lagoa Nova" />
            </div>
            <div className="ep-grid-2 ep-gap-3">
              <div className="ep-input-group">
                <label className="ep-label">Equipe</label>
                <input className="ep-input" type="number" min="1" value={novaUnidade.equipe} onChange={(event) => setNovaUnidade({ ...novaUnidade, equipe: event.target.value })} />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Ocupação</label>
                <input className="ep-input" type="number" min="0" max="100" value={novaUnidade.ocupacao} onChange={(event) => setNovaUnidade({ ...novaUnidade, ocupacao: event.target.value })} />
              </div>
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={novaUnidade.status} onChange={(event) => setNovaUnidade({ ...novaUnidade, status: event.target.value })}>
                <option>Operacional</option>
                <option>Atenção</option>
              </select>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--full" type="submit">Salvar unidade</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestaoUnidades;
