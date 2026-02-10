// EcoQuest 목업 데이터

// ============================================================
// SVG 아이콘 라이브러리
// ============================================================

// 희귀도별 기본 색상
const RARITY_COLORS = {
  common: '#4CAF50',
  uncommon: '#2196F3',
  rare: '#9C27B0',
  legendary: '#FFD700'
};

// --- 조류 SVG ---
const SVG_BIRD_OWL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4c-8 0-14 4-16 10l-2 6c-1 3 0 6 1 8l1 2c-2 2-3 5-3 8v6c0 6 4 12 8 15l3 3h16l3-3c4-3 8-9 8-15v-6c0-3-1-6-3-8l1-2c1-2 2-5 1-8l-2-6C46 8 40 4 32 4zm-8 18c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm16 0c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm-8 10l3 4h-6l3-4zm-4 8h8l-1 3h-6l-1-3z"/></svg>`;

const SVG_BIRD_SMALL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M20 18c-3 0-6 2-7 5l-1 3 4 2h2c1-2 3-3 5-3h4c4 0 7 3 7 7v2l8-3c3-1 5-1 7 0l3 2v-2c0-2-1-4-3-5l-6-3c-2-3-6-5-10-5H20zm7 16c-4 0-7 3-7 7 0 3 2 6 5 7l2 1h14l2-1c3-1 5-4 5-7 0-4-3-7-7-7H27zm-1 6c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm10 4H29l3-2 4 2z"/></svg>`;

const SVG_BIRD_WOODPECKER = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M22 6c-3 0-5 2-5 5v8c0 2 1 4 3 5v4l-4 8v12c0 3 2 6 5 8h4l2-2v-8l6-10v-6c2-1 3-3 3-5V11c0-3-2-5-5-5h-9zm2 8c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-6 6h14l-2 4H20l-2-4zM8 22l10 4-4 8-8-4 2-8zm20 18l-4 8v8h6v-8l2-6-4-2z"/></svg>`;

const SVG_BIRD_BULBUL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M30 6l-4 6c-4 1-7 4-8 8l-2 6c0 3 1 5 3 7l-3 5v10c0 4 3 8 6 10l3 2h10l3-2c3-2 6-6 6-10V38l-3-5c2-2 3-4 3-7l-2-6c-1-4-4-7-8-8L30 6zm-2 18c1 0 3 1 3 3s-2 3-3 3-3-1-3-3 1-3 3-3zm8 0c1 0 3 1 3 3s-2 3-3 3-3-1-3-3 1-3 3-3zm-4 8l2 3h-4l2-3z"/></svg>`;

const SVG_BIRD_MAGPIE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M18 8c-4 0-7 3-7 7v4l3 3-2 4v8l4 8 2 6v10h6V48l-2-6 6-4h8l6 4-2 6v10h6V48l2-6 4-8v-8l-2-4 3-3v-4c0-4-3-7-7-7H18zm6 10c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm16 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM28 26h8l-1 3h-6l-1-3z"/></svg>`;

const SVG_BIRD_KINGFISHER = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4c-5 0-9 3-10 7l-1 4 2 3-4 6v6l2 4-4 6v8c0 4 3 8 7 10l2 1h12l2-1c4-2 7-6 7-10v-8l-4-6 2-4v-6l-4-6 2-3-1-4c-1-4-5-7-10-7zm-4 14c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm8 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm-4 8l6 8H20l6-8z"/></svg>`;

const SVG_BIRD_MANDARIN = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M26 8c-4 0-8 3-9 7l-1 5c0 3 1 5 3 7l-5 5v10c0 5 4 10 8 12h20c4-2 8-7 8-12V32l-5-5c2-2 3-4 3-7l-1-5c-1-4-5-7-9-7H26zm-2 6l4-2 4 2v4l-4 2-4-2v-4zm12 0l4-2 4 2v4l-4 2-4-2v-4zm-6 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm4 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-2 6l3 3h-6l3-3z"/></svg>`;

const SVG_BIRD_KESTREL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 2c-4 0-7 2-8 6l-1 4 2 4-6 2-12 6 4 4 12-4 1 2v8l-6 10v8l4 2 6-8h8l6 8 4-2v-8l-6-10v-8l1-2 12 4 4-4-12-6-6-2 2-4-1-4c-1-4-4-6-8-6zm-3 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm6 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-3 6l2 3h-4l2-3z"/></svg>`;

const SVG_BIRD_CUCKOO = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M24 8c-4 0-7 3-8 7l-1 5c0 3 1 5 3 7v6l-4 6v10c0 3 2 7 5 9l3 2h10l6-4 4 4h4v-8l-6-6v-7c2-2 3-4 3-7l-1-5c-1-4-4-7-8-7H24zm2 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm8 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-2 6l2 3h-8l2-3h4z"/></svg>`;

const SVG_BIRD_ROLLER = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 2c-5 0-9 3-10 8v6l-6 2-10 8 4 4 10-6 2 2v8l-4 8v10l4 2 4-6h8l4 6 4-2v-10l-4-8v-8l2-2 10 6 4-4-10-8-6-2v-6c-1-5-5-8-10-8zm-4 14c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm8 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm-4 8l3 4h-6l3-4z"/></svg>`;

// 추가 조류 (id 39, 40)
const SVG_BIRD_BULBUL2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M28 6c-5 0-9 3-10 8l-1 4 2 4v4l-5 6v8c0 5 3 10 7 12l3 2h12l3-2c4-2 7-7 7-12v-8l-5-6v-4l2-4-1-4c-1-5-5-8-10-8h-4zm-2 16c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm12 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm-6 8l2 3h-4l2-3zm-8 6h16l-2 6H26l-2-6z"/></svg>`;

const SVG_BIRD_KESTREL2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4c-3 0-6 2-7 5l-1 3 1 4-8 4-10 4 3 4 12-4v4l-4 8v10l2 4 4-2 4-6h8l4 6 4 2 2-4V36l-4-8v-4l12 4 3-4-10-4-8-4 1-4-1-3c-1-3-4-5-7-5h-4zm-2 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm4 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-2 8l3 2h-6l3-2z"/></svg>`;

// --- 곤충 SVG ---
const SVG_INSECT_BUTTERFLY = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 8v48M28 16c-6-4-14-4-18 2-4 6-2 14 4 18 4 2 8 2 12 0v-8l-10-4c-2-2-2-4 0-6 2-1 4 0 6 2l6-4zm8 0c6-4 14-4 18 2 4 6 2 14-4 18-4 2-8 2-12 0v-8l10-4c2-2 2-4 0-6-2-1-4 0-6 2l-6-4zM30 10h4v6h-4v-6zm0 42h4v6h-4v-6z"/><circle cx="32" cy="12" r="3" fill="${c}"/></svg>`;

const SVG_INSECT_BEETLE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M26 4l-4 8h-4c-4 0-8 4-8 8v16c0 10 8 20 18 24h8c10-4 18-14 18-24V20c0-4-4-8-8-8h-4l-4-8h-4l2 8h-8l2-8h-4zm-8 16h28v4l-2 4H20l-2-4v-4zm6 12c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm16 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM32 38v16c-6-2-10-8-10-14h4v-2h12v2h4c0 6-4 12-10 14z"/></svg>`;

const SVG_INSECT_MANTIS = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M28 4l-6 10-8-2-2 4 10 4 4-6v8l-8 6v6l6-4v10l-6 8v8h4l8-10v-10l6 4v10l4 6h4v-8l-6-8V24l6 4v-6l-8-6V8l4 6 10-4-2-4-8 2L28 4zm0 10c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm8 2c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/></svg>`;

const SVG_INSECT_BEE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 6c-6 0-12 4-14 10l-2 6c0 4 2 8 5 10l-5 4v4l6-2c2 2 5 4 8 4v8l-2 6h4l2-6 2 6h4l-2-6v-8c3 0 6-2 8-4l6 2v-4l-5-4c3-2 5-6 5-10l-2-6c-2-6-8-10-14-10h-4zm-4 12c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm12 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM20 24h24v3H20v-3zm2 5h20v3H22v-3z"/></svg>`;

const SVG_INSECT_FIREFLY = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4c-5 0-9 3-10 8l-1 4 2 4v6l-4 4v6l4-2v6c0 4 2 8 5 10l2 2h4l2-2c3-2 5-6 5-10v-6l4 2v-6l-4-4v-6l2-4-1-4c-1-5-5-8-10-8zm-3 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm6 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/><circle cx="32" cy="48" r="6" fill="${c}" opacity="0.5"/></svg>`;

const SVG_INSECT_DRAGONFLY = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 6c-3 0-6 2-7 5l-1 3c0 2 1 4 3 5v4l-18 8 2 4 16-6v4l-8 6 2 3 8-5v6l-8 6 2 3 8-5v8h4v-8l8 5 2-3-8-6v-6l8 5 2-3-8-6v-4l16 6 2-4-18-8v-4c2-1 3-3 3-5l-1-3c-1-3-4-5-7-5h-2zm-1 8c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm4 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/></svg>`;

