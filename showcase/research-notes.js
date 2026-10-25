import { esc } from '../render.js';
import { RESEARCH_PROGRAMS } from '../activity.js';
import { ghStars } from '../live.js';
import { img } from '../render.js';

const repoOf = href => (href.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/) ?? [])[1];

export function programs() {
  const P = RESEARCH_PROGRAMS;
  const L = P.labels;
  const out = o => '<li><a href="' + esc(o.href) + '" target="_blank" rel="noopener"><span class="rprog__oname">' + esc(o.name) + (repoOf(o.href) ? '<em>' + ghStars(repoOf(o.href), { prefix: '★ ' }) + '</em>' : '') + '</span><span class="rprog__odesc">' + esc(o.desc) + '</span></a></li>';
  const item = it => '<article class="rprog" id="program-' + esc(it.n) + '"><div class="rprog__head"><span class="rprog__n">' + esc(it.n) + '</span><div><span class="kicker">' + esc(it.area) + '</span><h3>' + esc(it.question) + '</h3></div></div>'
    + '<div class="rprog__body"><div class="rprog__img">' + img(it.img) + '</div><div class="rprog__text">'
    + '<h4>' + esc(L.why) + '</h4><p>' + esc(it.why) + '</p>'
    + '<h4>' + esc(L.method) + '</h4><ol class="rprog__method">' + it.method.map(m => '<li>' + esc(m) + '</li>').join('') + '</ol>'
    + '</div></div>'
    + '<div class="rprog__foot"><div><h4>' + esc(L.outputs) + '</h4><ul class="rprog__outs">' + it.outputs.map(out).join('') + '</ul></div><div><h4>' + esc(L.ongoing) + '</h4><ul class="rprog__ongoing">' + it.ongoing.map(g => '<li>' + esc(g) + '</li>').join('') + '</ul></div></div></article>';
  return '<section class="sec rv research-programs" id="programs"><div class="wrap"><h2 class="h2">' + esc(P.title) + '</h2><p class="lead">' + esc(P.lead) + '</p>' + P.items.map(item).join('') + '</div></section>';
}

