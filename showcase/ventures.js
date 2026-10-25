import { PAGES } from '../content.js';
import { HERO_IMG, phaseImg } from '../data.js';
import { STRINGS } from '../overlay.js';
import { html, img, link, pad, text, mailLink } from '../render.js';

function pill(route, key = 'plan') {
  if (!STRINGS.pill[key]) return '';
  return `<span class="status status--${key}" data-pill="${key}">${html(route, STRINGS.pill[key])}</span>`;
}

function icon(index) {
  const shapes = [
    '<circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="8"/><path d="M32 4v8m0 40v8M4 32h8m40 0h8"/>',
    '<path d="m8 20 24-12 24 12-24 12zM8 32l24 12 24-12M8 44l24 12 24-12"/>',
    '<rect x="10" y="10" width="16" height="16"/><rect x="38" y="38" width="16" height="16"/><path d="M26 18h20v20M18 26v20h20"/>',
    '<circle cx="32" cy="32" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="52" cy="12" r="5"/><circle cx="12" cy="52" r="5"/><circle cx="52" cy="52" r="5"/><path d="m16 16 9 9m14 14 9 9M16 48l9-9m14-14 9-9"/>'
  ];
  return `<svg class="ico" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${shapes[index % shapes.length]}</svg>`;
}

function hero(route, page) {
  const centered = route === '/startups';
  return `<section class="hero ${centered ? 'chero chero--field' : 'lhero'} venture-hero"><div class="field"></div><div class="wrap"><div class="kicker">${html(route, page.eyebrow)}</div><div class="venture-hero__heading"><h1 tabindex="-1">${html(route, page.title)}</h1>${HERO_IMG[route] ? pill(route) : ''}</div>${route === '/ventures' ? `<div class="venture-current">${text('/join', 12).split(/(?<=\.)\s+/)[1]}</div>` : ''}<p class="lead">${html(route, page.lead)}</p></div></section>`;
}

function strip(route) {
  return `<div class="strip venture-strip" aria-hidden="true">${HERO_IMG[route].map(name => `<figure>${img(name).replace('loading="lazy"', 'loading="eager"')}</figure>`).join('')}</div>`;
}

function plannedHeading(route, block) {
  return `<div class="venture-section-heading"><h2 class="h2" tabindex="-1">${html(route, block.text)}</h2>${pill(route)}</div>`;
}

function cells(route, block) {
  return `<div class="cells venture-cells" style="--n:${block.items.length}">${block.items.map((item, index) => `<article class="cell">${icon(index)}<h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p></article>`).join('')}</div>`;
}

function tableHead(route, block) {
  return `<div class="orow orow--head" role="row">${block.head.map(value => `<div role="columnheader">${html(route, value)}</div>`).join('')}</div>`;
}

function incubation(route, block, index) {
  return `<div class="table-block venture-phases" data-table="${index}"><div role="table" aria-colcount="${block.head.length}" aria-rowcount="${block.rows.length + 1}">${tableHead(route, block)}<div class="phases" role="rowgroup">${block.rows.map((row, i) => `<div class="phase" role="row"><div class="phase__img" aria-hidden="true">${img(phaseImg(route, i))}</div><div class="phase__box"><div role="cell"><div class="phase__k">${pad(i + 1)}</div><h3>${html(route, row[0])}</h3></div><div role="cell"><p>${html(route, row[1])}</p></div><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i></div></div>`).join('')}</div></div></div>`;
}

function iconRows(route, block, index) {
  return `<div class="table-block venture-table" data-table="${index}"><div class="rows" role="table" aria-colcount="${block.head.length}">${tableHead(route, block)}${block.rows.map((row, i) => `<div class="row" role="row"><div class="row__t" role="cell">${icon(i)}<span>${html(route, row[0])}</span></div><div role="cell"><p>${html(route, row[1])}</p></div></div>`).join('')}</div></div>`;
}

function joinTable(route, block, index) {
  const education = index === 1;
  return `<div class="table-block venture-join-table" data-table="${index}"><div class="olist olist--generic" role="table" aria-colcount="${block.head.length}" style="--cols:${block.head.length}">${tableHead(route, block)}${block.rows.map((row, i) => `<div class="orow" role="row">${row.map((value, column) => {
    let valueHtml = value && !Array.isArray(value) && typeof value === 'object' ? link(route, value, 'inline') : html(route, value);
    if (index === 3 && i === 0 && column === 0) valueHtml = link(route, { label: value, href: '#/research@exchange' }, 'inline');
    if (education && column === 0 && i < 2) valueHtml += pill(route, i === 0 ? 'prep' : 'advanced');
    return `<div role="cell">${valueHtml}</div>`;
  }).join('')}</div>`).join('')}</div></div>`;
}

function comparison(route, block, index) {
  return `<div class="table-block venture-comparison" data-table="${index}"><div class="olist olist--generic" role="table" aria-colcount="${block.head.length}" style="--cols:${block.head.length}">${tableHead(route, block)}${block.rows.map(row => `<div class="orow" role="row">${row.map((value, column) => `<div role="cell"><span class="venture-cell-label" aria-hidden="true">${html(route, block.head[column])}</span>${html(route, value)}</div>`).join('')}</div>`).join('')}</div></div>`;
}

function contactCards(route, block) {
  return `<div class="duo duo--4 venture-contacts">${block.items.map((item, i) => `<article class="duo__card">${icon(i)}<h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p>${mailLink(route, item)}</article>`).join('')}</div>`;
}

function contactChannel() {
  const mail = STRINGS.contact.mail;
  return `<div class="venture-contact-channel"><p>모든 문의는 <a href="mailto:${mail}">${mail}</a>에서 받습니다. 아래에서 문의 종류를 고르면 메일 제목이 채워집니다.</p></div>`;
}

function connectContact() {
  return `<section class="sec rv venture-connect-contact" id="contact"><div class="wrap"><h2 class="h2" tabindex="-1">${text('/join', 13)}</h2>${contactChannel()}${contactCards('/join', PAGES['/join'].blocks[14])}</div></section>`;
}

export const HOOKS = {
  '/startups': {
    hero,
    after: { top: () => strip('/startups') },
    variant: { 0: plannedHeading, 2: cells, 3: plannedHeading, 5: incubation, 6: plannedHeading, 10: plannedHeading, 12: iconRows }
  },
  '/ventures': {
    hero,
    after: { top: () => strip('/ventures') },
    variant: { 0: plannedHeading, 2: cells, 3: plannedHeading, 4: iconRows, 5: plannedHeading, 6: iconRows, 7: plannedHeading, 9: plannedHeading, 11: plannedHeading, 12: cells }
  },
  '/join': {
    hero,
    variant: { 1: joinTable, 3: joinTable, 5: joinTable, 7: joinTable, 9: joinTable, 11: joinTable, 14: (route, block) => contactChannel() + contactCards(route, block) }
  },
  '/join/connect': { hero, variant: { 1: comparison }, after: { end: connectContact } }
};
