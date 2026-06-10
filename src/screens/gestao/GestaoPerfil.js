import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FaBriefcase,
  FaEdit,
  FaEnvelope,
  FaIdCard,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaSave,
  FaShieldAlt,
  FaSignOutAlt,
  FaTimes,
  FaTrash,
  FaUserTie,
} from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const GestaoPerfil = () => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    atual: '',
    nova: '',
    confirmar: '',
  });

  const [secretario, setSecretario] = useState({
    nome: 'FRANCISCO FABRÍCIO MARQUES GOMES',
    cargo: 'Secretário Municipal de Saúde',
    matricula: 'Portaria 007/2025',
    cpf: '123.456.789-00',
    rg: '2008000000-0',
    setor: 'Secretaria Municipal de Saúde',
    unidade: 'Sede Administrativa',
    telefone: '(85) 3355-1015',
    celular: '(85) 3355-1015',
    email: 'gabinete@saoluisdocuru.ce.gov.br',
    endereco: 'Rua Domingos Anselmo, Nº 10 - Centro, São Luís do Curu',
    permissoes: ['Gestão de usuários', 'Unidades de saúde', 'Transporte sanitário', 'Ouvidoria'],
    responsabilidades: ['Organização do SUS municipal', 'Atenção básica', 'Vigilância epidemiológica', 'Assistência farmacêutica'],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecretario((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (field) => {
    const newItem = window.prompt(`Adicionar novo item em ${field}:`);
    if (newItem) {
      setSecretario((prev) => ({ ...prev, [field]: [...prev[field], newItem] }));
    }
  };

  const handleRemoveItem = (field, index) => {
    const newList = [...secretario[field]];
    newList.splice(index, 1);
    setSecretario((prev) => ({ ...prev, [field]: newList }));
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair da conta?')) {
      history.push('/');
    }
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

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop customTitle="Perfil do Secretário">
        <button
          className={`ep-btn ${isEditing ? 'ep-btn--success' : 'ep-btn--primary'} ep-flex ep-items-center ep-gap-2`}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          style={{ padding: '10px 20px', borderRadius: '12px' }}
        >
          {isEditing ? <><FaSave /> Salvar</> : <><FaEdit /> Editar</>}
        </button>
      </HeaderTop>

      <div className="ep-content ep-profile-page ep-animate-fade-up">
        <div className="ep-grid-12 ep-profile-layout" style={{ gap: '20px' }}>
          <div className="ep-col-12 ep-col-md-4">
            <div className="ep-card ep-card--flat ep-profile-summary ep-flex-col ep-items-start" style={{ padding: '40px 24px' }}>
              <div className="ep-profile-avatar-wrap" style={{ position: 'relative', marginBottom: '24px' }}>
                <div className="ep-avatar ep-avatar--xl" style={{ width: '120px', height: '120px', fontSize: '42px', background: 'var(--color-success)', color: 'white' }}>
                  {secretario.nome.split(' ').map((name) => name.charAt(0)).slice(0, 2).join('')}
                </div>
                {isEditing && (
                  <label htmlFor="gestao-avatar-upload" style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-primary)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '3px solid white' }}>
                    <FaPlus size={14} />
                    <input type="file" id="gestao-avatar-upload" style={{ display: 'none' }} accept="image/*" />
                  </label>
                )}
              </div>

              <h2 className="ep-font-xl ep-fw-bold ep-profile-name">{secretario.nome}</h2>
              <p className="ep-text-sm ep-text-muted ep-mb-4">{secretario.email}</p>
              <span className="ep-badge ep-badge--success" style={{ padding: '6px 16px', borderRadius: '20px' }}>
                {secretario.cargo}
              </span>

              <div className="ep-divider ep-my-6" style={{ width: '100%' }} />

              <div className="ep-text-left ep-w-full">
                <label className="ep-label ep-mb-2">Resumo institucional</label>
                <p className="ep-text-sm ep-text-muted" style={{ fontStyle: 'italic', lineHeight: '1.5' }}>
                  Perfil administrativo com acesso às áreas estratégicas da Secretaria Municipal de Saúde de São Luís do Curu.
                </p>
              </div>
            </div>
          </div>

          <div className="ep-col-12 ep-col-md-8 ep-flex-col" style={{ gap: '20px' }}>
            <div className="ep-card ep-card--flat">
              <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6 ep-flex ep-items-center ep-gap-2">
                <FaIdCard className="ep-text-primary" /> Dados Pessoais
              </h3>

              <div className="ep-grid-2 ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">Nome Completo</label>
                  <input type="text" name="nome" value={secretario.nome} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">CPF</label>
                  <input type="text" name="cpf" value={secretario.cpf} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">RG</label>
                  <input type="text" name="rg" value={secretario.rg} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Matrícula</label>
                  <input type="text" name="matricula" value={secretario.matricula} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
              </div>
            </div>

            <div className="ep-card ep-card--flat">
              <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6 ep-flex ep-items-center ep-gap-2">
                <FaBriefcase className="ep-text-success" /> Dados Funcionais
              </h3>

              <div className="ep-grid-2 ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">Cargo</label>
                  <input type="text" name="cargo" value={secretario.cargo} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Setor</label>
                  <input type="text" name="setor" value={secretario.setor} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Unidade</label>
                  <input type="text" name="unidade" value={secretario.unidade} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">Perfil de Acesso</label>
                  <select className="ep-select" disabled={!isEditing} defaultValue="secretario">
                    <option value="secretario">Secretário</option>
                    <option value="coordenador">Coordenador</option>
                    <option value="operador">Operador</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="ep-card ep-card--flat">
              <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6 ep-flex ep-items-center ep-gap-2">
                <FaMapMarkerAlt className="ep-text-error" /> Contato e Localização
              </h3>

              <div className="ep-flex-col ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">Endereço Institucional</label>
                  <input type="text" name="endereco" value={secretario.endereco} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                </div>
                <div className="ep-grid-2 ep-gap-4">
                  <div className="ep-input-group">
                    <label className="ep-label">Telefone</label>
                    <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                      <FaPhone className="ep-text-muted" />
                      <input type="text" name="telefone" value={secretario.telefone} onChange={handleChange} disabled={!isEditing} style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
                    </div>
                  </div>
                  <div className="ep-input-group">
                    <label className="ep-label">Celular</label>
                    <input type="text" name="celular" value={secretario.celular} onChange={handleChange} className="ep-input" disabled={!isEditing} />
                  </div>
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">E-mail Institucional</label>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                    <FaEnvelope className="ep-text-muted" />
                    <input type="email" name="email" value={secretario.email} onChange={handleChange} disabled={!isEditing} style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="ep-grid-2" style={{ gap: '20px' }}>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                  <h3 className="ep-fw-bold ep-flex ep-items-center ep-gap-2">
                    <FaShieldAlt className="ep-text-primary" /> Permissões
                  </h3>
                  {isEditing && <button className="ep-btn ep-btn--sm ep-btn--flat" onClick={() => handleAddItem('permissoes')}><FaPlus /></button>}
                </div>
                <div className="ep-flex ep-flex-wrap ep-gap-2">
                  {secretario.permissoes.map((item, idx) => (
                    <span key={item} className="ep-badge ep-badge--primary ep-flex ep-items-center ep-gap-2">
                      {item} {isEditing && <FaTrash className="ep-cursor-pointer" onClick={() => handleRemoveItem('permissoes', idx)} />}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                  <h3 className="ep-fw-bold ep-flex ep-items-center ep-gap-2">
                    <FaUserTie className="ep-text-success" /> Responsabilidades
                  </h3>
                  {isEditing && <button className="ep-btn ep-btn--sm ep-btn--flat" onClick={() => handleAddItem('responsabilidades')}><FaPlus /></button>}
                </div>
                <div className="ep-flex ep-flex-wrap ep-gap-2">
                  {secretario.responsabilidades.map((item, idx) => (
                    <span key={item} className="ep-badge ep-badge--success ep-flex ep-items-center ep-gap-2">
                      {item} {isEditing && <FaTrash className="ep-cursor-pointer" onClick={() => handleRemoveItem('responsabilidades', idx)} />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ep-col-12 ep-profile-actions ep-flex ep-justify-center ep-gap-4 ep-mt-10 ep-mb-10">
            <button
              className="ep-btn ep-btn--secondary ep-flex ep-items-center ep-gap-2"
              onClick={() => setShowPasswordModal(true)}
              style={{ padding: '12px 32px', borderRadius: '16px' }}
            >
              <FaLock /> Alterar Senha
            </button>
            <button
              className="ep-btn ep-btn--ghost ep-text-error ep-flex ep-items-center ep-gap-2"
              onClick={handleLogout}
              style={{ background: 'white', border: '1px solid var(--color-error-light)', padding: '12px 32px', borderRadius: '16px' }}
            >
              <FaSignOutAlt /> Sair da conta
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="ep-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="ep-modal" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <button className="ep-close-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setShowPasswordModal(false)}>
              <FaTimes />
            </button>
            <h2 className="ep-modal-title ep-mb-6">Alterar Senha</h2>

            <form onSubmit={handlePasswordSubmit} className="ep-flex-col ep-gap-4">
              <div className="ep-input-group">
                <label className="ep-label">Senha Atual</label>
                <input type="password" className="ep-input" required value={passwordForm.atual} onChange={(e) => setPasswordForm({ ...passwordForm, atual: e.target.value })} />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Nova Senha</label>
                <input type="password" className="ep-input" required value={passwordForm.nova} onChange={(e) => setPasswordForm({ ...passwordForm, nova: e.target.value })} />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Confirmar Nova Senha</label>
                <input type="password" className="ep-input" required value={passwordForm.confirmar} onChange={(e) => setPasswordForm({ ...passwordForm, confirmar: e.target.value })} />
              </div>
              <button type="submit" className="ep-btn ep-btn--primary ep-btn--full ep-mt-4">Confirmar Alteração</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoPerfil;
