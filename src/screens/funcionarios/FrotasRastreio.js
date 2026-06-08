import React, { useState } from 'react';
import { FaAmbulance, FaMapMarkerAlt, FaRoute, FaSatelliteDish } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const CHART_COLORS = {
  primary: '#007AFF',
  success: '#00C48C',
  warning: '#FF9500',
};

const veiculos = [
  { id: 'AMB-01', tipo: 'Ambulância', motorista: 'Rafael Oliveira', status: 'Em rota', rota: 'Hemodiálise Fortaleza', velocidade: '62 km/h', combustivel: 68, x: 28, y: 38, cor: CHART_COLORS.success },
  { id: 'VAN-04', tipo: 'Van sanitária', motorista: 'Cláudia Martins', status: 'Disponível', rota: 'Pátio da Secretaria', velocidade: '0 km/h', combustivel: 82, x: 58, y: 52, cor: CHART_COLORS.primary },
  { id: 'CAR-12', tipo: 'Carro administrativo', motorista: 'João Batista', status: 'Manutenção', rota: 'Oficina credenciada', velocidade: '0 km/h', combustivel: 24, x: 76, y: 28, cor: CHART_COLORS.warning },
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
            <div style={{ height: 430, margin: 20, position: 'relative', borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(135deg, #e8f3ff 0%, #f7fff9 100%)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
              <div style={{ position: 'absolute', left: '8%', right: '10%', top: '48%', height: 4, background: 'rgba(0, 122, 255, 0.22)', borderRadius: 999, transform: 'rotate(-8deg)' }} />
              <div style={{ position: 'absolute', left: '18%', right: '16%', top: '33%', height: 4, background: 'rgba(0, 196, 140, 0.22)', borderRadius: 999, transform: 'rotate(18deg)' }} />
              {veiculos.map((veiculo) => (
                <button
                  key={veiculo.id}
                  onClick={() => setSelecionado(veiculo)}
                  title={`${veiculo.id} · ${veiculo.status}`}
                  style={{
                    position: 'absolute',
                    left: `${veiculo.x}%`,
                    top: `${veiculo.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 46,
                    height: 46,
                    border: selecionado.id === veiculo.id ? '3px solid white' : '2px solid rgba(255,255,255,0.82)',
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