const SVG_INSECT_STAG = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M22 2l-6 8 4 4 4-4v6h-6c-4 0-8 4-8 8v12c0 10 8 20 18 24h8c10-4 18-14 18-24V24c0-4-4-8-8-8h-6v-6l4 4 4-4-6-8h-4l4 6-4 4v-4l-4-4h-4l-4 4v4l-4-4 4-6h-4zM20 22h24v4H20v-4zm4 8c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm16 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM32 40v14c-6-3-10-8-10-14h4v-2h12v2h4c0 6-4 11-10 14z"/></svg>`;

const SVG_INSECT_BUTTERFLY2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 8v48M26 14c-4-2-10-2-14 2s-4 10 0 14c3 3 8 4 12 2l4-4v-6l-6-2c-2-1-2-3 0-4s4 0 5 2l-1-4zm12 0c4-2 10-2 14 2s4 10 0 14c-3 3-8 4-12 2l-4-4v-6l6-2c2-1 2-3 0-4s-4 0-5 2l1-4zM26 34c-4 2-10 4-14 2s-6-8-4-12l4-2 4 4 6 2v6l-6 4c-1 1 0 3 2 3s4-2 4-4l4-3zm12 0c4 2 10 4 14 2s6-8 4-12l-4-2-4 4-6 2v6l6 4c1 1 0 3-2 3s-4-2-4-4l-4-3z"/><circle cx="32" cy="10" r="3" fill="${c}"/></svg>`;

const SVG_INSECT_ROYAL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4l-3 4 3 2 3-2-3-4zM32 12v44M24 16c-6-2-14 0-16 6-2 8 2 14 8 16 4 2 8 0 12-2v-10l-10-2c-3-1-3-4-1-5 2-2 5 0 6 2l1-5zm16 0c6-2 14 0 16 6 2 8-2 14-8 16-4 2-8 0-12-2v-10l10-2c3-1 3-4 1-5-2-2-5 0-6 2l-1-5z"/><circle cx="32" cy="10" r="4" fill="${c}"/></svg>`;

const SVG_INSECT_CICADA = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 6c-6 0-10 4-11 9v5l-10 6 2 4 8-4v4l-6 8v6l6-4v6c0 4 3 8 6 10l2 1h6l2-1c3-2 6-6 6-10v-6l6 4v-6l-6-8v-4l8 4 2-4-10-6v-5c-1-5-5-9-11-9zm-4 12c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm8 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM26 28h12v3H26v-3z"/></svg>`;

// 추가 곤충 (id 41, 42)
const SVG_INSECT_BEE2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 8c-5 0-10 3-12 8l-2 6c0 3 1 6 4 8v4l-6 2v4l6-1v6l-2 6h4l2-4 2 4h4l-2-6v-6l6 1v-4l-6-2v-4c3-2 4-5 4-8l-2-6c-2-5-7-8-12-8h-2zm-3 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm8 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zM22 26h20v2H22v-2zm2 4h16v2H24v-2z"/></svg>`;

const SVG_INSECT_STAG2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M20 4l-4 6 3 3 3-3v4h-4c-4 0-7 3-7 7v14c0 8 6 16 14 20h14c8-4 14-12 14-20V21c0-4-3-7-7-7h-4v-4l3 3 3-3-4-6h-3l2 4-3 3v-2l-3-3h-6l-3 3v2l-3-3 2-4h-3zM18 20h28v3H18v-3zm6 8c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm16 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM32 38v12c-4-2-8-7-8-12h3v-1h10v1h3c0 5-4 10-8 12z"/></svg>`;

// --- 식물 SVG ---
const SVG_PLANT_TREE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4c-8 0-16 6-18 14-2 6 0 12 4 16h4v-4c-3-3-4-7-3-12 1-6 7-10 13-10s12 4 13 10c1 5 0 9-3 12v4h4c4-4 6-10 4-16-2-8-10-14-18-14zM28 36v20h-6v4h20v-4h-6V36h-8z"/></svg>`;

const SVG_PLANT_HIBISCUS = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 8c-2 0-4 2-4 4v4l-6-4c-2-1-4 0-5 2s0 4 2 5l4 3-6 2c-2 1-3 3-2 5s3 3 5 2l6-2-2 6c-1 2 0 4 2 5s4 0 5-2l3-6 3 6c1 2 3 3 5 2s3-3 2-5l-2-6 6 2c2 1 4 0 5-2s0-4-2-5l-6-2 4-3c2-1 3-3 2-5s-3-3-5-2l-6 4v-4c0-2-2-4-4-4h-4z"/><circle cx="32" cy="28" r="6" fill="${c}" opacity="0.6"/><path fill="${c}" opacity="0.8" d="M30 36v20h4V36h-4z"/></svg>`;

const SVG_PLANT_AZALEA = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 6c-3 0-5 2-6 4l-2 6 4 4 4-2 4 2 4-4-2-6c-1-2-3-4-6-4zm-14 12c-2 0-4 1-5 3l-2 6 6 2 4-2 2 4 4-4-2-6c-1-2-3-3-5-3h-2zm28 0c-2 0-4 1-5 3l-2 6 4 4 2-4 4 2 6-2-2-6c-1-2-3-3-5-3h-2zM22 28c-3 0-5 2-6 4l-2 4 4 4 4-2v4h4l2-6c-1-2-3-4-6-4zm20 0c-3 0-5 2-6 4l2 6h4v-4l4 2 4-4-2-4c-1-2-3-4-6-4zM30 40v16h4V40h-4z"/></svg>`;

const SVG_PLANT_PINE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4l-10 14h4l-8 12h4l-10 16h12v10h-4v4h16v-4h-4V46h12L34 30h4L30 18h4L32 4z"/></svg>`;

const SVG_PLANT_HEART = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 20c-4-8-12-12-18-8s-6 14 0 22c4 6 12 12 18 16 6-4 14-10 18-16 6-8 6-18 0-22s-14 0-18 8zm0 4c2-4 6-8 10-6s4 8 0 14c-3 4-7 8-10 10-3-2-7-6-10-10-4-6-4-12 0-14s8 2 10 6z"/><path fill="${c}" opacity="0.7" d="M30 44v14h4V44h-4z"/></svg>`;

const SVG_PLANT_ADONIS = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 10c-2 0-3 1-4 3l-2 6 2 4h8l2-4-2-6c-1-2-2-3-4-3zm-10 8l-4 2-2 6 4 4 6-2-2-6-2-4zm20 0l-2 4-2 6 6 2 4-4-2-6-4-2zM18 24l-6 2v6l6 2 4-4-4-6zm28 0l-4 6 4 4 6-2v-6l-6-2zM32 30c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/><path fill="${c}" opacity="0.7" d="M30 40v16h4V40h-4z"/></svg>`;

const SVG_PLANT_FORSYTHIA = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M10 10c0 0 8 4 14 12l2 4-4 1c-2 1-3 3-2 5l4 6v18h4V38l4-6c1-2 0-4-2-5l-4-1 2-4c6-8 14-12 14-12h4c0 0-10 6-16 16l-2 4 2 4c2 4 1 8-2 10h-4c-3-2-4-6-2-10l2-4-2-4C12 16 2 10 2 10h8z"/></svg>`;

const SVG_PLANT_LOTUS = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 8c-2 0-4 2-4 4l-1 8 5 4 5-4-1-8c0-2-2-4-4-4zm-12 10c-2 0-4 1-4 3l-2 8 6 4 6-4-2-8c0-2-2-3-4-3zm24 0c-2 0-4 1-4 3l-2 8 6 4 6-4-2-8c0-2-2-3-4-3zM10 28c-2 0-4 1-4 3l-2 6 6 4 6-4-2-6c0-2-2-3-4-3zm44 0c-2 0-4 1-4 3l-2 6 6 4 6-4-2-6c0-2-2-3-4-3z"/><path fill="${c}" opacity="0.5" d="M8 44h48c0 0-4 6-12 8H20C12 50 8 44 8 44z"/></svg>`;

// 추가 식물 (id 43, 44, 45)
const SVG_PLANT_AZALEA2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 8c-2 0-4 1-5 3l-3 6 3 4 5-2 5 2 3-4-3-6c-1-2-3-3-5-3zm-16 10c-2 0-3 1-4 3l-2 6 4 4 5-3 2 3 3-3-2-6c-1-2-2-4-4-4h-2zm32 0c-2 0-3 2-4 4l-2 6 3 3 2-3 5 3 4-4-2-6c-1-2-2-3-4-3h-2zM20 30c-2 0-4 1-5 3l-1 4 4 3 3-2v4h4l1-5c0-2-2-4-4-5l-2-2zm24 0l-2 2c-2 1-4 3-4 5l1 5h4v-4l3 2 4-3-1-4c-1-2-3-3-5-3z"/><path fill="${c}" opacity="0.7" d="M30 42v14h4V42h-4z"/></svg>`;

