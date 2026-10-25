import { PAGES } from './content.js';
import { STRINGS } from './overlay.js';
import { renderPage, copy, html, plain, esc, link, pad } from './render.js';
import { LUMA, COMMUNITY } from './activity.js';
import { hydrate } from './live.js';
import { mountHeroFx } from './showcase/herofx.js';

// Menu entries that leave the site, like AI House's Event Calendar link to Luma.
const EXTERNAL = { 'luma:calendar': { href: LUMA.calendar, label: COMMUNITY.calendarTitle, desc: COMMUNITY.calendarLead } };
const hrefOf = address => EXTERNAL[address]?.href ?? '#' + address;
const extAttr = address => EXTERNAL[address] ? ' target="_blank" rel="noopener"' : '';

const ALL_GROUPS = [
  ['about', ['/about', '/people', '/news']],
  ['research', ['/research', '/ouroboros', '/research@results', '/research@exchange']],
  ['education', ['/education', '/seed', '/education/advanced', '/education/corporate', '/education/startup']],
  ['collab', ['/collaboration', '/business', '/global']],
  ['community', ['/community', 'luma:calendar']],
  ['ventures', ['/startups', '/ventures']]
];
const groups = ALL_GROUPS;
export const routes = Object.keys(PAGES);
const github = PAGES['/'].blocks.flatMap(block => block.items ?? []).find(item => item.link?.href?.startsWith('https://github.com/'))?.link.href;
const hdr = document.getElementById('hd');
const map = document.getElementById('map');
const main = document.getElementById('main');
const footer = document.querySelector('.ft');
const label = address => {
  if (EXTERNAL[address]) return esc(EXTERNAL[address].label);
  const [path, id] = address.split('@');
  return html(path, id ? PAGES[path].blocks.find(block => block.id === id)?.text : PAGES[path].title ?? STRINGS.meta.title);
};
const navLink = address => {
  if (EXTERNAL[address]) return '<a href="' + esc(hrefOf(address)) + '"' + extAttr(address) + '><b>' + label(address) + '</b><small>' + esc(EXTERNAL[address].desc) + '</small></a>';
  const path = address.split('@')[0];
  const lead = copy(path, PAGES[path].lead);
  const description = lead.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? lead;
  return `<a href="#${address}"><b>${label(address)}</b>${description ? `<small>${esc(description)}</small>` : ''}</a>`;
};

hdr.innerHTML = `<a class="hd__logo" href="#/" aria-label="${esc(STRINGS.ui.home)}"><span>${esc(STRINGS.meta.title)}</span></a><nav class="hd__nav">${groups.map(([key, paths]) => `<div class="hd__item" data-k="${key}"><button class="hd__trigger" type="button" aria-expanded="false" aria-controls="menu-${key}"><span>${esc(STRINGS.nav[key])}</span></button><div class="mega" id="menu-${key}">${paths.map(navLink).join('')}</div></div>`).join('')}<a class="hd__cell" href="#/join">${esc(STRINGS.nav.join)}</a><button class="hd__cell hd__burger" type="button" aria-expanded="false" aria-controls="map" aria-label="${esc(STRINGS.ui.menu)}" title="${esc(STRINGS.ui.menu)}"><span class="bars"><i></i><i></i><i></i></span></button></nav>`;
const siteGroups = [...groups.map(([key, paths]) => [STRINGS.nav[key], paths.filter(path => !path.includes('@'))]), [STRINGS.nav.join, ['/join', '/support', '/join/connect']]];
map.setAttribute('aria-label', STRINGS.ui.menu);
map.innerHTML = `<div class="map__cols">${siteGroups.map(([title, paths]) => `<div class="map__col"><p>${esc(title)}</p>${paths.map(path => `<a data-route href="${esc(hrefOf(path))}"${extAttr(path)}>${label(path)}</a>`).join('')}</div>`).join('')}<div class="map__col"><p>${label('/seed')}</p>${PAGES['/seed'].toc.map(([id, title]) => `<a href="${id === 'support' ? '#/support' : '#/seed@' + esc(id)}">${html('/seed', title)}</a>`).join('')}</div></div><div class="map__foot"><span>© ${esc(STRINGS.meta.title)}</span><span class="ft__links">${link('/', { label: STRINGS.band.btn, href: github }, 'inline')}${link('/', { label: 'Discord', href: 'https://discord.gg/8cW7Wfxnpu' }, 'inline')}${link('/', { label: 'Luma', href: LUMA.calendar }, 'inline')}</span></div>`;
footer.innerHTML = `<div class="wrap footer-groups">${siteGroups.map(([title, paths]) => `<nav aria-label="${esc(title)}"><b>${esc(title)}</b>${paths.map(path => `<a href="${esc(hrefOf(path))}"${extAttr(path)}>${label(path)}</a>`).join('')}</nav>`).join('')}</div><div class="wrap"><span>© ${esc(STRINGS.meta.title)}</span><span class="ft__links">${link('/', { label: STRINGS.band.btn, href: github }, 'inline')}${link('/', { label: 'Discord', href: 'https://discord.gg/8cW7Wfxnpu' }, 'inline')}${link('/', { label: 'Luma', href: LUMA.calendar }, 'inline')}</span></div>`;
const skip = document.querySelector('.skip');
skip.textContent = STRINGS.ui.skip;
skip.addEventListener('click', event => { event.preventDefault(); main.focus({ preventScroll: true }); });

