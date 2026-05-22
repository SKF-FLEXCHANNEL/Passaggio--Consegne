// --- CONFIGURAZIONE ZONE E PUNTI (RIPRISTINATI) ---
const zones = {
  zona1: { title: 'ZONA 1 - Layout interattivo', img: 'img/zona1.jpg', points: [
    ['SG01', 20, 23], ['OP30A', 14, 31], ['OP30B', 35, 27], ['OP30C', 45, 25], ['OP30D', 53, 25], ['OP30E', 63, 27], ['SG03', 48, 36], ['SG05', 60, 37],
    ['R01', 32, 47], ['OP10A', 28, 58], ['OP10B', 42, 57], ['R02', 42, 68], ['OP20A', 54, 62], ['OP20B', 54, 51], ['R03', 49, 42], ['OP40A', 66, 49], ['OP40B', 75, 49], ['OP60', 59, 58], ['OP70', 60, 65], ['R05', 59, 73], ['OP80', 70, 65], ['OP90', 77, 66], ['OP100', 83, 61], ['OP110', 84, 55], ['OP120', 77, 52], ['OP125', 86, 57], ['KEYENCE', 84, 66], ['SG02', 52, 84], ['Emergenza', 13, 86]
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
let calibrationMode = false;

const $ = id => document.getElementById(id);

// --- LOGICA DI CALIBRAZIONE ---
function enableCalibration() {
    calibrationMode = true;
    console.log("MODE CALIBRAZIONE ATTIVO: Trascina i marker dove preferisci.");
    renderZone();
}

function handleDrag(e, marker) {
    if (!calibrationMode) return;
    const rect = $('mapWrap').getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    marker.style.left = x + '%';
    marker.style.top = y + '%';
}

function saveDrag(marker) {
    if (!calibrationMode) return;
    const label = marker.dataset.label;
    const p = zones[currentZone].points.find(x => x[0] === label);
    p[1] = parseInt(marker.style.left);
    p[2] = parseInt(marker.style.top);
    console.log("Copia questo blocco di codice in app.js:", JSON.stringify(zones, null, 2));
}

// --- LOGICA DI SALVATAGGIO E VISUALIZZAZIONE ---
function save() { localStorage.setItem(KEY, JSON.stringify(anomalies)); }

function statusFor(point) {
    const arr = anomalies.filter(a => a.zone === currentZone && a.point === point);
    if (arr.some(a => a.status === 'aperta')) return 'aperta';
    if (arr.some(a => a.status === 'lavorazione')) return 'lavorazione';
    if (arr.some(a => a.status === 'risolta')) return 'risolta';
    return '';
}

function renderZone() {
    const layer = $('markersLayer');
    layer.innerHTML = '';
    zones[currentZone].points.forEach(p => {
        const m = document.createElement('button');
        m.className = 'marker ' + statusFor(p[0]) + (selectedPoint === p[0] ? ' selected' : '');
        m.style.left = p[1] + '%';
        m.style.top = p[2] + '%';
        m.dataset.label = p[0];
        
        if (calibrationMode) {
            m.onmousedown = (e) => {
                let move = (e) => handleDrag(e, m);
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', move);
                    saveDrag(m);
                }, {once: true});
            };
        } else {
            m.onclick = () => selectPoint(p[0]);
        }
        layer.appendChild(m);
    });
    renderCounter();
    renderPanel();
}

// --- GESTIONE ANOMALIE E PANNELLO ---
function selectPoint(label) {
    selectedPoint = label;
    $('panel').classList.add('open');
    $('pointInfo').innerHTML = `<b>${label}</b>`;
    $('anomalyForm').classList.remove('hidden');
    renderPanel();
}

function renderPanel() {
    if (!selectedPoint) return;
    const filter = $('statusFilter').value;
    let list = anomalies.filter(a => a.zone === currentZone && a.point === selectedPoint);
    if (filter !== 'tutte') list = list.filter(a => a.status === filter);
    
    $('anomalyList').innerHTML = list.length ? list.map(a => `
        <div class="anomaly">
            <b>${a.title}</b>
            <div class="meta">${new Date(a.date).toLocaleString()} • ${a.status}</div>
            <div>${a.description}</div>
            <div class="anomaly-actions">
                <button onclick="changeStatus('${a.id}','aperta')">Aperta</button>
                <button onclick="changeStatus('${a.id}','risolta')">Risolta</button>
                <button onclick="removeAnomaly('${a.id}')">Elimina</button>
            </div>
        </div>`).join('') : '<p class="meta">Nessuna anomalia.</p>';
}

// --- FUNZIONI DI CONTROLLO ---
function changeStatus(id, status) {
    anomalies = anomalies.map(a => a.id === id ? { ...a, status } : a);
    save();
    renderZone();
}

function removeAnomaly(id) {
    if(confirm('Eliminare anomalia?')) {
        anomalies = anomalies.filter(a => a.id !== id);
        save();
        renderZone();
    }
}

function renderCounter() {
    const n = anomalies.filter(a => a.status === 'aperta').length;
    $('openCounter').textContent = n + ' anomalie aperte';
}

// --- EVENTI E INIZIALIZZAZIONE ---
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
    $('anomalyForm').classList.add('hidden');
    renderZone();
};

document.querySelectorAll('.tab').forEach(b => b.onclick = () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    currentZone = b.dataset.zone;
    selectedPoint = null;
    renderZone();
});

$('statusFilter').onchange = () => renderZone();

// Persistenza Nome Operatore
window.addEventListener('load', () => {
    const savedOp = localStorage.getItem('operatore_corrente');
    if (savedOp) $('operator').value = savedOp;
});
$('operator').addEventListener('change', (e) => {
    localStorage.setItem('operatore_corrente', e.target.value);
});

// Esportazione
$('exportBtn').onclick = () => {
    const txt = anomalies.map(a => `${a.date} | ${a.point} | ${a.status} | ${a.title}`).join('\n');
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'consegne.txt'; link.click();
};

// Start
if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(()=>{});
renderZone();
