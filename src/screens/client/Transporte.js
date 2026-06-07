import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaLocationArrow, FaCalendarAlt, FaCheckCircle, 
  FaPlus, FaBus, FaTimes, FaUser 
} from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const Transporte = () => {
  const history = useHistory();
  const [isScheduling, setIsScheduling] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedViagem, setSelectedViagem] = useState(null);
  
  const [formData, setFormData] = useState({
    paciente: 'LEONARDO RIBEIRO',
    justificativa: '',
    origem: '',
    destino: '',
    data: '',
    hora: ''
  });

  const listaMinhasViagens = [
    { id: 1, origem: "Rua Principal, 100", destino: "Hospital Municipal", data: "12/06/2026", hora: "08:00", status: "Confirmado", justificativa: "Tratamento de Fisioterapia" },
    { id: 2, origem: "Av. das Flores, 450", destino: "Clínica Especializada", data: "15/06/2026", hora: "14:30", status: "Em Análise", justificativa: "Consulta com Especialista" },
  ];

  const dependentes = [
    { nome: 'PEDRO RIBEIRO' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!isScheduling) {
    return (
      <div className="ep-page" style={{ background: '#f5f5f7' }}>
        <HeaderTop customTitle="Meus Transportes">
          <button 
            className="ep-btn ep-btn--primary ep-flex ep-items-center ep-gap-2" 
            onClick={() => { setIsScheduling(true); setIsSubmitted(false); }}
            style={{ padding: '10px 24px', borderRadius: '12px' }}
          >
            <FaPlus size={14} /> Solicitar Transporte
          </button>
        </HeaderTop>

        <div className="ep-content ep-animate-fade-up">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
              gap: 'var(--sp-4)' 
            }}
          >
            {listaMinhasViagens.map((item) => (
              <div 
                key={item.id} 
                className="ep-card ep-card--flat" 
                style={{ cursor: 'pointer', padding: 'var(--sp-5)' }}
                onClick={() => setSelectedViagem(item)}
              >
                <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                  <div className="ep-flex ep-gap-3 ep-items-center">
                    <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px' }}>
                      <FaBus />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h3 className="ep-font-md ep-fw-bold">{item.destino}</h3>
                      <p className="ep-text-sm ep-text-muted">{item.data} às {item.hora}</p>
                    </div>
                  </div>
                  <span className={`ep-badge ${item.status === 'Confirmado' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                  <FaLocationArrow size={12} className="ep-text-primary" /> {item.origem}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup de Detalhes */}
        {selectedViagem && (
          <div className="ep-modal-overlay" onClick={() => setSelectedViagem(null)}>
            <div className="ep-modal" onClick={e => e.stopPropagation()}>
              <button className="ep-close-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setSelectedViagem(null)}><FaTimes /></button>
              <h2 className="ep-modal-title ep-mb-6">Detalhes do Transporte</h2>
              
              <div className="ep-flex-col ep-gap-6 ep-mb-8">
                <div className="ep-flex ep-items-center ep-gap-4">
                  <div className="ep-icon-wrapper ep-icon-wrapper--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}><FaBus /></div>
                  <div>
                    <h3 className="ep-font-lg ep-fw-bold">{selectedViagem.destino}</h3>
                    <span className={`ep-badge ${selectedViagem.status === 'Confirmado' ? 'ep-badge--success' : 'ep-badge--warning'}`}>{selectedViagem.status}</span>
                  </div>
                </div>
                
                <div className="ep-alert ep-alert--info">
                  <div className="ep-fw-semibold ep-mb-1">Justificativa:</div>
                  <div className="ep-text-sm">{selectedViagem.justificativa}</div>
                </div>
              </div>
              <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => setSelectedViagem(null)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="ep-page ep-flex-col ep-items-center ep-justify-center" style={{ height: '100vh', padding: 'var(--sp-6)' }}>
        <div className="ep-empty__icon" style={{ color: 'var(--color-success)', opacity: 1, fontSize: 64 }}>
          <FaCheckCircle />
        </div>
        <h2 className="ep-font-xl ep-fw-bold ep-mt-4 ep-text-center">Solicitação Enviada!</h2>
        <p className="ep-text-muted ep-mt-2 ep-text-center">
          Sua solicitação de transporte está em análise pela Secretaria de Saúde. Você será notificado sobre a aprovação.
        </p>
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mt-6" onClick={() => history.push('/inicio')}>
          Voltar para o Início
        </button>
        <button className="ep-btn ep-btn--secondary ep-btn--full ep-mt-6" onClick={() => setIsScheduling(false)}>
          Voltar para Meus Transportes
        </button>
      </div>
    );
  }

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop 
        customTitle="Solicitar Transporte" 
        customClick={() => setIsScheduling(false)} 
      />
      
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-alert ep-alert--info ep-mb-6">
          <span className="ep-alert__icon">ℹ️</span>
          <div>
            <div className="ep-alert__title">Critérios de Uso</div>
            <div className="ep-alert__text">Serviço destinado a pacientes com mobilidade reduzida ou residentes na zona rural.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="ep-card ep-card--flat">
          <div className="ep-input-group">
            <label className="ep-label">Paciente</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-primary)', pointerEvents: 'none', zIndex: 1 }}><FaUser /></div>
              <select 
                className="ep-select" 
                style={{ paddingLeft: 44 }}
                required
                value={formData.paciente}
                onChange={e => setFormData({...formData, paciente: e.target.value})}
              >
                <option value="LEONARDO RIBEIRO">LEONARDO RIBEIRO (Titular)</option>
                {dependentes.map((dep, idx) => (
                  <option key={idx} value={dep.nome}>{dep.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="ep-input-group">
            <label className="ep-label">Justificativa Médica</label>
            <textarea 
              className="ep-input" 
              style={{ height: '80px', paddingTop: '12px' }}
              placeholder="Ex: Tratamento de hemodiálise, dificuldade de locomoção..."
              required
              value={formData.justificativa}
              onChange={e => setFormData({...formData, justificativa: e.target.value})}
            />
          </div>

          <div className="ep-divider"></div>

          <h3 className="ep-section-subtitle ep-mb-3 ep-fw-bold">Trajeto</h3>

          <div className="ep-input-group">
            <label className="ep-label">Local de Origem</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-primary)', pointerEvents: 'none', zIndex: 1 }}><FaLocationArrow /></div>
              <select 
                className="ep-select" 
                style={{ paddingLeft: 44 }}
                required
                value={formData.origem}
                onChange={e => setFormData({...formData, origem: e.target.value})}
              >
                <option value="">Selecione o local de partida...</option>
                <option value="Minha Residência">Minha Residência</option>
                <option value="Secretaria de Saúde">Secretaria de Saúde</option>
                <option value="UBS Centro">UBS Centro</option>
                <option value="UBS Bairro Novo">UBS Bairro Novo</option>
              </select>
            </div>
          </div>

          <div className="ep-input-group">
            <label className="ep-label">Local de Destino (Unidade de Saúde)</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-error)' }}><FaMapMarkerAlt /></div>
              <select 
                className="ep-select" 
                style={{ paddingLeft: 44 }}
                required
                value={formData.destino}
                onChange={e => setFormData({...formData, destino: e.target.value})}
              >
                <option value="">Selecione o destino...</option>
                <option value="UBS Centro">UBS Centro</option>
                <option value="Hospital Municipal">Hospital Municipal</option>
                <option value="Clínica Especializada">Clínica Especializada</option>
              </select>
            </div>
          </div>

          <div className="ep-divider"></div>

          <h3 className="ep-section-subtitle ep-mb-3 ep-fw-bold">Data do Compromisso</h3>

          <div className="ep-grid-2">
            <div className="ep-input-group">
              <label className="ep-label">Data</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-n400)' }}><FaCalendarAlt /></div>
                <input 
                  type="date" 
                  className="ep-input" 
                  style={{ paddingLeft: 44 }}
                  required
                  value={formData.data}
                  onChange={e => setFormData({...formData, data: e.target.value})}
                />
              </div>
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Horário da Consulta</label>
              <input 
                type="time" 
                className="ep-input" 
                required
                value={formData.hora}
                onChange={e => setFormData({...formData, hora: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="ep-btn ep-btn--primary ep-btn--full ep-mt-6">
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transporte;