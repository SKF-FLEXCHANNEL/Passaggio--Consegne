/*
  PASSAGGIO CONSEGNE - V4 CLICK CORRETTO
  Le scritte presenti nelle immagini JPG non sono veri testi HTML.
  Questa versione usa due metodi insieme:
  1) aree trasparenti sopra le scritte;
  2) click su tutta l'immagine con apertura del punto più vicino.
  In questo modo anche su telefono è molto più facile selezionare OP, R, Porte, Lavatrice e Q.E.
*/

const ZONES = {
  zona1: {
    name: 'Zona 1',
    image: 'img/zona1.jpg',
    points: [
      {id:'PORTA1', label:'Porta 1 / SG01', x:12.5, y:22.0, w:10.0, h:4.0, type:'Sicurezza'},
      {id:'OP30A', label:'OP30A - Magazzino sfere', x:22.2, y:27.0, w:6.8, h:4.5, type:'Magazzino sfere'},
      {id:'OP30B', label:'OP30B - Magazzino sfere', x:27.0, y:24.8, w:6.4, h:4.8, type:'Magazzino sfere'},
      {id:'OP30C', label:'OP30C - Magazzino sfere', x:31.0, y:22.0, w:7.8, h:5.0, type:'Magazzino sfere'},
      {id:'OP30D', label:'OP30D - Magazzino sfere', x:36.0, y:24.2, w:7.5, h:5.4, type:'Magazzino sfere'},
      {id:'OP30E', label:'OP30E - Magazzino sfere', x:41.5, y:27.0, w:7.8, h:5.0, type:'Magazzino sfere'},
      {id:'PORTA3', label:'Porta 3 / SG03', x:53.5, y:18.0, w:7.0, h:5.5, type:'Sicurezza'},
      {id:'PORTA5', label:'Porta 5 / SG05', x:68.8, y:27.0, w:7.5, h:4.3, type:'Sicurezza'},
      {id:'R01', label:'R01 - Robot', x:25.8, y:40.0, w:7.5, h:6.0, type:'Robot'},
      {id:'R02', label:'R02 - Robot', x:28.8, y:60.5, w:6.8, h:8.5, type:'Robot'},
      {id:'R03', label:'R03 - Robot', x:30.0, y:31.5, w:10.5, h:8.2, type:'Robot'},
      {id:'R04', label:'R04 - Robot', x:53.0, y:33.0, w:12.8, h:8.5, type:'Robot'},
      {id:'R05', label:'R05 - Robot', x:47.0, y:59.0, w:7.8, h:9.2, type:'Robot'},
      {id:'R06', label:'R06 - Robot', x:67.8, y:37.2, w:8.2, h:8.2, type:'Robot'},
      {id:'OP05A', label:'OP05A - Prelievo anello', x:8.8, y:47.8, w:12.5, h:3.8, type:'Prelievo anello'},
      {id:'OP05B', label:'OP05B - Prelievo anello', x:8.8, y:53.0, w:12.5, h:3.8, type:'Prelievo anello'},
      {id:'OP10A', label:'OP10A - Misura anello esterno', x:22.5, y:55.5, w:7.8, h:5.5, type:'Misura'},
      {id:'OP10B', label:'OP10B - Misura anello interno', x:28.5, y:45.0, w:7.8, h:5.5, type:'Misura'},
      {id:'OP20A', label:'OP20A - Deposito anelli', x:36.8, y:57.8, w:7.5, h:4.8, type:'Deposito anelli'},
      {id:'OP20B', label:'OP20B - Deposito anelli', x:37.0, y:41.5, w:7.8, h:5.0, type:'Deposito anelli'},
      {id:'OP40A', label:'OP40A - Appaiatura', x:47.4, y:44.0, w:8.5, h:5.5, type:'Appaiatura'},
      {id:'OP40B', label:'OP40B - Appaiatura', x:58.8, y:43.8, w:8.5, h:5.5, type:'Appaiatura'},
      {id:'OP60', label:'OP60 - Fasatura', x:51.0, y:48.0, w:6.0, h:4.6, type:'Fasatura'},
      {id:'OP70', label:'OP70 - Carico gabbia', x:52.5, y:53.2, w:7.0, h:4.8, type:'Carico gabbia'},
      {id:'OP80', label:'OP80 - Trasferimento', x:53.2, y:65.0, w:7.0, h:4.8, type:'Trasferimento'},
      {id:'OP90', label:'OP90 - Trasferimento', x:63.4, y:65.0, w:7.2, h:4.8, type:'Trasferimento'},
      {id:'OP100', label:'OP100 - Controllo visivo', x:64.0, y:57.0, w:8.0, h:5.0, type:'Controllo visivo'},
      {id:'OP110', label:'OP110 - Controllo visivo', x:63.5, y:51.0, w:8.3, h:5.0, type:'Controllo visivo'},
      {id:'OP115', label:'OP115', x:68.5, y:35.5, w:7.0, h:5.0, type:'Operazione'},
      {id:'OP120', label:'OP120 - Tavola', x:58.5, y:47.5, w:8.5, h:5.0, type:'Tavola'},
      {id:'OP125B', label:'OP125B - Keyence 3D', x:69.5, y:49.5, w:8.4, h:5.2, type:'Keyence 3D'},
      {id:'OP125', label:'OP125 - Keyence 3D', x:72.5, y:65.0, w:7.6, h:5.0, type:'Keyence 3D'},
      {id:'QE1', label:'Q.E. Zona 1', x:83.5, y:31.0, w:8.8, h:26.5, type:'Quadro elettrico'},
      {id:'R04-R05-R06', label:'Box R04 - R05 - R06', x:83.5, y:58.0, w:7.8, h:25.0, type:'Robot'},
      {id:'LAVATRICE', label:'Lavatrice', x:67.5, y:71.0, w:9.0, h:18.0, type:'Lavatrice'},
      {id:'PORTA2', label:'Porta 2 / SG02', x:26.0, y:80.0, w:15.0, h:5.0, type:'Sicurezza'},
      {id:'PAR01', label:'PAR 01', x:7.0, y:70.0, w:4.0, h:12.0, type:'Area'},
      {id:'R01-R02-R03', label:'Box R01 - R02 - R03', x:12.5, y:86.0, w:10.0, h:6.0, type:'Robot'}
    ]
  },

  zona2: {
    name: 'Zona 2',
    image: 'img/zona2.jpg',
    points: [
      {id:'CTRL-LAV-SUP', label:'Controllo lavatrice superiore', x:22.5, y:2.0, w:15.0, h:6.0, type:'Lavatrice'},
      {id:'QE2', label:'Q.E. Zona 2', x:43.8, y:13.0, w:10.5, h:5.0, type:'Quadro elettrico'},
      {id:'R07-08-09', label:'Box R07 - R08 - R09', x:54.8, y:10.0, w:10.5, h:7.5, type:'Robot'},
      {id:'PORTA1', label:'Porta 1', x:70.0, y:18.2, w:9.5, h:4.5, type:'Sicurezza'},
      {id:'LAV-SX', label:'Lavatrice sinistra', x:15.0, y:35.0, w:15.0, h:8.0, type:'Lavatrice'},
      {id:'OP170AB', label:'OP170A+B', x:32.5, y:36.5, w:10.0, h:14.5, type:'Operazione'},
      {id:'OP180', label:'OP180', x:48.0, y:43.0, w:7.5, h:8.0, type:'Operazione'},
      {id:'OP185', label:'OP185', x:50.0, y:54.0, w:6.5, h:8.0, type:'Operazione'},
      {id:'OP190', label:'OP190', x:55.0, y:32.5, w:7.5, h:17.0, type:'Operazione'},
      {id:'OP125C', label:'OP125C', x:63.5, y:47.0, w:7.5, h:5.5, type:'Controllo'},
      {id:'OP135', label:'OP135', x:68.3, y:40.0, w:7.5, h:5.5, type:'Operazione'},
      {id:'LAV-DX', label:'Lavatrice destra', x:78.0, y:39.0, w:13.5, h:10.0, type:'Lavatrice'},
      {id:'OP200', label:'OP200', x:79.5, y:47.0, w:8.0, h:5.2, type:'Lavatrice'},
      {id:'CTRL-LAV-DX', label:'Controllo lavatrice destra', x:75.0, y:67.0, w:8.0, h:18.0, type:'Lavatrice'},
      {id:'R07', label:'R07 - Robot', x:38.0, y:58.0, w:6.5, h:11.0, type:'Robot'},
      {id:'R08', label:'R08 - Robot', x:46.0, y:58.0, w:6.5, h:11.0, type:'Robot'},
      {id:'R09', label:'R09 - Robot', x:55.5, y:58.0, w:7.0, h:12.0, type:'Robot'},
      {id:'PORTA2', label:'Porta 2', x:53.5, y:84.0, w:10.0, h:4.5, type:'Sicurezza'},
      {id:'PAR02', label:'PAR 02', x:68.5, y:87.0, w:10.0, h:4.5, type:'Area'}
    ]
  },

  zona3: {
    name: 'Zona 3',
    image: 'img/zona3.jpg',
    points: [
      {id:'PORTA1', label:'Porta 1', x:16.0, y:20.0, w:11.0, h:4.5, type:'Sicurezza'},
      {id:'R10-11-12', label:'Box R10 - R11 - R12', x:28.0, y:9.5, w:14.0, h:5.5, type:'Robot'},
      {id:'R13-R14', label:'Box R13 / R14', x:39.0, y:9.5, w:12.0, h:5.5, type:'Robot'},
      {id:'PORTA3', label:'Porta 3', x:46.0, y:8.8, w:8.0, h:4.5, type:'Sicurezza'},
      {id:'PORTA5', label:'Porta 5', x:54.5, y:8.8, w:8.0, h:4.5, type:'Sicurezza'},
      {id:'QE3', label:'Q.E. Zona 3', x:64.0, y:12.5, w:16.0, h:5.0, type:'Quadro elettrico'},
      {id:'PORTA7', label:'Porta 7', x:80.0, y:27.5, w:10.0, h:5.0, type:'Sicurezza'},
      {id:'LAVATRICE', label:'Lavatrice', x:10.0, y:39.0, w:13.0, h:6.5, type:'Lavatrice'},
      {id:'OP200', label:'OP200', x:12.0, y:43.8, w:7.0, h:5.0, type:'Lavatrice'},
      {id:'CTRL-LAV', label:'Controllo lavatrice', x:8.0, y:61.0, w:8.5, h:18.0, type:'Lavatrice'},
      {id:'R10', label:'R10 - Robot', x:36.0, y:27.0, w:7.5, h:6.0, type:'Robot'},
      {id:'R11', label:'R11 - Robot', x:35.5, y:63.0, w:7.0, h:5.0, type:'Robot'},
      {id:'R12', label:'R12 - Robot', x:50.5, y:62.0, w:7.0, h:5.5, type:'Robot'},
      {id:'R13', label:'R13 - Robot', x:53.5, y:32.0, w:7.0, h:5.0, type:'Robot'},
      {id:'R14', label:'R14 - Robot', x:67.0, y:38.0, w:7.0, h:5.0, type:'Robot'},
      {id:'OP230', label:'OP230', x:27.0, y:50.0, w:7.0, h:5.5, type:'Operazione'},
      {id:'OP210', label:'OP210', x:35.2, y:39.0, w:5.0, h:11.0, type:'Operazione'},
      {id:'OP220', label:'OP220', x:39.0, y:39.0, w:5.0, h:11.0, type:'Operazione'},
      {id:'OP240', label:'OP240', x:35.0, y:50.0, w:6.0, h:7.0, type:'Operazione'},
      {id:'OP270A', label:'OP270A', x:46.0, y:45.0, w:8.0, h:6.0, type:'Operazione'},
      {id:'OP270B', label:'OP270B', x:54.0, y:45.0, w:8.0, h:6.0, type:'Operazione'},
      {id:'OP280A', label:'OP280A', x:46.0, y:27.0, w:8.0, h:5.5, type:'Operazione'},
      {id:'OP280B', label:'OP280B', x:54.0, y:27.0, w:8.0, h:5.5, type:'Operazione'},
      {id:'OP250', label:'OP250', x:64.5, y:58.0, w:8.0, h:5.5, type:'Operazione'},
      {id:'PORTA2', label:'Porta 2', x:31.0, y:78.0, w:11.0, h:5.0, type:'Sicurezza'},
      {id:'PAR02', label:'PAR 02', x:45.0, y:80.0, w:10.0, h:4.5, type:'Area'}
    ]
  }
};

