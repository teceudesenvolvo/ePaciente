import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  FaArrowLeft, FaCheckCircle, FaUserMd, 
  FaStethoscope, FaTooth, FaHeartbeat, FaMapMarkerAlt 
} from 'react-icons/fa';

const Agendamento = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    especialidade: '',
    local: '',
    data: '',
    hora: ''
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <div className="ep-page-header">
        <button className="ep-back-btn" onClick={() => step > 1 ? handlePrev() : history.push('/inicio')}>
          <FaArrowLeft />
        </button>
        <h1 className="ep-page-title">Agendar Consulta</h1>
      </div>
      
      <div className="ep-content">
        {step < 4 && (
          <div className="ep-stepper">
            <div className={`ep-stepper__step ${step >= 1 ? 'ep-stepper__step--active' : ''}`}>
              <div className="ep-stepper__dot" style={{ background: step >= 1 ? 'var(--color-primary)' : 'var(--color-n200)' }}>{step > 1 ? <FaCheckCircle /> : 1}</div>
              <div className="ep-stepper__label">Especialidade</div>
            </div>
            <div className={`ep-stepper__step ${step >= 2 ? 'ep-stepper__step--active' : ''}`}>
              <div className="ep-stepper__dot" style={{ background: step >= 2 ? 'var(--color-primary)' : 'var(--color-n200)' }}>{step > 2 ? <FaCheckCircle /> : 2}</div>
              <div className="ep-stepper__label">Local</div>
            </div>
            <div className={`ep-stepper__step ${step >= 3 ? 'ep-stepper__step--active' : ''}`}>
              <div className="ep-stepper__dot" style={{ background: step >= 3 ? 'var(--color-primary)' : 'var(--color-n200)' }}>3</div>
              <div className="ep-stepper__label">Data & Hora</div>
            </div>
          </div>
        )}

        {/* Passo 1 */}
        {step === 1 && (
          <div className="ep-animate-fade-up">
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>O que você precisa hoje?</h3>
            <div className="ep-grid-2 ep-gap-4">
              <button
                className={`ep-card ep-flex-col ep-items-center ep-gap-2 ${formData.especialidade === 'Clinica Geral' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Clinica Geral'})}
              >
                <FaUserMd style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Clínica Geral</span>
              </button>
              <button
                className={`ep-card ep-flex-col ep-items-center ep-gap-2 ${formData.especialidade === 'Telemedicina' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Telemedicina'})}
              >
                <FaStethoscope style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Telemedicina</span>
                <span className="ep-badge ep-badge--success" style={{ position: 'absolute', top: -10 }}>Online</span>
              </button>
              <button
                className={`ep-card ep-flex-col ep-items-center ep-gap-2 ${formData.especialidade === 'Odontologia' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Odontologia'})}
              >
                <FaTooth style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Odontologia</span>
              </button>
              <button
                className={`ep-card ep-flex-col ep-items-center ep-gap-2 ${formData.especialidade === 'Cardiologia' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Cardiologia'})}
              >
                <FaHeartbeat style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Cardiologia</span>
              </button>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {step === 2 && (
          <div className="ep-animate-fade-in">
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Selecione a Unidade</h3>
            <div className="ep-flex-col ep-gap-3">
              <div
                className={`ep-card ${formData.local === 'UBS Centro' ? 'ep-card--active' : 'ep-card--flat'}`}
                onClick={() => setFormData({...formData, local: 'UBS Centro'})}
                style={{ cursor: 'pointer' }}
              >
                <div className="ep-flex ep-justify-between">
                  <div className="ep-fw-semibold">UBS Centro</div>
                  <span className="ep-badge ep-badge--success">1.2 km</span>
                </div>
                <div className="ep-text-sm ep-text-muted ep-mt-2 ep-flex ep-items-center ep-gap-2">
                  <FaMapMarkerAlt /> Rua Principal, 100
                </div>
              </div>

              <div 
                className={`ep-card ${formData.local === 'UBS Bairro Novo' ? 'ep-card--active' : 'ep-card--flat'}`}
                onClick={() => setFormData({...formData, local: 'UBS Bairro Novo'})}
                style={{ cursor: 'pointer' }}
              >
                <div className="ep-flex ep-justify-between">
                  <div className="ep-fw-semibold">UBS Bairro Novo</div>
                  <span className="ep-badge ep-badge--neutral">3.5 km</span>
                </div>
                <div className="ep-text-sm ep-text-muted ep-mt-2 ep-flex ep-items-center ep-gap-2">
                  <FaMapMarkerAlt /> Av. das Flores, 450
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {step === 3 && (
          <div className="ep-animate-fade-in">
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Quando?</h3>
            <div className="ep-input-group">
              <label className="ep-label">Data</label>
              <select 
                className="ep-select" 
                value={formData.data} 
                onChange={e => setFormData({...formData, data: e.target.value})}
              >
                <option value="">Selecione o dia...</option>
                <option value="10/06">Segunda-feira - 10/06</option>
                <option value="11/06">Terça-feira - 11/06</option>
                <option value="12/06">Quarta-feira - 12/06</option>
              </select>
            </div>

            <div className="ep-input-group">
              <label className="ep-label">Horário</label>
              <div className="ep-grid-3">
                {['08:00', '08:30', '09:00', '10:00', '14:00', '15:30'].map(h => (
                  <button 
                    key={h}
                    className={`ep-btn ep-btn--sm ${formData.hora === h ? 'ep-btn--primary' : 'ep-btn--ghost'}`}
                    onClick={() => setFormData({...formData, hora: h})}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Passo 4 - Sucesso */}
        {step === 4 && (
          <div className="ep-animate-scale-in ep-empty">
            <div className="ep-empty__icon" style={{ color: 'var(--color-success)', opacity: 1, fontSize: 64 }}>
              <FaCheckCircle />
            </div>
            <h2 className="ep-font-xl ep-fw-bold ep-mt-4">Agendado com Sucesso!</h2>
            <p className="ep-text-muted ep-mt-2">
              Sua consulta de <strong>{formData.especialidade}</strong> está confirmada para <strong>{formData.data} às {formData.hora}</strong>.
            </p>
            
            <div className="ep-card ep-card--flat ep-w-full ep-mt-6 ep-text-left">
              <div className="ep-text-sm ep-text-muted">Local</div>
              <div className="ep-fw-semibold">{formData.local}</div>
            </div>

            <button className="ep-btn ep-btn--secondary ep-btn--full ep-mt-6" onClick={() => history.push('/inicio')}>
              Voltar para o Início
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="ep-mt-6">
            <button 
              className="ep-btn ep-btn--primary ep-btn--full"
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.especialidade) ||
                (step === 2 && !formData.local) ||
                (step === 3 && (!formData.data || !formData.hora))
              }
            >
              {step === 3 ? 'Confirmar Agendamento' : 'Continuar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agendamento;