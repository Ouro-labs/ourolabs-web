// 행사·소식 게시판 데이터. 관리자는 이 파일의 EVENTS 또는 NEWS 배열 맨 앞에 항목 하나를 추가하면 됩니다.
// 목록, 상세 페이지(#/event/<slug>, #/news/<slug>), 홈 소식 타일이 이 데이터로 자동으로 만들어집니다.
//
// 공통 필드
//   slug     주소에 쓰는 영문 식별자 (중복 금지)
//   date     'YYYY.MM.DD' 또는 'YYYY.MM'
//   title    제목
//   summary  목록과 타일에 쓰는 한두 문장 요약 (객관적 서술: 무엇을, 언제, 어디서, 몇 명이)
//   body     상세 페이지 본문 문단 배열
//   image    대표 이미지 경로 (assets/... 기준)
//   sources  원문 링크 배열 [{ label, href }] — 상세 페이지 하단에 작게 표시
// 행사 전용 필드
//   time, place, address, attendees, program(배열), partners(배열), upcoming(true면 다가오는 행사)
// 소식 전용 필드
//   kind     '강의' | '오픈소스' | '논문' | '백서' | '커뮤니티' 등

export const EVENTS = [
  {
    slug: 'ooo-welcome-2026-11', upcoming: true,
    date: '2026.11.01', time: '14:00–17:00', place: '뷰티셀렉션', address: '서울 강남구 테헤란로 311',
    title: 'OOO Welcome NOV | 에이전틱 워크플로우',
    summary: '비개발자와 AI 입문자가 우로보로스로 작은 웹페이지나 업무 도구를 직접 만들고 검증해 보는 세 시간 실습입니다.',
    body: [
      '만들고 싶은 것이 있는 비개발자, AI가 만든 결과를 어떻게 확인해야 할지 궁금한 참가자를 위한 실습입니다. 우로보로스 사용법과 함께 최근 에이전틱 워크플로우의 흐름을 다룹니다.',
      '참가자는 아이디어를 만들 수 있는 크기로 정리하고, 만들기 전에 확인 기준을 정한 뒤, AI와 함께 결과물을 만들고 기준과 비교해 고칩니다. MCP로 도구를 연결하는 방법과 Skills로 반복 절차를 정리하는 방법도 실습에 맞춰 소개합니다.'
    ],
    program: ['아이디어를 만들 수 있는 크기로 정리하기', '만들기 전에 확인 기준 정하기', 'AI와 함께 실제로 만들기', '실행하고 기준과 비교해 고치기'],
    partners: ['바이오던스 (공간 지원)'],
    image: 'scenes/luma-nonv018w.jpg',
    sources: [{ label: '루마 신청 페이지', href: 'https://luma.com/nonv018w' }]
  },
  {
    slug: 'agent-fight-night-sf-2026-10',
    date: '2026.10.12', time: '20:00 (PDT)', place: '샌프란시스코',
    title: 'Ouroboros × OpenCodex: Agent Fight Night',
    summary: 'Ouroboros와 OpenCodex 메인테이너가 샌프란시스코에서 연 밋업입니다. 당일 공지하고 당일 저녁에 모였습니다.',
    body: [
      '두 오픈소스 프로젝트(Ouroboros, OpenCodex)의 메인테이너가 샌프란시스코를 방문한 기간에 창업자, 투자자, 개발자, 메인테이너를 대상으로 연 밋업입니다.',
      '정해진 발표 없이 참가자들이 프로젝트와 문제를 직접 이야기하는 방식으로 진행했습니다.'
    ],
    image: 'scenes/luma-lhvl4sll.jpg',
    sources: [{ label: '루마 행사 페이지', href: 'https://luma.com/lhvl4sll' }]
  },
  {
    slug: 'ooo-welcome-2-2026-09',
    date: '2026.09.13', time: '15:00–18:00', place: '뷰티셀렉션', attendees: '78명',
    title: 'OOO Welcome #2 | AI를 내 일에 붙이는 세 시간',
    summary: '참가자 78명이 각자의 실제 과제 하나를 가져와 우로보로스로 결과가 나올 때까지 실행했습니다.',
    body: [
      '첫 번째 Welcome이 우로보로스를 설치하고 처음 실행해 보는 자리였다면, 두 번째 세션은 참가자가 실제로 해야 할 일 하나를 가져와 결과가 나올 때까지 반복하는 데 초점을 두었습니다.',
      '처음 온 참가자는 설치와 첫 실행부터 시작했고, 이미 사용해 본 참가자는 업무·사업·연구 과제를 바로 실행했습니다. 첫 결과를 받고 끝내지 않고, 원하는 결과와의 차이를 확인해 조건을 고치고 다시 실행했습니다.'
    ],
    program: ['문제 가져오기', '질문받기', '실행하기', '결과 확인하기', '조건 고치기', '다시 실행하기'],
    image: 'scenes/welcome2-2026-09.jpg',
    gallery: ['scenes/luma-37kr78y0.jpg'],
    sources: [{ label: '루마 행사 페이지', href: 'https://luma.com/37kr78y0' }]
  },
  {
    slug: 'ooo-run-2-2026-09',
    date: '2026.09.05', time: '15:00–17:30', place: '국립극장 광장 집합 · 남산 둘레길', attendees: '10명',
    title: 'OOO Run #2 | 남산 초가을 루프',
    summary: '창업자, 인디해커, AI 빌더가 남산 둘레길 3–5km를 걷거나 달린 뒤 진행 중인 프로젝트를 이야기했습니다.',
    body: [
      'OOO Run은 우로보로스 명령어 ooo run에서 이름을 가져온 모임입니다. 발표나 피치 없이 함께 걷거나 달리고, 이후 카페에서 지금 만들고 있는 것과 막힌 지점을 이야기합니다.',
      '참가자는 각자의 속도로 약 3–5km를 이동했고, 마무리 전에 다음에 실행할 한 가지를 정했습니다. 한국어와 영어로 진행했습니다.'
    ],
    program: ['15:00 오프닝과 소개', '15:10 남산 둘레길 러닝·걷기', '16:40 커피와 빌더 대화', '17:00 마무리'],
    image: 'scenes/luma-m1jwy4y0.jpg',
    sources: [{ label: '루마 행사 페이지', href: 'https://luma.com/m1jwy4y0' }]
  },
  {
    slug: 'ooo-welcome-1-2026-08',
    date: '2026.08.23', time: '15:00–18:00', place: '로컬호스트 Web3', attendees: '33명',
    title: 'OOO Welcome #1 | Build What Matters',
    summary: 'AI 입문자와 비전공자 33명이 우로보로스를 처음 설치하고, 각자의 문제를 인터뷰로 정리해 첫 실행안을 만들었습니다.',
    body: [
      '비전공자와 AI 입문자가 자신의 실제 문제를 AI와 함께 풀어 보는 첫 실습 모임입니다. 주제는 "무엇을 만들 것인지 정하는 일"이었습니다.',
      '참가자는 노트북에 우로보로스를 설치하고, 인터뷰를 따라가며 해결할 문제를 구체화한 뒤 실행 가능한 과제로 바꿨습니다. 업무 자동화, 매출, 개인 브랜딩, 취업 준비 등 다양한 주제가 나왔습니다.'
    ],
    program: ['생각하기', '질문받기', '문제 정의하기', '실행하기', '결과 돌아보기'],
    image: 'scenes/welcome1-2026-08.jpg',
    gallery: ['scenes/luma-n9y9mh1h.jpg'],
    sources: [{ label: '루마 행사 페이지', href: 'https://luma.com/n9y9mh1h' }]
  },
  {
    slug: 'ooo-run-1-2026-08',
    date: '2026.08.08', time: '19:00–21:30', place: '국립극장 광장 집합 · 남산 둘레길', attendees: '30명',
    title: 'OOO Run #1 | 남산 서머 나이트 루프',
    summary: '첫 OOO Run에 30명이 참여해 남산 둘레길을 함께 걷거나 달리고 카페에서 프로젝트를 이야기했습니다.',
    body: [
      '창업자, 인디해커, AI 빌더, 크리에이터, 오픈소스 메인테이너가 모인 첫 OOO Run입니다. 참가자는 각자의 속도로 약 3–5km를 이동했고, 희망자는 플로깅에 참여했습니다.',
      '이후 카페에서 진행 중인 프로젝트를 이야기했고, 원하는 참가자는 우로보로스를 설치해 첫 ooo run을 실행했습니다.'
    ],
    program: ['19:00 오프닝과 소개', '19:20 남산 둘레길 러닝·걷기', '20:30 커피와 인디해커 서클', '21:30 마무리'],
    partners: ['Wendy’s Healing Recipe', '국제인공지능협회', '국제ESG인권협회'],
    image: 'scenes/run1-2026-08.jpg',
    gallery: ['scenes/run1-2026-08-circle.jpg', 'scenes/luma-365itxe4.jpg'],
    sources: [{ label: '루마 행사 페이지', href: 'https://luma.com/365itxe4' }]
  },
  {
    slug: 'ouroboros-meetup-2026-07',
    date: '2026.07.31', attendees: '70명',
    title: 'Ouroboros 밋업',
    summary: '참가자 70명의 사전 질문에서 다섯 가지 주제를 골라 하네스와 에이전트 운영에 대해 답했습니다.',
    body: [
      '참가자 설문에서 많이 나온 질문 다섯 가지를 골라 메인테이너가 답하는 방식으로 진행했습니다.',
      '하네스를 어떻게 써야 하는지, 새 모델이 나와도 유지되는 작업 환경을 어떻게 만드는지 등 Ouroboros를 실제로 쓰는 사람들이 부딪히는 문제를 다뤘습니다.'
    ],
    image: 'scenes/inflearn-meetup-2026-07.jpg',
    sources: []
  }
];