const items = [...hdr.querySelectorAll('.hd__item')];
const burger = hdr.querySelector('.hd__burger');
let closeTimer;
const openItem = item => {
  clearTimeout(closeTimer);
  items.forEach(element => {
    const open = element === item;
    element.classList.toggle('is-open', open);
    element.querySelector('button').setAttribute('aria-expanded', String(open));
  });
};
for (const item of items) {
  item.addEventListener('mouseenter', () => openItem(item));
  item.addEventListener('mouseleave', () => { closeTimer = setTimeout(() => openItem(null), 140); });
  item.addEventListener('focusout', event => { if (!item.contains(event.relatedTarget)) openItem(null); });
  item.querySelector('button').addEventListener('click', () => openItem(item.classList.contains('is-open') ? null : item));
}
function setMap(open) {
  openItem(null);
  document.body.classList.toggle('map-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? STRINGS.ui.close : STRINGS.ui.menu);
  burger.title = open ? STRINGS.ui.close : STRINGS.ui.menu;
  map.inert = !open;
  map.setAttribute('aria-hidden', String(!open));
  [skip, main, footer, hdr.querySelector('.hd__logo'), ...items, hdr.querySelector('a.hd__cell')].forEach(element => { element.inert = open; });
  if (open) map.querySelector('a').focus();
}
burger.addEventListener('click', () => setMap(!document.body.classList.contains('map-open')));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const trigger = hdr.querySelector('.is-open .hd__trigger');
    if (document.body.classList.contains('map-open')) { setMap(false); burger.focus(); }
    openItem(null);
    trigger?.focus();
  }
  if (event.key === 'Tab' && document.body.classList.contains('map-open')) {
    const focusable = [burger, ...map.querySelectorAll('a')];
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); focusable.at(-1).focus(); }
    else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); burger.focus(); }
  }
});
setMap(false);

let current = null;
let observer;
function parse() {
  try {
    const [path, anchor = ''] = decodeURIComponent(location.hash.slice(1) || '/').split('@');
    return { path, anchor };
  } catch {
    return { path: '/404', anchor: '' };
  }
}
function render() {
  let { path, anchor } = parse();
  if (path === '/industry' || path === '/faq') {
    path = path === '/industry' ? '/collaboration' : '/seed';
    if (location.hash.startsWith('#/faq')) anchor = 'faq';
    history.replaceState(null, '', `#${path}${anchor ? '@' + anchor : ''}`);
  }
  const initial = current === null;
  setMap(false);
  if (path !== current) {
    observer?.disconnect();
    current = path;
    main.innerHTML = renderPage(path);
    main.dataset.route = path;
    document.title = path === '/' ? STRINGS.meta.title : `${plain(PAGES[path]?.title ?? STRINGS.ui.notFoundTitle)} · ${STRINGS.meta.title}`;
    for (const [key, paths] of groups) hdr.querySelector(`[data-k="${key}"] button`).setAttribute('aria-current', String(paths.some(address => address.split('@')[0] === path)));
    wire();
    hydrate(main);
    mountHeroFx(main);
  }
  const section = anchor ? [...main.querySelectorAll('[id]')].find(element => element.id === anchor) : null;
  if (section) {
    section.classList.add('in');
    section.scrollIntoView({ behavior: 'instant', block: 'start' });
    const heading = section.querySelector('h2') ?? section;
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!initial || anchor) main.querySelector('h1').focus({ preventScroll: true });
  }
}

function wire() {
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -6% 0px' });
  main.querySelectorAll('.rv').forEach(element => observer.observe(element));
  main.querySelectorAll('[data-alist]').forEach(list => {
    const buttons = [...list.querySelectorAll('.aitem')];
    const images = [...list.querySelectorAll('.alist__img img')];
    const set = index => {
      buttons.forEach((button, i) => { button.classList.toggle('is-active', i === index); button.setAttribute('aria-pressed', String(i === index)); });
      images.forEach((image, i) => image.classList.toggle('on', i === index));
      list.querySelector('.alist__count b').textContent = pad(index + 1);
    };
    buttons.forEach((button, i) => ['mouseenter', 'focus', 'click'].forEach(event => button.addEventListener(event, () => set(i))));
  });
  main.querySelectorAll('[data-outputs]').forEach(table => {
    const filters = { 0: '', 3: '' };
    const rows = [...table.querySelectorAll('[role="row"][data-st]')];
    const update = () => {
      rows.forEach(row => { row.hidden = Boolean((filters[0] && row.dataset.area !== filters[0]) || (filters[3] && row.dataset.st !== filters[3])); });
      const count = rows.filter(row => !row.hidden).length;
      table.querySelector('.ocount').textContent = `${count} / ${rows.length}`;
      table.querySelector('.empty').hidden = count !== 0;
    };
    table.querySelectorAll('[data-filter]').forEach(group => group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      filters[group.dataset.filter] = button.dataset.value;
      group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      update();
    })));
    update();
  });
  main.querySelectorAll('.carousel').forEach(wrapper => {
    const car = wrapper.querySelector('.car');
    const cards = [...car.children];
    const previous = wrapper.querySelector('[data-car="-1"]');
    const next = wrapper.querySelector('[data-car="1"]');
    let selected = 0;
    const update = () => {
      cards.forEach((card, i) => card.classList.toggle('is-active', i === selected));
      wrapper.querySelector('.car__count').textContent = `${pad(selected + 1)} / ${pad(cards.length)}`;
      wrapper.querySelector('.car__line i').style.width = `${(selected + 1) / cards.length * 100}%`;
      previous.disabled = selected === 0;
      next.disabled = selected === cards.length - 1;
    };
    const go = delta => {
      selected = Math.max(0, Math.min(cards.length - 1, selected + delta));
      update();
      car.scrollTo({ left: cards[selected].offsetLeft - cards[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    previous.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    car.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1); } });
    update();
  });
}
document.addEventListener('click', event => {
  const target = event.target.closest('a[href^="#/"]');
  if (target?.getAttribute('href') === location.hash) { event.preventDefault(); render(); }
});
addEventListener('hashchange', render);
render();
