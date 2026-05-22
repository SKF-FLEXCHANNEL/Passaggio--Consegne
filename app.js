/*
  PASSAGGIO CONSEGNE - VERSIONE CON SCRITTE CLICCABILI
  Le scritte non sono testo HTML: sono dentro alle immagini JPG.
  Per renderle cliccabili vengono usate aree trasparenti sovrapposte.
  Ogni punto usa coordinate percentuali: x, y, w, h.
*/

const ZONES = {
  zona1: {
    name: 'Zona 1',
    image: 'img/zona1.jpg',
    points: [
      {id:'PORTA1', label:'Porta 1', x:13.2, y:19.7, w:11, h:5, type:'Sicurezza'},
      {id:'SG01', label:'SG01 - Porta 1', x:12.7, y:22.9, w:8, h:4, type:'Sicurezza'},
      {id:'OP30A', label:'OP30A - Magazzino sfere', x:24.5, y:29.5, w:7, h:5, type:'Magazzino sfere'},
      {id:'OP30B', label:'OP30B - Magazzino sfere', x:31.6, y:27.1, w:7, h:5, type:'Magazzino sfere'},
      {id:'OP30C', label:'OP30C - Magazzino sfere', x:37.1, y:25.2, w:7, h:5, type:'Magazzino sfere'},
      {id:'OP30D', label:'OP30D - Magazzino sfere', x:42.4, y:27.1, w:7, h:5, type:'Magazzino sfere'},
      {id:'OP30E', label:'OP30E - Magazzino sfere', x:49.4, y:30.4, w:7, h:5, type:'Magazzino sfere'},
      {id:'PORTA3', label:'Porta 3', x:59.0, y:17.8, w:10, h:5, type:'Sicurezza'},
      {id:'SG03', label:'SG03 - Porta 3', x:59.4, y:21.0, w:8, h:4, type:'Sicurezza'},
      {id:'PORTA5', label:'Porta 5', x:79.3, y:27.0, w:10, h:5, type:'Sicurezza'},
      {id:'SG05', label:'SG05 - Porta 5', x:78.6, y:30.1, w:8, h:4, type:'Sicurezza'},
      {id:'R01', label:'R01 - Robot', x:28.5, y:42.3, w:6, h:5, type:'Robot'},
      {id:'R02', label:'R02 - Robot', x:33.6, y:66.1, w:6, h:5, type:'Robot'},
      {id:'R03', label:'R03 - Robot', x:35.2, y:34.7, w:6, h:5, type:'Robot'},
      {id:'R04', label:'R04 - Robot', x:60.3, y:35.6, w:6, h:5, type:'Robot'},
      {id:'R05', label:'R05 - Robot', x:52.3, y:66.2, w:6, h:5, type:'Robot'},
      {id:'R06', label:'R06 - Robot', x:75.5, y:39.3, w:6, h:5, type:'Robot'},
      {id:'OP05A', label:'OP05A - Prelievo anello', x:14.5, y:49.7, w:12, h:4.5, type:'Prelievo anello'},
      {id:'OP05B', label:'OP05B - Prelievo anello', x:14.5, y:55.7, w:12, h:4.5, type:'Prelievo anello'},
      {id:'OP10A', label:'OP10A - Misura anello esterno', x:26.7, y:58.6, w:8, h:5, type:'Misura'},
      {id:'OP10B', label:'OP10B - Misura anello interno', x:35.2, y:47.3, w:8, h:5, type:'Misura'},
      {id:'OP20A', label:'OP20A - Deposito anelli', x:43.8, y:59.0, w:8, h:5, type:'Deposito anelli'},
      {id:'OP20B', label:'OP20B - Deposito anelli', x:43.7, y:45.7, w:8, h:5, type:'Deposito anelli'},
      {id:'OP40A', label:'OP40A - Appaiatura', x:54.1, y:45.6, w:8, h:5, type:'Appaiatura'},
      {id:'OP40B', label:'OP40B - Appaiatura', x:66.3, y:45.3, w:8, h:5, type:'Appaiatura'},
      {id:'OP60', label:'OP60 - Fasatura', x:55.0, y:52.0, w:7, h:4.5, type:'Fasatura'},
      {id:'OP70', label:'OP70 - Carico gabbia', x:60.8, y:57.4, w:7, h:4.5, type:'Carico gabbia'},
      {id:'OP80', label:'OP80 - Trasferimento', x:65.2, y:67.8, w:7, h:4.5, type:'Trasferimento'},
      {id:'OP90', label:'OP90 - Trasferimento', x:72.2, y:68.0, w:7, h:4.5, type:'Trasferimento'},
      {id:'OP100', label:'OP100 - Controllo visivo', x:78.6, y:59.9, w:8, h:5, type:'Controllo visivo'},
      {id:'OP110', label:'OP110 - Controllo visivo', x:78.5, y:53.9, w:8, h:5, type:'Controllo visivo'},
      {id:'OP115', label:'OP115', x:76.7, y:37.4, w:8, h:5, type:'Operazione'},
      {id:'OP120', label:'OP120 - Tavola', x:71.5, y:52.2, w:8, h:5, type:'Tavola'},
      {id:'OP125', label:'OP125 - Keyence 3D', x:84.5, y:69.4, w:8, h:5, type:'Keyence 3D'},
      {id:'OP125B', label:'OP125B - Keyence 3D', x:82.4, y:55.8, w:8, h:5, type:'Keyence 3D'},
      {id:'KEYENCE', label:'Controllo visivo Keyence 3D', x:82.4, y:62.8, w:10, h:8, type:'Visione'},
      {id:'QE1', label:'Q.E. Zona 1', x:93.5, y:43.5, w:7, h:24, type:'Quadro elettrico'},
      {id:'R04-R05-R06', label:'Box R04 - R05 - R06', x:91.8, y:74.5, w:8, h:17, type:'Robot'},
      {id:'LAVATRICE', label:'Lavatrice', x:76.1, y:81.0, w:9, h:16, type:'Lavatrice'},
      {id:'PORTA2', label:'Porta 2', x:33.4, y:86.6, w:12, h:5, type:'Sicurezza'},
      {id:'SG02', label:'SG02 - Porta 2', x:45.0, y:86.3, w:8, h:5, type:'Sicurezza'},
      {id:'PAR01', label:'PAR 01', x:5.1, y:77.5, w:5, h:22, type:'Area'},
      {id:'R01-R02-R03', label:'Box R01 - R02 - R03', x:17.0, y:92.0, w:11, h:7, type:'Robot'},
      {id:'EMERGENZA', label:'Emergenza generale', x:7.0, y:92.5, w:9, h:7, type:'Sicurezza'}
    ]
  },

  zona2: {
    name: 'Zona 2',
    image: 'img/zona2.jpg',
    points: [
      {id:'CTRL-LAV-SUP', label:'Controllo lavatrice superiore', x:32.0, y:5.5, w:16, h:7, type:'Lavatrice'},
      {id:'QE2', label:'Q.E. Zona 2', x:53.3, y:16.8, w:12, h:7, type:'Quadro elettrico'},
      {id:'R07-08-09', label:'Box R07 - R08 - R09', x:66.5, y:13.2, w:12, h:8, type:'Robot'},
      {id:'PORTA1', label:'Porta 1', x:86.3, y:22.5, w:10, h:6, type:'Sicurezza'},
      {id:'LAV-SX', label:'Lavatrice sinistra', x:19.5, y:41.0, w:15, h:8, type:'Lavatrice'},
      {id:'OP170AB', label:'OP170A+B', x:41.0, y:44.0, w:6, h:14, type:'Operazione'},
      {id:'OP180', label:'OP180', x:55.0, y:45.8, w:7, h:7, type:'Operazione'},
      {id:'OP185', label:'OP185', x:61.1, y:58.0, w:7, h:7, type:'Operazione'},
      {id:'OP190', label:'OP190', x:67.2, y:44.0, w:7, h:14, type:'Operazione'},
      {id:'OP125C', label:'OP125C', x:78.2, y:51.2, w:8, h:8, type:'Controllo'},
      {id:'OP135', label:'OP135', x:81.5, y:42.4, w:8, h:7, type:'Operazione'},
      {id:'LAV-DX', label:'Lavatrice destra', x:88.8, y:42.5, w:15, h:8, type:'Lavatrice'},
      {id:'OP200', label:'OP200', x:89.5, y:50.2, w:8, h:6, type:'Lavatrice'},
      {id:'CTRL-LAV-DX', label:'Controllo lavatrice destra', x:86.2, y:74.0, w:8, h:21, type:'Lavatrice'},
      {id:'R07', label:'R07 - Robot', x:43.3, y:64.0, w:6, h:6, type:'Robot'},
      {id:'R08', label:'R08 - Robot', x:54.6, y:64.0, w:6, h:6, type:'Robot'},
      {id:'R09', label:'R09 - Robot', x:67.2, y:64.5, w:6, h:6, type:'Robot'},
      {id:'PORTA2', label:'Porta 2', x:62.0, y:86.0, w:11, h:6, type:'Sicurezza'},
      {id:'PAR02', label:'PAR 02', x:77.6, y:88.0, w:12, h:5, type:'Area'}
    ]
  },

  zona3: {
    name: 'Zona 3',
    image: 'img/zona3.jpg',
    points: [
      {id:'PORTA1', label:'Porta 1', x:14.0, y:23.0, w:12, h:6, type:'Sicurezza'},
      {id:'R10-11-12', label:'Box R10 - R11 - R12', x:34.6, y:10.0, w:16, h:8, type:'Robot'},
      {id:'R13-R14', label:'Box R13 / R14', x:46.2, y:10.0, w:14, h:8, type:'Robot'},
      {id:'PORTA3', label:'Porta 3', x:52.0, y:10.3, w:9, h:6, type:'Sicurezza'},
      {id:'PORTA5', label:'Porta 5', x:59.2, y:10.3, w:9, h:6, type:'Sicurezza'},
      {id:'QE3', label:'Q.E. Zona 3', x:75.5, y:14.2, w:18, h:8, type:'Quadro elettrico'},
      {id:'PORTA7', label:'Porta 7', x:87.0, y:34.0, w:10, h:7, type:'Sicurezza'},
      {id:'LAVATRICE', label:'Lavatrice', x:14.5, y:42.0, w:15, h:8, type:'Lavatrice'},
      {id:'OP200', label:'OP200', x:18.2, y:48.0, w:8, h:6, type:'Lavatrice'},
      {id:'CTRL-LAV', label:'Controllo lavatrice', x:12.0, y:70.5, w:8, h:22, type:'Lavatrice'},
      {id:'R10', label:'R10 - Robot', x:38.5, y:31.5, w:6, h:6, type:'Robot'},
      {id:'R11', label:'R11 - Robot', x:38.5, y:65.0, w:6, h:6, type:'Robot'},
      {id:'R12', label:'R12 - Robot', x:52.8, y:65.0, w:6, h:6, type:'Robot'},
      {id:'R13', label:'R13 - Robot', x:55.8, y:31.0, w:6, h:6, type:'Robot'},
      {id:'R14', label:'R14 - Robot', x:69.0, y:43.0, w:6, h:6, type:'Robot'},
      {id:'OP230', label:'OP230', x:32.2, y:52.8, w:8, h:7, type:'Operazione'},
      {id:'OP210', label:'OP210', x:38.8, y:48.0, w:7, h:10, type:'Operazione'},
      {id:'OP220', label:'OP220', x:42.7, y:49.0, w:7, h:10, type:'Operazione'},
      {id:'OP240', label:'OP240', x:37.5, y:57.8, w:8, h:7, type:'Operazione'},
      {id:'OP270A', label:'OP270A', x:51.0, y:52.0, w:8, h:7, type:'Operazione'},
      {id:'OP270B', label:'OP270B', x:58.7, y:52.0, w:8, h:7, type:'Operazione'},
      {id:'OP280A', label:'OP280A', x:51.3, y:27.8, w:8, h:7, type:'Operazione'},
      {id:'OP280B', label:'OP280B', x:58.2, y:27.8, w:8, h:7, type:'Operazione'},
      {id:'OP250', label:'OP250', x:70.2, y:59.5, w:9, h:7, type:'Operazione'},
      {id:'PORTA2', label:'Porta 2', x:38.0, y:85.0, w:12, h:6, type:'Sicurezza'},
      {id:'PAR02', label:'PAR 02', x:54.5, y:87.4, w:14, h:5, type:'Area'}
    ]
  }
};

