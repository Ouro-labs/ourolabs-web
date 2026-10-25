import { PAGES } from '../content.js';
import { phaseImg } from '../data.js';
import { STRINGS } from '../overlay.js';
import { html, text, link, img, pad } from '../render.js';

const route = '/seed';
const blocks = PAGES[route].blocks;
const heading = id => blocks.findIndex(block => block.id === id);
const prep = () => `<span class="status status--prep" data-pill="seed">${html(route, STRINGS.pill.prep)}</span>`;
const freeCohort = value => Array.isArray(value) && /(?:cohort\s*1|first cohort).*free|free.*(?:cohort\s*1|first cohort)|participants take part at no cost/i.test(value[1]);

function hero(r, page) {
  return `<section class="hero chero seed-hero"><div class="field" aria-hidden="true"></div><div class="wrap"><div class="seed-hero__meta"><span class="kicker">${html(r, page.eyebrow)}</span>${prep()}</div><h1 tabindex="-1">${html(r, page.title)}</h1><p class="lead">${html(r, page.lead)}</p></div></section>`;
}

function phases(r, block) {
  return `<div class="phases seed-phases">${block.items.map((item, i) => `<article class="phase"><div class="phase__img" aria-hidden="true">${img(phaseImg(route, i))}</div><div class="phase__box"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><div class="phase__k">${pad(i + 1)}</div><h3>${html(r, item.name)}</h3><p>${html(r, item.desc)}</p>${item.out ? `<div class="phase__out"><span>${html(r, item.out)}</span></div>` : ''}</div></article>`).join('')}</div>`;
}

function rows(r, block) {
  return `<div class="rows seed-rows">${block.items.map(item => `<article class="row"><h3 class="row__t">${html(r, item.title)}</h3><div><p>${html(r, item.body)}</p>${item.status ? `<span class="status">${html(r, item.status)}</span>` : ''}</div></article>`).join('')}</div>`;
}

function table(r, block, index) {
  const cell = value => value && !Array.isArray(value) && typeof value === 'object' ? link(r, value, 'inline') : html(r, value);
  return `<div class="table-block seed-table" data-table="${index}"><div class="olist olist--generic" role="table" aria-colcount="${block.head.length}" style="--cols:${block.head.length}"><div class="orow orow--head" role="row">${block.head.map((value, column) => `<div role="columnheader" id="seed-table-${index}-${column}">${cell(value)}</div>`).join('')}</div>${block.rows.map(row => `<div class="orow" role="row">${row.map((value, column) => `<div role="cell" aria-colindex="${column + 1}"><span class="seed-cell-label" aria-hidden="true">${cell(block.head[column])}</span>${cell(value)}</div>`).join('')}</div>`).join('')}</div></div>`;
}

function faq(r, block) {
  const groups = [
    ['eligibility', 0, 3],
    ['operations', 3, 7],
    ['completion', 7, 8],
    ['beyond', 8, block.items.length]
  ];
  return groups.map(([id, start, end]) => `<div class="faq faqg seed-faq" role="group" aria-labelledby="seed-faq-${id}"><h3 id="seed-faq-${id}">${text(r, heading(id))}</h3>${block.items.slice(start, end).map((item, offset) => `<details><summary><span class="n">${pad(start + offset + 1)}</span><span>${html(r, item.q)}</span><span class="pm" aria-hidden="true">+</span></summary><div class="ans"><p>${html(r, item.a)}</p></div></details>`).join('')}</div>`).join('');
}

const variant = {};
blocks.forEach((block, index) => {
  if (block.t === 'table') variant[index] = table;
  if (block.t === 'faq') variant[index] = faq;
  if (block.t === 'steps' && block.items.some(item => item.name === 'Evolve')) variant[index] = phases;
});
for (const id of ['features', 'recommended', 'operations']) {
  const index = blocks.findIndex((block, i) => i > heading(id) && block.t === 'cards');
  variant[index] = rows;
}
variant[heading('apply') + 1] = r => `<div class="button-row seed-apply"><a class="btn btn--primary" href="mailto:${STRINGS.contact.mail}?subject=${encodeURIComponent('[OURO LABS] OOO Seed 신청')}">${html(r, STRINGS.ui.applySoon)}</a></div>`;

// The two diagrams are drawn in the page's own type and line style instead of the white SVG plates.
const DIAGRAMS = {
  'seed-outputs': () => {
    const steps = [['Problem', '해결하려는 실제 문제'], ['Seed', '목표·범위·제약·기준'], ['Result', 'AI와 함께 실행한 결과'], ['Evaluation', '기준에 따른 평가와 근거']];
    const tracks = [['Workflow', '문제를 해결한 절차를 다른 문제에도 다시 씁니다'], ['Lineage', '문제 정의부터 결과까지의 변경 이력과 판단 근거']];
    return `<div class="sdg sdg--outputs"><ol class="sdg__row">${steps.map(([k, v], i) => `<li class="sdg__node${k === 'Seed' ? ' is-key' : ''}"><span class="sdg__n">${pad(i + 1)}</span><b>${k}</b><span>${v}</span></li>`).join('')}</ol><div class="sdg__tracks">${tracks.map(([k, v]) => `<div class="sdg__track"><b>${k}</b><span>${v}</span></div>`).join('')}</div></div>`;
  },
  'seed-flow': () => {
    const steps = [['사전 준비', '문제와 환경'], ['Welcome', '목적과 동료'], ['Interview', '의도와 범위'], ['Seed', '실행 명세'], ['Run', 'AI와 실행'], ['Evaluate', '기준과 근거'], ['Evolve', '개선과 재사용']];
    return `<div class="sdg sdg--flow"><ol class="sdg__row">${steps.map(([k, v], i) => `<li class="sdg__node${k === 'Seed' ? ' is-key' : ''}"><span class="sdg__n">${pad(i)}</span><b>${k}</b><span>${v}</span></li>`).join('')}</ol><p class="sdg__back"><span>Evolve의 평가 결과가 다음 Seed가 됩니다</span></p></div>`;
  }
};
blocks.forEach((block, index) => {
  const name = block.t === 'diagram' && block.img.split('/').pop();
  if (DIAGRAMS[name]) variant[index] = (r, b) => `<figure class="diagram diagram--live" aria-label="${html(r, b.text)}">${DIAGRAMS[name]()}<figcaption>${html(r, b.text)}</figcaption></figure>`;
});

export const HOOKS = {
  [route]: {
    hero,
    variant
  }
};
