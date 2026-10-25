// Ouroboros: the lab's open-source workflow. Copy follows ouroboros.is (main, about, core, desktop, news, roadmap; read 2026-10-25).
import { PAGES } from '../content.js';
import { esc } from '../render.js';
import { ghStars, discordCount, DISCORD } from '../live.js';

const O = {
  title: 'Ouroboros',
  eyebrow: 'OUROBOROS · OURO LABS',
  headline: 'Ouroboros는<br>당신의 의도입니다.',
  lead: '병목은 AI의 능력이 아니라, 인간의 명확함입니다.',
  links: [
    { label: 'ouroboros.is', href: 'https://ouroboros.is', primary: true },
    { label: 'GitHub', href: 'https://github.com/Q00/ouroboros' },
    { label: '문서', href: 'https://ouroboros.page/learn/' }
  ],
  mission: {
    kicker: '미션',
    title: '기계가 아니라, 사람을 고칩니다.',
    lead: 'Ouro Labs는 당신이 말한 것이 아니라, 의도한 것을 진화시키는 오픈소스 워크플로우를 만듭니다.',
    body: [
      '자신의 꼬리를 삼키는 뱀, 우로보로스는 수 세기 동안 연금술사들에게 갱신의 상징이었습니다. 진정으로 끝나는 것은 없으며, 모든 것은 다음 시작의 양분이 됩니다.',
      '우리는 소프트웨어를 같은 방식으로 만듭니다. 모든 답은 그것을 만든 질문으로 되돌아갑니다. 모든 실행은 평가를 남기고, 모든 평가는 다음 세대를 키웁니다.'
    ],
    coda: '루프는 반복이 아니라, 정제입니다.',
    caption: '우로보로스 용, 연금술 판화 — Lucas Jennis, 1625'
  },
  principles: {
    title: '바뀌지 않는 것',
    lead: '모델, 런타임, 채널이 바뀌어도 남는 작업 루프입니다.',
    items: [
      ['I', '명확함이 먼저', '일은 사람이 무엇을 뜻하는지 찾는 데서 시작합니다. 프롬프트는 아직 명세가 아닙니다.'],
      ['II', '실제 검증', '결과는 선언한 기준을 통과해야 합니다. 그럴듯해 보이는 것은 검증 방법이 아닙니다.'],
      ['III', '남는 것', '다음 실행은 빈 페이지에서 시작하지 않습니다. 지난 실행의 쓸모 있는 부분을 물려받습니다.']
    ]
  },
  loop: {
    title: '제품 루프',
    lead: '다섯 단계가 의도를 검증하고 다시 쓸 수 있는 일로 바꿉니다. 각 단계는 다음 실행이 물려받을 것을 남깁니다.',
    stages: [['Interview', '의도와 빠진 결정을 찾습니다'], ['Seed', '합의한 명세를 적습니다'], ['Execute', '명세가 요구하는 일을 합니다'], ['Evaluate', '결과를 기준과 대조합니다'], ['Evolve', '증거를 다음 버전으로 넘깁니다']],
    back: '평가가 다음 Seed를 바꿉니다',
    keeps: [['Seed', '기록된 의도'], ['Workflow', '통한 경로'], ['Evaluation', '결정의 근거'], ['Lineage', '무엇이 왜 바뀌었는지']]
  },
  products: {
    title: '제품',
    items: [
      { name: 'Ouroboros Core', tag: '오픈소스 엔진', body: 'Ouroboros for ChatGPT를 움직이는 오픈소스 엔진. Question → Spec → Run → Evaluate → Evolve.', link: { label: 'GitHub에서 보기', href: 'https://github.com/Q00/ouroboros' }, repo: 'Q00/ouroboros' },
      { name: 'Ouroboros for ChatGPT', tag: '데스크톱', body: '당신의 데스크톱 위, 진화하는 루프. 프롬프트 대신 질문에서 시작합니다. Windows용과 macOS Apple Silicon 프리뷰를 제공합니다.', link: { label: '시작하기', href: 'https://ouroboros.is/#/desktop' } }
    ],
    runtime: 'Ouroboros는 이미 여러 런타임에서 동작합니다. ChatGPT는 공개 진입점 중 하나이며, Kiro, Claude Code, Codex, Gemini, Copilot CLI 등 지원 환경에서 같은 명세와 평가의 규율이 이어집니다.'
  },
  who: {
    title: '누구를 위한 도구인가',
    items: [
      ['맡길 맥락이 있는 사람', '이미 비서나 동료, 외부 전문가에게 일을 맡기는 데 시간과 비용을 쓰는 대표와 운영자.'],
      ['반복되는 일이 있는 사람', '답장과 문서, 판단이 본업의 시간을 계속 가져가는 자문가와 서비스 제공자.'],
      ['데모 이상이 필요한 사람', '여러 도구를 써 봤지만 두 번째 검토를 견디고 다시 쓸 수 있는 결과가 필요한 사람.']
    ]
  },
  roadmap: {
    title: '로드맵',
    lead: '접근에서 시작해 반복 사용으로, 그 다음에 관리형과 기업용 제공으로 넓힙니다.',
    href: 'https://ouroboros.is/roadmap/',
    items: [
      ['NOW', '오픈 코어', '지원 런타임 전반에서 명세·평가·계보 워크플로를 공개하고 쓸모 있게 유지합니다.', '공개 소스와 런타임 가이드'],
      ['NOW', '공개 진입점', '이미 쓰는 도구에서 Ouroboros 루프를 시작할 수 있게 합니다. ChatGPT 데스크톱부터 시작합니다.', 'Windows · Apple Silicon 배포'],
      ['NEXT', '코딩 밖의 일', '자신의 자료와 업무 맥락을 반복 업무를 위한 개인 시스템으로 바꿀 수 있는지 시험합니다.', '첫 실제 과제와 재사용'],
      ['NEXT', '관리형 설정', '초기 사용자가 의도를 찾고 첫 워크플로를 세워 일상적 사용으로 다듬도록 돕습니다.', '반복 가능한 제공 방식'],
      ['LATER', '상시·통제형 제공', '상시 운영, 데이터 경계, 승인, 감사 기록, 서비스 약정을 고객이 필요로 할 때 더합니다.', '고객 수요와 운영 경제성']
    ]
  },
  related: {
    title: '아우로랩스와 Ouroboros',
    items: [
      { name: '연구', body: '에이전트 실행과 검증', href: '#/research@program-01' },
      { name: 'OOO Seed', body: 'Interview · Seed · Run · Evaluate · Evolve', href: '#/seed' },
      { name: '커뮤니티', body: 'OOO Welcome · OOO Run · 밋업', href: '#/community' },
      { name: '디스코드', body: 'Ouroboros 서버', href: DISCORD.invite }
    ]
  },
  note: 'Ouroboros는 오픈소스 개발자 도구이며, 어떤 암호화폐나 토큰과도 관련이 없습니다.'
};

