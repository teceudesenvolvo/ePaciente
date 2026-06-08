import React from 'react';
import { FaBell, FaCircle } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const notificacoes = [
  { id: 1, titulo: 'Alerta epidemiológico', mensagem: 'Dengue cresceu 18% na semana no Bairro Alto.', nova: true },
  { id: 2, titulo: 'Plano de ação urgente', mensagem: 'Reposição de estoque crítico precisa de validação.', nova: true },
  { id: 3, titulo: 'Ouvidoria da saúde', mensagem: 'UBS concentram o maior volume de demandas do mês.', nova: false },
  { id: 4, titulo: 'Transparência da saúde', mensagem: 'Novo relatório financeiro da saúde está disponível para revisão.', nova: false },
];

const ExecNotificacoes = () => (
  <div className="ep-page">
    <HeaderTop />
    <div className="ep-content ep-animate-fade-up">
      {notificacoes.map((item) => (
        <div key={item.id} className="ep-list-item" style={{ opacity: item.nova ? 1 : 0.7 }}>
          <div className="ep-list-icon" style={{ background: item.nova ? 'rgba(255, 149, 0, 0.16)' : 'var(--color-n100)', color: item.nova ? 'var(--color-warning)' : 'var(--color-n500)' }}>
            <FaBell />
          </div>
          <div className="ep-list-body">
            <div className="ep-list-title ep-flex ep-items-center ep-gap-2">
              {item.titulo}
              {item.nova && <FaCircle style={{ color: 'var(--color-warning)', fontSize: 8 }} />}
            </div>
            <div className="ep-list-sub">{item.mensagem}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ExecNotificacoes;
