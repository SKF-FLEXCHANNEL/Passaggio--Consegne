const KEY = 'passaggio_consegne_anomalie_v2_interattivo';
let anomalie = JSON.parse(localStorage.getItem(KEY) || '[]');
let editId = null;

const layoutImages = {
  'Zona 1': 'assets/layout/zona1.jpg',
  'Zona 2': 'assets/layout/zona2.jpg',
  'Zona 3': 'assets/layout/zona3.jpg'
};

// Coordinate in percentuale sulla foto del layout. Puoi spostarle cambiando x e y.
const puntiLayout = {
  'Zona 1': [
    {id:'SG01', label:'Porta 1 / SG01', x:17, y:36},
    {id:'OP30A', label:'OP30A', x:29, y:35},
    {id:'OP30B', label:'OP30B', x:34, y:30},
    {id:'OP30C', label:'OP30C', x:39, y:29},
    {id:'OP30D', label:'OP30D', x:43, y:30},
    {id:'OP30E', label:'OP30E', x:48, y:35},
    {id:'OP10A', label:'OP10A', x:30, y:61},
    {id:'OP10B', label:'OP10B', x:37, y:58},
    {id:'OP20A', label:'OP20A', x:44, y:64},
    {id:'OP20B', label:'OP20B', x:45, y:53},
    {id:'OP40A', label:'OP40A', x:54, y:54},
    {id:'OP40B', label:'OP40B', x:65, y:54},
    {id:'OP60', label:'OP60', x:57, y:62},
    {id:'OP100', label:'OP100', x:73, y:70},
    {id:'OP125', label:'OP125', x:79, y:71},
    {id:'KEYENCE', label:'Keyence 3D', x:75, y:78},
    {id:'SG02', label:'Porta 2 / SG02', x:35, y:89},
    {id:'SG03', label:'Porta 3 / SG03', x:63, y:38},
    {id:'SG05', label:'Porta 5 / SG05', x:76, y:39}
  ],
  'Zona 2': [
    {id:'LAVATRICE1', label:'Lavatrice sx', x:19, y:44},
    {id:'OP170A-B', label:'OP170A+B', x:38, y:47},
    {id:'OP180', label:'OP180', x:50, y:49},
    {id:'OP190', label:'OP190', x:61, y:50},
    {id:'OP125C', label:'OP125C', x:71, y:55},
    {id:'OP135', label:'OP135', x:75, y:48},
    {id:'LAVATRICE2', label:'Lavatrice dx', x:83, y:47},
    {id:'SG01', label:'Porta 1 / SG01', x:78, y:28},
    {id:'SG02', label:'Porta 2 / SG02', x:50, y:83},
    {id:'QE-Z2', label:'Q.E. Zona 2', x:48, y:22},
    {id:'R07-08-09', label:'R07-08-09', x:59, y:20}
  ],
  'Zona 3': [
    {id:'SG01', label:'Porta 1 / SG01', x:17, y:35},
    {id:'R10-11-12', label:'R10-11-12', x:36, y:25},
    {id:'R13-R14', label:'R13/R14', x:48, y:25},
    {id:'SG03', label:'Porta 3 / SG03', x:50, y:35},
    {id:'SG05', label:'Porta 5 / SG05', x:58, y:35},
    {id:'OP260A', label:'OP260A', x:53, y:43},
    {id:'OP260B', label:'OP260B', x:61, y:43},
    {id:'OP230', label:'OP230', x:28, y:58},
    {id:'OP270', label:'OP270', x:44, y:62},
    {id:'OP280', label:'OP280', x:56, y:61},
    {id:'OP290', label:'OP290', x:66, y:66},
    {id:'SG07', label:'Porta 7 / SG07', x:78, y:44},
    {id:'SG02', label:'Porta 2 / SG02', x:37, y:86},
    {id:'QE-Z3', label:'Q.E. Zona 3', x:70, y:25}
  ]
};

function nowLocal(){
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0,16);
}

dataOra.value = nowLocal();

function salvaStorage(){ localStorage.setItem(KEY, JSON.stringify(anomalie)); }