const STORAGE_KEY = 'hmi_passaggio_consegne_label_click_v3';

const ui = {
  zoneTabs: document.querySelectorAll('.zone-tab'),
  menuBtns: document.querySelectorAll('.menu-btn'),
  views: document.querySelectorAll('.view'),
  layoutImage: document.getElementById('layoutImage'),
  hotspotsLayer: document.getElementById('hotspotsLayer'),
  layoutStage: document.getElementById('layoutStage'),
  zoneTitle: document.getElementById('zoneTitle'),
  detailPanel: document.getElementById('detailPanel'),
  panelContent: document.getElementById('panelContent'),
  closePanel: document.getElementById('closePanel'),
  dialog: document.getElementById('anomalyDialog'),
  form: document.getElementById('anomalyForm'),
  hotspotToggle: document.getElementById('hotspotToggle'),
  zoomReset: document.getElementById('zoomReset'),
};

let state = {
  zone: 'zona1',
  selectedPointId: null,
  filter: 'tutte',
  zoom: 1,
  anomalies: loadAnomalies(),
};

function loadAnomalies(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveAnomalies(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.anomalies));
  localStorage.setItem(STORAGE_KEY + '_updated', new Date().toISOString());
}
function nowLocal(){
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0,16);
}
function fmt(dt){
  if(!dt) return '';
  return new Date(dt).toLocaleString('it-IT', {dateStyle:'short', timeStyle:'short'});
}
function esc(str){
  return String(str ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function statusClass(status){
  if(status === 'Aperta') return 'aperta';
  if(status === 'In lavorazione') return 'in-lavorazione';
  if(status === 'Risolta') return 'risolta';
  return '';
}
function pointById(zoneId, pointId){
  return ZONES[zoneId].points.find(p => p.id === pointId);
}
function anomaliesForPoint(zoneId, pointId){
  return state.anomalies.filter(a => a.zoneId === zoneId && a.pointId === pointId);
}
function worstStatus(anoms){
  if(anoms.some(a => a.status === 'Aperta')) return 'open';
  if(anoms.some(a => a.status === 'In lavorazione')) return 'work';
  if(anoms.some(a => a.status === 'Risolta')) return 'done';
  return 'none';
}
function hotspotVisibleForFilter(anoms){
  if(state.filter === 'tutte') return true;
  if(state.filter === 'aperta') return anoms.some(a => a.status === 'Aperta');
  if(state.filter === 'lavorazione') return anoms.some(a => a.status === 'In lavorazione');
  if(state.filter === 'risolta') return anoms.some(a => a.status === 'Risolta');
  return true;
}

function renderZone(){
  const zone = ZONES[state.zone];
  ui.zoneTitle.textContent = `${zone.name.toUpperCase()} - Layout interattivo`;
  ui.layoutImage.src = zone.image;
  ui.layoutImage.alt = `Layout ${zone.name}`;
  ui.hotspotsLayer.innerHTML = '';
  ui.layoutStage.classList.toggle('show-hotspots', ui.hotspotToggle.checked);

  zone.points.forEach(point => {
    const anoms = anomaliesForPoint(state.zone, point.id);
    const status = worstStatus(anoms);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `hotspot status-${status}`;
    if(status === 'open') btn.classList.add('has-open');
    if(status === 'work') btn.classList.add('has-work');
    if(status === 'done') btn.classList.add('has-done');
    if(state.selectedPointId === point.id) btn.classList.add('selected');
    if(!hotspotVisibleForFilter(anoms)) btn.classList.add('filtered-out');
    btn.style.left = point.x + '%';
    btn.style.top = point.y + '%';
    btn.style.width = point.w + '%';
    btn.style.height = point.h + '%';
    btn.dataset.id = point.id;
    btn.title = `${point.id} - ${point.label}`;
    btn.setAttribute('aria-label', `${point.id} - ${point.label}`);
    btn.addEventListener('click', () => selectPoint(point.id));
    ui.hotspotsLayer.appendChild(btn);
  });

  renderStats();
  renderLists();
  if(state.selectedPointId) renderPanel();
}

function selectPoint(pointId){
  state.selectedPointId = pointId;
  renderZone();
  renderPanel();
  if(window.innerWidth <= 1100) ui.detailPanel.classList.add('open');
}

function renderPanel(){
  const point = pointById(state.zone, state.selectedPointId);
  if(!point){
    ui.panelContent.innerHTML = `<div class="empty-panel"><h3>Dettaglio punto</h3><p>Seleziona una scritta sul layout.</p></div>`;
    return;
  }

  const list = anomaliesForPoint(state.zone, point.id).sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));
  ui.panelContent.innerHTML = `
    <div class="point-head">
      <span class="pin-dot"></span>
      <div>
        <h3>${esc(point.id)}</h3>
        <p>${esc(point.label)} • ${esc(point.type)} • ${ZONES[state.zone].name}</p>
      </div>
    </div>
    <div class="panel-tabs"><button class="active">Anomalie</button><button>Storico</button></div>
    <button class="primary new-btn" id="newAnomalyBtn">+ Nuova anomalia</button>
    <div>${list.length ? list.map(renderAnomalyCard).join('') : '<div class="empty-panel">Nessuna anomalia su questo punto.</div>'}</div>
  `;
  document.getElementById('newAnomalyBtn').addEventListener('click', () => openDialog({zoneId: state.zone, pointId: point.id}));
  ui.panelContent.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => editAnomaly(b.dataset.edit)));
  ui.panelContent.querySelectorAll('[data-delete]').forEach(b => b.addEventListener('click', () => deleteAnomaly(b.dataset.delete)));
  ui.panelContent.querySelectorAll('[data-status]').forEach(b => b.addEventListener('click', () => setAnomalyStatus(b.dataset.status, b.dataset.value)));
}

