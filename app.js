const zones = {
  zona1: { title: 'ZONA 1', img: 'img/zona1.jpg', points: [
    ['SG01', 20, 23], ['OP30A', 14, 31], ['OP30B', 35, 27], ['OP30C', 45, 25], ['OP30D', 53, 25], ['OP30E', 63, 27], ['SG03', 48, 36], ['SG05', 60, 37],
    ['R01', 32, 47], ['OP10A', 28, 58], ['OP10B', 42, 57], ['R02', 42, 68], ['OP20A', 54, 62], ['OP20B', 54, 51], ['R03', 49, 42], ['OP40A', 66, 49], ['OP40B', 75, 49], ['OP60', 59, 58], ['OP70', 60, 65], ['R05', 59, 73], ['OP80', 70, 65], ['OP90', 77, 66], ['OP100', 83, 61], ['OP110', 84, 55], ['OP120', 77, 52], ['OP125', 86, 57], ['KEYENCE', 84, 66], ['SG02', 52, 84], ['Emergenza', 13, 86]
  ]},
  zona2: { title: 'ZONA 2', img: 'img/zona2.jpg', points: [
    ['Lavatrice SX', 18, 39], ['OP170A-B', 39, 47], ['R07', 40, 58], ['OP130', 51, 47], ['R08', 51, 58], ['OP140', 62, 47], ['R09', 61, 59], ['OP125C', 75, 51], ['OP135', 79, 46], ['OP150', 76, 59], ['OP200', 86, 39], ['SG01', 85, 28], ['SG02', 51, 82], ['Q.E. Zona 2', 58, 25], ['PH01 Emergenza', 51, 88]
  ]},
  zona3: { title: 'ZONA 3', img: 'img/zona3.jpg', points: [
    ['SG01', 13, 31], ['R10', 36, 38], ['R11', 35, 62], ['R12', 51, 64], ['R13', 55, 42], ['R14', 76, 44], ['OP230', 30, 49], ['OP240', 37, 49], ['OP250', 48, 49], ['OP260A', 51, 30], ['OP260B', 61, 30], ['OP270A', 50, 49], ['OP270B', 60, 49], ['OP290', 75, 60], ['SG03', 49, 31], ['SG05', 58, 31], ['SG07', 86, 37], ['Contenitore', 86, 61], ['Lavatrice', 13, 48], ['Q.E. Zona 3', 70, 25], ['SG02', 31, 84]
  ]}
};

const KEY = 'hmi_consegne_v2';
let currentZone = 'zona1';
let selectedPoint = null;
let anomalies = JSON.parse(localStorage.getItem(KEY) || '[]');

function renderZone() {
    const svg = document.getElementById('markersLayer');
    svg.innerHTML = '';
    
    zones[currentZone].points.forEach(p => {
        const [label, x, y] = p;
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "2.5");
        circle.setAttribute("class", "marker " + getStatus(label));
        circle.onclick = () => selectPoint(label);
        svg.appendChild(circle);
    });
    renderList();
}

function getStatus(point) {
    const arr = anomalies.filter(a => a.zone === currentZone && a.point === point);
    return arr.some(a => a.status === 'aperta') ? 'aperta' : (arr.some(a=>a.status==='lavorazione') ? 'lavorazione' : '');
}

function selectPoint(label) {
    selectedPoint = label;
    document.getElementById('title').value = label;
    renderList(label);
}

function renderList(filterPoint = null) {
    const filterStatus = document.getElementById('statusFilter').value;
    let list = anomalies.filter(a => a.zone === currentZone);
    if(filterPoint) list = list.filter(a => a.point === filterPoint);
    if(filterStatus === 'aperta') list = list.filter(a => a.status === 'aperta');
    
    document.getElementById('anomalyList').innerHTML = list.map(a => `
        <div class="anomaly ${a.status}">
            <b>${a.point}</b>: ${a.title}<br>${a.description}
            <button onclick="removeAnomaly(${a.id})">Elimina</button>
        </div>`).join('');
}

function removeAnomaly(id) {
    anomalies = anomalies.filter(a => a.id !== id);
    localStorage.setItem(KEY, JSON.stringify(anomalies));
    renderZone();
}

document.getElementById('anomalyForm').onsubmit = (e) => {
    e.preventDefault();
    anomalies.unshift({
        id: Date.now(),
        zone: currentZone,
        point: document.getElementById('title').value,
        title: document.getElementById('title').value,
        status: document.getElementById('status').value,
        description: document.getElementById('description').value
    });
    localStorage.setItem(KEY, JSON.stringify(anomalies));
    renderZone();
};

document.querySelectorAll('.tab').forEach(b => b.onclick = (e) => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    e.target.classList.add('active');
    currentZone = e.target.dataset.zone;
    document.getElementById('zoneTitle').textContent = zones[currentZone].title;
    document.getElementById('zoneImage').src = zones[currentZone].img;
    renderZone();
});

renderZone();
