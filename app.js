/* Passaggio Consegne - Frontend condiviso Cloudflare Workers/D1
   Versione 11: report anomalie frequenti + PIN unico app + admin nascosto.
*/
const APP_VERSION = '11.0.0-report-pin';
const DEFAULT_API_URL = 'https://passaggio-consegne-api.vocidicassino.workers.dev';
const AUTO_SYNC_MS = 15000;
const LOG_STORAGE_KEY = 'pc_anomalie_log_local_v9';
const STORAGE_KEY = 'pc_anomalie_local_v7';
const API_URL_KEY = 'pc_api_url';
const API_KEY_KEY = 'pc_api_key';
const USER_PIN_KEY = 'pc_user_pin_v11';
const ADMIN_SESSION_KEY = 'pc_admin_session_v11';

const ZONES = {
  1: {
    title: 'ZONA 1 - Layout interattivo',
    image: 'img/zona1.jpg',
    points: [
      // V10: aree cliccabili strette e posizionate sulle scritte del disegno tecnico.
      // Coordinate in percentuale: x, y, larghezza, altezza.
      p('SG01','Porta 1 / SG01','Ingresso sicurezza zona 1', 12.4, 23.0, 5.7, 2.6),
      p('OP30A','OP30A','Magazzino sfere / stazione OP30A', 22.6, 27.9, 5.2, 2.7),
      p('OP30B','OP30B','Magazzino sfere / stazione OP30B', 27.6, 25.4, 5.2, 2.7),
      p('OP30C','OP30C','Magazzino sfere / stazione OP30C', 30.8, 23.5, 5.1, 2.7),
      p('OP30D','OP30D','Magazzino sfere / stazione OP30D', 37.2, 25.4, 5.2, 2.7),
      p('OP30E','OP30E','Magazzino sfere / stazione OP30E', 41.0, 27.8, 5.2, 2.7),
      p('SG03','Porta 3 / SG03','Varco superiore centrale', 53.4, 18.6, 5.9, 5.0),
      p('SG05','Porta 5 / SG05','Varco superiore destro', 69.9, 27.1, 5.8, 2.5),

      p('R01','R01','Robot R01', 26.4, 39.3, 3.1, 2.5),
      p('R02','R02','Robot R02', 29.8, 65.1, 3.1, 2.5),
      p('R03','R03','Robot R03', 30.3, 33.3, 3.3, 2.4),
      p('R04','R04','Robot R04', 54.4, 33.3, 3.3, 2.4),
      p('R05','R05','Robot R05', 48.3, 66.2, 3.1, 2.5),
      p('R06','R06','Robot R06', 68.5, 39.0, 3.1, 2.5),

      p('OP05A','OP05A','Prelievo anello esterno', 12.2, 48.4, 7.1, 2.4),
      p('OP05B','OP05B','Prelievo anello esterno', 12.2, 53.2, 7.1, 2.4),
      p('OP10A','OP10A','Misura anello esterno', 22.4, 55.4, 5.2, 2.6),
      p('OP10B','OP10B','Misura anello interno', 29.0, 44.8, 5.3, 2.6),
      p('OP20A','OP20A','Deposito/inserimento anelli - OP20A', 37.7, 58.2, 5.1, 2.6),
      p('OP20B','OP20B','Deposito/inserimento anelli - OP20B', 37.7, 43.0, 5.1, 2.6),
      p('OP40A','OP40A','Area fasatura/carico gabbia superiore OP40A', 47.6, 43.6, 5.3, 2.6),
      p('OP40B','OP40B','Area fasatura/carico gabbia superiore OP40B', 59.2, 43.6, 5.3, 2.6),
      p('OP60','OP60','Stazione OP60', 51.8, 48.9, 4.1, 2.5),
      p('OP70','OP70','Stazione OP70', 52.9, 53.6, 4.1, 2.5),
      p('OP80','OP80','Stazione OP80', 54.0, 66.1, 4.1, 2.5),
      p('OP90','OP90','Stazione OP90', 64.1, 66.7, 4.1, 2.5),
      p('OP100','OP100','Controllo visivo / area OP100', 64.9, 57.0, 5.0, 2.6),
      p('OP110','OP110','Stazione OP110', 64.1, 51.2, 4.8, 2.6),
      p('OP115','OP115','Stazione OP115', 69.1, 36.0, 4.8, 2.6),
      p('OP120','OP120','Tavola centrale OP120', 59.1, 48.6, 5.0, 2.6),
      p('OP125','OP125','Controllo visivo Keyence 3D / OP125', 74.7, 66.5, 4.9, 2.6),
      p('OP125B','OP125B','Stazione OP125B', 70.6, 49.2, 5.3, 2.6),
      p('KEYENCE','Keyence','Controllo visivo Keyence 3D', 70.8, 58.7, 5.2, 2.2),
      p('LAVATRICE','Lavatrice','Lavatrice zona 1', 70.4, 74.0, 4.0, 9.0),
      p('QE1','Q.E. Zona 1','Quadro elettrico zona 1', 85.0, 36.4, 3.0, 17.4),
      p('R04-ARMADIO','R04','Armadio robot R04', 86.1, 60.8, 3.2, 7.6),
      p('R04-R05-R06','R05-R06','Armadio robot R05-R06', 86.4, 70.2, 3.6, 8.3),
      p('SG02','Porta 2 / SG02','Varco inferiore centrale', 27.3, 81.2, 5.8, 2.4),
      p('R01-R02-R03','R01-R02-R03','Armadio/area robot R01-R02-R03', 13.8, 88.1, 7.4, 2.4),
      p('EMERGENZA','Emergenza Generale','Area emergenza generale', 6.0, 83.0, 8.2, 4.0),
      p('PAR01','PAR 01','Protezione perimetrale PAR 01', 7.1, 71.5, 3.0, 9.3)
    ]
  },
  2: {
    title: 'ZONA 2 - Layout interattivo',
    image: 'img/zona2.jpg',
    points: [
      p('CONTROLLO-LAVATRICE-TOP','Controllo Lavatrice','Controllo lavatrice superiore', 24.2, 2.7, 10.8, 3.1),
      p('QE2','Q.E. Zona 2','Quadro elettrico zona 2', 45.8, 13.6, 7.2, 2.6),
      p('R07-R08-R09','R07-08-09','Armadio/area robot R07-R08-R09', 56.0, 11.7, 7.8, 2.7),
      p('SG01','Porta 1 / SG01','Varco superiore destro zona 2', 72.8, 19.1, 5.4, 2.6),
      p('LAVATRICE-SX','Lavatrice sinistra','Lavatrice lato sinistro', 16.1, 35.4, 6.0, 2.8),
      p('OP170A+B','OP170A+B','Stazione OP170A+B', 34.0, 38.8, 2.6, 10.7),
      p('R07','R07','Robot R07', 38.0, 63.2, 2.4, 5.0),
      p('OP180','OP180','Stazione OP180', 50.3, 40.6, 2.5, 7.6),
      p('R08','R08','Robot R08', 45.8, 63.2, 2.4, 5.0),
      p('OP185','OP185','Stazione OP185', 52.7, 56.7, 2.5, 5.8),
      p('OP190','OP190','Stazione OP190', 58.0, 35.0, 2.5, 7.5),
      p('R09','R09','Robot R09', 56.3, 65.0, 2.4, 5.0),
      p('OP125C','OP125C','Stazione OP125C', 64.7, 48.8, 4.8, 2.4),
      p('OP135','OP135','Stazione OP135', 68.8, 41.0, 4.1, 2.6),
      p('OP200','OP200','Lavatrice / stazione OP200', 82.0, 48.5, 4.5, 2.4),
      p('LAVATRICE-DX','Lavatrice destra','Lavatrice lato destro', 79.3, 42.4, 6.2, 2.8),
      p('CONTROLLO-LAVATRICE-DX','Controllo Lavatrice','Controllo lavatrice destro', 77.5, 68.0, 2.6, 15.5),
      p('SG02','Porta 2 / SG02','Varco inferiore centrale zona 2', 56.5, 84.8, 5.8, 2.5),
      p('PAR02','PAR 02','Protezione perimetrale PAR 02', 70.5, 87.2, 5.8, 2.4)
    ]
  },
  3: {
    title: 'ZONA 3 - Layout interattivo',
    image: 'img/zona3.jpg',
    points: [
      p('SG01','Porta 1 / SG01','Varco superiore sinistro zona 3', 16.8, 20.8, 5.8, 2.7),
      p('R10-R11-R12','R10-11-12','Armadio/area robot R10-R11-R12', 29.0, 11.5, 7.0, 2.5),
      p('R13-R14','R13 / R14','Armadio/area robot R13/R14', 39.0, 11.5, 6.3, 2.5),
      p('SG03','Porta 3 / SG03','Varco porta 3 zona 3', 46.4, 10.5, 5.6, 2.8),
      p('SG05','Porta 5 / SG05','Varco porta 5 zona 3', 55.3, 10.5, 5.5, 2.8),
      p('QE3','Q.E. Zona 3','Quadro elettrico zona 3', 67.4, 13.6, 7.1, 2.4),
      p('SG07','Porta 7 / SG07','Varco destro zona 3', 79.6, 28.0, 5.8, 2.7),
      p('LAVATRICE','Lavatrice','Lavatrice zona 3', 10.9, 39.6, 6.0, 2.8),
      p('OP200','OP200','Stazione OP200', 13.0, 44.9, 4.4, 2.4),
      p('R10','R10','Robot R10', 37.6, 27.8, 2.4, 2.4),
      p('OP210','OP210','Stazione OP210', 35.7, 38.0, 2.2, 7.0),
      p('OP220','OP220','Stazione OP220', 39.7, 40.0, 2.2, 6.7),
      p('OP230','OP230','Stazione OP230', 28.0, 50.8, 4.5, 2.5),
      p('OP240','OP240','Stazione OP240', 34.2, 50.0, 2.2, 6.1),
      p('R11','R11','Robot R11', 36.7, 63.5, 2.7, 2.5),
      p('R12','R12','Robot R12', 51.0, 64.0, 2.7, 2.5),
      p('OP280A','OP280A','Stazione OP280A', 46.8, 28.6, 4.6, 2.5),
      p('OP280B','OP280B','Stazione OP280B', 54.5, 28.6, 4.7, 2.5),
      p('R13','R13','Robot R13', 55.5, 33.3, 2.7, 2.5),
      p('OP270A','OP270A','Stazione OP270A', 46.8, 44.0, 2.2, 6.8),
      p('OP270B','OP270B','Stazione OP270B', 56.8, 44.0, 2.2, 6.8),
      p('R14','R14','Robot R14', 68.3, 39.2, 2.7, 2.5),
      p('OP250','OP250','Stazione OP250', 64.8, 60.3, 4.3, 2.5),
      p('CONTROLLO-LAVATRICE','Controllo Lavatrice','Controllo lavatrice zona 3', 8.9, 64.0, 2.3, 13.5),
      p('SG02','Porta 2 / SG02','Varco inferiore zona 3', 31.2, 78.7, 5.6, 2.7),
      p('PAR02','PAR 02','Protezione perimetrale PAR 02', 47.2, 81.5, 6.0, 2.4)
    ]
  }
};