function renderAnomalyCard(a){
  return `
    <article class="anomaly-card">
      <h4><span>${esc(a.title)}</span><span class="tag state ${statusClass(a.status)}">${esc(a.status)}</span></h4>
      <p class="muted">${fmt(a.datetime)} • ${esc(a.shift)} • ${esc(a.operator || 'Operatore non indicato')}</p>
      <p>Priorità: <span class="tag ${a.priority.toLowerCase()}">${esc(a.priority)}</span></p>
      <p><b>Descrizione:</b><br>${esc(a.description)}</p>
      ${a.action ? `<p><b>Consegna:</b><br>${esc(a.action)}</p>` : ''}
      ${a.assigned ? `<p class="muted">Assegnata a: ${esc(a.assigned)}</p>` : ''}
      <div class="card-actions">
        <button data-status="${a.id}" data-value="Aperta">Aperta</button>
        <button data-status="${a.id}" data-value="In lavorazione">In lavorazione</button>
        <button data-status="${a.id}" data-value="Risolta">Risolta</button>
        <button data-edit="${a.id}">Modifica</button>
        <button data-delete="${a.id}">Elimina</button>
      </div>
    </article>
  `;
}

function openDialog({zoneId, pointId, anomaly=null}){
  state.zone = zoneId;
  state.selectedPointId = pointId;
  const point = pointById(zoneId, pointId);
  document.getElementById('dialogTitle').textContent = anomaly ? `Modifica anomalia - ${pointId}` : `Nuova anomalia - ${pointId}`;
  document.getElementById('editId').value = anomaly?.id || '';
  document.getElementById('selectedPointId').value = pointId;
  document.getElementById('fieldDatetime').value = anomaly?.datetime || nowLocal();
  document.getElementById('fieldShift').value = anomaly?.shift || guessShift();
  document.getElementById('fieldOperator').value = anomaly?.operator || localStorage.getItem('last_operator') || '';
  document.getElementById('fieldPriority').value = anomaly?.priority || 'Media';
  document.getElementById('fieldStatus').value = anomaly?.status || 'Aperta';
  document.getElementById('fieldAssigned').value = anomaly?.assigned || '';
  document.getElementById('fieldTitle').value = anomaly?.title || '';
  document.getElementById('fieldDescription').value = anomaly?.description || '';
  document.getElementById('fieldAction').value = anomaly?.action || '';
  ui.dialog.showModal();
}
function guessShift(){
  const h = new Date().getHours();
  if(h >= 6 && h < 14) return 'Mattina';
  if(h >= 14 && h < 22) return 'Pomeriggio';
  return 'Notte';
}
function editAnomaly(id){
  const anomaly = state.anomalies.find(a=>a.id===id);
  if(!anomaly) return;
  switchZone(anomaly.zoneId, false);
  state.selectedPointId = anomaly.pointId;
  openDialog({zoneId: anomaly.zoneId, pointId: anomaly.pointId, anomaly});
}
function deleteAnomaly(id){
  if(!confirm('Eliminare questa anomalia?')) return;
  state.anomalies = state.anomalies.filter(a=>a.id!==id);
  saveAnomalies();
  renderZone();
  renderPanel();
}
function setAnomalyStatus(id, status){
  state.anomalies = state.anomalies.map(a=>a.id===id ? {...a, status, updatedAt:new Date().toISOString()} : a);
  saveAnomalies();
  renderZone();
  renderPanel();
}

