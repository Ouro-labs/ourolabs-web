import { PAGES } from '../content.js';
import { phaseImg } from '../data.js';
import { STRINGS } from '../overlay.js';
import { html, text, link, img, pad } from '../render.js';

const advanced = '/education/advanced';
const pill = key => STRINGS.pill[key] ? `<span class="status" data-pill="${key}">${html('/education', STRINGS.pill[key])}</span>` : '';
const symbols = [
  '<path d="m32 40 17 16-17 16m28 0h25"/>',
  '<path d="m60 22 33 19v38L60 98 27 79V41Z"/><path d="m60 42 16 9v18l-16 9-16-9V51Z"/>',
  '<path d="M28 86V66h18v20m5 0V48h18v38m5 0V30h18v56"/>',
  '<circle cx="60" cy="43" r="14"/><path d="M32 88c0-31 56-31 56 0Z"/>'
];
const icon = index => `<svg class="ico" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="60" cy="60" r="54" stroke="url(#ig)"/>${symbols[index % symbols.length]}</svg>`;
const plus = '<span class="plus" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v16M4 12h16"/></svg></span>';

function educationHero(route, page) {
  const motto = page.blocks.find(block => block.t === 'motto');
  const state = route === advanced ? 'advanced' : null;
  return `<section class="hero chero chero--field edu-hero"><div class="field"></div><div class="wrap"><div class="kicker">${html(route, page.eyebrow)}</div>${motto ? `<p class="lockup">${html(route, page.title)}</p>` : ''}<h1 tabindex="-1">${html(route, motto?.text ?? page.title)}</h1>${motto?.sub ? `<p class="lead">${html(route, motto.sub)}</p>` : ''}${state ? pill(state) : ''}</div></section>`;
}

function courseProof() {
  return `<section class="sec rv edu-proof" id="course-proof"><div class="wrap edu-proof__layout"><figure>${img('r-talk')}</figure><div><span class="status">${html(advanced, STRINGS.pill.pub)}</span><h2 class="h2" tabindex="-1">${text(advanced, 8)}</h2><p class="body-copy">${text(advanced, 9)}</p><div class="button-row">${PAGES[advanced].blocks[11].items.map(item => link(advanced, item)).join('')}${link(advanced, { label: PAGES[advanced].title, href: '#/education/advanced@aae' }, 'btn btn--ghost')}</div></div></div></section>`;
}

function audiences(route, block) {
  return `<div class="duo duo--4 edu-audiences">${block.items.map(([title, body], i) => `<article class="duo__card">${icon(i)}<h3>${html(route, title)}</h3><p>${html(route, body)}</p></article>`).join('')}${plus}</div>`;
}

function paths(route, block, index) {
  return `<div class="table-block edu-paths" data-table="${index}"><div class="olist olist--generic" role="table" aria-colcount="${block.head.length}"><div class="orow orow--head" role="row">${block.head.map(label => `<div role="columnheader">${html(route, label)}</div>`).join('')}</div>${block.rows.map(row => `<div class="orow" role="row"><div role="cell"><h3>${html(route, row[0])}</h3>${pill(row[3].href === '#/education/advanced' ? 'advanced' : row[3].href === '#/seed' ? 'prep' : 'none')}</div><div role="cell">${html(route, row[1])}</div><div role="cell">${html(route, row[2])}</div><div role="cell">${link(route, row[3], 'btn btn--ghost')}</div></div>`).join('')}</div></div>`;
}

function startupStages(route, block, index) {
  return `<div class="table-block edu-stages" data-table="${index}" role="table" aria-colcount="${block.head.length}"><div class="orow orow--head edu-stages__head" role="row">${block.head.map(label => `<div role="columnheader">${html(route, label)}</div>`).join('')}</div><div class="steps steps--img" role="rowgroup" style="--n:${block.rows.length}">${block.rows.map((row, i) => `<div class="step" role="row"><div role="cell"><figure>${img(phaseImg(route, i))}</figure><small aria-hidden="true">${pad(i + 1)}</small><h3>${html(route, row[0])}</h3></div><p role="cell">${html(route, row[1])}</p></div>`).join('')}</div></div>`;
}

export const HOOKS = {
  '/education': {
    hero: educationHero,
    variant: { 5: audiences, 11: paths }
  },
  '/education/advanced': { hero: educationHero },
  '/education/corporate': { hero: educationHero },
  '/education/startup': { hero: educationHero, variant: { 5: startupStages } }
};
