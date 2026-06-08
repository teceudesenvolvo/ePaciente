import React, { useState } from 'react';
import {
  FaAmbulance,
  FaCarSide,
  FaCheck,
  FaGasPump,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaRoute,
  FaTools,
  FaTimes,
} from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
  error: '#E53E3E',
  purple: '#5856d6',
};

const veiculos = [
  { id: 'AMB-01', tipo: 'Ambulância', motorista: 'Rafael Oliveira', status: 'Em rota', rota: 'Hemodiálise Fortaleza', velocidade: '62 km/h', combustivel: 68, x: 28, y: 38, cor: CHART_COLORS.success },
  { id: 'VAN-04', tipo: 'Van sanitária', motorista: 'Cláudia Martins', status: 'Disponível', rota: 'Pátio da Secretaria', velocidade: '0 km/h', combustivel: 82, x: 58, y: 52, cor: CHART_COLORS.primary },
  { id: 'CAR-12', tipo: 'Carro administrativo', motorista: 'João Batista', status: 'Manutenção', rota: 'Oficina credenciada', velocidade: '0 km/h', combustivel: 24, x: 76, y: 28, cor: CHART_COLORS.warning },
];

const rotas = [
  { rota: 'Hemodiálise Fortaleza', veiculo: 'AMB-01', horario: '06:20', pacientes: 3, km: 92, status: 'Em andamento' },
  { rota: 'Clínica Visão', veiculo: 'VAN-04', horario: '08:40', pacientes: 7, km: 64, status: 'Programada' },
  { rota: 'Coleta laboratorial rural', veiculo: 'CAR-08', horario: '10:30', pacientes: 0, km: 38, status: 'Aguardando' },
];

const manutencoes = [
  { item: 'Suspensão CAR-12', previsao: 'Imediato', custo: 'R$ 3.200,00', risco: 'Alto' },
  { item: 'Pneus VAN-04', previsao: '12 dias', custo: 'R$ 2.400,00', risco: 'Médio' },
  { item: 'Revisão AMB-01', previsao: '20 dias', custo: 'R$ 1.850,00', risco: 'Baixo' },
];

const veiculosDisponiveis = ['AMB-01', 'VAN-04', 'VAN-07', 'CAR-12'];

const statusClass = (status) => {
  if (['Manutenção', 'Alto'].includes(status)) return 'ep-badge--error';
  if (['Programada', 'Aguardando', 'Médio'].includes(status)) return 'ep-badge--warning';
  if (['Disponível'].includes(status)) return 'ep-badge--primary';
  return 'ep-badge--success';
};

