import React, { useState } from 'react';
import { FaPlus, FaPaperPlane, FaTimes } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Doughnut } from 'react-chartjs-2';

const CHART_COLORS = {
  success: '#00C48C',
};

const GestaoCampanhas = () => {
  const [campanhas, setCampanhas] = useState([
    { nome: 'Vacinação contra Gripe', publico: 'Idosos 60+', status: 'Ativa', tone: 'primary' },
    { nome: 'Combate à Dengue', publico: 'Todos', status: 'Programada', tone: 'warning' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [novaCampanha, setNovaCampanha] = useState({ nome: '', publico: 'Todos', status: 'Programada' });
  const [push, setPush] = useState({ titulo: '', mensagem: '', publico: 'Todos os cidadãos' });
  const [ultimoEnvio, setUltimoEnvio] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    setCampanhas([
      {
        nome: novaCampanha.nome.trim() || 'Nova campanha de saúde',
        publico: novaCampanha.publico,
        status: novaCampanha.status,
        tone: novaCampanha.status === 'Ativa' ? 'primary' : 'warning',
      },
      ...campanhas,
    ]);
    setNovaCampanha({ nome: '', publico: 'Todos', status: 'Programada' });
    setShowModal(false);
  };

  const handleSendPush = () => {
    const titulo = push.titulo.trim() || 'Aviso da Secretaria de Saúde';
    setUltimoEnvio(`${titulo} enviado para ${push.publico}`);
    setPush({ titulo: '', mensagem: '', publico: 'Todos os cidadãos' });
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      
      <div className="ep-content">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6" onClick={() => setShowModal(true)}>
          <FaPlus /> Nova Campanha
        </button>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Campanhas ({campanhas.length})</h3>
        </div>

        <div className="ep-flex-col ep-gap-4 ep-mb-6">
          {campanhas.map((campanha, index) => (
          <div key={`${campanha.nome}-${index}`} className="ep-card ep-card--flat" style={{ borderLeft: `4px solid var(--color-${campanha.tone})` }}>
            <div className="ep-flex ep-justify-between">
              <div>
                <div className="ep-fw-bold">{campanha.nome}</div>
                <div className="ep-text-sm ep-text-muted ep-mt-1">Público: {campanha.publico}</div>
              </div>
              <span className={`ep-badge ${campanha.status === 'Ativa' ? 'ep-badge--primary' : 'ep-badge--warning'}`}>{campanha.status}</span>
            </div>
            {campanha.status === 'Ativa' && (
            <div className="ep-grid-2 ep-gap-4 ep-mt-4">
              <div style={{ height: 58 }}>
                <Bar
                  data={{ labels: ['Enviadas', 'Entregues', 'Abertas'], datasets: [{ data: [4500, 4210, 1440], backgroundColor: ['#5856d6', '#5ac8fa', CHART_COLORS.success], borderRadius: 6 }] }}
                  options={chartOptions}
                />
              </div>
              <div className="ep-flex ep-items-center ep-gap-3">
                <div style={{ width: 58, height: 58 }}>
                  <Doughnut
                    data={{ labels: ['Abertura', 'Não aberta'], datasets: [{ data: [32, 68], backgroundColor: [CHART_COLORS.success, 'rgba(52, 199, 89, 0.14)'], borderWidth: 0 }] }}
                    options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                  />
                </div>
                <span className="ep-text-xs ep-text-muted">Taxa de abertura · 32%</span>
              </div>
            </div>
            )}
          </div>
          ))}
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Envio Rápido (Push)</h3>
        </div>

        <form className="ep-card ep-card--flat">
          <div className="ep-input-group">
            <label className="ep-label">Título da Notificação</label>
            <input type="text" className="ep-input" value={push.titulo} onChange={(event) => setPush({ ...push, titulo: event.target.value })} placeholder="Ex: UBS Centro fechada amanhã" />
          </div>
          <div className="ep-input-group">
            <label className="ep-label">Mensagem</label>
            <textarea className="ep-input" style={{ height: '80px', paddingTop: '12px' }} value={push.mensagem} onChange={(event) => setPush({ ...push, mensagem: event.target.value })} placeholder="Digite a mensagem..."></textarea>
          </div>
          <div className="ep-input-group">
            <label className="ep-label">Público Alvo</label>
            <select className="ep-select" value={push.publico} onChange={(event) => setPush({ ...push, publico: event.target.value })}>
              <option>Todos os cidadãos</option>
              <option>Pacientes UBS Centro</option>
              <option>Mulheres 40-60 anos</option>
            </select>
          </div>
          {ultimoEnvio && <div className="ep-alert ep-alert--success ep-mb-4">{ultimoEnvio}</div>}
          <button type="button" className="ep-btn ep-btn--secondary ep-btn--full ep-mt-4" onClick={handleSendPush}>
            <FaPaperPlane /> Enviar Agora
          </button>
        </form>

      </div>

      {showModal && (
        <div className="ep-modal-overlay" onClick={() => setShowModal(false)}>
          <form className="ep-modal" style={{ maxWidth: 460 }} onClick={(event) => event.stopPropagation()} onSubmit={handleCreate}>
            <button type="button" className="ep-close-btn" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setShowModal(false)}><FaTimes /></button>
            <h3 className="ep-font-lg ep-fw-bold ep-mb-4">Nova campanha</h3>
            <div className="ep-input-group">
              <label className="ep-label">Nome</label>
              <input className="ep-input" value={novaCampanha.nome} onChange={(event) => setNovaCampanha({ ...novaCampanha, nome: event.target.value })} placeholder="Ex: Saúde da mulher" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Público</label>
              <select className="ep-select" value={novaCampanha.publico} onChange={(event) => setNovaCampanha({ ...novaCampanha, publico: event.target.value })}>
                <option>Todos</option>
                <option>Idosos 60+</option>
                <option>Gestantes</option>
                <option>Crianças até 5 anos</option>
              </select>
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={novaCampanha.status} onChange={(event) => setNovaCampanha({ ...novaCampanha, status: event.target.value })}>
                <option>Programada</option>
                <option>Ativa</option>
              </select>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--full" type="submit">Salvar campanha</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestaoCampanhas;