form.addEventListener('submit', e=>{
  e.preventDefault();
  const obj = {
    id: editId || Date.now().toString(),
    dataOra: dataOra.value,
    turno: turno.value,
    zona: zona.value,
    stazione: stazione.value.trim(),
    tipo: tipo.value,
    priorita: priorita.value,
    descrizione: descrizione.value.trim(),
    intervento: intervento.value.trim(),
    operatore: operatore.value.trim(),
    stato: editId ? (anomalie.find(a=>a.id===editId)?.stato || 'Aperta') : 'Aperta'
  };
  if(editId){ anomalie = anomalie.map(a=>a.id===editId ? obj : a); editId=null; }
  else { anomalie.unshift(obj); }
  salvaStorage(); resetForm(); render(); renderHotspots();
});

function resetForm(){
  form.reset(); dataOra.value = nowLocal(); editId=null;
  document.querySelector('button[type="submit"]').textContent='Salva anomalia';
  formTitle.textContent='Nuova anomalia';
}

function syncLayoutFromForm(){
  if(zona.value !== 'Generale'){
    layoutZona.value = zona.value;
    cambiaLayoutZona();
  }
}

function cambiaLayoutZona(){
  layoutImg.src = layoutImages[layoutZona.value];
  if(zona.value !== 'Generale') zona.value = layoutZona.value;
  renderHotspots();
}

function renderHotspots(){
  const z = layoutZona.value;
  hotspots.innerHTML = (puntiLayout[z] || []).map(p=>{
    const stato = statoPunto(z, p.id);
    return `<button class="hotspot ${stato.classe}" style="left:${p.x}%;top:${p.y}%" data-label="${escapeHtml(p.id)}" title="${escapeHtml(p.label)}" onclick="apriPopupPunto('${z}','${p.id}')">${stato.count || ''}</button>`;
  }).join('');
}

function statoPunto(z, punto){
  const collegate = anomalie.filter(a => a.zona === z && norm(a.stazione).includes(norm(punto)) && a.stato !== 'Risolta');
  if(collegate.some(a=>a.stato === 'Aperta')) return {classe:'red', count: collegate.length};
  if(collegate.some(a=>a.stato === 'In lavorazione')) return {classe:'orange', count: collegate.length};
  return {classe:'green', count: 0};
}

function apriPopupPunto(z, punto){
  const tutte = anomalie.filter(a => a.zona === z && norm(a.stazione).includes(norm(punto)));
  popupTitle.textContent = `${z} - ${punto}`;
  popupBody.innerHTML = `
    <p class="meta">Anomalie collegate a questo punto: <b>${tutte.length}</b></p>
    <div class="popup-actions">
      <button class="btn-green" onclick="nuovaDaPunto('${z}','${punto}')">+ Nuova anomalia qui</button>
      <button class="btn-dark" onclick="filtraDaPunto('${z}','${punto}')">Mostra nel registro</button>
    </div>
    ${tutte.length ? tutte.map(a=>`
      <div class="mini ${classeStato(a.stato)}">
        <b>${escapeHtml(a.stato)} • ${escapeHtml(a.tipo)} • Priorità ${escapeHtml(a.priorita)}</b>
        <div class="meta">${fmt(a.dataOra)} • ${escapeHtml(a.turno)} ${a.operatore ? '• '+escapeHtml(a.operatore) : ''}</div>
        <div class="desc"><b>Anomalia:</b> ${escapeHtml(a.descrizione)}</div>
        ${a.intervento ? `<div class="desc"><b>Consegna:</b> ${escapeHtml(a.intervento)}</div>` : ''}
        <div class="popup-actions">
          <button class="btn-orange" onclick="setStato('${a.id}','In lavorazione')">In lavorazione</button>
          <button class="btn-green" onclick="setStato('${a.id}','Risolta')">Risolta</button>
          <button class="btn-dark" onclick="modifica('${a.id}');chiudiPopup();">Modifica</button>
        </div>
      </div>`).join('') : '<div class="empty">Nessuna anomalia su questo punto.</div>'}
  `;
  popupBackdrop.classList.add('show');
}

function nuovaDaPunto(z, punto){
  resetForm(); zona.value = z; layoutZona.value = z; stazione.value = punto; cambiaLayoutZona(); chiudiPopup();
  formTitle.textContent = `Nuova anomalia su ${z} - ${punto}`;
  window.scrollTo({top: document.querySelector('form').offsetTop - 80, behavior:'smooth'});
}

function filtraDaPunto(z, punto){
  filtroZona.value = z; filtroStato.value = 'Tutti'; render(); chiudiPopup();
  setTimeout(()=>document.getElementById('lista').scrollIntoView({behavior:'smooth'}), 100);
}

function chiudiPopup(event){
  if(event && event.target !== popupBackdrop) return;
  popupBackdrop.classList.remove('show');
}