const SVG_PLANT_GINKGO = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 4c-10 0-18 8-18 18 0 6 3 12 8 15v3H16v4h12v12h8V44h12v-4h-6v-3c5-3 8-9 8-15 0-10-8-18-18-18zm0 4c8 0 14 6 14 14 0 5-3 10-7 12l-3 2v4h-8v-4l-3-2c-4-2-7-7-7-12 0-8 6-14 14-14zm0 4c-2 0-4 2-4 6v4c-4 0-6 2-6 4h10V16h-2v6zm2 0v10h10c0-2-2-4-6-4v-4c0-4-2-6-4-6z"/></svg>`;

const SVG_PLANT_PLUM = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 6c-2 0-3 1-4 3l-1 4 2 3c-3 0-5 1-6 3l-2 4 3 3-4 2c-2 1-3 3-2 5l2 4 4-1-1 4c0 2 1 4 3 5l4-1-1 4c0 2 2 3 4 3l3-3 3 3c2 0 4-1 4-3l-1-4 4 1c2-1 3-3 3-5l-1-4 4 1 2-4c1-2 0-4-2-5l-4-2 3-3-2-4c-1-2-3-3-6-3l2-3-1-4c-1-2-2-3-4-3h-4z"/><circle cx="32" cy="28" r="5" fill="${c}" opacity="0.5"/><path fill="${c}" opacity="0.7" d="M30 42v14h4V42h-4z"/></svg>`;

// --- 양서류 SVG ---
const SVG_AMPHIBIAN_FROG = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M20 10c-4 0-8 4-8 8 0 2 1 4 2 5l-6 3v6l8-4c2 2 6 4 10 4h12c4 0 8-2 10-4l8 4v-6l-6-3c1-1 2-3 2-5 0-4-4-8-8-8-3 0-5 1-6 3l-4-3h-4l-4 3c-1-2-3-3-6-3zm0 6c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm24 0c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zM28 26h8v4h-8v-4zm-8 8l-6 10v8h8v-6l4-4h12l4 4v6h8v-8l-6-10H20z"/></svg>`;

const SVG_AMPHIBIAN_SALAMANDER = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M16 14c-4 0-7 3-7 7s3 7 7 7h2l4 4-4 4-6-2v6l4 2v4l-4 4v6h6l4-6v-6l4-2h12l4 2v6l4 6h6v-6l-4-4v-4l4-2v-6l-6 2-4-4 4-4h2c4 0 7-3 7-7s-3-7-7-7c-3 0-5 1-6 3l-6 6H28l-6-6c-1-2-3-3-6-3zm0 4c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm32 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3z"/></svg>`;

const SVG_AMPHIBIAN_FIREBELLY = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M22 8c-6 0-10 4-10 10 0 3 1 5 3 7l-5 3v6l6-2 2 4H14l-6 8v8h8l4-6 4 2h16l4-2 4 6h8v-8l-6-8H46l2-4 6 2v-6l-5-3c2-2 3-4 3-7 0-6-4-10-10-10-3 0-5 2-7 4h-6c-2-2-4-4-7-4zm0 6c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm20 0c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zM28 26h8l-1 4h-6l-1-4z"/></svg>`;

// 추가 양서류 (id 46, 47)
const SVG_AMPHIBIAN_NEWT = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M14 16c-3 0-6 2-6 6s3 6 6 6h3l3 3-3 4-5-2v5l3 2v4l-3 3v5h5l3-5v-5l3-2h14l3 2v5l3 5h5v-5l-3-3v-4l3-2v-5l-5 2-3-4 3-3h3c3 0 6-2 6-6s-3-6-6-6c-2 0-4 1-5 3l-5 5H24l-5-5c-1-2-3-3-5-3zm0 4c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm36 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/></svg>`;

const SVG_AMPHIBIAN_TOAD = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M22 8c-5 0-9 4-9 9 0 3 1 5 3 7l-6 4v6l8-4c3 3 7 5 12 5h4c5 0 9-2 12-5l8 4v-6l-6-4c2-2 3-4 3-7 0-5-4-9-9-9-3 0-6 2-7 4h-6c-1-2-4-4-7-4zm0 6c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm20 0c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zM26 28h12v4H26v-4zm-8 8l-4 8v10h6v-6l4-4h16l4 4v6h6V44l-4-8H18z"/></svg>`;

// --- 파충류 SVG ---
const SVG_REPTILE_LIZARD = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M14 12c-4 0-6 3-6 6s2 6 6 6h4l6 4-4 6-8-2v6l6 2-2 6-6 2v6l8-2 4-8 4-4h8l4 4 4 8 8 2v-6l-6-2-2-6 6-2v-6l-8 2-4-6 6-4h4c4 0 6-3 6-6s-2-6-6-6c-2 0-4 1-5 3l-8 8H27l-8-8c-1-2-3-3-5-3zm0 4c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm36 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/></svg>`;

const SVG_REPTILE_SNAKE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M18 8c-4 0-7 2-8 6l-1 4c0 3 2 6 5 7l8 4c4 2 6 6 6 10v4c0 4-2 8-6 10l-8 4c-2 1-3 3-3 5l1 2 4-1 8-4c6-3 10-9 10-15v-4c0-6 4-10 8-10h4l4-2v-4l-6 2h-6c-6 0-11 3-14 8l-2 2c0-2 0-4 2-6l6-4c2-2 3-4 3-7l-1-4c-1-4-4-6-8-6h-5zm0 6c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3z"/></svg>`;

const SVG_REPTILE_TURTLE = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M32 12c-10 0-18 6-20 14l-2 6 4 4 4-2v6l-4 4v6h8l2-4 4 2h8l4-2 2 4h8v-6l-4-4v-6l4 2 4-4-2-6c-2-8-10-14-20-14zm0 4c8 0 14 4 16 10H16c2-6 8-10 16-10zm-8 14c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm16 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM8 20l-4 4 2 4 6-2-4-6zm48 0l-4 6 6 2 2-4-4-4z"/></svg>`;

// 추가 파충류 (id 50)
const SVG_REPTILE_LIZARD2 = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M12 14c-3 0-5 2-5 5s2 5 5 5h3l5 4-3 5-7-2v5l5 2-2 5-5 2v5l7-2 3-7 4-4h10l4 4 3 7 7 2v-5l-5-2-2-5 5-2v-5l-7 2-3-5 5-4h3c3 0 5-2 5-5s-2-5-5-5c-2 0-3 1-4 2l-7 7H23l-7-7c-1-1-2-2-4-2zm0 3c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm40 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/></svg>`;

// --- 포유류 SVG ---
const SVG_MAMMAL_SQUIRREL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M40 4c-4 0-8 4-8 8v4l-6 2c-6 2-10 8-10 14v4l-4 4v6h6l4-4h4v10l-2 4h6l4-6v-8h4l4 6h6l-2-4v-10h2l2-4c2-4 2-8 0-12l-4-6V10c0-4-2-6-6-6zm-2 8c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm6 6l2 4h-4l2-4zM20 30c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3z"/></svg>`;

const SVG_MAMMAL_REDSQUIRREL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M42 2c-2 0-4 1-5 3l-3 6-2-2c-4-2-8-1-10 2l-4 6c-4 2-8 6-8 12v6l-4 2v6h6l4-4h2v8l-2 6h6l4-6v-6h6l4 6h6l-2-6v-8h2l4-4c2-4 2-10-1-14l-2-4V8c0-4-2-6-5-6h-1zm-2 10c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm4 8l2 3h-4l2-3z"/></svg>`;

const SVG_MAMMAL_DEER = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M28 4l-4 8h-4l2 6c-4 2-6 6-6 10v8l-4 6v8h6l2-6 2 2v10l-2 4h6l2-6h8l2 6h6l-2-4v-10l2-2 2 6h6v-8l-4-6v-8c0-4-2-8-6-10l2-6h-4l-4-8h-4l2 6h-4l2-6h-4zm0 14c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm8 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm-4 8l2 3h-4l2-3z"/></svg>`;

const SVG_MAMMAL_RACCOON = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M18 6l-6 10 4 4 4-4 2 4h-6c-4 0-8 4-8 8v8l4 6v10l2 4h6l-2-4v-8l4-2h20l4 2v8l-2 4h6l2-4v-10l4-6v-8c0-4-4-8-8-8h-6l2-4 4 4 4-4-6-10h-4l2 6-4 4h-4l2-4-4-6h-4l-4 6 2 4h-4l-4-4 2-6h-4zm2 18c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm24 0c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zM30 32h4l-1 3h-2l-1-3z"/></svg>`;