function p(id, label, description, x, y, w, h){ return {id,label,description,x,y,w,h}; }

const state = {
  zone: '1',
  selectedPoint: null,
  anomalies: [],
  zoom: 1,
  showAreas: false,
  mapFocus: false,
  listMode: 'point',
  apiUrl: localStorage.getItem(API_URL_KEY) || DEFAULT_API_URL,
  apiKey: localStorage.getItem(API_KEY_KEY) || '',
  userPin: localStorage.getItem(USER_PIN_KEY) || '',
  loading: false,
  logs: [],
  autoSyncTimer: null
};

const $ = (id) => document.getElementById(id);

window.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  tickClock(); setInterval(tickClock, 1000);
  renderZone();
  loadAnomalies();
  startAutoSync();
  if(!state.userPin) setTimeout(() => openAccessDialog(true), 350);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(()=>{});
});

function bindEvents(){
  document.querySelectorAll('.zone-tab').forEach(btn => btn.addEventListener('click', () => switchZone(btn.dataset.zone)));
  $('pointSelect').addEventListener('change', e => selectPoint(e.target.value));
  $('statusFilter').addEventListener('change', () => {
    if(state.listMode === 'all' || !state.selectedPoint){
      state.listMode = 'all';
    }
    renderAnomalies();
  });
  $('showAreas').addEventListener('change', e => toggleAreas(e.target.checked));
  $('zoomIn').addEventListener('click', () => setZoom(Math.min(2.5, state.zoom + .15)));
  $('zoomOut').addEventListener('click', () => setZoom(Math.max(1, state.zoom - .15)));
  $('layoutImage').addEventListener('click', fallbackImageClick);
  $('newAnomalyBtn').addEventListener('click', () => $('anomalyForm').classList.toggle('hidden'));
  $('cancelForm').addEventListener('click', () => $('anomalyForm').classList.add('hidden'));
  $('anomalyForm').addEventListener('submit', saveAnomaly);
  $('closeDetail').addEventListener('click', closeDetail);
  $('refreshBtn').addEventListener('click', loadAnomalies);
  $('exportBtn').addEventListener('click', exportTxt);
  $('printBtn').addEventListener('click', () => window.print());
  $('backendBtn').addEventListener('click', openBackendDialog);
  $('saveBackend').addEventListener('click', saveBackendConfig);
  $('testBackend').addEventListener('click', testBackend);
  $('saveUserPin').addEventListener('click', saveUserPin);

  const menuBtn = $('menuBtn');
  const sideDrawer = $('sideDrawer');
  const drawerBackdrop = $('drawerBackdrop');
  const closeMenuBtn = $('closeMenuBtn');
  if(menuBtn) menuBtn.addEventListener('click', openMenu);
  if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if(drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') { closeMenu(); closeDetail(); } });
  document.querySelectorAll('[data-menu-action]').forEach(btn => btn.addEventListener('click', () => handleMenuAction(btn.dataset.menuAction)));
}

function openMenu(){
  $('sideDrawer').classList.add('open');
  $('drawerBackdrop').classList.add('show');
  document.body.classList.add('drawer-open');
}
function closeMenu(){
  const drawer = $('sideDrawer');
  const backdrop = $('drawerBackdrop');
  if(drawer) drawer.classList.remove('open');
  if(backdrop) backdrop.classList.remove('show');
  document.body.classList.remove('drawer-open');
}
function handleMenuAction(action){
  closeMenu();
  if(action === 'layout') { state.listMode = 'point'; resetDetail(); return window.scrollTo({top:0,behavior:'smooth'}); }
  if(action === 'open') return showAllAnomalies('aperta');
  if(action === 'all') return showAllAnomalies('tutte');
  if(action === 'history') return showHistory();
  if(action === 'report') return showReport();
  if(action === 'refresh') return loadAnomalies();
  if(action === 'export') return exportTxt();
  if(action === 'print') return window.print();
  if(action === 'access') return openAccessDialog(false);
  if(action === 'backend') return openBackendDialog(true);
  if(action === 'areas') { $('showAreas').checked = !$('showAreas').checked; toggleAreas($('showAreas').checked); return; }
  if(action === 'focus') return toggleMapFocus();
}
function startAutoSync(){
  if(state.autoSyncTimer) clearInterval(state.autoSyncTimer);
  state.autoSyncTimer = setInterval(() => {
    if(document.hidden) return;
    if(state.apiUrl) loadAnomalies({silent:true, background:true});
  }, AUTO_SYNC_MS);
  window.addEventListener('focus', () => { if(state.apiUrl) loadAnomalies({silent:true, background:true}); });
  document.addEventListener('visibilitychange', () => {
    if(!document.hidden && state.apiUrl) loadAnomalies({silent:true, background:true});
  });
}

async function showHistory(){
  state.listMode = 'history';
  state.selectedPoint = null;
  document.querySelectorAll('.hotspot').forEach(el => el.classList.remove('selected'));
  $('pointSelect').value = '';
  $('detailPanel').classList.add('open');
  $('newAnomalyBtn').classList.add('hidden');
  $('anomalyForm').classList.add('hidden');
  $('detailTitle').textContent = 'Storico consegne';
  $('detailSubtitle').textContent = 'Cronologia creazioni, modifiche stato ed eliminazioni';
  $('pointSummary').innerHTML = '<b>Storico condiviso</b><br>Qui vedi le attività registrate sul database D1. La lista si aggiorna quando apri questa sezione.';
  $('pointCount').textContent = '...';
  $('anomalyList').className = 'anomaly-list empty';
  $('anomalyList').textContent = 'Caricamento storico...';
  await loadLogs();
  renderHistory();
}


function showReport(){
  state.listMode = 'report';
  state.selectedPoint = null;
  document.querySelectorAll('.hotspot').forEach(el => el.classList.remove('selected'));
  $('pointSelect').value = '';
  $('detailPanel').classList.add('open');
  $('newAnomalyBtn').classList.add('hidden');
  $('anomalyForm').classList.add('hidden');
  renderReport();
}

function renderReport(){
  if(state.listMode !== 'report') return;
  const items = state.anomalies.slice();
  const active = items.filter(a => a.status !== 'risolta');
  const resolved = items.filter(a => a.status === 'risolta');
  const byPoint = groupCount(items, a => `${a.zone || '-'}||${a.point_label || a.point_id || '-'}`)
    .map(row => ({...row, zone: row.key.split('||')[0], point: row.key.split('||')[1]}));
  const byType = groupCount(items, a => labelProblemType(a.problem_type || inferProblemType(a.title || a.description || '')));
  const byPair = groupCount(items, a => `${a.zone || '-'}||${a.point_label || a.point_id || '-'}||${labelProblemType(a.problem_type || inferProblemType(a.title || a.description || ''))}`)
    .map(row => {
      const [zone, point, type] = row.key.split('||');
      return {...row, zone, point, type};
    });

  $('detailTitle').textContent = 'Report anomalie';
  $('detailSubtitle').textContent = 'Frequenze per punto e tipo problema';
  $('pointSummary').innerHTML = `
    <div class="report-kpis">
      <div><b>${items.length}</b><span>Totali</span></div>
      <div><b>${active.length}</b><span>Attive</span></div>
      <div><b>${resolved.length}</b><span>Risolte</span></div>
    </div>`;
  $('pointCount').textContent = items.length;
  $('anomalyList').className = 'anomaly-list report-list';
  if(!items.length){
    $('anomalyList').className = 'anomaly-list empty';
    $('anomalyList').textContent = 'Nessuna anomalia presente: il report si compilerà automaticamente quando inizierai a registrare segnalazioni.';
    return;
  }
  $('anomalyList').innerHTML = `
    <section class="report-section">
      <h4>Punti con più anomalie</h4>
      ${reportRows(byPoint.slice(0,8), row => `<button data-report-point="1" data-zone="${escapeAttr(row.zone)}" data-point-label="${escapeAttr(row.point)}">${escapeHtml(row.zone)} • ${escapeHtml(row.point)}</button>`, items.length)}
    </section>
    <section class="report-section">
      <h4>Tipi di problema più frequenti</h4>
      ${reportRows(byType.slice(0,8), row => `<span>${escapeHtml(row.key)}</span>`, items.length)}
    </section>
    <section class="report-section">
      <h4>Combinazione punto + tipo problema</h4>
      ${reportRows(byPair.slice(0,10), row => `<button data-report-point="1" data-zone="${escapeAttr(row.zone)}" data-point-label="${escapeAttr(row.point)}">${escapeHtml(row.zone)} • ${escapeHtml(row.point)}<br><small>${escapeHtml(row.type)}</small></button>`, items.length)}
    </section>
    <div class="report-actions">
      <button id="exportReportBtn">⇩ Esporta report</button>
    </div>`;

  $('anomalyList').querySelectorAll('[data-report-point]').forEach(btn => btn.addEventListener('click', () => {
    const zone = btn.dataset.zone;
    const pointLabel = btn.dataset.pointLabel;
    const zoneNum = String(zone || '').replace(/\D/g,'') || state.zone;
    const pt = (ZONES[zoneNum]?.points || []).find(p => p.label === pointLabel || p.id === pointLabel);
    if(pt) openAnomalyPoint(zone, pt.id);
  }));
  const exportBtn = $('exportReportBtn');
  if(exportBtn) exportBtn.addEventListener('click', exportReportTxt);
}

function groupCount(items, keyFn){
  const map = new Map();
  items.forEach(item => {
    const key = keyFn(item) || '-';
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].map(([key,total]) => ({key,total})).sort((a,b) => b.total - a.total || String(a.key).localeCompare(String(b.key)));
}

function reportRows(rows, labelFn, total){
  if(!rows.length) return '<div class="empty-mini">Nessun dato.</div>';
  const max = Math.max(...rows.map(r => r.total), 1);
  return `<div class="report-table">${rows.map(row => {
    const pct = Math.round((row.total / total) * 100);
    const bar = Math.max(5, Math.round((row.total / max) * 100));
    return `<div class="report-row">
      <div class="report-label">${labelFn(row)}</div>
      <div class="report-bar"><span style="width:${bar}%"></span></div>
      <b>${row.total}</b><em>${pct}%</em>
    </div>`;
  }).join('')}</div>`;
}

function inferProblemType(text){
  const t = String(text || '').toLowerCase();
  if(t.includes('sensore') || t.includes('prossim')) return 'sensore';
  if(t.includes('robot') || t.includes('pinza')) return 'robot';
  if(t.includes('keyence') || t.includes('visione') || t.includes('camera') || t.includes('scart')) return 'visione_keyence';
  if(t.includes('lavatrice') || t.includes('lavaggio')) return 'lavatrice';
  if(t.includes('peso') || t.includes('grasso') || t.includes('bilancia')) return 'pesatura_grasso';
  if(t.includes('gioco')) return 'gioco_radiale';
  if(t.includes('scorrevolezza')) return 'scorrevolezza';
  if(t.includes('elettric') || t.includes('allarme')) return 'elettrica';
  if(t.includes('meccanic') || t.includes('rumore') || t.includes('cuscinetto')) return 'meccanica';
  if(t.includes('sicurezza') || t.includes('emergenza') || t.includes('porta')) return 'sicurezza';
  return 'altro';
}

function exportReportTxt(){
  const items = state.anomalies.slice();
  const byPoint = groupCount(items, a => `${a.zone || '-'} - ${a.point_label || a.point_id || '-'}`);
  const byType = groupCount(items, a => labelProblemType(a.problem_type || inferProblemType(a.title || a.description || '')));
  const byPair = groupCount(items, a => `${a.zone || '-'} - ${a.point_label || a.point_id || '-'} - ${labelProblemType(a.problem_type || inferProblemType(a.title || a.description || ''))}`);
  const text = [
    `REPORT ANOMALIE - ${new Date().toLocaleString('it-IT')}`,
    `Totale anomalie: ${items.length}`,
    '',
    'PUNTI PIÙ FREQUENTI',
    ...byPoint.map(r => `${r.total} - ${r.key}`),
    '',
    'TIPI PROBLEMA PIÙ FREQUENTI',
    ...byType.map(r => `${r.total} - ${r.key}`),
    '',
    'PUNTO + TIPO PROBLEMA',
    ...byPair.map(r => `${r.total} - ${r.key}`)
  ].join('\n');
  downloadText('report-anomalie-passaggio-consegne.txt', text);
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function showAllAnomalies(status='tutte'){
  state.listMode = 'all';
  state.selectedPoint = null;
  $('statusFilter').value = status;
  document.querySelectorAll('.hotspot').forEach(el => el.classList.remove('selected'));
  $('pointSelect').value = '';
  $('detailPanel').classList.add('open');
  $('newAnomalyBtn').classList.add('hidden');
  $('anomalyForm').classList.add('hidden');
  renderAnomalies();
  setTimeout(() => $('detailPanel').scrollTo({top:0,behavior:'smooth'}), 0);
}

function toggleMapFocus(){
  state.mapFocus = !state.mapFocus;
  document.body.classList.toggle('map-focus', state.mapFocus);
}

function tickClock(){
  const now = new Date();
  $('clock').textContent = now.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'2-digit'}) + ', ' + now.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
}

function switchZone(zone){
  state.zone = String(zone);
  state.selectedPoint = null;
  state.listMode = 'point';
  document.querySelectorAll('.zone-tab').forEach(b => b.classList.toggle('active', b.dataset.zone === state.zone));
  renderZone();
  renderAnomalies();
  resetDetail();
}

function renderZone(){
  const zone = ZONES[state.zone];
  $('zoneTitle').textContent = zone.title;
  $('layoutImage').src = zone.image;
  $('layoutImage').alt = `Layout Zona ${state.zone}`;
  const select = $('pointSelect');
  select.innerHTML = '<option value="">-- Seleziona punto --</option>' + zone.points.map(pt => `<option value="${escapeAttr(pt.id)}">${escapeHtml(pt.label)}</option>`).join('');
  const layer = $('hotspotLayer');
  layer.innerHTML = '';
  zone.points.forEach(pt => {
    const btn = document.createElement('button');
    btn.className = 'hotspot';
    btn.type = 'button';
    btn.dataset.id = pt.id;
    btn.dataset.label = pt.label;
    btn.title = pt.label;
    btn.setAttribute('aria-label', pt.label);
    btn.style.left = pt.x + '%'; btn.style.top = pt.y + '%'; btn.style.width = pt.w + '%'; btn.style.height = pt.h + '%';
    btn.addEventListener('click', (e) => { e.stopPropagation(); selectPoint(pt.id); });
    layer.appendChild(btn);
  });
  $('mapInner').classList.toggle('show-areas', state.showAreas);
  setZoom(1);
}

function toggleAreas(value){
  state.showAreas = Boolean(value);
  $('mapInner').classList.toggle('show-areas', state.showAreas);
}

function setZoom(value){
  state.zoom = Number(value.toFixed(2));
  $('mapInner').style.width = `${state.zoom * 100}%`;
  $('zoomText').textContent = Math.round(state.zoom * 100) + '%';
}

function fallbackImageClick(e){
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  const pts = ZONES[state.zone].points;
  const exact = pts.find(pt => x >= pt.x && x <= pt.x + pt.w && y >= pt.y && y <= pt.y + pt.h);
  if(exact){ selectPoint(exact.id); return; }
  let best = null, bestD = Infinity;
  pts.forEach(pt => {
    const cx = pt.x + pt.w/2, cy = pt.y + pt.h/2;
    const d = Math.hypot(cx-x, cy-y);
    if(d < bestD){ best = pt; bestD = d; }
  });
  if(best && bestD < 2.2) selectPoint(best.id);
}

function selectPoint(pointId){
  if(!pointId) return;
  state.listMode = 'point';
  $('newAnomalyBtn').classList.remove('hidden');
  const pt = ZONES[state.zone].points.find(p => p.id === pointId);
  if(!pt) return;
  state.selectedPoint = pt;
  $('pointSelect').value = pt.id;
  document.querySelectorAll('.hotspot').forEach(el => el.classList.toggle('selected', el.dataset.id === pt.id));
  $('detailTitle').textContent = pt.label;
  $('detailSubtitle').textContent = `Zona ${state.zone}`;
  $('pointSummary').innerHTML = `<b>${escapeHtml(pt.label)}</b><br>${escapeHtml(pt.description)}<br><small>ID punto: ${escapeHtml(pt.id)}</small>`;
  $('anomalyForm').classList.add('hidden');
  $('detailPanel').classList.add('open');
  renderAnomalies();
}

function openAnomalyPoint(zoneName, pointId){
  const z = String(zoneName || '').replace(/\D/g,'') || state.zone;
  if(ZONES[z] && z !== state.zone){
    state.zone = z;
    document.querySelectorAll('.zone-tab').forEach(b => b.classList.toggle('active', b.dataset.zone === state.zone));
    renderZone();
  }
  const pt = ZONES[state.zone].points.find(p => p.id === pointId);
  if(pt){
    selectPoint(pt.id);
    window.scrollTo({top:0,behavior:'smooth'});
  }
}

function resetDetail(){
  $('detailPanel').classList.remove('open');
  $('detailTitle').textContent = 'Nessun punto selezionato';
  $('detailSubtitle').textContent = 'Seleziona una scritta sul layout.';
  state.listMode = 'point';
  $('pointSummary').innerHTML = '';
  $('newAnomalyBtn').classList.remove('hidden');
  $('pointCount').textContent = '0';
  $('anomalyList').className = 'anomaly-list empty';
  $('anomalyList').textContent = 'Seleziona un punto per vedere le anomalie.';
  $('anomalyForm').classList.add('hidden');
  document.querySelectorAll('.hotspot').forEach(el => el.classList.remove('selected'));
}
function closeDetail(){
  $('detailPanel').classList.remove('open');
}

async function loadAnomalies(options={}){
  const silent = Boolean(options.silent);
  state.loading = true;
  if(!silent) updateSyncStatus('Caricamento...', '');
  try{
    if(state.apiUrl){
      const data = await apiFetch('/api/anomalies?limit=1000');
      state.anomalies = data.items || [];
      updateSyncStatus('Online D1', 'online');
    }else{
      state.anomalies = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      updateSyncStatus('Locale', 'offline');
    }
    $('lastUpdate').textContent = new Date().toLocaleString('it-IT');
  }catch(err){
    console.error(err);
    state.anomalies = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    updateSyncStatus('Offline / locale', 'offline');
    if(!silent) toast('Backend non raggiungibile: uso dati locali.');
  }finally{
    state.loading = false;
    renderAnomalies();
  }
}

function renderAnomalies(){
  const status = $('statusFilter').value;
  const open = state.anomalies.filter(a => a.status === 'aperta').length;
  $('openCount').textContent = open;
  const drawerOpen = $('drawerOpenCount');
  if(drawerOpen) drawerOpen.textContent = open;

  if(state.listMode === 'history'){
    renderHistory();
    return;
  }

  if(state.listMode === 'report'){
    renderReport();
    return;
  }

  if(state.listMode === 'all'){
    const allItems = filteredAnomaliesForAll(status);
    $('detailPanel').classList.add('open');
    $('detailTitle').textContent = status === 'aperta' ? 'Anomalie aperte' : 'Tutte le anomalie';
    $('detailSubtitle').textContent = status === 'tutte' ? 'Elenco completo di tutte le zone' : `Filtro: ${labelStatus(status)}`;
    $('pointSummary').innerHTML = `<b>Registro condiviso</b><br>Da qui puoi aprire direttamente il punto della segnalazione e vedere il dettaglio.`;
    $('pointCount').textContent = allItems.length;
    $('newAnomalyBtn').classList.add('hidden');
    $('anomalyForm').classList.add('hidden');
    renderListItems(allItems, true, 'Nessuna anomalia trovata con questo filtro.');
    return;
  }

  if(!state.selectedPoint){
    $('anomalyList').className = 'anomaly-list empty';
    $('anomalyList').textContent = 'Seleziona un punto per vedere le anomalie oppure apri “Tutte le anomalie” dal menu.';
    $('pointCount').textContent = '0';
    return;
  }

  const zoneName = `Zona ${state.zone}`;
  let pointItems = state.anomalies.filter(a => a.zone === zoneName && a.point_id === state.selectedPoint.id);
  if(status !== 'tutte') pointItems = pointItems.filter(a => a.status === status);
  pointItems = sortAnomalies(pointItems);
  $('pointCount').textContent = pointItems.length;
  $('newAnomalyBtn').classList.remove('hidden');
  renderListItems(pointItems, false, 'Nessuna anomalia per questo punto.');
}


async function loadLogs(){
  try{
    if(state.apiUrl){
      const data = await apiFetch('/api/logs?limit=500');
      state.logs = data.items || [];
    }else{
      state.logs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
    }
  }catch(err){
    console.error(err);
    state.logs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
  }
}

function renderHistory(){
  if(state.listMode !== 'history') return;
  const logs = (state.logs || []).slice().sort((a,b)=> new Date(b.created_at||0) - new Date(a.created_at||0));
  $('detailPanel').classList.add('open');
  $('detailTitle').textContent = 'Storico consegne';
  $('detailSubtitle').textContent = 'Ultime attività registrate';
  $('pointSummary').innerHTML = `<b>Sincronizzazione:</b> ${state.apiUrl ? 'Cloudflare D1' : 'Locale'}<br><small>Lo storico contiene inserimenti, cambi stato, aggiornamenti ed eliminazioni.</small>`;
  $('pointCount').textContent = logs.length;
  $('newAnomalyBtn').classList.add('hidden');
  if(!logs.length){
    $('anomalyList').className = 'anomaly-list empty';
    $('anomalyList').textContent = 'Nessuno storico disponibile.';
    return;
  }
  $('anomalyList').className = 'anomaly-list history-list';
  $('anomalyList').innerHTML = logs.map(log => historyCard(log)).join('');
  $('anomalyList').querySelectorAll('[data-open-history-point]').forEach(btn => btn.addEventListener('click', () => {
    openAnomalyPoint(btn.dataset.zone, btn.dataset.pointId);
  }));
}

function historyCard(log){
  const action = String(log.action || '').toLowerCase();
  const badge = action.includes('delete') ? 'Eliminazione' : action.includes('create') ? 'Creazione' : action.includes('status') ? 'Cambio stato' : action.includes('update') ? 'Aggiornamento' : (log.action || 'Evento');
  const zone = log.zone || '';
  const point = log.point_id || '';
  const canOpen = zone && point;
  return `<article class="history-card">
    <div class="history-top"><b>${escapeHtml(badge)}</b><span>${formatDate(log.created_at)}</span></div>
    <p>${escapeHtml(historyText(log))}</p>
    ${log.status ? `<p><b>Stato:</b> ${escapeHtml(labelStatus(log.status))}</p>` : ''}
    ${log.operator_name ? `<p><b>Operatore:</b> ${escapeHtml(log.operator_name)}</p>` : ''}
    ${canOpen ? `<button data-open-history-point="1" data-zone="${escapeAttr(zone)}" data-point-id="${escapeAttr(point)}">Apri punto ${escapeHtml(log.point_label || point)}</button>` : `<small>Dettaglio punto non disponibile per questo evento.</small>`}
  </article>`;
}

function historyText(log){
  const loc = [log.zone, log.point_label || log.point_id].filter(Boolean).join(' • ');
  const title = log.title ? ` — ${log.title}` : '';
  return `${loc || 'Evento registro'}${title}`;
}

function pushLocalLog(anomaly, action, status){
  const logs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
  logs.unshift({
    id: crypto.randomUUID(),
    anomaly_id: anomaly.id,
    created_at: new Date().toISOString(),
    action,
    status: status || anomaly.status || '',
    operator_name: anomaly.operator_name || '',
    zone: anomaly.zone || '',
    point_id: anomaly.point_id || '',
    point_label: anomaly.point_label || '',
    title: anomaly.title || ''
  });
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs.slice(0,500)));
}

