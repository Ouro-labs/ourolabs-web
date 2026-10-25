import { PAGES } from '../content.js';
import { html, text, link, esc } from '../render.js';
import { HOME, HOME_WORK, HOME_OUROBOROS, RESEARCH_PROGRAMS, LUMA } from '../activity.js';
import { EVENTS } from '../board.js';
import { feed, tile, hrefOf } from './board.js';
import { heroFx } from './herofx.js';

function hero(route) {
  return '<section class="hero hero--home"><div class="field field--img"></div>' + heroFx() + '<div class="wrap"><h1 class="hero__h1" tabindex="-1">' + text(route, 0) + '</h1></div><div class="wrap hero__foot"><p>' + text(route, 1) + '</p></div></section>';
}

function work() {
  const rows = RESEARCH_PROGRAMS.items.map(it => '<a class="hwork__row" href="#/research@program-' + esc(it.n) + '"><span class="hwork__n">' + esc(it.n) + '</span><span class="hwork__area">' + esc(it.area) + '</span><span class="hwork__q">' + esc(it.question) + '</span><span class="hwork__p">' + esc(it.outputs.map(o => o.name).join(' · ')) + '</span></a>').join('');
  return '<section class="sec rv home-work" id="work"><div class="wrap"><div class="sec-head"><h2 class="h2">' + esc(HOME_WORK.title) + '</h2>' + link('/', { label: HOME_WORK.more, href: HOME_WORK.href }) + '</div><div class="hwork">' + rows + '</div></div></section>';
}

function ouroboros() {
  const o = HOME_OUROBOROS;
  return '<section class="sec rv home-ouro" id="ouroboros"><div class="wrap home-ouro__grid home-ouro__grid--art"><div class="home-ouro__text"><span class="kicker">' + esc(o.kicker) + '</span><h2 class="h2">' + esc(o.title) + '</h2>' + o.body.map(t => '<p>' + esc(t) + '</p>').join('') + '<div class="button-row">' + o.links.map(l => link('/', l)).join('') + '</div></div><figure class="home-ouro__art"><img src="assets/ouroboros/engraving.png" alt="우로보로스 용, 연금술 판화 — Lucas Jennis, 1625" loading="lazy" width="470" height="479"><figcaption>우로보로스 용, 연금술 판화 — Lucas Jennis, 1625</figcaption></figure></div></section>';
}

function pillars(route) {
  const blocks = PAGES[route].blocks;
  const collaboration = blocks[15].items.find(item => item.link?.href === '#/collaboration');
  const items = [
    { title: blocks[4].text, body: blocks[5].text, link: blocks[7].items[0] },
    { title: blocks[8].text, body: blocks[9].text, link: blocks[11].items[0] },
    collaboration
  ];
  return '<section class="sec rv home-pillars-sec" id="pillars"><div class="wrap"><div class="pillars home-pillars">' + items.map(item => '<article class="pillar"><h2 class="h2">' + html(route, item.title) + '</h2><p>' + html(route, item.body) + '</p>' + link(route, { ...item.link, primary: false }) + '</article>').join('') + '</div></div></section>';
}

function news() {
  const all = feed();
  const lead = all.find(a => a.type === 'event' && !/luma-/.test(a.image)) ?? all[0];
  const list = [lead, ...all.filter(a => a !== lead).slice(0, 4)];
  return '<section class="sec rv home-acts" id="news"><div class="wrap"><div class="sec-head"><h2 class="h2">' + esc(HOME.newsTitle) + '</h2><div class="button-row">' + link('/', { label: HOME.newsMore, href: '#/news' }) + link('/', { label: HOME.eventsMore, href: '#/news@event' }) + '</div></div><div class="tiles">' + list.map(tile).join('') + '</div></div></section>';
}

function next() {
  const a = EVENTS.find(x => x.upcoming);
  if (!a) return '';
  return '<section class="sec rv home-next"><div class="wrap home-next__grid"><a class="home-next__img" href="' + hrefOf('event', a) + '" aria-label="' + esc(a.title) + '"><img src="assets/' + a.image + '" alt="' + esc(a.title) + '" loading="lazy"></a><div><span class="kicker">' + esc(HOME.nextTitle) + '</span><h2 class="h2">' + esc(a.title) + '</h2><p class="meta">' + esc(a.date + ' ' + (a.time || '') + ' · ' + (a.place || '')) + '</p><p class="lead">' + esc(a.summary) + '</p><div class="button-row">' + link('/', { label: HOME.detail, href: hrefOf('event', a) }) + link('/', { label: HOME.subscribe, href: LUMA.calendar }) + '</div></div></div></section>';
}

function together(route) {
  const block = PAGES[route].blocks[15];
  const heading = PAGES[route].blocks[14];
  return '<section class="sec rv" id="together"><div class="wrap"><h2 class="h2">' + html(route, heading.text) + '</h2><div class="duo duo--4">' + block.items.map(item => '<div class="duo__card"><h3>' + html(route, item.title) + '</h3><p>' + html(route, item.body) + '</p>' + (item.link ? link(route, item.link) : '') + '</div>').join('') + '</div></div></section>';
}

export const HOOKS = {
  '/': { page: route => hero(route) + pillars(route) + work() + ouroboros() + news() + next() + together(route) }
};

