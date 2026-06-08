import React from 'react';
import { FaLock, FaPlus } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar } from 'react-chartjs-2';

const funcoes = [
  { nome: 'Administrador da Secretaria', usuarios: 3, permissoes: 'Acesso total' },
  { nome: 'Gestor de Unidade', usuarios: 9, permissoes: 'Agenda, pacientes e estoque' },
  { nome: 'Atendente Ouvidoria', usuarios: 4, permissoes: 'Protocolos e respostas' },
  { nome: 'Regulador de Transporte', usuarios: 5, permissoes: 'Solicitações e frota' },
];

const GestaoFuncoes = () => {
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <button className="ep-btn ep-btn--primary ep-btn--full ep-mb-6">
          <FaPlus /> Nova Função
        </button>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Perfis e permissões</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {funcoes.map((funcao) => (
            <div key={funcao.nome} className="ep-card ep-card--flat">
              <div className="ep-flex ep-items-center ep-gap-3">
                <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-n800)', color: 'white' }}>
                  <FaLock />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ep-fw-bold">{funcao.nome}</div>
                  <div className="ep-text-sm ep-text-muted">{funcao.permissoes}</div>
                </div>
                <div style={{ width: 96, height: 34 }}>
                  <Bar
                    data={{ labels: ['Usuários'], datasets: [{ data: [funcao.usuarios], backgroundColor: 'var(--color-primary)', borderRadius: 6 }] }}
                    options={chartOptions}
                  />
                </div>
                <span className="ep-badge ep-badge--primary">{funcao.usuarios} usuários</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoFuncoes;
