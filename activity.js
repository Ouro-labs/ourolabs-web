// Real activity records for the home and community pages.
// Sources: Luma events hosted by the team (luma.com/ouroboros-ai) and Jaegyu Lee's LinkedIn posts (linkedin.com/in/q00), collected 2026-10-25.

export const LUMA = {
  calendar: 'https://luma.com/ouroboros-ai',
  embed: 'https://luma.com/embed/calendar/cal-UcLfsoneK88r2uT/events?lt=dark'
};

export const HOME = {
  newsTitle: '소식·활동',
  newsMore: '소식 전체',
  eventsMore: '지난 행사',
  detail: '자세히 보기',
  nextTitle: '다가오는 행사',
  apply: '참가 신청',
  subscribe: '루마 캘린더 구독'
};

// Home sections right under the hero: what we research, and Ouroboros itself.
export const HOME_WORK = {
  title: '지금 풀고 있는 질문',
  more: '연구 프로그램 보기',
  href: '#/research@programs'
};

export const HOME_OUROBOROS = {
  kicker: 'OUROBOROS',
  title: '아우로랩스가 만들고 운영하는 오픈소스 Agent OS',
  body: [
    'Ouroboros는 AI 에이전트에게 일을 맡기기 전에 인터뷰로 목표·범위·완료 기준을 명세(Seed)로 고정합니다. 실행 결과는 그 기준으로 단계마다 평가하고, 채점 기준은 에이전트가 받는 성공 조건과 분리해 둡니다.',
    'Claude Code, Codex CLI, Gemini CLI 등 14개 런타임에서 쓸 수 있고, MIT 라이선스로 공개되어 있습니다. 아우로랩스의 연구·교육·커뮤니티 활동은 모두 이 도구를 실제로 쓰고 고치는 데서 출발합니다.'
  ],
  links: [
    { label: 'ouroboros.is', href: 'https://ouroboros.is' },
    { label: 'GitHub', href: 'https://github.com/Q00/ouroboros' },
    { label: 'Ouroboros 소개', href: '#/ouroboros' }
  ]
};

export const COMMUNITY_PAGE = {
  title: '커뮤니티',
  eyebrow: 'COMMUNITY',
  lead: 'AI와 함께 실제 문제를 풀어 보려는 사람들이 모이는 곳입니다. 처음 AI를 쓰는 분부터 오픈소스 메인테이너까지, 만들고 막히고 다시 실행한 이야기를 나눕니다.',
  blocks: []
};

export const COMMUNITY = {
  statsTitle: '혼자 만드는 것은 없습니다',
  stats: [
    { live: 'events', label: '연 행사', note: '2026년 7월 이후' },
    { live: 'attendees', label: '행사 참석', note: '지난 행사 참석 인원 합계' },
    { live: 'discord', label: '디스코드 멤버', note: 'Discord' },
    { live: 'gh', label: 'Ouroboros GitHub 별', note: 'GitHub' }
  ],
  typesTitle: '여는 모임',
  types: [
    { name: 'OOO Welcome', body: 'AI 입문자와 비전공자가 해결하고 싶은 문제 하나와 노트북을 들고 와서, 우로보로스로 문제를 정리하고 첫 실행까지 해 보는 세 시간 실습입니다.', img: 'welcome2-2026-09' },
    { name: 'OOO Run', body: '이름은 우로보로스 명령어 ooo run에서 왔습니다. 남산에서 함께 걷거나 달리고, 커피를 마시며 막힌 프로젝트를 이야기합니다.', img: 'run1-2026-08' },
    { name: 'Ouroboros 밋업', body: '서울 밋업과 샌프란시스코 Agent Fight Night처럼 하네스와 에이전트의 쟁점을 사용자·메인테이너가 함께 이야기합니다.', img: 'inflearn-meetup-2026-07' },
    { name: '디스코드', body: '우로보로스 디스코드에서 사용법과 막힌 문제를 묻고, 메인테이너 봇이 던지는 토론거리로 이야기를 이어 갑니다.', img: 'discord-2026-08', fit: true }
  ],
  calendarTitle: '행사 캘린더',
  calendarLead: '모든 행사는 루마에서 공지하고 신청을 받습니다.',
  pastTitle: '지난 행사',
  subscribe: '루마 캘린더 구독',
  joinTitle: '소식 받기',
  joinBody: '루마 캘린더를 구독하면 새 행사가 열릴 때 알림을 받습니다.'
};


