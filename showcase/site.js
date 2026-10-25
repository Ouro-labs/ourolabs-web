// Site-level arrangement on top of the canon copy: what moved, what merged, and a few richer components.
import { PAGES } from '../content.js';
import { STRINGS } from '../overlay.js';
import { html, esc, pad } from '../render.js';
import { PEOPLE, PEOPLE_PAGE, LUMA, COMMUNITY } from '../activity.js';
import { DISCORD, discordCount } from '../live.js';
import { feed, tile } from './board.js';
import { EVENTS, BOARD } from '../board.js';

// Real activity tiles placed inside a canon section.
const tiles = slugs => () => { const all = [...feed(), ...EVENTS.filter(e => e.upcoming).map(e => ({ ...e, type: 'event', kind: BOARD.eventsTitle }))]; const items = slugs.map(s => all.find(a => a.slug === s)).filter(Boolean); return items.length ? '<section class="sec rv site-tiles"><div class="wrap"><div class="tiles">' + items.map((it, i) => tile(it, i + 1)).join('') + '</div></div></section>' : ''; };

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// People: role, credentials and awards from public profiles.
function people() {
  const card = p => '<article class="person person--full"><img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '" loading="lazy" width="400" height="500">'
    + '<div class="person__body"><b>' + esc(p.name) + ' <small>' + esc(p.en) + '</small></b><span>' + esc(p.handle) + '</span>'
    + '<p class="person__role">' + esc(p.role) + '</p>'
    + '<ul class="person__facts">' + p.facts.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>'
    + (p.contribs.length ? '<div class="person__awards person__contribs"><h4>오픈소스 기여</h4><div>' + p.contribs.map(([l, h]) => '<a class="chip-link" href="' + esc(h) + '" target="_blank" rel="noopener">' + esc(l) + '</a>').join('') + '</div></div>' : '')
    + (p.awards.length ? '<div class="person__awards"><h4>수상</h4><ul>' + p.awards.map(([d, t, r]) => '<li><span>' + esc(d) + '</span><b>' + esc(t) + '</b><em>' + esc(r) + '</em></li>').join('') + '</ul></div>' : '')
    + '<div class="person__links">' + p.links.map(([l, h]) => '<a class="inline" href="' + esc(h) + '" target="_blank" rel="noopener">' + esc(l) + '</a>').join('') + '</div></div></article>';
  return '<div class="people people--full">' + PEOPLE.map(card).join('') + '</div>';
}

// Contributors: AI House "Resident Experts" style grid, read live from GitHub.
function contributors() {
  const P = PEOPLE_PAGE;
  return '<section class="sec rv" id="contributors"><div class="wrap"><div class="sec-head"><div><h2 class="h2">' + esc(P.contributorsTitle) + '</h2><p class="lead">' + esc(P.contributorsLead) + '</p></div><a class="btn" href="' + esc(P.contributorsMore.href) + '" target="_blank" rel="noopener">' + esc(P.contributorsMore.label) + '</a></div><div class="contribs" data-gh-contributors="' + esc(P.contributorsRepo) + '" data-exclude="' + PEOPLE.map(p => p.handle).join(',') + '" data-limit="40"></div></div></section>';
}

// Join: community entry points (events and Discord) next to the canon paths.
function joinCommunity() {
  const rows = [
    ['행사 참여', 'OOO Welcome, OOO Run, 밋업에 참여하려는 분', '루마 캘린더', LUMA.calendar],
    ['디스코드', '사용법과 막힌 문제를 묻고 토론에 참여하려는 분', '디스코드 참여', DISCORD.invite]
  ];
  return '<section class="sec rv" id="community"><div class="wrap"><h2 class="h2">커뮤니티</h2><div class="table-block venture-join-table"><div class="olist olist--generic" role="table" aria-colcount="3" style="--cols:3"><div class="orow orow--head" role="row"><div role="columnheader">경로</div><div role="columnheader">대상</div><div role="columnheader">채널</div></div>'
    + rows.map(([a, b, l, h]) => '<div class="orow" role="row"><div role="cell">' + esc(a) + '</div><div role="cell">' + esc(b) + '</div><div role="cell"><a class="inline" href="' + esc(h) + '" target="_blank" rel="noopener">' + esc(l) + '</a></div></div>').join('')
    + '</div></div></div></section>';
}
const joinPage = PAGES['/join'];
if (!joinPage.toc.some(([id]) => id === 'community')) joinPage.toc.splice(1, 0, ['community', ['커뮤니티', 'Community']]);

// Seed: eligibility without the card that repeats "권장 대상", and a pointer to the support page.
const seedBlocks = PAGES['/seed'].blocks;
const eligibility = (r, b) => '<div class="pillars">' + b.items.slice(1).map(item => '<article class="pillar"><h3>' + html(r, item.title) + '</h3><p>' + html(r, item.body) + '</p></article>').join('') + '</div>';
const seedSupport = () => '<div class="button-row seed-support"><a class="btn" href="#/support">후원 안내</a></div>';

export const HOOKS = {
  '/people': { skip: new Set(range(2, 5)), variant: { 0: () => '<h2 class="h2" tabindex="-1">' + esc(PEOPLE_PAGE.maintainersTitle) + '</h2>', 1: people }, after: { 'section-0': contributors } },
  '/news': { skip: new Set([1, 2]) },
  '/research': { skip: new Set([2, 3, 4, 5]) },
  '/seed': { skip: new Set([8, ...range(40, 47)]), variant: { 17: eligibility }, after: { 'section-37': seedSupport } },
  '/join': { after: { edu: joinCommunity } },
  '/collaboration': { after: { cases: tiles(['ai-agent-engineering-101-2026', 'claude-for-open-source-2026', 'codex-for-open-source-2026', 'ooo-welcome-2026-11']) } },
  '/global': { after: { local: tiles(['agent-fight-night-sf-2026-10']) } }
};

