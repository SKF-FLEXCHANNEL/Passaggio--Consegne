# Passaggio Consegne - V7

Webapp per registrare anomalie e passaggio consegne con layout interattivo di Zona 1, Zona 2 e Zona 3.

## Novità V7

- Menu laterale funzionante tramite pulsante ☰ vicino al titolo.
- Aree cliccabili riallineate sulle scritte presenti nelle immagini.
- Comando **Mostra aree cliccabili** per controllare dove si può cliccare.
- Pulsante **Mappa grande** dal menu laterale.
- Compatibile con backend Cloudflare Workers/D1 già configurato.
- Cache aggiornata a `v=7`.

## Pubblicazione su GitHub Pages

Carica tutti i file nella repository GitHub Pages, mantenendo la struttura:

```text
index.html
style.css
app.js
manifest.json
service-worker.js
img/zona1.jpg
img/zona2.jpg
img/zona3.jpg
icons/icon-192.png
icons/icon-512.png
backend/...
```

Dopo il caricamento, apri il sito aggiungendo:

```text
?v=7
```

Esempio:

```text
https://marconeri70.github.io/passaggio-consegne/?v=7
```

Se il telefono mostra ancora la vecchia versione, svuota la cache del sito oppure disinstalla e reinstalla la PWA.

## Backend Cloudflare

Il backend resta quello presente nella cartella `backend`.
Nella webapp premi **Backend** e inserisci:

- URL Worker Cloudflare
- chiave `APP_WRITE_KEY`



## Aggiornamento V8
- rimosso il sottotitolo sotto Passaggio Consegne.
- il menu laterale apre l'elenco globale delle anomalie.
- le anomalie nel menu/elenco sono cliccabili e portano al punto corretto della mappa.
- `Tutte le anomalie` mostra davvero tutte le segnalazioni, mentre `Solo anomalie aperte` mostra tutte quelle attive.
