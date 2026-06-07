import React, { useState } from 'react';
import { FaVideo, FaInfoCircle, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const Telemedicina = () => {
  const [activeConsultation, setActiveConsultation] = useState(null);
  const roomName = 'ePacienteTelemedicinaSala';
  const jitsiUrl = `https://meet.jit.si/${roomName}#config.startWithAudioMuted=false&config.startWithVideoMuted=false`;

  // Mock de consultas online agendadas
  const onlineConsultations = [
    { 
      id: 1, 
      especialidade: "Clínica Geral", 
      profissional: "Dr. Ricardo Santos", 
      data: "10/06/2026", 
      hora: "09:00", 
      status: "Disponível",
      corStatus: "success"
    },
    { 
      id: 2, 
      especialidade: "Psicologia", 
      profissional: "Dra. Beatriz Silva", 
      data: "12/06/2026", 
      hora: "14:00", 
      status: "Agendada",
      corStatus: "primary"
    }
  ];

  if (!activeConsultation) {
    return (
      <div className="ep-page" style={{ background: '#f5f5f7' }}>
        <HeaderTop customTitle="Consultas Online" />
        
        <div className="ep-content ep-animate-fade-up">
          <div className="ep-mb-8 ep-text-left">
            <p className="ep-text-muted" style={{ maxWidth: '100%', margin: '20px' }}>
              Selecione o atendimento abaixo para entrar na sala virtual. Recomendamos conectar-se 5 minutos antes do horário marcado.
            </p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
              gap: 'var(--sp-4)' 
            }}
          >
            {onlineConsultations.map((item) => (
              <div key={item.id} className="ep-card ep-card--flat" style={{ padding: 'var(--sp-5)' }}>
                <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                  <div className="ep-flex ep-gap-3 ep-items-center">
                    <div className="ep-icon-wrapper" style={{ background: 'var(--color-info-light)', color: 'var(--color-info)', width: '48px', height: '48px' }}>
                      <FaVideo />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h3 className="ep-font-md ep-fw-bold">{item.especialidade}</h3>
                      <p className="ep-text-sm ep-text-muted">{item.profissional}</p>
                    </div>
                  </div>
                  <span className={`ep-badge ep-badge--${item.corStatus}`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted ep-mb-6">
                  <FaCalendarAlt size={14} className="ep-text-primary" /> {item.data} às {item.hora}
                </div>

                <button 
                  className="ep-btn ep-btn--primary ep-btn--full"
                  onClick={() => setActiveConsultation(item)}
                >
                  Entrar na Sala
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ep-page" style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      <HeaderTop customTitle={`Teleconsulta: ${activeConsultation.especialidade}`}>
        <button 
          className="ep-btn ep-btn--ghost ep-btn--sm ep-flex ep-items-center ep-gap-2"
          onClick={() => setActiveConsultation(null)}
          style={{ borderRadius: '12px', padding: '8px 16px' }}
        >
          <FaArrowLeft /> Sair da Sala
        </button>
      </HeaderTop>

      <div className="ep-content ep-animate-fade-up" style={{ paddingBottom: '4rem' }}>
        <div className="ep-mb-8 ep-text-left">
          <p className="ep-text-muted" style={{ maxWidth: '100%', margin: '20px' }}>
            Você está conectado com <strong>{activeConsultation.profissional}</strong>. Certifique-se de estar em um local silencioso e com boa iluminação.
          </p>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6" style={{ padding: '1.5rem', borderRadius: '28px' }}>
          <div className="ep-flex ep-justify-between ep-items-center ep-flex-wrap ep-gap-4" style={{ marginBottom: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ margin: '0 0.5rem 10px 0' }} className="ep-badge ep-badge--primary">Sala de Consulta</span>
              <h2 className="ep-font-lg ep-fw-bold ep-mt-3">Sala de Telemedicina</h2>
              <p className="ep-text-sm ep-text-muted" style={{ maxWidth: '100%', marginTop: '0.5rem' }}>
                Compartilhe este ambiente com o profissional de saúde. Use microfone e câmera para iniciar a consulta por vídeo.
              </p>
            </div>
            <div className="ep-flex ep-items-center ep-gap-2" style={{ color: 'var(--color-n700)' }}>
              <FaVideo size={24} />
              <span className="ep-text-sm">Jitsi Meet</span>
            </div>
          </div>
          <div className="ep-alert ep-alert--info" style={{ marginBottom: '1rem' }}>
            <FaInfoCircle style={{ marginRight: '0.75rem' }} />
            A comunicação não é gravada pelo aplicativo. Verifique permissões de câmera e microfone no seu navegador.
          </div>

          <div className="ep-video-wrapper" style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '24px', overflow: 'hidden', background: '#000' }}>
            <iframe
              title="Telemedicina Jitsi"
              src={jitsiUrl}
              allow="camera; microphone; fullscreen; display-capture"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', textAlign: 'left' }}>
          <div className="ep-card ep-card--surface" style={{ borderRadius: '24px', padding: '1.5rem' }}>
            <h3 className="ep-font-md ep-fw-bold">Antes de iniciar</h3>
            <ul className="ep-list ep-list--spaced" style={{ marginTop: '1rem' }}>
              <li>Verifique se o navegador tem permissão para usar câmera e microfone.</li>
              <li>Use uma conexão de internet estável.</li>
              <li>Escolha um local tranquilo para melhor qualidade de atendimento.</li>
            </ul>
          </div>

          <div className="ep-card ep-card--surface" style={{ borderRadius: '24px', padding: '1.5rem' }}>
            <h3 className="ep-font-md ep-fw-bold">Durante a consulta</h3>
            <ul className="ep-list ep-list--spaced" style={{ marginTop: '1rem' }}>
              <li>Mantenha o microfone ligado ao conversar.</li>
              <li>Evite ruídos no ambiente.</li>
              <li>Tenha seus documentos e histórico prontos caso precise consultar.</li>
            </ul>
          </div>

          <div className="ep-card ep-card--surface" style={{ borderRadius: '24px', padding: '1.5rem' }}>
            <h3 className="ep-font-md ep-fw-bold">Se necessário</h3>
            <p className="ep-text-sm ep-text-muted" style={{ marginTop: '1rem' }}>
              Caso não consiga iniciar a chamada aqui, acesse diretamente a sala Jitsi clicando no botão abaixo.
            </p>
            <a
              href={jitsiUrl}
              target="_blank"
              rel="noreferrer"
              className="ep-btn ep-btn--primary ep-btn--full"
              style={{ marginTop: '1rem' }}
            >
              Abrir sala no navegador
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telemedicina;
