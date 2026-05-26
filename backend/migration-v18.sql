CREATE TABLE IF NOT EXISTS changeovers (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  zone TEXT NOT NULL,
  old_type TEXT NOT NULL,
  new_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'attivo',
  operator_name TEXT DEFAULT '',
  notes TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_changeovers_status ON changeovers(status);
CREATE INDEX IF NOT EXISTS idx_changeovers_zone ON changeovers(zone);
CREATE INDEX IF NOT EXISTS idx_changeovers_updated ON changeovers(updated_at);

CREATE TABLE IF NOT EXISTS changeover_points (
  id TEXT PRIMARY KEY,
  changeover_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  zone TEXT NOT NULL,
  point_id TEXT NOT NULL,
  point_label TEXT NOT NULL,
  phase TEXT NOT NULL DEFAULT 'out',
  status TEXT NOT NULL DEFAULT 'todo',
  comment TEXT DEFAULT '',
  operator_name TEXT DEFAULT '',
  UNIQUE(changeover_id, point_id, phase)
);

CREATE INDEX IF NOT EXISTS idx_changeover_points_changeover ON changeover_points(changeover_id);
CREATE INDEX IF NOT EXISTS idx_changeover_points_phase ON changeover_points(changeover_id, phase);
CREATE INDEX IF NOT EXISTS idx_changeover_points_status ON changeover_points(changeover_id, phase, status);
CREATE INDEX IF NOT EXISTS idx_changeover_points_point ON changeover_points(point_id);

CREATE TABLE IF NOT EXISTS changeover_log (
  id TEXT PRIMARY KEY,
  changeover_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  action TEXT NOT NULL,
  zone TEXT DEFAULT '',
  point_id TEXT DEFAULT '',
  point_label TEXT DEFAULT '',
  phase TEXT DEFAULT '',
  status TEXT DEFAULT '',
  operator_name TEXT DEFAULT '',
  old_type TEXT DEFAULT '',
  new_type TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_changeover_log_changeover ON changeover_log(changeover_id);
CREATE INDEX IF NOT EXISTS idx_changeover_log_created ON changeover_log(created_at);
