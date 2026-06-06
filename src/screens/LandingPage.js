import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaUserMd, FaVial, FaSyringe, FaBus } from 'react-icons/fa';


const LandingPage = () => {
  const history = useHistory();

  return (
    <div className="ep-page" style={{ background: 'var(--color-white)', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Navbar Superior estilo Apple */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="ep-content ep-flex ep-items-center ep-justify-between">
          <img src={'https://intgest-executivo.s3.amazonaws.com/media/intgest_executivo/public/entidade/logotipo/sao_luis_do_curu1.png.600x600_q85_box-0%2C0%2C108%2C108_crop_detail.png'} alt="ePaciente" style={{ height: '32px', cursor: 'pointer' }} onClick={() => history.push('/')} />
          <button 
            className="ep-btn" 
            style={{ background: '#004a8d', color: 'white', fontWeight: '500', borderRadius: '20px', padding: '8px 24px', fontSize: '14px', border: 'none' }}
            onClick={() => history.push('/login')}
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}>
        {/* Background com Imagem e Blur */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(https://intgest-executivo.s3.amazonaws.com/media/banners/hero/2026/03/servicos-ao-cidadao-real.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.6)',
          transform: 'scale(1.1)', // Escala para evitar bordas brancas do blur
          zIndex: 1
        }}></div>

        {/* Conteúdo do Hero */}
        <div className="ep-content ep-animate-fade-in" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          <h1 className="ep-font-xl ep-fw-bold" style={{ fontSize: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px', color: 'white' }}>
            Saúde Digital em <br/> <span style={{ color: '#4cd964' }}>São Luís do Curu.</span>
          </h1>
          <p className="ep-text-lg" style={{ fontSize: '1.4rem', maxWidth: '600px', margin: '0 auto 40px', opacity: 0.9 }}>
            Trabalhando pelo desenvolvimento e bem-estar de todos os curuenses através da tecnologia.
          </p>
          <div className="ep-flex ep-gap-4 ep-justify-center">
            <button 
              className="ep-btn" 
              style={{ background: 'white', color: '#1d1d1f', fontWeight: '600', borderRadius: '24px', padding: '16px 40px', fontSize: '18px', border: 'none', margin: '0 auto' }} 
              onClick={() => history.push('/login')}
            >
              Acessar Portal
            </button>
          </div>
        </div>
      </div>

      <div className="ep-content" style={{ paddingBottom: 'var(--sp-20)' }}>
        {/* Features Section */}
        <div className="ep-section-header ep-mt-12 ep-mb-8">
          <h2 className="ep-section-title ep-text-center ep-w-full" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-n800)', border: 'none', margin: '20px' }}>Serviços ao Cidadão</h2>
        </div>

        <div className="ep-grid-2 ep-gap-6">
          <div className="ep-card ep-card--flat ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ padding: 'var(--sp-10)', background: 'white' }}>
            <FaUserMd style={{ fontSize: '32px', color: '#004a8d' }} />
            <h3 className="ep-fw-bold" style={{ fontSize: '1.5rem', color: 'var(--color-n900)' }}>Consultas</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)' }}>Agendamento inteligente para clínico geral e especialistas.</p>
          </div>

          <div className="ep-card ep-card--flat ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ animationDelay: '0.1s', padding: 'var(--sp-10)', background: 'white' }}>
            <FaVial style={{ fontSize: '32px', color: '#004a8d' }} />
            <h3 className="ep-fw-bold" style={{ fontSize: '1.5rem', color: 'var(--color-n900)' }}>Exames</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)' }}>Resultados na palma da sua mão, onde quer que você esteja.</p>
          </div>

          <div className="ep-card ep-card--flat ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ animationDelay: '0.2s', padding: 'var(--sp-10)', background: 'white' }}>
            <FaSyringe style={{ fontSize: '32px', color: '#28a745' }} />
            <h3 className="ep-fw-bold" style={{ fontSize: '1.5rem', color: 'var(--color-n900)' }}>Vacinas</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)' }}>Seu histórico digital seguro e sempre atualizado.</p>
          </div>

          <div className="ep-card ep-card--flat ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ animationDelay: '0.3s', padding: 'var(--sp-10)', background: 'white' }}>
            <FaBus style={{ fontSize: '32px', color: '#ffc107' }} />
            <h3 className="ep-fw-bold" style={{ fontSize: '1.5rem', color: 'var(--color-n900)' }}>Transporte</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)' }}>Mobilidade assistida para garantir seu tratamento.</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;