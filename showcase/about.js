import { WORK_IMG } from '../data.js';
import { STRINGS } from '../overlay.js';
import { html, text, img, link, ko } from '../render.js';

function hero(route, page) {
  return `<section class="hero lhero"><div class="field"></div><div class="wrap"><div class="kicker">${html(route, page.eyebrow)}</div><div class="lhero__in"><h1 tabindex="-1">${html(route, page.title)}</h1>${page.lead ? `<p>${html(route, page.lead)}</p>` : ''}</div></div></section>`;
}

export function posts(route, block) {
  return `<div class="news">${block.items.map((item, index) => {
    const href = ko(item.title).includes('OOO Seed') ? '#/seed@apply' : item.type?.[1] === 'Research' ? '#/research@results' : null;
    return `<article class="post"><div class="post__img">${img(WORK_IMG[index % WORK_IMG.length])}</div><span class="meta">${html(route, item.date)} · ${html(route, item.type)}</span><h3>${html(route, item.title)}</h3><p>${html(route, item.body)}</p><div class="post__foot"><span class="status">${html(route, item.status)}</span>${href ? link(route, { label: STRINGS.ui.source, href }) : ''}</div></article>`;
  }).join('')}</div>`;
}

export const HOOKS = {
  '/about': {
    hero,
    variant: {
      0: (route, block) => `<h2 class="h2" tabindex="-1">${html(route, block.text)}</h2><p class="about-motto">${text(route, 1)}</p>`,
      6: (route, block) => `<p class="about-motto">${html(route, block.text)}</p>`
    }
  },
  '/people': { hero },
  '/news': { hero, variant: { 0: posts } }
};
