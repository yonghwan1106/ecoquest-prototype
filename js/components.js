// EcoQuest UI 컴포넌트

// 퀘스트 아이템 컴포넌트
function createQuestItem(quest, progress) {
  const progressPercent = Math.min((progress / quest.goal) * 100, 100);
  const isComplete = progress >= quest.goal;

  return `
    <div class="quest-item card-press ${isComplete ? 'completed' : ''}" data-quest-id="${quest.id}">
      <div class="quest-icon svg-icon">${quest.icon}</div>
      <div class="quest-info">
        <div class="quest-title">${quest.title}</div>
        <div class="quest-progress-text">${progress}/${quest.goal}</div>
        <div class="quest-progress-bar">
          <div class="quest-progress-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>
      <div class="quest-reward">
        <span>+${quest.reward.xp} XP</span>
        ${quest.reward.token ? `<span>+${quest.reward.token} 🪙</span>` : ''}
      </div>
    </div>
  `;
}

// 퀘스트 아이템 (전체 버전) 컴포넌트
function createQuestItemFull(quest, progress) {
  const progressPercent = Math.min((progress / quest.goal) * 100, 100);
  const isComplete = progress >= quest.goal;

  return `
    <div class="quest-item-full card-press ${isComplete ? 'completed' : ''}" data-quest-id="${quest.id}">
      <div class="quest-item-header">
        <div class="quest-item-icon svg-icon">${quest.icon}</div>
        <div class="quest-item-info">
          <div class="quest-item-title">${quest.title}</div>
          <div class="quest-item-desc">${quest.description}</div>
        </div>
      </div>
      <div class="quest-item-rewards">
        <div class="quest-reward-item xp">⭐ ${quest.reward.xp} XP</div>
        ${quest.reward.token ? `<div class="quest-reward-item token">🪙 ${quest.reward.token} 토큰</div>` : ''}
        ${quest.reward.badge ? `<div class="quest-reward-item badge">🏅 배지</div>` : ''}
      </div>
      <div class="quest-item-progress">
        <div class="quest-progress-bar-full">
          <div class="quest-progress-fill-full" style="width: ${progressPercent}%"></div>
        </div>
        <div class="quest-progress-text-full">${progress}/${quest.goal}</div>
      </div>
    </div>
  `;
}

// 발견 아이템 컴포넌트
function createDiscoveryItem(species) {
  return `
    <div class="discovery-item" onclick="showSpeciesDetail(${species.id})">
      <div class="discovery-image svg-icon">${species.image}</div>
      <div class="discovery-name">${species.name}</div>
    </div>
  `;
}

// 공원 아이템 컴포넌트
function createParkItem(park) {
  const biodiversityText = {
    very_high: '매우 높음',
    high: '높음',
    medium: '보통'
  };

  return `
    <div class="park-item card-press" onclick="selectPark(${park.id})">
      <div class="park-icon">🏞️</div>
      <div class="park-info">
        <div class="park-name">${park.name}</div>
        <div class="park-area">${park.area}</div>
      </div>
      <span class="biodiversity-badge ${park.biodiversity}">${biodiversityText[park.biodiversity]}</span>
    </div>
  `;
}

// 생물 카드 컴포넌트
function createSpeciesCard(species, isDiscovered) {
  const lockedSvg = species.image ? species.image.replace(/fill="[^"]*"/g, 'fill="#9CA3AF"') : '';
  return `
    <div class="species-card card-press ${isDiscovered ? 'discovered' : 'undiscovered'}"
         onclick="${isDiscovered ? `showSpeciesDetail(${species.id})` : ''}">
      <div class="species-card-rarity ${species.rarity}"></div>
      <div class="species-card-image svg-icon${isDiscovered ? '' : ' locked'}">${isDiscovered ? species.image : lockedSvg || '❓'}</div>
      <div class="species-card-name">${isDiscovered ? species.name : '???'}</div>
    </div>
  `;
}

// 공원 마커 컴포넌트
function createParkMarker(park, index) {
  // 간단한 그리드 기반 위치 계산
  const positions = [
    { top: '25%', left: '30%' },
    { top: '35%', left: '70%' },
    { top: '20%', left: '50%' },
    { top: '15%', left: '25%' },
    { top: '55%', left: '60%' },
    { top: '45%', left: '20%' },
    { top: '60%', left: '40%' },
    { top: '30%', left: '85%' },
    { top: '70%', left: '75%' },
    { top: '75%', left: '30%' }
  ];

  const pos = positions[index % positions.length];

  return `
    <div class="park-marker"
         data-park-id="${park.id}"
         style="top: ${pos.top}; left: ${pos.left}"
         onclick="selectPark(${park.id})">
      🏞️
    </div>
  `;
}

// 랭킹 아이템 컴포넌트
function createRankItem(player, showCurrentUser = true) {
  const isCurrentUser = player.isCurrentUser && showCurrentUser;

  return `
    <div class="rank-item ${isCurrentUser ? 'current-user' : ''}">
      <div class="rank-number">${player.rank}</div>
      <div class="rank-avatar">${player.avatar || '👤'}</div>
      <div class="rank-info">
        <div class="rank-name">${player.name}${isCurrentUser ? ' (나)' : ''}</div>
        <div class="rank-stats">Lv.${player.level} · ${player.discoveries}종 발견</div>
      </div>
      <div class="rank-xp">${formatNumber(player.xp)} XP</div>
    </div>
  `;
}

