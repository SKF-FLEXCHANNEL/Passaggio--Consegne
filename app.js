// Definizione zone e punti
const zones = {
  zona1: { title: 'ZONA 1 - Layout interattivo', img: 'img/zona1.jpg', points: [
    ['OP30A', 25, 29], ['OP30B', 28, 26], ['OP30C', 33, 19], ['OP30D', 38, 21], ['OP30E', 41, 26], ['SG05', 60, 37],
    ['R07', 72, 58], ['R06', 68, 41], ['R01', 23, 40], ['OP10A', 25, 58], ['OP10B', 31, 42], ['R02', 31, 60], ['OP20A', 54, 62], ['OP20B', 54, 51], ['R03', 32, 35], ['OP40A', 66, 49], ['OP40B', 75, 49], ['OP60', 59, 58], ['OP70', 60, 65], ['R05', 48, 61], ['OP80', 70, 65], ['OP90', 77, 66], ['OP100', 83, 61], ['OP110', 84, 55], ['OP120', 77, 52], ['OP125', 86, 57], ['KEYENCE', 84, 66], ['SG02', 52, 84], 
  ]},
  zona2: { title: 'ZONA 2 - Layout interattivo', img: 'img/zona2.jpg', points: [
    ['Lavatrice SX', 18, 39], ['OP170A-B', 39, 47], ['R07', 40, 58], ['OP130', 51, 47], ['R08', 51, 58], ['OP140', 62, 47], ['R09', 61, 59], ['OP125C', 75, 51], ['OP135', 79, 46], ['OP150', 76, 59], ['OP200', 86, 39], ['SG01', 85, 28], ['SG02', 51, 82], ['Q.E. Zona 2', 58, 25], ['PH01 Emergenza', 51, 88]
  ]},
  zona3: { title: 'ZONA 3 - Layout interattivo', img: 'img/zona3.jpg', points: [
    ['SG01', 13, 31], ['R10', 36, 38], ['R11', 35, 62], ['R12', 51, 64], ['R13', 55, 42], ['R14', 76, 44], ['OP230', 30, 49], ['OP240', 37, 49], ['OP250', 48, 49], ['OP260A', 51, 30], ['OP260B', 61, 30], ['OP270A', 50, 49], ['OP270B', 60, 49], ['OP290', 75, 60], ['SG03', 49, 31], ['SG05', 58, 31], ['SG07', 86, 37], ['Contenitore', 86, 61], ['Lavatrice', 13, 48], ['Q.E. Zona 3', 70, 25], ['SG02', 31, 84]
  ]}
};

const KEY = 'hmi_passaggio_consegne_v2';
let currentZone = 'zona1';
let selectedPoint = null;
let anomalies = JSON.parse(localStorage.getItem(KEY) || '[]');

const $ = id => document.getElementById(id);

function save() {
  localStorage.setItem(KEY, JSON.stringify(anomalies));
}

function statusFor(point) {
  const arr = anomalies.filter(a => a.zone === currentZone && a.point === point);
  if (arr.some(a => a.status === 'aperta')) return 'aperta';
  if (arr.some(a => a.status === 'lavorazione')) return 'lavorazione';
  if (arr.some(a => a.status === 'risolta')) return 'risolta';
  return '';
}

function renderZone() {
  const z = zones[currentZone];
  $('zoneTitle').textContent = z.title;
  $('zoneImage').src = z.img;
  $('markersLayer').innerHTML = '';
  z.points.forEach(p => {
    const [label, x, y] = p;
    const m = document.createElement('button');
    m.className = 'marker ' + statusFor(label) + (selectedPoint === label ? ' selected' : '');
    m.style.left = x + '%';
    m.style.top = y + '%';
    m.dataset.label = label;
    m.title = label;
    m.onclick = () => selectPoint(label);
    $('markersLayer').appendChild(m);
  });
  renderCounter();
  renderPanel();
}

function selectPoint(label) {
  selectedPoint = label;
  $('panel').classList.add('open');
  $('pointInfo').innerHTML = `<b>${label}</b><br>${zones[currentZone].title.replace(' - Layout interattivo', '')}`;
  $('anomalyForm').classList.add('hidden');
  renderZone();
}

function renderPanel() {
  if (!selectedPoint) {
    $('anomalyList').innerHTML = '';
    return;
  }
  const filter = $('statusFilter').value;
  let list = anomalies.filter(a => a.zone === currentZone && a.point === selectedPoint);
  if (filter !== 'tutte') list = list.filter(a => a.status === filter);
  
  $('anomalyList').innerHTML = list.length ? list.map(a => `
    <div class="anomaly">
      <b>${esc(a.title)}</b>
      <div class="meta">${new Date(a.date).toLocaleString('it-IT')} • ${esc(a.shift)} • <span class="badge ${a.status}">${labelStatus(a.status)}</span> • Priorità ${a.priority}</div>
      <div>${esc(a.description)}</div>
      ${a.operator ? `<div class="meta">Operatore: ${esc(a.operator)}</div>` : ''}
      <div class="anomaly-actions">
        <button onclick="changeStatus('${a.id}','aperta')">Aperta</button>
        <button onclick="changeStatus('${a.id}','lavorazione')">In lavorazione</button>
        <button onclick="changeStatus('${a.id}','risolta')">Risolta</button>
        <button onclick="removeAnomaly('${a.id}')">Elimina</button>
      </div>
    </div>`).join('') : '<p class="meta">Nessuna anomalia su questo punto.</p>';
}

