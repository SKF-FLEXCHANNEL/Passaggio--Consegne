CREATE TABLE IF NOT EXISTS hidden_points (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  zone TEXT NOT NULL,
  point_id TEXT NOT NULL,
  point_label TEXT DEFAULT '',
  deleted_by TEXT DEFAULT '',
  UNIQUE(zone, point_id)
);

CREATE INDEX IF NOT EXISTS idx_hidden_points_zone ON hidden_points(zone);
CREATE INDEX IF NOT EXISTS idx_hidden_points_point ON hidden_points(point_id);
