// EcoQuest 메인 애플리케이션
// 조경 2050 공모전 프로토타입

// 앱 상태
let appState = {
  currentScreen: 'home',
  selectedPark: null,
  selectedCategory: 'all',
  discoveryInProgress: false,
  user: { ...userData },
  leafletMap: null,
  cameraStream: null,
  onboardingComplete: false
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // 인트로 파티클 초기화
  if (typeof initParticles === 'function') {
    initParticles();
  }

  // 가이드 투어 초기화
  if (typeof initGuideTour === 'function') {
    initGuideTour();
  }

  // 상태바 시간 업데이트
  updateStatusTime();
  setInterval(updateStatusTime, 60000);

  // 인트로 화면 버튼 이벤트
  setupIntroEvents();

  // 온보딩 저장된 상태 확인
  if (localStorage.getItem('ecoquest_onboarding_complete')) {
    appState.onboardingComplete = true;
  }
}

// 인트로 이벤트 설정
function setupIntroEvents() {
  const startBtn = document.getElementById('startAppBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (appState.onboardingComplete) {
        hideIntro();
        showMainApp();
      } else {
        hideIntro();
        showOnboarding();
      }
    });
  }
}

// 인트로 화면 숨기기
function hideIntro() {
  const intro = document.getElementById('introScreen');
  if (intro) {
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.classList.add('hidden');
      intro.style.opacity = '1';
    }, 500);
  }
}

// 온보딩 표시
function showOnboarding() {
  const onboarding = document.getElementById('onboardingScreen');
  if (onboarding) {
    onboarding.classList.remove('hidden');
    onboarding.style.opacity = '0';
    setTimeout(() => {
      onboarding.style.opacity = '1';
    }, 50);
  }
}

// 온보딩 슬라이드 전환
let currentSlide = 0;
const totalSlides = 3;

function nextOnboardingSlide() {
  currentSlide++;

  if (currentSlide >= totalSlides) {
    completeOnboarding();
    return;
  }

  updateOnboardingSlide();
}

function prevOnboardingSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateOnboardingSlide();
  }
}

function updateOnboardingSlide() {
  // 모든 슬라이드 숨기기
  document.querySelectorAll('.onboarding-slide').forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  // 인디케이터 업데이트
  document.querySelectorAll('.indicator').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });

  // 이전 버튼 표시/숨김
  const prevBtn = document.querySelector('.onboarding-nav .prev-btn');
  if (prevBtn) {
    prevBtn.style.visibility = currentSlide > 0 ? 'visible' : 'hidden';
  }

  // 다음 버튼 텍스트
  const nextBtn = document.querySelector('.onboarding-nav .next-btn');
  if (nextBtn) {
    nextBtn.textContent = currentSlide === totalSlides - 1 ? '시작하기' : '다음';
  }
}

function completeOnboarding() {
  appState.onboardingComplete = true;
  localStorage.setItem('ecoquest_onboarding_complete', 'true');

  const onboarding = document.getElementById('onboardingScreen');
  if (onboarding) {
    onboarding.style.opacity = '0';
    setTimeout(() => {
      onboarding.classList.add('hidden');
      showMainApp();
    }, 500);
  }
}

// 메인 앱 표시
function showMainApp() {
  const mainApp = document.getElementById('mainApp');
  if (mainApp) {
    mainApp.classList.remove('hidden');
    mainApp.style.opacity = '0';
    setTimeout(() => {
      mainApp.style.opacity = '1';
      initMainApp();
    }, 50);
  }
}

// 메인 앱 초기화
function initMainApp() {
  // 네비게이션 이벤트 설정
  setupNavigation();

  // 탭 이벤트 설정
  setupTabs();

  // 필터 이벤트 설정
  setupFilters();

  // Leaflet 지도 초기화
  initLeafletMap();

  // 화면 데이터 로드
  loadHomeScreen();
  loadCollectionScreen();
  loadQuestsScreen();
  loadLeaderboardScreen();
  loadProfileScreen();
  loadImpactDashboard();
}

