import React, { useState } from 'react';
import { FaPlus, FaSearch, FaTimes, FaUserShield } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Doughnut } from 'react-chartjs-2';

const CHART_COLORS = {
  success: '#00C48C',
  warning: '#FF9500',
};

const usuariosBase = [
  { nome: 'Ana Beatriz Lima', email: 'ana.lima@saude.gov.br', perfil: 'Coordenação UBS', status: 'Ativo' },
  { nome: 'Carlos Eduardo', email: 'carlos.eduardo@saude.gov.br', perfil: 'Transporte', status: 'Ativo' },
  { nome: 'Marina Sousa', email: 'marina.sousa@saude.gov.br', perfil: 'Ouvidoria', status: 'Pendente' },
];

const GestaoUsuarios = () => {
  const [usuarios, setUsuarios] = useState(usuariosBase);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', perfil: 'Coordenação UBS', status: 'Pendente' });
  const usuariosFiltrados = usuarios.filter((usuario) => `${usuario.nome} ${usuario.email} ${usuario.perfil}`.toLowerCase().includes(busca.toLowerCase()));

  const handleCreate = (event) => {
    event.preventDefault();
    const nome = novoUsuario.nome.trim() || 'Novo usuário';
    const email = novoUsuario.email.trim() || 'novo.usuario@saude.gov.br';
    setUsuarios([{ ...novoUsuario, nome, email }, ...usuarios]);
    setNovoUsuario({ nome: '', email: '', perfil: 'Coordenação UBS', status: 'Pendente' });
    setShowModal(false);
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  const usuariosAtivosData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{ data: [92, 101, 108, 116, 121, 128], backgroundColor: CHART_COLORS.success, borderRadius: 5 }],
  };

  const perfisPendentesData = {
    labels: ['Resolvidos', 'Pendentes'],
    datasets: [{ data: [124, 4], backgroundColor: ['rgba(52, 199, 89, 0.18)', CHART_COLORS.warning], borderWidth: 0 }],
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-flex ep-gap-3 ep-mb-6">
          <div className="ep-input-group" style={{ flex: 1, marginBottom: 0 }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-input">
              <FaSearch className="ep-text-muted" />
              <input type="text" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar usuário" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
            </div>
          </div>
          <button className="ep-btn ep-btn--primary" aria-label="Novo usuário" onClick={() => setShowModal(true)}>
            <FaPlus />
          </button>
        </div>

        <div className="ep-grid-2 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: 120, height: 58, flexShrink: 0 }}>
              <Bar data={usuariosAtivosData} options={chartOptions} />
            </div>
            <div>
              <div className="ep-text-sm ep-text-muted">Usuários ativos</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">128</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: 66, height: 66, flexShrink: 0 }}>
              <Doughnut data={perfisPendentesData} options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
            </div>
            <div>
              <div className="ep-text-sm ep-text-muted">Perfis pendentes</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">4</div>
            </div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Equipe cadastrada</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {usuariosFiltrados.map((usuario) => (
            <div key={usuario.email} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div className="ep-flex ep-items-center ep-gap-3">
                <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-success)', color: 'white' }}>
                  <FaUserShield />
                </div>
                <div>
                  <div className="ep-fw-bold">{usuario.nome}</div>
                  <div className="ep-text-xs ep-text-muted">{usuario.email}</div>
                  <div className="ep-text-xs ep-mt-1">{usuario.perfil}</div>
                </div>
              </div>
              <span className={`ep-badge ${usuario.status === 'Ativo' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                {usuario.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="ep-modal-overlay" onClick={() => setShowModal(false)}>
          <form className="ep-modal" style={{ maxWidth: 460 }} onClick={(event) => event.stopPropagation()} onSubmit={handleCreate}>
            <button type="button" className="ep-close-btn" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setShowModal(false)}><FaTimes /></button>
            <h3 className="ep-font-lg ep-fw-bold ep-mb-4">Novo usuário</h3>
            <div className="ep-input-group">
              <label className="ep-label">Nome</label>
              <input className="ep-input" value={novoUsuario.nome} onChange={(event) => setNovoUsuario({ ...novoUsuario, nome: event.target.value })} placeholder="Nome completo" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">E-mail</label>
              <input className="ep-input" type="email" value={novoUsuario.email} onChange={(event) => setNovoUsuario({ ...novoUsuario, email: event.target.value })} placeholder="usuario@saude.gov.br" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Perfil</label>
              <select className="ep-select" value={novoUsuario.perfil} onChange={(event) => setNovoUsuario({ ...novoUsuario, perfil: event.target.value })}>
                <option>Coordenação UBS</option>
                <option>Transporte</option>
                <option>Ouvidoria</option>
                <option>Contabilidade</option>
              </select>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--full" type="submit">Convidar usuário</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestaoUsuarios;