const STORAGE_KEY = 'hmi_passaggio_consegne_click_fix_v4';
const HIT_TOLERANCE = 7.5; // percentuale: se clicchi vicino alla scritta, apre comunque il punto più vicino

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
  pointSelect: document.getElementById('pointSelect'),
  clickInfo: document.getElementById('clickInfo')
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
function pointCenter(p){ return {x:p.x + p.w/2, y:p.y + p.h/2}; }
function pointById(zoneId, pointId){ return ZONES[zoneId].points.find(p => p.id === pointId); }
function anomaliesForPoint(zoneId, pointId){ return state.anomalies.filter(a => a.zoneId === zoneId && a.pointId === pointId); }
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

  ui.pointSelect.innerHTML = `<option value="">Scegli una voce...</option>` +
    zone.points.map(p => `<option value="${p.id}">${p.id} - ${esc(p.label)}</option>`).join('');
  ui.pointSelect.value = state.selectedPointId || '';

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
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      selectPoint(point.id);
    });
    ui.hotspotsLayer.appendChild(btn);
  });

  renderStats();
  renderLists();
  if(state.selectedPointId) renderPanel();
}

function getImagePercentFromEvent(ev){
  const rect = ui.layoutImage.getBoundingClientRect();
  const x = ((ev.clientX - rect.left) / rect.width) * 100;
  const y = ((ev.clientY - rect.top) / rect.height) * 100;
  if(x < 0 || x > 100 || y < 0 || y > 100) return null;
  return {x, y};
}

