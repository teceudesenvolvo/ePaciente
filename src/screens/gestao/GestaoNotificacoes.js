import React from 'react';
import { FaBell, FaCircle } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const notificacoes = [
  { id: 1, titulo: 'Estoque crítico', mensagem: 'Antibióticos abaixo do nível mínimo na Farmácia Central.', nova: true },
  { id: 2, titulo: 'Ouvidoria perto do prazo', mensagem: '7 protocolos vencem nas próximas 24 horas.', nova: true },
  { id: 3, titulo: 'Transporte pendente', mensagem: 'Há solicitações aguardando regulação para hemodiálise.', nova: false },
  { id: 4, titulo: 'Campanha programada', mensagem: 'Combate à Dengue inicia amanhã para todos os cidadãos.', nova: false },
];

const GestaoNotificacoes = () => (
  <div className="ep-page">
    <HeaderTop />
    <div className="ep-content ep-animate-fade-up">
      {notificacoes.map((item) => (
        <div key={item.id} className="ep-list-item" style={{ opacity: item.nova ? 1 : 0.7 }}>
          <div className="ep-list-icon" style={{ background: item.nova ? 'rgba(52, 199, 89, 0.14)' : 'var(--color-n100)', color: item.nova ? 'var(--color-success)' : 'var(--color-n500)' }}>
            <FaBell />
          </div>
          <div className="ep-list-body">
            <div className="ep-list-title ep-flex ep-items-center ep-gap-2">
              {item.titulo}
              {item.nova && <FaCircle style={{ color: 'var(--color-success)', fontSize: 8 }} />}
            </div>
            <div className="ep-list-sub">{item.mensagem}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GestaoNotificacoes;