function labelStatus(s) { return s === 'aperta' ? 'Aperta' : s === 'lavorazione' ? 'In lavorazione' : 'Risolta'; }
function esc(s) { return String(s || '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }

// Event listeners
$('newAnomalyBtn').onclick = () => { if (!selectedPoint) { alert('Seleziona prima un punto sul layout'); return; } $('anomalyForm').classList.remove('hidden'); };
$('cancelForm').onclick = () => $('anomalyForm').classList.add('hidden');
$('closePanel').onclick = () => $('panel').classList.remove('open');
$('statusFilter').onchange = () => { renderZone(); };

$('anomalyForm').onsubmit = e => {
  e.preventDefault();
  anomalies.unshift({
    id: Date.now().toString(),
    zone: currentZone,
    point: selectedPoint,
    title: $('title').value,
    priority: $('priority').value,
    status: $('status').value,
    shift: $('shift').value,
    description: $('description').value,
    operator: $('operator').value,
    date: new Date().toISOString()
  });
  save();
  e.target.reset();
  $('priority').value = 'media';
  $('status').value = 'aperta';
  $('anomalyForm').classList.add('hidden');
  renderZone();
};

function changeStatus(id, status) {
  anomalies = anomalies.map(a => a.id === id ? { ...a, status } : a);
  save();
  renderZone();
}

function removeAnomaly(id) {
  if (confirm('Eliminare anomalia?')) {
    anomalies = anomalies.filter(a => a.id !== id);
    save();
    renderZone();
  }
}

function renderCounter() {
  const n = anomalies.filter(a => a.status === 'aperta').length;
  $('openCounter').textContent = n + ' anomalie aperte';
}

document.querySelectorAll('.tab').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  currentZone = b.dataset.zone;
  selectedPoint = null;
  $('pointInfo').textContent = 'Seleziona un punto sul layout.';
  renderZone();
});

$('exportBtn').onclick = () => {
  const txt = anomalies.map(a => `${new Date(a.date).toLocaleString('it-IT')} | ${zones[a.zone].title.split(' ')[0]} ${a.zone.replace('zona', '')} | ${a.point} | ${labelStatus(a.status)} | ${a.title}\n${a.description}\nOperatore: ${a.operator || '-'}\n`).join('\n---\n');
  const blob = new Blob([txt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'passaggio-consegne.txt';
  link.click();
  URL.revokeObjectURL(url);
};

// Persistenza Operatore
window.addEventListener('load', () => {
  const savedOp = localStorage.getItem('operatore_corrente');
  if (savedOp) $('operator').value = savedOp;
});
$('operator').addEventListener('change', (e) => {
  localStorage.setItem('operatore_corrente', e.target.value);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(() => { });
}

renderZone();

// --- TOOL TEMPORANEO PER CALIBRAZIONE ---
document.getElementById('mapWrap').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(0);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(0);
    
    // Mostra un alert con le coordinate pronte da copiare
    const msg = `Coordinate trovate: [${x}, ${y}]`;
    console.log(msg);
    alert(msg);
});

// --- MODALITÀ EDITOR COORDINATE ---
let editMode = true; // Imposta a true per trascinare i punti
let draggedMarker = null;

function enableDragging() {
    document.addEventListener('mousemove', (e) => {
        if (!draggedMarker || !editMode) return;
        const rect = $('mapWrap').getBoundingClientRect();
        // Calcola percentuale
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(0);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(0);
        
        draggedMarker.style.left = x + '%';
        draggedMarker.style.top = y + '%';
    });

    document.addEventListener('mouseup', () => {
        if (draggedMarker) {
            const label = draggedMarker.dataset.label;
            const x = parseInt(draggedMarker.style.left);
            const y = parseInt(draggedMarker.style.top);
            
            // Aggiorna l'oggetto zones
            const pointIndex = zones[currentZone].points.findIndex(p => p[0] === label);
            zones[currentZone].points[pointIndex][1] = x;
            zones[currentZone].points[pointIndex][2] = y;
            
            console.log(`Nuove coordinate per ${label}: [${x}, ${y}]`);
            console.log("Oggetto zone aggiornato:", JSON.stringify(zones, null, 2));
            draggedMarker = null;
        }
    });
}

// Modifica la funzione renderZone esistente per aggiungere l'evento mousedown
// Sostituisci la parte della creazione del marker in renderZone() con questa:
/*
    const m = document.createElement('button');
    m.className = 'marker ' + statusFor(label) + (selectedPoint === label ? ' selected' : '');
    m.style.left = x + '%';
    m.style.top = y + '%';
    m.dataset.label = label;
    m.title = label;
    
    // Drag logic
    m.onmousedown = (e) => {
        if(editMode) {
            draggedMarker = m;
            e.stopPropagation();
        } else {
            selectPoint(label);
        }
    };
    $('markersLayer').appendChild(m);
*/