function hitTestPoint(px, py){
  const points = ZONES[state.zone].points;
  // Prima prova: dentro il rettangolo vero della scritta/area.
  let direct = points.find(p => px >= p.x && px <= p.x + p.w && py >= p.y && py <= p.y + p.h);
  if(direct) return direct;

  // Seconda prova: se il click è vicino, scegli il punto più vicino.
  let nearest = null;
  let nearestDistance = Infinity;
  for(const p of points){
    const c = pointCenter(p);
    const dx = px - c.x;
    const dy = py - c.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < nearestDistance){
      nearestDistance = distance;
      nearest = p;
    }
  }
  return nearestDistance <= HIT_TOLERANCE ? nearest : null;
}

function selectPointFromClick(ev){
  const pos = getImagePercentFromEvent(ev);
  if(!pos) return;
  ui.clickInfo.textContent = `Click: X ${pos.x.toFixed(1)}% - Y ${pos.y.toFixed(1)}%`;
  const point = hitTestPoint(pos.x, pos.y);
  if(point) selectPoint(point.id);
}

function selectPoint(pointId){
  state.selectedPointId = pointId;
  ui.pointSelect.value = pointId;
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
  const anoms = anomaliesForPoint(state.zone, point.id).sort((a,b) => new Date(b.datetime) - new Date(a.datetime));
  const active = anoms.filter(a => a.status !== 'Risolta');

  ui.panelContent.innerHTML = `
    <div class="point-head">
      <span class="pin-dot"></span>
      <div>
        <h3>${esc(point.id)}</h3>
        <p>${esc(point.label)} • ${esc(point.type)} • ${ZONES[state.zone].name}</p>
      </div>
    </div>
    <button class="primary new-btn" id="newAnomalyBtn">＋ Nuova anomalia su ${esc(point.id)}</button>
    ${active.length ? `<p class="muted"><b>${active.length}</b> anomalie ancora aperte/in lavorazione.</p>` : `<p class="muted">Nessuna anomalia aperta su questo punto.</p>`}
    <div class="panel-tabs"><button class="active">Anomalie</button><button>Storico</button></div>
    <div>${anoms.length ? anoms.map(renderAnomalyCard).join('') : `<div class="empty-list">Nessuna anomalia registrata su ${esc(point.id)}.</div>`}</div>
  `;
  document.getElementById('newAnomalyBtn').addEventListener('click', () => openDialogForNew(point.id));
  ui.panelContent.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', handleCardAction));
}

