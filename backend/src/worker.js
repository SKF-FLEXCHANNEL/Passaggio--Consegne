export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    try {
      const url = new URL(request.url);
      const path = url.pathname.replace(/\/+$/, '') || '/';

      if (path === '/' || path === '/api/health') {
        return json({ status: 'online', app: 'passaggio-consegne-api', time: new Date().toISOString() }, 200, cors);
      }

      if (!env.DB) return json({ error: 'D1 binding DB mancante. Controlla wrangler.toml.' }, 500, cors);

      if (path === '/api/stats' && request.method === 'GET') return await getStats(env, cors);
      if (path === '/api/anomalies' && request.method === 'GET') return await listAnomalies(request, env, cors);
      if (path === '/api/anomalies' && request.method === 'POST') {
        await requireWriteKey(request, env);
        return await createAnomaly(request, env, cors);
      }

      const match = path.match(/^\/api\/anomalies\/([^/]+)$/);
      if (match && request.method === 'GET') return await getAnomaly(match[1], env, cors);
      if (match && request.method === 'PATCH') {
        await requireWriteKey(request, env);
        return await updateAnomaly(match[1], request, env, cors);
      }
      if (match && request.method === 'DELETE') {
        await requireWriteKey(request, env);
        return await deleteAnomaly(match[1], env, cors);
      }

      return json({ error: 'Endpoint non trovato' }, 404, cors);
    } catch (err) {
      const status = err.status || 500;
      return json({ error: err.message || 'Errore server' }, status, cors);
    }
  }
};

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowedRaw = env.ALLOWED_ORIGIN || '*';
  const allowed = allowedRaw.split(',').map(s => s.trim()).filter(Boolean);
  const allowOrigin = allowed.includes('*') ? '*' : (allowed.includes(origin) ? origin : allowed[0] || '*');
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-APP-KEY',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data, null, 2), { status, headers });
}

async function requireWriteKey(request, env) {
  if (!env.APP_WRITE_KEY) return;
  const key = request.headers.get('X-APP-KEY') || '';
  if (key !== env.APP_WRITE_KEY) {
    const err = new Error('Chiave APP_WRITE_KEY non valida o mancante');
    err.status = 401;
    throw err;
  }
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
    description: String(body.description).slice(0, 4000),
    action: String(body.action || '').slice(0, 4000),
    shift: String(body.shift || '').slice(0, 40),
    priority: cleanPriority(body.priority),
    status: cleanStatus(body.status),
    operator_name: String(body.operator_name || '').slice(0, 120),
    source_device: String(body.source_device || '').slice(0, 240),
    closed_at: null
  };

  await env.DB.prepare(`
    INSERT INTO anomalies (id, created_at, updated_at, zone, point_id, point_label, title, description, action, shift, priority, status, operator_name, source_device, closed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(item.id, item.created_at, item.updated_at, item.zone, item.point_id, item.point_label, item.title, item.description, item.action, item.shift, item.priority, item.status, item.operator_name, item.source_device, item.closed_at).run();

  await logEvent(env, item.id, 'create', item.status, item.operator_name);
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
    description: body.description !== undefined ? String(body.description).slice(0, 4000) : existing.description,
    action: body.action !== undefined ? String(body.action).slice(0, 4000) : existing.action,
    shift: body.shift !== undefined ? String(body.shift).slice(0, 40) : existing.shift,
    priority: body.priority !== undefined ? cleanPriority(body.priority) : existing.priority,
    status,
    operator_name: body.operator_name !== undefined ? String(body.operator_name).slice(0, 120) : existing.operator_name,
    closed_at: status === 'risolta' && existing.status !== 'risolta' ? now : (status !== 'risolta' ? null : existing.closed_at)
  };

  await env.DB.prepare(`
    UPDATE anomalies SET updated_at=?, title=?, description=?, action=?, shift=?, priority=?, status=?, operator_name=?, closed_at=? WHERE id=?
  `).bind(item.updated_at, item.title, item.description, item.action, item.shift, item.priority, item.status, item.operator_name, item.closed_at, id).run();

  await logEvent(env, id, 'update', item.status, item.operator_name);
  return json({ item }, 200, cors);
}

async function deleteAnomaly(id, env, cors) {
  const existing = await env.DB.prepare('SELECT id FROM anomalies WHERE id = ?').bind(id).first();
  if (!existing) return json({ error: 'Anomalia non trovata' }, 404, cors);
  await logEvent(env, id, 'delete', '', '');
  await env.DB.prepare('DELETE FROM anomalies WHERE id = ?').bind(id).run();
  return json({ ok: true }, 200, cors);
}

async function getStats(env, cors) {
  const rows = await env.DB.prepare('SELECT zone, status, COUNT(*) AS total FROM anomalies GROUP BY zone, status ORDER BY zone, status').all();
  return json({ items: rows.results || [] }, 200, cors);
}

async function logEvent(env, anomalyId, action, status, operatorName) {
  try {
    await env.DB.prepare(`INSERT INTO anomaly_log (id, anomaly_id, created_at, action, status, operator_name) VALUES (?, ?, ?, ?, ?, ?)`).bind(
      crypto.randomUUID(), anomalyId, new Date().toISOString(), action, status || '', operatorName || ''
    ).run();
  } catch (_) {}
}
