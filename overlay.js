export const ADDITIONS = [
];

export const OVERLAY = [
  { route: '/business', from: '확장하는 사업 구상입니다.', to: '확장하는 사업입니다.', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '*', from: '가설을 검증하는 창업 지원 구상입니다.', to: '가설을 검증하는 창업 지원입니다.', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/education/startup', from: '가설을 검증하는 창업 지원 구상.', to: '가설을 검증하는 창업 지원.', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/collaboration', from: '이어 가는 협력 구상입니다.', to: '이어 가는 협력입니다.', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/join/connect', from: '투자 검토, 포트폴리오 지원 (구상)', to: '투자 검토, 포트폴리오 지원', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/startups', from: '연결하는 네트워크 구상입니다.', to: '연결하는 네트워크입니다.', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/join', from: '추후 안내', to: '하단 문의 채널', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/research', from: '별도 안내', to: '진행 중', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '/seed', from: '별도 안내', to: '문의 채널', reason: 'R8; 단서 표현 제거 (Sergio 2026-10-25).' },
  { route: '*', from: '#/seed@support', to: '#/support', reason: 'R7; 후원 moved to its own page (Sergio 2026-10-25).' },
  { route: '/join', from: '#/research@open', to: '#/research@programs', reason: 'R7; 공개 작업 merged into 연구 프로그램 (Sergio 2026-10-25).' },
  {
    route: '/education',
    from: '모든 과제는 공개 저장소에 제출하며',
    to: '과제는 참여자가 동의한 범위에서 공유하며',
    reason: 'R6; content.js:81; facts.md:31 — participants choose their disclosure scope.'
  }
];
export const REMOVE = [
  { route: '/join', from: 'contact@ourolabs.ai', reason: 'R1; content.js:245; facts.md:15 — unverified email and its mailto label.' },
  { route: '/join', from: 'seed@ourolabs.ai', reason: 'R1; content.js:245; facts.md:15 — unverified email and its mailto label.' },
  { route: '/join', from: 'partner@ourolabs.ai', reason: 'R1; content.js:245; facts.md:15 — unverified email and its mailto label.' },
  { route: '/seed', from: 'seed@ourolabs.ai', reason: 'R1; content.js:312; facts.md:15 — unverified email and its mailto label.' },
  { route: '/seed', from: 'research@ourolabs.ai', reason: 'R1; content.js:312; facts.md:15 — unverified email and its mailto label.' },
  { route: '/seed', from: 'hello@ourolabs.ai', reason: 'R1; content.js:312; facts.md:15 — unverified email and its mailto label.' }
];

export const STRINGS = {
  contact: { mail: 'jeongseung.lee@ourolabs.ai' },
  band: { title: '공개 저장소', body: '공개 작업은 GitHub에서 확인할 수 있습니다.', btn: 'Ouroboros GitHub' },
  cta: { text: '근본에서 시작된 변화가,<br>시대를 움직인다', btn: '참여 경로', joinBtn: '문의 채널' },
  pill: { live: '운영 중', pub: '공개', prep: '진행 중', plan: '', none: '', advanced: '자료 공개' },
  ui: {
    prev: '이전', next: '다음', menu: '전체 메뉴', source: '원문 보기', applySoon: '신청 문의',
    empty: '조건에 맞는 항목이 없습니다.', skip: '본문 바로가기', close: '닫기', home: 'OURO LABS 홈',
    notFoundTitle: '페이지를<br>찾을 수 없습니다', notFoundBody: '주소가 바뀌었거나 없는 페이지입니다.',
    toHome: '홈으로', noscript: '이 사이트는 JavaScript가 필요합니다.'
  },
  nav: { about: '기관', research: '연구', education: '교육', collab: '협력·사업', community: '커뮤니티', ventures: '창업·투자', join: '참여' },
  meta: { title: 'OURO LABS', desc: 'AI의 본질을 밝히고, 다음 시대의 기준을 세운다.' }
};

export function applyOverlay(route, text) {
  // Section eyebrows read 'RESEARCH', not '02. RESEARCH'.
  let result = String(text ?? '').replace(/^\d{2}\. (?=[A-Z])/, '');
  for (const entry of REMOVE) {
    if (entry.route === route || entry.route === '*') result = result.replaceAll(entry.from, '');
  }
  for (const entry of OVERLAY) {
    if (entry.route === route || entry.route === '*') result = result.replaceAll(entry.from, entry.to);
  }
  return result;
}