function renderAnomalyCard(a){
  return `
    <article class="anomaly-card">
      <h4>${esc(a.title)} <span class="tag state ${statusClass(a.status)}">${esc(a.status)}</span></h4>
      <p class="muted">${fmt(a.datetime)} • ${esc(a.shift)} • ${esc(a.operator || 'Operatore non indicato')}</p>
      <p><b>Priorità:</b> <span class="tag ${String(a.priority).toLowerCase()}">${esc(a.priority)}</span></p>
      <p><b>Descrizione:</b><br>${esc(a.description)}</p>
      ${a.action ? `<p><b>Consegna:</b><br>${esc(a.action)}</p>` : ''}
      ${a.assigned ? `<p class="muted">Assegnata a: ${esc(a.assigned)}</p>` : ''}
      <div class="card-actions">
        <button data-action="edit" data-id="${a.id}">Modifica</button>
        <button data-action="work" data-id="${a.id}">In lavorazione</button>
        <button data-action="done" data-id="${a.id}">Risolta</button>
        <button data-action="delete" data-id="${a.id}">Elimina</button>
      </div>
    </article>`;
}

function handleCardAction(ev){
  const id = ev.currentTarget.dataset.id;
  const action = ev.currentTarget.dataset.action;
  if(action === 'edit') openDialogForEdit(id);
  if(action === 'work') updateAnomalyStatus(id, 'In lavorazione');
  if(action === 'done') updateAnomalyStatus(id, 'Risolta');
  if(action === 'delete') deleteAnomaly(id);
}
function updateAnomalyStatus(id, status){
  state.anomalies = state.anomalies.map(a => a.id === id ? {...a, status} : a);
  saveAnomalies(); renderZone(); renderPanel();
}
function deleteAnomaly(id){
  if(!confirm('Eliminare questa anomalia?')) return;
  state.anomalies = state.anomalies.filter(a => a.id !== id);
  saveAnomalies(); renderZone(); renderPanel();
}

