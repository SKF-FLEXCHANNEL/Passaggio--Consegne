export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);

    if (!isAllowedOrigin(request)) {
      return json({ error: 'Origine non autorizzata' }, 403, cors);
    }

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    try {
      const url = new URL(request.url);
      const path = url.pathname.replace(/\/+$/, '') || '/';

      if (path === '/' || path === '/api/health') {
        return json({ status: 'online', app: 'passaggio-consegne-api', version: '23-hidden-layout-points-strict-skf-origin', time: new Date().toISOString() }, 200, cors);
      }

      if (path === '/api/admin/check' && request.method === 'POST') {
        await requireAdminPin(request, env);
        return json({ ok: true, role: 'admin' }, 200, cors);
      }
      if (path === '/api/session/check' && request.method === 'POST') {
        await requireAppPinOrWriteKey(request, env);
        return json({ ok: true, role: 'operator' }, 200, cors);
      }

      if (!env.DB) return json({ error: 'D1 binding DB mancante. Controlla il binding DB del Worker.' }, 500, cors);

      if (path === '/api/hidden-points' && request.method === 'GET') return await listHiddenPoints(env, cors);

      const hiddenPointMatch = path.match(/^\/api\/admin\/layout-points\/([^/]+)\/([^/]+)$/);
      if (hiddenPointMatch && request.method === 'DELETE') {
        await requireAdminPin(request, env);
        return await hideLayoutPoint(hiddenPointMatch[1], hiddenPointMatch[2], request, env, cors);
      }

      if (path === '/api/stats' && request.method === 'GET') return await getStats(env, cors);
      if (path === '/api/anomalies' && request.method === 'GET') return await listAnomalies(request, env, cors);
      if (path === '/api/logs' && request.method === 'GET') return await listLogs(request, env, cors);
      if (path === '/api/anomalies' && request.method === 'POST') {
        await requireAppPinOrWriteKey(request, env);
        return await createAnomaly(request, env, cors);
      }

      if (path === '/api/changeovers' && request.method === 'GET') return await listChangeovers(request, env, cors);
      if (path === '/api/changeovers' && request.method === 'POST') {
        await requireAppPinOrWriteKey(request, env);
        return await createChangeover(request, env, cors);
      }

      const changePointsMatch = path.match(/^\/api\/changeovers\/([^/]+)\/points$/);
      if (changePointsMatch && request.method === 'GET') return await listChangeoverPoints(changePointsMatch[1], request, env, cors);

      const changePointMatch = path.match(/^\/api\/changeovers\/([^/]+)\/points\/([^/]+)$/);
      if (changePointMatch && request.method === 'PATCH') {
        await requireAppPinOrWriteKey(request, env);
        return await updateChangeoverPoint(changePointMatch[1], changePointMatch[2], request, env, cors);
      }

      const changeMatch = path.match(/^\/api\/changeovers\/([^/]+)$/);
      if (changeMatch && request.method === 'GET') return await getChangeover(changeMatch[1], env, cors);
      if (changeMatch && request.method === 'PATCH') {
        await requireAppPinOrWriteKey(request, env);
        return await updateChangeover(changeMatch[1], request, env, cors);
      }

      const logMatch = path.match(/^\/api\/logs\/([^/]+)$/);
      if (logMatch && request.method === 'DELETE') {
        await requireAdminPin(request, env);
        return await deleteLog(logMatch[1], env, cors);
      }

      const match = path.match(/^\/api\/anomalies\/([^/]+)$/);
      if (match && request.method === 'GET') return await getAnomaly(match[1], env, cors);
      if (match && request.method === 'PATCH') {
        await requireAppPinOrWriteKey(request, env);
        return await updateAnomaly(match[1], request, env, cors);
      }
      if (match && request.method === 'DELETE') {
        await requireAppPinOrWriteKey(request, env);
        return await deleteAnomaly(match[1], env, cors);
      }

      return json({ error: 'Endpoint non trovato' }, 404, cors);
    } catch (err) {
      const status = err.status || 500;
      return json({ error: err.message || 'Errore server' }, status, cors);
    }
  }
};

