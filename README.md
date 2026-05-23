# Passaggio Consegne - Layout interattivo anomalie

Webapp/PWA per registrare anomalie di turno su layout interattivo di Zona 1, Zona 2 e Zona 3.

## Versione V5

Correzione mobile:
- la mappa si adatta alla larghezza del telefono;
- non viene più forzata a 980px;
- i pulsanti Zona 1, Zona 2, Zona 3 non coprono più il contenuto;
- il dettaglio del punto si apre dal basso come pannello mobile;
- resta disponibile lo zoom con i pulsanti + e -;
- le scritte del layout sono cliccabili tramite aree trasparenti.

## Pubblicazione su GitHub Pages

1. Carica tutti i file nella repository.
2. Vai su Settings > Pages.
3. Seleziona Deploy from branch.
4. Scegli branch `main` e cartella `/root`.
5. Apri il sito con `?v=5` finale la prima volta, per evitare cache vecchie.

Esempio:

```text
https://TUO-UTENTE.github.io/NOME-REPOSITORY/?v=5
```

## File principali

- `index.html`: struttura app
- `style.css`: grafica e correzione mobile
- `app.js`: punti cliccabili, anomalie, report, salvataggio locale
- `img/zona1.jpg`, `img/zona2.jpg`, `img/zona3.jpg`: layout ripuliti
- `manifest.json` e `service-worker.js`: installazione PWA

## Dati

Le anomalie vengono salvate nel browser con `localStorage`. Per un uso condiviso tra più telefoni/PC bisogna aggiungere un backend, ad esempio Google Sheets, Firebase o Cloudflare Workers/D1.