// 상태바 시간 업데이트
function updateStatusTime() {
  const statusTime = document.getElementById('statusTime');
  if (statusTime) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    statusTime.textContent = `${hours}:${minutes}`;
  }
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

    // 탐험 화면이면 지도 리사이즈
    if (screenId === 'explore' && appState.leafletMap) {
      setTimeout(() => {
        appState.leafletMap.invalidateSize();
      }, 100);
    }
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

// ===== Leaflet 지도 =====
function initLeafletMap() {
  const mapContainer = document.getElementById('leafletMap');
  if (!mapContainer || typeof L === 'undefined') return;

  // 서울 중심 좌표
  const seoulCenter = [37.5665, 126.9780];

  // 지도 생성
  appState.leafletMap = L.map('leafletMap', {
    center: seoulCenter,
    zoom: 12,
    zoomControl: false
  });

  // 타일 레이어 (CartoDB Positron - 깔끔한 스타일)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB',
    maxZoom: 19
  }).addTo(appState.leafletMap);

  // 줌 컨트롤 우측 하단에 추가
  L.control.zoom({ position: 'bottomright' }).addTo(appState.leafletMap);

  // 공원 마커 추가
  addParkMarkers();

  // 현재 위치 표시 (시뮬레이션)
  addCurrentLocationMarker();
}