// 상위 3인 컴포넌트
function createTopThree(players) {
  const [first, second, third] = players;

  return `
    <div class="top-player second">
      <div class="rank-badge">🥈</div>
      <div class="avatar">${second.avatar}</div>
      <div class="name">${second.name}</div>
      <div class="xp">${formatNumber(second.xp)} XP</div>
    </div>
    <div class="top-player first">
      <div class="rank-badge">🥇</div>
      <div class="avatar">${first.avatar}</div>
      <div class="name">${first.name}</div>
      <div class="xp">${formatNumber(first.xp)} XP</div>
    </div>
    <div class="top-player third">
      <div class="rank-badge">🥉</div>
      <div class="avatar">${third.avatar}</div>
      <div class="name">${third.name}</div>
      <div class="xp">${formatNumber(third.xp)} XP</div>
    </div>
  `;
}

// 배지 아이템 컴포넌트
function createBadgeItem(badge) {
  return `
    <div class="badge-item">
      <span class="badge-icon">${badge.image}</span>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-date">${formatDate(badge.date)}</div>
    </div>
  `;
}

// NFT 아이템 컴포넌트
function createNFTItem(nft) {
  return `
    <div class="nft-item">
      <span class="nft-icon">${nft.image}</span>
      <div class="nft-name">${nft.name}</div>
      <div class="nft-rarity">${rarityConfig[nft.rarity].name}</div>
    </div>
  `;
}

// 시즌 퀘스트 배너 컴포넌트
function createSeasonalBanner(quest, progress) {
  const progressPercent = Math.min((progress / quest.goal) * 100, 100);
  const daysLeft = Math.max(0, Math.ceil((new Date(quest.endDate) - new Date()) / (1000 * 60 * 60 * 24)));
  const participantsText = quest.participants ? `${quest.participants.toLocaleString()}명 참여 중` : '';

  return `
    <div class="seasonal-banner-card" data-quest-id="${quest.id}">
      <div class="seasonal-banner-header">
        <div class="seasonal-icon svg-icon">${quest.icon}</div>
        <div class="seasonal-badge-area">
          <span class="seasonal-event-badge">시즌 이벤트</span>
          ${daysLeft > 0 ? `<span class="seasonal-days-left">D-${daysLeft}</span>` : '<span class="seasonal-ended">종료됨</span>'}
        </div>
      </div>
      <h3 class="seasonal-title">${quest.title}</h3>
      <p class="seasonal-desc">${quest.description}</p>
      ${participantsText ? `<p class="seasonal-participants">👥 ${participantsText}</p>` : ''}
      <div class="seasonal-progress">
        <div class="quest-progress-bar-full">
          <div class="quest-progress-fill-full" style="width: ${progressPercent}%; background: linear-gradient(90deg, #EC4899, #F472B6);"></div>
        </div>
        <div class="quest-progress-text-full" style="color: #9D174D;">${progress}/${quest.goal}</div>
      </div>
      <div class="seasonal-rewards">
        <div class="seasonal-reward">
          <span class="seasonal-reward-icon">⭐</span>
          <span class="seasonal-reward-label">${quest.reward.xp} XP</span>
        </div>
        <div class="seasonal-reward">
          <span class="seasonal-reward-icon">🪙</span>
          <span class="seasonal-reward-label">${quest.reward.token} 토큰</span>
        </div>
        <div class="seasonal-reward">
          <span class="seasonal-reward-icon">🎨</span>
          <span class="seasonal-reward-label">NFT</span>
        </div>
      </div>
      <p class="seasonal-end-date">종료: ${quest.endDate}</p>
    </div>
  `;
}

// 생물 상세 모달 내용 컴포넌트
function createSpeciesDetailContent(species, discoveryDate) {
  return {
    image: species.image,
    name: species.name,
    scientific: species.scientific,
    rarity: species.rarity,
    rarityName: rarityConfig[species.rarity].name,
    habitat: species.habitat,
    season: species.season,
    xp: species.xp,
    description: species.description,
    discoveryDate: discoveryDate ? formatDate(discoveryDate) : null
  };
}

// 공원 정보 카드 내용 컴포넌트
function createParkInfoContent(park) {
  const biodiversityText = {
    very_high: '매우 높음',
    high: '높음',
    medium: '보통'
  };

  const speciesPreview = park.species.slice(0, 6).map(speciesId => {
    const species = speciesData.find(s => s.id === speciesId);
    return species ? `<div class="species-mini svg-icon">${species.image}</div>` : '';
  }).join('');

  return {
    name: park.name,
    area: park.area,
    biodiversity: biodiversityText[park.biodiversity],
    biodiversityClass: park.biodiversity,
    speciesPreview: speciesPreview
  };
}

// 유틸리티 함수: 숫자 포맷
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// 유틸리티 함수: 날짜 포맷
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

// 유틸리티 함수: 랜덤 아이템 선택
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 유틸리티 함수: 가중치 기반 랜덤 선택
function getWeightedRandom(items, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  return items[items.length - 1];
}
