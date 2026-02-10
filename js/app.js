// EcoQuest 메인 애플리케이션
// 조경비전 2050 공모전 프로토타입

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

  updateOnboardingSlide('next');
}

function prevOnboardingSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateOnboardingSlide('prev');
  }
}

function updateOnboardingSlide(direction) {
  const slides = document.querySelectorAll('.onboarding-slide');
  const dir = direction || 'next';

  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      // 새 슬라이드: 들어오는 방향에서 시작
      slide.style.display = 'flex';
      slide.style.opacity = '0';
      slide.style.transform = dir === 'next' ? 'translateX(80px)' : 'translateX(-80px)';
      // Force reflow
      slide.offsetHeight;
      slide.classList.add('active');
      slide.style.opacity = '1';
      slide.style.transform = 'translateX(0)';
    } else {
      slide.classList.remove('active');
      slide.style.opacity = '0';
      slide.style.transform = dir === 'next' ? 'translateX(-80px)' : 'translateX(80px)';
      setTimeout(() => {
        if (!slide.classList.contains('active')) {
          slide.style.display = 'none';
        }
      }, 500);
    }
  });

  // 인디케이터 업데이트
  document.querySelectorAll('.progress-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });

  // 다음 버튼 텍스트
  const nextBtnText = document.getElementById('nextBtnText');
  if (nextBtnText) {
    nextBtnText.textContent = currentSlide === totalSlides - 1 ? '시작하기' : '다음';
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

  // 현재 활성 화면
  const currentScreen = document.querySelector('.screen.active');
  const targetScreen = document.getElementById(`screen-${screenId}`);

  if (!targetScreen || targetScreen === currentScreen) return;

  // 현재 화면 fadeOut
  if (currentScreen) {
    currentScreen.style.opacity = '0';
    currentScreen.style.transform = 'translateY(10px)';
    setTimeout(() => {
      currentScreen.classList.remove('active');
      currentScreen.style.opacity = '';
      currentScreen.style.transform = '';
    }, 200);
  }

  // 새 화면 fadeIn (약간의 딜레이 후)
  setTimeout(() => {
    targetScreen.style.opacity = '0';
    targetScreen.style.transform = 'translateY(20px)';
    targetScreen.classList.add('active');
    appState.currentScreen = screenId;

    // 네비게이션 활성화 상태 업데이트
    updateNavigation(screenId);

    // requestAnimationFrame으로 부드러운 전환
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targetScreen.style.opacity = '1';
        targetScreen.style.transform = 'translateY(0)';
      });
    });

    // 탐험 화면이면 지도 리사이즈
    if (screenId === 'explore' && appState.leafletMap) {
      setTimeout(() => {
        appState.leafletMap.invalidateSize();
      }, 350);
    }
  }, 150);
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
      return species ? `<span class="svg-icon" style="display:inline-flex;width:24px;height:24px;">${species.image}</span>` : '';
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
  showToastEnhanced(`${park.name} 선택됨!`, 'info');

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

// 연속 발견 콤보 추적
let discoveryCombo = 0;
let lastDiscoveryTime = 0;

// AI 탐지 시뮬레이션 - 단계별 진행 플로우
function simulateAIDetection() {
  const steps = [
    { text: '이미지 캡처 중...', progress: 0, delay: 500 },
    { text: 'AI 분석 시작...', progress: 30, delay: 1000 },
    { text: '특징 추출 중...', progress: 60, delay: 1000 },
    { text: '데이터베이스 매칭 중...', progress: 90, delay: 1000 },
    { text: '종 식별 완료!', progress: 100, delay: 500 }
  ];

  // 진행바 표시
  showAnalysisProgress();

  let stepIndex = 0;
  function runStep() {
    if (stepIndex >= steps.length) {
      simulateDiscovery();
      return;
    }
    const step = steps[stepIndex];
    updateAIStatus('scanning', step.text);
    updateAnalysisProgress(step.progress);
    stepIndex++;
    setTimeout(runStep, step.delay);
  }
  runStep();
}

// 분석 진행바 표시
function showAnalysisProgress() {
  const aiStatus = document.querySelector('.ai-status');
  if (!aiStatus) return;

  let progressBar = document.getElementById('analysisProgressBar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'analysisProgressBar';
    progressBar.className = 'analysis-progress-bar';
    progressBar.innerHTML = '<div class="analysis-progress-fill" id="analysisProgressFill"></div>';
    aiStatus.appendChild(progressBar);
  }
  progressBar.style.display = 'block';
  const fill = document.getElementById('analysisProgressFill');
  if (fill) fill.style.width = '0%';
}

