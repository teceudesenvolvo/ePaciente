import React, { useState, useEffect } from 'react';
import { 
  FaVial, FaFileMedicalAlt, FaCheckCircle, 
  FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaTimes 
} from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import HeaderTop from '../../HeaderTop';

const Exames = () => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedExame, setSelectedExame] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipo: '',
    local: '',
    data: undefined,
    hora: ''
  });
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [errorHolidays, setErrorHolidays] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoadingHolidays(true);
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const responseCurrentYear = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/BR`);
        const responseNextYear = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${nextYear}/BR`);

        if (!responseCurrentYear.ok || !responseNextYear.ok) throw new Error('Falha ao buscar feriados');

        const holidaysCurrentYear = await responseCurrentYear.json();
        const holidaysNextYear = await responseNextYear.json();
        const allHolidays = [...holidaysCurrentYear, ...holidaysNextYear].map(h => new Date(h.date));
        setHolidays(allHolidays);
      } catch (error) {
        setErrorHolidays("Não foi possível carregar os feriados.");
      } finally {
        setLoadingHolidays(false);
      }
    };
    fetchHolidays();
  }, []);

  const listaMeusExames = [
    { id: 1, tipo: "Hemograma Completo", local: "Laboratório Central", data: "12/05/2026", status: "Pronto", icon: <FaVial />, resultado: "Disponível para download" },
    { id: 2, tipo: "Glicemia em Jejum", local: "UBS Centro", data: "15/05/2026", status: "Pronto", icon: <FaVial />, resultado: "Disponível para download" },
    { id: 3, tipo: "Raio-X de Tórax", local: "Hospital Municipal", data: "02/06/2026", status: "Em Análise", icon: <FaFileMedicalAlt />, resultado: "Aguardando laudo" },
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
            <FaPlus size={14} /> Agendar Exame
          </button>
        </HeaderTop>

        <div 
          className="ep-content ep-animate-fade-up ep-gap-4"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' 
          }}
        >
          

          {listaMeusExames.map((item) => (
            <div 
              key={item.id} 
              className="ep-card ep-card--flat" 
              style={{ cursor: 'pointer', padding: 'var(--sp-5)' }}
              onClick={() => setSelectedExame(item)}
            >
              <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                <div className="ep-flex ep-gap-3 ep-items-center">
                  <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px', fontSize: '20px' }}>
                    {item.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 className="ep-font-md ep-fw-bold">{item.tipo}</h3>
                    <p className="ep-text-sm ep-text-muted">{item.local}</p>
                  </div>
                </div>
                <span className={`ep-badge ${item.status === 'Pronto' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                  {item.status}
                </span>
              </div>
              <div className="ep-flex-col ep-gap-2">
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                  <FaCalendarAlt size={14} className="ep-text-primary" /> Coletado em {item.data}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popup de Detalhes do Exame */}
        {selectedExame && (
          <div className="ep-modal-overlay" onClick={() => setSelectedExame(null)}>
            <div className="ep-modal" onClick={e => e.stopPropagation()}>
              <button 
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--color-n50)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-n700)', zIndex: 10 }} 
                onClick={() => setSelectedExame(null)}
              >
                <FaTimes />
              </button>
              
              <div className="ep-modal-header" style={{ borderBottom: 'none', padding: 0, marginBottom: 'var(--sp-6)' }}>
                <h2 className="ep-modal-title">Detalhes do Exame</h2>
              </div>
              
              <div className="ep-modal-body">
                <div className="ep-flex ep-items-center ep-gap-4 ep-mb-10">
                  <div className="ep-icon-wrapper ep-icon-wrapper--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                    {selectedExame.icon}
                  </div>
                  <div className="ep-flex-col">
                    <h3 className="ep-font-xl ep-fw-bold">{selectedExame.tipo}</h3>
                    <span className={`ep-badge ${selectedExame.status === 'Pronto' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                      {selectedExame.status}
                    </span>
                  </div>
                </div>

                <div className="ep-grid-2 ep-gap-4 ep-mb-8">
                  <div className="ep-info-card">
                    <div className="ep-info-card__icon ep-text-primary"><FaCalendarAlt /></div>
                    <div className="ep-info-card__content">
                      <span className="ep-label-xs">Data de Coleta</span>
                      <p className="ep-value-sm">{selectedExame.data}</p>
                    </div>
                  </div>

                  <div className="ep-info-card">
                    <div className="ep-info-card__icon ep-text-error"><FaMapMarkerAlt /></div>
                    <div className="ep-info-card__content">
                      <span className="ep-label-xs">Localização</span>
                      <p className="ep-value-sm">{selectedExame.local}</p>
                    </div>
                  </div>
                </div>

                {selectedExame.status === 'Pronto' && (
                  <div className="ep-alert ep-alert--info ep-mb-4">
                    <span className="ep-alert__icon">📄</span>
                    <div className="ep-alert__text">{selectedExame.resultado}</div>
                  </div>
                )}
              </div>

              <div className="ep-modal-footer ep-flex-col ep-gap-3">
                {selectedExame.status === 'Pronto' && (
                  <button className="ep-btn ep-btn--primary ep-btn--full">
                    Download Resultado
                  </button>
                )}
                <button className="ep-btn ep-btn--ghost ep-btn--full" onClick={() => setSelectedExame(null)}>
                  Fechar
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
        customTitle="Agendar Exame" 
        customClick={() => step > 1 ? handlePrev() : setIsScheduling(false)} 
      />
      
      <div className="ep-content">
        {step < 4 && (
          <div className="ep-stepper">
            <div className={`ep-stepper__step ${step >= 1 ? 'ep-stepper__step--active' : ''}`}>
              <div className="ep-stepper__dot" style={{ background: step >= 1 ? 'var(--color-primary)' : 'var(--color-n200)' }}>{step > 1 ? <FaCheckCircle /> : 1}</div>
              <div className="ep-stepper__label">Tipo</div>
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

        {/* Passo 1: Seleção de Tipo de Exame */}
        {step === 1 && (
          <div className="ep-animate-fade-up">
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Qual exame deseja agendar?</h3>
            <div className="ep-grid-2 ep-gap-4">
              {[
                { id: 'hemograma', label: 'Hemograma', icon: <FaVial /> },
                { id: 'glicemia', label: 'Glicemia', icon: <FaVial /> },
                { id: 'raiox', label: 'Raio-X', icon: <FaFileMedicalAlt /> },
                { id: 'ultrassom', label: 'Ultrassom', icon: <FaFileMedicalAlt /> }
              ].map(item => (
                <button
                  key={item.id}
                  className={`ep-card ep-flex-col ep-items-center ep-gap-2 ${formData.tipo === item.label ? 'ep-card--active' : 'ep-card--flat'}`}
                  style={{ borderRadius: '18px', padding: '24px' }}
                  onClick={() => setFormData({...formData, tipo: item.label})}
                >
                  <div style={{ fontSize: 28, color: 'var(--color-n900)' }}>{item.icon}</div>
                  <span className="ep-text-sm ep-fw-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Passo 2: Seleção de Unidade */}
        {step === 2 && (
          <div className="ep-animate-fade-in">
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Selecione o Laboratório</h3>
            <div className="ep-flex-col ep-gap-3">
              {[
                { name: 'Laboratório Central', address: 'Rua das Coletas, 100', dist: '1.2 km' },
                { name: 'UBS Centro', address: 'Rua Principal, 500', dist: '3.5 km' }
              ].map(item => (
                <div
                  key={item.name}
                  className={`ep-card ${formData.local === item.name ? 'ep-card--active' : 'ep-card--flat'}`}
                  onClick={() => setFormData({...formData, local: item.name})}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="ep-flex ep-justify-between">
                    <div className="ep-fw-semibold">{item.name}</div>
                    <span className="ep-badge ep-badge--success">{item.dist}</span>
                  </div>
                  <div className="ep-text-sm ep-text-muted ep-mt-2 ep-flex ep-items-center ep-gap-2">
                    <FaMapMarkerAlt /> {item.address}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passo 3: Data e Hora */}
        {step === 3 && (
          <div className="ep-animate-fade-in">
            <h3 className="ep-section-title ep-mb-6" style={{ fontSize: '1.8rem', fontWeight: '600' }}>Quando você pode ir?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--sp-6)', alignItems: 'start' }}>
              <div className="ep-card ep-card--flat" style={{ padding: 'var(--sp-4)', background: 'var(--color-white)', borderRadius: '24px' }}>
                <div className="ep-label ep-mb-2 ep-flex ep-items-center ep-gap-2" style={{ fontSize: '15px', color: 'var(--color-n700)', fontWeight: '600' }}>
                  <FaCalendarAlt className="ep-text-primary" /> Selecione o dia
                </div>
                {loadingHolidays ? (
                  <div className="ep-flex ep-items-center ep-justify-center ep-p-10"><p className="ep-text-muted">Sincronizando...</p></div>
                ) : errorHolidays ? (
                  <p className="ep-text-error" style={{ padding: '20px', textAlign: 'center' }}>{errorHolidays}</p>
                ) : (
                  <DayPicker
                    mode="single"
                    selected={formData.data}
                    onSelect={handleDateSelect}
                    disabled={[{ before: new Date() }, ...holidays.map(h => ({ date: h }))]}
                    modifiersStyles={{
                      disabled: { color: 'var(--color-n300)', background: 'var(--color-n50)' },
                      selected: { background: 'var(--color-primary)', color: 'white', borderRadius: '12px' }
                    }}
                    styles={{
                      caption: { color: 'var(--color-n900)', fontWeight: '700' },
                      day: { borderRadius: '12px', margin: '2px' }
                    }}
                    locale={require('date-fns/locale/pt-BR')}
                    showOutsideDays
                  />
                )}
              </div>

              <div className="ep-card ep-card--flat" style={{ padding: 'var(--sp-6)', background: 'var(--color-white)', borderRadius: '24px' }}>
                <div className="ep-label ep-mb-4 ep-flex ep-items-center ep-gap-2" style={{ fontSize: '15px', color: 'var(--color-n700)', fontWeight: '600' }}>Horários</div>
                <div className="ep-flex-col ep-gap-6">
                  <div className="ep-flex ep-flex-col ep-gap-3">
                    <div className="ep-text-xs ep-text-muted">☀️ Manhã</div>
                    <div className="ep-flex ep-flex-wrap ep-gap-2">
                      {['07:00', '08:00', '09:00', '10:00'].map(h => (
                        <button 
                          key={h}
                          className={`ep-btn ep-btn--sm ${formData.hora === h ? 'ep-btn--primary' : 'ep-btn--flat'}`}
                          style={{ minWidth: '76px', borderRadius: '14px', background: formData.hora === h ? 'var(--color-primary)' : 'var(--color-n50)', color: formData.hora === h ? 'white' : 'var(--color-n800)' }}
                          onClick={() => setFormData({...formData, hora: h})}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="ep-flex ep-flex-col ep-gap-3">
                    <div className="ep-text-xs ep-text-muted">🌇 Tarde</div>
                    <div className="ep-flex ep-flex-wrap ep-gap-2">
                      {['13:00', '14:00', '15:00', '16:00'].map(h => (
                        <button 
                          key={h}
                          className={`ep-btn ep-btn--sm ${formData.hora === h ? 'ep-btn--primary' : 'ep-btn--flat'}`}
                          style={{ minWidth: '76px', borderRadius: '14px', background: formData.hora === h ? 'var(--color-primary)' : 'var(--color-n50)', color: formData.hora === h ? 'white' : 'var(--color-n800)' }}
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

        {/* Passo 4: Sucesso */}
        {step === 4 && (
          <div className="ep-animate-scale-in ep-empty" style={{ marginTop: 'var(--sp-10)' }}>
            <div className="ep-empty__icon" style={{ color: 'var(--color-success)', opacity: 1, fontSize: 64 }}>
              <FaCheckCircle />
            </div>
            <h2 className="ep-font-xl ep-fw-bold ep-mt-4">Solicitação Recebida!</h2>
            <p className="ep-text-muted ep-mt-2 ep-text-center" style={{ maxWidth: '300px' }}>
              Sua solicitação de <strong>{formData.tipo}</strong> para o dia <strong>{formData.data?.toLocaleDateString('pt-BR')}</strong> foi encaminhada.
            </p>
            
            <div className="ep-card ep-card--flat ep-w-full ep-flex ep-items-center ep-gap-4 ep-mt-6" style={{ textAlign: 'left', padding: 'var(--sp-4)', background: 'var(--color-n50)', borderRadius: '20px' }}>
              <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px' }}>
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="ep-text-xs ep-text-muted">Local da coleta</div>
                <div className="ep-fw-bold" style={{ fontSize: '15px' }}>{formData.local}</div>
              </div>
            </div>

            <button className="ep-btn ep-btn--secondary ep-btn--full ep-mt-10" onClick={() => setIsScheduling(false)}>
              Voltar para Meus Exames
            </button>
          </div>
        )}

        {/* Botão de Navegação */}
        {step < 4 && (
          <div className="ep-mt-10">
            <button 
              className="ep-btn ep-btn--primary ep-btn--full"
              style={{ height: '56px' }}
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.tipo) ||
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

export default Exames;