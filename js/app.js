// EcoQuest 메인 애플리케이션

// 앱 상태
let appState = {
  currentScreen: 'home',
  selectedPark: null,
  selectedCategory: 'all',
  discoveryInProgress: false,
  user: { ...userData }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  updateStatusTime();
  setInterval(updateStatusTime, 60000);

  // 네비게이션 이벤트 설정
  setupNavigation();

  // 탭 이벤트 설정
  setupTabs();

  // 필터 이벤트 설정
  setupFilters();

  // 화면 데이터 로드
  loadHomeScreen();
  loadExploreScreen();
  loadCollectionScreen();
  loadQuestsScreen();
  loadLeaderboardScreen();
  loadProfileScreen();
}

// 상태바 시간 업데이트
function updateStatusTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('statusTime').textContent = `${hours}:${minutes}`;
}

// 네비게이션 설정
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item:not(.nav-center)');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const screen = item.dataset.screen;
      if (screen) {
        showScreen(screen);
      }
    });
  });
}

// 화면 전환
function showScreen(screenId) {
  // 발견 화면은 특별 처리
  if (screenId === 'discovery') {
    startDiscovery();
    return;
  }

  // 이전 화면 숨기기
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // 새 화면 표시
  const targetScreen = document.getElementById(`screen-${screenId}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    appState.currentScreen = screenId;

    // 네비게이션 활성화 상태 업데이트
    updateNavigation(screenId);
  }
}

// 네비게이션 활성화 상태 업데이트
function updateNavigation(screenId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.screen === screenId) {
      item.classList.add('active');
    }
  });
}

// 탭 설정
function setupTabs() {
  // 퀘스트 탭
  document.querySelectorAll('.quest-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchQuestTab(tab);
    });
  });

  // 랭킹 탭
  document.querySelectorAll('.ranking-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchRankingTab(tab);
    });
  });
}

// 퀘스트 탭 전환
function switchQuestTab(tab) {
  document.querySelectorAll('.quest-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  document.querySelectorAll('.quest-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tab}`);
  });
}

// 랭킹 탭 전환
function switchRankingTab(tab) {
  document.querySelectorAll('.ranking-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  // 탭에 따른 데이터 표시
  loadRankingData(tab);
}

// 필터 설정
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterCollection(category);
    });
  });
}

// 도감 필터링
function filterCollection(category) {
  appState.selectedCategory = category;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });

  renderSpeciesGrid();
}

// ===== 홈 화면 =====
function loadHomeScreen() {
  updateUserProfile();
  loadTodayQuests();
  loadRecentDiscoveries();
  loadNearbyParks();
}

function updateUserProfile() {
  const user = appState.user;
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userLevel').textContent = user.level;
  document.getElementById('userXp').textContent = user.xp;
  document.getElementById('userXpNext').textContent = user.xpToNext;
  document.getElementById('userTokens').textContent = user.tokens;

  const xpPercent = (user.xp / user.xpToNext) * 100;
  document.getElementById('xpProgress').style.width = `${xpPercent}%`;
}

function loadTodayQuests() {
  const container = document.getElementById('todayQuests');
  const quests = questData.daily.slice(0, 3);

  container.innerHTML = quests.map(quest => {
    const progress = appState.user.questProgress.daily[quest.id] || 0;
    return createQuestItem(quest, progress);
  }).join('');
}

function loadRecentDiscoveries() {
  const container = document.getElementById('recentDiscoveries');
  const discoveries = appState.user.discoveries.slice(-5).reverse();

  container.innerHTML = discoveries.map(speciesId => {
    const species = speciesData.find(s => s.id === speciesId);
    return species ? createDiscoveryItem(species) : '';
  }).join('');
}

function loadNearbyParks() {
  const container = document.getElementById('nearbyParks');
  const parks = parkData.slice(0, 3);

  container.innerHTML = parks.map(park => createParkItem(park)).join('');
}

// ===== 탐험 화면 =====
function loadExploreScreen() {
  loadParkMarkers();
}

