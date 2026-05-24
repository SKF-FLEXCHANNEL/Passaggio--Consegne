# Backend Cloudflare Workers/D1 - V11

## Secrets da creare nel Worker

Nel pannello Cloudflare vai su:

Workers & Pages → passaggio-consegne-api → Settings → Variables and Secrets

Crea questi Secrets:

```text
APP_USER_PIN=1234
APP_ADMIN_PIN=9999
```

Puoi scegliere PIN diversi. `APP_USER_PIN` è quello che darai agli operatori. `APP_ADMIN_PIN` resta solo a chi configura l'app.

`APP_WRITE_KEY` è opzionale e serve solo per compatibilità con le versioni precedenti.

## D1 binding

Il binding D1 deve chiamarsi:

```text
DB
```

## Migrazione V11

Se il database esiste già, apri D1 → Console ed esegui:

```sql
ALTER TABLE anomalies ADD COLUMN problem_type TEXT DEFAULT 'altro';
CREATE INDEX IF NOT EXISTS idx_anomalies_problem_type ON anomalies(problem_type);

ALTER TABLE anomaly_log ADD COLUMN zone TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN point_id TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN point_label TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN title TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN problem_type TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_log_created ON anomaly_log(created_at);
```

Se una riga dà errore perché la colonna esiste già, vai avanti con la riga successiva.
