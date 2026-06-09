import React, { useMemo, useState } from 'react';
import { FaBoxes, FaExchangeAlt, FaExclamationTriangle, FaFileImport, FaFilter, FaPlus, FaSave, FaSearch, FaTimes, FaTruckLoading } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const estoqueInicial = [
  { id: 1, nome: 'Losartana 50mg', lote: 'LOS2408', categoria: 'Uso contínuo', saldo: 420, minimo: 120, validade: '2027-02-14', local: 'Prateleira A2', status: 'Normal', fornecedor: 'Distribuidora Saúde CE' },
  { id: 2, nome: 'Amoxicilina 500mg', lote: 'AMX1102', categoria: 'Antibiótico', saldo: 38, minimo: 80, validade: '2026-08-22', local: 'Armário B1', status: 'Mínimo', fornecedor: 'MedNordeste' },
  { id: 3, nome: 'Dipirona 500mg', lote: 'DIP7781', categoria: 'Analgésico', saldo: 72, minimo: 100, validade: '2026-07-05', local: 'Prateleira C4', status: 'Validade', fornecedor: 'Consórcio Farmacêutico' },
  { id: 4, nome: 'Metformina 850mg', lote: 'MET9090', categoria: 'Uso contínuo', saldo: 310, minimo: 90, validade: '2027-05-12', local: 'Prateleira A3', status: 'Normal', fornecedor: 'Distribuidora Saúde CE' },
];

const movimentacoesIniciais = [
  { id: 1, tipo: 'Entrada', medicamento: 'Losartana 50mg', quantidade: 120, origem: 'NF-e 2458', data: '08/06/2026' },
  { id: 2, tipo: 'Saída', medicamento: 'Metformina 850mg', quantidade: 60, origem: 'Dispensação CONS-0900-001', data: '08/06/2026' },
  { id: 3, tipo: 'Ajuste', medicamento: 'Dipirona 500mg', quantidade: -12, origem: 'Perda por validade', data: '07/06/2026' },
];

const emptyMovement = { tipo: 'Entrada', itemId: '1', quantidade: '', origem: '', destino: '', observacao: '' };
const badge = (status) => status === 'Normal' ? 'ep-badge--success' : 'ep-badge--warning';
const statusByStock = (item) => item.saldo < item.minimo ? 'Mínimo' : item.status === 'Validade' ? 'Validade' : 'Normal';

const parseNfeItems = (xmlText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, 'text/xml');
  const dets = Array.from(xml.getElementsByTagName('det'));
  return dets.map((det, index) => {
    const prod = det.getElementsByTagName('prod')[0];
    const get = (tag) => prod?.getElementsByTagName(tag)[0]?.textContent || '';
    return {
      id: Date.now() + index,
      nome: get('xProd') || `Medicamento importado ${index + 1}`,
      lote: get('cProd') || `XML${index + 1}`,
      categoria: 'Importado por XML',
      saldo: Number(get('qCom')) || 1,
      minimo: 50,
      validade: '2027-12-31',
      local: 'Conferência',
      status: 'Normal',
      fornecedor: xml.getElementsByTagName('xNome')[0]?.textContent || 'Fornecedor da NF-e',
    };
  });
};

