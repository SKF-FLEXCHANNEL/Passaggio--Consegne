/* Passaggio Consegne - Frontend condiviso Cloudflare Workers/D1
   Versione 8: menu laterale completo, elenco globale anomalie e apertura segnalazioni dal menu.
*/
const APP_VERSION = '8.0.0-menu-global-list-fix';
const STORAGE_KEY = 'pc_anomalie_local_v7';
const API_URL_KEY = 'pc_api_url';
const API_KEY_KEY = 'pc_api_key';

const ZONES = {
  1: {
    title: 'ZONA 1 - Layout interattivo',
    image: 'img/zona1.jpg',
    points: [
      p('SG01','Porta 1 / SG01','Ingresso sicurezza zona 1', 11.2, 23.2, 9.2, 4.8),
      p('OP30A','OP30A','Magazzino sfere / stazione OP30A', 21.1, 27.2, 7.4, 4.8),
      p('OP30B','OP30B','Magazzino sfere / stazione OP30B', 27.1, 24.8, 7.4, 4.8),
      p('OP30C','OP30C','Magazzino sfere / stazione OP30C', 32.5, 22.9, 7.4, 4.8),
      p('OP30D','OP30D','Magazzino sfere / stazione OP30D', 39.7, 24.8, 7.4, 4.8),
      p('OP30E','OP30E','Magazzino sfere / stazione OP30E', 46.7, 27.2, 7.4, 4.8),
      p('SG03','Porta 3 / SG03','Varco superiore centrale', 52.8, 18.7, 8.8, 7.0),
      p('SG05','Porta 5 / SG05','Varco superiore destro', 68.5, 27.4, 12.0, 4.8),

      p('R01','R01','Robot R01', 24.9, 40.5, 6.8, 5.4),
      p('R02','R02','Robot R02', 29.0, 63.7, 6.2, 5.3),
      p('R03','R03','Robot R03', 30.1, 32.2, 7.0, 5.0),
      p('R04','R04','Robot R04', 53.2, 32.4, 7.2, 5.2),
      p('R05','R05','Robot R05', 47.8, 65.0, 6.8, 5.0),
      p('R06','R06','Robot R06', 67.9, 38.1, 6.6, 5.0),

      p('OP05A','OP05A','Prelievo anello esterno', 11.0, 47.8, 10.6, 4.4),
      p('OP05B','OP05B','Prelievo anello esterno', 11.0, 52.8, 10.6, 4.4),
      p('OP10A','OP10A','Misura anello esterno', 21.3, 56.0, 7.8, 5.0),
      p('OP10B','OP10B','Misura anello interno', 29.1, 44.1, 7.8, 5.0),
      p('OP20A','OP20A','Deposito/inserimento anelli - OP20A', 37.2, 58.0, 7.8, 5.0),
      p('OP20B','OP20B','Deposito/inserimento anelli - OP20B', 36.4, 41.8, 8.0, 5.4),
      p('OP40A','OP40A','Area fasatura/carico gabbia superiore OP40A', 47.4, 43.3, 8.2, 5.0),
      p('OP40B','OP40B','Area fasatura/carico gabbia superiore OP40B', 58.2, 43.3, 8.2, 5.0),
      p('OP60','OP60','Stazione OP60', 50.6, 48.0, 7.0, 4.8),
      p('OP70','OP70','Stazione OP70', 52.5, 52.4, 7.0, 4.8),
      p('OP80','OP80','Stazione OP80', 53.5, 65.1, 7.2, 4.8),
      p('OP90','OP90','Stazione OP90', 63.7, 65.2, 7.2, 4.8),
      p('OP100','OP100','Controllo visivo / area OP100', 64.3, 58.0, 8.4, 4.8),
      p('OP110','OP110','Stazione OP110', 63.6, 51.7, 8.0, 4.8),
      p('OP115','OP115','Stazione OP115', 68.7, 36.0, 7.6, 4.8),
      p('OP120','OP120','Tavola centrale OP120', 58.1, 48.3, 9.2, 5.0),
      p('OP125','OP125','Controllo visivo Keyence 3D / OP125', 73.5, 66.0, 8.3, 4.8),
      p('OP125B','OP125B','Stazione OP125B', 69.7, 49.2, 8.5, 4.8),
      p('KEYENCE','Keyence','Controllo visivo Keyence 3D', 72.5, 60.2, 9.5, 6.3),
      p('LAVATRICE','Lavatrice','Lavatrice zona 1', 70.0, 73.3, 7.5, 15.5),
      p('QE1','Q.E. Zona 1','Quadro elettrico zona 1', 83.4, 33.3, 6.4, 23.2),
      p('R04-R05-R06','R04 / R05 / R06','Armadio/area robot R04-R05-R06', 83.8, 58.0, 6.9, 24.5),
      p('SG02','Porta 2 / SG02','Varco inferiore centrale', 25.2, 80.0, 16.0, 4.8),
      p('R01-R02-R03','R01-R02-R03','Armadio/area robot R01-R02-R03', 12.9, 87.8, 12.2, 4.4),
      p('EMERGENZA','Emergenza Generale','Area emergenza generale', 6.4, 86.2, 8.5, 7.0),
      p('PAR01','PAR 01','Protezione perimetrale PAR 01', 5.7, 72.8, 6.0, 9.8)
    ]
  },
  2: {
    title: 'ZONA 2 - Layout interattivo',
    image: 'img/zona2.jpg',
    points: [
      p('CONTROLLO-LAVATRICE-TOP','Controllo Lavatrice','Controllo lavatrice superiore', 23.0, 2.3, 12.0, 4.0),
      p('QE2','Q.E. Zona 2','Quadro elettrico zona 2', 43.8, 14.0, 10.0, 4.8),
      p('R07-R08-R09','R07-08-09','Armadio/area robot R07-R08-R09', 55.2, 11.7, 11.0, 5.0),
      p('SG01','Porta 1 / SG01','Varco superiore destro zona 2', 70.2, 18.2, 11.0, 4.2),
      p('LAVATRICE-SX','Lavatrice sinistra','Lavatrice lato sinistro', 15.2, 34.4, 10.5, 6.0),
      p('OP170A+B','OP170A+B','Stazione OP170A+B', 33.7, 37.0, 6.5, 14.5),
      p('R07','R07','Robot R07', 37.2, 60.2, 5.5, 8.0),
      p('OP180','OP180','Stazione OP180', 50.0, 39.8, 6.5, 13.0),
      p('R08','R08','Robot R08', 45.8, 60.2, 5.5, 8.0),
      p('OP185','OP185','Stazione OP185', 50.9, 55.2, 5.6, 8.0),
      p('OP190','OP190','Stazione OP190', 57.0, 35.0, 6.5, 14.5),
      p('R09','R09','Robot R09', 56.0, 60.5, 6.0, 8.0),
      p('OP125C','OP125C','Stazione OP125C', 63.8, 48.0, 8.5, 5.0),
      p('OP135','OP135','Stazione OP135', 68.0, 40.0, 7.0, 5.5),
      p('OP200','OP200','Lavatrice / stazione OP200', 79.5, 47.0, 8.5, 4.5),
      p('LAVATRICE-DX','Lavatrice destra','Lavatrice lato destro', 77.0, 40.0, 10.5, 6.0),
      p('CONTROLLO-LAVATRICE-DX','Controllo Lavatrice','Controllo lavatrice destro', 75.0, 66.5, 7.5, 18.0),
      p('SG02','Porta 2 / SG02','Varco inferiore centrale zona 2', 53.5, 84.0, 12.5, 4.2),
      p('PAR02','PAR 02','Protezione perimetrale PAR 02', 69.0, 87.2, 10.0, 4.0)
    ]
  },
  3: {
    title: 'ZONA 3 - Layout interattivo',
    image: 'img/zona3.jpg',
    points: [
      p('SG01','Porta 1 / SG01','Varco superiore sinistro zona 3', 15.6, 20.5, 10.0, 4.5),
      p('R10-R11-R12','R10-11-12','Armadio/area robot R10-R11-R12', 27.4, 10.2, 11.8, 4.8),
      p('R13-R14','R13 / R14','Armadio/area robot R13/R14', 39.0, 10.2, 10.8, 4.8),
      p('SG03','Porta 3 / SG03','Varco porta 3 zona 3', 46.0, 9.6, 7.6, 4.8),
      p('SG05','Porta 5 / SG05','Varco porta 5 zona 3', 54.8, 9.6, 7.6, 4.8),
      p('QE3','Q.E. Zona 3','Quadro elettrico zona 3', 67.2, 13.2, 12.0, 5.0),
      p('SG07','Porta 7 / SG07','Varco destro zona 3', 79.3, 28.0, 10.0, 5.4),
      p('LAVATRICE','Lavatrice','Lavatrice zona 3', 10.4, 39.2, 10.3, 5.2),
      p('OP200','OP200','Stazione OP200', 12.3, 45.0, 7.2, 4.8),
      p('R10','R10','Robot R10', 37.3, 28.0, 5.8, 4.6),
      p('OP210','OP210','Stazione OP210', 35.4, 37.2, 5.6, 12.0),
      p('OP220','OP220','Stazione OP220', 39.3, 40.2, 7.5, 6.0),
      p('OP230','OP230','Stazione OP230', 28.0, 51.5, 7.6, 5.0),
      p('OP240','OP240','Stazione OP240', 34.0, 50.0, 6.2, 7.8),
      p('R11','R11','Robot R11', 36.0, 64.2, 6.0, 4.8),
      p('R12','R12','Robot R12', 50.4, 64.2, 6.0, 4.8),
      p('OP280A','OP280A','Stazione OP280A', 46.0, 27.8, 7.5, 5.2),
      p('OP280B','OP280B','Stazione OP280B', 53.6, 27.8, 7.5, 5.2),
      p('R13','R13','Robot R13', 55.0, 32.5, 5.8, 5.0),
      p('OP270A','OP270A','Stazione OP270A', 45.3, 44.0, 7.5, 6.2),
      p('OP270B','OP270B','Stazione OP270B', 55.8, 44.0, 7.5, 6.2),
      p('R14','R14','Robot R14', 68.2, 39.0, 5.8, 5.0),
      p('OP250','OP250','Stazione OP250', 65.0, 60.0, 7.5, 5.0),
      p('CONTROLLO-LAVATRICE','Controllo Lavatrice','Controllo lavatrice zona 3', 8.8, 63.8, 7.0, 16.0),
      p('SG02','Porta 2 / SG02','Varco inferiore zona 3', 30.7, 78.7, 10.8, 4.8),
      p('PAR02','PAR 02','Protezione perimetrale PAR 02', 48.0, 81.2, 9.2, 4.2)
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
  apiUrl: localStorage.getItem(API_URL_KEY) || '',
  apiKey: localStorage.getItem(API_KEY_KEY) || '',
  loading: false
};

const $ = (id) => document.getElementById(id);

window.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  tickClock(); setInterval(tickClock, 1000);
  renderZone();
  loadAnomalies();
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
  if(action === 'refresh') return loadAnomalies();
  if(action === 'export') return exportTxt();
  if(action === 'print') return window.print();
  if(action === 'backend') return openBackendDialog();
  if(action === 'areas') { $('showAreas').checked = !$('showAreas').checked; toggleAreas($('showAreas').checked); return; }
  if(action === 'focus') return toggleMapFocus();
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
  if(best && bestD < 6.5) selectPoint(best.id);
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

async function loadAnomalies(){
  state.loading = true;
  updateSyncStatus('Caricamento...', '');
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
    toast('Backend non raggiungibile: uso dati locali.');
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
    }
    e.target.reset();
    $('aPriority').value = 'media';
    $('anomalyForm').classList.add('hidden');
    $('lastUpdate').textContent = new Date().toLocaleString('it-IT');
    renderAnomalies();
  }catch(err){
    console.error(err); toast('Errore salvataggio: controlla URL API e chiave.');
  }
}