// 추가 포유류 (id 48, 49)
const SVG_MAMMAL_WEASEL = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M18 10c-4 0-7 3-7 7 0 2 1 4 3 5v4l-4 4v6l4-2v6l-4 6v8h6l4-8v-4l4 2h12l6-2v4l4 8h6v-8l-4-6v-6l4 2v-6l-4-4v-4c2-1 3-3 3-5 0-4-3-7-7-7-2 0-4 1-5 3l-4 4H27l-4-4c-1-2-3-3-5-3zm0 4c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm28 0c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zM28 22h8l-1 3h-6l-1-3z"/></svg>`;

const SVG_MAMMAL_OTTER = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path fill="${c}" d="M24 6c-5 0-9 3-10 8l-1 4c0 3 2 6 4 8v6l-5 4v6l5-2v4c0 6 4 10 8 12l3 2h8l3-2c4-2 8-6 8-12v-4l5 2v-6l-5-4v-6c2-2 4-5 4-8l-1-4c-1-5-5-8-10-8h-16zm2 10c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm12 0c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm-6 10l3 4h-6l3-4zm-6 8h12c0 4-2 8-6 10-4-2-6-6-6-10z"/></svg>`;

// --- 퀘스트 아이콘 SVG (24x24) ---
const SVG_QUEST_SUNRISE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FF9800" d="M12 2l1 3h-2l1-3zm-6 4l2 2-1 1-2-2 1-1zm12 0l1 1-2 2-1-1 2-2zM12 7c-3 0-6 3-6 6h12c0-3-3-6-6-6zM2 14h20v2H2v-2zm3 4h2v3H5v-3zm12 0h2v3h-2v-3zm-6 0h2v3h-2v-3z"/></svg>`;

const SVG_QUEST_BUTTERFLY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#4CAF50" d="M12 4v16M9 7c-3-2-7-1-8 2s1 6 4 6c2 0 4-1 5-3v-3l-4-1c-1 0-1-1 0-2 1 0 2 0 3 1V7zm6 0c3-2 7-1 8 2s-1 6-4 6c-2 0-4-1-5-3v-3l4-1c1 0 1-1 0-2-1 0-2 0-3 1V7z"/><circle cx="12" cy="5" r="1.5" fill="#4CAF50"/></svg>`;

const SVG_QUEST_WALK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#2196F3" d="M13 4c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-1 6l-4 2v4h2v-3l2-1v4l-3 7h2l2-5 2 5h2l-3-7V11l2 2v3h2v-4l-3-3-3 1z"/></svg>`;

const SVG_QUEST_BOOK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#9C27B0" d="M4 4v16h16V4H4zm2 2h5v6l-2-1-2 1V6H6zm7 0h5v12H6v-2h12V6h-5z"/></svg>`;

const SVG_QUEST_CAMERA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FF5722" d="M9 3l-1 2H4c-1 0-2 1-2 2v10c0 1 1 2 2 2h16c1 0 2-1 2-2V7c0-1-1-2-2-2h-4l-1-2H9zm3 5c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm0 2c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z"/></svg>`;

const SVG_QUEST_BIRD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#03A9F4" d="M12 4c-3 0-5 2-5 4 0 1 0 2 1 3l-4 1v2l4-1c1 2 3 3 5 3h4l3 3v-2l-2-2c1-1 2-3 2-4 0-2-1-4-3-5l3-2h-4c-1 0-3 0-4 1V4zm-1 4c1 0 1 1 1 1s0 1-1 1-1-1-1-1 0-1 1-1z"/></svg>`;

const SVG_QUEST_MAP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#009688" d="M3 3l6 3 6-3 6 3v18l-6-3-6 3-6-3V3zm2 2v13l4 2V7L5 5zm6-1v13l4-2V5l-4 2zm6-1v13l4 2V5l-4-2z"/></svg>`;

const SVG_QUEST_GEM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#E91E63" d="M6 3h12l4 6-10 12L2 9l4-6zm2 1L5 9h4l-1-5zm3 0l1 5h4l-1-5h-4zm5 0l-1 5h4l-3-5zM6 10l6 8-4-8H6zm5 0l1 8 1-8h-2zm3 0l-1 8 6-8h-5z"/></svg>`;

const SVG_QUEST_FLOWER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#E91E63" d="M12 4c-1 0-2 1-2 3 0-2-2-3-3-2-2 1-2 3-1 4 1 1 2 1 3 1-1-1-2-2-1-4 0-1 1-2 2-2h2c1 0 2 1 2 2 1 2 0 3-1 4 1 0 2 0 3-1 1-1 1-3-1-4-1-1-3 0-3 2 0-2-1-3-2-3z"/><circle cx="12" cy="10" r="2" fill="#FFC107"/><path fill="#4CAF50" d="M11 13h2v8h-2z"/></svg>`;

const SVG_QUEST_SOUND = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FF9800" d="M12 3v18l-5-5H3V8h4l5-5zm2 4v10c2-1 3-3 3-5s-1-4-3-5zm0-3v2c3 1 5 4 5 8s-2 7-5 8v2c4-1 7-5 7-10s-3-9-7-10z"/></svg>`;

const SVG_QUEST_LEAF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FF9800" d="M17 3c-4 0-8 2-10 6-2 3-3 7-2 10l1 2 2 1c3 1 7 0 10-2 4-2 6-6 6-10V3h-7zM8 19c-1-2-1-5 0-7l3 3 2-2-3-3c2-2 5-3 7-3h4c0 3-2 6-5 8-3 2-6 3-8 4z"/></svg>`;

const SVG_QUEST_PARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#4CAF50" d="M12 2l-6 8h3l-5 8h6v4h4v-4h6l-5-8h3L12 2zm0 3l3 5h-2l4 6H7l4-6H9l3-5z"/></svg>`;

const SVG_QUEST_SEARCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#673AB7" d="M10 3c-4 0-7 3-7 7s3 7 7 7c1.5 0 3-.5 4-1.3l5 5 1.5-1.5-5-5c.8-1.2 1.3-2.5 1.3-4C16.8 6 13.8 3 10 3zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"/></svg>`;

const SVG_QUEST_TULIP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#E91E63" d="M12 2c-2 0-4 3-5 6-1 2-1 4 0 5l1 1h8l1-1c1-1 1-3 0-5-1-3-3-6-5-6zm-3 6c1-2 2-4 3-4s2 2 3 4c0 1 1 2 0 3H9c-1-1 0-2 0-3z"/><path fill="#4CAF50" d="M11 14h2v8h-2z"/></svg>`;

// --- 카테고리 아이콘 SVG ---
const SVG_CAT_BIRD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#60A5FA" d="M12 4c-3 0-5 2-5 4 0 1 0 2 1 3l-4 1v2l4-1c1 2 3 3 5 3h4l3 3v-2l-2-2c1-1 2-3 2-4 0-2-1-4-3-5l3-2h-4c-1 0-3 0-4 1V4zm-1 4c1 0 1 1 1 1s0 1-1 1-1-1-1-1 0-1 1-1z"/></svg>`;

const SVG_CAT_INSECT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#34D399" d="M12 4v16M9 7c-3-2-7-1-8 2s1 6 4 6c2 0 4-1 5-3v-3l-4-1c-1 0-1-1 0-2 1 0 2 0 3 1V7zm6 0c3-2 7-1 8 2s-1 6-4 6c-2 0-4-1-5-3v-3l4-1c1 0 1-1 0-2-1 0-2 0-3 1V7z"/><circle cx="12" cy="5" r="1.5" fill="#34D399"/></svg>`;

const SVG_CAT_PLANT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#4ADE80" d="M12 22V10c0-4 4-8 8-8-1 4-4 7-8 8 0-4-4-8-8-8 4 1 7 4 8 8z"/></svg>`;

const SVG_CAT_AMPHIBIAN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#2DD4BF" d="M8 6c-2 0-3 2-3 3 0 1 0 2 1 2l-2 1v2l3-1c1 1 2 2 4 2h2c2 0 3-1 4-2l3 1v-2l-2-1c1 0 1-1 1-2 0-1-1-3-3-3-1 0-2 1-2 2h-2c0-1-1-2-2-2zm0 2c1 0 1 1 1 1s0 1-1 1-1-1-1-1 0-1 1-1zm8 0c1 0 1 1 1 1s0 1-1 1-1-1-1-1 0-1 1-1zm-4 6l-3 4v4h2v-3l2-2 2 2v3h2v-4l-3-4h-2z"/></svg>`;