const FarmaciaEstoque = () => {
  const [items, setItems] = useState(estoqueInicial);
  const [movements, setMovements] = useState(movimentacoesIniciais);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('Todos');
  const [categoria, setCategoria] = useState('Todas');
  const [activeView, setActiveView] = useState('medicamentos');
  const [showMovement, setShowMovement] = useState(false);
  const [movement, setMovement] = useState(emptyMovement);
  const [xmlPreview, setXmlPreview] = useState([]);

  const filtered = useMemo(() => items.filter((item) => {
    const computedStatus = statusByStock(item);
    const matchesBusca = `${item.nome} ${item.lote} ${item.categoria} ${item.local} ${item.fornecedor}`.toLowerCase().includes(busca.toLowerCase());
    const matchesStatus = status === 'Todos' || computedStatus === status;
    const matchesCategoria = categoria === 'Todas' || item.categoria === categoria;
    return matchesBusca && matchesStatus && matchesCategoria;
  }), [items, busca, status, categoria]);

  const categorias = ['Todas', ...Array.from(new Set(items.map((item) => item.categoria)))];

  const applyMovement = (event) => {
    event.preventDefault();
    const quantity = Number(movement.quantidade);
    if (!quantity) return;
    const selected = items.find((item) => String(item.id) === movement.itemId);
    const delta = movement.tipo === 'Saída' ? -Math.abs(quantity) : quantity;
    setItems(items.map((item) => item.id === selected.id ? { ...item, saldo: Math.max(0, item.saldo + delta), status: statusByStock({ ...item, saldo: Math.max(0, item.saldo + delta) }) } : item));
    setMovements([{ id: Date.now(), tipo: movement.tipo, medicamento: selected.nome, quantidade: delta, origem: movement.origem || movement.destino || 'Movimentação manual', data: new Date().toLocaleDateString('pt-BR') }, ...movements]);
    setMovement(emptyMovement);
    setShowMovement(false);
  };

  const handleXml = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setXmlPreview(parseNfeItems(String(reader.result || '')));
    reader.readAsText(file);
  };

  const importXmlItems = () => {
    if (!xmlPreview.length) return;
    setItems([...xmlPreview, ...items]);
    setMovements(xmlPreview.map((item) => ({ id: item.id, tipo: 'Entrada XML', medicamento: item.nome, quantidade: item.saldo, origem: `NF-e · ${item.fornecedor}`, data: new Date().toLocaleDateString('pt-BR') })).concat(movements));
    setXmlPreview([]);
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-4" style={{ flexWrap: 'wrap' }}>
            <div>
              <div className="ep-text-sm ep-text-muted">Farmácia</div>
              <h2 className="ep-font-xl ep-fw-bold">Controle completo de estoque</h2>
              <div className="ep-text-sm ep-text-muted ep-mt-1">Entradas, saídas, ajustes, lotes, validade, fornecedor e importação por XML de NF-e.</div>
            </div>
            <div className="ep-record-actions">
              <label className="ep-btn ep-btn--secondary ep-btn--sm" style={{ cursor: 'pointer' }}>
                <FaFileImport /> Importar XML
                <input type="file" accept=".xml,text/xml" onChange={handleXml} style={{ display: 'none' }} />
              </label>
              <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setShowMovement(true)}><FaPlus /> Movimentar</button>
            </div>
          </div>
        </div>

        <div className="ep-grid-4 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Itens</div><div className="ep-font-xl ep-fw-bold">{items.length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Abaixo do mínimo</div><div className="ep-font-xl ep-fw-bold">{items.filter(i => i.saldo < i.minimo).length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Validade próxima</div><div className="ep-font-xl ep-fw-bold">{items.filter(i => i.status === 'Validade').length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Movimentações</div><div className="ep-font-xl ep-fw-bold">{movements.length}</div></div>
        </div>

        {!!xmlPreview.length && (
          <div className="ep-alert ep-alert--info ep-mb-6">
            <FaFileImport style={{ marginRight: 10 }} /> {xmlPreview.length} item(ns) lido(s) do XML aguardando conferência.
            <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={importXmlItems} style={{ marginLeft: 16 }}>Confirmar importação</button>
          </div>
        )}

        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-2 ep-mb-4" style={{ color: 'var(--color-primary)' }}><FaFilter /> <strong>Filtros</strong></div>
          <div className="ep-grid-3 ep-gap-4">
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Buscar medicamento, lote, fornecedor ou local</label>
              <div className="ep-flex ep-items-center ep-gap-2 ep-input"><FaSearch className="ep-text-muted" /><input value={busca} onChange={(e) => setBusca(e.target.value)} style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} /></div>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Categoria</label>
              <select className="ep-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>{categorias.map((item) => <option key={item}>{item}</option>)}</select>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={status} onChange={(e) => setStatus(e.target.value)}><option>Todos</option><option>Normal</option><option>Mínimo</option><option>Validade</option></select>
            </div>
          </div>
        </div>

        <div className="ep-record-tabs">
          <button className={activeView === 'medicamentos' ? 'active' : ''} onClick={() => setActiveView('medicamentos')}>Todos os medicamentos</button>
          <button className={activeView === 'historico' ? 'active' : ''} onClick={() => setActiveView('historico')}>Histórico de movimentações</button>
        </div>

        {activeView === 'medicamentos' && (
          <div className="ep-record-grid ep-record-grid--2">
            {filtered.map((item) => (
              <div key={item.id} className="ep-card ep-card--flat">
                <div className="ep-flex ep-justify-between ep-items-start ep-gap-3">
                  <div>
                    <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold"><FaBoxes /> {item.nome}</div>
                    <div className="ep-text-sm ep-text-muted ep-mt-2">Lote {item.lote} · {item.categoria} · {item.local}</div>
                    <div className="ep-text-sm ep-text-muted ep-mt-1">Validade: {item.validade} · Mínimo: {item.minimo} · Fornecedor: {item.fornecedor}</div>
                  </div>
                  <span className={`ep-badge ${badge(statusByStock(item))}`}>{statusByStock(item)}</span>
                </div>
                <div className="ep-progress ep-mt-4"><div style={{ width: `${Math.min(100, (item.saldo / Math.max(item.minimo * 2, 1)) * 100)}%` }} /></div>
                <div className="ep-flex ep-justify-between ep-items-center ep-mt-3">
                  <strong>{item.saldo} unidades</strong>
                  {item.saldo < item.minimo && <span className="ep-text-sm ep-text-muted"><FaExclamationTriangle /> Repor</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'historico' && (
          <div className="ep-card ep-card--flat">
            <h3 className="ep-font-md ep-fw-bold ep-mb-4"><FaExchangeAlt /> Histórico completo de movimentações</h3>
            <div className="ep-flex-col ep-gap-3">
              {movements.map((mov) => (
                <div key={mov.id} className="ep-problem-row">
                  <div><strong>{mov.tipo} · {mov.medicamento}</strong><div className="ep-text-sm ep-text-muted">{mov.origem} · {mov.data}</div></div>
                  <span className={`ep-badge ${mov.quantidade < 0 ? 'ep-badge--warning' : 'ep-badge--success'}`}>{mov.quantidade > 0 ? '+' : ''}{mov.quantidade}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ep-alert ep-alert--info ep-mt-6">
          <FaTruckLoading style={{ marginRight: 10 }} /> Alertas de estoque mínimo e validade alimentam automaticamente as solicitações de reposição.
        </div>

      </div>

      {showMovement && (
        <div className="ep-modal-overlay" onClick={() => setShowMovement(false)}>
          <form className="ep-modal" style={{ maxWidth: 560 }} onClick={(event) => event.stopPropagation()} onSubmit={applyMovement}>
            <div className="ep-flex ep-justify-between ep-items-start ep-gap-4 ep-mb-6">
              <div><div className="ep-text-sm ep-text-muted">Estoque</div><h2 className="ep-modal-title">Movimentação manual</h2></div>
              <button className="ep-btn ep-btn--ghost ep-btn--icon" type="button" onClick={() => setShowMovement(false)}><FaTimes /></button>
            </div>
            <div className="ep-grid-2 ep-gap-4">
              <div className="ep-input-group"><label className="ep-label">Tipo</label><select className="ep-select" value={movement.tipo} onChange={(e) => setMovement({ ...movement, tipo: e.target.value })}><option>Entrada</option><option>Saída</option><option>Ajuste</option><option>Transferência</option></select></div>
              <div className="ep-input-group"><label className="ep-label">Medicamento</label><select className="ep-select" value={movement.itemId} onChange={(e) => setMovement({ ...movement, itemId: e.target.value })}>{items.map(item => <option key={item.id} value={item.id}>{item.nome} · {item.lote}</option>)}</select></div>
              <div className="ep-input-group"><label className="ep-label">Quantidade</label><input className="ep-input" type="number" value={movement.quantidade} onChange={(e) => setMovement({ ...movement, quantidade: e.target.value })} required /></div>
              <div className="ep-input-group"><label className="ep-label">Origem/destino</label><input className="ep-input" value={movement.origem} onChange={(e) => setMovement({ ...movement, origem: e.target.value })} placeholder="NF, dispensação, unidade..." /></div>
            </div>
            <div className="ep-input-group"><label className="ep-label">Observação</label><textarea className="ep-textarea" rows={3} value={movement.observacao} onChange={(e) => setMovement({ ...movement, observacao: e.target.value })} /></div>
            <div className="ep-modal-footer"><button className="ep-btn ep-btn--secondary" type="button" onClick={() => setShowMovement(false)}>Cancelar</button><button className="ep-btn ep-btn--primary" type="submit"><FaSave /> Salvar</button></div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FarmaciaEstoque;
