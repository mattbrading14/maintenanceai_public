const PROJECT = {
  name: 'maintenanceai_public',
  url: 'https://muascqnlwwijmifsqdic.supabase.co',
  path: '/rest/v1/user_data?sync_key=eq.__maintenanceai_keepalive__&select=updated_at&limit=1',
  key: 'sb_publishable_2lHUemABajaLRmsE221E4Q_lyegGjkO'
};

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(`${PROJECT.url}${PROJECT.path}`, {
      headers: {
        apikey: PROJECT.key,
        Authorization: `Bearer ${PROJECT.key}`
      }
    });
    const text = await response.text();

    res.status(response.ok ? 200 : 502).json({
      ok: response.ok,
      checkedAt: new Date().toISOString(),
      result: {
        name: PROJECT.name,
        status: response.status,
        detail: response.ok ? undefined : text.slice(0, 300)
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, detail: error.message });
  }
};