// 분석 진행바 업데이트
function updateAnalysisProgress(percent) {
  const fill = document.getElementById('analysisProgressFill');
  if (fill) {
    fill.style.width = percent + '%';
    fill.style.transition = 'width 0.4s ease-out';
  }
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

  // 진행바 숨기기
  const progressBar = document.getElementById('analysisProgressBar');
  if (progressBar) progressBar.style.display = 'none';

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

  if (elements.resultImage) { elements.resultImage.innerHTML = species.image; elements.resultImage.classList.add('svg-icon'); }
  if (elements.resultName) elements.resultName.textContent = species.name;
  if (elements.resultScientific) elements.resultScientific.textContent = species.scientific;

  if (elements.resultRarity) {
    elements.resultRarity.textContent = rarityConfig[species.rarity].name;
    elements.resultRarity.className = `rarity-badge ${species.rarity}`;
  }

  // AI 신뢰도 카운트업 애니메이션
  const confidenceTarget = parseFloat((85 + Math.random() * 14).toFixed(1));
  if (elements.resultConfidence) {
    animateConfidence(elements.resultConfidence, confidenceTarget);
  }

  // 추가 정보 표시 (서식지, 관찰 적기, 관찰 팁)
  showDiscoveryExtraInfo(species);

  // 연속 발견 콤보 계산
  const now = Date.now();
  if (now - lastDiscoveryTime < 120000) { // 2분 이내
    discoveryCombo++;
  } else {
    discoveryCombo = 1;
  }
  lastDiscoveryTime = now;

  // 보상 계산
  let xpReward = species.xp;
  let tokenReward = Math.floor(species.xp / 10);

  if (isNewDiscovery) {
    xpReward *= 2; // 신규 발견 보너스
    tokenReward *= 2;
    appState.user.discoveries.push(species.id);
    appState.user.stats.totalDiscoveries++;
  }

  // 콤보 보너스 적용
  let comboMultiplier = 1;
  if (discoveryCombo >= 3) {
    comboMultiplier = 1.25;
    showComboBonus(3, '+25% XP 보너스!');
  } else if (discoveryCombo >= 2) {
    comboMultiplier = 1.10;
    showComboBonus(2, '+10% XP 보너스!');
  }
  xpReward = Math.floor(xpReward * comboMultiplier);
  tokenReward = Math.floor(tokenReward * comboMultiplier);

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
  showToastEnhanced(isNewDiscovery ? '새로운 생물 발견!' : '재발견!', 'success');

  appState.discoveryInProgress = false;
}

// 신뢰도 카운트업 애니메이션
function animateConfidence(element, target) {
  let current = 0;
  const duration = 1200;
  const start = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    current = (eased * target).toFixed(1);
    element.textContent = `AI 신뢰도: ${current}%`;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// 발견 추가 정보 표시
function showDiscoveryExtraInfo(species) {
  let extraInfo = document.getElementById('discoveryExtraInfo');
  if (!extraInfo) {
    // 결과 화면에 추가 정보 영역 생성
    const resultInfo = document.querySelector('.result-info');
    if (!resultInfo) return;
    extraInfo = document.createElement('div');
    extraInfo.id = 'discoveryExtraInfo';
    extraInfo.className = 'discovery-extra-info';
    resultInfo.after(extraInfo);
  }

  const tips = {
    bird: '조용히 관찰하면 더 가까이서 볼 수 있어요',
    insect: '이른 아침이나 해질녘에 활동이 활발해요',
    plant: '사진을 찍을 때 잎, 꽃, 줄기를 함께 촬영하세요',
    amphibian: '비 온 뒤 관찰 확률이 높아져요',
    reptile: '따뜻한 바위 위에서 일광욕하는 모습을 찾아보세요',
    mammal: '발자국이나 흔적을 먼저 찾아보세요'
  };

  extraInfo.innerHTML = `
    <div class="extra-info-grid">
      <div class="extra-info-item">
        <span class="extra-info-label">서식지</span>
        <span class="extra-info-value">${species.habitat}</span>
      </div>
      <div class="extra-info-item">
        <span class="extra-info-label">관찰 적기</span>
        <span class="extra-info-value">${species.season}</span>
      </div>
    </div>
    <div class="observation-tip">
      <span class="tip-icon">💡</span>
      <span class="tip-text">${tips[species.category] || '자연을 존중하며 관찰하세요'}</span>
    </div>
  `;
}

// 콤보 보너스 팝업
function showComboBonus(combo, text) {
  let popup = document.getElementById('comboPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'comboPopup';
    popup.className = 'combo-popup';
    document.body.appendChild(popup);
  }

  popup.innerHTML = `
    <div class="combo-count">${combo}x 콤보!</div>
    <div class="combo-text">${text}</div>
  `;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 2500);
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

  if (elements.modalImage) { elements.modalImage.innerHTML = species.image; elements.modalImage.classList.add('svg-icon'); }
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
  setupQuestTabs();

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

  // 클릭 이벤트 추가
  container.querySelectorAll('.quest-item-full').forEach(item => {
    item.addEventListener('click', () => {
      const questId = item.dataset.questId;
      const quest = questData.daily.find(q => q.id === questId);
      if (quest) showQuestDetailModal(quest, 'daily');
    });
  });
}