function loadParkMarkers() {
  const container = document.getElementById('parkMarkers');
  container.innerHTML = parkData.map((park, index) =>
    createParkMarker(park, index)
  ).join('');
}

function selectPark(parkId) {
  const park = parkData.find(p => p.id === parkId);
  if (!park) return;

  appState.selectedPark = park;

  // 마커 선택 상태 업데이트
  document.querySelectorAll('.park-marker').forEach(marker => {
    marker.classList.toggle('selected', marker.dataset.parkId == parkId);
  });

  // 공원 정보 카드 표시
  const info = createParkInfoContent(park);
  const card = document.getElementById('parkInfoCard');

  document.getElementById('selectedParkName').textContent = info.name;
  document.getElementById('parkArea').textContent = info.area;
  document.getElementById('parkBiodiversity').textContent = info.biodiversity;
  document.getElementById('parkBiodiversity').className = `biodiversity-badge ${info.biodiversityClass}`;
  document.getElementById('parkSpeciesPreview').innerHTML = info.speciesPreview;

  card.style.display = 'block';
}

function toggleMapLayer() {
  const heatmap = document.getElementById('heatmapOverlay');
  heatmap.classList.toggle('active');
  showToast('생태 히트맵 토글됨');
}

// ===== 발견 화면 =====
function startDiscovery() {
  showScreen('explore');

  // 화면 전환 후 발견 모드 시작
  setTimeout(() => {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById('screen-discovery').classList.add('active');

    appState.discoveryInProgress = true;
    document.getElementById('discoveryResult').style.display = 'none';
    document.getElementById('cameraView').style.display = 'flex';

    // 스캔 시뮬레이션
    setTimeout(() => {
      simulateDiscovery();
    }, 2000);
  }, 100);
}

function simulateDiscovery() {
  // 발견할 생물 선택 (희귀도 기반 가중치)
  const undiscovered = speciesData.filter(s => !appState.user.discoveries.includes(s.id));
  let species;

  if (undiscovered.length > 0 && Math.random() < 0.7) {
    // 70% 확률로 미발견 종 선택
    const rarityWeights = undiscovered.map(s => {
      return rarityConfig[s.rarity].chance;
    });
    species = getWeightedRandom(undiscovered, rarityWeights);
  } else {
    // 이미 발견한 종 (재발견)
    const discovered = speciesData.filter(s => appState.user.discoveries.includes(s.id));
    species = getRandomItem(discovered.length > 0 ? discovered : speciesData);
  }

  showDiscoveryResult(species);
}

function showDiscoveryResult(species) {
  const isNewDiscovery = !appState.user.discoveries.includes(species.id);

  // 결과 표시
  document.getElementById('cameraView').style.display = 'none';
  const result = document.getElementById('discoveryResult');
  result.style.display = 'flex';

  document.getElementById('resultImage').textContent = species.image;
  document.getElementById('resultName').textContent = species.name;
  document.getElementById('resultScientific').textContent = species.scientific;
  document.getElementById('resultRarity').textContent = rarityConfig[species.rarity].name;
  document.getElementById('resultRarity').className = `rarity-badge ${species.rarity}`;

  // 보상 계산
  let xpReward = species.xp;
  let tokenReward = Math.floor(species.xp / 10);

  if (isNewDiscovery) {
    xpReward *= 2; // 신규 발견 보너스
    tokenReward *= 2;
    appState.user.discoveries.push(species.id);
    appState.user.stats.totalDiscoveries++;
  }

  document.getElementById('rewardXp').textContent = `+${xpReward} XP`;
  document.getElementById('rewardToken').textContent = `+${tokenReward} 토큰`;

  // 사용자 데이터 업데이트
  addXP(xpReward);
  appState.user.tokens += tokenReward;

  // 퀘스트 진행 업데이트
  updateQuestProgress('discovery', 1);
  updateQuestProgress('category', 1, species.category);
  if (species.rarity === 'rare' || species.rarity === 'legendary') {
    updateQuestProgress('rarity', 1);
  }

  // 토스트 메시지
  showToast(isNewDiscovery ? '새로운 생물 발견!' : '재발견!');

  appState.discoveryInProgress = false;
}

