// EcoQuest 목업 데이터

// 생물종 데이터 (30종 이상)
const speciesData = [
  // 조류 (Birds) - 10종
  { id: 1, name: "소쩍새", scientific: "Otus sunia", category: "bird", rarity: "rare", xp: 50, description: "야행성 소형 올빼미로 '소쩍소쩍' 울음소리가 특징입니다.", habitat: "산림, 공원", season: "봄-가을", image: "🦉" },
  { id: 2, name: "박새", scientific: "Parus minor", category: "bird", rarity: "common", xp: 10, description: "도시 공원에서 흔히 볼 수 있는 작은 새입니다.", habitat: "산림, 공원, 정원", season: "연중", image: "🐦" },
  { id: 3, name: "딱따구리", scientific: "Dendrocopos major", category: "bird", rarity: "uncommon", xp: 30, description: "나무를 쪼아 먹이를 찾는 모습이 인상적입니다.", habitat: "산림", season: "연중", image: "🪶" },
  { id: 4, name: "직박구리", scientific: "Hypsipetes amaurotis", category: "bird", rarity: "common", xp: 10, description: "시끄러운 울음소리로 존재감을 드러내는 새입니다.", habitat: "산림, 공원", season: "연중", image: "🐦" },
  { id: 5, name: "까치", scientific: "Pica pica", category: "bird", rarity: "common", xp: 5, description: "한국의 국조로 어디서나 쉽게 볼 수 있습니다.", habitat: "도시, 농촌", season: "연중", image: "🐦‍⬛" },
  { id: 6, name: "물총새", scientific: "Alcedo atthis", category: "bird", rarity: "rare", xp: 60, description: "화려한 청록색 깃털의 물가 새입니다.", habitat: "하천, 연못", season: "연중", image: "💎" },
  { id: 7, name: "원앙", scientific: "Aix galericulata", category: "bird", rarity: "uncommon", xp: 40, description: "화려한 수컷과 부부금실의 상징입니다.", habitat: "연못, 호수", season: "연중", image: "🦆" },
  { id: 8, name: "황조롱이", scientific: "Falco tinnunculus", category: "bird", rarity: "rare", xp: 70, description: "도시에 적응한 소형 맹금류입니다.", habitat: "도시, 초원", season: "연중", image: "🦅" },
  { id: 9, name: "뻐꾸기", scientific: "Cuculus canorus", category: "bird", rarity: "uncommon", xp: 35, description: "봄을 알리는 '뻐꾹' 울음소리로 유명합니다.", habitat: "산림", season: "봄-여름", image: "🐦" },
  { id: 10, name: "파랑새", scientific: "Eurystomus orientalis", category: "bird", rarity: "legendary", xp: 100, description: "아름다운 청색 깃털의 희귀 여름철새입니다.", habitat: "산림", season: "여름", image: "🔵" },

  // 곤충 (Insects) - 10종
  { id: 11, name: "호랑나비", scientific: "Papilio xuthus", category: "insect", rarity: "common", xp: 10, description: "노란 바탕에 검은 줄무늬가 특징인 나비입니다.", habitat: "공원, 정원", season: "봄-가을", image: "🦋" },
  { id: 12, name: "장수풍뎅이", scientific: "Allomyrina dichotoma", category: "insect", rarity: "uncommon", xp: 25, description: "수컷의 큰 뿔이 인상적인 대형 딱정벌레입니다.", habitat: "산림", season: "여름", image: "🪲" },
  { id: 13, name: "왕사마귀", scientific: "Tenodera sinensis", category: "insect", rarity: "uncommon", xp: 20, description: "대형 사마귀로 정원의 해충을 잡아먹습니다.", habitat: "초원, 정원", season: "여름-가을", image: "🦗" },
  { id: 14, name: "꿀벌", scientific: "Apis mellifera", category: "insect", rarity: "common", xp: 8, description: "꽃가루를 옮기는 중요한 수분 매개자입니다.", habitat: "꽃밭, 정원", season: "봄-가을", image: "🐝" },
  { id: 15, name: "반딧불이", scientific: "Luciola lateralis", category: "insect", rarity: "rare", xp: 55, description: "여름밤을 밝히는 신비로운 발광 곤충입니다.", habitat: "하천, 습지", season: "여름", image: "✨" },
  { id: 16, name: "고추잠자리", scientific: "Crocothemis servilia", category: "insect", rarity: "common", xp: 12, description: "붉은색 몸이 특징인 가을의 대표 잠자리입니다.", habitat: "연못, 습지", season: "여름-가을", image: "🪰" },
  { id: 17, name: "사슴벌레", scientific: "Lucanus maculifemoratus", category: "insect", rarity: "uncommon", xp: 30, description: "큰 턱이 사슴뿔을 닮은 인기 딱정벌레입니다.", habitat: "산림", season: "여름", image: "🪲" },
  { id: 18, name: "노랑나비", scientific: "Colias erate", category: "insect", rarity: "common", xp: 8, description: "배추밭에서 흔히 볼 수 있는 노란 나비입니다.", habitat: "농경지, 초원", season: "봄-가을", image: "🦋" },
  { id: 19, name: "왕오색나비", scientific: "Sasakia charonda", category: "insect", rarity: "legendary", xp: 90, description: "한국의 국접으로 아름다운 무늬가 특징입니다.", habitat: "산림", season: "여름", image: "👑" },
  { id: 20, name: "매미", scientific: "Cryptotympana atrata", category: "insect", rarity: "common", xp: 10, description: "여름의 시끄러운 울음소리로 유명합니다.", habitat: "산림, 공원", season: "여름", image: "🪰" },

  // 식물 (Plants) - 8종
  { id: 21, name: "은행나무", scientific: "Ginkgo biloba", category: "plant", rarity: "common", xp: 10, description: "살아있는 화석이라 불리는 고대 수종입니다.", habitat: "가로수, 공원", season: "연중", image: "🌳" },
  { id: 22, name: "무궁화", scientific: "Hibiscus syriacus", category: "plant", rarity: "common", xp: 15, description: "한국의 국화로 여름에 아름답게 핍니다.", habitat: "공원, 정원", season: "여름", image: "🌺" },
  { id: 23, name: "진달래", scientific: "Rhododendron mucronulatum", category: "plant", rarity: "common", xp: 12, description: "봄을 알리는 분홍빛 꽃입니다.", habitat: "산림", season: "봄", image: "🌸" },
  { id: 24, name: "소나무", scientific: "Pinus densiflora", category: "plant", rarity: "common", xp: 10, description: "한국을 대표하는 상록 침엽수입니다.", habitat: "산림, 공원", season: "연중", image: "🌲" },
  { id: 25, name: "금낭화", scientific: "Lamprocapnos spectabilis", category: "plant", rarity: "uncommon", xp: 25, description: "하트 모양 꽃이 아름다운 야생화입니다.", habitat: "산림 그늘", season: "봄", image: "💗" },
  { id: 26, name: "복수초", scientific: "Adonis amurensis", category: "plant", rarity: "rare", xp: 45, description: "이른 봄 눈 속에서 피는 노란 꽃입니다.", habitat: "산림", season: "초봄", image: "💛" },
  { id: 27, name: "개나리", scientific: "Forsythia koreana", category: "plant", rarity: "common", xp: 8, description: "봄을 알리는 노란 꽃의 대표 관목입니다.", habitat: "공원, 정원", season: "봄", image: "🌼" },
  { id: 28, name: "연꽃", scientific: "Nelumbo nucifera", category: "plant", rarity: "uncommon", xp: 30, description: "진흙에서 피어나는 청정한 꽃입니다.", habitat: "연못", season: "여름", image: "🪷" },

  // 양서류/파충류 (Amphibians & Reptiles) - 6종
  { id: 29, name: "청개구리", scientific: "Hyla japonica", category: "amphibian", rarity: "common", xp: 15, description: "비 오기 전 우는 작은 초록 개구리입니다.", habitat: "습지, 논", season: "봄-가을", image: "🐸" },
  { id: 30, name: "도롱뇽", scientific: "Hynobius leechii", category: "amphibian", rarity: "uncommon", xp: 35, description: "깨끗한 계곡에 사는 양서류입니다.", habitat: "계곡, 습지", season: "봄", image: "🦎" },
  { id: 31, name: "무당개구리", scientific: "Bombina orientalis", category: "amphibian", rarity: "uncommon", xp: 30, description: "배의 붉은 무늬가 특징인 개구리입니다.", habitat: "산림 계곡", season: "봄-가을", image: "🐸" },
  { id: 32, name: "줄장지뱀", scientific: "Takydromus wolteri", category: "reptile", rarity: "uncommon", xp: 25, description: "풀숲에서 볼 수 있는 작은 도마뱀입니다.", habitat: "초원, 산림 가장자리", season: "봄-가을", image: "🦎" },
  { id: 33, name: "유혈목이", scientific: "Rhabdophis tigrinus", category: "reptile", rarity: "rare", xp: 50, description: "독이 있는 뱀으로 주의가 필요합니다.", habitat: "습지, 논", season: "봄-가을", image: "🐍" },
  { id: 34, name: "자라", scientific: "Pelodiscus sinensis", category: "reptile", rarity: "rare", xp: 55, description: "민물에 사는 연갑 거북입니다.", habitat: "하천, 연못", season: "봄-가을", image: "🐢" },

  // 포유류 (Mammals) - 4종
  { id: 35, name: "다람쥐", scientific: "Tamias sibiricus", category: "mammal", rarity: "common", xp: 20, description: "볼에 먹이를 저장하는 귀여운 설치류입니다.", habitat: "산림, 공원", season: "봄-가을", image: "🐿️" },
  { id: 36, name: "청설모", scientific: "Sciurus vulgaris", category: "mammal", rarity: "uncommon", xp: 25, description: "붉은 털의 나무타기 명수입니다.", habitat: "산림, 공원", season: "연중", image: "🐿️" },
  { id: 37, name: "고라니", scientific: "Hydropotes inermis", category: "mammal", rarity: "rare", xp: 60, description: "뿔 없는 사슴으로 한국 고유종입니다.", habitat: "산림, 습지", season: "연중", image: "🦌" },
  { id: 38, name: "너구리", scientific: "Nyctereutes procyonoides", category: "mammal", rarity: "rare", xp: 55, description: "야행성 잡식동물로 도시에도 출몰합니다.", habitat: "산림", season: "연중", image: "🦝" }
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
    { id: "d1", title: "새벽 탐험가", description: "오전 6-8시 사이에 생물 1종 발견하기", reward: { xp: 30, token: 5 }, progress: 0, goal: 1, type: "time", icon: "🌅" },
    { id: "d2", title: "나비 수집가", description: "나비 종류 2마리 발견하기", reward: { xp: 25, token: 3 }, progress: 0, goal: 2, type: "category", category: "insect", icon: "🦋" },
    { id: "d3", title: "공원 산책", description: "서로 다른 공원 2곳 방문하기", reward: { xp: 40, token: 8 }, progress: 0, goal: 2, type: "visit", icon: "🚶" },
    { id: "d4", title: "도감 채우기", description: "새로운 생물 3종 발견하기", reward: { xp: 50, token: 10 }, progress: 0, goal: 3, type: "discovery", icon: "📚" },
    { id: "d5", title: "사진작가", description: "생물 사진 5장 촬영하기", reward: { xp: 20, token: 2 }, progress: 0, goal: 5, type: "photo", icon: "📸" }
  ],
  weekly: [
    { id: "w1", title: "조류 관찰자", description: "새 종류 5마리 발견하기", reward: { xp: 150, token: 30, badge: "bird_watcher" }, progress: 0, goal: 5, type: "category", category: "bird", icon: "🐦" },
    { id: "w2", title: "서울 탐험가", description: "서울 공원 5곳 방문하기", reward: { xp: 200, token: 50, badge: "seoul_explorer" }, progress: 0, goal: 5, type: "visit", icon: "🗺️" },
    { id: "w3", title: "희귀종 헌터", description: "희귀 등급 이상 생물 2종 발견하기", reward: { xp: 180, token: 40, badge: "rare_hunter" }, progress: 0, goal: 2, type: "rarity", rarity: ["rare", "legendary"], icon: "💎" }
  ],
  seasonal: [
    { id: "s1", title: "봄맞이 대축제", description: "봄 시즌 특별 퀘스트: 봄꽃 5종, 봄 철새 3종 발견", reward: { xp: 500, token: 100, nft: "spring_master_2026" }, progress: 0, goal: 8, endDate: "2026-05-31", type: "seasonal", icon: "🌸" }
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
    daily: { d1: 0, d2: 1, d3: 1, d4: 2, d5: 3 },
    weekly: { w1: 3, w2: 4, w3: 1 },
    seasonal: { s1: 4 }
  }
};