function openDialogForNew(pointId){
  const point = pointById(state.zone, pointId);
  document.getElementById('dialogTitle').textContent = `Nuova anomalia - ${point.id}`;
  document.getElementById('editId').value = '';
  document.getElementById('selectedPointId').value = pointId;
  document.getElementById('fieldDatetime').value = nowLocal();
  document.getElementById('fieldShift').value = 'Mattina';
  document.getElementById('fieldOperator').value = '';
  document.getElementById('fieldPriority').value = 'Media';
  document.getElementById('fieldStatus').value = 'Aperta';
  document.getElementById('fieldAssigned').value = '';
  document.getElementById('fieldTitle').value = '';
  document.getElementById('fieldDescription').value = '';
  document.getElementById('fieldAction').value = '';
  ui.dialog.showModal();
}
function openDialogForEdit(id){
  const a = state.anomalies.find(x => x.id === id);
  if(!a) return;
  document.getElementById('dialogTitle').textContent = `Modifica anomalia - ${a.pointId}`;
  document.getElementById('editId').value = a.id;
  document.getElementById('selectedPointId').value = a.pointId;
  document.getElementById('fieldDatetime').value = a.datetime;
  document.getElementById('fieldShift').value = a.shift;
  document.getElementById('fieldOperator').value = a.operator || '';
  document.getElementById('fieldPriority').value = a.priority;
  document.getElementById('fieldStatus').value = a.status;
  document.getElementById('fieldAssigned').value = a.assigned || '';
  document.getElementById('fieldTitle').value = a.title;
  document.getElementById('fieldDescription').value = a.description;
  document.getElementById('fieldAction').value = a.action || '';
  ui.dialog.showModal();
}
function submitDialog(ev){
  ev.preventDefault();
  const editId = document.getElementById('editId').value;
  const pointId = document.getElementById('selectedPointId').value;
  const point = pointById(state.zone, pointId);
  if(!point) return;
  const payload = {
    id: editId || Date.now().toString(),
    zoneId: state.zone,
    zoneName: ZONES[state.zone].name,
    pointId,
    pointLabel: point.label,
    type: point.type,
    datetime: document.getElementById('fieldDatetime').value,
    shift: document.getElementById('fieldShift').value,
    operator: document.getElementById('fieldOperator').value.trim(),
    priority: document.getElementById('fieldPriority').value,
    status: document.getElementById('fieldStatus').value,
    assigned: document.getElementById('fieldAssigned').value.trim(),
    title: document.getElementById('fieldTitle').value.trim(),
    description: document.getElementById('fieldDescription').value.trim(),
    action: document.getElementById('fieldAction').value.trim(),
  };
  if(editId) state.anomalies = state.anomalies.map(a => a.id === editId ? payload : a);
  else state.anomalies.unshift(payload);
  saveAnomalies();
  ui.dialog.close();
  renderZone();
  renderPanel();
}