// 공원 마커 추가
function addParkMarkers() {
  if (!appState.leafletMap) return;

  parkData.forEach(park => {
    // 커스텀 아이콘
    const icon = L.divIcon({
      className: 'park-marker-icon',
      html: `
        <div class="marker-content" style="background: linear-gradient(135deg, #10B981, #059669);">
          <span>🌳</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const marker = L.marker([park.lat, park.lng], { icon: icon })
      .addTo(appState.leafletMap);

    // 팝업 내용
    const speciesPreview = park.species.slice(0, 3).map(id => {
      const species = speciesData.find(s => s.id === id);
      return species ? species.image : '';
    }).join(' ');

    const popupContent = `
      <div class="park-popup">
        <h3>${park.name}</h3>
        <p class="park-area">${park.area}</p>
        <div class="park-biodiversity">
          <span class="biodiversity-badge ${park.biodiversity.toLowerCase()}">${park.biodiversity}</span>
        </div>
        <div class="park-species-preview">${speciesPreview}</div>
        <button class="popup-btn" onclick="selectParkFromMap(${park.id})">탐험하기</button>
      </div>
    `;

    marker.bindPopup(popupContent, {
      className: 'custom-popup'
    });
  });
}

// 현재 위치 마커
function addCurrentLocationMarker() {
  if (!appState.leafletMap) return;

  // 시뮬레이션 위치 (서울 중심 근처)
  const currentLocation = [37.5665, 126.9780];

  const pulsingIcon = L.divIcon({
    className: 'current-location-icon',
    html: `
      <div class="location-dot">
        <div class="location-pulse"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  L.marker(currentLocation, { icon: pulsingIcon })
    .addTo(appState.leafletMap)
    .bindPopup('현재 위치');
}

// 지도에서 공원 선택
function selectParkFromMap(parkId) {
  const park = parkData.find(p => p.id === parkId);
  if (!park) return;

  appState.selectedPark = park;
  showToast(`${park.name} 선택됨!`);

  // 해당 위치로 지도 이동
  if (appState.leafletMap) {
    appState.leafletMap.flyTo([park.lat, park.lng], 15, {
      duration: 1
    });
  }
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
  loadImpactSummary();
}

function updateUserProfile() {
  const user = appState.user;

  const elements = {
    userName: document.getElementById('userName'),
    userLevel: document.getElementById('userLevel'),
    userXp: document.getElementById('userXp'),
    userXpNext: document.getElementById('userXpNext'),
    userTokens: document.getElementById('userTokens'),
    xpProgress: document.getElementById('xpProgress')
  };

  if (elements.userName) elements.userName.textContent = user.name;
  if (elements.userLevel) elements.userLevel.textContent = user.level;
  if (elements.userXp) elements.userXp.textContent = user.xp;
  if (elements.userXpNext) elements.userXpNext.textContent = user.xpToNext;
  if (elements.userTokens) elements.userTokens.textContent = user.tokens;

  if (elements.xpProgress) {
    const xpPercent = (user.xp / user.xpToNext) * 100;
    elements.xpProgress.style.width = `${xpPercent}%`;
  }
}

function loadImpactSummary() {
  const user = appState.user;

  const impactSpecies = document.getElementById('impactSpecies');
  const impactDistance = document.getElementById('impactDistance');
  const impactData = document.getElementById('impactData');

  if (impactSpecies) impactSpecies.textContent = user.discoveries.length;
  if (impactDistance) impactDistance.textContent = (user.stats.totalSteps * 0.7 / 1000).toFixed(1);
  if (impactData) impactData.textContent = user.discoveries.length * 3;
}

function loadTodayQuests() {
  const container = document.getElementById('todayQuests');
  if (!container) return;

  const quests = questData.daily.slice(0, 3);

  container.innerHTML = quests.map(quest => {
    const progress = appState.user.questProgress.daily[quest.id] || 0;
    return createQuestItem(quest, progress);
  }).join('');
}

function loadRecentDiscoveries() {
  const container = document.getElementById('recentDiscoveries');
  if (!container) return;

  const discoveries = appState.user.discoveries.slice(-5).reverse();

  container.innerHTML = discoveries.map(speciesId => {
    const species = speciesData.find(s => s.id === speciesId);
    return species ? createDiscoveryItem(species) : '';
  }).join('');
}

// ===== 발견 화면 (AI 카메라) =====
function startDiscovery() {
  // 화면 전환
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById('screen-discovery').classList.add('active');
  appState.currentScreen = 'discovery';

  appState.discoveryInProgress = true;

  // 결과 숨기고 카메라 뷰 표시
  const discoveryResult = document.getElementById('discoveryResult');
  const cameraView = document.getElementById('cameraView');

  if (discoveryResult) discoveryResult.style.display = 'none';
  if (cameraView) cameraView.style.display = 'flex';

  // AI 상태 초기화
  updateAIStatus('waiting', '생물을 찾는 중...');

  // 카메라 시작 시도 또는 데모 모드
  startCameraOrDemo();
}

// 카메라 시작 또는 데모 모드
function startCameraOrDemo() {
  const video = document.getElementById('cameraFeed');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        appState.cameraStream = stream;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
        // 실제 카메라 사용 시에도 3초 후 시뮬레이션 발견
        setTimeout(simulateAIDetection, 3000);
      })
      .catch(() => {
        // 카메라 접근 불가 시 데모 모드
        startCameraDemo();
      });
  } else {
    startCameraDemo();
  }
}

// 카메라 데모 모드
function startCameraDemo() {
  const video = document.getElementById('cameraFeed');
  if (video) {
    // 데모용 그라디언트 배경 (비디오 대신)
    video.style.display = 'none';
  }

  updateAIStatus('scanning', 'AI 스캔 중...');

  // 3초 후 발견 시뮬레이션
  setTimeout(simulateAIDetection, 3000);
}

// AI 상태 업데이트
function updateAIStatus(status, text) {
  const aiStatus = document.querySelector('.ai-status');
  const statusText = document.querySelector('.ai-status-text');

  if (aiStatus) {
    aiStatus.className = `ai-status ${status}`;
  }
  if (statusText) {
    statusText.textContent = text;
  }
}

// AI 탐지 시뮬레이션
function simulateAIDetection() {
  updateAIStatus('detected', '생물 감지됨!');

  // 1초 후 결과 표시
  setTimeout(() => {
    simulateDiscovery();
  }, 1000);
}

// 촬영 시뮬레이션 (가이드 투어용)
function simulateCapture() {
  updateAIStatus('detected', '생물 감지됨!');
  setTimeout(simulateDiscovery, 500);
}

// 발견 시뮬레이션
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

// 발견 결과 표시
function showDiscoveryResult(species) {
  const isNewDiscovery = !appState.user.discoveries.includes(species.id);

  // 카메라 스트림 정지
  if (appState.cameraStream) {
    appState.cameraStream.getTracks().forEach(track => track.stop());
    appState.cameraStream = null;
  }

  // 결과 표시
  const cameraView = document.getElementById('cameraView');
  const result = document.getElementById('discoveryResult');

  if (cameraView) cameraView.style.display = 'none';
  if (result) result.style.display = 'flex';

  // 결과 내용 업데이트
  const elements = {
    resultImage: document.getElementById('resultImage'),
    resultName: document.getElementById('resultName'),
    resultScientific: document.getElementById('resultScientific'),
    resultRarity: document.getElementById('resultRarity'),
    resultConfidence: document.getElementById('resultConfidence'),
    rewardXp: document.getElementById('rewardXp'),
    rewardToken: document.getElementById('rewardToken')
  };

  if (elements.resultImage) elements.resultImage.textContent = species.image;
  if (elements.resultName) elements.resultName.textContent = species.name;
  if (elements.resultScientific) elements.resultScientific.textContent = species.scientific;

  if (elements.resultRarity) {
    elements.resultRarity.textContent = rarityConfig[species.rarity].name;
    elements.resultRarity.className = `rarity-badge ${species.rarity}`;
  }

  // AI 신뢰도 (시뮬레이션)
  const confidence = (85 + Math.random() * 14).toFixed(1);
  if (elements.resultConfidence) {
    elements.resultConfidence.textContent = `AI 신뢰도: ${confidence}%`;
  }

  // 보상 계산
  let xpReward = species.xp;
  let tokenReward = Math.floor(species.xp / 10);

  if (isNewDiscovery) {
    xpReward *= 2; // 신규 발견 보너스
    tokenReward *= 2;
    appState.user.discoveries.push(species.id);
    appState.user.stats.totalDiscoveries++;
  }

  if (elements.rewardXp) elements.rewardXp.textContent = `+${xpReward} XP`;
  if (elements.rewardToken) elements.rewardToken.textContent = `+${tokenReward} 토큰`;

  // 축하 파티클 효과
  if (typeof triggerCelebration === 'function') {
    triggerCelebration(species.rarity);
  }

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
  showToast(isNewDiscovery ? '🎉 새로운 생물 발견!' : '재발견!');

  appState.discoveryInProgress = false;
}

function continueDiscovery() {
  startDiscovery();
}

function viewSpeciesDetail() {
  const resultName = document.getElementById('resultName');
  if (!resultName) return;

  const species = speciesData.find(s => s.name === resultName.textContent);
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
  const collectionCount = document.getElementById('collectionCount');
  const collectionTotal = document.getElementById('collectionTotal');

  if (collectionCount) collectionCount.textContent = appState.user.discoveries.length;
  if (collectionTotal) collectionTotal.textContent = speciesData.length;
}

function renderSpeciesGrid() {
  const container = document.getElementById('speciesGrid');
  if (!container) return;

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
  const elements = {
    modalImage: document.getElementById('modalImage'),
    modalName: document.getElementById('modalName'),
    modalScientific: document.getElementById('modalScientific'),
    modalRarity: document.getElementById('modalRarity'),
    modalHabitat: document.getElementById('modalHabitat'),
    modalSeason: document.getElementById('modalSeason'),
    modalXp: document.getElementById('modalXp'),
    modalDescription: document.getElementById('modalDescription'),
    modalDiscoveryInfo: document.getElementById('modalDiscoveryInfo')
  };

  if (elements.modalImage) elements.modalImage.textContent = species.image;
  if (elements.modalName) elements.modalName.textContent = species.name;
  if (elements.modalScientific) elements.modalScientific.textContent = species.scientific;

  if (elements.modalRarity) {
    elements.modalRarity.textContent = rarityConfig[species.rarity].name;
    elements.modalRarity.className = `rarity-badge ${species.rarity}`;
  }

  if (elements.modalHabitat) elements.modalHabitat.textContent = species.habitat;
  if (elements.modalSeason) elements.modalSeason.textContent = species.season;
  if (elements.modalXp) elements.modalXp.textContent = `${species.xp} XP`;
  if (elements.modalDescription) elements.modalDescription.textContent = species.description;

  if (elements.modalDiscoveryInfo) {
    elements.modalDiscoveryInfo.innerHTML = `<span>🗓️ 발견됨</span>`;
  }

  // 모달 표시
  const modal = document.getElementById('speciesModal');
  if (modal) modal.classList.add('active');
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

  const streakDays = document.getElementById('streakDays');
  if (streakDays) streakDays.textContent = appState.user.stats.streakDays;
}

function loadDailyQuests() {
  const container = document.getElementById('dailyQuestList');
  if (!container) return;

  container.innerHTML = questData.daily.map(quest => {
    const progress = appState.user.questProgress.daily[quest.id] || 0;
    return createQuestItemFull(quest, progress);
  }).join('');
}

function loadWeeklyQuests() {
  const container = document.getElementById('weeklyQuestList');
  if (!container) return;

  container.innerHTML = questData.weekly.map(quest => {
    const progress = appState.user.questProgress.weekly[quest.id] || 0;
    return createQuestItemFull(quest, progress);
  }).join('');
}

function loadSeasonalQuest() {
  const container = document.getElementById('seasonalBanner');
  if (!container) return;

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
        showToast(`🎯 퀘스트 완료: ${quest.title}`);
        addXP(quest.reward.xp);
        appState.user.tokens += quest.reward.token || 0;
      }
    }
  });
}

