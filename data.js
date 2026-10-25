// Image slots. Abstract imagery stays on the original set; r-* are real artifacts used where something real exists
// (research programs and news items).
export const AREA_IMG = ['glass', 'plates', 'ledger', 'hall'];
export const WORK_IMG = ['loop', 'nested', 'hall'];
export const HERO_IMG = {
  '/': 'horizon',
  '/research': ['specs', 'glass', 'nested', 'rings', 'loop', 'plates', 'ledger'],
  '/education': ['workbench', 'hall', 'specs'],
  '/collaboration': ['plates', 'workbench'],
  '/business': ['ledger', 'specs'],
  '/global': ['horizon', 'loop'],
  '/startups': ['ring', 'plates', 'horizon'],
  '/ventures': ['ring', 'plates', 'horizon']
};
export const PHASE_IMG = ['specs', 'chairs', 'glass', 'loop', 'ledger', 'rings', 'workbench'];
export const phaseImg = (route, i) => PHASE_IMG[i % PHASE_IMG.length];

// Documents and screens are shown whole on their own paper colour instead of being cropped like photos.
export const DOC_IMG = {
  'r-ao-loop': '#ffffff', 'r-subagents': '#fdfcf6', 'r-capability-graph': '#f6f6f8', 'r-seed-contract': '#fbf8f3',
  'r-eval-dashboard': '#ffffff', 'r-claude-oss': '#ffffff', 'r-codex-oss': '#ffffff', 'r-seoultech': '#ffffff',
  'r-gh-argus': '#ffffff', 'r-gh-meshkit': '#ffffff', 'r-ouroboros-mcp': '#ffffff', 'r-wonder-loop': '#000000',
  'r-ooo-setup': '#0d1117', 'r-ooo-interview': '#0d1117', 'r-host-codex': '#0d1117', 'r-run-log': '#1e1f24'
};
