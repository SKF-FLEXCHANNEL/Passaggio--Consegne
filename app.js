// --- CONFIGURAZIONE ZONE E PUNTI ---
// Dopo aver usato la calibrazione, incolla qui il JSON aggiornato
const zones = {
  zona1: { title: 'ZONA 1 - Layout interattivo', img: 'img/zona1.jpg', points: [['SG01', 20, 23], ['OP30A', 14, 31]] },
  zona2: { title: 'ZONA 2 - Layout interattivo', img: 'img/zona2.jpg', points: [] },
  zona3: { title: 'ZONA 3 - Layout interattivo', img: 'img/zona3.jpg', points: [] }
};

const KEY = 'passaggio_consegne_hmi_v1';
let currentZone = 'zona1';
let selectedPoint = null;
let anomalies = JSON.parse(localStorage.getItem(KEY) || '[]');
let calibrationMode = false;

const $ = id => document.getElementById(id);

// --- LOGICA DI CALIBRAZIONE (DRAG & DROP) ---
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
if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
renderZone();