const SVG_CAT_REPTILE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#A78BFA" d="M6 6c-2 0-3 1-3 3s1 3 3 3h1l3 2-2 3-3-1v3l2 1-1 2 3 1 2-3 2-2h4l2 2 2 3 3-1-1-2 2-1v-3l-3 1-2-3 3-2h1c2 0 3-1 3-3s-1-3-3-3c-1 0-2 0-2 1l-4 4H12L8 7c0-1-1-1-2-1zm0 2c0 0 1 0 1 1s-1 1-1 1-1 0-1-1 1-1 1-1zm12 0c0 0 1 0 1 1s-1 1-1 1-1 0-1-1 1-1 1-1z"/></svg>`;

const SVG_CAT_MAMMAL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#FB923C" d="M16 2c-2 0-3 2-3 3v2l-2 1c-3 1-5 3-5 6v2l-2 2v3h3l2-2h2v4l-1 2h3l2-3h2l2 3h3l-1-2v-4h1l1-2c1-2 1-4 0-6l-2-3V5c0-1-1-2-2-2h-3zm0 4c1 0 1 1 1 1s0 1-1 1-1-1-1-1 0-1 1-1z"/></svg>`;

// ============================================================
// 생물종 데이터 (50종)
// ============================================================
const speciesData = [
  // 조류 (Birds) - 10종
  { id: 1, name: "소쩍새", scientific: "Otus sunia", category: "bird", rarity: "rare", xp: 50, description: "야행성 소형 올빼미로 '소쩍소쩍' 울음소리가 특징입니다.", habitat: "산림, 공원", season: "봄-가을", image: SVG_BIRD_OWL(RARITY_COLORS.rare) },
  { id: 2, name: "박새", scientific: "Parus minor", category: "bird", rarity: "common", xp: 10, description: "도시 공원에서 흔히 볼 수 있는 작은 새입니다.", habitat: "산림, 공원, 정원", season: "연중", image: SVG_BIRD_SMALL(RARITY_COLORS.common) },
  { id: 3, name: "딱따구리", scientific: "Dendrocopos major", category: "bird", rarity: "uncommon", xp: 30, description: "나무를 쪼아 먹이를 찾는 모습이 인상적입니다.", habitat: "산림", season: "연중", image: SVG_BIRD_WOODPECKER(RARITY_COLORS.uncommon) },
  { id: 4, name: "직박구리", scientific: "Hypsipetes amaurotis", category: "bird", rarity: "common", xp: 10, description: "시끄러운 울음소리로 존재감을 드러내는 새입니다.", habitat: "산림, 공원", season: "연중", image: SVG_BIRD_BULBUL(RARITY_COLORS.common) },
  { id: 5, name: "까치", scientific: "Pica pica", category: "bird", rarity: "common", xp: 5, description: "한국의 국조로 어디서나 쉽게 볼 수 있습니다.", habitat: "도시, 농촌", season: "연중", image: SVG_BIRD_MAGPIE(RARITY_COLORS.common) },
  { id: 6, name: "물총새", scientific: "Alcedo atthis", category: "bird", rarity: "rare", xp: 60, description: "화려한 청록색 깃털의 물가 새입니다.", habitat: "하천, 연못", season: "연중", image: SVG_BIRD_KINGFISHER(RARITY_COLORS.rare) },
  { id: 7, name: "원앙", scientific: "Aix galericulata", category: "bird", rarity: "uncommon", xp: 40, description: "화려한 수컷과 부부금실의 상징입니다.", habitat: "연못, 호수", season: "연중", image: SVG_BIRD_MANDARIN(RARITY_COLORS.uncommon) },
  { id: 8, name: "황조롱이", scientific: "Falco tinnunculus", category: "bird", rarity: "rare", xp: 70, description: "도시에 적응한 소형 맹금류입니다.", habitat: "도시, 초원", season: "연중", image: SVG_BIRD_KESTREL(RARITY_COLORS.rare) },
  { id: 9, name: "뻐꾸기", scientific: "Cuculus canorus", category: "bird", rarity: "uncommon", xp: 35, description: "봄을 알리는 '뻐꾹' 울음소리로 유명합니다.", habitat: "산림", season: "봄-여름", image: SVG_BIRD_CUCKOO(RARITY_COLORS.uncommon) },
  { id: 10, name: "파랑새", scientific: "Eurystomus orientalis", category: "bird", rarity: "legendary", xp: 100, description: "아름다운 청색 깃털의 희귀 여름철새입니다.", habitat: "산림", season: "여름", image: SVG_BIRD_ROLLER(RARITY_COLORS.legendary) },

  // 곤충 (Insects) - 10종
  { id: 11, name: "호랑나비", scientific: "Papilio xuthus", category: "insect", rarity: "common", xp: 10, description: "노란 바탕에 검은 줄무늬가 특징인 나비입니다.", habitat: "공원, 정원", season: "봄-가을", image: SVG_INSECT_BUTTERFLY(RARITY_COLORS.common) },
  { id: 12, name: "장수풍뎅이", scientific: "Allomyrina dichotoma", category: "insect", rarity: "uncommon", xp: 25, description: "수컷의 큰 뿔이 인상적인 대형 딱정벌레입니다.", habitat: "산림", season: "여름", image: SVG_INSECT_BEETLE(RARITY_COLORS.uncommon) },
  { id: 13, name: "왕사마귀", scientific: "Tenodera sinensis", category: "insect", rarity: "uncommon", xp: 20, description: "대형 사마귀로 정원의 해충을 잡아먹습니다.", habitat: "초원, 정원", season: "여름-가을", image: SVG_INSECT_MANTIS(RARITY_COLORS.uncommon) },
  { id: 14, name: "꿀벌", scientific: "Apis mellifera", category: "insect", rarity: "common", xp: 8, description: "꽃가루를 옮기는 중요한 수분 매개자입니다.", habitat: "꽃밭, 정원", season: "봄-가을", image: SVG_INSECT_BEE(RARITY_COLORS.common) },
  { id: 15, name: "반딧불이", scientific: "Luciola lateralis", category: "insect", rarity: "rare", xp: 55, description: "여름밤을 밝히는 신비로운 발광 곤충입니다.", habitat: "하천, 습지", season: "여름", image: SVG_INSECT_FIREFLY(RARITY_COLORS.rare) },
  { id: 16, name: "고추잠자리", scientific: "Crocothemis servilia", category: "insect", rarity: "common", xp: 12, description: "붉은색 몸이 특징인 가을의 대표 잠자리입니다.", habitat: "연못, 습지", season: "여름-가을", image: SVG_INSECT_DRAGONFLY(RARITY_COLORS.common) },
  { id: 17, name: "사슴벌레", scientific: "Lucanus maculifemoratus", category: "insect", rarity: "uncommon", xp: 30, description: "큰 턱이 사슴뿔을 닮은 인기 딱정벌레입니다.", habitat: "산림", season: "여름", image: SVG_INSECT_STAG(RARITY_COLORS.uncommon) },
  { id: 18, name: "노랑나비", scientific: "Colias erate", category: "insect", rarity: "common", xp: 8, description: "배추밭에서 흔히 볼 수 있는 노란 나비입니다.", habitat: "농경지, 초원", season: "봄-가을", image: SVG_INSECT_BUTTERFLY2(RARITY_COLORS.common) },
  { id: 19, name: "왕오색나비", scientific: "Sasakia charonda", category: "insect", rarity: "legendary", xp: 90, description: "한국의 국접으로 아름다운 무늬가 특징입니다.", habitat: "산림", season: "여름", image: SVG_INSECT_ROYAL(RARITY_COLORS.legendary) },
  { id: 20, name: "매미", scientific: "Cryptotympana atrata", category: "insect", rarity: "common", xp: 10, description: "여름의 시끄러운 울음소리로 유명합니다.", habitat: "산림, 공원", season: "여름", image: SVG_INSECT_CICADA(RARITY_COLORS.common) },

  // 식물 (Plants) - 8종
  { id: 21, name: "은행나무", scientific: "Ginkgo biloba", category: "plant", rarity: "common", xp: 10, description: "살아있는 화석이라 불리는 고대 수종입니다.", habitat: "가로수, 공원", season: "연중", image: SVG_PLANT_TREE(RARITY_COLORS.common) },
  { id: 22, name: "무궁화", scientific: "Hibiscus syriacus", category: "plant", rarity: "common", xp: 15, description: "한국의 국화로 여름에 아름답게 핍니다.", habitat: "공원, 정원", season: "여름", image: SVG_PLANT_HIBISCUS(RARITY_COLORS.common) },
  { id: 23, name: "진달래", scientific: "Rhododendron mucronulatum", category: "plant", rarity: "common", xp: 12, description: "봄을 알리는 분홍빛 꽃입니다.", habitat: "산림", season: "봄", image: SVG_PLANT_AZALEA(RARITY_COLORS.common) },
  { id: 24, name: "소나무", scientific: "Pinus densiflora", category: "plant", rarity: "common", xp: 10, description: "한국을 대표하는 상록 침엽수입니다.", habitat: "산림, 공원", season: "연중", image: SVG_PLANT_PINE(RARITY_COLORS.common) },
  { id: 25, name: "금낭화", scientific: "Lamprocapnos spectabilis", category: "plant", rarity: "uncommon", xp: 25, description: "하트 모양 꽃이 아름다운 야생화입니다.", habitat: "산림 그늘", season: "봄", image: SVG_PLANT_HEART(RARITY_COLORS.uncommon) },
  { id: 26, name: "복수초", scientific: "Adonis amurensis", category: "plant", rarity: "rare", xp: 45, description: "이른 봄 눈 속에서 피는 노란 꽃입니다.", habitat: "산림", season: "초봄", image: SVG_PLANT_ADONIS(RARITY_COLORS.rare) },
  { id: 27, name: "개나리", scientific: "Forsythia koreana", category: "plant", rarity: "common", xp: 8, description: "봄을 알리는 노란 꽃의 대표 관목입니다.", habitat: "공원, 정원", season: "봄", image: SVG_PLANT_FORSYTHIA(RARITY_COLORS.common) },
  { id: 28, name: "연꽃", scientific: "Nelumbo nucifera", category: "plant", rarity: "uncommon", xp: 30, description: "진흙에서 피어나는 청정한 꽃입니다.", habitat: "연못", season: "여름", image: SVG_PLANT_LOTUS(RARITY_COLORS.uncommon) },

  // 양서류 (Amphibians) - 3종
  { id: 29, name: "청개구리", scientific: "Hyla japonica", category: "amphibian", rarity: "common", xp: 15, description: "비 오기 전 우는 작은 초록 개구리입니다.", habitat: "습지, 논", season: "봄-가을", image: SVG_AMPHIBIAN_FROG(RARITY_COLORS.common) },
  { id: 30, name: "도롱뇽", scientific: "Hynobius leechii", category: "amphibian", rarity: "uncommon", xp: 35, description: "깨끗한 계곡에 사는 양서류입니다.", habitat: "계곡, 습지", season: "봄", image: SVG_AMPHIBIAN_SALAMANDER(RARITY_COLORS.uncommon) },
  { id: 31, name: "무당개구리", scientific: "Bombina orientalis", category: "amphibian", rarity: "uncommon", xp: 30, description: "배의 붉은 무늬가 특징인 개구리입니다.", habitat: "산림 계곡", season: "봄-가을", image: SVG_AMPHIBIAN_FIREBELLY(RARITY_COLORS.uncommon) },

  // 파충류 (Reptiles) - 3종
  { id: 32, name: "줄장지뱀", scientific: "Takydromus wolteri", category: "reptile", rarity: "uncommon", xp: 25, description: "풀숲에서 볼 수 있는 작은 도마뱀입니다.", habitat: "초원, 산림 가장자리", season: "봄-가을", image: SVG_REPTILE_LIZARD(RARITY_COLORS.uncommon) },
  { id: 33, name: "유혈목이", scientific: "Rhabdophis tigrinus", category: "reptile", rarity: "rare", xp: 50, description: "독이 있는 뱀으로 주의가 필요합니다.", habitat: "습지, 논", season: "봄-가을", image: SVG_REPTILE_SNAKE(RARITY_COLORS.rare) },
  { id: 34, name: "자라", scientific: "Pelodiscus sinensis", category: "reptile", rarity: "rare", xp: 55, description: "민물에 사는 연갑 거북입니다.", habitat: "하천, 연못", season: "봄-가을", image: SVG_REPTILE_TURTLE(RARITY_COLORS.rare) },

  // 포유류 (Mammals) - 4종
  { id: 35, name: "다람쥐", scientific: "Tamias sibiricus", category: "mammal", rarity: "common", xp: 20, description: "볼에 먹이를 저장하는 귀여운 설치류입니다.", habitat: "산림, 공원", season: "봄-가을", image: SVG_MAMMAL_SQUIRREL(RARITY_COLORS.common) },
  { id: 36, name: "청설모", scientific: "Sciurus vulgaris", category: "mammal", rarity: "uncommon", xp: 25, description: "붉은 털의 나무타기 명수입니다.", habitat: "산림, 공원", season: "연중", image: SVG_MAMMAL_REDSQUIRREL(RARITY_COLORS.uncommon) },
  { id: 37, name: "고라니", scientific: "Hydropotes inermis", category: "mammal", rarity: "rare", xp: 60, description: "뿔 없는 사슴으로 한국 고유종입니다.", habitat: "산림, 습지", season: "연중", image: SVG_MAMMAL_DEER(RARITY_COLORS.rare) },
  { id: 38, name: "너구리", scientific: "Nyctereutes procyonoides", category: "mammal", rarity: "rare", xp: 55, description: "야행성 잡식동물로 도시에도 출몰합니다.", habitat: "산림", season: "연중", image: SVG_MAMMAL_RACCOON(RARITY_COLORS.rare) },

  // 추가 조류 (Birds) - 2종
  { id: 39, name: "직박구리", scientific: "Microscelis amaurotis", category: "bird", rarity: "common", xp: 10, description: "산림과 도시 공원에서 흔히 볼 수 있는 중형 새로, 특유의 시끄러운 울음소리로 멀리서도 존재를 알립니다. 과일과 곤충을 즐겨 먹습니다.", habitat: "산림, 도시공원", season: "연중", image: SVG_BIRD_BULBUL2(RARITY_COLORS.common) },
  { id: 40, name: "황조롱이", scientific: "Falco tinnunculus", category: "bird", rarity: "rare", xp: 65, description: "도심 빌딩 옥상에서도 둥지를 트는 적응력 강한 소형 맹금류입니다. 공중에서 정지 비행하며 먹이를 찾는 호버링 사냥이 특징입니다.", habitat: "도시 빌딩, 초원", season: "연중", image: SVG_BIRD_KESTREL2(RARITY_COLORS.rare) },

  // 추가 곤충 (Insects) - 2종
  { id: 41, name: "꿀벌", scientific: "Apis cerana", category: "insect", rarity: "common", xp: 8, description: "동양종 꿀벌로 토종벌이라고도 불립니다. 꽃가루 매개를 통해 생태계에서 가장 중요한 역할을 하는 곤충 중 하나입니다.", habitat: "꽃밭, 도시공원, 정원", season: "봄-가을", image: SVG_INSECT_BEE2(RARITY_COLORS.common) },
  { id: 42, name: "사슴벌레", scientific: "Lucanus maculifemoratus", category: "insect", rarity: "uncommon", xp: 28, description: "수컷의 큰 턱이 사슴뿔을 닮아 이름 붙여진 인기 곤충입니다. 참나무 수액을 좋아하며 여름밤에 불빛에 날아옵니다.", habitat: "산림, 참나무숲", season: "여름", image: SVG_INSECT_STAG2(RARITY_COLORS.uncommon) },

  // 추가 식물 (Plants) - 3종
  { id: 43, name: "철쭉", scientific: "Rhododendron schlippenbachii", category: "plant", rarity: "common", xp: 12, description: "봄에 연분홍 꽃을 피우는 한국 대표 봄꽃 나무입니다. 진달래와 비슷하지만 꽃과 잎이 동시에 나오는 점이 다릅니다.", habitat: "산림, 공원", season: "봄", image: SVG_PLANT_AZALEA2(RARITY_COLORS.common) },
  { id: 44, name: "은행나무", scientific: "Ginkgo biloba", category: "plant", rarity: "common", xp: 10, description: "2억 년 전부터 지구에 존재한 살아있는 화석입니다. 가을에 노랗게 물드는 부채꼴 잎이 아름다우며 가로수로 많이 심깁니다.", habitat: "가로수길, 도시공원", season: "연중", image: SVG_PLANT_GINKGO(RARITY_COLORS.common) },
  { id: 45, name: "매화", scientific: "Prunus mume", category: "plant", rarity: "uncommon", xp: 22, description: "이른 봄 눈 속에서도 꽃을 피우는 강인한 나무입니다. 은은한 향기가 특징이며 선비의 기개를 상징하는 사군자 중 하나입니다.", habitat: "정원, 사찰", season: "초봄", image: SVG_PLANT_PLUM(RARITY_COLORS.uncommon) },

  // 추가 양서류 (Amphibians) - 2종
  { id: 46, name: "도롱뇽", scientific: "Hynobius leechii", category: "amphibian", rarity: "uncommon", xp: 32, description: "깨끗한 계곡과 습지에 서식하는 양서류로 수질 지표종입니다. 봄에 젤리 같은 알주머니를 물속에 낳으며 야행성 습성을 가집니다.", habitat: "계곡, 습지, 산림", season: "봄-가을", image: SVG_AMPHIBIAN_NEWT(RARITY_COLORS.uncommon) },
  { id: 47, name: "맹꽁이", scientific: "Kaloula borealis", category: "amphibian", rarity: "rare", xp: 55, description: "장마철에만 울음소리를 들을 수 있는 희귀한 개구리입니다. '맹꽁맹꽁' 울음소리에서 이름이 유래했으며 멸종위기 야생생물로 보호받고 있습니다.", habitat: "논, 습지, 웅덩이", season: "여름", image: SVG_AMPHIBIAN_TOAD(RARITY_COLORS.rare) },

  // 추가 포유류 (Mammals) - 2종
  { id: 48, name: "족제비", scientific: "Mustela sibirica", category: "mammal", rarity: "uncommon", xp: 30, description: "날씬하고 긴 몸을 가진 소형 포유류로 쥐를 잡아먹는 천적입니다. 도시 근교에서도 가끔 목격되며 빠른 움직임이 특징입니다.", habitat: "산림, 농경지, 하천변", season: "연중", image: SVG_MAMMAL_WEASEL(RARITY_COLORS.uncommon) },
  { id: 49, name: "수달", scientific: "Lutra lutra", category: "mammal", rarity: "legendary", xp: 95, description: "하천 생태계의 최상위 포식자로 천연기념물 제330호입니다. 깨끗한 하천에만 서식하며 수질 환경의 건강 지표종으로 중요합니다.", habitat: "하천, 호수, 습지", season: "연중", image: SVG_MAMMAL_OTTER(RARITY_COLORS.legendary) },

  // 추가 파충류 (Reptiles) - 1종
  { id: 50, name: "장지뱀", scientific: "Takydromus amurensis", category: "reptile", rarity: "common", xp: 15, description: "한국에서 가장 흔히 볼 수 있는 도마뱀으로 풀밭과 돌담 주변에 서식합니다. 긴 꼬리가 특징이며 위험 시 꼬리를 자르고 도망칩니다.", habitat: "풀밭, 돌담, 공원", season: "봄-가을", image: SVG_REPTILE_LIZARD2(RARITY_COLORS.common) }
];

