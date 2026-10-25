// Live counts: GitHub stars and Discord members are read at view time, never written into the copy.
// Mark an element with data-gh="owner/repo" (stars) or data-discord="members|online"; hydrate(root) fills it.

export const DISCORD = { invite: 'https://discord.gg/8cW7Wfxnpu', code: '8cW7Wfxnpu' };

const TTL = 60 * 60 * 1000;
const fmt = n => Number(n).toLocaleString('ko-KR');

function cached(key, load) {
  try {
    const hit = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (hit && Date.now() - hit.at < TTL) return Promise.resolve(hit.value);
  } catch { /* storage unavailable: fall through to the network */ }
  return load().then(value => {
    try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), value })); } catch { /* ignore quota */ }
    return value;
  });
}

// Every public repository the site mentions, fetched in one search call so each page shares the result.
const ALL_REPOS = ['Q00/ouroboros', 'Q00/argus', 'Q00/OpenWarden', 'Q00/rlm-forge', 'Q00/contractplane', 'Q00/meshkit', 'Q00/Symposium', 'Q00/ai-agent-engineering-101', 'Q00/loop-engineering-labs', 'sergiobuilds/flashpatch'];

let starsRequest = null;
function stars(repos) {
  const wanted = [...new Set([...ALL_REPOS.map(r => r.toLowerCase()), ...repos])].sort();
  const key = 'ol-stars:' + wanted.join(',');
  starsRequest ??= cached(key, async () => {
    const q = wanted.map(r => 'repo:' + r).join(' ');
    const res = await fetch('https://api.github.com/search/repositories?per_page=100&q=' + encodeURIComponent(q));
    if (!res.ok) throw new Error('github ' + res.status);
    const body = await res.json();
    return Object.fromEntries(body.items.map(item => [item.full_name.toLowerCase(), item.stargazers_count]));
  });
  return starsRequest;
}

let discordRequest = null;
function discord() {
  discordRequest ??= cached('ol-discord', async () => {
    const res = await fetch('https://discord.com/api/v10/invites/' + DISCORD.code + '?with_counts=true');
    if (!res.ok) throw new Error('discord ' + res.status);
    const body = await res.json();
    return { members: body.approximate_member_count, online: body.approximate_presence_count };
  });
  return discordRequest;
}

let contribRequest = null;
function contributors(repo) {
  contribRequest ??= cached('ol-contrib:' + repo, async () => {
    const res = await fetch('https://api.github.com/repos/' + repo + '/contributors?per_page=100');
    if (!res.ok) throw new Error('github ' + res.status);
    const body = await res.json();
    return body.filter(c => c.type === 'User' && !/\[bot\]$/.test(c.login)).map(c => ({ login: c.login, avatar: c.avatar_url, url: c.html_url, n: c.contributions }));
  });
  return contribRequest;
}

const esc = v => String(v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

export function hydrate(root = document) {
  root.querySelectorAll('[data-gh-contributors]').forEach(node => {
    const skip = new Set((node.dataset.exclude ?? '').toLowerCase().split(',').filter(Boolean));
    const limit = Number(node.dataset.limit ?? 40);
    contributors(node.dataset.ghContributors)
      .then(list => {
        node.innerHTML = list.filter(c => !skip.has(c.login.toLowerCase())).slice(0, limit).map(c => '<a class="contrib" href="' + esc(c.url) + '" target="_blank" rel="noopener"><img src="' + esc(c.avatar) + '&s=160" alt="" loading="lazy" width="80" height="80"><b>' + esc(c.login) + '</b><small>커밋 ' + fmt(c.n) + '</small></a>').join('');
        node.classList.add('is-live');
      })
      .catch(() => { contribRequest = null; });
  });
  const ghNodes = [...root.querySelectorAll('[data-gh]')];
  if (ghNodes.length) {
    stars(ghNodes.map(n => n.dataset.gh.toLowerCase()))
      .then(map => ghNodes.forEach(n => {
        const v = map[n.dataset.gh.toLowerCase()];
        if (v == null) return;
        n.textContent = (n.dataset.prefix ?? '') + fmt(v) + (n.dataset.suffix ?? '');
        n.classList.add('is-live');
      }))
      .catch(() => { starsRequest = null; });
  }
  const dcNodes = [...root.querySelectorAll('[data-discord]')];
  if (dcNodes.length) {
    discord()
      .then(c => dcNodes.forEach(n => {
        const v = c[n.dataset.discord];
        if (v == null) return;
        n.textContent = (n.dataset.prefix ?? '') + fmt(v) + (n.dataset.suffix ?? '');
        n.classList.add('is-live');
      }))
      .catch(() => { discordRequest = null; });
  }
}

// Helpers for templates: an empty span that hydrate() fills.
export const ghStars = (repo, { prefix = '', suffix = '' } = {}) => '<span class="live" data-gh="' + repo + '" data-prefix="' + prefix + '" data-suffix="' + suffix + '"></span>';
export const discordCount = (field = 'members', { prefix = '', suffix = '' } = {}) => '<span class="live" data-discord="' + field + '" data-prefix="' + prefix + '" data-suffix="' + suffix + '"></span>';

