// Support: the endowed-programme copy moved out of /seed into its own page (canon /seed blocks 40–47).
// Layout follows AI House Incubator: support rows (icon | text), track cards, terms with a divider, sponsor strip.
import { PAGES } from '../content.js';
import { STRINGS } from '../overlay.js';
import { html, esc } from '../render.js';
import { COMMUNITY_MORE } from '../activity.js';

const SRC = '/seed';
const b = PAGES[SRC].blocks;
const at = i => b[i];
const t = v => html(SRC, v);

PAGES['/support'] = { title: ['후원', 'Support'], eyebrow: 'SUPPORT', lead: at(42).text, blocks: [] };

const mail = subject => 'mailto:' + STRINGS.contact.mail + '?subject=' + encodeURIComponent('[OURO LABS] ' + subject);
const sentences = v => t(v).split(/(?<=다\.)\s+/);

const ICONS = [
  '<rect x="10" y="30" width="44" height="8" rx="2"/><rect x="14" y="20" width="36" height="8" rx="2"/><rect x="18" y="40" width="28" height="8" rx="2"/>',
  '<path d="M8 26l24-12 24 12-24 12z"/><path d="M18 31v11c0 4 6 8 14 8s14-4 14-8V31"/><path d="M56 26v14"/>',
  '<rect x="18" y="18" width="28" height="28" rx="3"/><rect x="26" y="26" width="12" height="12"/><path d="M24 10v8M32 10v8M40 10v8M24 46v8M32 46v8M40 46v8M10 24h8M10 32h8M10 40h8M46 24h8M46 32h8M46 40h8"/>',
  '<path d="M10 54V24l22-12 22 12v30"/><path d="M24 54V36h16v18"/><path d="M6 54h52"/>',
  '<circle cx="22" cy="22" r="7"/><circle cx="42" cy="22" r="7"/><path d="M8 50c2-9 8-14 14-14s12 5 14 14"/><path d="M30 50c2-9 6-14 12-14s12 5 14 14"/>'
];
const icon = i => '<svg class="sup-ico" viewBox="0 0 64 64" fill="none" stroke="url(#ig)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[i % ICONS.length] + '</svg>';

function hero() {
  const [first, ...rest] = sentences(at(42).text);
  return '<section class="hero sup-hero"><div class="field"></div><div class="wrap"><div class="kicker">SUPPORT</div><h1 tabindex="-1">후원</h1><p class="sup-hero__lead">' + first + '</p><p class="sup-hero__more">' + rest.join(' ') + '</p><div class="button-row"><a class="btn btn--primary" href="' + mail('후원 문의') + '">' + t(at(47).items[0].label) + '</a><a class="btn" href="#/join/connect">' + t(at(47).items[1].label) + '</a></div></div></section>';
}

// Flow: who gives → the five forms of support → open education → the activity report that closes the loop.
function flow() {
  const forms = at(43).rows.map(r => t(r[0]));
  return '<section class="sec rv sup-flow-sec"><div class="wrap"><h2 class="h2">후원이 쓰이는 곳</h2><figure class="sup-flow" aria-label="후원에서 활동 보고까지"><div class="sup-flow__col"><span class="sup-flow__k">01</span><b>후원</b><span>기업 · 기관 · 개인</span></div><div class="sup-flow__arrow" aria-hidden="true"></div><div class="sup-flow__col sup-flow__col--list"><span class="sup-flow__k">02</span><b>지원 방식</b><ul>' + forms.map(f => '<li>' + f + '</li>').join('') + '</ul></div><div class="sup-flow__arrow" aria-hidden="true"></div><div class="sup-flow__col"><span class="sup-flow__k">03</span><b>열린 교육</b><span>OOO Seed · 행사 · 공개 강의 자료</span></div><div class="sup-flow__report"><span class="sup-flow__k">04</span><b>' + t(at(41).rows[3][0]) + '</b><span>' + t(at(41).rows[3][1]) + '</span></div></figure></div></section>';
}

function forms() {
  return '<section class="sec rv"><div class="wrap"><h2 class="h2">' + t(at(43).head[0]) + '</h2><div class="sup-rows">' + at(43).rows.map((r, i) => '<div class="sup-row"><div class="sup-row__t">' + icon(i) + '<h3>' + t(r[0]) + '</h3></div><p>' + t(r[1]) + '</p></div>').join('') + '</div></div></section>';
}

function tracks() {
  return '<section class="sec rv"><div class="wrap"><h2 class="h2">' + t(at(45).head[0]) + '</h2><p class="lead">' + t(at(44).text) + '</p><div class="sup-tracks">' + at(45).rows.map((r, i) => '<article>' + icon([2, 1, 3, 4][i] ?? i) + '<h3>' + t(r[0]) + '</h3><p>' + t(r[1]) + '</p></article>').join('') + '</div></div></section>';
}

function terms() {
  const rows = at(41).rows.slice(0, 3);
  return '<section class="sec rv"><div class="wrap"><h2 class="h2">' + t(at(41).head[1]) + '</h2><div class="sup-terms">' + rows.map((r, i) => (i ? '<div class="sup-terms__plus" aria-hidden="true">+</div>' : '') + '<div class="sup-terms__item"><span>' + t(at(41).head[0]) + '</span><h3>' + t(r[0]) + '</h3><p>' + t(r[1]) + '</p></div>').join('') + '</div><blockquote class="sup-principle">' + t(at(46).text) + '</blockquote></div></section>';
}

function partners() {
  const p = COMMUNITY_MORE.partners;
  return '<section class="sup-partners"><div class="wrap"><span>' + esc(COMMUNITY_MORE.partnersTitle) + '</span><ul>' + p.map(x => '<li><img src="assets/logos/' + esc(x.logo) + '" alt="' + esc(x.name) + '" loading="lazy"></li>').join('') + '</ul></div></section>';
}

function cta() {
  return '<section class="sec rv sup-cta"><div class="wrap sup-cta__grid"><h2 class="h2">' + t(at(47).items[0].label) + '</h2><div><p>모든 문의는 <a href="mailto:' + STRINGS.contact.mail + '">' + STRINGS.contact.mail + '</a>에서 받습니다.</p><div class="button-row"><a class="btn btn--primary" href="' + mail('후원 문의') + '">메일 보내기</a><a class="btn" href="#/seed">OOO Seed</a></div></div></div></section>';
}

export const HOOKS = { '/support': { page: () => hero() + partners() + flow() + forms() + tracks() + terms() + cta() } };