const GestaoTransportes = () => {
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(veiculos[0]);
  const [popup, setPopup] = useState(null);
  const [solicitacoes, setSolicitacoes] = useState([
    { id: 101, paciente: 'Antônio Marcos', origem: 'Sítio das Pedras', destino: 'Hospital Municipal', data: '12/06', just: 'Hemodiálise', prioridade: 'Alta', status: 'pendente', veiculo: 'AMB-01' },
    { id: 102, paciente: 'Lúcia Silva', origem: 'Bairro Alto', destino: 'Clínica Visão', data: '13/06', just: 'Cirurgia Catarata', prioridade: 'Normal', status: 'aprovado', veiculo: 'VAN-04' },
    { id: 103, paciente: 'Maria de Lourdes', origem: 'Centro', destino: 'Fortaleza', data: '14/06', just: 'Consulta cardiologia', prioridade: 'Normal', status: 'pendente', veiculo: 'VAN-07' },
  ]);

  const handleStatus = (id, status) => {
    setSolicitacoes(solicitacoes.map((solicitacao) => (
      solicitacao.id === id ? { ...solicitacao, status } : solicitacao
    )));
  };

  const handleVeiculo = (id, veiculo) => {
    setSolicitacoes(solicitacoes.map((solicitacao) => (
      solicitacao.id === id ? { ...solicitacao, veiculo } : solicitacao
    )));
  };

  const pendentes = solicitacoes.filter((s) => s.status === 'pendente');
  const aprovados = solicitacoes.filter((s) => s.status === 'aprovado');
  const recusados = solicitacoes.filter((s) => s.status === 'recusado');

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  const openPopup = (title, icon, children, tone = CHART_COLORS.primary) => {
    setPopup({ title, icon, children, tone });
  };

  const clickableCardStyle = {
    border: '1.5px solid var(--color-n200)',
    cursor: 'pointer',
    textAlign: 'left',
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-4 ep-gap-4 ep-mb-6">
          <button
            className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4"
            style={clickableCardStyle}
            onClick={() => openPopup('Veículos ativos', <FaCarSide />, (
              <>
                <p className="ep-text-sm ep-text-muted ep-mb-4">Resumo da disponibilidade operacional da frota municipal.</p>
                <div className="ep-grid-2 ep-gap-3">
                  <div className="ep-alert ep-alert--success" style={{ margin: 0 }}>12 veículos operacionais</div>
                  <div className="ep-alert ep-alert--warning" style={{ margin: 0 }}>2 em manutenção</div>
                </div>
              </>
            ))}
          >
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.primary, color: 'white' }}><FaCarSide /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Veículos ativos</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">14</div>
            </div>
          </button>
          <button
            className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4"
            style={clickableCardStyle}
            onClick={() => openPopup('Rotas de hoje', <FaRoute />, (
              <div className="ep-flex-col ep-gap-3">
                {rotas.map((rota) => (
                  <div key={rota.rota} className="ep-list-item" style={{ marginBottom: 0 }}>
                    <div className="ep-list-body">
                      <div className="ep-list-title">{rota.rota}</div>
                      <div className="ep-list-sub">{rota.veiculo} · {rota.horario} · {rota.km} km</div>
                    </div>
                    <span className={`ep-badge ${statusClass(rota.status)}`}>{rota.status}</span>
                  </div>
                ))}
              </div>
            ), CHART_COLORS.success)}
          >
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.success, color: 'white' }}><FaRoute /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Rotas hoje</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">9</div>
            </div>
          </button>
          <button
            className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4"
            style={clickableCardStyle}
            onClick={() => openPopup('Consumo mensal', <FaGasPump />, (
              <>
                <p className="ep-text-sm ep-text-muted ep-mb-4">Consumo consolidado do mês por tipo de veículo.</p>
                <div className="ep-flex-col ep-gap-3">
                  <div className="ep-list-item" style={{ marginBottom: 0 }}><div className="ep-list-body"><div className="ep-list-title">Ambulâncias</div><div className="ep-list-sub">612 L · 48% do consumo</div></div></div>
                  <div className="ep-list-item" style={{ marginBottom: 0 }}><div className="ep-list-body"><div className="ep-list-title">Vans sanitárias</div><div className="ep-list-sub">492 L · 38% do consumo</div></div></div>
                  <div className="ep-list-item" style={{ marginBottom: 0 }}><div className="ep-list-body"><div className="ep-list-title">Administrativos</div><div className="ep-list-sub">180 L · 14% do consumo</div></div></div>
                </div>
              </>
            ), CHART_COLORS.warning)}
          >
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.warning, color: 'white' }}><FaGasPump /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Consumo mensal</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">1.284 L</div>
            </div>
          </button>
          <button
            className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4"
            style={clickableCardStyle}
            onClick={() => openPopup('Custo previsto', <FaTools />, (
              <div className="ep-flex-col ep-gap-3">
                {manutencoes.map((item) => (
                  <div key={item.item} className="ep-list-item" style={{ marginBottom: 0 }}>
                    <div className="ep-list-body">
                      <div className="ep-list-title">{item.item}</div>
                      <div className="ep-list-sub">{item.previsao} · {item.custo}</div>
                    </div>
                    <span className={`ep-badge ${statusClass(item.risco)}`}>{item.risco}</span>
                  </div>
                ))}
              </div>
            ), CHART_COLORS.error)}
          >
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.error, color: 'white' }}><FaTools /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Custo previsto</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">R$ 7,4 mil</div>
            </div>
          </button>
        </div>

        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <FaMapMarkedAlt style={{ fontSize: 24 }} />
            <div style={{ flex: 1 }}>
              <h3 className="ep-font-lg ep-fw-bold">Dashboard estratégico da frota municipal</h3>
              <p className="ep-text-sm" style={{ opacity: 0.9 }}>Indicadores consolidados de transporte sanitário, disponibilidade, consumo e manutenção.</p>
            </div>
            <div style={{ width: 74, height: 74 }}>
              <Doughnut
                data={{ labels: ['Operacionais', 'Manutenção'], datasets: [{ data: [12, 2], backgroundColor: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.28)'], borderWidth: 0 }] }}
                options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
          </div>
        </div>

        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-p-0 ep-overflow-hidden" style={{ minHeight: 390 }}>
            <div className="ep-flex ep-justify-between ep-items-center" style={{ padding: '20px 20px 0' }}>
              <div>
                <h3 className="ep-font-lg ep-fw-bold">Mapa da frota</h3>
                <p className="ep-text-sm ep-text-muted">Localização estimada por GPS e status operacional.</p>
              </div>
              <span className="ep-badge ep-badge--primary">{veiculoSelecionado.id}</span>
            </div>

            <div style={{ height: 290, margin: 20, position: 'relative', borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(135deg, #e8f3ff 0%, #f7fff9 100%)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
              <div style={{ position: 'absolute', left: '8%', right: '10%', top: '48%', height: 4, background: 'rgba(0, 122, 255, 0.22)', borderRadius: 999, transform: 'rotate(-8deg)' }} />
              <div style={{ position: 'absolute', left: '18%', right: '16%', top: '33%', height: 4, background: 'rgba(0, 196, 140, 0.22)', borderRadius: 999, transform: 'rotate(18deg)' }} />
              {veiculos.map((veiculo) => (
                <button
                  key={veiculo.id}
                  onClick={() => setVeiculoSelecionado(veiculo)}
                  title={`${veiculo.id} · ${veiculo.status}`}
                  style={{
                    position: 'absolute',
                    left: `${veiculo.x}%`,
                    top: `${veiculo.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 44,
                    height: 44,
                    border: veiculoSelecionado.id === veiculo.id ? '3px solid white' : '2px solid rgba(255,255,255,0.82)',
                    borderRadius: 12,
                    background: veiculo.cor,
                    color: 'white',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <FaAmbulance />
                </button>
              ))}
              <div className="ep-card ep-card--flat" style={{ position: 'absolute', left: 16, bottom: 16, right: 16, background: 'rgba(255,255,255,0.94)' }}>
                <div className="ep-flex ep-justify-between ep-items-center">
                  <div>
                    <div className="ep-fw-bold">{veiculoSelecionado.tipo} · {veiculoSelecionado.id}</div>
                    <div className="ep-text-xs ep-text-muted">{veiculoSelecionado.rota} · {veiculoSelecionado.velocidade}</div>
                  </div>
                  <span className={`ep-badge ${statusClass(veiculoSelecionado.status)}`}>{veiculoSelecionado.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ep-flex-col ep-gap-4">
            <button
              className="ep-card ep-card--flat"
              style={clickableCardStyle}
              onClick={() => openPopup('Consumo por veículo', <FaGasPump />, (
                <div className="ep-flex-col ep-gap-3">
                  <div className="ep-list-item" style={{ marginBottom: 0 }}><div className="ep-list-body"><div className="ep-list-title">AMB-01</div><div className="ep-list-sub">428 L · 92 km/dia em média</div></div></div>
                  <div className="ep-list-item" style={{ marginBottom: 0 }}><div className="ep-list-body"><div className="ep-list-title">VAN-04</div><div className="ep-list-sub">312 L · 64 km/dia em média</div></div></div>
                  <div className="ep-list-item" style={{ marginBottom: 0 }}><div className="ep-list-body"><div className="ep-list-title">CAR-12</div><div className="ep-list-sub">184 L · uso reduzido por manutenção</div></div></div>
                </div>
              ), CHART_COLORS.warning)}
            >
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                <h3 className="ep-font-lg ep-fw-bold">Consumo por veículo</h3>
                <span className="ep-badge ep-badge--warning">Junho</span>
              </div>
              <div style={{ height: 160 }}>
                <Bar
                  data={{
                    labels: ['AMB-01', 'VAN-04', 'CAR-12', 'AMB-03'],
                    datasets: [{ data: [428, 312, 184, 360], backgroundColor: [CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.warning, CHART_COLORS.purple], borderRadius: 8 }],
                  }}
                  options={chartOptions}
                />
              </div>
            </button>

            <button
              className="ep-card ep-card--flat"
              style={clickableCardStyle}
              onClick={() => openPopup('Previsão de manutenção', <FaTools />, (
                <p className="ep-text-sm ep-text-muted">A projeção considera quilometragem acumulada, histórico de manutenção, consumo e riscos abertos. O maior impacto vem da suspensão do CAR-12 e troca de pneus da VAN-04.</p>
              ), CHART_COLORS.error)}
            >
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                <h3 className="ep-font-lg ep-fw-bold">Previsão de manutenção</h3>
                <span className="ep-badge ep-badge--primary">30 dias</span>
              </div>
              <div style={{ height: 140 }}>
                <Line
                  data={{
                    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                    datasets: [{ data: [1800, 2400, 5200, 7400], borderColor: CHART_COLORS.error, backgroundColor: 'rgba(229, 62, 62, 0.1)', fill: true, tension: 0.35 }],
                  }}
                  options={chartOptions}
                />
              </div>
            </button>
          </div>
        </div>

        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div>
            <div className="ep-section-header">
              <h3 className="ep-section-title">Rotas programadas</h3>
            </div>
            <div className="ep-flex-col ep-gap-3">
              {rotas.map((rota) => (
                <button
                  key={rota.rota}
                  className="ep-card ep-card--flat"
                  style={clickableCardStyle}
                  onClick={() => openPopup(rota.rota, <FaRoute />, (
                    <>
                      <p className="ep-text-sm ep-text-muted ep-mb-4">Detalhes operacionais da rota selecionada.</p>
                      <div className="ep-flex-col ep-gap-2">
                        <span className="ep-badge ep-badge--primary">Veículo: {rota.veiculo}</span>
                        <span className="ep-badge ep-badge--neutral">Horário: {rota.horario}</span>
                        <span className="ep-badge ep-badge--neutral">{rota.km} km · {rota.pacientes} pacientes</span>
                      </div>
                    </>
                  ), CHART_COLORS.success)}
                >
                  <div className="ep-flex ep-justify-between ep-items-center">
                    <div>
                      <div className="ep-fw-bold ep-flex ep-items-center ep-gap-2"><FaMapMarkerAlt style={{ color: CHART_COLORS.primary }} /> {rota.rota}</div>
                      <div className="ep-text-sm ep-text-muted ep-mt-1">{rota.veiculo} · {rota.horario} · {rota.km} km · {rota.pacientes} pacientes</div>
                    </div>
                    <span className={`ep-badge ${statusClass(rota.status)}`}>{rota.status}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="ep-section-header">
              <h3 className="ep-section-title">Custos previstos</h3>
            </div>
            <button
              className="ep-card ep-card--flat ep-mb-3"
              style={clickableCardStyle}
              onClick={() => openPopup('Impacto no orçamento', <FaTools />, (
                <p className="ep-text-sm ep-text-muted">O impacto previsto é de 37% do orçamento mensal reservado para manutenção. Ainda há saldo estimado de R$ 12,6 mil para serviços corretivos e preventivos.</p>
              ), CHART_COLORS.warning)}
            >
              <div className="ep-flex ep-items-center ep-gap-4">
                <div style={{ width: 76, height: 76, flexShrink: 0 }}>
                  <Doughnut
                    data={{ labels: ['Manutenção', 'Disponível'], datasets: [{ data: [7400, 12600], backgroundColor: [CHART_COLORS.warning, 'rgba(255, 149, 0, 0.14)'], borderWidth: 0 }] }}
                    options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                  />
                </div>
                <div>
                  <div className="ep-text-sm ep-text-muted">Impacto no orçamento mensal</div>
                  <div className="ep-font-xl ep-fw-bold ep-mt-1">37%</div>
                  <div className="ep-text-xs ep-text-muted">Com base em quilometragem, consumo e revisões pendentes.</div>
                </div>
              </div>
            </button>
            <div className="ep-flex-col ep-gap-3">
              {manutencoes.map((item) => (
                <button
                  key={item.item}
                  className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center"
                  style={clickableCardStyle}
                  onClick={() => openPopup(item.item, <FaTools />, (
                    <>
                      <p className="ep-text-sm ep-text-muted ep-mb-4">Prévia para tomada de decisão sobre manutenção.</p>
                      <div className="ep-flex-col ep-gap-2">
                        <span className="ep-badge ep-badge--neutral">Previsão: {item.previsao}</span>
                        <span className="ep-badge ep-badge--primary">Custo: {item.custo}</span>
                        <span className={`ep-badge ${statusClass(item.risco)}`}>Risco: {item.risco}</span>
                      </div>
                    </>
                  ), CHART_COLORS.error)}
                >
                  <div>
                    <div className="ep-fw-bold">{item.item}</div>
                    <div className="ep-text-xs ep-text-muted ep-mt-1">Previsão: {item.previsao} · {item.custo}</div>
                  </div>
                  <span className={`ep-badge ${statusClass(item.risco)}`}>{item.risco}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Solicitações pendentes ({pendentes.length})</h3>
        </div>

        <div className="ep-flex-col ep-gap-4">
          {pendentes.map((s) => (
            <div key={s.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-gap-4">
                <div>
                  <div className="ep-fw-bold">{s.paciente}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">Data: {s.data} · Prioridade: {s.prioridade}</div>
                  <div className="ep-text-sm ep-mt-2"><strong>De:</strong> {s.origem}<br /><strong>Para:</strong> {s.destino}</div>
                  <div className="ep-text-sm ep-mt-2 ep-p-2" style={{ background: 'var(--color-n50)', borderRadius: 4 }}>
                    <strong>Justificativa:</strong> {s.just}
                  </div>
                </div>
                <div style={{ minWidth: 180 }}>
                  <label className="ep-label">Veículo sugerido</label>
                  <select className="ep-select" value={s.veiculo || 'VAN-04'} onChange={(event) => handleVeiculo(s.id, event.target.value)}>
                    {veiculosDisponiveis.map((veiculo) => <option key={veiculo}>{veiculo}</option>)}
                  </select>
                </div>
              </div>
              <div className="ep-flex ep-gap-2 ep-mt-4">
                <button className="ep-btn ep-btn--ghost ep-btn--full" style={{ color: 'var(--color-error)' }} onClick={() => handleStatus(s.id, 'recusado')}><FaTimes /> Recusar</button>
                <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => handleStatus(s.id, 'aprovado')}><FaCheck /> Aprovar e Alocar</button>
              </div>
            </div>
          ))}
          {pendentes.length === 0 && (
            <div className="ep-alert ep-alert--success">Todas as solicitações foram tratadas.</div>
          )}
        </div>

        <div className="ep-section-header ep-mt-6">
          <h3 className="ep-section-title">Aprovados recentes</h3>
        </div>
        <div className="ep-flex-col ep-gap-3">
          {aprovados.map((s) => (
            <button
              key={s.id}
              className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center"
              style={clickableCardStyle}
              onClick={() => openPopup(s.paciente, <FaCheck />, (
                <p className="ep-text-sm ep-text-muted">Solicitação aprovada para {s.destino}, saindo de {s.origem}, alocada no veículo {s.veiculo || 'VAN-04'}.</p>
              ), CHART_COLORS.success)}
            >
              <div>
                <div className="ep-fw-bold">{s.paciente}</div>
                <div className="ep-text-xs ep-text-muted">{s.origem} → {s.destino}</div>
              </div>
              <span className="ep-badge ep-badge--success">{s.veiculo || 'VAN-04'}</span>
            </button>
          ))}
        </div>

        {recusados.length > 0 && (
          <>
            <div className="ep-section-header ep-mt-6">
              <h3 className="ep-section-title">Recusados</h3>
            </div>
            <div className="ep-flex-col ep-gap-3">
              {recusados.map((s) => (
                <button
                  key={s.id}
                  className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center"
                  style={clickableCardStyle}
                  onClick={() => openPopup(s.paciente, <FaTimes />, (
                    <p className="ep-text-sm ep-text-muted">Solicitação recusada para {s.destino}. Mantida no histórico para auditoria da regulação.</p>
                  ), CHART_COLORS.error)}
                >
                  <div>
                    <div className="ep-fw-bold">{s.paciente}</div>
                    <div className="ep-text-xs ep-text-muted">{s.origem} → {s.destino}</div>
                  </div>
                  <span className="ep-badge ep-badge--error">Recusado</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {popup && (
        <div className="ep-modal-overlay" onClick={() => setPopup(null)}>
          <div className="ep-modal" style={{ maxWidth: 520 }} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="ep-close-btn" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setPopup(null)}>
              <FaTimes />
            </button>
            <div className="ep-flex ep-items-center ep-gap-3 ep-mb-4">
              <div className="ep-avatar ep-avatar--md" style={{ background: popup.tone, color: 'white' }}>{popup.icon}</div>
              <h3 className="ep-font-lg ep-fw-bold">{popup.title}</h3>
            </div>
            {popup.children}
            <button className="ep-btn ep-btn--primary ep-btn--full ep-mt-6" type="button" onClick={() => setPopup(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoTransportes;
