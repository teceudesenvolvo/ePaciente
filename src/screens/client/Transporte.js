import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaLocationArrow, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const Transporte = () => {
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    justificativa: '',
    origem: '',
    destino: '',
    data: '',
    hora: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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
      </div>
    );
  }

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <button className="ep-back-btn" onClick={() => history.push('/inicio')}>
          <FaArrowLeft />
        </button>
        <h1 className="ep-page-title">Solicitar Transporte</h1>
      </div>
      
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
              <div style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-primary)' }}><FaLocationArrow /></div>
              <input 
                type="text" 
                className="ep-input" 
                style={{ paddingLeft: 44 }}
                placeholder="Meu endereço atual"
                required
                value={formData.origem}
                onChange={e => setFormData({...formData, origem: e.target.value})}
              />
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