// 공원/위치 데이터 (서울 주요 공원 10곳)
const parkData = [
  { id: 1, name: "남산공원", lat: 37.5512, lng: 126.9882, area: "중구", biodiversity: "high", species: [1, 2, 3, 5, 11, 21, 24, 35] },
  { id: 2, name: "올림픽공원", lat: 37.5202, lng: 127.1212, area: "송파구", biodiversity: "high", species: [2, 4, 5, 7, 11, 14, 22, 27, 29] },
  { id: 3, name: "서울숲", lat: 37.5443, lng: 127.0374, area: "성동구", biodiversity: "very_high", species: [2, 3, 6, 7, 11, 12, 21, 28, 29, 35] },
  { id: 4, name: "북한산국립공원", lat: 37.6608, lng: 126.9931, area: "은평구/강북구", biodiversity: "very_high", species: [1, 3, 8, 10, 12, 17, 19, 24, 26, 30, 37] },
  { id: 5, name: "청계산", lat: 37.4444, lng: 127.0528, area: "서초구", biodiversity: "high", species: [1, 3, 9, 12, 13, 23, 24, 30, 36] },
  { id: 6, name: "여의도공원", lat: 37.5264, lng: 126.9244, area: "영등포구", biodiversity: "medium", species: [2, 5, 11, 14, 18, 21, 22, 27] },
  { id: 7, name: "보라매공원", lat: 37.4932, lng: 126.9158, area: "동작구", biodiversity: "medium", species: [2, 4, 5, 11, 16, 20, 27, 29] },
  { id: 8, name: "월드컵공원", lat: 37.5683, lng: 126.8977, area: "마포구", biodiversity: "high", species: [2, 5, 7, 11, 13, 15, 16, 28, 29, 32] },
  { id: 9, name: "용산가족공원", lat: 37.5241, lng: 126.9675, area: "용산구", biodiversity: "medium", species: [2, 5, 11, 14, 21, 22, 27, 35] },
  { id: 10, name: "양재시민의숲", lat: 37.4697, lng: 127.0378, area: "서초구", biodiversity: "high", species: [2, 3, 4, 11, 12, 16, 21, 24, 29, 36] }
];

