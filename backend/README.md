# Backend Cloudflare Workers + D1

Questo backend permette di usare la webapp da più telefoni e PC con un database condiviso.

## Comandi principali

```bash
cd backend
npm install
npx wrangler login
npx wrangler d1 create passaggio-consegne-db
```

Copia il `database_id` restituito da Cloudflare dentro `wrangler.toml` al posto di:

```toml
database_id = "INSERISCI_QUI_DATABASE_ID"
```

Poi crea le tabelle nel database remoto:

```bash
npx wrangler d1 execute passaggio-consegne-db --file=./schema.sql --remote
```

Imposta la chiave di scrittura:

```bash
npx wrangler secret put APP_WRITE_KEY
```

Quando te la chiede, inserisci una chiave o un PIN robusto, per esempio:

```text
ConsegneLinea2026!
```

Pubblica il Worker:

```bash
npx wrangler deploy
```

Al termine Cloudflare ti darà un URL simile a:

```text
https://passaggio-consegne-api.nomeaccount.workers.dev
```

Apri la webapp, entra in **Backend**, incolla l'URL API e inserisci la stessa chiave `APP_WRITE_KEY`.

## Endpoint disponibili

- `GET /api/health`
- `GET /api/anomalies`
- `POST /api/anomalies`
- `PATCH /api/anomalies/:id`
- `DELETE /api/anomalies/:id`
- `GET /api/stats`

Le modifiche richiedono l'header:

```text
X-APP-KEY: tua_chiave
```
