import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRoute, FaSatelliteDish } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';
import FleetMap from '../../../componets/FleetMap';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
};

const veiculos = [
  { id: 'AMB-01', tipo: 'Ambulância', motorista: 'Rafael Oliveira', status: 'Em rota', rota: 'Hemodiálise Fortaleza', velocidade: '62 km/h', combustivel: 68, lat: -3.673, lng: -39.258, cor: CHART_COLORS.success },
  { id: 'VAN-04', tipo: 'Van sanitária', motorista: 'Cláudia Martins', status: 'Disponível', rota: 'Pátio da Secretaria', velocidade: '0 km/h', combustivel: 82, lat: -3.665, lng: -39.238, cor: CHART_COLORS.primary },
  { id: 'CAR-12', tipo: 'Carro administrativo', motorista: 'João Batista', status: 'Manutenção', rota: 'Oficina credenciada', velocidade: '0 km/h', combustivel: 24, lat: -3.694, lng: -39.221, cor: CHART_COLORS.warning },
];

const statusClass = (status) => {
  if (status === 'Manutenção') return 'ep-badge--warning';
  if (status === 'Disponível') return 'ep-badge--primary';
  return 'ep-badge--success';
};

const FrotasRastreio = () => {
  const [selecionado, setSelecionado] = useState(veiculos[0]);

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <FaSatelliteDish style={{ fontSize: 24 }} />
            <div>
              <h3 className="ep-font-lg ep-fw-bold">Rastreio de frotas</h3>
              <p className="ep-text-sm" style={{ opacity: 0.9 }}>Geolocalização simulada dos veículos e situação das rotas.</p>
            </div>
          </div>
        </div>

        <div className="ep-grid-2 ep-gap-4">
          <div className="ep-card ep-card--flat ep-p-0 ep-overflow-hidden" style={{ minHeight: 460 }}>
            <div style={{ margin: 20, position: 'relative' }}>
              <FleetMap vehicles={veiculos} selectedId={selecionado.id} onSelect={setSelecionado} height={430} />
              <div className="ep-card ep-card--flat" style={{ position: 'absolute', left: 16, bottom: 16, right: 16, background: 'rgba(255,255,255,0.94)' }}>
                <div className="ep-flex ep-justify-between ep-items-center">
                  <div>
                    <div className="ep-fw-bold">{selecionado.tipo} · {selecionado.id}</div>
                    <div className="ep-text-xs ep-text-muted">{selecionado.rota} · {selecionado.velocidade}</div>
                  </div>
                  <span className={`ep-badge ${statusClass(selecionado.status)}`}>{selecionado.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ep-flex-col ep-gap-3">
            {veiculos.map((veiculo) => (
              <button key={veiculo.id} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center" onClick={() => setSelecionado(veiculo)} style={{ border: selecionado.id === veiculo.id ? '2px solid var(--color-primary)' : '1.5px solid var(--color-n200)', cursor: 'pointer', textAlign: 'left' }}>
                <div className="ep-flex ep-items-center ep-gap-3">
                  <div className="ep-avatar ep-avatar--md" style={{ background: veiculo.cor, color: 'white' }}><FaMapMarkerAlt /></div>
                  <div>
                    <div className="ep-fw-bold">{veiculo.id} · {veiculo.motorista}</div>
                    <div className="ep-text-xs ep-text-muted">{veiculo.rota} · Combustível {veiculo.combustivel}%</div>
                  </div>
                </div>
                <span className={`ep-badge ${statusClass(veiculo.status)}`}>{veiculo.status}</span>
              </button>
            ))}

            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-items-center ep-gap-3 ep-mb-3">
                <FaRoute style={{ color: CHART_COLORS.primary }} />
                <h3 className="ep-font-lg ep-fw-bold">Rotas monitoradas</h3>
              </div>
              <p className="ep-text-sm ep-text-muted">Atualização simulada por GPS a cada 60 segundos, com destaque para veículos em rota e em manutenção.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrotasRastreio;