function loadWeeklyQuests() {
  const container = document.getElementById('weeklyQuestList');
  if (!container) return;

  container.innerHTML = questData.weekly.map(quest => {
    const progress = appState.user.questProgress.weekly[quest.id] || 0;
    return createQuestItemFull(quest, progress);
  }).join('');

  container.querySelectorAll('.quest-item-full').forEach(item => {
    item.addEventListener('click', () => {
      const questId = item.dataset.questId;
      const quest = questData.weekly.find(q => q.id === questId);
      if (quest) showQuestDetailModal(quest, 'weekly');
    });
  });
}

function loadSeasonalQuest() {
  const container = document.getElementById('seasonalBanner');
  if (!container) return;

  container.innerHTML = questData.seasonal.map(quest => {
    const progress = appState.user.questProgress.seasonal[quest.id] || 0;
    return createSeasonalBanner(quest, progress);
  }).join('');
}

// 퀘스트 탭 전환 (페이드 애니메이션)
function setupQuestTabs() {
  const questTabs = document.querySelectorAll('#screen-quests .tab-btn');
  questTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;

      // 탭 버튼 활성화
      questTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 콘텐츠 페이드 전환
      const contents = document.querySelectorAll('#screen-quests .quest-content');
      contents.forEach(c => {
        c.classList.remove('active');
        c.style.opacity = '0';
      });

      const target = document.getElementById(`tab-${tabName}`);
      if (target) {
        setTimeout(() => {
          target.classList.add('active');
          target.style.opacity = '0';
          requestAnimationFrame(() => {
            target.style.transition = 'opacity 0.3s ease';
            target.style.opacity = '1';
          });
        }, 150);
      }
    });
  });
}

// 퀘스트 상세 모달
function showQuestDetailModal(quest, type) {
  const progress = appState.user.questProgress[type][quest.id] || 0;
  const progressPercent = Math.min((progress / quest.goal) * 100, 100);
  const isComplete = progress >= quest.goal;

  let modal = document.getElementById('questDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'questDetailModal';
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-overlay" onclick="closeQuestModal()"></div><div class="modal-content quest-detail-modal-content"></div>';
    document.body.appendChild(modal);
  }

  const content = modal.querySelector('.quest-detail-modal-content');
  content.innerHTML = `
    <button class="modal-close" onclick="closeQuestModal()">&times;</button>
    <div class="quest-detail-header">
      <div class="quest-detail-icon">${quest.icon}</div>
      <h2 class="quest-detail-title">${quest.title}</h2>
      <p class="quest-detail-desc">${quest.description}</p>
    </div>
    <div class="quest-detail-progress">
      <div class="quest-detail-progress-bar">
        <div class="quest-detail-progress-fill" style="width: ${progressPercent}%"></div>
      </div>
      <div class="quest-detail-progress-text">${progress} / ${quest.goal} ${isComplete ? '완료!' : ''}</div>
    </div>
    <div class="quest-detail-rewards">
      <h3>보상</h3>
      <div class="quest-detail-reward-list">
        <div class="quest-detail-reward-item"><span>⭐</span><span>${quest.reward.xp} XP</span></div>
        ${quest.reward.token ? `<div class="quest-detail-reward-item"><span>🪙</span><span>${quest.reward.token} 토큰</span></div>` : ''}
        ${quest.reward.badge ? `<div class="quest-detail-reward-item"><span>🏅</span><span>특별 배지</span></div>` : ''}
        ${quest.reward.nft ? `<div class="quest-detail-reward-item"><span>🎨</span><span>한정 NFT</span></div>` : ''}
      </div>
    </div>
    ${isComplete ? '<button class="btn-primary quest-claim-btn" onclick="claimQuestReward(\'' + quest.id + '\', \'' + type + '\')">보상 수령</button>' : ''}
  `;

  modal.classList.add('active');
}

