import { ghStars, discordCount, DISCORD } from '../live.js';
import { link, esc, pad } from '../render.js';
import { PAGES } from '../content.js';
import { COMMUNITY_PAGE, COMMUNITY, COMMUNITY_MORE as M, LUMA } from '../activity.js';
import { EVENTS, BOARD } from '../board.js';
import { tile } from './board.js';

PAGES['/community'] = COMMUNITY_PAGE;

const scene = (name, alt = '', eager = false) => '<img src="assets/scenes/' + name + '.jpg" alt="' + esc(alt) + '" decoding="async"' + (eager ? '' : ' loading="lazy"') + '>';
const ext = href => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
const arrow = '<svg class="arr" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5"/></svg>';

function hero(route) {
  const n = M.arc.length;
  const arc = M.arc.map((name, i) => { const o = i - (n - 1) / 2; return '<div class="arc__i" style="transform:rotateY(' + (-o * 13) + 'deg) translateZ(' + (Math.abs(o) * 24) + 'px)">' + scene(name, '', true) + '</div>'; }).join('');
  return '<section class="hero chero comm-hero2"><div class="wrap"><div class="kicker">' + esc(COMMUNITY_PAGE.eyebrow) + '</div><h1 tabindex="-1">' + esc(M.heroTitle) + '</h1><p class="lead">' + esc(M.heroLead) + '</p>' + link(route, { label: COMMUNITY.subscribe, href: LUMA.calendar }) + '</div><div class="arc comm-arc" aria-hidden="true"><div class="arc__row">' + arc + '</div></div></section>';
}

const partners = () => '<section class="comm-partners"><div class="wrap"><span>' + esc(M.partnersTitle) + '</span><ul>' + M.partners.map(p => '<li><img src="assets/logos/' + p.logo + '" alt="' + esc(p.name) + '" loading="lazy"></li>').join('') + '</ul></div></section>';

const pastEvents = () => EVENTS.filter(e => !e.upcoming);
const attendeeTotal = () => pastEvents().reduce((sum, e) => sum + (parseInt(String(e.attendees ?? '').replace(/[^0-9]/g, ''), 10) || 0), 0);

const stats = () => '<section class="sec rv"><div class="wrap"><h2 class="h2">' + esc(COMMUNITY.statsTitle) + '</h2><div class="comm-stats">' + COMMUNITY.stats.map(s => '<div class="comm-stat"><b>' + (s.live === 'events' ? pastEvents().length + '회' : s.live === 'attendees' ? attendeeTotal().toLocaleString('ko-KR') + '명' : s.live === 'gh' ? ghStars('Q00/ouroboros') : s.live === 'discord' ? discordCount('members', { suffix: '명' }) : esc(s.num)) + '</b><span>' + esc(s.label) + '</span><small>' + esc(s.note) + '</small></div>').join('') + '</div></div></section>';

function events(route) {
  const items = M.events.map((e, i) => '<button type="button" class="aitem' + (i ? '' : ' is-active') + '" aria-pressed="' + (i === 0) + '"><span class="aitem__h"><span class="aitem__n">' + pad(i + 1) + '</span><span class="aitem__t">' + esc(e.name) + '</span></span><p>' + esc(e.body) + '</p></button>').join('');
  const imgs = M.events.map((e, i) => '<img src="assets/scenes/' + e.img + '.jpg" alt="" loading="lazy" class="' + [i ? '' : 'on', e.fit ? 'is-fit' : ''].join(' ').trim() + '">').join('');
  return '<section class="sec rv" id="events"><div class="wrap"><div class="sec-head"><h2 class="h2">' + esc(M.eventsTitle) + '</h2>' + link(route, { label: M.eventsMore, href: LUMA.calendar }) + '</div><div class="alist" data-alist><div class="alist__items">' + items + '</div><div class="alist__vis" aria-hidden="true"><div class="alist__img">' + imgs + '</div><div class="alist__count"><b>01</b> / ' + pad(M.events.length) + '</div></div></div></div></section>';
}

const calendar = route => '<section class="sec rv" id="calendar"><div class="wrap"><div class="sec-head"><div><h2 class="h2">' + esc(COMMUNITY.calendarTitle) + '</h2><p class="lead">' + esc(COMMUNITY.calendarLead) + '</p></div>' + link(route, { label: COMMUNITY.subscribe, href: LUMA.calendar }) + '</div><div class="comm-cal"><iframe src="' + esc(LUMA.embed) + '" title="' + esc(COMMUNITY.calendarTitle) + '" allowfullscreen></iframe></div></div></section>';


const ways = () => '<section class="sec rv comm-ways"><div class="wrap"><h2 class="h2">' + esc(M.waysTitle) + '</h2>' + M.ways.map(w => '<a class="lnk" href="' + esc(w.href) + '"' + ext(w.href) + '><div><h3>' + esc(w.title) + '</h3><p>' + esc(w.body) + '</p>' + arrow + '</div><div class="lnk__img' + (w.fit ? ' is-fit' : '') + '">' + scene(w.img) + '</div></a>').join('') + '</div></section>';

const past = () => '<section class="sec rv" id="past"><div class="wrap"><div class="sec-head"><h2 class="h2">' + esc(COMMUNITY.pastTitle) + '</h2><a class="btn" href="#/news@event">전체 행사 기록</a></div><div class="tiles tiles--all">' + EVENTS.filter(e => !e.upcoming).map(e => tile({ ...e, type: 'event', kind: BOARD.eventsTitle }, 1)).join('') + '</div></div></section>';


export const HOOKS = { '/community': { page: route => hero(route) + partners() + stats() + events(route) + calendar(route) + ways() + past() } };

