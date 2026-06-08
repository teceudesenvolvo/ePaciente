import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEdit, FaEnvelope, FaIdBadge, FaLock, FaPhone, FaSave, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const ExecPerfil = () => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ atual: '', nova: '', confirmar: '' });
  const [prefeito, setPrefeito] = useState({
    nome: 'TIAGO AGUIAR ABREU PORTELA BARROSO',
    cargo: 'Prefeito',
    email: 'gabinete@saoluisdocuru.ce.gov.br',
    telefone: '(85) 33551-015',
    visao: 'Saúde Municipal',
    municipio: 'São Luís do Curu - CE',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrefeito((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.nova !== passwordForm.confirmar) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso!');
    setShowPasswordModal(false);
    setPasswordForm({ atual: '', nova: '', confirmar: '' });
  };

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop customTitle="Perfil Prefeito">
        <button
          className={`ep-btn ${isEditing ? 'ep-btn--success' : 'ep-btn--primary'} ep-flex ep-items-center ep-gap-2`}
          onClick={() => setIsEditing(!isEditing)}
          style={{ padding: '10px 20px', borderRadius: '12px' }}
        >
          {isEditing ? <><FaSave /> Salvar</> : <><FaEdit /> Editar</>}
        </button>
      </HeaderTop>

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-12" style={{ gap: '20px' }}>
          <div className="ep-col-12 ep-col-md-4">
            <div className="ep-card ep-card--flat ep-flex-col ep-items-start" style={{ padding: '40px 24px' }}>
              <div className="ep-avatar ep-avatar--xl" style={{ width: 120, height: 120, fontSize: 42, background: 'var(--color-warning)', color: 'white', marginBottom: 24 }}>
                {prefeito.nome.split(' ').map((name) => name.charAt(0)).slice(0, 2).join('')}
              </div>
              <h2 className="ep-font-xl ep-fw-bold">{prefeito.nome}</h2>
              <p className="ep-text-sm ep-text-muted ep-mb-4">{prefeito.email}</p>
              <span className="ep-badge ep-badge--warning" style={{ padding: '6px 16px', borderRadius: '20px' }}>{prefeito.cargo}</span>
            </div>
          </div>

          <div className="ep-col-12 ep-col-md-8 ep-flex-col" style={{ gap: '20px' }}>
            <div className="ep-card ep-card--flat">
              <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6 ep-flex ep-items-center ep-gap-2"><FaIdBadge /> Dados Institucionais</h3>
              <div className="ep-grid-2 ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">Nome</label>
                  <input className="ep-input" name="nome" value={prefeito.nome} onChange={handleChange} disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Cargo</label>
                  <input className="ep-input" name="cargo" value={prefeito.cargo} onChange={handleChange} disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Área de Visão</label>
                  <input className="ep-input" name="visao" value={prefeito.visao} onChange={handleChange} disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Município</label>
                  <input className="ep-input" name="municipio" value={prefeito.municipio} onChange={handleChange} disabled={!isEditing} />
                </div>
              </div>
            </div>

            <div className="ep-card ep-card--flat">
              <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6">Contato</h3>
              <div className="ep-grid-2 ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">E-mail</label>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                    <FaEnvelope className="ep-text-muted" />
                    <input name="email" value={prefeito.email} onChange={handleChange} disabled={!isEditing} style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
                  </div>
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Telefone</label>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                    <FaPhone className="ep-text-muted" />
                    <input name="telefone" value={prefeito.telefone} onChange={handleChange} disabled={!isEditing} style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ep-col-12 ep-flex ep-justify-center ep-gap-4 ep-mt-10 ep-mb-10">
            <button className="ep-btn ep-btn--secondary ep-flex ep-items-center ep-gap-2" onClick={() => setShowPasswordModal(true)} style={{ padding: '12px 32px', borderRadius: '16px' }}>
              <FaLock /> Alterar Senha
            </button>
            <button className="ep-btn ep-btn--ghost ep-text-error ep-flex ep-items-center ep-gap-2" onClick={() => history.push('/login')} style={{ background: 'white', border: '1px solid var(--color-error-light)', padding: '12px 32px', borderRadius: '16px' }}>
              <FaSignOutAlt /> Sair da conta
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="ep-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="ep-modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            <button className="ep-close-btn" style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setShowPasswordModal(false)}><FaTimes /></button>
            <h2 className="ep-modal-title ep-mb-6">Alterar Senha</h2>
            <form onSubmit={handlePasswordSubmit} className="ep-flex-col ep-gap-4">
              <input type="password" className="ep-input" placeholder="Senha atual" required value={passwordForm.atual} onChange={(e) => setPasswordForm({ ...passwordForm, atual: e.target.value })} />
              <input type="password" className="ep-input" placeholder="Nova senha" required value={passwordForm.nova} onChange={(e) => setPasswordForm({ ...passwordForm, nova: e.target.value })} />
              <input type="password" className="ep-input" placeholder="Confirmar nova senha" required value={passwordForm.confirmar} onChange={(e) => setPasswordForm({ ...passwordForm, confirmar: e.target.value })} />
              <button type="submit" className="ep-btn ep-btn--primary ep-btn--full">Confirmar Alteração</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecPerfil;