function closeQuestModal() {
  const modal = document.getElementById('questDetailModal');
  if (modal) modal.classList.remove('active');
}

function claimQuestReward(questId, type) {
  showToastEnhanced('보상을 수령했습니다!', 'reward');
  closeQuestModal();
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
        showToastEnhanced(`퀘스트 완료: ${quest.title}`, 'reward');
        addXP(quest.reward.xp);
        appState.user.tokens += quest.reward.token || 0;
      }
    }
  });
}

// ===== 임팩트 대시보드 =====
function loadImpactDashboard() {
  // 카운트업 애니메이션으로 통계 표시
  const totalSpecies = document.getElementById('totalSpeciesCount');
  const totalObservers = document.getElementById('totalObserversCount');
  const totalObservations = document.getElementById('totalObservationsCount');
  const biodiversityIndex = document.getElementById('biodiversityIndex');

  if (totalSpecies) animateCounter(totalSpecies, speciesData.length, 800);
  if (totalObservers) animateCounter(totalObservers, 2847, 1200, true);
  if (totalObservations) animateCounter(totalObservations, 12459, 1500, true);
  if (biodiversityIndex) animateCounterDecimal(biodiversityIndex, 0.73, 1000);

  // 임팩트 지표 카운트업
  const dataPoints = document.getElementById('totalDataPoints');
  const citations = document.getElementById('researchCitations');
  if (dataPoints) animateCounter(dataPoints, appState.user.stats.totalDiscoveries, 800);
  if (citations) animateCounter(citations, 3, 600);

  // 차트 렌더링
  renderImpactChart();
  renderSpeciesDistribution();

  // 기여도 타임라인 업데이트
  renderContributionTimeline();
}