PAGES['/ouroboros'] = { title: O.title, eyebrow: O.eyebrow, lead: O.lead, blocks: [] };

const ext = href => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
const btn = (l, cls = 'btn') => '<a class="' + cls + (l.primary ? ' btn--primary' : '') + '" href="' + esc(l.href) + '"' + ext(l.href) + '>' + esc(l.label) + '</a>';

const hero = () => '<section class="hero ouro-hero"><div class="field" aria-hidden="true"></div><div class="wrap"><img class="ouro-hero__mark" src="assets/ouroboros/logo-snake.png" alt="" width="385" height="240"><div class="kicker">' + esc(O.eyebrow) + '</div><h1 tabindex="-1">' + O.headline + '</h1><p class="lead">' + esc(O.lead) + '</p><div class="button-row">' + O.links.map(l => btn(l)).join('') + '</div></div></section>';

const stats = () => '<section class="ouro-stats"><div class="wrap"><dl><div><dt>GitHub 별</dt><dd>' + ghStars('Q00/ouroboros') + '</dd></div><div><dt>디스코드 멤버</dt><dd>' + discordCount('members', { suffix: '명' }) + '</dd></div><div><dt>라이선스</dt><dd>MIT</dd></div><div><dt>런타임</dt><dd class="ouro-stats__rt">Claude Code · Codex · Gemini · Kiro · Copilot CLI</dd></div></dl></div></section>';

