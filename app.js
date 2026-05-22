const KEY = 'passaggio_consegne_anomalie_v1';
let anomalie = JSON.parse(localStorage.getItem(KEY) || '[]');
let editId = null;

function nowLocal(){
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0,16);
}

document.getElementById('dataOra').value = nowLocal();

function salvaStorage(){
  localStorage.setItem(KEY, JSON.stringify(anomalie));
}

document.getElementById('form').addEventListener('submit', e=>{
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
  if(editId){
    anomalie = anomalie.map(a=>a.id===editId ? obj : a);
    editId=null;
  } else {
    anomalie.unshift(obj);
  }
  salvaStorage();
  resetForm();
  render();
});

function resetForm(){
  form.reset();
  dataOra.value = nowLocal();
  editId=null;
  document.querySelector('button[type="submit"]').textContent='Salva anomalia';
}

function setStato(id, stato){
  anomalie = anomalie.map(a=>a.id===id ? {...a, stato} : a);
  salvaStorage();
  render();
}

function modifica(id){
  const a = anomalie.find(x=>x.id===id);
  if(!a) return;
  editId=id;
  dataOra.value=a.dataOra;
  turno.value=a.turno;
  zona.value=a.zona;
  stazione.value=a.stazione;
  tipo.value=a.tipo;
  priorita.value=a.priorita;
  descrizione.value=a.descrizione;
  intervento.value=a.intervento;
  operatore.value=a.operatore;
  document.querySelector('button[type="submit"]').textContent='Aggiorna anomalia';
  window.scrollTo({top:0,behavior:'smooth'});
}

function elimina(id){
  if(!confirm('Eliminare questa anomalia?')) return;
  anomalie = anomalie.filter(a=>a.id!==id);
  salvaStorage();
  render();
}

function classeStato(stato){
  if(stato==='Risolta') return 'risolta';
  if(stato==='In lavorazione') return 'lavorazione';
  return 'aperta';
}

function render(){
  const z = filtroZona.value;
  const s = filtroStato.value;
  const filtrate = anomalie.filter(a => (z==='Tutte'||a.zona===z) && (s==='Tutti'||a.stato===s));
  totAperte.textContent = anomalie.filter(a=>a.stato==='Aperta').length;
  totLav.textContent = anomalie.filter(a=>a.stato==='In lavorazione').length;
  totRisolte.textContent = anomalie.filter(a=>a.stato==='Risolta').length;

  if(!filtrate.length){
    lista.innerHTML='<div class="empty">Nessuna anomalia presente.</div>';
    return;
  }

  lista.innerHTML = filtrate.map(a=>`
    <article class="item ${classeStato(a.stato)}">
      <div class="topline">
        <div>
          <b>${a.zona} ${a.stazione ? '• '+escapeHtml(a.stazione) : ''}</b>
          <div class="meta">${fmt(a.dataOra)} • ${a.turno} • ${a.tipo} • Priorità ${a.priorita}</div>
        </div>
        <span class="badge">${a.stato}</span>
      </div>
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

function fmt(v){
  return new Date(v).toLocaleString('it-IT');
}

function escapeHtml(str){
  return String(str).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function esportaTesto(){
  const testo = anomalie.map(a=>`[${fmt(a.dataOra)}] ${a.turno} - ${a.zona} - ${a.stazione}\nTipo: ${a.tipo} | Priorità: ${a.priorita} | Stato: ${a.stato}\nAnomalia: ${a.descrizione}\nConsegna: ${a.intervento}\nOperatore: ${a.operatore}\n`).join('\n-----------------------------\n');
  const blob = new Blob([testo], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href=url;
  link.download='passaggio_consegne_anomalie.txt';
  link.click();
  URL.revokeObjectURL(url);
}

function stampa(){
  window.print();
}

function cancellaTutto(){
  if(confirm('Vuoi cancellare tutto il registro?')){
    anomalie=[];
    salvaStorage();
    render();
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}

render();