function filteredAnomaliesForAll(status){
  let items = state.anomalies.slice();
  if(status !== 'tutte') items = items.filter(a => a.status === status);
  return sortAnomalies(items);
}

function sortAnomalies(items){
  return items.sort((a,b) => new Date(b.created_at || b.date_time || 0) - new Date(a.created_at || a.date_time || 0));
}

function renderListItems(items, globalMode=false, emptyText='Nessuna anomalia.'){
  const list = $('anomalyList');
  if(items.length === 0){
    list.className = 'anomaly-list empty';
    list.textContent = emptyText;
    return;
  }
  list.className = 'anomaly-list';
  list.innerHTML = items.map(a => anomalyCard(a, globalMode)).join('');
  bindAnomalyListEvents(list);
}

function bindAnomalyListEvents(list){
  list.querySelectorAll('[data-status-set]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateAnomalyStatus(btn.dataset.id, btn.dataset.statusSet);
  }));
  list.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteAnomaly(btn.dataset.delete);
  }));
  list.querySelectorAll('[data-open-anomaly]').forEach(card => card.addEventListener('click', () => {
    openAnomalyPoint(card.dataset.zone, card.dataset.pointId);
  }));
  list.querySelectorAll('[data-open-point]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openAnomalyPoint(btn.dataset.zone, btn.dataset.pointId);
  }));
}

