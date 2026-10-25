import { PAGES } from '../content.js';
import { HERO_IMG } from '../data.js';
import { STRINGS } from '../overlay.js';
import { copy, esc, html, img } from '../render.js';
import { programs } from './research-notes.js';

function hero(route, page) {
  return `<section class="hero chero chero--field research-hero"><div class="field"></div><div class="wrap"><div class="lockup"><span>${html(route, STRINGS.meta.title)}</span><i aria-hidden="true"></i><span>${html(route, page.eyebrow)}</span></div><h1 tabindex="-1">${html(route, page.title)}</h1><p class="lead">${html(route, page.lead)}</p></div><div class="arc" aria-hidden="true"><div class="arc__row">${HERO_IMG[route].map((name, i, images) => `<div class="arc__i" style="--offset:${i - (images.length - 1) / 2}">${img(name)}</div>`).join('')}</div></div></section>`;
}

function resultsHeading(route, block, index) {
  const table = PAGES[route].blocks.slice(index + 1).find(item => item.t === 'table');
  const counts = new Map();
  for (const row of table.rows) {
    const status = copy(route, row[3]);
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }
  return `<div class="research-results-head"><h2 class="h2" tabindex="-1">${html(route, block.text)}</h2><p data-output-counts>${[...counts].map(([status, count]) => `${esc(status)} ${count}`).join(' · ')}</p></div>`;
}

export const HOOKS = {
  '/research': {
    hero,
    variant: { 5: 'carousel', 6: resultsHeading },
    after: { direction: programs }
  }
};
