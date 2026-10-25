import { PAGES } from './content.js';
import { AREA_IMG, WORK_IMG, phaseImg, DOC_IMG } from './data.js';
import { ADDITIONS, STRINGS, applyOverlay } from './overlay.js';
import * as home from './showcase/home.js';
import * as about from './showcase/about.js';
import * as research from './showcase/research.js';
import * as education from './showcase/education.js';
import * as seed from './showcase/seed.js';
import * as collab from './showcase/collab.js';
import * as ventures from './showcase/ventures.js';
import * as community from './showcase/community.js';
import * as board from './showcase/board.js';
import * as site from './showcase/site.js';
import * as ouroboros from './showcase/ouroboros.js';
import * as support from './showcase/support.js';

export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const ko = value => Array.isArray(value) ? value[0] : value;
export const plain = value => String(ko(value) ?? '').replace(/<br\s*\/?\s*>/gi, ' ');
export const copy = (route, value) => applyOverlay(route, ko(value));
export const html = (route, value) => esc(copy(route, value)).replace(/&lt;br\s*\/?\s*&gt;/gi, '<br>');
export const text = (route, blockIndex, field = 'text') => {
  const value = field.split('.').reduce((node, key) => node?.[key], PAGES[route]?.blocks[blockIndex]);
  return html(route, value);
};
export const pad = n => String(n).padStart(2, '0');
export const img = name => `<img src="assets/img/${esc(name)}.jpg" alt="" loading="lazy" decoding="async"${DOC_IMG[name] ? ` class="is-doc" style="--paper:${DOC_IMG[name]}"` : ''}>`;
export const mark = () => '<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M28.5 9.5A13 13 0 1 0 32 24.5" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M34.5 12.6l-6.2 4.2-.9-7.4z" fill="currentColor"/><circle cx="20" cy="20" r="3.4" fill="currentColor"/></svg>';
const icon = '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" fill="none" stroke="currentColor"/><circle cx="60" cy="60" r="34" fill="none" stroke="url(#ig)" stroke-width="3"/><circle cx="60" cy="60" r="8" fill="currentColor"/></svg>';
const plus = '<span class="plus" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v16M4 12h16"/></svg></span>';