const mission = () => { const m = O.mission; return '<section class="sec rv ouro-mission"><div class="wrap ouro-mission__grid"><figure><img src="assets/ouroboros/engraving.png" alt="' + esc(m.caption) + '" loading="lazy" width="470" height="479"><figcaption>' + esc(m.caption) + '</figcaption></figure><div><span class="kicker">' + esc(m.kicker) + '</span><h2 class="h2">' + esc(m.title) + '</h2><p class="lead">' + esc(m.lead) + '</p>' + m.body.map(p => '<p>' + esc(p) + '</p>').join('') + '<p class="ouro-mission__coda">' + esc(m.coda) + '</p></div></div></section>'; };

const principles = () => { const p = O.principles; return '<section class="sec rv"><div class="wrap"><div class="sec-head"><div><h2 class="h2">' + esc(p.title) + '</h2><p class="lead">' + esc(p.lead) + '</p></div></div><div class="ouro-principles">' + p.items.map(([n, t, b]) => '<article><span>' + n + '</span><h3>' + esc(t) + '</h3><p>' + esc(b) + '</p></article>').join('') + '</div></div></section>'; };

const loop = () => { const l = O.loop; return '<section class="sec rv ouro-loop"><div class="wrap"><h2 class="h2">' + esc(l.title) + '</h2><p class="lead">' + esc(l.lead) + '</p><figure class="oloop" aria-label="Interview → Seed → Execute → Evaluate → Evolve"><ol class="oloop__row">' + l.stages.map(([k, v], i) => '<li class="oloop__node' + (k === 'Seed' ? ' is-key' : '') + '"><span class="oloop__n">' + String(i + 1).padStart(2, '0') + '</span><b>' + k + '</b><span>' + esc(v) + '</span></li>').join('') + '</ol><p class="oloop__back"><span>' + esc(l.back) + '</span></p><dl class="oloop__keeps">' + l.keeps.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + esc(v) + '</dd></div>').join('') + '</dl></figure></div></section>'; };

const products = () => { const p = O.products; return '<section class="sec rv"><div class="wrap"><h2 class="h2">' + esc(p.title) + '</h2><div class="ouro-products">' + p.items.map(it => '<article><div class="ouro-products__top"><span class="kicker">' + esc(it.tag) + '</span>' + (it.repo ? '<span class="ouro-products__stars">' + ghStars(it.repo, { prefix: '★ ' }) + '</span>' : '') + '</div><h3>' + esc(it.name) + '</h3><p>' + esc(it.body) + '</p>' + btn(it.link) + '</article>').join('') + '</div><p class="ouro-runtime">' + esc(p.runtime) + '</p></div></section>'; };

const who = () => { const w = O.who; return '<section class="sec rv"><div class="wrap"><h2 class="h2">' + esc(w.title) + '</h2><div class="ouro-who">' + w.items.map(([t, b], i) => '<div class="ouro-who__row"><span>' + String(i + 1).padStart(2, '0') + '</span><h3>' + esc(t) + '</h3><p>' + esc(b) + '</p></div>').join('') + '</div></div></section>'; };

const roadmap = () => { const r = O.roadmap; return '<section class="sec rv"><div class="wrap"><div class="sec-head"><div><h2 class="h2">' + esc(r.title) + '</h2><p class="lead">' + esc(r.lead) + '</p></div>' + btn({ label: '전체 로드맵', href: r.href }) + '</div><ol class="ouro-road">' + r.items.map(([phase, t, b, gate]) => '<li class="ouro-road__item is-' + phase.toLowerCase() + '"><span class="ouro-road__phase">' + phase + '</span><h3>' + esc(t) + '</h3><p>' + esc(b) + '</p><small>' + esc(gate) + '</small></li>').join('') + '</ol></div></section>'; };

const related = () => { const r = O.related; return '<section class="sec rv"><div class="wrap"><h2 class="h2">' + esc(r.title) + '</h2><div class="ouro-related">' + r.items.map(it => '<a href="' + esc(it.href) + '"' + ext(it.href) + '><b>' + esc(it.name) + '</b><span>' + esc(it.body) + '</span><i aria-hidden="true">→</i></a>').join('') + '</div><p class="ouro-note">' + esc(O.note) + '</p></div></section>'; };

export const HOOKS = { '/ouroboros': { page: () => hero() + stats() + mission() + principles() + loop() + products() + who() + roadmap() + related() } };
export const OUROBOROS = O;