const ALLOWED_ORIGINS = ['https://skf-flexchannel.github.io'];

function isAllowedOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  // Le richieste aperte direttamente nel browser o da strumenti di test possono non avere Origin.
  if (!origin) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-APP-KEY, X-APP-PIN, X-ADMIN-PIN',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data, null, 2), { status, headers });
}

async function requireAppPinOrWriteKey(request, env) {
  const legacyWriteKey = env.APP_WRITE_KEY || '';
  const userPin = env.APP_USER_PIN || '';
  const sentKey = request.headers.get('X-APP-KEY') || '';
  const sentPin = request.headers.get('X-APP-PIN') || '';

  if (legacyWriteKey && sentKey === legacyWriteKey) return;
  if (userPin && sentPin === userPin) return;

  const err = new Error(userPin ? 'PIN app non valido o mancante' : 'APP_USER_PIN non configurato nel Worker');
  err.status = 401;
  throw err;
}

async function requireAdminPin(request, env) {
  const adminPin = env.APP_ADMIN_PIN || '';
  const sentAdminPin = request.headers.get('X-ADMIN-PIN') || '';
  if (adminPin && sentAdminPin === adminPin) return;
  const err = new Error(adminPin ? 'PIN admin non valido o mancante' : 'APP_ADMIN_PIN non configurato nel Worker');
  err.status = 401;
  throw err;
}

async function readJson(request) {
  try { return await request.json(); }
  catch {
    const err = new Error('JSON non valido');
    err.status = 400;
    throw err;
  }
}

function cleanStatus(status) {
  const allowed = ['aperta', 'lavorazione', 'risolta'];
  return allowed.includes(status) ? status : 'aperta';
}
function cleanPriority(priority) {
  const allowed = ['alta', 'media', 'bassa'];
  return allowed.includes(priority) ? priority : 'media';
}
function cleanProblemType(type) {
  const allowed = ['sensore','meccanica','elettrica','robot','visione_keyence','misura','gioco_radiale','scorrevolezza','lavatrice','pesatura_grasso','sicurezza','altro'];
  return allowed.includes(type) ? type : 'altro';
}


async function ensureHiddenPointsTable(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS hidden_points (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      zone TEXT NOT NULL,
      point_id TEXT NOT NULL,
      point_label TEXT DEFAULT '',
      deleted_by TEXT DEFAULT '',
      UNIQUE(zone, point_id)
    )
  `).run();
  await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_hidden_points_zone ON hidden_points(zone)').run();
}

async function listHiddenPoints(env, cors) {
  try {
    await ensureHiddenPointsTable(env);
    const result = await env.DB.prepare('SELECT zone, point_id, point_label, created_at FROM hidden_points ORDER BY zone, point_label, point_id').all();
    return json({ items: result.results || [] }, 200, cors);
  } catch (err) {
    return json({ items: [] }, 200, cors);
  }
}

async function hideLayoutPoint(zoneRaw, pointIdRaw, request, env, cors) {
  await ensureHiddenPointsTable(env);
  let body = {};
  try { body = await request.json(); } catch (_) {}
  const zone = decodeURIComponent(String(zoneRaw || '')).slice(0, 60);
  const pointId = decodeURIComponent(String(pointIdRaw || '')).slice(0, 80);
  const pointLabel = String(body.point_label || pointId).slice(0, 120);
  if (!zone || !pointId) return json({ error: 'Zona o punto mancante' }, 400, cors);
  const item = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    zone,
    point_id: pointId,
    point_label: pointLabel,
    deleted_by: 'admin'
  };
  await env.DB.prepare(`
    INSERT OR IGNORE INTO hidden_points (id, created_at, zone, point_id, point_label, deleted_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(item.id, item.created_at, item.zone, item.point_id, item.point_label, item.deleted_by).run();
  return json({ ok: true, item }, 200, cors);
}

async function listAnomalies(request, env, cors) {
  const url = new URL(request.url);
  const where = [];
  const params = [];
  const zone = url.searchParams.get('zone');
  const point = url.searchParams.get('point_id');
  const status = url.searchParams.get('status');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '500', 10), 1), 1000);

  if (zone) { where.push('zone = ?'); params.push(zone); }
  if (point) { where.push('point_id = ?'); params.push(point); }
  if (status && status !== 'tutte') { where.push('status = ?'); params.push(status); }

  const sql = `SELECT * FROM anomalies ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY datetime(created_at) DESC LIMIT ?`;
  params.push(limit);
  const result = await env.DB.prepare(sql).bind(...params).all();
  return json({ items: result.results || [] }, 200, cors);
}