ui.form.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const editId = document.getElementById('editId').value;
  const pointId = document.getElementById('selectedPointId').value;
  const point = pointById(state.zone, pointId);
  const operator = document.getElementById('fieldOperator').value.trim();
  if(operator) localStorage.setItem('last_operator', operator);

  const data = {
    id: editId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    zoneId: state.zone,
    zoneName: ZONES[state.zone].name,
    pointId,
    pointLabel: point?.label || pointId,
    pointType: point?.type || '',
    datetime: document.getElementById('fieldDatetime').value,
    shift: document.getElementById('fieldShift').value,
    operator,
    priority: document.getElementById('fieldPriority').value,
    status: document.getElementById('fieldStatus').value,
    assigned: document.getElementById('fieldAssigned').value.trim(),
    title: document.getElementById('fieldTitle').value.trim(),
    description: document.getElementById('fieldDescription').value.trim(),
    action: document.getElementById('fieldAction').value.trim(),
    updatedAt: new Date().toISOString()
  };

  if(editId) state.anomalies = state.anomalies.map(a => a.id === editId ? data : a);
  else state.anomalies.unshift(data);
  saveAnomalies();
  ui.dialog.close();
  renderZone();
  renderPanel();
});

document.getElementById('cancelDialog').addEventListener('click', ()=>ui.dialog.close());
ui.closePanel.addEventListener('click', ()=>ui.detailPanel.classList.remove('open'));

