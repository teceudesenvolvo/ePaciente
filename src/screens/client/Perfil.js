import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  FaEdit, FaSave, FaSignOutAlt, FaPlus, FaTrash,
  FaIdCard, FaMapMarkerAlt, FaVial, FaLock, FaTimes, FaChild
} from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const Perfil = () => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDependentModal, setShowDependentModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    atual: '',
    nova: '',
    confirmar: ''
  });
  const [dependentForm, setDependentForm] = useState({
    nome: '',
    nascimento: '',
    cns: ''
  });
  
  const [user, setUser] = useState({
    nome: 'LEONARDO RIBEIRO',
    nascimento: '1997-11-03',
    sexo: 'Masculino',
    tipoSanguineo: 'O-',
    cpf: '123.456.789-00',
    rg: '2008000000-0',
    cns: '123 1234 1234 1234',
    endereco: 'Rua das Flores, 123 - Centro, São Luís do Curu',
    telefone: '(85) 99999-1213',
    email: 'leonardo@exemplo.com.br',
    alergias: ['Dipirona', 'Poeira'],
    medicacoes: ['Losartana 50mg (Manhã)'],
    tratamentos: ['Fisioterapia motora semanal'],
    dependentes: [
      { nome: 'José Bento', nascimento: '2015-05-10', cns: '987 6543 2109 8765' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (field) => {
    const newItem = window.prompt(`Adicionar novo item em ${field}:`);
    if (newItem) {
      setUser(prev => ({ ...prev, [field]: [...prev[field], newItem] }));
    }
  };

  const handleRemoveItem = (field, index) => {
    const newList = [...user[field]];
    newList.splice(index, 1);
    setUser(prev => ({ ...prev, [field]: newList }));
  };

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair da conta?")) {
      history.push('/');
    }
  };

  const handleAddDependent = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      dependentes: [...prev.dependentes, dependentForm]
    }));
    setShowDependentModal(false);
    setDependentForm({ nome: '', nascimento: '', cns: '' });
  };

  const handleRemoveDependent = (index) => {
    if (window.confirm("Deseja remover este dependente?")) {
      const newList = [...user.dependentes];
      newList.splice(index, 1);
      setUser(prev => ({ ...prev, dependentes: newList }));
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.nova !== passwordForm.confirmar) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Senha alterada com sucesso!");
    setShowPasswordModal(false);
    setPasswordForm({ atual: '', nova: '', confirmar: '' });
  };

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop customTitle="Meu Perfil">
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
          
          {/* Lado Esquerdo: Card de Identificação (Inspirado no Painel Admin) */}
          <div className="ep-col-12 ep-col-md-4">
            <div className="ep-card ep-card--flat ep-flex-col ep-items-start" style={{ padding: '40px 24px', textAlign: 'left' }}>
              <div style={{ position: 'relative', marginBottom: '24px', textAlign: 'left' }}>
                <div className="ep-avatar ep-avatar--xl" style={{ width: '120px', height: '120px', fontSize: '48px', background: 'var(--color-primary)', color: 'white', textAlign: 'left' }}>
                  {user.nome.charAt(0)}
                </div>
                {isEditing && (
                  <label htmlFor="avatar-upload" style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-success)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '3px solid white' }}>
                    <FaPlus size={14} />
                    <input type="file" id="avatar-upload" style={{ display: 'none' }} accept="image/*" />
                  </label>
                )}
              </div>
              <h2 className="ep-font-xl ep-fw-bold">{user.nome}</h2>
              <p className="ep-text-sm ep-text-muted ep-mb-4">{user.email}</p>
              <span className="ep-badge ep-badge--neutral" style={{ padding: '6px 16px', borderRadius: '20px' }}>Cidadão Curuense</span>
              
              <div className="ep-divider ep-my-6" style={{ width: '100%' }}></div>
              
              <div className="ep-text-left ep-w-full">
                <label className="ep-label ep-mb-2">Nota Biográfica</label>
                <p className="ep-text-sm ep-text-muted" style={{ fontStyle: 'italic', lineHeight: '1.5' }}>
                  Usuário ativo do sistema ePaciente desde 2024. Residente de São Luís do Curu, Ceará.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Detalhes e Edição */}
          <div className="ep-col-12 ep-col-md-8 ep-flex-col" style={{ gap: '20px' }}>

          {/* Card: Informações Pessoais */}
          <div className="ep-card ep-card--flat">
            <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6 ep-flex ep-items-center ep-gap-2">
              <FaIdCard className="ep-text-primary" /> Informações Pessoais
            </h3>
            
            <div className="ep-grid-2 ep-gap-4">
              <div className="ep-input-group">
                <label className="ep-label">Nome Completo</label>
                <input 
                  type="text" name="nome" value={user.nome} onChange={handleChange}
                  className="ep-input" disabled={!isEditing} 
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Data de Nascimento</label>
                <input 
                  type="date" name="nascimento" value={user.nascimento} onChange={handleChange}
                  className="ep-input" disabled={!isEditing} 
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">CPF</label>
                <input 
                  type="text" name="cpf" value={user.cpf} onChange={handleChange}
                  className="ep-input" disabled={!isEditing} 
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Cartão SUS (CNS)</label>
                <input 
                  type="text" name="cns" value={user.cns} onChange={handleChange}
                  className="ep-input" disabled={!isEditing} 
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Tipo Sanguíneo</label>
                <select 
                  name="tipoSanguineo" value={user.tipoSanguineo} onChange={handleChange}
                  className="ep-select" disabled={!isEditing}
                >
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                </select>
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Sexo</label>
                <select 
                  name="sexo" value={user.sexo} onChange={handleChange}
                  className="ep-select" disabled={!isEditing}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card: Contato e Endereço */}
          <div className="ep-card ep-card--flat">
            <h3 className="ep-section-subtitle ep-fw-bold ep-mb-6 ep-flex ep-items-center ep-gap-2">
              <FaMapMarkerAlt className="ep-text-error" /> Contato e Localização
            </h3>
            <div className="ep-flex-col ep-gap-4">
              <div className="ep-input-group">
                <label className="ep-label">Endereço Completo</label>
                <input 
                  type="text" name="endereco" value={user.endereco} onChange={handleChange}
                  className="ep-input" disabled={!isEditing} 
                />
              </div>
              <div className="ep-grid-2 ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">Telefone</label>
                  <input 
                    type="text" name="telefone" value={user.telefone} onChange={handleChange}
                    className="ep-input" disabled={!isEditing} 
                  />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">E-mail</label>
                  <input 
                    type="email" name="email" value={user.email} onChange={handleChange}
                    className="ep-input" disabled={!isEditing} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Dependentes */}
          <div className="ep-card ep-card--flat">
            <div style={{ textAlign: 'left' }} className="ep-flex ep-justify-between ep-items-center ep-mb-6">
              <h3 className="ep-section-subtitle ep-fw-bold ep-flex ep-items-center ep-gap-2">
                <FaChild className="ep-text-primary" /> Dependentes (Filhos)
              </h3>
              <button 
                className="ep-btn ep-btn--secondary ep-btn--sm ep-flex ep-items-center ep-gap-2"
                onClick={() => setShowDependentModal(true)}
                style={{ borderRadius: '12px' }}
              >
                <FaPlus /> Adicionar Filho
              </button>
            </div>
            
            {user.dependentes.length === 0 ? (
              <p className="ep-text-sm ep-text-muted ep-text-center ep-py-4">Nenhum dependente cadastrado.</p>
            ) : (
              <div style={{ textAlign: 'left' }} className="ep-flex-col ep-gap-3">
                {user.dependentes.map((dep, idx) => (
                  <div key={idx} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center" style={{ padding: '12px 16px', background: 'var(--color-n50)', border: '1px solid var(--color-n100)' }}>
                    <div className="ep-flex-col">
                      <span className="ep-fw-semibold">{dep.nome}</span>
                      <span className="ep-text-xs ep-text-muted">CNS: {dep.cns} · Nasc: {dep.nascimento.split('-').reverse().join('/')}</span>
                    </div>
                    {isEditing && (
                      <button className="ep-btn ep-btn--sm ep-text-error" style={{ background: 'transparent' }} onClick={() => handleRemoveDependent(idx)}>
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seção: Saúde e Alertas */}
          <div className="ep-grid-2" style={{ gap: '20px' }}>
            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                <h3 className="ep-fw-bold ep-flex ep-items-center ep-gap-2"><FaVial className="ep-text-warning" /> Alergias</h3>
                {isEditing && <button className="ep-btn ep-btn--sm ep-btn--flat" onClick={() => handleAddItem('alergias')}><FaPlus /></button>}
              </div>
              <div className="ep-flex ep-flex-wrap ep-gap-2">
                {user.alergias.map((item, idx) => (
                  <span key={idx} className="ep-badge ep-badge--warning ep-flex ep-items-center ep-gap-2">
                    {item} {isEditing && <FaTrash className="ep-cursor-pointer" onClick={() => handleRemoveItem('alergias', idx)} />}
                  </span>
                ))}
              </div>
            </div>

            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                <h3 className="ep-fw-bold ep-flex ep-items-center ep-gap-2"><FaVial className="ep-text-success" /> Medicações</h3>
                {isEditing && <button className="ep-btn ep-btn--sm ep-btn--flat" onClick={() => handleAddItem('medicacoes')}><FaPlus /></button>}
              </div>
              <div className="ep-flex ep-flex-wrap ep-gap-2">
                {user.medicacoes.map((item, idx) => (
                  <span key={idx} className="ep-badge ep-badge--success ep-flex ep-items-center ep-gap-2">
                    {item} {isEditing && <FaTrash className="ep-cursor-pointer" onClick={() => handleRemoveItem('medicacoes', idx)} />}
                  </span>
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Botões de Ação Final */}
          <div className="ep-col-12 ep-flex ep-justify-center ep-gap-4 ep-mt-10 ep-mb-10">
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

      {/* Modal de Alterar Senha */}
      {showPasswordModal && (
        <div className="ep-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="ep-modal" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <button className="ep-close-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setShowPasswordModal(false)}>
              <FaTimes />
            </button>
            <h2 className="ep-modal-title ep-mb-6">Alterar Senha</h2>
            
            <form onSubmit={handlePasswordSubmit} className="ep-flex-col ep-gap-4">
              <div className="ep-input-group">
                <label className="ep-label">Senha Atual</label>
                <input 
                  type="password" 
                  className="ep-input" 
                  required 
                  value={passwordForm.atual}
                  onChange={e => setPasswordForm({...passwordForm, atual: e.target.value})}
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Nova Senha</label>
                <input 
                  type="password" 
                  className="ep-input" 
                  required 
                  value={passwordForm.nova}
                  onChange={e => setPasswordForm({...passwordForm, nova: e.target.value})}
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  className="ep-input" 
                  required 
                  value={passwordForm.confirmar}
                  onChange={e => setPasswordForm({...passwordForm, confirmar: e.target.value})}
                />
              </div>
              <button type="submit" className="ep-btn ep-btn--primary ep-btn--full ep-mt-4">Confirmar Alteração</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Dependente */}
      {showDependentModal && (
        <div className="ep-modal-overlay" onClick={() => setShowDependentModal(false)}>
          <div className="ep-modal" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <button className="ep-close-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setShowDependentModal(false)}>
              <FaTimes />
            </button>
            <h2 className="ep-modal-title ep-mb-6">Novo Dependente</h2>
            
            <form onSubmit={handleAddDependent} className="ep-flex-col ep-gap-4">
              <div className="ep-input-group">
                <label className="ep-label">Nome Completo do Filho(a)</label>
                <input 
                  type="text" 
                  className="ep-input" 
                  required 
                  value={dependentForm.nome}
                  onChange={e => setDependentForm({...dependentForm, nome: e.target.value.toUpperCase()})}
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Data de Nascimento</label>
                <input 
                  type="date" 
                  className="ep-input" 
                  required 
                  value={dependentForm.nascimento}
                  onChange={e => setDependentForm({...dependentForm, nascimento: e.target.value})}
                />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Número do Cartão SUS (CNS)</label>
                <input 
                  type="text" 
                  className="ep-input" 
                  required 
                  value={dependentForm.cns}
                  onChange={e => setDependentForm({...dependentForm, cns: e.target.value})}
                />
              </div>
              <button type="submit" className="ep-btn ep-btn--primary ep-btn--full ep-mt-4">Cadastrar Filho</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