export const RESEARCH_PROGRAMS = {
  title: '연구 프로그램',
  lead: '네 분야는 각각 하나의 질문에서 출발합니다. 질문마다 방법을 정하고, 그 방법을 실제로 돌아가는 시스템과 논문으로 내놓습니다.',
  labels: { question: '질문', why: '왜 중요한가', method: '접근', outputs: '공개한 결과', ongoing: '진행 중인 과제' },
  items: [
    {
      n: '01', area: '에이전트 실행과 검증', img: 'r-ao-loop',
      question: '에이전트가 "다 했다"고 할 때, 그 말을 무엇으로 믿을 수 있는가.',
      why: '에이전트는 일을 끝내지 않고도 끝냈다고 보고합니다. 사람이 결과를 일일이 다시 확인해야 한다면 자동화의 의미가 사라집니다.',
      method: ['작업을 시작하기 전에 인터뷰로 목표·범위·완료 기준을 명세(Seed)로 고정합니다.', '채점 명령과 기대 결과는 에이전트에게 주는 성공 조건에서 빼고, 단계별 평가를 별도로 돌립니다.', '실패를 분류하고 같은 조건에서 재현해, 실행 경로 자체를 검증 대상으로 삼습니다.'],
      outputs: [
        { name: 'Ouroboros', desc: '인터뷰로 의도를 고정하고 단계별 평가와 예산이 정해진 진화 루프로 실행하는 Agent OS. Claude Code, Codex CLI, Gemini CLI 등 14개 런타임을 지원합니다.', href: 'https://github.com/Q00/ouroboros' },
        { name: 'Argus', desc: '논문의 모든 주장에 질문을 던지고, 각 질문을 증거로 판정하고, 걸러진 우려가 어느 단계에서 왜 탈락했는지 장부에 남기는 리뷰 하네스.', href: 'https://github.com/Q00/argus' },
        { name: 'OpenWarden', desc: '진행 중인 작업을 프로젝트의 정본 방향과 대조해 이탈을 찾고, 근거 없는 완료 보고를 걸러내는 감독 에이전트 프로필.', href: 'https://github.com/Q00/OpenWarden' }
      ],
      ongoing: ['에이전트 실패의 분류: 실행 경로 기반 평가와 결정론적 재현', '장기 작업 에이전트의 계보: 컨텍스트 창 밖에 결정·수정·승인을 남기기']
    },
    {
      n: '02', area: '실행 체계와 공개 규격', img: 'r-rlm-forge',
      question: '모델과 도구가 바뀌어도 무너지지 않는 실행 구조는 어떤 모양인가.',
      why: '새 모델이 나올 때마다 프롬프트와 워크플로를 다시 짜면 쌓이는 것이 없습니다. 바뀌지 않는 층을 따로 세워야 합니다.',
      method: ['재귀 호출은 런타임이 소유하고, 모델은 경계가 정해진 안쪽 호출만 맡깁니다.', '사람의 의도와 도메인 지식을 검사 가능한 실행 계약으로 바꿉니다. 무엇이 실행될 수 있는지, 어떤 권한과 예산이 적용되는지, 결과가 어떤 증거를 가져야 하는지 적습니다.', '앱과 앱 사이의 호출은 서명하고, 대상 앱이 서명한 영수증으로만 완료를 인정합니다.'],
      outputs: [
        { name: 'RLM-FORGE', desc: '재귀 언어모델 실행을 런타임 층으로 끌어올리고, 근거 없는 종합을 거부하는 TraceGuard를 붙인 연구. 논문을 공개했습니다.', href: 'https://github.com/Q00/rlm-forge' },
        { name: 'ContractPlane', desc: '의도 + 도메인 팩 + 환경 → 실행 계약. 에이전트 실행을 통제 가능하게 만드는 계약 층의 백서와 초기 구현.', href: 'https://github.com/Q00/contractplane' },
        { name: 'MeshKit', desc: '앱이 스스로 호출 가능한 기능을 공개하고, 서명된 요청과 사용자 동의, 영수증으로 완료를 증명하는 앱 간 MCP 신뢰 계층.', href: 'https://github.com/Q00/meshkit' }
      ],
      ongoing: ['품질 조건 아래에서 비용을 고려한 오케스트레이션']
    },
    {
      n: '03', area: '도메인 지식과 근거 추적', img: 'r-seed-contract',
      question: '틀리면 안 되는 분야에서 AI의 판단을 근거까지 따라갈 수 있는가.',
      why: '회계·감사·공공 규정에서는 답이 맞는 것만으로 부족합니다. 어느 조항과 어떤 계산에서 나온 판단인지 설명할 수 있어야 쓸 수 있습니다.',
      method: ['규정을 온톨로지와 DSL로 형식화해 실행 가능한 규칙으로 만듭니다.', '판단마다 근거 조항과 계산을 연결해 추적합니다.', '민감정보는 로컬에서 처리하고, 위험을 찾으면 최소 수정 뒤 같은 조건으로 다시 검증해 영수증을 남깁니다.'],
      outputs: [
        { name: '정부 R&D 정산 감사 프레임워크', desc: '개인정보를 보호하면서 AI로 연구비 정산을 검토하는 프레임워크. SSRN에 논문을 공개했습니다.', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6546618' },
        { name: 'FlashPatch', desc: '게임과 영상의 위험한 번쩍임을 찾고, 가장 작은 수정을 적용하고, 같은 조건으로 다시 실행해 결과를 영수증으로 남기는 시각 안전 QA.', href: 'https://github.com/sergiobuilds/flashpatch' }
      ],
      ongoing: ['실행 가능한 규정: 공공 보조금·R&D 회계 규칙의 온톨로지와 DSL', '근거 추적 감사 추론: 판단을 원문 조항과 계산에 연결하기']
    },
    {
      n: '04', area: '인간–AI 협업과 교육', img: 'r-talk',
      question: '막연한 요청은 어떻게 정확한 명세가 되고, 사람은 어디서 판단해야 하는가.',
      why: 'AI를 잘 쓰는 능력은 도구 사용법이 아니라 무엇을 원하는지 말하고 결과를 검수하는 능력입니다. 이 능력은 가르칠 수 있어야 합니다.',
      method: ['소크라테스식 문답으로 "이런 걸 원해요"를 목표·제약·완료 기준이 닫힌 명세로 바꿉니다.', '사람의 승인을 하나의 절차로 다루고, 개입이 결과의 신뢰를 높이는 지점을 찾습니다.', '연구 결과를 강의와 실습으로 옮기고, 결과물과 함께 작업 이력으로 역량을 평가합니다.'],
      outputs: [
        { name: 'Symposium', desc: 'Ouroboros의 인터뷰 층을 떼어 낸 스킬 팩. "무언가를 만들어 줘"를 테스트 가능한 명세로 바꿉니다.', href: 'https://github.com/Q00/Symposium' },
        { name: 'AI Agent Engineering 101', desc: '서울과학기술대학교 2026년 가을학기 정규 강의. 모든 과제를 PR로 제출받아 결과와 함께 작업 과정을 평가합니다.', href: 'https://github.com/Q00/ai-agent-engineering-101' },
        { name: 'Loop Engineering Labs', desc: 'AIFrenz 빌드캠프 시리즈 실습. 실행 → 기록 → 판정 → 수정 → 검증의 미니 루프를 직접 만듭니다.', href: 'https://github.com/Q00/loop-engineering-labs' }
      ],
      ongoing: ['절차로서의 사람 승인: 개입이 AI 결과를 믿게 만드는 지점', '현장 교육에서 응용 AI 역량의 결과 중심 평가']
    }
  ]
};


export const COMMUNITY_MORE = {
  heroTitle: 'AI와 함께 끝까지 만들어 보는 사람들의 자리',
  heroLead: '처음 AI를 쓰는 분부터 오픈소스 메인테이너까지, 실제 문제를 들고 와서 만들고 막히고 다시 실행한 이야기를 얼굴을 보며 나눕니다.',
  arc: ['luma-m1jwy4y0', 'welcome1-2026-08', 'welcome2-2026-09', 'inflearn-meetup-2026-07', 'luma-365itxe4', 'discord-2026-08', 'luma-lhvl4sll'],
  partnersTitle: '함께한 곳',
  partners: [
    { name: 'Biodance', logo: 'biodance.svg' },
    { name: 'Inflearn', logo: 'inflearn.svg' },
    { name: 'Anthropic', logo: 'anthropic.svg' },
    { name: 'OpenAI', logo: 'openai.svg' }
  ],
  eventsTitle: '여는 모임',
  eventsMore: '루마에서 보기',
  events: [
    { name: 'OOO Welcome', body: 'AI 입문자와 비전공자가 해결하고 싶은 문제 하나와 노트북을 들고 와서, 우로보로스로 문제를 정리하고 첫 실행까지 해 보는 세 시간 실습입니다.', img: 'welcome2-2026-09' },
    { name: 'OOO Run', body: '이름은 우로보로스 명령어 ooo run에서 왔습니다. 남산에서 함께 걷거나 달리고, 커피를 마시며 막힌 프로젝트를 이야기합니다.', img: 'run1-2026-08' },
    { name: 'Ouroboros 밋업', body: '서울 밋업과 샌프란시스코 Agent Fight Night처럼 하네스와 에이전트의 쟁점을 사용자와 메인테이너가 함께 이야기합니다.', img: 'inflearn-meetup-2026-07' },
    { name: '디스코드', body: '우로보로스 디스코드에서 사용법과 막힌 문제를 묻고, 메인테이너 봇이 던지는 토론거리로 이야기를 이어 갑니다.', img: 'discord-2026-08', fit: true }
  ],
  waysTitle: '함께하는 방법',
  ways: [
    { title: '행사 함께 열기', body: '공간이나 후원을 제안해 주시면 함께 행사를 엽니다.', href: '#/support', img: 'run1-2026-08-circle' },
    { title: '발표하기', body: '하네스, 에이전트, 실제 업무 자동화 경험을 모임에서 나눠 주세요.', href: '#/join', img: 'inflearn-meetup-2026-07' },
    { title: '디스코드', body: '우로보로스 디스코드에서 사용법과 막힌 문제를 묻습니다.', href: 'https://discord.gg/8cW7Wfxnpu', img: 'discord-2026-08', fit: true }
  ],
};


// Members: facts from each member's LinkedIn, GitHub and the profiles in docs/materials/mindai/04-profile (checked 2026-10-25).
export const PEOPLE_PAGE = {
  maintainersTitle: 'Ouroboros 메인테이너',
  contributorsTitle: '컨트리뷰터',
  contributorsLead: 'Ouroboros에 코드와 문서로 기여한 사람들입니다.',
  contributorsRepo: 'Q00/ouroboros',
  contributorsMore: { label: '전체 기여자 보기', href: 'https://github.com/Q00/ouroboros/graphs/contributors' }
};

export const PEOPLE = [
  {
    name: '이재규', en: 'JaeGyu Lee', handle: 'Q00', photo: 'assets/people/q00.jpg',
    role: '서울과학기술대학교 외래교수 · Quetta Labs 파트너',
    facts: [
      '서울과학기술대학교 「AI Agent Engineering 101」 2026년 가을학기 강의',
      'Quetta Labs(powered by Kakao) 파트너 · 리서치 랩 리드',
      'ZEP 테크리드, 데이원컴퍼니 포도 테크리드, 플랫가든 CTO(오누이 인수)',
      'PPLE 공동창업 — 지정헌혈 요청 4,000건 이상 연결',
      'GDG Golang Korea 오거나이저 · 서울과학기술대학교 데이터사이언스 석사'
    ],
    awards: [
      ['2026', 'OBA Agentic AI Hackathon (Kakao · Hashed)', 'MeshKit 수상'],
      ['2026', 'Ralphthon', '1위 · 이후 심사위원'],
      ['2025.10', 'Google Chrome Built-in AI Challenge 2025', 'Most Valuable Feedback']
    ],
    contribs: [],
    links: [['GitHub', 'https://github.com/Q00'], ['LinkedIn', 'https://www.linkedin.com/in/q00']]
  },
  {
    name: '이상규', en: 'Sanggyu Lee', handle: 'lee3Q', photo: 'assets/people/3q-lee.jpg',
    role: 'Ouro Labs 연구자',
    facts: [
      '인간–AI 협업에서 판단의 근거, 권한의 경계, 대안 검증 연구',
      'Ouroboros zcode 런타임·LLM 백엔드 편입, 오케스트레이터–MCP 경계의 쓰기 증거 검증',
      '연구 도구 codbeing · Pullim · Human30',
      '한성대학교 사회과학부'
    ],
    awards: [],
    contribs: [
      ['oh-my-claudecode', 'https://github.com/Yeachan-Heo/oh-my-claudecode'],
      ['oh-my-codex', 'https://github.com/Yeachan-Heo/oh-my-codex'],
      ['gajae-code', 'https://github.com/Yeachan-Heo/gajae-code'],
      ['opencodex', 'https://github.com/lidge-jun/opencodex']
    ],
    links: [['GitHub', 'https://github.com/lee3Q'], ['LinkedIn', 'https://www.linkedin.com/in/lee39/']]
  },
  {
    name: '이정승', en: 'Sergio Lee', handle: 'sergiobuilds', photo: 'assets/people/sergiobuilds.jpg',
    role: '미국공인회계사(U.S. CPA)',
    facts: [
      '정부 R&D·국고보조금 정산과 규정 형식화, 근거 추적형 검증 연구',
      'University of Colorado Boulder 컴퓨터과학 석사과정 · 도쿄대학 Matsuo-Iwasawa Lab AI 과정',
      '고려대학교 경제학·중어중문학'
    ],
    awards: [
      ['2026.09', 'Snowflake CoCo CLI Hackathon 2026 (Global)', '3rd Runner-up'],
      ['2026.06', 'OBA AI Hackathon (Weekendthon)', '1st Runner-up'],
      ['2026.05', 'Build Together Hackathon', '1st Runner-up']
    ],
    contribs: [],
    links: [['GitHub', 'https://github.com/sergiobuilds'], ['LinkedIn', 'https://www.linkedin.com/in/sergiobuilds']]
  }
];