function anomalyCard(a, globalMode=false){
  const zone = escapeAttr(a.zone || '');
  const pointId = escapeAttr(a.point_id || '');
  const clickableAttrs = globalMode ? ` data-open-anomaly="1" data-zone="${zone}" data-point-id="${pointId}"` : '';
  return `<article class="anomaly-card ${globalMode ? 'clickable' : ''}"${clickableAttrs}>
    <div class="anomaly-top">
      <div>
        <h4>${escapeHtml(a.title || 'Anomalia')}</h4>
        ${globalMode ? `<div class="anomaly-location">${escapeHtml(a.zone || '-')} • ${escapeHtml(a.point_label || a.point_id || '-')}</div>` : ''}
        <div class="priority ${a.priority || 'media'}">Priorità ${labelPriority(a.priority)}</div>
        <div class="problem-type">Tipo: ${escapeHtml(labelProblemType(a.problem_type || 'altro'))}</div>
      </div>
      <span class="status ${a.status}">${labelStatus(a.status)}</span>
    </div>
    <p><b>Orario:</b> ${formatDate(a.created_at || a.date_time)}</p>
    <p><b>Turno:</b> ${escapeHtml(a.shift || '-')}</p>
    <p><b>Descrizione:</b><br>${escapeHtml(a.description || '')}</p>
    ${a.action ? `<p><b>Consegna:</b><br>${escapeHtml(a.action)}</p>` : ''}
    ${a.operator_name ? `<p><b>Operatore:</b> ${escapeHtml(a.operator_name)}</p>` : ''}
    <div class="card-actions">
      ${globalMode ? `<button data-open-point="1" data-zone="${zone}" data-point-id="${pointId}">Apri punto</button>` : ''}
      <button data-id="${escapeAttr(a.id)}" data-status-set="aperta">Aperta</button>
      <button data-id="${escapeAttr(a.id)}" data-status-set="lavorazione">In lavorazione</button>
      <button data-id="${escapeAttr(a.id)}" data-status-set="risolta">Risolta</button>
      <button data-delete="${escapeAttr(a.id)}">Elimina</button>
    </div>
  </article>`;
}