function setStato(id, stato){
  anomalie = anomalie.map(a=>a.id===id ? {...a, stato} : a);
  salvaStorage(); render(); renderHotspots();
  if(popupBackdrop.classList.contains('show')) chiudiPopup();
}

function modifica(id){
  const a = anomalie.find(x=>x.id===id); if(!a) return;
  editId=id; dataOra.value=a.dataOra; turno.value=a.turno; zona.value=a.zona; stazione.value=a.stazione;
  tipo.value=a.tipo; priorita.value=a.priorita; descrizione.value=a.descrizione; intervento.value=a.intervento; operatore.value=a.operatore;
  document.querySelector('button[type="submit"]').textContent='Aggiorna anomalia';
  formTitle.textContent='Modifica anomalia';
  if(a.zona !== 'Generale'){ layoutZona.value=a.zona; cambiaLayoutZona(); }
  window.scrollTo({top:0,behavior:'smooth'});
}

function elimina(id){
  if(!confirm('Eliminare questa anomalia?')) return;
  anomalie = anomalie.filter(a=>a.id!==id); salvaStorage(); render(); renderHotspots();
}

function classeStato(stato){ if(stato==='Risolta') return 'risolta'; if(stato==='In lavorazione') return 'lavorazione'; return 'aperta'; }

function render(){
  const z = filtroZona.value, s = filtroStato.value;
  const filtrate = anomalie.filter(a => (z==='Tutte'||a.zona===z) && (s==='Tutti'||a.stato===s));
  totAperte.textContent = anomalie.filter(a=>a.stato==='Aperta').length;
  totLav.textContent = anomalie.filter(a=>a.stato==='In lavorazione').length;
  totRisolte.textContent = anomalie.filter(a=>a.stato==='Risolta').length;
  if(!filtrate.length){ lista.innerHTML='<div class="empty">Nessuna anomalia presente.</div>'; return; }
  lista.innerHTML = filtrate.map(a=>`
    <article class="item ${classeStato(a.stato)}">
      <div class="topline"><div><b>${escapeHtml(a.zona)} ${a.stazione ? '• '+escapeHtml(a.stazione) : ''}</b><div class="meta">${fmt(a.dataOra)} • ${escapeHtml(a.turno)} • ${escapeHtml(a.tipo)} • Priorità ${escapeHtml(a.priorita)}</div></div><span class="badge">${escapeHtml(a.stato)}</span></div>
      <div class="desc"><b>Anomalia:</b> ${escapeHtml(a.descrizione)}</div>
      ${a.intervento ? `<div class="desc"><b>Consegna:</b> ${escapeHtml(a.intervento)}</div>` : ''}
      ${a.operatore ? `<div class="meta">Operatore: ${escapeHtml(a.operatore)}</div>` : ''}
      <div class="small-actions">
        <button onclick="setStato('${a.id}','Aperta')" class="btn-red">Aperta</button>
        <button onclick="setStato('${a.id}','In lavorazione')" class="btn-orange">In lavorazione</button>
        <button onclick="setStato('${a.id}','Risolta')" class="btn-green">Risolta</button>
        <button onclick="modifica('${a.id}')" class="btn-dark">Modifica</button>
        <button onclick="elimina('${a.id}')" class="btn-red">Elimina</button>
      </div>
    </article>`).join('');
}

function fmt(v){ return new Date(v).toLocaleString('it-IT'); }
function norm(str){ return String(str || '').toLowerCase().replace(/\s+/g,'').replace(/[\/]/g,'-'); }
function escapeHtml(str){ return String(str || '').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function esportaTesto(){
  const testo = anomalie.map(a=>`[${fmt(a.dataOra)}] ${a.turno} - ${a.zona} - ${a.stazione}\nTipo: ${a.tipo} | Priorità: ${a.priorita} | Stato: ${a.stato}\nAnomalia: ${a.descrizione}\nConsegna: ${a.intervento}\nOperatore: ${a.operatore}\n`).join('\n-----------------------------\n');
  const blob = new Blob([testo], {type:'text/plain'}); const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href=url; link.download='passaggio_consegne_anomalie.txt'; link.click(); URL.revokeObjectURL(url);
}
function stampa(){ window.print(); }
function cancellaTutto(){ if(confirm('Vuoi cancellare tutto il registro?')){ anomalie=[]; salvaStorage(); render(); renderHotspots(); } }

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
render(); renderHotspots();