function switchZone(zoneId, clear=true){
  state.zone = zoneId;
  if(clear) state.selectedPointId = null;
  ui.zoneTabs.forEach(t=>t.classList.toggle('active', t.dataset.zone === zoneId));
  state.zoom = 1;
  applyZoom();
  renderZone();
}
ui.zoneTabs.forEach(btn => btn.addEventListener('click', ()=>switchZone(btn.dataset.zone)));

document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', ()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  state.filter = btn.dataset.filter;
  renderZone();
}));

ui.menuBtns.forEach(btn => btn.addEventListener('click', ()=>{
  ui.menuBtns.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  ui.views.forEach(v=>v.classList.remove('active'));
  document.getElementById('view-' + btn.dataset.view).classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
  renderLists();
  renderStats();
}));

document.getElementById('hamburger').addEventListener('click', ()=>document.getElementById('sidebar').classList.toggle('open'));
document.getElementById('collapseBtn').addEventListener('click', ()=>document.getElementById('sidebar').classList.toggle('collapsed'));
ui.hotspotToggle.addEventListener('change', renderZone);

function applyZoom(){
  ui.layoutStage.style.transform = `scale(${state.zoom})`;
  ui.zoomReset.textContent = `${Math.round(state.zoom * 100)}%`;
  ui.layoutStage.style.marginBottom = state.zoom > 1 ? `${(state.zoom-1)*ui.layoutStage.offsetHeight}px` : 'auto';
  ui.layoutStage.style.marginRight = state.zoom > 1 ? `${(state.zoom-1)*ui.layoutStage.offsetWidth}px` : 'auto';
}
document.getElementById('zoomIn').addEventListener('click', ()=>{state.zoom=Math.min(2.2,state.zoom+.1);applyZoom();});
document.getElementById('zoomOut').addEventListener('click', ()=>{state.zoom=Math.max(.55,state.zoom-.1);applyZoom();});
document.getElementById('zoomReset').addEventListener('click', ()=>{state.zoom=1;applyZoom();});