async function listLogs(request, env, cors) {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '300', 10), 1), 1000);
  try {
    const result = await env.DB.prepare(`
      SELECT
        l.id, l.anomaly_id, l.created_at, l.action, l.status, l.operator_name,
        COALESCE(l.zone, a.zone) AS zone,
        COALESCE(l.point_id, a.point_id) AS point_id,
        COALESCE(l.point_label, a.point_label) AS point_label,
        COALESCE(l.title, a.title) AS title,
        COALESCE(l.problem_type, a.problem_type) AS problem_type
      FROM anomaly_log l
      LEFT JOIN anomalies a ON a.id = l.anomaly_id
      ORDER BY datetime(l.created_at) DESC
      LIMIT ?
    `).bind(limit).all();
    return json({ items: result.results || [] }, 200, cors);
  } catch (_) {
    const result = await env.DB.prepare(`
      SELECT
        l.id, l.anomaly_id, l.created_at, l.action, l.status, l.operator_name,
        a.zone, a.point_id, a.point_label, a.title, a.problem_type
      FROM anomaly_log l
      LEFT JOIN anomalies a ON a.id = l.anomaly_id
      ORDER BY datetime(l.created_at) DESC
      LIMIT ?
    `).bind(limit).all();
    return json({ items: result.results || [] }, 200, cors);
  }
}

async function getAnomaly(id, env, cors) {
  const item = await env.DB.prepare('SELECT * FROM anomalies WHERE id = ?').bind(id).first();
  if (!item) return json({ error: 'Anomalia non trovata' }, 404, cors);
  return json({ item }, 200, cors);
}