// ===== 임팩트 대시보드 =====
function loadImpactDashboard() {
  // 통계 데이터 업데이트
  const totalSpecies = document.getElementById('totalSpeciesCount');
  const totalObservers = document.getElementById('totalObserversCount');
  const totalObservations = document.getElementById('totalObservationsCount');
  const biodiversityIndex = document.getElementById('biodiversityIndex');

  if (totalSpecies) totalSpecies.textContent = speciesData.length;
  if (totalObservers) totalObservers.textContent = '2,847';
  if (totalObservations) totalObservations.textContent = '12,459';
  if (biodiversityIndex) biodiversityIndex.textContent = '0.73';

  // 차트 렌더링 (CSS 기반 간단한 차트)
  renderImpactChart();
  renderSpeciesDistribution();
}

function renderImpactChart() {
  const chartContainer = document.querySelector('.chart-bars');
  if (!chartContainer) return;

  // 월별 데이터 (시뮬레이션)
  const monthlyData = [
    { month: '1월', value: 45 },
    { month: '2월', value: 52 },
    { month: '3월', value: 78 },
    { month: '4월', value: 120 },
    { month: '5월', value: 156 },
    { month: '6월', value: 189 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  chartContainer.innerHTML = monthlyData.map(data => `
    <div class="chart-bar-group">
      <div class="chart-bar" style="height: ${(data.value / maxValue) * 100}%">
        <span class="bar-value">${data.value}</span>
      </div>
      <span class="bar-label">${data.month}</span>
    </div>
  `).join('');
}

function renderSpeciesDistribution() {
  const container = document.querySelector('.distribution-chart');
  if (!container) return;

  // 카테고리별 분포
  const categories = [
    { name: '조류', count: speciesData.filter(s => s.category === 'bird').length, color: '#3B82F6' },
    { name: '곤충', count: speciesData.filter(s => s.category === 'insect').length, color: '#F59E0B' },
    { name: '식물', count: speciesData.filter(s => s.category === 'plant').length, color: '#10B981' },
    { name: '양서류', count: speciesData.filter(s => s.category === 'amphibian').length, color: '#8B5CF6' },
    { name: '포유류', count: speciesData.filter(s => s.category === 'mammal').length, color: '#EC4899' }
  ];

  const total = categories.reduce((sum, c) => sum + c.count, 0);

  container.innerHTML = categories.map(cat => `
    <div class="distribution-item">
      <div class="distribution-label">
        <span class="dist-color" style="background: ${cat.color}"></span>
        <span>${cat.name}</span>
      </div>
      <div class="distribution-bar">
        <div class="dist-fill" style="width: ${(cat.count / total) * 100}%; background: ${cat.color}"></div>
      </div>
      <span class="distribution-count">${cat.count}종</span>
    </div>
  `).join('');
}

// ===== 리더보드 화면 =====
function loadLeaderboardScreen() {
  loadRankingData('global');
}

function loadRankingData(tab) {
  const topThreeContainer = document.getElementById('topThree');
  const listContainer = document.getElementById('rankingList');
  const myRankCard = document.getElementById('myRankCard');

  if (!topThreeContainer || !listContainer) return;

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
    if (myRankCard) myRankCard.style.display = 'none';
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
  if (myRank && myRankCard) {
    myRankCard.style.display = 'block';
    myRankCard.innerHTML = createRankItem(myRank);
  }
}

// ===== 프로필 화면 =====
function loadProfileScreen() {
  const user = appState.user;

  const elements = {
    profileName: document.getElementById('profileName'),
    profileLevel: document.getElementById('profileLevel'),
    profileTokens: document.getElementById('profileTokens'),
    profileBadges: document.getElementById('profileBadges'),
    profileNFTs: document.getElementById('profileNFTs'),
    statDiscoveries: document.getElementById('statDiscoveries'),
    statSteps: document.getElementById('statSteps'),
    statParks: document.getElementById('statParks'),
    statQuests: document.getElementById('statQuests'),
    badgeGallery: document.getElementById('badgeGallery'),
    badgeCount: document.getElementById('badgeCount'),
    nftGallery: document.getElementById('nftGallery'),
    nftCount: document.getElementById('nftCount')
  };

  if (elements.profileName) elements.profileName.textContent = user.name;
  if (elements.profileLevel) elements.profileLevel.textContent = user.level;
  if (elements.profileTokens) elements.profileTokens.textContent = user.tokens;
  if (elements.profileBadges) elements.profileBadges.textContent = user.badges.length;
  if (elements.profileNFTs) elements.profileNFTs.textContent = user.nfts.length;

  // 통계
  if (elements.statDiscoveries) elements.statDiscoveries.textContent = user.stats.totalDiscoveries;
  if (elements.statSteps) elements.statSteps.textContent = formatNumber(user.stats.totalSteps);
  if (elements.statParks) elements.statParks.textContent = user.stats.parksVisited;
  if (elements.statQuests) elements.statQuests.textContent = user.stats.questsCompleted;

  // 배지 갤러리
  if (elements.badgeGallery) {
    elements.badgeGallery.innerHTML = user.badges.map(badge => createBadgeItem(badge)).join('');
  }
  if (elements.badgeCount) elements.badgeCount.textContent = `${user.badges.length}개`;

  // NFT 갤러리
  if (elements.nftGallery) {
    elements.nftGallery.innerHTML = user.nfts.map(nft => createNFTItem(nft)).join('');
  }
  if (elements.nftCount) elements.nftCount.textContent = `${user.nfts.length}개`;
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
      appState.user.xpToNext = Math.floor(appState.user.xpToNext * 1.5);
    }

    // 레벨업 효과
    if (typeof triggerLevelUpConfetti === 'function') {
      triggerLevelUpConfetti();
    }

    // 레벨업 모달 표시
    showLevelUpModal(appState.user.level);
  }

  // UI 업데이트
  updateUserProfile();
}

function showLevelUpModal(newLevel) {
  const newLevelEl = document.getElementById('newLevel');
  const modal = document.getElementById('levelUpModal');

  if (newLevelEl) newLevelEl.textContent = newLevel;
  if (modal) modal.classList.add('active');
}

function closeLevelUpModal() {
  const modal = document.getElementById('levelUpModal');
  if (modal) modal.classList.remove('active');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
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
    if (typeof stopGuideTour === 'function') {
      stopGuideTour();
    }
  }
});

// 온보딩 스킵 버튼
function skipOnboarding() {
  completeOnboarding();
}