export function link(route, item, className = 'btn') {
  const label = html(route, item.label);
  const href = copy(route, item.href);
  if (!label || !href) return '';
  if (!/^(#\/|https?:\/\/|mailto:)/i.test(href)) return label;
  return `<a class="${esc(className)}${item.primary ? ' btn--primary' : ''}" href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
}

const modules = [home, about, research, education, seed, collab, ventures, community, board, site, ouroboros, support];
export const HOOKS = {};
for (const module of modules) {
  for (const [route, hooks] of Object.entries(module.HOOKS)) {
    const previous = HOOKS[route] ?? {};
    HOOKS[route] = { ...previous, ...hooks };
    for (const key of ['before', 'after', 'variant']) if (previous[key] || hooks[key]) HOOKS[route][key] = { ...previous[key], ...hooks[key] };
  }
}

function cards(route, block, variant) {
  const shown = block.items;
  const four = shown.length === 4;
  const classes = variant ?? (four ? 'duo duo--4' : shown.length <= 3 ? 'pillars' : 'pillars cards-grid');
  const itemClass = classes.includes('duo') ? 'duo__card' : 'pillar';
  return `<div class="${esc(classes)}">${shown.map(item => `<article class="${itemClass}"><h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p>${item.status ? `<span class="status">${html(route, item.status)}</span>` : ''}${item.mail ? mailLink(route, item) : ''}${item.link ? link(route, item.link) : ''}</article>`).join('')}${classes.includes('duo--4') ? plus : ''}</div>`;
}

// Every inquiry goes to one inbox; the subject line keeps the category.
export function mailLink(route, item) {
  const subject = encodeURIComponent('[OURO LABS] ' + copy(route, item.title));
  return `<a class="btn btn--ghost" href="mailto:${esc(STRINGS.contact.mail)}?subject=${subject}">메일 보내기</a>`;
}

function table(route, block, index) {
  const outputs = route === '/research' && PAGES[route].blocks[index - 2]?.id === 'results';
  const cell = value => value && !Array.isArray(value) && typeof value === 'object' ? link(route, value, 'inline') : html(route, value);
  const chips = outputs ? [0, 3].map(column => `<div class="chips" role="group" aria-label="${esc(copy(route, block.head[column]))}" data-filter="${column}"><button type="button" class="chip" data-value="" aria-pressed="true">${html(route, block.head[column])}</button>${[...new Set(block.rows.map(row => copy(route, row[column])))].map(value => `<button type="button" class="chip" data-value="${esc(value)}" aria-pressed="false">${esc(value)}</button>`).join('')}</div>`).join('') : '';
  return `<div class="table-block" data-table="${index}"${outputs ? ' data-outputs' : ''}>${chips}<div class="olist olist--generic" role="table" aria-colcount="${block.head.length}" style="--cols:${block.head.length}"><div class="orow orow--head" role="row">${block.head.map(value => `<div role="columnheader">${cell(value)}</div>`).join('')}</div>${block.rows.map(row => `<div class="orow" role="row"${outputs ? ` data-area="${esc(copy(route, row[0]))}" data-st="${esc(copy(route, row[3]))}"` : ''}>${row.map(value => `<div role="cell">${cell(value)}</div>`).join('')}</div>`).join('')}</div>${outputs ? `<p class="ocount" aria-live="polite"></p><p class="empty" hidden>${html(route, STRINGS.ui.empty)}</p>` : ''}</div>`;
}

function carousel(route, block) {
  return `<div class="carousel"><div class="car__bar"><span class="car__count"><b>01</b> / ${pad(block.items.length)}</span><span class="car__line"><i></i></span><span class="car__btns"><button data-car="-1" aria-label="${html(route, STRINGS.ui.prev)}">←</button><button data-car="1" aria-label="${html(route, STRINGS.ui.next)}">→</button></span></div><div class="car" tabindex="0">${block.items.map((item, i) => `<article class="story${i ? '' : ' is-active'}">${img(WORK_IMG[i % WORK_IMG.length])}<h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p>${item.link ? link(route, item.link) : ''}</article>`).join('')}</div></div>`;
}

function steps(route, block, variant = 'steps') {
  return `<div class="${esc(variant)}" style="--n:${block.items.length}">${block.items.map((item, i) => `<div class="step">${variant.includes('steps--img') ? `<figure>${img(phaseImg(route, i))}</figure>` : ''}<small>${pad(i + 1)}</small><h3>${html(route, item.name)}</h3><p>${html(route, item.desc)}</p>${item.out ? `<p>${html(route, item.out)}</p>` : ''}</div>`).join('')}</div>`;
}

const components = {
  carousel,
  none: () => '',
  pillars: (r, b) => cards(r, b, 'pillars'),
  'duo--4': (r, b) => cards(r, b, 'duo duo--4'),
  'cards-grid': (r, b) => cards(r, b, 'pillars cards-grid'),
  'steps--img': (r, b) => steps(r, b, 'steps steps--img'),
  ...Object.assign({}, ...modules.map(module => module.COMPONENTS ?? {}))
};

function renderBlock(route, block, index, firstParagraph) {
  const variant = HOOKS[route]?.variant?.[index];
  if (variant) {
    const component = typeof variant === 'function' ? variant : components[variant];
    if (!component) throw new Error(`Unknown component: ${variant}`);
    return component(route, block, index);
  }
  switch (block.t) {
    case 'h': return `<h2 class="h2" tabindex="-1">${html(route, block.text)}</h2>`;
    case 'motto': return `<div class="statement"><h2 class="h2">${html(route, block.text)}</h2>${block.sub ? `<p>${html(route, block.sub)}</p>` : ''}</div>`;
    case 'p': return `<p class="${firstParagraph ? 'lead' : 'body-copy'}">${html(route, block.text)}</p>`;
    case 'links':
    case 'btns': return `<div class="button-row">${block.items.map(item => link(route, item, item.primary ? 'btn' : 'btn btn--ghost')).join('')}</div>`;
    case 'cards': return cards(route, block);
    case 'table': return table(route, block, index);
    case 'kv': return `<div class="rows">${block.items.map(([title, body]) => `<div class="row"><div class="row__t">${icon}<span>${html(route, title)}</span></div><p>${html(route, body)}</p></div>`).join('')}</div>`;
    case 'bullets': return `<ul class="bullets">${block.items.map(item => `<li>${html(route, item)}</li>`).join('')}</ul>`;
    case 'steps': return steps(route, block);
    case 'note': return `<aside class="note">${html(route, block.text)}</aside>`;
    case 'areas': return `<div class="alist" data-alist><div class="alist__items">${block.items.map((item, i) => `<button type="button" class="aitem${i ? '' : ' is-active'}" aria-pressed="${i === 0}"><span class="aitem__h"><span class="aitem__n">${pad(i + 1)}</span><span class="aitem__t">${html(route, item.title)}</span></span><p>${html(route, item.body)}</p></button>`).join('')}</div><div class="alist__vis" aria-hidden="true"><div class="alist__img">${block.items.map((_, i) => `<img src="assets/img/${AREA_IMG[i % AREA_IMG.length]}.jpg" alt="" loading="lazy" class="${i ? '' : 'on'}">`).join('')}</div><div class="alist__count"><b>01</b> / ${pad(block.items.length)}</div></div></div>`;
    case 'people': return `<div class="people">${block.items.map(person => `<article class="person"><img src="${esc(person.photo)}" alt="${esc(copy(route, person.name))}" loading="lazy" width="400" height="500"><b>${html(route, person.name)}</b><span>${html(route, person.handle)}</span><p>${html(route, person.note)}</p>${person.links.map(([label, href]) => link(route, { label, href }, 'inline')).join('')}</article>`).join('')}</div>`;
    case 'news': return `<div class="news">${block.items.map((item, i) => `<article class="post"><div class="post__img">${img(WORK_IMG[i % WORK_IMG.length])}</div><span class="meta">${html(route, item.date)} · ${html(route, item.type)}</span><h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p><span class="status">${html(route, item.status)}</span></article>`).join('')}</div>`;
    case 'diagram': return `<figure class="diagram"><div role="region" tabindex="0" aria-label="${esc(copy(route, block.text))}"><img src="assets/diagrams/${esc(block.img.split('/').pop())}-ko.svg" alt="${esc(copy(route, block.text))}" loading="lazy"></div><figcaption>${html(route, block.text)}</figcaption></figure>`;
    case 'faq': return `<div class="faq faqg">${block.items.map((item, i) => `<details><summary><span class="n">${pad(i + 1)}</span><span>${html(route, item.q)}</span><span class="pm" aria-hidden="true">+</span></summary><div class="ans">${html(route, item.a)}</div></details>`).join('')}</div>`;
    default: throw new Error(`Unknown block: ${block.t}`);
  }
}

function renderAdditions(route, markup) {
  const additions = ADDITIONS.filter(entry => entry.route === route);
  if (!additions.length) return markup;
  const template = document.createElement('template');
  template.innerHTML = markup;
  for (const entry of additions) {
    const section = [...template.content.querySelectorAll('section[id]')].find(node => node.id === entry.sectionId);
    if (!section) throw new Error(`Missing addition section: ${route}@${entry.sectionId}`);
    const paragraph = document.createElement('p');
    paragraph.className = 'body-copy';
    paragraph.dataset.addition = entry.treeLine;
    paragraph.textContent = entry.text;
    if (entry.after === null) {
      section.querySelector(':scope > .wrap').append(paragraph);
    } else {
      const anchor = [...section.querySelectorAll('p, li, aside, h2, h3')].find(node => node.textContent === entry.after);
      if (!anchor) throw new Error(`Missing addition anchor: ${route}@${entry.sectionId} T:${entry.treeLine}`);
      anchor.after(paragraph);
    }
  }
  return template.innerHTML;
}

export function renderPage(route) {
  const page = PAGES[route];
  if (!page) return `<section class="chero hero"><div class="wrap"><h1 tabindex="-1">${html(route, STRINGS.ui.notFoundTitle)}</h1><p class="lead">${html(route, STRINGS.ui.notFoundBody)}</p>${link(route, { label: STRINGS.ui.toHome, href: '#/' })}</div></section>`;
  const hooks = HOOKS[route] ?? {};
  if (hooks.page) return hooks.page(route);
  const hook = (position, id) => hooks[position]?.[id]?.() ?? '';
  const mottoIndex = page.blocks.findIndex(block => block.t === 'motto');
  const motto = page.blocks[mottoIndex];
  const title = motto?.text ?? page.title ?? STRINGS.meta.title;
  const hero = `<section class="hero ${page.home ? 'hero--home' : 'chero chero--field'}"><div class="field${page.home ? ' field--img' : ''}"></div><div class="wrap">${page.eyebrow ? `<div class="kicker">${html(route, page.eyebrow)}</div>` : ''}${motto && page.title ? `<p class="lockup">${html(route, page.title)}</p>` : ''}<h1 class="${page.home ? 'hero__h1' : ''}" tabindex="-1">${html(route, title)}</h1>${motto?.sub ? `<p class="lead">${html(route, motto.sub)}</p>` : ''}${page.lead ? `<p class="lead">${html(route, page.lead)}</p>` : ''}</div></section>`;
  let output = hook('before', 'top');
  if (hooks.hero) {
    const component = typeof hooks.hero === 'function' ? hooks.hero : components[hooks.hero];
    if (!component) throw new Error(`Unknown hero: ${hooks.hero}`);
    output += component(route, page, hero);
  } else output += hero;
  output += hook('after', 'top');
  if (page.tabs) {
    const routes = ['/education', '/seed', '/education/advanced', '/education/corporate', '/education/startup'];
    output += `<nav class="tabs wrap">${routes.map(path => `<a href="#${path}"${route === path ? ' aria-current="page"' : ''}>${html(path, PAGES[path].title)}</a>`).join('')}</nav>`;
  }
  // hooks.skip: canon block indices this site leaves out (moved elsewhere or merged); their headings drop from the toc too.
  const skip = hooks.skip ?? new Set();
  const skippedIds = new Set(page.blocks.filter((b, i) => skip.has(i) && b.id).map(b => b.id));
  if (page.toc) output += `<nav class="toc wrap">${page.toc.filter(([id]) => !skippedIds.has(id)).map(([id, label]) => `<a href="#${route}@${esc(id)}">${html(route, label)}</a>`).join('')}</nav>`;
  let section = null;
  let firstParagraph = true;
  const close = () => {
    if (section !== null) output += `</div></section>${hook('after', section)}`;
  };
  page.blocks.forEach((block, index) => {
    if (index === mottoIndex || skip.has(index)) return;
    if (block.t === 'h') {
      close();
      section = block.id ?? `section-${index}`;
      output += `${hook('before', section)}<section class="sec rv" id="${esc(section)}"><div class="wrap">${renderBlock(route, block, index, true)}`;
      firstParagraph = true;
    } else {
      if (section === null) {
        section = 'intro';
        output += `${hook('before', section)}<section class="sec rv" id="intro"><div class="wrap">`;
      }
      output += renderBlock(route, block, index, firstParagraph);
      if (block.t === 'p') firstParagraph = false;
    }
  });
  close();
  return renderAdditions(route, output + hook('before', 'end') + hook('after', 'end'));
}
