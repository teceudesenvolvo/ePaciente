import React, { useState } from 'react';
import { FaLock, FaPlus, FaTimes } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar } from 'react-chartjs-2';

const CHART_COLORS = {
  primary: '#007AFF',
};

const funcoesBase = [
  { nome: 'Administrador da Secretaria', usuarios: 3, permissoes: 'Acesso total' },
  { nome: 'Gestor de Unidade', usuarios: 9, permissoes: 'Agenda, pacientes e estoque' },
  { nome: 'Atendente Ouvidoria', usuarios: 4, permissoes: 'Protocolos e respostas' },
  { nome: 'Regulador de Transporte', usuarios: 5, permissoes: 'Solicitações e frota' },
];

const GestaoFuncoes = () => {
  const [funcoes, setFuncoes] = useState(funcoesBase);
  const [showModal, setShowModal] = useState(false);
  const [novaFuncao, setNovaFuncao] = useState({ nome: '', permissoes: '', usuarios: 1 });

  const handleCreate = (event) => {
    event.preventDefault();
    setFuncoes([
      {
        nome: novaFuncao.nome.trim() || 'Nova função operacional',
        permissoes: novaFuncao.permissoes.trim() || 'Acesso aos módulos selecionados',
        usuarios: Number(novaFuncao.usuarios),
      },
      ...funcoes,
    ]);
    setNovaFuncao({ nome: '', permissoes: '', usuarios: 1 });
    setShowModal(false);
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
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6" onClick={() => setShowModal(true)}>
          <FaPlus /> Nova Função
        </button>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Perfis e permissões</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {funcoes.map((funcao) => (
            <div key={funcao.nome} className="ep-card ep-card--flat">
              <div className="ep-flex ep-items-center ep-gap-3">
                <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}>
                  <FaLock />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ep-fw-bold">{funcao.nome}</div>
                  <div className="ep-text-sm ep-text-muted">{funcao.permissoes}</div>
                </div>
                <div style={{ width: 96, height: 34 }}>
                  <Bar
                    data={{ labels: ['Usuários'], datasets: [{ data: [funcao.usuarios], backgroundColor: CHART_COLORS.primary, borderRadius: 6 }] }}
                    options={chartOptions}
                  />
                </div>
                <span className="ep-badge ep-badge--primary">{funcao.usuarios} usuários</span>
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
            <h3 className="ep-font-lg ep-fw-bold ep-mb-4">Nova função</h3>
            <div className="ep-input-group">
              <label className="ep-label">Nome da função</label>
              <input className="ep-input" value={novaFuncao.nome} onChange={(event) => setNovaFuncao({ ...novaFuncao, nome: event.target.value })} placeholder="Ex: Coordenador de vacinação" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Permissões</label>
              <textarea className="ep-input" style={{ height: 88, paddingTop: 12 }} value={novaFuncao.permissoes} onChange={(event) => setNovaFuncao({ ...novaFuncao, permissoes: event.target.value })} placeholder="Ex: campanhas, estoque e relatórios" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Usuários vinculados</label>
              <input className="ep-input" type="number" min="0" value={novaFuncao.usuarios} onChange={(event) => setNovaFuncao({ ...novaFuncao, usuarios: event.target.value })} />
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--full" type="submit">Salvar função</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestaoFuncoes;