async function createAnomaly(request, env, cors) {
  const body = await readJson(request);
  if (!body.zone || !body.point_id || !body.title || !body.description) {
    return json({ error: 'Campi obbligatori mancanti: zone, point_id, title, description' }, 400, cors);
  }
  const now = new Date().toISOString();
  const item = {
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
    zone: String(body.zone).slice(0, 60),
    point_id: String(body.point_id).slice(0, 80),
    point_label: String(body.point_label || body.point_id).slice(0, 120),
    title: String(body.title).slice(0, 180),
    problem_type: cleanProblemType(body.problem_type || 'altro'),
    description: String(body.description).slice(0, 4000),
    action: String(body.action || '').slice(0, 4000),
    shift: String(body.shift || '').slice(0, 40),
    priority: cleanPriority(body.priority),
    status: cleanStatus(body.status),
    operator_name: String(body.operator_name || '').slice(0, 120),
    source_device: String(body.source_device || '').slice(0, 240),
    closed_at: null
  };

  try {
    await env.DB.prepare(`
      INSERT INTO anomalies (id, created_at, updated_at, zone, point_id, point_label, title, problem_type, description, action, shift, priority, status, operator_name, source_device, closed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(item.id, item.created_at, item.updated_at, item.zone, item.point_id, item.point_label, item.title, item.problem_type, item.description, item.action, item.shift, item.priority, item.status, item.operator_name, item.source_device, item.closed_at).run();
  } catch (err) {
    await env.DB.prepare(`
      INSERT INTO anomalies (id, created_at, updated_at, zone, point_id, point_label, title, description, action, shift, priority, status, operator_name, source_device, closed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(item.id, item.created_at, item.updated_at, item.zone, item.point_id, item.point_label, item.title, item.description, item.action, item.shift, item.priority, item.status, item.operator_name, item.source_device, item.closed_at).run();
  }

  await logEvent(env, item, 'create', item.status, item.operator_name);
  return json({ item }, 201, cors);
}

async function updateAnomaly(id, request, env, cors) {
  const existing = await env.DB.prepare('SELECT * FROM anomalies WHERE id = ?').bind(id).first();
  if (!existing) return json({ error: 'Anomalia non trovata' }, 404, cors);
  const body = await readJson(request);
  const now = new Date().toISOString();
  const status = body.status ? cleanStatus(body.status) : existing.status;
  const item = {
    ...existing,
    updated_at: now,
    title: body.title !== undefined ? String(body.title).slice(0, 180) : existing.title,
    problem_type: body.problem_type !== undefined ? cleanProblemType(body.problem_type) : (existing.problem_type || 'altro'),
    description: body.description !== undefined ? String(body.description).slice(0, 4000) : existing.description,
    action: body.action !== undefined ? String(body.action).slice(0, 4000) : existing.action,
    shift: body.shift !== undefined ? String(body.shift).slice(0, 40) : existing.shift,
    priority: body.priority !== undefined ? cleanPriority(body.priority) : existing.priority,
    status,
    operator_name: body.operator_name !== undefined ? String(body.operator_name).slice(0, 120) : existing.operator_name,
    closed_at: status === 'risolta' && existing.status !== 'risolta' ? now : (status !== 'risolta' ? null : existing.closed_at)
  };

  try {
    await env.DB.prepare(`
      UPDATE anomalies SET updated_at=?, title=?, problem_type=?, description=?, action=?, shift=?, priority=?, status=?, operator_name=?, closed_at=? WHERE id=?
    `).bind(item.updated_at, item.title, item.problem_type, item.description, item.action, item.shift, item.priority, item.status, item.operator_name, item.closed_at, id).run();
  } catch (_) {
    await env.DB.prepare(`
      UPDATE anomalies SET updated_at=?, title=?, description=?, action=?, shift=?, priority=?, status=?, operator_name=?, closed_at=? WHERE id=?
    `).bind(item.updated_at, item.title, item.description, item.action, item.shift, item.priority, item.status, item.operator_name, item.closed_at, id).run();
  }

  await logEvent(env, item, existing.status !== item.status ? `status:${existing.status}->${item.status}` : 'update', item.status, item.operator_name);
  return json({ item }, 200, cors);
}

async function deleteAnomaly(id, env, cors) {
  const existing = await env.DB.prepare('SELECT * FROM anomalies WHERE id = ?').bind(id).first();
  if (!existing) return json({ error: 'Anomalia non trovata' }, 404, cors);
  await logEvent(env, existing, 'delete', existing.status || '', existing.operator_name || '');
  await env.DB.prepare('DELETE FROM anomalies WHERE id = ?').bind(id).run();
  return json({ ok: true }, 200, cors);
}

async function deleteLog(id, env, cors) {
  const existing = await env.DB.prepare('SELECT id FROM anomaly_log WHERE id = ?').bind(id).first();
  if (!existing) return json({ error: 'Riga storico non trovata' }, 404, cors);
  await env.DB.prepare('DELETE FROM anomaly_log WHERE id = ?').bind(id).run();
  return json({ ok: true, deleted_id: id }, 200, cors);
}

async function getStats(env, cors) {
  const rows = await env.DB.prepare('SELECT zone, status, COUNT(*) AS total FROM anomalies GROUP BY zone, status ORDER BY zone, status').all();
  return json({ items: rows.results || [] }, 200, cors);
}

async function logEvent(env, anomaly, action, status, operatorName) {
  try {
    await env.DB.prepare(`
      INSERT INTO anomaly_log (id, anomaly_id, created_at, action, status, operator_name, zone, point_id, point_label, title, problem_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(), anomaly.id, new Date().toISOString(), action, status || '', operatorName || '',
      anomaly.zone || '', anomaly.point_id || '', anomaly.point_label || '', anomaly.title || '', anomaly.problem_type || ''
    ).run();
  } catch (_) {
    try {
      await env.DB.prepare(`INSERT INTO anomaly_log (id, anomaly_id, created_at, action, status, operator_name) VALUES (?, ?, ?, ?, ?, ?)`).bind(
        crypto.randomUUID(), anomaly.id, new Date().toISOString(), action, status || '', operatorName || ''
      ).run();
    } catch (_) {}
  }
}


function cleanChangeoverStatus(status) {
  const allowed = ['attivo', 'completato', 'annullato'];
  return allowed.includes(status) ? status : 'attivo';
}
function cleanChangePointPhase(phase) {
  return phase === 'in' ? 'in' : 'out';
}
function cleanChangePointStatus(status) {
  const allowed = ['todo', 'progress', 'done', 'check'];
  return allowed.includes(status) ? status : 'todo';
}

async function listChangeovers(request, env, cors) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '100', 10), 1), 500);
  const where = [];
  const params = [];
  if (status && status !== 'tutti') { where.push('status = ?'); params.push(cleanChangeoverStatus(status)); }
  const sql = `SELECT * FROM changeovers ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY datetime(updated_at) DESC LIMIT ?`;
  params.push(limit);
  const result = await env.DB.prepare(sql).bind(...params).all();
  return json({ items: result.results || [] }, 200, cors);
}

async function getChangeover(id, env, cors) {
  const item = await env.DB.prepare('SELECT * FROM changeovers WHERE id = ?').bind(id).first();
  if (!item) return json({ error: 'Cambio tipologia non trovato' }, 404, cors);
  return json({ item }, 200, cors);
}

async function createChangeover(request, env, cors) {
  const body = await readJson(request);
  if (!body.zone || !body.old_type || !body.new_type) {
    return json({ error: 'Campi obbligatori mancanti: zone, old_type, new_type' }, 400, cors);
  }
  const now = new Date().toISOString();
  const item = {
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
    zone: String(body.zone).slice(0, 60),
    old_type: String(body.old_type).slice(0, 120),
    new_type: String(body.new_type).slice(0, 120),
    status: cleanChangeoverStatus(body.status || 'attivo'),
    operator_name: String(body.operator_name || '').slice(0, 120),
    notes: String(body.notes || '').slice(0, 4000)
  };

  await env.DB.prepare(`
    INSERT INTO changeovers (id, created_at, updated_at, zone, old_type, new_type, status, operator_name, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(item.id, item.created_at, item.updated_at, item.zone, item.old_type, item.new_type, item.status, item.operator_name, item.notes).run();

  const points = Array.isArray(body.points) ? body.points.slice(0, 120) : [];
  const inserted = [];
  for (const pt of points) {
    const pointId = String(pt.id || '').slice(0, 80);
    if (!pointId) continue;
    const pointLabel = String(pt.label || pt.id || '').slice(0, 120);
    for (const phase of ['out', 'in']) {
      const row = {
        id: crypto.randomUUID(), changeover_id: item.id, created_at: now, updated_at: now,
        zone: item.zone, point_id: pointId, point_label: pointLabel, phase, status: 'todo', comment: '', operator_name: ''
      };
      await env.DB.prepare(`
        INSERT INTO changeover_points (id, changeover_id, created_at, updated_at, zone, point_id, point_label, phase, status, comment, operator_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(row.id, row.changeover_id, row.created_at, row.updated_at, row.zone, row.point_id, row.point_label, row.phase, row.status, row.comment, row.operator_name).run();
      inserted.push(row);
    }
  }
  await logChangeoverEvent(env, item, 'create', item.operator_name);
  return json({ item, points: inserted }, 201, cors);
}

async function updateChangeover(id, request, env, cors) {
  const existing = await env.DB.prepare('SELECT * FROM changeovers WHERE id = ?').bind(id).first();
  if (!existing) return json({ error: 'Cambio tipologia non trovato' }, 404, cors);
  const body = await readJson(request);
  const now = new Date().toISOString();
  const item = {
    ...existing,
    updated_at: now,
    old_type: body.old_type !== undefined ? String(body.old_type).slice(0, 120) : existing.old_type,
    new_type: body.new_type !== undefined ? String(body.new_type).slice(0, 120) : existing.new_type,
    status: body.status !== undefined ? cleanChangeoverStatus(body.status) : existing.status,
    operator_name: body.operator_name !== undefined ? String(body.operator_name).slice(0, 120) : existing.operator_name,
    notes: body.notes !== undefined ? String(body.notes).slice(0, 4000) : existing.notes
  };
  await env.DB.prepare(`
    UPDATE changeovers SET updated_at=?, old_type=?, new_type=?, status=?, operator_name=?, notes=? WHERE id=?
  `).bind(item.updated_at, item.old_type, item.new_type, item.status, item.operator_name, item.notes, id).run();
  await logChangeoverEvent(env, item, existing.status !== item.status ? `status:${existing.status}->${item.status}` : 'update', item.operator_name || '');
  return json({ item }, 200, cors);
}

async function listChangeoverPoints(changeoverId, request, env, cors) {
  const url = new URL(request.url);
  const phase = url.searchParams.get('phase');
  const where = ['changeover_id = ?'];
  const params = [changeoverId];
  if (phase) { where.push('phase = ?'); params.push(cleanChangePointPhase(phase)); }
  const result = await env.DB.prepare(`
    SELECT * FROM changeover_points WHERE ${where.join(' AND ')} ORDER BY point_label ASC, phase ASC
  `).bind(...params).all();
  return json({ items: result.results || [] }, 200, cors);
}

async function updateChangeoverPoint(changeoverId, pointId, request, env, cors) {
  const change = await env.DB.prepare('SELECT * FROM changeovers WHERE id = ?').bind(changeoverId).first();
  if (!change) return json({ error: 'Cambio tipologia non trovato' }, 404, cors);
  const body = await readJson(request);
  const phase = cleanChangePointPhase(body.phase || new URL(request.url).searchParams.get('phase') || 'out');
  const now = new Date().toISOString();
  const existing = await env.DB.prepare('SELECT * FROM changeover_points WHERE changeover_id = ? AND point_id = ? AND phase = ?').bind(changeoverId, pointId, phase).first();
  const item = {
    id: existing?.id || crypto.randomUUID(),
    changeover_id: changeoverId,
    created_at: existing?.created_at || now,
    updated_at: now,
    zone: String(body.zone || change.zone || '').slice(0, 60),
    point_id: String(body.point_id || pointId).slice(0, 80),
    point_label: String(body.point_label || existing?.point_label || pointId).slice(0, 120),
    phase,
    status: cleanChangePointStatus(body.status || existing?.status || 'todo'),
    comment: String(body.comment || '').slice(0, 4000),
    operator_name: String(body.operator_name || '').slice(0, 120)
  };
  if (existing) {
    await env.DB.prepare(`
      UPDATE changeover_points SET updated_at=?, zone=?, point_label=?, status=?, comment=?, operator_name=? WHERE id=?
    `).bind(item.updated_at, item.zone, item.point_label, item.status, item.comment, item.operator_name, item.id).run();
  } else {
    await env.DB.prepare(`
      INSERT INTO changeover_points (id, changeover_id, created_at, updated_at, zone, point_id, point_label, phase, status, comment, operator_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(item.id, item.changeover_id, item.created_at, item.updated_at, item.zone, item.point_id, item.point_label, item.phase, item.status, item.comment, item.operator_name).run();
  }
  await env.DB.prepare('UPDATE changeovers SET updated_at = ? WHERE id = ?').bind(now, changeoverId).run();
  await logChangeoverEvent(env, {...change, zone:item.zone, point_id:item.point_id, point_label:item.point_label, phase:item.phase, status:item.status}, `point:${phase}:${item.status}`, item.operator_name);
  return json({ item }, 200, cors);
}

async function logChangeoverEvent(env, change, action, operatorName) {
  try {
    await env.DB.prepare(`
      INSERT INTO changeover_log (id, changeover_id, created_at, action, zone, point_id, point_label, phase, status, operator_name, old_type, new_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(), change.id, new Date().toISOString(), action,
      change.zone || '', change.point_id || '', change.point_label || '', change.phase || '', change.status || '', operatorName || '', change.old_type || '', change.new_type || ''
    ).run();
  } catch (_) {}
}