// 리더보드 데이터
const leaderboardData = {
  global: [
    { rank: 1, name: "자연탐험왕", level: 42, xp: 125000, discoveries: 156, avatar: "🦸" },
    { rank: 2, name: "숲의요정", level: 38, xp: 98500, discoveries: 142, avatar: "🧚" },
    { rank: 3, name: "새박사", level: 35, xp: 87200, discoveries: 128, avatar: "🦅" },
    { rank: 4, name: "꽃사랑", level: 32, xp: 76800, discoveries: 115, avatar: "🌸" },
    { rank: 5, name: "에코탐험가", level: 5, xp: 450, discoveries: 23, avatar: "🌿", isCurrentUser: true },
    { rank: 6, name: "나비소녀", level: 28, xp: 65400, discoveries: 98, avatar: "🦋" },
    { rank: 7, name: "산책러", level: 25, xp: 54200, discoveries: 87, avatar: "🚶" },
    { rank: 8, name: "곤충박사", level: 24, xp: 51000, discoveries: 82, avatar: "🪲" },
    { rank: 9, name: "초록이", level: 22, xp: 45600, discoveries: 75, avatar: "🌱" },
    { rank: 10, name: "새싹탐험가", level: 20, xp: 40200, discoveries: 68, avatar: "🌿" }
  ],
  regional: {
    "서초구": [
      { rank: 1, name: "서초자연인", level: 28, xp: 67000, discoveries: 95 },
      { rank: 2, name: "에코탐험가", level: 5, xp: 450, discoveries: 23, isCurrentUser: true },
      { rank: 3, name: "양재사랑", level: 15, xp: 28000, discoveries: 45 }
    ]
  },
  guilds: [
    { rank: 1, name: "서울생태지킴이", members: 156, totalXp: 2450000, badge: "🏆" },
    { rank: 2, name: "한강탐험대", members: 142, totalXp: 2180000, badge: "🥈" },
    { rank: 3, name: "북한산친구들", members: 128, totalXp: 1950000, badge: "🥉" }
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
  bird: { name: "조류", icon: "🐦", color: "#60A5FA" },
  insect: { name: "곤충", icon: "🦋", color: "#34D399" },
  plant: { name: "식물", icon: "🌿", color: "#4ADE80" },
  amphibian: { name: "양서류", icon: "🐸", color: "#2DD4BF" },
  reptile: { name: "파충류", icon: "🦎", color: "#A78BFA" },
  mammal: { name: "포유류", icon: "🐿️", color: "#FB923C" }
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
    categoryConfig
  };
}