async function saveAnomaly(e){
  e.preventDefault();
  if(!state.selectedPoint){ toast('Seleziona prima un punto.'); return; }
  const body = {
    zone: `Zona ${state.zone}`,
    point_id: state.selectedPoint.id,
    point_label: state.selectedPoint.label,
    title: $('aTitle').value.trim(),
    problem_type: $('aProblemType').value,
    shift: $('aShift').value,
    priority: $('aPriority').value,
    description: $('aDescription').value.trim(),
    action: $('aAction').value.trim(),
    operator_name: $('aOperator').value.trim(),
    status: 'aperta',
    source_device: navigator.userAgent.slice(0,180)
  };
  try{
    let saved;
    if(state.apiUrl){
      saved = await apiFetch('/api/anomalies', {method:'POST', body: JSON.stringify(body)});
      state.anomalies.unshift(saved.item);
      updateSyncStatus('Online D1', 'online');
    }else{
      saved = {item: {...body, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString()}};
      state.anomalies.unshift(saved.item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.anomalies));
      pushLocalLog(saved.item, 'create', saved.item.status);
    }
    e.target.reset();
    $('aPriority').value = 'media';
    $('aProblemType').value = 'altro';
    $('anomalyForm').classList.add('hidden');
    $('lastUpdate').textContent = new Date().toLocaleString('it-IT');
    renderAnomalies();
  }catch(err){
    console.error(err); toast('Errore salvataggio: controlla PIN app o collegamento Cloudflare.'); if(String(err.message||'').includes('PIN')) openAccessDialog(false);
  }
}