// 숫자 카운트업 애니메이션
function animateCounter(element, target, duration, useComma) {
  let start = 0;
  const startTime = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(eased * target);

    if (useComma) {
      element.textContent = current.toLocaleString();
    } else {
      element.textContent = current;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// 소수점 카운트업 애니메이션
function animateCounterDecimal(element, target, duration) {
  const startTime = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = (eased * target).toFixed(2);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function renderImpactChart() {
  const chartContainer = document.querySelector('.chart-bars');
  if (!chartContainer) return;

  // 12개월 데이터 (시뮬레이션)
  const monthlyData = [
    { month: '1월', value: 45 },
    { month: '2월', value: 52 },
    { month: '3월', value: 78 },
    { month: '4월', value: 120 },
    { month: '5월', value: 156 },
    { month: '6월', value: 189 },
    { month: '7월', value: 210 },
    { month: '8월', value: 195 },
    { month: '9월', value: 168 },
    { month: '10월', value: 142 },
    { month: '11월', value: 98 },
    { month: '12월', value: 65 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  chartContainer.innerHTML = monthlyData.map((data, i) => `
    <div class="chart-bar-group">
      <div class="chart-bar" style="height: 0%; --target-height: ${(data.value / maxValue) * 100}%">
        <span class="bar-value">${data.value}</span>
      </div>
      <span class="bar-label">${data.month}</span>
    </div>
  `).join('');

  // 바 애니메이션
  setTimeout(() => {
    chartContainer.querySelectorAll('.chart-bar').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.transition = 'height 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        bar.style.height = bar.style.getPropertyValue('--target-height');
      }, i * 60);
    });
  }, 100);
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
    { name: '파충류', count: speciesData.filter(s => s.category === 'reptile').length, color: '#A78BFA' },
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

// 기여도 타임라인 렌더링 (최근 7일 활동)
function renderContributionTimeline() {
  const container = document.querySelector('.contribution-timeline');
  if (!container) return;

  const recentEvents = [
    { date: '2026.02.09', text: '서울숲에서 희귀종 "물총새" 관찰 데이터 제출', icon: '💎' },
    { date: '2026.02.08', text: '양재시민의숲 탐험 - 5종 관찰 기록 완료', icon: '📋' },
    { date: '2026.02.07', text: '주간 퀘스트 "조류 관찰자" 달성', icon: '🏅' },
    { date: '2026.02.06', text: '북한산 생태 조사 데이터 국립공원 DB에 등록', icon: '📊' },
    { date: '2026.02.05', text: '연속 7일 탐험 기록 갱신!', icon: '🔥' },
    { date: '2026.02.04', text: '올림픽공원에서 "원앙" 번식지 발견 보고', icon: '🦆' },
    { date: '2026.02.03', text: '에코퀘스트 시민과학 프로젝트 참여 시작', icon: '🌱' }
  ];

  container.innerHTML = recentEvents.map(event => `
    <div class="timeline-item">
      <div class="timeline-dot">${event.icon}</div>
      <div class="timeline-content">
        <span class="timeline-date">${event.date}</span>
        <p>${event.text}</p>
      </div>
    </div>
  `).join('');
}

// ===== 리더보드 화면 =====
function loadLeaderboardScreen() {
  loadRankingData('global');
  setupRankingTabs();
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
    // 상위 3 길드 포디움
    if (guilds.length >= 3) {
      topThreeContainer.innerHTML = createGuildPodium(guilds.slice(0, 3));
    }
    listContainer.innerHTML = guilds.slice(3).map((guild, index) => {
      const changeHtml = getWeeklyChangeHtml(guild.weeklyChange);
      return `
        <div class="rank-item">
          <div class="rank-number">${index + 4}</div>
          <div class="rank-avatar">${guild.badge}</div>
          <div class="rank-info">
            <div class="rank-name">${guild.name}</div>
            <div class="rank-stats">${guild.members}명 · ${formatNumber(guild.totalXp)} XP</div>
          </div>
          ${changeHtml}
        </div>
      `;
    }).join('');
    if (myRankCard) myRankCard.style.display = 'none';
    return;
  }

  // 상위 3인 포디움 표시
  if (players.length >= 3) {
    topThreeContainer.innerHTML = createPodium(players.slice(0, 3));
  }

  // 나머지 순위 (전체 표시)
  listContainer.innerHTML = players.slice(3).map(player =>
    createRankItemWithChange(player)
  ).join('');

  // 내 순위 카드
  const myRank = players.find(p => p.isCurrentUser);
  if (myRank && myRankCard) {
    myRankCard.style.display = 'block';
    myRankCard.innerHTML = createRankItemWithChange(myRank);
  }
}

// 랭킹 탭 설정
function setupRankingTabs() {
  const tabs = document.querySelectorAll('#screen-leaderboard .tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadRankingData(tab.dataset.tab);
    });
  });
}

// 주간 변동 HTML
function getWeeklyChangeHtml(change) {
  if (change === undefined || change === null) return '';
  if (change > 0) return `<div class="weekly-change up">▲${change}</div>`;
  if (change < 0) return `<div class="weekly-change down">▼${Math.abs(change)}</div>`;
  return `<div class="weekly-change same">─</div>`;
}

// 주간 변동이 포함된 랭킹 아이템
function createRankItemWithChange(player) {
  const isCurrentUser = player.isCurrentUser;
  const changeHtml = getWeeklyChangeHtml(player.weeklyChange);

  return `
    <div class="rank-item ${isCurrentUser ? 'current-user' : ''}">
      <div class="rank-number">${player.rank}</div>
      <div class="rank-avatar">${player.avatar || '👤'}</div>
      <div class="rank-info">
        <div class="rank-name">${player.name}${isCurrentUser ? ' (나)' : ''}</div>
        <div class="rank-stats">Lv.${player.level} · ${player.discoveries}종 발견</div>
      </div>
      <div class="rank-right">
        <div class="rank-xp">${formatNumber(player.xp)} XP</div>
        ${changeHtml}
      </div>
    </div>
  `;
}

