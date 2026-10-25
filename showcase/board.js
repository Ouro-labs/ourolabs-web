import { PAGES } from '../content.js';
import { link, esc, html } from '../render.js';
import { EVENTS, NEWS, BOARD } from '../board.js';
import { DOC_IMG } from '../data.js';

const pathOf = (type, item) => '/' + type + '/' + item.slug;
export const hrefOf = (type, item) => '#' + pathOf(type, item);
const sortKey = d => d.replace(/\./g, '').padEnd(8, '0');
const docOf = src => DOC_IMG[(src.match(/img\/([^/]+)\.jpg$/) ?? [])[1]];
const img = (src, alt = '', eager = false) => '<img src="assets/' + src + '" alt="' + esc(alt) + '" decoding="async"' + (eager ? '' : ' loading="lazy"') + (docOf(src) ? ' class="is-doc" style="--paper:' + docOf(src) + '"' : '') + '>';

for (const e of EVENTS) PAGES[pathOf('event', e)] = { title: e.title, blocks: [], board: 'event' };
for (const n of NEWS) PAGES[pathOf('news', n)] = { title: n.title, blocks: [], board: 'news' };

// Everything (past events + news), newest first, each linking inside the site.
export function feed() {
  return [
    ...EVENTS.filter(e => !e.upcoming).map(e => ({ ...e, type: 'event', kind: BOARD.eventsTitle })),
    ...NEWS.map(n => ({ ...n, type: 'news' }))
  ].sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));
}

export function tile(item, i = 1) {
  const poster = /luma-/.test(item.image);
  return '<a class="tile' + (i === 0 ? ' is-wide' : '') + (poster ? ' tile--poster' : '') + '" href="' + hrefOf(item.type, item) + '"' + (poster ? ' style="--poster:url(' + new URL('assets/' + item.image, document.baseURI).href + ')"' : '') + '><figure>' + img(item.image, item.title, i < 3) + '<figcaption><span>' + esc(item.date) + ' · ' + esc(item.kind) + '</span><b>' + esc(item.title) + '</b></figcaption></figure></a>';
}

// The record page: every event (upcoming first) and every news item, newest first, with thumbnails.
export function newsRows() {
  const upcoming = EVENTS.filter(e => e.upcoming).map(e => ({ ...e, type: 'event', kind: BOARD.eventsTitle + ' · ' + BOARD.upcoming }));
  const items = [...upcoming, ...feed()];
  const row = it => {
    const poster = /luma-/.test(it.image);
    return '<a class="brow brow--thumb" data-t="' + it.type + '" href="' + hrefOf(it.type, it) + '"><span class="brow__img' + (poster ? ' is-poster' : '') + '">' + img(it.image, it.title) + '</span><span class="brow__date">' + esc(it.date) + '</span><span class="brow__kind">' + esc(it.kind) + '</span><span class="brow__main"><b>' + esc(it.title) + '</b><small>' + esc(it.summary) + '</small></span></a>';
  };
  const count = t => items.filter(i => !t || i.type === t).length;
  const tabs = [['all', '전체', count()], ['event', BOARD.eventsTitle, count('event')], ['news', BOARD.newsTitle, count('news')]];
  // '#/news@event' (from the community's past events) opens with the 행사 tab selected.
  const want = (location.hash.split('@')[1] ?? 'all');
  const pick = tabs.some(([k]) => k === want) ? want : 'all';
  return '<div class="board-filter" id="records"><span id="event" class="board-anchor"></span>' + tabs.map(([k, l, n]) => '<input type="radio" name="bf" id="bf-' + k + '"' + (k === pick ? ' checked' : '') + '><label for="bf-' + k + '">' + esc(l) + ' <span>' + n + '</span></label>').join('') + '<div class="board">' + items.map(row).join('') + '</div></div>';
}

function detail(route) {
  const type = PAGES[route].board;
  const list = type === 'event' ? EVENTS : NEWS;
  const it = list.find(x => pathOf(type, x) === route);
  const L = BOARD.labels;
  const facts = type === 'event'
    ? [[L.date, it.date + (it.time ? ' ' + it.time : '')], [L.place, it.place], [L.address, it.address], [L.attendees, it.attendees], [L.partners, (it.partners || []).join(', ')]]
    : [[L.date, it.date], [L.kind, it.kind]];
  const factHtml = facts.filter(f => f[1]).map(f => '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>').join('');
  const back = type === 'event' ? '#/news@event' : '#/news';
  const program = it.program ? '<h2 class="h3">' + esc(L.program) + '</h2><ol class="bd__program">' + it.program.map(p => '<li>' + esc(p) + '</li>').join('') + '</ol>' : '';
  const gallery = it.gallery ? '<div class="bd__gallery">' + it.gallery.map(g => '<figure>' + img(g) + '</figure>').join('') + '</div>' : '';
  const sources = (it.sources || []).length ? '<p class="bd__sources"><span>' + esc(BOARD.sourcesTitle) + '</span>' + it.sources.map(s => '<a href="' + esc(s.href) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>').join('') + '</p>' : '';
  return '<article class="bd"><div class="wrap bd__wrap"><a class="bd__back" href="' + back + '">← ' + esc(BOARD.back) + '</a><p class="kicker">' + esc(type === 'event' ? BOARD.eventsTitle + (it.upcoming ? ' · ' + BOARD.upcoming : '') : BOARD.newsTitle + ' · ' + it.kind) + '</p><h1 tabindex="-1">' + esc(it.title) + '</h1><p class="lead">' + esc(it.summary) + '</p><dl class="bd__facts">' + factHtml + '</dl><figure class="bd__cover">' + img(it.image, it.title, true) + '</figure><div class="bd__body">' + it.body.map(p => '<p>' + esc(p) + '</p>').join('') + program + gallery + sources + '</div></div></article>';
}

const hooks = {};
for (const route of Object.keys(PAGES)) if (PAGES[route].board) hooks[route] = { page: detail };
hooks['/news'] = { variant: { 0: () => newsRows() } };
export const HOOKS = hooks;


// Same-page jumps (already on /news) still switch the filter tab.
window.addEventListener('hashchange', () => {
  const m = location.hash.match(/^#\/news@(all|event|news)$/);
  const input = m && document.getElementById('bf-' + m[1]);
  if (input) input.checked = true;
});
