# Backend Cloudflare Workers + D1 - V9

Questa versione aggiunge l'endpoint:

```text
GET /api/logs?limit=500
```

Serve per visualizzare lo storico consegne nella webapp.

## Da fare su Cloudflare senza Wrangler

1. Apri Cloudflare.
2. Vai su **Workers & Pages**.
3. Apri il Worker `passaggio-consegne-api`.
4. Clicca **Edit code**.
5. Sostituisci tutto il codice con `backend/src/worker.js`.
6. Premi **Deploy**.

## Controlli

Apri:

```text
https://passaggio-consegne-api.vocidicassino.workers.dev/api/health
```

Poi apri:

```text
https://passaggio-consegne-api.vocidicassino.workers.dev/api/logs?limit=10
```

Se vedi una risposta JSON, lo storico è attivo.

## Database

Se hai già creato il database con lo schema precedente, non devi fare altro.
Se parti da zero, usa `schema.sql`.