async function updateAnomalyStatus(id, status){
  try{
    if(state.apiUrl){
      const res = await apiFetch(`/api/anomalies/${encodeURIComponent(id)}`, {method:'PATCH', body: JSON.stringify({status})});
      state.anomalies = state.anomalies.map(a => a.id === id ? res.item : a);
    }else{
      const old = state.anomalies.find(a => a.id === id) || {};
      state.anomalies = state.anomalies.map(a => a.id === id ? {...a, status, updated_at:new Date().toISOString()} : a);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.anomalies));
      const updated = state.anomalies.find(a => a.id === id) || old;
      pushLocalLog(updated, `status:${old.status || ''}->${status}`, status);
    }
    renderAnomalies();
  }catch(err){ toast('Errore aggiornamento stato: controlla PIN app.'); if(String(err.message||'').includes('PIN')) openAccessDialog(false); }
}

async function deleteAnomaly(id){
  if(!confirm('Eliminare questa anomalia?')) return;
  try{
    const old = state.anomalies.find(a => a.id === id);
    if(state.apiUrl) await apiFetch(`/api/anomalies/${encodeURIComponent(id)}`, {method:'DELETE'});
    if(!state.apiUrl && old) pushLocalLog(old, 'delete', old.status);
    state.anomalies = state.anomalies.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.anomalies));
    renderAnomalies();
  }catch(err){ toast('Errore eliminazione: controlla PIN app.'); if(String(err.message||'').includes('PIN')) openAccessDialog(false); }
}

