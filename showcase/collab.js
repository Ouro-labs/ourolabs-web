import { PAGES } from '../content.js';
import { HERO_IMG } from '../data.js';
import { STRINGS } from '../overlay.js';
import { esc, html, link } from '../render.js';

const routes = ['/collaboration', '/business', '/global'];
const heroImages = {
  '/collaboration': HERO_IMG['/collaboration'],
  '/business': HERO_IMG['/business'],
  '/global': HERO_IMG['/global']
};
const glyphs = {
  advisory: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M8 11h6M11 8v6"/>',
  joint: '<path d="M9 3h6m-5 0v7l-6 9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2l-6-9V3M8 15h8"/>',
  sustained: '<path d="M3 11a9 9 0 0 1 15-6l3 3M21 3v5h-5M21 13a9 9 0 0 1-15 6l-3-3M3 21v-5h5"/>',
  codev: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 22"/>',
  public: '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>'
};
const icon = name => `<svg class="collab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name]}</svg>`;
const pill = (route, key) => !STRINGS.pill.plan ? '' : `<span class="status status--plan" data-status-key="${esc(route.slice(1) + '-' + key)}"><i aria-hidden="true"></i>${html(route, STRINGS.pill.plan)}</span>`;

function hero(route, page) {
  return `<section class="hero lhero collab-hero"><div class="field"></div><div class="wrap"><div class="collab-hero__meta">${page.eyebrow ? `<span class="kicker">${html(route, page.eyebrow)}</span>` : ''}${pill(route, 'overview')}</div><div class="lhero__in"><h1 tabindex="-1">${html(route, page.title)}</h1>${page.lead ? `<p>${html(route, page.lead)}</p>` : ''}</div><div class="lhero__imgs" aria-hidden="true">${heroImages[route].map(name => `<figure><img src="assets/img/${esc(name)}.jpg" alt="" decoding="async" width="1440" height="1080"></figure>`).join('')}</div></div></section>`;
}

function heading(route, block, index) {
  const glyph = route === '/collaboration' && glyphs[block.id] ? icon(block.id) : '';
  return `<div class="collab-heading">${glyph}<h2 class="h2" tabindex="-1">${html(route, block.text)}</h2>${pill(route, block.id ?? `section-${index}`)}</div>`;
}

function advisoryRows(route, block) {
  return `<div class="rows collab-rows">${block.items.map(([title, body], index) => `<div class="row"><div class="row__t">${icon(index === 0 ? 'advisory' : 'sustained')}<span>${html(route, title)}</span></div><p>${html(route, body)}</p></div>`).join('')}</div>`;
}

function businessCards(route, block) {
  return `<div class="pillars collab-cards">${block.items.map((item, index) => `<article class="pillar">${icon(['joint', 'codev', 'sustained'][index % 3])}<h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p>${item.link ? link(route, item.link) : ''}</article>`).join('')}</div>`;
}

export const HOOKS = Object.fromEntries(routes.map(route => [route, {
  hero,
  variant: Object.fromEntries(PAGES[route].blocks.flatMap((block, index) => {
    if (block.t === 'h') return [[index, heading]];
    if (route === '/collaboration' && block.t === 'kv') return [[index, advisoryRows]];
    if (route === '/business' && block.t === 'cards') return [[index, businessCards]];
    return [];
  }))
}]));