// 퀘스트 데이터
const questData = {
  daily: [
    { id: "d1", title: "새벽 탐험가", description: "오전 6-8시 사이에 생물 1종 발견하기", reward: { xp: 30, token: 5 }, progress: 0, goal: 1, type: "time", icon: SVG_QUEST_SUNRISE },
    { id: "d2", title: "나비 수집가", description: "나비 종류 2마리 발견하기", reward: { xp: 25, token: 3 }, progress: 0, goal: 2, type: "category", category: "insect", icon: SVG_QUEST_BUTTERFLY },
    { id: "d3", title: "공원 산책", description: "서로 다른 공원 2곳 방문하기", reward: { xp: 40, token: 8 }, progress: 0, goal: 2, type: "visit", icon: SVG_QUEST_WALK },
    { id: "d4", title: "도감 채우기", description: "새로운 생물 3종 발견하기", reward: { xp: 50, token: 10 }, progress: 0, goal: 3, type: "discovery", icon: SVG_QUEST_BOOK },
    { id: "d5", title: "사진작가", description: "생물 사진 5장 촬영하기", reward: { xp: 20, token: 2 }, progress: 0, goal: 5, type: "photo", icon: SVG_QUEST_CAMERA },
    { id: "d6", title: "자연의 소리 기록하기", description: "공원에서 새소리/물소리 1분 녹음하기", reward: { xp: 35, token: 6 }, progress: 0, goal: 1, type: "sound", icon: SVG_QUEST_SOUND },
    { id: "d7", title: "계절 변화 관찰", description: "같은 장소 식물 변화 사진 촬영하기", reward: { xp: 30, token: 5 }, progress: 0, goal: 1, type: "seasonal_photo", icon: SVG_QUEST_LEAF }
  ],
  weekly: [
    { id: "w1", title: "조류 관찰자", description: "새 종류 5마리 발견하기", reward: { xp: 150, token: 30, badge: "bird_watcher" }, progress: 0, goal: 5, type: "category", category: "bird", icon: SVG_QUEST_BIRD },
    { id: "w2", title: "서울 탐험가", description: "서울 공원 5곳 방문하기", reward: { xp: 200, token: 50, badge: "seoul_explorer" }, progress: 0, goal: 5, type: "visit", icon: SVG_QUEST_MAP },
    { id: "w3", title: "희귀종 헌터", description: "희귀 등급 이상 생물 2종 발견하기", reward: { xp: 180, token: 40, badge: "rare_hunter" }, progress: 0, goal: 2, type: "rarity", rarity: ["rare", "legendary"], icon: SVG_QUEST_GEM },
    { id: "w4", title: "공원 5곳 탐방", description: "서로 다른 공원 5곳 방문하기", reward: { xp: 220, token: 55, badge: "park_master" }, progress: 0, goal: 5, type: "visit", icon: SVG_QUEST_PARK },
    { id: "w5", title: "희귀종 3종 발견", description: "고급 등급 이상 생물 3종 관찰하기", reward: { xp: 250, token: 60, badge: "rare_collector" }, progress: 0, goal: 3, type: "rarity", rarity: ["uncommon", "rare", "legendary"], icon: SVG_QUEST_SEARCH }
  ],
  seasonal: [
    { id: "s1", title: "봄맞이 대축제", description: "봄 시즌 특별 퀘스트: 봄꽃 5종, 봄 철새 3종 발견", reward: { xp: 500, token: 100, nft: "spring_master_2026" }, progress: 0, goal: 8, endDate: "2026-05-31", type: "seasonal", icon: SVG_QUEST_FLOWER },
    { id: "s2", title: "봄꽃 관찰 대작전", description: "봄에 피는 꽃 10종류를 찾아 기록하세요! 진달래, 매화, 개나리 등 다양한 봄꽃을 발견해보세요.", reward: { xp: 600, token: 120, nft: "flower_master_2026" }, progress: 0, goal: 10, endDate: "2026-05-15", type: "seasonal", participants: 1247, icon: SVG_QUEST_TULIP }
  ]
};