function continueDiscovery() {
  startDiscovery();
}

function viewSpeciesDetail() {
  const species = speciesData.find(s =>
    s.name === document.getElementById('resultName').textContent
  );
  if (species) {
    showSpeciesDetail(species.id);
  }
}

// ===== 도감 화면 =====
function loadCollectionScreen() {
  updateCollectionStats();
  renderSpeciesGrid();
}

function updateCollectionStats() {
  document.getElementById('collectionCount').textContent = appState.user.discoveries.length;
  document.getElementById('collectionTotal').textContent = speciesData.length;
}

function renderSpeciesGrid() {
  const container = document.getElementById('speciesGrid');
  let filteredSpecies = speciesData;

  if (appState.selectedCategory !== 'all') {
    filteredSpecies = speciesData.filter(s => s.category === appState.selectedCategory);
  }

  container.innerHTML = filteredSpecies.map(species => {
    const isDiscovered = appState.user.discoveries.includes(species.id);
    return createSpeciesCard(species, isDiscovered);
  }).join('');
}

function showSpeciesDetail(speciesId) {
  const species = speciesData.find(s => s.id === speciesId);
  if (!species) return;

  const isDiscovered = appState.user.discoveries.includes(speciesId);
  if (!isDiscovered) return;

  // 모달 내용 업데이트
  document.getElementById('modalImage').textContent = species.image;
  document.getElementById('modalName').textContent = species.name;
  document.getElementById('modalScientific').textContent = species.scientific;
  document.getElementById('modalRarity').textContent = rarityConfig[species.rarity].name;
  document.getElementById('modalRarity').className = `rarity-badge ${species.rarity}`;
  document.getElementById('modalHabitat').textContent = species.habitat;
  document.getElementById('modalSeason').textContent = species.season;
  document.getElementById('modalXp').textContent = `${species.xp} XP`;
  document.getElementById('modalDescription').textContent = species.description;

  // 발견일 표시
  const discoveryInfo = document.getElementById('modalDiscoveryInfo');
  discoveryInfo.innerHTML = `<span>🗓️ 발견됨</span>`;

  // 모달 표시
  document.getElementById('speciesModal').classList.add('active');
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

// ===== 퀘스트 화면 =====
function loadQuestsScreen() {
  loadDailyQuests();
  loadWeeklyQuests();
  loadSeasonalQuest();
  document.getElementById('streakDays').textContent = appState.user.stats.streakDays;
}

function loadDailyQuests() {
  const container = document.getElementById('dailyQuestList');
  container.innerHTML = questData.daily.map(quest => {
    const progress = appState.user.questProgress.daily[quest.id] || 0;
    return createQuestItemFull(quest, progress);
  }).join('');
}

function loadWeeklyQuests() {
  const container = document.getElementById('weeklyQuestList');
  container.innerHTML = questData.weekly.map(quest => {
    const progress = appState.user.questProgress.weekly[quest.id] || 0;
    return createQuestItemFull(quest, progress);
  }).join('');
}

function loadSeasonalQuest() {
  const container = document.getElementById('seasonalBanner');
  const quest = questData.seasonal[0];
  const progress = appState.user.questProgress.seasonal[quest.id] || 0;
  container.innerHTML = createSeasonalBanner(quest, progress);
}

function updateQuestProgress(type, amount, extra) {
  const quests = questData.daily;

  quests.forEach(quest => {
    if (quest.type === type) {
      if (type === 'category' && quest.category !== extra) return;

      const currentProgress = appState.user.questProgress.daily[quest.id] || 0;
      const newProgress = Math.min(currentProgress + amount, quest.goal);
      appState.user.questProgress.daily[quest.id] = newProgress;

      if (newProgress >= quest.goal && currentProgress < quest.goal) {
        // 퀘스트 완료!
        showToast(`퀘스트 완료: ${quest.title}`);
        addXP(quest.reward.xp);
        appState.user.tokens += quest.reward.token || 0;
      }
    }
  });
}

// ===== 리더보드 화면 =====
function loadLeaderboardScreen() {
  loadRankingData('global');
}

function loadRankingData(tab) {
  const topThreeContainer = document.getElementById('topThree');
  const listContainer = document.getElementById('rankingList');
  const myRankCard = document.getElementById('myRankCard');

  let players;
  if (tab === 'global') {
    players = leaderboardData.global;
  } else if (tab === 'regional') {
    players = leaderboardData.regional['서초구'] || [];
  } else {
    // 길드 탭
    const guilds = leaderboardData.guilds;
    topThreeContainer.innerHTML = '';
    listContainer.innerHTML = guilds.map((guild, index) => `
      <div class="rank-item">
        <div class="rank-number">${index + 1}</div>
        <div class="rank-avatar">${guild.badge}</div>
        <div class="rank-info">
          <div class="rank-name">${guild.name}</div>
          <div class="rank-stats">${guild.members}명 · ${formatNumber(guild.totalXp)} XP</div>
        </div>
      </div>
    `).join('');
    myRankCard.style.display = 'none';
    return;
  }

  // 상위 3인 표시
  if (players.length >= 3) {
    topThreeContainer.innerHTML = createTopThree(players.slice(0, 3));
  }

  // 나머지 순위
  listContainer.innerHTML = players.slice(3, 10).map(player =>
    createRankItem(player)
  ).join('');

  // 내 순위 카드
  const myRank = players.find(p => p.isCurrentUser);
  if (myRank) {
    myRankCard.style.display = 'block';
    myRankCard.innerHTML = createRankItem(myRank);
  }
}

// ===== 프로필 화면 =====
function loadProfileScreen() {
  const user = appState.user;

  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileLevel').textContent = user.level;
  document.getElementById('profileTokens').textContent = user.tokens;
  document.getElementById('profileBadges').textContent = user.badges.length;
  document.getElementById('profileNFTs').textContent = user.nfts.length;

  // 통계
  document.getElementById('statDiscoveries').textContent = user.stats.totalDiscoveries;
  document.getElementById('statSteps').textContent = formatNumber(user.stats.totalSteps);
  document.getElementById('statParks').textContent = user.stats.parksVisited;
  document.getElementById('statQuests').textContent = user.stats.questsCompleted;

  // 배지 갤러리
  const badgeGallery = document.getElementById('badgeGallery');
  badgeGallery.innerHTML = user.badges.map(badge => createBadgeItem(badge)).join('');
  document.getElementById('badgeCount').textContent = `${user.badges.length}개`;

  // NFT 갤러리
  const nftGallery = document.getElementById('nftGallery');
  nftGallery.innerHTML = user.nfts.map(nft => createNFTItem(nft)).join('');
  document.getElementById('nftCount').textContent = `${user.nfts.length}개`;
}

// ===== 유틸리티 함수 =====
function addXP(amount) {
  appState.user.xp += amount;

  // 레벨업 체크
  while (appState.user.xp >= appState.user.xpToNext) {
    appState.user.xp -= appState.user.xpToNext;
    appState.user.level++;

    // 다음 레벨 XP 계산
    const nextLevelData = levelTable.find(l => l.level === appState.user.level + 1);
    if (nextLevelData) {
      const currentLevelData = levelTable.find(l => l.level === appState.user.level);
      appState.user.xpToNext = nextLevelData.xpRequired - currentLevelData.xpRequired;
    } else {
      appState.user.xpToNext = appState.user.xpToNext * 1.5;
    }

    // 레벨업 모달 표시
    showLevelUpModal(appState.user.level);
  }

  // UI 업데이트
  updateUserProfile();
}

function showLevelUpModal(newLevel) {
  document.getElementById('newLevel').textContent = newLevel;
  document.getElementById('levelUpModal').classList.add('active');
}

function closeLevelUpModal() {
  document.getElementById('levelUpModal').classList.remove('active');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMessage').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeLevelUpModal();
  }
});