function renderLists(){
  const sorted = [...state.anomalies].sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));
  const all = document.getElementById('allAnomalies');
  const hist = document.getElementById('historyList');
  all.innerHTML = sorted.length ? sorted.map(renderListRow).join('') : '<div class="empty-list">Nessuna anomalia registrata.</div>';
  const closed = sorted.filter(a=>a.status==='Risolta');
  hist.innerHTML = closed.length ? closed.map(renderListRow).join('') : '<div class="empty-list">Nessuna anomalia risolta nello storico.</div>';

  document.querySelectorAll('[data-open-anomaly]').forEach(b=>b.addEventListener('click', ()=>{
    const a = state.anomalies.find(x=>x.id===b.dataset.openAnomaly);
    if(!a) return;
    switchZone(a.zoneId, false);
    selectPoint(a.pointId);
    document.querySelector('[data-view="layout"]').click();
  }));
}
function renderListRow(a){
  return `<div class="list-row">
    <div><b>${fmt(a.datetime)}</b><small>${esc(a.shift)}</small></div>
    <div><b>${esc(a.zoneName)} • ${esc(a.pointId)} • ${esc(a.title)}</b><small>${esc(a.description)}</small></div>
    <div><span class="tag state ${statusClass(a.status)}">${esc(a.status)}</span><br><button class="ghost" data-open-anomaly="${a.id}" style="margin-top:6px">Apri</button></div>
  </div>`;
}
function renderStats(){
  const open = state.anomalies.filter(a=>a.status==='Aperta').length;
  const work = state.anomalies.filter(a=>a.status==='In lavorazione').length;
  const done = state.anomalies.filter(a=>a.status==='Risolta').length;
  document.getElementById('statAperte').textContent = open;
  document.getElementById('statLav').textContent = work;
  document.getElementById('statRisolte').textContent = done;
  document.getElementById('statTotali').textContent = state.anomalies.length;
  document.getElementById('footerOpen').textContent = open;
  const upd = localStorage.getItem(STORAGE_KEY + '_updated');
  document.getElementById('lastUpdate').textContent = upd ? fmt(upd) : '--';
  document.getElementById('reportText').value = buildReportText();
}
function buildReportText(){
  if(!state.anomalies.length) return 'Nessuna anomalia registrata.';
  return state.anomalies
    .slice()
    .sort((a,b)=>new Date(b.datetime)-new Date(a.datetime))
    .map(a => `[${fmt(a.datetime)}] ${a.zoneName} - ${a.pointId} (${a.pointLabel})\nTurno: ${a.shift} | Stato: ${a.status} | Priorità: ${a.priority}\nTitolo: ${a.title}\nDescrizione: ${a.description}\nConsegna: ${a.action || '-'}\nOperatore: ${a.operator || '-'} | Assegnata a: ${a.assigned || '-'}\n`)
    .join('\n------------------------------\n');
}