// 사용자 데이터 (초기 상태)
const userData = {
  id: "user_001",
  name: "에코탐험가",
  level: 5,
  xp: 450,
  xpToNext: 600,
  tokens: 125,
  joinDate: "2026-01-15",
  stats: {
    totalDiscoveries: 23,
    totalSteps: 45230,
    parksVisited: 6,
    questsCompleted: 18,
    streakDays: 7
  },
  discoveries: [2, 4, 5, 11, 14, 18, 20, 21, 22, 27, 29, 35], // 발견한 생물 ID 목록
  badges: [
    { id: "first_discovery", name: "첫 발견", description: "첫 번째 생물 발견", date: "2026-01-15", image: "🏅" },
    { id: "week_streak", name: "일주일 연속", description: "7일 연속 접속", date: "2026-01-22", image: "🔥" },
    { id: "bird_lover", name: "새 친구", description: "새 5종 발견", date: "2026-01-20", image: "🐦" }
  ],
  nfts: [
    { id: "genesis_explorer", name: "제네시스 탐험가", description: "얼리어답터 특별 NFT", rarity: "legendary", image: "⭐" }
  ],
  questProgress: {
    daily: { d1: 0, d2: 1, d3: 1, d4: 2, d5: 3, d6: 0, d7: 0 },
    weekly: { w1: 3, w2: 4, w3: 1, w4: 2, w5: 1 },
    seasonal: { s1: 4, s2: 3 }
  }
};

// 리더보드 데이터
const leaderboardData = {
  global: [
    { rank: 1, name: "자연탐험왕", level: 42, xp: 125000, discoveries: 156, avatar: "🦸", weeklyChange: 0 },
    { rank: 2, name: "숲의요정", level: 38, xp: 98500, discoveries: 142, avatar: "🧚", weeklyChange: +2 },
    { rank: 3, name: "새박사", level: 35, xp: 87200, discoveries: 128, avatar: "🦅", weeklyChange: -1 },
    { rank: 4, name: "꽃사랑", level: 32, xp: 76800, discoveries: 115, avatar: "🌸", weeklyChange: +1 },
    { rank: 5, name: "나비소녀", level: 28, xp: 65400, discoveries: 98, avatar: "🦋", weeklyChange: +3 },
    { rank: 6, name: "산책러", level: 25, xp: 54200, discoveries: 87, avatar: "🚶", weeklyChange: -2 },
    { rank: 7, name: "곤충박사", level: 24, xp: 51000, discoveries: 82, avatar: "🪲", weeklyChange: 0 },
    { rank: 8, name: "초록이", level: 22, xp: 45600, discoveries: 75, avatar: "🌱", weeklyChange: +1 },
    { rank: 9, name: "새싹탐험가", level: 20, xp: 40200, discoveries: 68, avatar: "🌿", weeklyChange: -1 },
    { rank: 10, name: "도시농부", level: 19, xp: 38500, discoveries: 62, avatar: "🧑‍🌾", weeklyChange: +2 },
    { rank: 11, name: "하늘지기", level: 18, xp: 35200, discoveries: 58, avatar: "🌤️", weeklyChange: 0 },
    { rank: 12, name: "에코탐험가", level: 5, xp: 450, discoveries: 23, avatar: "🌿", isCurrentUser: true, weeklyChange: +3 },
    { rank: 13, name: "물의정령", level: 16, xp: 30100, discoveries: 50, avatar: "💧", weeklyChange: -1 },
    { rank: 14, name: "숲속친구", level: 15, xp: 27800, discoveries: 46, avatar: "🌲", weeklyChange: 0 },
    { rank: 15, name: "꽃길탐험가", level: 14, xp: 25400, discoveries: 42, avatar: "🌻", weeklyChange: +1 }
  ],
  regional: {
    "서초구": [
      { rank: 1, name: "서초자연인", level: 28, xp: 67000, discoveries: 95, avatar: "🏔️", weeklyChange: 0 },
      { rank: 2, name: "양재숲지기", level: 22, xp: 48000, discoveries: 72, avatar: "🌳", weeklyChange: +1 },
      { rank: 3, name: "에코탐험가", level: 5, xp: 450, discoveries: 23, avatar: "🌿", isCurrentUser: true, weeklyChange: +3 },
      { rank: 4, name: "양재사랑", level: 15, xp: 28000, discoveries: 45, avatar: "💚", weeklyChange: -1 },
      { rank: 5, name: "청계나들이", level: 14, xp: 25500, discoveries: 40, avatar: "🚶", weeklyChange: 0 },
      { rank: 6, name: "서초꽃사랑", level: 12, xp: 21000, discoveries: 35, avatar: "🌸", weeklyChange: +2 },
      { rank: 7, name: "우면산탐험", level: 11, xp: 18500, discoveries: 30, avatar: "⛰️", weeklyChange: -1 },
      { rank: 8, name: "반포새친구", level: 10, xp: 16200, discoveries: 26, avatar: "🐦", weeklyChange: 0 },
      { rank: 9, name: "서초초록이", level: 9, xp: 14000, discoveries: 22, avatar: "🌱", weeklyChange: +1 },
      { rank: 10, name: "잠원나비", level: 8, xp: 12500, discoveries: 20, avatar: "🦋", weeklyChange: 0 },
      { rank: 11, name: "서리풀생태", level: 7, xp: 10800, discoveries: 18, avatar: "🍃", weeklyChange: -2 },
      { rank: 12, name: "방배숲길", level: 6, xp: 9200, discoveries: 15, avatar: "🌲", weeklyChange: +1 },
      { rank: 13, name: "서초공원러", level: 5, xp: 7500, discoveries: 12, avatar: "🏞️", weeklyChange: 0 },
      { rank: 14, name: "예술의숲", level: 4, xp: 5800, discoveries: 10, avatar: "🎨", weeklyChange: +3 },
      { rank: 15, name: "서초새싹", level: 3, xp: 3200, discoveries: 6, avatar: "🌿", weeklyChange: 0 }
    ]
  },
  guilds: [
    { rank: 1, name: "서울생태지킴이", members: 156, totalXp: 2450000, badge: "🏆", weeklyChange: 0 },
    { rank: 2, name: "한강탐험대", members: 142, totalXp: 2180000, badge: "🥈", weeklyChange: +1 },
    { rank: 3, name: "북한산친구들", members: 128, totalXp: 1950000, badge: "🥉", weeklyChange: -1 },
    { rank: 4, name: "도시정원사들", members: 98, totalXp: 1620000, badge: "🌻", weeklyChange: +2 },
    { rank: 5, name: "남산자연회", members: 87, totalXp: 1380000, badge: "🏔️", weeklyChange: 0 },
    { rank: 6, name: "청계천모임", members: 76, totalXp: 1150000, badge: "💧", weeklyChange: +1 },
    { rank: 7, name: "올림픽공원러", members: 65, totalXp: 980000, badge: "🏟️", weeklyChange: -1 },
    { rank: 8, name: "서울숲동호회", members: 58, totalXp: 840000, badge: "🌳", weeklyChange: 0 },
    { rank: 9, name: "관악산모임", members: 45, totalXp: 620000, badge: "⛰️", weeklyChange: +3 },
    { rank: 10, name: "여의도생태단", members: 38, totalXp: 480000, badge: "🌿", weeklyChange: -2 }
  ]
};

// 레벨 테이블
const levelTable = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 100 },
  { level: 3, xpRequired: 250 },
  { level: 4, xpRequired: 450 },
  { level: 5, xpRequired: 700 },
  { level: 6, xpRequired: 1000 },
  { level: 7, xpRequired: 1400 },
  { level: 8, xpRequired: 1900 },
  { level: 9, xpRequired: 2500 },
  { level: 10, xpRequired: 3200 },
  { level: 11, xpRequired: 4000 },
  { level: 12, xpRequired: 5000 },
  { level: 13, xpRequired: 6200 },
  { level: 14, xpRequired: 7600 },
  { level: 15, xpRequired: 9200 },
  { level: 16, xpRequired: 11000 },
  { level: 17, xpRequired: 13000 },
  { level: 18, xpRequired: 15500 },
  { level: 19, xpRequired: 18500 },
  { level: 20, xpRequired: 22000 }
];

// 희귀도 설정
const rarityConfig = {
  common: { name: "일반", color: "#6B7280", chance: 0.6 },
  uncommon: { name: "고급", color: "#10B981", chance: 0.25 },
  rare: { name: "희귀", color: "#3B82F6", chance: 0.12 },
  legendary: { name: "전설", color: "#F59E0B", chance: 0.03 }
};

// 카테고리 설정
const categoryConfig = {
  bird: { name: "조류", icon: SVG_CAT_BIRD, color: "#60A5FA" },
  insect: { name: "곤충", icon: SVG_CAT_INSECT, color: "#34D399" },
  plant: { name: "식물", icon: SVG_CAT_PLANT, color: "#4ADE80" },
  amphibian: { name: "양서류", icon: SVG_CAT_AMPHIBIAN, color: "#2DD4BF" },
  reptile: { name: "파충류", icon: SVG_CAT_REPTILE, color: "#A78BFA" },
  mammal: { name: "포유류", icon: SVG_CAT_MAMMAL, color: "#FB923C" }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    speciesData,
    parkData,
    questData,
    userData,
    leaderboardData,
    levelTable,
    rarityConfig,
    categoryConfig,
    RARITY_COLORS
  };
}
