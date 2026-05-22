const ZONES = {
  zona1: {
    name: 'Zona 1',
    image: 'img/zona1.jpg',
    points: [
      {id:'SG01', label:'Porta 1 / SG01', x:13.7, y:23.0, type:'Sicurezza'},
      {id:'OP30A', label:'OP30A', x:25.7, y:26.0, type:'Magazzino sfere'},
      {id:'OP30B', label:'OP30B', x:31.0, y:21.9, type:'Magazzino sfere'},
      {id:'OP30C', label:'OP30C', x:36.5, y:21.8, type:'Magazzino sfere'},
      {id:'OP30D', label:'OP30D', x:41.0, y:21.9, type:'Magazzino sfere'},
      {id:'OP30E', label:'OP30E', x:47.3, y:25.8, type:'Magazzino sfere'},
      {id:'SG03', label:'Porta 3 / SG03', x:58.9, y:25.0, type:'Sicurezza'},
      {id:'SG05', label:'Porta 5 / SG05', x:78.2, y:28.8, type:'Sicurezza'},
      {id:'R01', label:'R01', x:25.7, y:40.3, type:'Robot'},
      {id:'R02', label:'R02', x:33.3, y:62.8, type:'Robot'},
      {id:'R03', label:'R03', x:35.0, y:35.2, type:'Robot'},
      {id:'R04', label:'R04', x:60.9, y:36.0, type:'Robot'},
      {id:'R05', label:'R05', x:52.3, y:63.2, type:'Robot'},
      {id:'R06', label:'R06', x:75.1, y:42.8, type:'Robot'},
      {id:'OP05A', label:'OP05A', x:11.7, y:47.8, type:'Prelievo anello'},
      {id:'OP05B', label:'OP05B', x:11.6, y:53.2, type:'Prelievo anello'},
      {id:'OP10A', label:'OP10A', x:25.8, y:56.5, type:'Misura anello esterno'},
      {id:'OP10B', label:'OP10B', x:34.7, y:47.7, type:'Misura anello interno'},
      {id:'OP20A', label:'OP20A', x:43.0, y:61.5, type:'Deposito anelli'},
      {id:'OP20B', label:'OP20B', x:42.5, y:47.5, type:'Deposito anelli'},
      {id:'OP40A', label:'OP40A', x:52.3, y:42.3, type:'Appaiatura'},
      {id:'OP40B', label:'OP40B', x:65.2, y:42.2, type:'Appaiatura'},
      {id:'OP60', label:'OP60', x:52.5, y:52.0, type:'Fasatura'},
      {id:'OP70', label:'OP70', x:57.1, y:57.7, type:'Carico gabbia'},
      {id:'OP80', label:'OP80', x:63.8, y:72.8, type:'Trasferimento'},
      {id:'OP90', label:'OP90', x:70.5, y:72.0, type:'Trasferimento'},
      {id:'OP100', label:'OP100', x:76.0, y:58.9, type:'Controllo visivo'},
      {id:'OP110', label:'OP110', x:76.3, y:52.5, type:'Controllo visivo'},
      {id:'OP115', label:'OP115', x:77.6, y:38.2, type:'Trasferimento'},
      {id:'OP120', label:'OP120', x:71.4, y:50.1, type:'Tavola'},
      {id:'OP125', label:'OP125', x:83.8, y:69.5, type:'Keyence 3D'},
      {id:'OP125B', label:'OP125B', x:82.0, y:61.5, type:'Keyence 3D'},
      {id:'KEYENCE', label:'Keyence', x:82.2, y:66.0, type:'Visione'},
      {id:'LAVATRICE', label:'Lavatrice', x:74.8, y:83.5, type:'Lavatrice'},
      {id:'QE1', label:'Q.E. Zona 1', x:91.5, y:45.0, type:'Quadro elettrico'},
      {id:'R04-R05-R06', label:'R04-R05-R06', x:91.0, y:73.0, type:'Robot'},
      {id:'SG02', label:'Porta 2 / SG02', x:50.5, y:86.0, type:'Sicurezza'},
      {id:'EMERGENZA', label:'Emergenza generale', x:11.2, y:87.4, type:'Sicurezza'},
      {id:'R01-R02-R03', label:'R01-R02-R03', x:18.4, y:87.0, type:'Robot'}
    ]
  },
  zona2: {
    name: 'Zona 2',
    image: 'img/zona2.jpg',
    points: [
      {id:'CTRL-LAV-1', label:'Controllo lavatrice', x:31.5, y:12.7, type:'Lavatrice'},
      {id:'QE2', label:'Q.E. Zona 2', x:53.1, y:15.0, type:'Quadro elettrico'},
      {id:'R07-R08-R09', label:'R07-08-09', x:66.5, y:14.8, type:'Robot'},
      {id:'SG01', label:'Porta 1 / SG01', x:86.8, y:22.2, type:'Sicurezza'},
      {id:'LAV-SX', label:'Lavatrice SX', x:22.0, y:42.5, type:'Lavatrice'},
      {id:'OP170AB', label:'OP170A+B', x:42.2, y:46.0, type:'Operazione'},
      {id:'R07', label:'R07', x:43.0, y:64.0, type:'Robot'},
      {id:'OP180', label:'OP180', x:54.2, y:45.7, type:'Operazione'},
      {id:'R08', label:'R08', x:54.0, y:64.0, type:'Robot'},
      {id:'OP185', label:'OP185', x:60.2, y:58.0, type:'Operazione'},
      {id:'OP190', label:'OP190', x:66.5, y:45.8, type:'Operazione'},
      {id:'R09', label:'R09', x:66.7, y:65.2, type:'Robot'},
      {id:'OP125C', label:'OP125C', x:78.0, y:49.5, type:'Controllo'},
      {id:'OP135', label:'OP135', x:82.2, y:43.0, type:'Operazione'},
      {id:'LAV-DX', label:'Lavatrice DX', x:88.5, y:43.5, type:'Lavatrice'},
      {id:'OP200', label:'OP200', x:89.4, y:50.3, type:'Lavatrice'},
      {id:'CTRL-LAV-2', label:'Controllo lavatrice DX', x:88.0, y:69.4, type:'Lavatrice'},
      {id:'PAR02', label:'PAR 02', x:77.0, y:88.6, type:'Area'},
      {id:'SG02', label:'Porta 2 / SG02', x:62.0, y:87.0, type:'Sicurezza'}
    ]
  },
  zona3: {
    name: 'Zona 3',
    image: 'img/zona3.jpg',
    points: [
      {id:'SG01', label:'Porta 1 / SG01', x:12.8, y:23.2, type:'Sicurezza'},
      {id:'R10-11-12', label:'R10-11-12', x:35.5, y:12.5, type:'Robot'},
      {id:'R13-R14', label:'R13/R14', x:46.0, y:12.5, type:'Robot'},
      {id:'SG03', label:'Porta 3 / SG03', x:52.5, y:16.5, type:'Sicurezza'},
      {id:'SG05', label:'Porta 5 / SG05', x:60.2, y:16.6, type:'Sicurezza'},
      {id:'QE3', label:'Q.E. Zona 3', x:75.0, y:13.8, type:'Quadro elettrico'},
      {id:'SG07', label:'Porta 7 / SG07', x:89.8, y:34.0, type:'Sicurezza'},
      {id:'LAVATRICE', label:'Lavatrice', x:15.0, y:41.0, type:'Lavatrice'},
      {id:'OP200', label:'OP200', x:18.5, y:47.5, type:'Lavatrice'},
      {id:'CTRL-LAV', label:'Controllo lavatrice', x:12.7, y:72.0, type:'Lavatrice'},
      {id:'R10', label:'R10', x:37.2, y:32.2, type:'Robot'},
      {id:'R11', label:'R11', x:37.0, y:64.0, type:'Robot'},
      {id:'R12', label:'R12', x:52.8, y:65.4, type:'Robot'},
      {id:'R13', label:'R13', x:55.8, y:31.5, type:'Robot'},
      {id:'R14', label:'R14', x:68.4, y:43.2, type:'Robot'},
      {id:'OP230', label:'OP230', x:31.7, y:52.6, type:'Operazione'},
      {id:'OP210', label:'OP210', x:39.3, y:48.0, type:'Operazione'},
      {id:'OP220', label:'OP220', x:42.1, y:49.5, type:'Operazione'},
      {id:'OP240', label:'OP240', x:37.7, y:57.4, type:'Operazione'},
      {id:'OP270A', label:'OP270A', x:51.0, y:51.5, type:'Operazione'},
      {id:'OP270B', label:'OP270B', x:58.6, y:51.7, type:'Operazione'},
      {id:'OP280A', label:'OP280A', x:51.3, y:27.4, type:'Operazione'},
      {id:'OP280B', label:'OP280B', x:57.9, y:27.6, type:'Operazione'},
      {id:'OP250', label:'OP250', x:70.4, y:58.4, type:'Operazione'},
      {id:'SG02', label:'Porta 2 / SG02', x:38.0, y:85.2, type:'Sicurezza'},
      {id:'PAR02', label:'PAR 02', x:53.2, y:85.7, type:'Area'}
    ]
  }
};