async function updateAnomalyStatus(id, status){
  try{
    if(state.apiUrl){
      const res = await apiFetch(`/api/anomalies/${encodeURIComponent(id)}`, {method:'PATCH', body: JSON.stringify({status})});
      state.anomalies = state.anomalies.map(a => a.id === id ? res.item : a);
    }else{
      state.anomalies = state.anomalies.map(a => a.id === id ? {...a, status, updated_at:new Date().toISOString()} : a);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.anomalies));
    }
    renderAnomalies();
  }catch(err){ toast('Errore aggiornamento stato.'); }
}

async function deleteAnomaly(id){
  if(!confirm('Eliminare questa anomalia?')) return;
  try{
    if(state.apiUrl) await apiFetch(`/api/anomalies/${encodeURIComponent(id)}`, {method:'DELETE'});
    state.anomalies = state.anomalies.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.anomalies));
    renderAnomalies();
  }catch(err){ toast('Errore eliminazione.'); }
}

async function apiFetch(path, opts={}){
  const url = state.apiUrl.replace(/\/$/,'') + path;
  const headers = {'Content-Type':'application/json'};
  if(state.apiKey) headers['X-APP-KEY'] = state.apiKey;
  const res = await fetch(url, {...opts, headers:{...headers, ...(opts.headers||{})}});
  const text = await res.text();
  let data = text ? JSON.parse(text) : {};
  if(!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

function openBackendDialog(){
  $('apiUrlInput').value = state.apiUrl;
  $('apiKeyInput').value = state.apiKey;
  $('backendMsg').textContent = '';
  $('backendDialog').showModal();
}
function saveBackendConfig(e){
  e.preventDefault();
  state.apiUrl = $('apiUrlInput').value.trim().replace(/\/$/,'');
  state.apiKey = $('apiKeyInput').value.trim();
  localStorage.setItem(API_URL_KEY, state.apiUrl);
  localStorage.setItem(API_KEY_KEY, state.apiKey);
  $('backendMsg').textContent = 'Configurazione salvata.';
  loadAnomalies();
}
async function testBackend(e){
  e.preventDefault();
  const oldUrl = state.apiUrl, oldKey = state.apiKey;
  state.apiUrl = $('apiUrlInput').value.trim().replace(/\/$/,'');
  state.apiKey = $('apiKeyInput').value.trim();
  try{ const res = await apiFetch('/api/health'); $('backendMsg').textContent = 'Test OK: ' + (res.status || 'online'); }
  catch(err){ $('backendMsg').textContent = 'Test fallito: ' + err.message; }
  finally{ state.apiUrl = oldUrl; state.apiKey = oldKey; }
}

function exportTxt(){
  const rows = state.anomalies.map(a => `[${formatDate(a.created_at)}] ${a.zone} - ${a.point_label}\nStato: ${labelStatus(a.status)} | Priorità: ${labelPriority(a.priority)} | Turno: ${a.shift}\nTitolo: ${a.title}\nDescrizione: ${a.description}\nConsegna: ${a.action || '-'}\nOperatore: ${a.operator_name || '-'}\n`).join('\n-----------------------------\n');
  const blob = new Blob([rows], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'passaggio-consegne-anomalie.txt'; a.click();
  URL.revokeObjectURL(url);
}

function updateSyncStatus(text, cls){
  const el = $('syncStatus'); el.textContent = text; el.className = 'sync-status ' + (cls || '');
}
function toast(msg){ alert(msg); }
function labelStatus(s){ return ({aperta:'Aperta', lavorazione:'In lavorazione', risolta:'Risolta'}[s] || s || '-'); }
function labelPriority(p){ return ({alta:'Alta', media:'Media', bassa:'Bassa'}[p] || p || '-'); }
function formatDate(value){ if(!value) return '-'; const d = new Date(value); return isNaN(d) ? value : d.toLocaleString('it-IT'); }
function escapeHtml(str){ return String(str ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function escapeAttr(str){ return escapeHtml(str).replace(/`/g,'&#96;'); }
