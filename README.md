# Passaggio Consegne - V9

Webapp per registrare anomalie di turno su layout interattivo Zona 1, Zona 2 e Zona 3.

## Novità V9

- Sincronizzazione automatica con Cloudflare D1 ogni 15 secondi.
- Aggiornamento automatico quando riapri la pagina o torni sulla scheda.
- Area backend nascosta nel menu come **Area admin backend**.
- Storico consegne dal menu laterale.
- Rimosso il sottotitolo sotto il titolo principale.
- Mantenute aree cliccabili sui layout e menu di selezione punto.

## Backend predefinito

Nel file `app.js` è presente questa riga:

```js
const DEFAULT_API_URL = 'https://passaggio-consegne-api.vocidicassino.workers.dev';
```

Se il tuo Worker ha un URL diverso, modifica questa riga.

## Aggiornamento Worker Cloudflare

Per usare lo **Storico consegne** devi aggiornare anche il Worker Cloudflare con il file:

```text
backend/src/worker.js
```

Il database D1 non richiede nuove tabelle se hai già usato lo schema precedente, perché la tabella `anomaly_log` era già presente.

## Pubblicazione su GitHub Pages

Carica tutti i file nella root del repository GitHub Pages e apri il sito con:

```text
?v=9
```

Esempio:

```text
https://marconeri70.github.io/passaggio-consegne/?v=9
```
