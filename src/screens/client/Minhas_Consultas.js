import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  FaCheckCircle, FaUserMd, FaUser, 
  FaStethoscope, FaTooth, FaHeartbeat, FaMapMarkerAlt, FaPlus, FaCalendarAlt, FaTimes
} from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Importe os estilos padrão do react-day-picker
import HeaderTop from '../../HeaderTop';

const MinhasConsultas = () => {
  const history = useHistory();
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ // Inicialize data como undefined para o DayPicker
    paciente: 'LEONARDO RIBEIRO',
    especialidade: '',
    local: '',
    data: undefined,
    hora: ''
  });
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [errorHolidays, setErrorHolidays] = useState(null);

  const dependentes = [
    { nome: 'PEDRO RIBEIRO' }
  ];

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoadingHolidays(true);
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        // Busca feriados para o ano atual e o próximo
        const responseCurrentYear = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/BR`);
        const responseNextYear = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${nextYear}/BR`);

        if (!responseCurrentYear.ok || !responseNextYear.ok) {
          throw new Error('Falha ao buscar feriados');
        }

        const holidaysCurrentYear = await responseCurrentYear.json();
        const holidaysNextYear = await responseNextYear.json();

        const allHolidays = [...holidaysCurrentYear, ...holidaysNextYear].map(h => new Date(h.date));
        setHolidays(allHolidays);
      } catch (error) {
        console.error("Erro ao buscar feriados:", error);
        setErrorHolidays("Não foi possível carregar os feriados.");
      } finally {
        setLoadingHolidays(false);
      }
    };

    fetchHolidays();
  }, []); // Executa apenas uma vez ao montar o componente

  const listaMinhasConsultas = [
    { id: 1, especialidade: "Clínica Geral", profissional: "Dr. Ricardo Santos", local: "UBS Centro", data: "10/06/2026", hora: "09:00", status: "Confirmada", icon: <FaUserMd /> },
    { id: 2, especialidade: "Odontologia", profissional: "Dra. Ana Julia", local: "UBS Bairro Novo", data: "15/06/2026", hora: "14:30", status: "Pendente", icon: <FaTooth /> }, // IDs únicos
    { id: 3, especialidade: "Cardiologia", profissional: "Dr. Pedro Almeida", local: "Hospital Municipal", data: "20/06/2026", hora: "10:00", status: "Confirmada", icon: <FaHeartbeat /> },
    { id: 4, especialidade: "Dermatologia", profissional: "Dra. Carla Lima", local: "Clínica da Pele", data: "25/06/2026", hora: "11:00", status: "Pendente", icon: <FaStethoscope /> },
    { id: 5, especialidade: "Oftalmologia", profissional: "Dr. Marcos Silva", local: "Centro Visão", data: "01/07/2026", hora: "16:00", status: "Confirmada", icon: <FaTooth /> }, // Usando FaTooth por enquanto, idealmente um ícone de olho
  ];

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleDateSelect = (date) => {
    setFormData({ ...formData, data: date });
  };

  if (!isScheduling) {
    return (
      <div className="ep-page">
        <HeaderTop>
          <button 
            className="ep-btn ep-btn--primary ep-flex ep-items-center ep-gap-2" 
            onClick={() => { setIsScheduling(true); setStep(1); }}
            style={{ padding: '10px 24px', borderRadius: '12px' }}
          >
            <FaPlus size={14} /> Agendar Consulta
          </button>
        </HeaderTop>

        <div 
          className="ep-content ep-animate-fade-up ep-gap-4"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' 
          }}
        >
         

          {listaMinhasConsultas.map((item) => (
            <div 
              key={item.id} 
              className="ep-card ep-card--flat" 
              style={{ cursor: 'pointer', padding: 'var(--sp-5)' }}
              onClick={() => setSelectedConsulta(item)}
            >
              <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                <div className="ep-flex ep-gap-3 ep-items-center">
                  <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px', fontSize: '20px' }}>
                    {item.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 className="ep-font-md ep-fw-bold">{item.especialidade}</h3>
                    <p className="ep-text-sm ep-text-muted">{item.profissional}</p>
                  </div>
                </div>
                <span className={`ep-badge ${item.status === 'Confirmada' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                  {item.status}
                </span>
              </div>
              <div className="ep-flex-col ep-gap-2">
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                  <FaCalendarAlt size={14} className="ep-text-primary" /> {item.data} às {item.hora}
                </div>
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                  <FaMapMarkerAlt size={14} className="ep-text-error" /> {item.local}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popup de Detalhes da Consulta */}
        {selectedConsulta && (
          <div 
            className="ep-modal-overlay ep-animate-fade-in" 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-4)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedConsulta(null)}
          >
            <div 
              className="ep-modal-content ep-animate-scale-in" 
              style={{ background: 'var(--color-white)', borderRadius: '32px', width: '100%', maxWidth: '440px', padding: 'var(--sp-8)', position: 'relative', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }} 
              onClick={e => e.stopPropagation()}
            >
              <button 
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--color-n50)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-n700)', zIndex: 10 }} 
                onClick={() => setSelectedConsulta(null)}
              >
                <FaTimes />
              </button>
              
              <div className="ep-modal-header" style={{ borderBottom: 'none', padding: 0, marginBottom: 'var(--sp-6)' }}>
                <h2 className="ep-modal-title">Detalhes da Consulta</h2>
              </div>
              
              <div className="ep-modal-body">
                <div className="ep-flex ep-items-center ep-gap-4 ep-mb-10">
                  <div className="ep-icon-wrapper ep-icon-wrapper--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                    {selectedConsulta.icon}
                  </div>
                  <div className="ep-flex-col">
                    <h3 className="ep-font-xl ep-fw-bold">{selectedConsulta.especialidade}</h3>
                    <span className={`ep-badge ${selectedConsulta.status === 'Confirmada' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                      {selectedConsulta.status}
                    </span>
                    <div className="ep-flex ep-items-center ep-gap-1 ep-mt-2 ep-text-muted">
                      <FaUserMd size={14} />
                      <span className="ep-text-sm">{selectedConsulta.profissional}</span>
                    </div>
                  </div>
                </div>

                <div className="ep-grid-2 ep-gap-4 ep-mb-8" style={{ margin: '20px' }}>
                  <div className="ep-info-card">
                    <div className="ep-info-card__icon ep-text-primary"><FaCalendarAlt /></div>
                    <div className="ep-info-card__content">
                      <span className="ep-label-xs">Data e Horário</span>
                      <p className="ep-value-sm">{selectedConsulta.data} às {selectedConsulta.hora}</p>
                    </div>
                  </div>

                  <div className="ep-info-card">
                    <div className="ep-info-card__icon ep-text-error"><FaMapMarkerAlt /></div>
                    <div className="ep-info-card__content">
                      <span className="ep-label-xs">Localização</span>
                      <p className="ep-value-sm">{selectedConsulta.local}</p>
                    </div>
                  </div>
                </div>

                <div className="ep-alert ep-alert--info ep-mb-4" style={{ margin: '20px' }}>
                  <span className="ep-alert__icon">💡</span>
                  <div className="ep-alert__text">Lembre-se de levar seu documento de identidade e o cartão do SUS.</div>
                </div>
              </div>

              <div className="ep-modal-footer ep-flex-col ep-gap-3">
                <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => setSelectedConsulta(null)}>
                  Entendido
                </button>
                <button className="ep-btn ep-btn--ghost ep-btn--full ep-text-error" onClick={() => setSelectedConsulta(null)}>
                  Cancelar Agendamento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop 
        customTitle="Agendar Consulta" 
        customClick={() => step > 1 ? handlePrev() : setIsScheduling(false)} 
      />
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
            <div className="ep-input-group ep-mb-8">
              <label className="ep-label">Quem irá realizar a consulta?</label>
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

            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>O que você precisa hoje?</h3>
            <div className="ep-grid-2 ep-gap-4">
              <button
                className={`ep-card ep-flex-col ep-items-start ep-gap-2 ${formData.especialidade === 'Clinica Geral' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Clinica Geral'})}
              >
                <FaUserMd style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Clínica Geral</span>
              </button>
              <button
                className={`ep-card ep-flex-col ep-items-start ep-gap-2 ${formData.especialidade === 'Telemedicina' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Telemedicina'})}
              >
                <FaStethoscope style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Telemedicina</span>
                <span className="ep-badge ep-badge--success" style={{ position: 'absolute', top: -10 }}>Online</span>
              </button>
              <button
                className={`ep-card ep-flex-col ep-items-start ep-gap-2 ${formData.especialidade === 'Odontologia' ? 'ep-card--active' : 'ep-card--flat'}`}
                style={{ borderRadius: '18px', padding: '24px' }}
                onClick={() => setFormData({...formData, especialidade: 'Odontologia'})}
              >
                <FaTooth style={{ fontSize: 28, color: 'var(--color-n900)' }} />
                <span className="ep-text-sm ep-fw-semibold">Odontologia</span>
              </button>
              <button
                className={`ep-card ep-flex-col ep-items-start ep-gap-2 ${formData.especialidade === 'Cardiologia' ? 'ep-card--active' : 'ep-card--flat'}`}
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
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Escolha o melhor momento</h3>
            
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: 'var(--sp-6)', 
                alignItems: 'start' 
              }}
            >
              <div className="ep-card ep-card--flat" style={{ padding: 'var(--sp-4)', background: 'var(--color-white)', borderRadius: '24px' }}>
                <div className="ep-label ep-mb-2 ep-flex ep-items-center ep-gap-2" style={{ fontSize: '15px', color: 'var(--color-n700)', fontWeight: '600' }}>
                  <FaCalendarAlt className="ep-text-primary" /> Selecione o dia
                </div>
                {loadingHolidays ? (
                  <div className="ep-flex ep-items-center ep-justify-center ep-p-10">
                    <p className="ep-text-muted">Sincronizando calendário...</p>
                  </div>
                ) : errorHolidays ? (
                  <p className="ep-text-error">{errorHolidays}</p>
                ) : (
                  <DayPicker
                    mode="single"
                    selected={formData.data}
                    onSelect={handleDateSelect}
                    disabled={[
                      { before: new Date() },
                      ...holidays.map(h => ({ date: h }))
                    ]}
                    modifiersStyles={{
                      disabled: { color: 'var(--color-n300)', background: 'var(--color-n50)' },
                      selected: { background: 'var(--color-primary)', color: 'white' }
                    }}
                    styles={{
                      caption: { color: 'var(--color-n900)', fontWeight: '700' },
                      head: { color: 'var(--color-n500)' },
                      day: { borderRadius: '12px', margin: '2px' },
                      day_selected: { background: 'var(--color-primary)', color: 'white', borderRadius: '12px' },
                      day_today: { fontWeight: 'bold', color: 'var(--color-primary)' },
                    }}
                    className="ep-day-picker"
                    locale={require('date-fns/locale/pt-BR')}
                    showOutsideDays
                  />
                )}
              </div>

              <div className="ep-card ep-card--flat" style={{ padding: 'var(--sp-6)', background: 'var(--color-white)', borderRadius: '24px' }}>
                <div className="ep-label ep-mb-4 ep-flex ep-items-center ep-gap-2" style={{ fontSize: '15px', color: 'var(--color-n700)', fontWeight: '600' }}>
                   Horários disponíveis
                </div>
                
                <div className="ep-flex-col ep-gap-6">
                  <div className="ep-flex ep-flex-col ep-gap-3">
                    <div className="ep-text-xs ep-text-muted ep-flex ep-items-center ep-gap-2">
                      <span role="img" aria-label="morning">☀️</span> Manhã
                    </div>
                    <div className="ep-flex ep-flex-wrap ep-gap-2">
                      {['08:00', '08:30', '09:00', '10:00', '11:00'].map(h => (
                        <button 
                          key={h}
                          className={`ep-btn ep-btn--sm ${formData.hora === h ? 'ep-btn--primary' : 'ep-btn--flat'}`}
                          style={{ 
                            minWidth: '76px', 
                            borderRadius: '14px',
                            background: formData.hora === h ? 'var(--color-primary)' : 'var(--color-n50)',
                            color: formData.hora === h ? 'white' : 'var(--color-n800)',
                            border: formData.hora === h ? 'none' : '1px solid var(--color-n100)'
                          }}
                          onClick={() => setFormData({...formData, hora: h})}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ep-flex ep-flex-col ep-gap-3">
                    <div className="ep-text-xs ep-text-muted ep-flex ep-items-center ep-gap-2">
                      <span role="img" aria-label="afternoon">🌇</span> Tarde
                    </div>
                    <div className="ep-flex ep-flex-wrap ep-gap-2">
                      {['14:00', '14:30', '15:00', '16:30', '17:00'].map(h => (
                        <button 
                          key={h}
                          className={`ep-btn ep-btn--sm ${formData.hora === h ? 'ep-btn--primary' : 'ep-btn--flat'}`}
                          style={{ 
                            minWidth: '76px', 
                            borderRadius: '14px',
                            background: formData.hora === h ? 'var(--color-primary)' : 'var(--color-n50)',
                            color: formData.hora === h ? 'white' : 'var(--color-n800)',
                            border: formData.hora === h ? 'none' : '1px solid var(--color-n100)'
                          }}
                          onClick={() => setFormData({...formData, hora: h})}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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
            <p className="ep-text-muted ep-mt-2 ep-text-center ep-mb-8">
              Sua consulta de <strong>{formData.especialidade}</strong> está confirmada para <strong>{formData.data ? formData.data.toLocaleDateString('pt-BR') : ''} às {formData.hora}</strong>.
            </p>
            
            <div className="ep-card ep-card--flat ep-w-full ep-flex ep-items-center ep-gap-4" style={{ textAlign: 'left', padding: 'var(--sp-4)', background: 'var(--color-n50)', borderRadius: '20px' }}>
              <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px' }}>
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="ep-text-xs ep-text-muted">Local de atendimento</div>
                <div className="ep-fw-bold" style={{ fontSize: '15px' }}>{formData.local}</div>
              </div>
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

export default MinhasConsultas;