export const NEWS = [
  {
    slug: 'ai-agent-engineering-101-2026', kind: '강의', date: '2026.09',
    title: 'AI Agent Engineering 101 개강',
    summary: '서울과학기술대학교 2026년 2학기 15주 정규 강의를 시작했습니다. 강의 자료를 공개하고 과제를 PR로 받습니다.',
    body: [
      '에이전트와 하네스, 다중 에이전트 통신, 계약과 검증을 다루는 15주 강의입니다. 강의 노트는 공개 저장소에 주차별로 올라갑니다.',
      '모든 과제는 GitHub 풀 리퀘스트로 제출합니다. PR 시각은 서버에 기록되어 마감 판정에 쓰이고, 커밋 이력은 결과와 함께 작업 과정을 평가하는 근거가 됩니다.'
    ],
    image: 'img/r-seoultech.jpg',
    sources: [{ label: 'GitHub', href: 'https://github.com/Q00/ai-agent-engineering-101' }]
  },
  {
    slug: 'claude-for-open-source-2026', kind: '오픈소스', date: '2026.09',
    title: 'Ouroboros, Anthropic Claude for Open Source 지원 대상 선정',
    summary: 'Anthropic의 오픈소스 메인테이너 지원 프로그램 대상으로 선정되었습니다.',
    body: ['Anthropic이 오픈소스 메인테이너와 기여자를 지원하는 Claude for Open Source 프로그램 대상으로 Ouroboros 메인테이너가 선정되었습니다. 당시 Ouroboros의 일일 실사용자는 1,000명을 넘어서고 있었습니다.'],
    image: 'img/r-claude-oss.jpg',
    sources: [{ label: 'Ouroboros GitHub', href: 'https://github.com/Q00/ouroboros' }]
  },
  {
    slug: 'argus-release-2026', kind: '오픈소스', date: '2026.08',
    title: 'Argus 공개',
    summary: '논문의 모든 주장에 질문을 던지고 증거로 판정하며, 걸러진 우려의 탈락 이유까지 장부에 남기는 리뷰 하네스를 공개했습니다.',
    body: ['Argus는 논문 패키지를 한 번에 검토하고 감사 기록을 남깁니다. 모든 문장 단위 주장에 질문이 붙었는지(범위), 프롬프트·정책·모델이 실행 중 바뀌지 않았는지(출처), 걸러진 우려가 어느 단계에서 왜 탈락했는지(손실)를 장부에서 확인할 수 있습니다.'],
    image: 'img/r-gh-argus.jpg',
    sources: [{ label: 'GitHub', href: 'https://github.com/Q00/argus' }]
  },
  {
    slug: 'contractplane-whitepaper-2026', kind: '백서', date: '2026.07',
    title: 'ContractPlane 백서 공개',
    summary: '사람의 의도와 도메인 지식을 검사 가능한 실행 계약으로 바꾸는 계약 층의 백서와 v0.1을 공개했습니다.',
    body: ['ContractPlane은 의도 + 도메인 팩 + 환경을 실행 계약으로 바꾸는 구조입니다. 실행 계약에는 무엇이 실행될 수 있는지, 작업을 어떻게 나누는지, 어떤 권한과 예산이 적용되는지, 결과가 어떤 증거를 가져야 하는지가 담깁니다. v0.1은 도메인 팩 컴파일러와 실험적 상태 전이 커널을 포함합니다.'],
    image: 'img/r-seed-contract.jpg',
    sources: [{ label: 'GitHub', href: 'https://github.com/Q00/contractplane' }]
  },
  {
    slug: 'codex-for-open-source-2026', kind: '오픈소스', date: '2026.06',
    title: 'Ouroboros, OpenAI Codex for Open Source 지원 대상 선정',
    summary: 'OpenAI의 오픈소스 메인테이너 지원 프로그램 대상으로 선정되었습니다.',
    body: ['OpenAI가 오픈소스 프로젝트 유지·관리를 지원하는 Codex for Open Source 프로그램 대상으로 Ouroboros 메인테이너가 선정되었습니다.'],
    image: 'img/r-codex-oss.jpg',
    sources: [{ label: 'Ouroboros GitHub', href: 'https://github.com/Q00/ouroboros' }]
  },
  {
    slug: 'meshkit-release-2026', kind: '오픈소스', date: '2026.05',
    title: 'MeshKit 공개',
    summary: '앱이 호출 가능한 기능을 공개하고, 서명된 요청과 사용자 동의, 영수증으로 완료를 증명하는 앱 간 MCP 신뢰 계층을 공개했습니다.',
    body: ['MeshKit은 세 가지 원칙에서 출발합니다. 대상 앱이 검증·동의·실행·영수증을 소유하고, 모든 호출은 서명되며, 완료는 원래 요청과 연결된 대상 앱의 서명 영수증으로만 인정합니다.'],
    image: 'img/r-gh-meshkit.jpg',
    sources: [{ label: 'GitHub', href: 'https://github.com/Q00/meshkit' }]
  },
  {
    slug: 'rlm-forge-paper-2026', kind: '논문', date: '2026.04',
    title: 'RLM-FORGE 논문 공개',
    summary: '재귀 언어모델 실행을 런타임 층으로 끌어올리고, 근거 없는 종합을 거부하는 TraceGuard를 붙인 연구를 공개했습니다.',
    body: ['RLM-FORGE에서는 재귀 호출을 Ouroboros 런타임이 소유하고, 모델은 경계가 정해진 안쪽 호출만 수행합니다. TraceGuard는 근거가 없는 종합 결과를 거부합니다. 논문과 구현을 함께 공개했습니다.'],
    image: 'img/r-rlm-forge.jpg',
    sources: [{ label: 'GitHub', href: 'https://github.com/Q00/rlm-forge' }, { label: '논문 PDF', href: 'https://github.com/Q00/rlm-forge/blob/main/paper/main.pdf' }]
  },
  {
    slug: 'ouroboros-discord-2026', kind: '커뮤니티', date: '2026.03',
    title: 'Ouroboros 디스코드 개설',
    summary: '사용자와 메인테이너가 사용법과 문제를 나누는 디스코드 서버를 열었습니다.',
    body: ['Ouroboros 디스코드에서는 사용법 질문, 막힌 문제, 메인테이너 봇이 제시하는 토론 주제를 다룹니다.'],
    image: 'scenes/discord-2026-08.jpg',
    sources: [{ label: '디스코드 참여', href: 'https://discord.gg/8cW7Wfxnpu' }]
  },
  {
    slug: 'ouroboros-release-2026', kind: '오픈소스', date: '2026.01',
    title: 'Ouroboros 공개',
    summary: '인터뷰로 의도를 고정하고 단계별 평가와 예산이 정해진 진화 루프로 실행하는 Agent OS를 오픈소스로 공개했습니다.',
    body: ['Ouroboros는 작업 전에 인터뷰로 목표·범위·완료 기준을 명세(Seed)로 고정하고, 채점 기준을 에이전트에게 주는 성공 조건에서 분리한 채 단계별 평가와 진화 루프로 실행합니다. Claude Code, Codex CLI, Gemini CLI 등 14개 런타임을 지원합니다.'],
    image: 'img/r-ouroboros.jpg',
    sources: [{ label: 'GitHub', href: 'https://github.com/Q00/ouroboros' }, { label: 'ouroboros.is', href: 'https://ouroboros.is' }]
  }
];

export const BOARD = {
  eventsTitle: '행사', newsTitle: '소식', back: '목록으로', sourcesTitle: '원문',
  labels: { date: '일시', place: '장소', address: '주소', attendees: '참석', program: '진행', partners: '함께한 곳', kind: '구분' },
  upcoming: '예정'
};