const STORAGE_KEY = 'hmi_passaggio_consegne_v2';
const ui = {
  zoneTabs: document.querySelectorAll('.zone-tab'),
  menuBtns: document.querySelectorAll('.menu-btn'),
  views: document.querySelectorAll('.view'),
  layoutImage: document.getElementById('layoutImage'),
  markersLayer: document.getElementById('markersLayer'),
  layoutStage: document.getElementById('layoutStage'),
  mapScroll: document.getElementById('mapScroll'),
  zoneTitle: document.getElementById('zoneTitle'),
  detailPanel: document.getElementById('detailPanel'),
  panelContent: document.getElementById('panelContent'),
  closePanel: document.getElementById('closePanel'),
  dialog: document.getElementById('anomalyDialog'),
  form: document.getElementById('anomalyForm'),
  labelToggle: document.getElementById('labelToggle'),
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
function markerVisibleForFilter(anoms){
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
  ui.markersLayer.innerHTML = '';
  ui.layoutStage.classList.toggle('hide-labels', !ui.labelToggle.checked);

  zone.points.forEach(point => {
    const anoms = anomaliesForPoint(state.zone, point.id);
    const status = worstStatus(anoms);
    const btn = document.createElement('button');
    btn.className = `marker status-${status}`;
    if(state.selectedPointId === point.id) btn.classList.add('selected');
    if(!markerVisibleForFilter(anoms)) btn.classList.add('filtered-out');
    btn.style.left = point.x + '%';
    btn.style.top = point.y + '%';
    btn.title = point.label;
    btn.innerHTML = `<span class="pin"></span><span class="label">${esc(point.id)}</span>`;
    btn.addEventListener('click', () => selectPoint(point.id));
    ui.markersLayer.appendChild(btn);
  });

  renderStats();
  renderLists();
  if(state.selectedPointId) renderPanel();
}

function selectPoint(pointId){
  state.selectedPointId = pointId;
  renderZone();
  renderPanel();
  if(window.innerWidth <= 1050) ui.detailPanel.classList.add('open');
}

function renderPanel(){
  const point = pointById(state.zone, state.selectedPointId);
  if(!point){
    ui.panelContent.innerHTML = `<div class="empty-panel"><h3>Dettaglio punto</h3><p>Seleziona un punto sul layout.</p></div>`;
    return;
  }
  const list = anomaliesForPoint(state.zone, point.id).sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));
  ui.panelContent.innerHTML = `
    <div class="point-head">
      <span class="pin-dot"></span>
      <div><h3>${esc(point.id)}</h3><p>${esc(point.label)} • ${esc(point.type)} • ${ZONES[state.zone].name}</p></div>
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
      <h4><span>${esc(a.title)}</span><span class="tag state ${esc(a.status)}">${esc(a.status)}</span></h4>
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
  document.getElementById('dialogTitle').textContent = anomaly ? 'Modifica anomalia' : 'Nuova anomalia';
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
  state.zone = anomaly.zoneId;
  state.selectedPointId = anomaly.pointId;
  switchZone(anomaly.zoneId, false);
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
  state.anomalies = state.anomalies.map(a=>a.id===id ? {...a, status} : a);
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
    id: editId || crypto.randomUUID(),
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
ui.labelToggle.addEventListener('change', renderZone);

function applyZoom(){
  ui.layoutStage.style.transform = `scale(${state.zoom})`;
  ui.layoutStage.style.marginBottom = state.zoom > 1 ? `${(state.zoom-1)*ui.layoutStage.offsetHeight}px` : 'auto';
}
document.getElementById('zoomIn').addEventListener('click', ()=>{state.zoom=Math.min(2,state.zoom+.1);applyZoom();});
document.getElementById('zoomOut').addEventListener('click', ()=>{state.zoom=Math.max(.7,state.zoom-.1);applyZoom();});
document.getElementById('zoomReset').addEventListener('click', ()=>{state.zoom=1;applyZoom();});

function renderLists(){
  const sorted = [...state.anomalies].sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));
  const all = document.getElementById('allAnomalies');
  const hist = document.getElementById('historyList');
  all.innerHTML = sorted.length ? sorted.map(renderListRow).join('') : '<div class="empty-list">Nessuna anomalia registrata.</div>';
  hist.innerHTML = sorted.filter(a=>a.status==='Risolta').length ? sorted.filter(a=>a.status==='Risolta').map(renderListRow).join('') : '<div class="empty-list">Nessuna anomalia risolta nello storico.</div>';
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
    <div><span class="tag state ${esc(a.status)}">${esc(a.status)}</span><br><button class="ghost" data-open-anomaly="${a.id}" style="margin-top:6px">Apri</button></div>
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
