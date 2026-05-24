# Passaggio Consegne - V11 Report + PIN

Webapp PWA per registrare anomalie di turno su layout interattivo Zona 1, Zona 2 e Zona 3.

## Novità V11

- Report anomalie con frequenza per punto, tipo problema e punto + tipo.
- Campo “Tipo problema” nella creazione anomalia.
- PIN unico app per operatori: chi installa l'app inserisce solo il PIN e si collega al registro condiviso.
- Area admin backend nascosta nel menu laterale.
- Compatibilità Cloudflare Workers/D1.

## File principali

- `index.html`
- `style.css`
- `app.js`
- `manifest.json`
- `service-worker.js`
- `img/zona1.jpg`, `img/zona2.jpg`, `img/zona3.jpg`
- `backend/src/worker.js`
- `backend/schema.sql`
- `backend/migration-v11.sql`

## Cloudflare Dashboard

Imposta questi Secrets nel Worker:

- `APP_USER_PIN`: PIN unico per operatori/installazione app.
- `APP_ADMIN_PIN`: PIN amministratore per aprire la configurazione backend.
- `APP_WRITE_KEY`: opzionale, solo compatibilità vecchie versioni.

Il binding D1 deve chiamarsi esattamente:

```text
DB
```

## Aggiornamento database già esistente

Se hai già creato il database D1 con le versioni precedenti, apri la Console D1 ed esegui `backend/migration-v11.sql`.
Se Cloudflare dice che una colonna esiste già, continua con le righe successive.

## Dopo il caricamento su GitHub Pages

Apri il sito con:

```text
https://marconeri70.github.io/passaggio-consegne/?v=11
```

Se vedi una vecchia versione, svuota la cache o disinstalla/reinstalla la PWA.