function download(filename, content, type='text/plain'){
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
document.getElementById('exportJson').addEventListener('click', ()=>download('backup-passaggio-consegne.json', JSON.stringify(state.anomalies,null,2),'application/json'));
document.getElementById('exportText').addEventListener('click', ()=>download('passaggio-consegne.txt', buildReportText()));
document.getElementById('quickExport').addEventListener('click', ()=>download('passaggio-consegne.txt', buildReportText()));
document.getElementById('printBtn').addEventListener('click', ()=>window.print());
document.getElementById('quickPrint').addEventListener('click', ()=>window.print());
document.getElementById('clearAll').addEventListener('click', ()=>{
  if(confirm('Vuoi cancellare tutto il registro anomalie salvato su questo dispositivo?')){
    state.anomalies = [];
    saveAnomalies();
    renderZone();
  }
});
document.getElementById('importJson').addEventListener('change', async (ev)=>{
  const file = ev.target.files[0];
  if(!file) return;
  try{
    const imported = JSON.parse(await file.text());
    if(!Array.isArray(imported)) throw new Error('Formato non valido');
    state.anomalies = imported;
    saveAnomalies();
    renderZone();
    alert('Backup importato correttamente.');
  } catch(e){ alert('Errore importazione: ' + e.message); }
});

function tick(){
  document.getElementById('clock').textContent = new Date().toLocaleString('it-IT', {dateStyle:'short', timeStyle:'short'});
}
setInterval(tick, 1000); tick();

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').classList.remove('hidden');
});
document.getElementById('installBtn').addEventListener('click', async ()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBtn').classList.add('hidden');
});

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>navigator.serviceWorker.register('service-worker.js'));
}

renderZone();
