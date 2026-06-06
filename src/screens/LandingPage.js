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
          filter: 'blur(4px) brightness(0.5)',
          transform: 'scale(1.1)', // Escala para evitar bordas brancas do blur
          zIndex: 1
        }}></div>

        {/* Conteúdo do Hero */}
        <div className="ep-content ep-animate-fade-up" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', maxWidth: '800px' }}>
          <span className="ep-badge ep-badge--primary ep-mb-4" style={{ background: 'rgba(76, 217, 100, 0.2)', color: '#4cd964', border: '1px solid rgba(76, 217, 100, 0.3)' }}>
            Inovação em Saúde Pública
          </span>
          <h1 className="ep-font-xl ep-fw-bold" style={{ fontSize: '3.8rem', lineHeight: '1.05', letterSpacing: '-0.03em', marginBottom: '24px', color: 'white' }}>
            O cuidado que você merece, <br/> <span style={{ color: '#4cd964' }}>na palma da sua mão.</span>
          </h1>
          <p className="ep-text-lg" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 48px', opacity: 0.85, fontWeight: '400', lineHeight: '1.5' }}>
            Acesse serviços de saúde, agende consultas e consulte seus exames de forma rápida, segura e transparente em São Luís do Curu.
          </p>
          <div className="ep-flex ep-gap-4 ep-justify-center">
            <button 
              className="ep-btn" 
              style={{ background: '#4cd964', color: '#002651', fontWeight: '700', borderRadius: '12px', padding: '16px 48px', fontSize: '18px', border: 'none', boxShadow: '0 10px 25px rgba(76, 217, 100, 0.3)' }} 
              onClick={() => history.push('/login')}
            >
              Começar agora
            </button>
          </div>
        </div>
      </div>

      <div className="ep-content" style={{ paddingBottom: 'var(--sp-20)' }}>
        {/* Features Section */}
        <div className="ep-section-header ep-mt-16 ep-mb-12" style={{ flexDirection: 'column', textAlign: 'center' }}>
          <h2 className="ep-section-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#002651', border: 'none', marginBottom: '12px' }}>Serviços ao Cidadão</h2>
          <div style={{ width: '60px', height: '4px', background: '#4cd964', borderRadius: '2px', margin: '0 auto' }}></div>
        </div>

        <div className="ep-grid-2 ep-gap-6">
          <div className="ep-card ep-card--landing ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up">
            <div className="ep-icon-wrapper" style={{ color: '#004a8d' }}><FaUserMd /></div>
            <h3 className="ep-fw-bold" style={{ fontSize: '1.4rem', color: '#002651' }}>Consultas</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)', lineHeight: '1.6' }}>Agendamento inteligente para clínico geral e especialistas nas UBS do município.</p>
          </div>

          <div className="ep-card ep-card--landing ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="ep-icon-wrapper" style={{ color: '#004a8d' }}><FaVial /></div>
            <h3 className="ep-fw-bold" style={{ fontSize: '1.4rem', color: '#002651' }}>Exames</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)', lineHeight: '1.6' }}>Solicite agendamentos e receba resultados laboratoriais diretamente no seu celular.</p>
          </div>

          <div className="ep-card ep-card--landing ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="ep-icon-wrapper" style={{ color: '#28a745' }}><FaSyringe /></div>
            <h3 className="ep-fw-bold" style={{ fontSize: '1.4rem', color: '#002651' }}>Vacinas</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)', lineHeight: '1.6' }}>Acompanhe seu histórico vacinal e as campanhas vigentes na cidade.</p>
          </div>

          <div className="ep-card ep-card--landing ep-flex-col ep-items-center ep-text-center ep-gap-4 ep-animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="ep-icon-wrapper" style={{ color: '#ffc107' }}><FaBus /></div>
            <h3 className="ep-fw-bold" style={{ fontSize: '1.4rem', color: '#002651' }}>Transporte</h3>
            <p className="ep-text-sm" style={{ color: 'var(--color-n600)', lineHeight: '1.6' }}>Solicite transporte para tratamentos especializados fora do município.</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;