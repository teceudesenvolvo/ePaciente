import React, { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaCarSide, FaGasPump, FaMapMarkedAlt, FaRoute, FaTools } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import FleetMap from '../../componets/FleetMap';
import '../../utils/chartSetup';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
  error: '#E53E3E',
  purple: '#5856d6',
};

const veiculos = [
  { id: 'AMB-01', status: 'Em rota', rota: 'Hemodiálise Fortaleza', velocidade: '62 km/h', lat: -3.673, lng: -39.258, cor: CHART_COLORS.success },
  { id: 'VAN-04', status: 'Disponível', rota: 'Pátio da Secretaria', velocidade: '0 km/h', lat: -3.665, lng: -39.238, cor: CHART_COLORS.primary },
  { id: 'CAR-12', status: 'Manutenção', rota: 'Oficina credenciada', velocidade: '0 km/h', lat: -3.694, lng: -39.221, cor: CHART_COLORS.warning },
];

const ExecFrotas = () => {
  const [selecionado, setSelecionado] = useState(veiculos[0]);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-4 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.primary, color: 'white' }}><FaCarSide /></div>
            <div><div className="ep-text-sm ep-text-muted">Frota municipal</div><div className="ep-font-xl ep-fw-bold ep-mt-1">14</div></div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.success, color: 'white' }}><FaRoute /></div>
            <div><div className="ep-text-sm ep-text-muted">Rotas monitoradas</div><div className="ep-font-xl ep-fw-bold ep-mt-1">9</div></div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.warning, color: 'white' }}><FaGasPump /></div>
            <div><div className="ep-text-sm ep-text-muted">Combustível/mês</div><div className="ep-font-xl ep-fw-bold ep-mt-1">1.284 L</div></div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: CHART_COLORS.error, color: 'white' }}><FaTools /></div>
            <div><div className="ep-text-sm ep-text-muted">Risco manutenção</div><div className="ep-font-xl ep-fw-bold ep-mt-1">2</div></div>
          </div>
        </div>

        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <FaMapMarkedAlt style={{ fontSize: 24 }} />
            <div style={{ flex: 1 }}>
              <h3 className="ep-font-lg ep-fw-bold">Monitoramento executivo de frotas</h3>
              <p className="ep-text-sm" style={{ opacity: 0.9 }}>Visão consolidada da operação, disponibilidade, custos e deslocamentos estratégicos.</p>
            </div>
            <div style={{ width: 76, height: 76 }}>
              <Doughnut
                data={{ labels: ['Operacionais', 'Manutenção'], datasets: [{ data: [12, 2], backgroundColor: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.28)'], borderWidth: 0 }] }}
                options={{ cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
          </div>
        </div>

        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-p-0 ep-overflow-hidden" style={{ minHeight: 390 }}>
            <div className="ep-flex ep-justify-between ep-items-center" style={{ padding: '20px 20px 0' }}>
              <div>
                <h3 className="ep-font-lg ep-fw-bold">Mapa operacional</h3>
                <p className="ep-text-sm ep-text-muted">Veículos em rota, disponíveis e em manutenção.</p>
              </div>
              <span className="ep-badge ep-badge--primary">{selecionado.id}</span>
            </div>
            <div style={{ margin: 20, position: 'relative' }}>
              <FleetMap vehicles={veiculos} selectedId={selecionado.id} onSelect={setSelecionado} height={290} />
              <div className="ep-card ep-card--flat" style={{ position: 'absolute', left: 16, bottom: 16, right: 16, background: 'rgba(255,255,255,0.94)' }}>
                <div className="ep-flex ep-justify-between ep-items-center">
                  <div><div className="ep-fw-bold">{selecionado.id}</div><div className="ep-text-xs ep-text-muted">{selecionado.rota} · {selecionado.velocidade}</div></div>
                  <span className="ep-badge ep-badge--primary">{selecionado.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ep-flex-col ep-gap-4">
            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                <h3 className="ep-font-lg ep-fw-bold">Custos e consumo</h3>
                <span className="ep-badge ep-badge--warning">Junho</span>
              </div>
              <div style={{ height: 160 }}>
                <Bar data={{ labels: ['Combustível', 'Manutenção', 'Rotas extras'], datasets: [{ data: [8400, 7400, 2600], backgroundColor: [CHART_COLORS.warning, CHART_COLORS.error, CHART_COLORS.primary], borderRadius: 8 }] }} options={chartOptions} />
              </div>
            </div>

            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
                <h3 className="ep-font-lg ep-fw-bold">Eficiência da frota</h3>
                <span className="ep-badge ep-badge--success">+8%</span>
              </div>
              <div style={{ height: 140 }}>
                <Line data={{ labels: ['Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ data: [72, 76, 79, 85], borderColor: CHART_COLORS.success, backgroundColor: 'rgba(0,196,140,0.12)', fill: true, tension: 0.35 }] }} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4">
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Pacientes transportados</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">312</div>
            <div className="ep-text-xs ep-text-success ep-mt-1">18% acima do mês anterior</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Km rodados</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">8.940</div>
            <div className="ep-text-xs ep-text-muted ep-mt-1">64% transporte sanitário</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Disponibilidade média</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">86%</div>
            <div className="ep-text-xs ep-text-warning ep-mt-1">2 veículos exigem revisão</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecFrotas;
