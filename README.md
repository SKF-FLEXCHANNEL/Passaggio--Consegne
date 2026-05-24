# Passaggio Consegne - Webapp condivisa

Webapp per registrare anomalie di turno sulle tre zone della linea, con layout interattivo e backend Cloudflare Workers/D1.

## Struttura

```text
passaggio-consegne-cloudflare-d1/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
├── img/
│   ├── zona1.jpg
│   ├── zona2.jpg
│   └── zona3.jpg
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── data/
│   └── README-punti.md
└── backend/
    ├── src/worker.js
    ├── schema.sql
    ├── wrangler.toml
    ├── package.json
    └── README.md
```

## Come funziona

- La parte frontend può essere caricata su GitHub Pages.
- Il backend Cloudflare Worker salva e legge le anomalie nel database D1.
- Ogni telefono o PC vede gli stessi dati quando usa lo stesso URL API.
- Se il backend non è configurato, la webapp continua a funzionare in locale sul singolo dispositivo.

## Pubblicazione frontend su GitHub Pages

Carica nella repository GitHub questi file e cartelle:

```text
index.html
style.css
app.js
manifest.json
service-worker.js
img/
icons/
data/
```

Poi vai su **Settings > Pages** e attiva GitHub Pages sul branch principale.

## Backend Cloudflare

Le istruzioni sono dentro:

```text
backend/README.md
```

Dopo la pubblicazione del Worker, apri la webapp e vai su:

```text
⚙ Backend
```

Inserisci:

1. URL API Cloudflare Worker
2. Chiave/PIN `APP_WRITE_KEY`

Poi premi **Test** e **Salva**.

## Regolazione punti cliccabili

I punti sono in `app.js`, dentro `ZONES`.
Attiva nell'app **Mostra aree cliccabili** per vedere le zone trasparenti sopra le scritte.
