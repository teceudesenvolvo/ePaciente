import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginClient = () => {
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    // Após o login bem-sucedido, redirecionamos para o Dashboard (/inicio)
    history.push('/inicio');
  };

  return (
    <div className="ep-page ep-flex-col ep-items-center ep-justify-center" style={{ minHeight: '100vh', background: '#ffffff' }}>
      <div className="ep-content ep-animate-fade-up ep-w-full" style={{ maxWidth: '380px', marginTop: '100px' }}>
        <div className="ep-text-center ep-mb-10">
          <img src="https://intgest-executivo.s3.amazonaws.com/media/intgest_executivo/public/entidade/logotipo/sao_luis_do_curu1.png.600x600_q85_box-0%2C0%2C108%2C108_crop_detail.png" alt="Logo Prefeitura" className="ep-mb-4" style={{ height: '80px', objectFit: 'contain' }} />
          <h1 className="ep-font-xl ep-fw-bold" style={{ color: '#1d1d1f', fontSize: '1.8rem', marginTop: '50px' }}>Portal de Saúde</h1>
          <p style={{ color: 'var(--color-n600)', fontSize: '17px' }}>São Luís do Curu</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
          <div className="ep-input-group ep-mb-0">
            <input type="text" placeholder="Email" className="ep-input" style={{ borderRadius: '12px 12px 0 0', borderBottom: '1px solid var(--color-n200)', height: '56px' }} required />
            <input type="password" placeholder="Senha" className="ep-input" style={{ borderRadius: '0 0 12px 12px', height: '56px' }} required />
          </div>

          <button type="submit" className="ep-btn" style={{ background: 'var(--color-primary)', color: 'white', height: '50px', borderRadius: '12px', fontWeight: '500', fontSize: '17px', marginTop: '12px' }}>
            Entrar
          </button>

        </form>

        <p className="ep-text-center ep-mt-6 ep-text-sm ep-text-muted">
          Ainda não tem cadastro? 
          <button style={{margin:'20px' }} onClick={() => history.push('/register')} className="ep-btn ep-btn--link ep-fw-bold ep-ml-1">Cadastre-se</button>
        </p>
      </div>
    </div>
  );
};

export default LoginClient;