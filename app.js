/* Passaggio Consegne - Frontend condiviso Cloudflare Workers/D1 */
const APP_VERSION = '6.0.0-cloudflare-d1';
const STORAGE_KEY = 'pc_anomalie_local_v6';
const API_URL_KEY = 'pc_api_url';
const API_KEY_KEY = 'pc_api_key';

const ZONES = {
  1: {
    title: 'ZONA 1 - Layout interattivo',
    image: 'img/zona1.jpg',
    points: [
      p('SG01','Porta 1 / SG01','Ingresso sicurezza zona 1', 7, 13, 13, 8),
      p('OP30A','OP30A','Magazzino sfere / stazione OP30A', 19, 22, 8, 8),
      p('OP30B','OP30B','Magazzino sfere / stazione OP30B', 27, 19, 8, 8),
      p('OP30C','OP30C','Magazzino sfere / stazione OP30C', 34, 17, 8, 8),
      p('OP30D','OP30D','Magazzino sfere / stazione OP30D', 42, 19, 8, 8),
      p('OP30E','OP30E','Magazzino sfere / stazione OP30E', 49, 22, 8, 8),
      p('SG03','Porta 3 / SG03','Varco superiore centrale', 56, 16, 10, 8),
      p('SG05','Porta 5 / SG05','Varco superiore destro', 75, 21, 13, 7),
      p('R01','R01','Robot R01', 20, 39, 8, 10),
      p('R02','R02','Robot R02', 29, 64, 8, 8),
      p('R03','R03','Robot R03', 31, 29, 10, 9),
      p('R04','R04','Robot R04', 56, 35, 9, 9),
      p('R05','R05','Robot R05', 51, 63, 8, 9),
      p('R06','R06','Robot R06', 74, 38, 8, 9),
      p('OP05A','OP05A','Prelievo anello esterno', 6, 48, 17, 5),
      p('OP05B','OP05B','Prelievo anello esterno', 6, 54, 17, 5),
      p('OP10A','OP10A','Misura anello esterno', 22, 55, 9, 8),
      p('OP10B','OP10B','Misura anello interno', 30, 47, 9, 8),
      p('OP20A','OP20A','Deposito/inserimento anelli - OP20A', 37, 59, 9, 9),
      p('OP20B','OP20B','Deposito/inserimento anelli - OP20B', 37, 43, 9, 10),
      p('OP40A','OP40A','Area fasatura/carico gabbia superiore OP40A', 51, 37, 12, 13),
      p('OP40B','OP40B','Area fasatura/carico gabbia superiore OP40B', 64, 37, 12, 13),
      p('OP60','OP60','Stazione OP60', 52, 51, 8, 7),
      p('OP70','OP70','Stazione OP70', 57, 58, 8, 7),
      p('OP80','OP80','Stazione OP80', 58, 72, 8, 7),
      p('OP90','OP90','Stazione OP90', 67, 72, 8, 7),
      p('OP100','OP100','Controllo visivo / area OP100', 73, 62, 8, 7),
      p('OP110','OP110','Stazione OP110', 76, 54, 8, 7),
      p('OP115','OP115','Stazione OP115', 76, 30, 8, 7),
      p('OP120','OP120','Tavola centrale OP120', 63, 51, 13, 15),
      p('OP125','OP125','Controllo visivo Keyence 3D / OP125', 79, 68, 9, 8),
      p('OP125B','OP125B','Stazione OP125B', 77, 51, 9, 8),
      p('KEYENCE','Keyence','Controllo visivo Keyence 3D', 78, 64, 10, 6),
      p('LAVATRICE','Lavatrice','Lavatrice zona 1', 71, 75, 10, 18),
      p('QE1','Q.E. Zona 1','Quadro elettrico zona 1', 87, 33, 9, 27),
      p('R04-R05-R06','R04 / R05 / R06','Armadio/area robot R04-R05-R06', 87, 61, 8, 23),
      p('SG02','Porta 2 / SG02','Varco inferiore centrale', 29, 84, 25, 8),
      p('R01-R02-R03','R01-R02-R03','Armadio/area robot R01-R02-R03', 11, 86, 14, 8),
      p('EMERGENZA','Emergenza Generale','Pulsante/area emergenza generale', 4, 86, 8, 9),
      p('PAR01','PAR 01','Protezione perimetrale PAR 01', 4, 64, 8, 18)
    ]
  },
  2: {
    title: 'ZONA 2 - Layout interattivo',
    image: 'img/zona2.jpg',
    points: [
      p('CONTROLLO-LAVATRICE-TOP','Controllo Lavatrice','Controllo lavatrice superiore', 19, 1, 20, 16),
      p('QE2','Q.E. Zona 2','Quadro elettrico zona 2', 42, 7, 15, 9),
      p('R07-R08-R09','R07-08-09','Armadio/area robot R07-R08-R09', 58, 5, 16, 11),
      p('SG01','Porta 1 / SG01','Varco superiore destro zona 2', 77, 16, 15, 7),
      p('LAVATRICE-SX','Lavatrice sinistra','Lavatrice lato sinistro', 10, 32, 22, 14),
      p('OP170A+B','OP170A+B','Stazione OP170A+B', 34, 38, 11, 16),
      p('R07','R07','Robot R07', 37, 55, 8, 9),
      p('OP180','OP180','Stazione OP180', 47, 39, 10, 15),
      p('R08','R08','Robot R08', 47, 55, 8, 9),
      p('OP185','OP185','Stazione OP185', 50, 60, 7, 8),
      p('OP190','OP190','Stazione OP190', 61, 37, 10, 18),
      p('R09','R09','Robot R09', 62, 55, 9, 11),
      p('OP125C','OP125C','Stazione OP125C', 71, 42, 10, 15),
      p('OP135','OP135','Stazione OP135', 74, 36, 8, 7),
      p('OP200','OP200','Lavatrice / stazione OP200', 84, 38, 14, 13),
      p('CONTROLLO-LAVATRICE-DX','Controllo Lavatrice','Controllo lavatrice destro', 82, 66, 15, 21),
      p('SG02','Porta 2 / SG02','Varco inferiore centrale zona 2', 48, 84, 24, 7),
      p('PAR02','PAR 02','Protezione perimetrale PAR 02', 74, 84, 13, 6)
    ]
  },
  3: {
    title: 'ZONA 3 - Layout interattivo',
    image: 'img/zona3.jpg',
    points: [
      p('SG01','Porta 1 / SG01','Varco superiore sinistro zona 3', 9, 16, 16, 7),
      p('R10-R11-R12','R10-11-12','Armadio/area robot R10-R11-R12', 28, 5, 15, 11),
      p('R13-R14','R13 / R14','Armadio/area robot R13/R14', 43, 5, 14, 11),
      p('SG03','Porta 3 / SG03','Varco porta 3 zona 3', 57, 10, 9, 6),
      p('SG05','Porta 5 / SG05','Varco porta 5 zona 3', 66, 10, 10, 6),
      p('QE3','Q.E. Zona 3','Quadro elettrico zona 3', 72, 9, 18, 13),
      p('SG07','Porta 7 / SG07','Varco destro zona 3', 83, 24, 10, 9),
      p('LAVATRICE','Lavatrice','Lavatrice zona 3', 5, 34, 18, 13),
      p('OP200','OP200','Stazione OP200', 9, 46, 13, 6),
      p('R10','R10','Robot R10', 35, 27, 8, 9),
      p('OP210','OP210','Stazione OP210', 34, 37, 6, 13),
      p('OP220','OP220','Stazione OP220', 39, 41, 8, 8),
      p('OP230','OP230','Stazione OP230', 28, 42, 9, 9),
      p('OP240','OP240','Stazione OP240', 34, 51, 10, 9),
      p('R11','R11','Robot R11', 35, 61, 8, 9),
      p('R12','R12','Robot R12', 50, 63, 8, 9),
      p('OP280A','OP280A','Stazione OP280A', 55, 26, 9, 10),
      p('OP280B','OP280B','Stazione OP280B', 65, 26, 9, 10),
      p('R13','R13','Robot R13', 58, 34, 8, 10),
      p('OP270A','OP270A','Stazione OP270A', 50, 44, 11, 10),
      p('OP270B','OP270B','Stazione OP270B', 61, 44, 11, 10),
      p('R14','R14','Robot R14', 73, 38, 8, 11),
      p('OP250','OP250','Stazione OP250', 73, 54, 9, 10),
      p('CONTROLLO-LAVATRICE','Controllo Lavatrice','Controllo lavatrice zona 3', 6, 67, 18, 18),
      p('SG02','Porta 2 / SG02','Varco inferiore zona 3', 27, 81, 25, 7),
      p('PAR02','PAR 02','Protezione perimetrale PAR 02', 50, 81, 18, 6)
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
  $('statusFilter').addEventListener('change', renderAnomalies);
  $('showAreas').addEventListener('change', e => { state.showAreas = e.target.checked; $('mapInner').classList.toggle('show-areas', state.showAreas); });
  $('zoomIn').addEventListener('click', () => setZoom(Math.min(2.2, state.zoom + .15)));
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
}

function tickClock(){
  const now = new Date();
  $('clock').textContent = now.toLocaleDateString('it-IT', {day:'2-digit',month:'2-digit',year:'2-digit'}) + ', ' + now.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
}

function switchZone(zone){
  state.zone = String(zone);
  state.selectedPoint = null;
  document.querySelectorAll('.zone-tab').forEach(b => b.classList.toggle('active', b.dataset.zone === state.zone));
  renderZone();
  renderAnomalies();
  closeDetail();
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
  if(best && bestD < 9) selectPoint(best.id);
}

function selectPoint(pointId){
  if(!pointId) return;
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

function closeDetail(){
  $('detailPanel').classList.remove('open');
  if(!state.selectedPoint){
    $('detailTitle').textContent = 'Nessun punto selezionato';
    $('detailSubtitle').textContent = 'Seleziona una scritta sul layout.';
    $('pointSummary').innerHTML = '';
  }
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
  const zoneName = `Zona ${state.zone}`;
  let filtered = state.anomalies.filter(a => a.zone === zoneName);
  if(status !== 'tutte') filtered = filtered.filter(a => a.status === status);
  const open = state.anomalies.filter(a => a.status === 'aperta').length;
  $('openCount').textContent = open;

  if(!state.selectedPoint){
    $('anomalyList').className = 'anomaly-list empty';
    $('anomalyList').textContent = 'Seleziona un punto per vedere le anomalie.';
    $('pointCount').textContent = '0';
    return;
  }
  const pointItems = filtered.filter(a => a.point_id === state.selectedPoint.id);
  $('pointCount').textContent = pointItems.length;
  const list = $('anomalyList');
  if(pointItems.length === 0){
    list.className = 'anomaly-list empty';
    list.textContent = 'Nessuna anomalia per questo punto.';
    return;
  }
  list.className = 'anomaly-list';
  list.innerHTML = pointItems.map(a => anomalyCard(a)).join('');
  list.querySelectorAll('[data-status-set]').forEach(btn => btn.addEventListener('click', () => updateAnomalyStatus(btn.dataset.id, btn.dataset.statusSet)));
  list.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => deleteAnomaly(btn.dataset.delete)));
}

function anomalyCard(a){
  return `<article class="anomaly-card">
    <div class="anomaly-top">
      <div>
        <h4>${escapeHtml(a.title || 'Anomalia')}</h4>
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
      <button data-id="${a.id}" data-status-set="aperta">Aperta</button>
      <button data-id="${a.id}" data-status-set="lavorazione">In lavorazione</button>
      <button data-id="${a.id}" data-status-set="risolta">Risolta</button>
      <button data-delete="${a.id}">Elimina</button>
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
