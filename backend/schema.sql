-- Passaggio Consegne - schema Cloudflare D1
CREATE TABLE IF NOT EXISTS anomalies (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  zone TEXT NOT NULL,
  point_id TEXT NOT NULL,
  point_label TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  action TEXT DEFAULT '',
  shift TEXT DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'media',
  status TEXT NOT NULL DEFAULT 'aperta',
  operator_name TEXT DEFAULT '',
  source_device TEXT DEFAULT '',
  closed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_anomalies_zone ON anomalies(zone);
CREATE INDEX IF NOT EXISTS idx_anomalies_point ON anomalies(point_id);
CREATE INDEX IF NOT EXISTS idx_anomalies_status ON anomalies(status);
CREATE INDEX IF NOT EXISTS idx_anomalies_created ON anomalies(created_at);

CREATE TABLE IF NOT EXISTS anomaly_log (
  id TEXT PRIMARY KEY,
  anomaly_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  action TEXT NOT NULL,
  status TEXT DEFAULT '',
  operator_name TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_log_anomaly ON anomaly_log(anomaly_id);