function renderStats(){
  const open = state.anomalies.filter(a => a.status === 'Aperta').length;
  const work = state.anomalies.filter(a => a.status === 'In lavorazione').length;
  const done = state.anomalies.filter(a => a.status === 'Risolta').length;
  const total = state.anomalies.length;
  document.getElementById('statAperte').textContent = open;
  document.getElementById('statLav').textContent = work;
  document.getElementById('statRisolte').textContent = done;
  document.getElementById('statTotali').textContent = total;
  document.getElementById('footerOpen').textContent = open;
  const updated = localStorage.getItem(STORAGE_KEY + '_updated');
  document.getElementById('lastUpdate').textContent = updated ? fmt(updated) : '--';
  document.getElementById('reportText').value = buildReport();
}
function renderLists(){
  const all = [...state.anomalies].sort((a,b)=>new Date(b.datetime)-new Date(a.datetime));
  document.getElementById('allAnomalies').innerHTML = all.length ? all.map(renderListRow).join('') : `<div class="empty-list">Nessuna anomalia registrata.</div>`;
  const history = all.filter(a => a.status === 'Risolta');
  document.getElementById('historyList').innerHTML = history.length ? history.map(renderListRow).join('') : `<div class="empty-list">Nessuna anomalia risolta nello storico.</div>`;
}
function renderListRow(a){
  return `<div class="list-row">
    <div><b>${esc(a.zoneName)}</b><small>${fmt(a.datetime)} • ${esc(a.shift)}</small></div>
    <div><b>${esc(a.pointId)} - ${esc(a.title)}</b><small>${esc(a.description)}</small></div>
    <div><span class="tag state ${statusClass(a.status)}">${esc(a.status)}</span></div>
  </div>`;
}
function buildReport(){
  if(!state.anomalies.length) return 'Nessuna anomalia registrata.';
  return state.anomalies
    .slice()
    .sort((a,b)=>new Date(a.datetime)-new Date(b.datetime))
    .map(a => `[${fmt(a.datetime)}] ${a.zoneName} - ${a.pointId} - ${a.pointLabel}\nTurno: ${a.shift} | Stato: ${a.status} | Priorità: ${a.priority}\nTitolo: ${a.title}\nDescrizione: ${a.description}\nConsegna: ${a.action || '-'}\nOperatore: ${a.operator || '-'} | Assegnata a: ${a.assigned || '-'}\n`)
    .join('\n-----------------------------\n');
}
function downloadFile(filename, content, type='text/plain'){
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function exportText(){ downloadFile('passaggio-consegne.txt', buildReport(), 'text/plain'); }
function exportJson(){ downloadFile('backup-passaggio-consegne.json', JSON.stringify(state.anomalies, null, 2), 'application/json'); }

function setZoom(value){
  state.zoom = Math.max(0.75, Math.min(2.5, value));
  ui.layoutStage.style.transform = `scale(${state.zoom})`;
  ui.layoutStage.style.marginBottom = `${(state.zoom - 1) * ui.layoutStage.offsetHeight}px`;
  ui.zoomReset.textContent = `${Math.round(state.zoom * 100)}%`;
}

function setupEvents(){
  ui.zoneTabs.forEach(btn => btn.addEventListener('click', () => {
    state.zone = btn.dataset.zone;
    state.selectedPointId = null;
    ui.zoneTabs.forEach(b => b.classList.toggle('active', b === btn));
    ui.detailPanel.classList.remove('open');
    renderZone();
    renderPanel();
  }));

  document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
    renderZone();
  }));

  ui.menuBtns.forEach(btn => btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    ui.menuBtns.forEach(b => b.classList.toggle('active', b === btn));
    ui.views.forEach(v => v.classList.toggle('active', v.id === `view-${view}`));
    document.getElementById('sidebar').classList.remove('open');
    renderStats(); renderLists();
  }));

  ui.layoutStage.addEventListener('click', selectPointFromClick);
  ui.layoutStage.addEventListener('touchend', (ev) => {
    if(ev.changedTouches.length !== 1) return;
    selectPointFromClick(ev.changedTouches[0]);
  }, {passive:true});

  ui.pointSelect.addEventListener('change', () => {
    if(ui.pointSelect.value) selectPoint(ui.pointSelect.value);
  });

  ui.hotspotToggle.addEventListener('change', () => renderZone());
  document.getElementById('zoomIn').addEventListener('click', () => setZoom(state.zoom + 0.15));
  document.getElementById('zoomOut').addEventListener('click', () => setZoom(state.zoom - 0.15));
  document.getElementById('zoomReset').addEventListener('click', () => setZoom(1));
  ui.closePanel.addEventListener('click', () => ui.detailPanel.classList.remove('open'));
  ui.form.addEventListener('submit', submitDialog);
  document.getElementById('cancelDialog').addEventListener('click', () => ui.dialog.close());
  document.getElementById('collapseBtn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('collapsed'));
  document.getElementById('hamburger').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

  document.getElementById('exportText').addEventListener('click', exportText);
  document.getElementById('quickExport').addEventListener('click', exportText);
  document.getElementById('exportJson').addEventListener('click', exportJson);
  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.getElementById('quickPrint').addEventListener('click', () => window.print());
  document.getElementById('clearAll').addEventListener('click', () => {
    if(confirm('Cancellare tutto il registro anomalie?')){
      state.anomalies = [];
      saveAnomalies(); renderZone(); renderPanel();
    }
  });
  document.getElementById('importJson').addEventListener('change', async (ev) => {
    const file = ev.target.files[0];
    if(!file) return;
    try{
      state.anomalies = JSON.parse(await file.text());
      saveAnomalies(); renderZone(); renderPanel();
      alert('Backup importato correttamente.');
    }catch{
      alert('File non valido.');
    }
  });

  setInterval(() => {
    document.getElementById('clock').textContent = new Date().toLocaleString('it-IT', {dateStyle:'short', timeStyle:'short'});
  }, 1000);
}

function setupPwa(){
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(()=>{});
    });
  }
  let installPrompt;
  window.addEventListener('beforeinstallprompt', ev => {
    ev.preventDefault(); installPrompt = ev;
    const btn = document.getElementById('installBtn');
    btn.classList.remove('hidden');
    btn.onclick = async () => { await installPrompt.prompt(); btn.classList.add('hidden'); };
  });
}

setupEvents();
setupPwa();
renderZone();
renderPanel();
renderStats();
setZoom(1);
