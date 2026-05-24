-- Migrazione V11 per database D1 già esistente.
-- Esegui una riga alla volta nella Console D1 se Cloudflare segnala che una colonna esiste già.
ALTER TABLE anomalies ADD COLUMN problem_type TEXT DEFAULT 'altro';
CREATE INDEX IF NOT EXISTS idx_anomalies_problem_type ON anomalies(problem_type);

ALTER TABLE anomaly_log ADD COLUMN zone TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN point_id TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN point_label TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN title TEXT DEFAULT '';
ALTER TABLE anomaly_log ADD COLUMN problem_type TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_log_created ON anomaly_log(created_at);