async function apiFetch(path, opts={}){
  const url = state.apiUrl.replace(/\/$/,'') + path;
  const headers = {'Content-Type':'application/json'};
  if(state.apiKey) headers['X-APP-KEY'] = state.apiKey;
  if(state.userPin) headers['X-APP-PIN'] = state.userPin;
  const res = await fetch(url, {...opts, headers:{...headers, ...(opts.headers||{})}});
  const text = await res.text();
  let data = text ? JSON.parse(text) : {};
  if(!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

function openAccessDialog(force=false){
  $('userPinInput').value = state.userPin || '';
  $('userPinMsg').textContent = force ? 'Inserisci il PIN app per abilitare salvataggio, cambio stato ed eliminazione su D1.' : '';
  $('accessDialog').showModal();
}

async function saveUserPin(e){
  e.preventDefault();
  const pin = $('userPinInput').value.trim();
  if(!pin){ $('userPinMsg').textContent = 'Inserisci il PIN app.'; return; }
  const oldPin = state.userPin;
  state.userPin = pin;
  try{
    if(state.apiUrl) await apiFetch('/api/session/check', {method:'POST', body: JSON.stringify({})});
    localStorage.setItem(USER_PIN_KEY, state.userPin);
    $('userPinMsg').textContent = 'PIN corretto. App collegata al registro condiviso.';
    setTimeout(() => $('accessDialog').close(), 450);
    loadAnomalies({silent:true});
  }catch(err){
    state.userPin = oldPin;
    $('userPinMsg').textContent = 'PIN non valido o backend non raggiungibile.';
  }
}

async function verifyAdminPin(pin){
  const url = (state.apiUrl || DEFAULT_API_URL).replace(/\/$/,'') + '/api/admin/check';
  const res = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json','X-ADMIN-PIN':pin}, body:'{}'});
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if(!res.ok) throw new Error(data.error || 'PIN admin non valido');
  return data;
}

async function openBackendDialog(adminMode=false){
  if(adminMode){
    const adminPin = prompt('Area admin: inserisci il PIN amministratore.');
    if(!adminPin) return;
    try{ await verifyAdminPin(adminPin); }
    catch(err){ toast('PIN admin non valido oppure APP_ADMIN_PIN non configurato.'); return; }
  }
  $('apiUrlInput').value = state.apiUrl || DEFAULT_API_URL;
  $('apiKeyInput').value = state.apiKey;
  $('backendMsg').textContent = '';
  $('backendDialog').showModal();
}
function saveBackendConfig(e){
  e.preventDefault();
  state.apiUrl = ($('apiUrlInput').value.trim() || DEFAULT_API_URL).replace(/\/$/,'');
  state.apiKey = $('apiKeyInput').value.trim();
  localStorage.setItem(API_URL_KEY, state.apiUrl);
  localStorage.setItem(API_KEY_KEY, state.apiKey);
  $('backendMsg').textContent = 'Configurazione admin salvata. Agli operatori servirà solo il PIN app.';
  startAutoSync();
  loadAnomalies();
}
async function testBackend(e){
  e.preventDefault();
  const oldUrl = state.apiUrl, oldKey = state.apiKey;
  state.apiUrl = ($('apiUrlInput').value.trim() || DEFAULT_API_URL).replace(/\/$/,'');
  state.apiKey = $('apiKeyInput').value.trim();
  try{ const res = await apiFetch('/api/health'); $('backendMsg').textContent = 'Test OK: ' + (res.status || 'online'); }
  catch(err){ $('backendMsg').textContent = 'Test fallito: ' + err.message; }
  finally{ state.apiUrl = oldUrl; state.apiKey = oldKey; }
}

function exportTxt(){
  const rows = state.anomalies.map(a => `[${formatDate(a.created_at)}] ${a.zone} - ${a.point_label}\nStato: ${labelStatus(a.status)} | Priorità: ${labelPriority(a.priority)} | Tipo: ${labelProblemType(a.problem_type || 'altro')} | Turno: ${a.shift}\nTitolo: ${a.title}\nDescrizione: ${a.description}\nConsegna: ${a.action || '-'}\nOperatore: ${a.operator_name || '-'}\n`).join('\n-----------------------------\n');
  downloadText('passaggio-consegne-anomalie.txt', rows);
}

function updateSyncStatus(text, cls){
  const el = $('syncStatus'); el.textContent = text; el.className = 'sync-status ' + (cls || '');
}
function toast(msg){ alert(msg); }
function labelStatus(s){ return ({aperta:'Aperta', lavorazione:'In lavorazione', risolta:'Risolta'}[s] || s || '-'); }
function labelPriority(p){ return ({alta:'Alta', media:'Media', bassa:'Bassa'}[p] || p || '-'); }
function labelProblemType(t){ return ({sensore:'Sensore', meccanica:'Meccanica', elettrica:'Elettrica', robot:'Robot', visione_keyence:'Visione / Keyence', misura:'Misura / calibrazione', gioco_radiale:'Gioco radiale', scorrevolezza:'Scorrevolezza', lavatrice:'Lavatrice', pesatura_grasso:'Pesatura / grasso', sicurezza:'Sicurezza', altro:'Altro'}[t] || t || 'Altro'); }
function formatDate(value){ if(!value) return '-'; const d = new Date(value); return isNaN(d) ? value : d.toLocaleString('it-IT'); }
function escapeHtml(str){ return String(str ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function escapeAttr(str){ return escapeHtml(str).replace(/`/g,'&#96;'); }