// 포디움 컴포넌트 (1위 중앙 높게, 2위 왼쪽, 3위 오른쪽)
function createPodium(top3) {
  const [first, second, third] = top3;
  return `
    <div class="podium">
      <div class="podium-player second">
        <div class="podium-avatar">${second.avatar}</div>
        <div class="podium-name">${second.name}</div>
        <div class="podium-xp">${formatNumber(second.xp)} XP</div>
        <div class="podium-bar bar-2">
          <span class="podium-rank">2</span>
        </div>
      </div>
      <div class="podium-player first">
        <div class="podium-crown">👑</div>
        <div class="podium-avatar">${first.avatar}</div>
        <div class="podium-name">${first.name}</div>
        <div class="podium-xp">${formatNumber(first.xp)} XP</div>
        <div class="podium-bar bar-1">
          <span class="podium-rank">1</span>
        </div>
      </div>
      <div class="podium-player third">
        <div class="podium-avatar">${third.avatar}</div>
        <div class="podium-name">${third.name}</div>
        <div class="podium-xp">${formatNumber(third.xp)} XP</div>
        <div class="podium-bar bar-3">
          <span class="podium-rank">3</span>
        </div>
      </div>
    </div>
  `;
}

// 길드 포디움
function createGuildPodium(top3) {
  const [first, second, third] = top3;
  return `
    <div class="podium guild-podium">
      <div class="podium-player second">
        <div class="podium-avatar">${second.badge}</div>
        <div class="podium-name">${second.name}</div>
        <div class="podium-xp">${second.members}명</div>
        <div class="podium-bar bar-2"><span class="podium-rank">2</span></div>
      </div>
      <div class="podium-player first">
        <div class="podium-crown">👑</div>
        <div class="podium-avatar">${first.badge}</div>
        <div class="podium-name">${first.name}</div>
        <div class="podium-xp">${first.members}명</div>
        <div class="podium-bar bar-1"><span class="podium-rank">1</span></div>
      </div>
      <div class="podium-player third">
        <div class="podium-avatar">${third.badge}</div>
        <div class="podium-name">${third.name}</div>
        <div class="podium-xp">${third.members}명</div>
        <div class="podium-bar bar-3"><span class="podium-rank">3</span></div>
      </div>
    </div>
  `;
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

// ===== 마이크로 인터랙션 =====

// 버튼 리플 이펙트
function addRipple(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

// 리플 이펙트 초기화 - 주요 버튼에 적용
function initRippleEffects() {
  const rippleTargets = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-icon, .next-btn, .filter-btn, .tab-btn, .popup-btn, .intro-start-btn, .guide-tour-btn, .nav-item'
  );
  rippleTargets.forEach(btn => {
    btn.classList.add('ripple-container');
    btn.classList.add('btn-ripple');
    btn.addEventListener('click', addRipple);
  });
}

// 탭 슬라이딩 인디케이터 초기화
function initTabIndicators() {
  const tabGroups = document.querySelectorAll('.quest-tabs, .ranking-tabs');
  tabGroups.forEach(group => {
    // 인디케이터 요소 생성
    const indicator = document.createElement('div');
    indicator.className = 'tab-indicator';
    group.appendChild(indicator);

    const tabs = group.querySelectorAll('.tab-btn');
    function updateIndicator() {
      const activeTab = group.querySelector('.tab-btn.active');
      if (!activeTab) return;
      const groupRect = group.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      indicator.style.width = tabRect.width + 'px';
      indicator.style.transform = `translateX(${tabRect.left - groupRect.left}px)`;
    }

    // 초기 위치 설정
    requestAnimationFrame(updateIndicator);

    // 탭 클릭 시 인디케이터 이동
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        requestAnimationFrame(updateIndicator);
      });
    });
  });
}

// 숫자 카운트업 유틸리티 (범용)
function animateCountUp(element, target, duration, options) {
  const opts = options || {};
  const useComma = opts.comma || false;
  const decimals = opts.decimals || 0;
  const suffix = opts.suffix || '';
  const startTime = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    let current = eased * target;

    if (decimals > 0) {
      current = current.toFixed(decimals);
    } else {
      current = Math.floor(current);
      if (useComma) current = current.toLocaleString();
    }

    element.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// 토스트 개선 - 타입별 아이콘/색상
function showToastEnhanced(message, type) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  if (toast && toastMessage) {
    // 이전 타입 클래스 제거
    toast.classList.remove('toast-success', 'toast-info', 'toast-reward', 'toast-error');

    // 타입에 따라 클래스 추가
    const toastType = type || 'success';
    toast.classList.add('toast-' + toastType);

    // 아이콘 SVG 업데이트
    const toastIcon = toast.querySelector('.toast-icon');
    if (toastIcon) {
      const icons = {
        success: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="white" stroke-width="2"><polyline points="3 8 7 12 13 4"/></svg>',
        info: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="white" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="8" y1="6" x2="8" y2="9"/><circle cx="8" cy="11.5" r="0.5" fill="white"/></svg>',
        reward: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="white" stroke-width="2"><polygon points="8 2 9.5 6 14 6 10.5 9 12 14 8 11 4 14 5.5 9 2 6 6.5 6"/></svg>',
        error: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="white" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="6" y1="6" x2="10" y2="10"/><line x1="10" y1="6" x2="6" y2="10"/></svg>'
      };
      toastIcon.innerHTML = icons[toastType] || icons.success;
    }

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Leaflet 초기화 에러 핸들링
function initLeafletMapSafe() {
  const mapContainer = document.getElementById('leafletMap');
  if (!mapContainer) return;

  if (typeof L === 'undefined') {
    console.warn('Leaflet library not loaded. Map will not be displayed.');
    mapContainer.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-secondary);font-size:14px;">지도를 불러올 수 없습니다</div>';
    return;
  }

  try {
    // 서울 중심 좌표
    const seoulCenter = [37.5665, 126.9780];

    appState.leafletMap = L.map('leafletMap', {
      center: seoulCenter,
      zoom: 12,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CartoDB',
      maxZoom: 19
    }).addTo(appState.leafletMap);

    L.control.zoom({ position: 'bottomright' }).addTo(appState.leafletMap);

    addParkMarkers();
    addCurrentLocationMarker();
  } catch (err) {
    console.error('Leaflet map initialization failed:', err);
    mapContainer.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-secondary);font-size:14px;">지도 초기화에 실패했습니다</div>';
  }
}

// 카메라 스트림 에러 시 폴백 UI
function startCameraOrDemoSafe() {
  const video = document.getElementById('cameraFeed');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        appState.cameraStream = stream;
        if (video) {
          video.srcObject = stream;
          video.play().catch(() => {});
        }
        setTimeout(simulateAIDetection, 3000);
      })
      .catch(err => {
        console.warn('Camera access denied or unavailable:', err.message);
        showCameraFallback();
        startCameraDemo();
      });
  } else {
    showCameraFallback();
    startCameraDemo();
  }
}

function showCameraFallback() {
  const video = document.getElementById('cameraFeed');
  if (video) {
    video.style.display = 'none';
  }
  // 카메라 뷰에 폴백 메시지 표시
  const cameraView = document.getElementById('cameraView');
  if (cameraView && !cameraView.querySelector('.camera-fallback')) {
    const fallback = document.createElement('div');
    fallback.className = 'camera-fallback';
    fallback.style.cssText = 'position:absolute;top:60px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.6);font-size:12px;z-index:6;text-align:center;';
    fallback.textContent = '데모 모드 - 카메라 없이 시뮬레이션';
    cameraView.appendChild(fallback);
  }
}

// 화면 전환 시 리소스 정리
function cleanupScreen(screenId) {
  // 카메라 스트림 정리
  if (screenId === 'discovery' && appState.cameraStream) {
    appState.cameraStream.getTracks().forEach(track => track.stop());
    appState.cameraStream = null;
  }

  // 진행바 정리
  if (screenId === 'discovery') {
    const progressBar = document.getElementById('analysisProgressBar');
    if (progressBar) progressBar.style.display = 'none';
  }
}

// initMainApp에서 마이크로 인터랙션 초기화 패치
(function patchInitMainApp() {
  const originalInitMainApp = window.initMainApp || initMainApp;
  window.initMainApp = function() {
    originalInitMainApp();
    // 마이크로 인터랙션 초기화
    initRippleEffects();
    initTabIndicators();
  };

  // initLeafletMap을 안전 버전으로 교체
  window.initLeafletMap = initLeafletMapSafe;

  // startCameraOrDemo를 안전 버전으로 교체
  window.startCameraOrDemo = startCameraOrDemoSafe;

  // showScreen에 cleanup 로직 추가
  const originalShowScreen = window.showScreen || showScreen;
  window.showScreen = function(screenId) {
    // 이전 화면 리소스 정리
    cleanupScreen(appState.currentScreen);
    originalShowScreen(screenId);
  };
})();
