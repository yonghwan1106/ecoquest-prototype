// EcoQuest 가이드 투어 시스템
// 심사위원용 3분(180초) 자동 데모 - 18스텝

class GuideTour {
  constructor() {
    this.currentStep = 0;
    this.isRunning = false;
    this.autoPlayTimer = null;
    this.totalSteps = 18;

    this.steps = [
      // 1. 환영 인트로 (10초)
      {
        target: null,
        title: '조경 비전 2050 x 에코퀘스트',
        content: '도시 생물다양성 모니터링을 게이미피케이션으로 혁신합니다. 시민 참여형 생태 모니터링 플랫폼을 소개합니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('home');
        }
      },
      // 2. 홈 대시보드 (10초)
      {
        target: '#screen-home',
        title: '시민 탐험가의 허브',
        content: '레벨, 경험치, 일일 퀘스트를 한눈에 확인할 수 있는 대시보드입니다. 탐험가의 모든 활동이 이곳에서 시작됩니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('home');
        }
      },
      // 3. 게이미피케이션 프로필 (10초)
      {
        target: '.profile-card',
        title: '레벨 시스템과 경험치',
        content: '지속적인 참여 동기를 부여하는 레벨 시스템입니다. 새싹 탐험가에서 숲의 수호자까지 20단계 등급이 준비되어 있습니다.',
        position: 'bottom',
        duration: 10000,
        action: null
      },
      // 4. 실시간 임팩트 요약 (8초)
      {
        target: '.impact-summary-card',
        title: '개인의 관찰이 생태 빅데이터로',
        content: '발견 데이터, 연구 기여, 탄소 저감량까지 개인의 작은 관찰이 도시 생태계 데이터베이스를 구축합니다.',
        position: 'bottom',
        duration: 8000,
        action: null
      },
      // 5. 탐험 지도 (10초)
      {
        target: '#screen-explore',
        title: '서울시 생물다양성 실시간 모니터링',
        content: '서울시 주요 공원 10곳의 생물다양성을 실시간으로 모니터링합니다. 각 공원의 생태 등급과 관찰 핫스팟을 AI가 분석합니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('explore');
        }
      },
      // 6. 지도 상세 (10초)
      {
        target: '.leaflet-map',
        title: '공원별 생태 정보',
        content: '공원별 생물다양성 지수, 최근 발견 종, 추천 탐험 경로를 확인할 수 있습니다. Leaflet 기반 인터랙티브 지도로 직관적인 탐험이 가능합니다.',
        position: 'top',
        duration: 10000,
        action: null
      },
      // 7. AI 생물 식별 소개 (10초)
      {
        target: '#screen-discovery',
        title: '딥러닝 기반 실시간 종 식별',
        content: '핵심 기술: 카메라로 촬영하면 AI가 즉시 종을 판별합니다. 38종의 한국 자생 생물 데이터베이스와 연동됩니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          // 발견 화면 직접 진입 (showScreen('discovery')는 startDiscovery 호출하므로 직접 처리)
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          const discoveryScreen = document.getElementById('screen-discovery');
          if (discoveryScreen) discoveryScreen.classList.add('active');
          appState.currentScreen = 'discovery';

          const cameraView = document.getElementById('cameraView');
          const discoveryResult = document.getElementById('discoveryResult');
          if (cameraView) cameraView.style.display = 'flex';
          if (discoveryResult) discoveryResult.style.display = 'none';

          // AI 상태 표시
          if (typeof updateAIStatus === 'function') {
            updateAIStatus('scanning', 'AI 스캔 준비 중...');
          }
        }
      },
      // 8. AI 스캔 시뮬레이션 (12초)
      {
        target: '.camera-view',
        title: 'AI 분석 진행',
        content: '카메라 뷰에서 AI가 실시간으로 생물을 감지하고 분석합니다. 딥러닝 모델이 종을 식별하는 과정을 시연합니다.',
        position: 'top',
        duration: 12000,
        action: () => {
          // 스캔 시뮬레이션 시작
          if (typeof updateAIStatus === 'function') {
            updateAIStatus('scanning', 'AI 스캔 중...');
          }
          // 3초 후 감지, 5초 후 결과
          setTimeout(() => {
            if (typeof updateAIStatus === 'function') {
              updateAIStatus('detected', '생물 감지됨!');
            }
          }, 3000);
          setTimeout(() => {
            this._showTourDiscoveryResult();
          }, 5000);
        }
      },
      // 9. 발견 결과 (10초)
      {
        target: '.discovery-result',
        title: '희귀종 발견 결과',
        content: '서식지 정보, 계절별 관찰 팁, 보전 상태까지 상세 정보를 제공합니다. 모든 데이터는 시민 과학 데이터베이스에 자동 기록됩니다.',
        position: 'top',
        duration: 10000,
        action: null
      },
      // 10. 생물 도감 (10초)
      {
        target: '#screen-collection',
        title: '도시 생물 도감',
        content: '발견한 종은 상세 정보와 함께 기록되고, 미발견 종은 실루엣으로 표시되어 수집 욕구를 자극합니다. 38종의 한국 자생 생물을 수집하세요.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('collection');
        }
      },
      // 11. 카테고리 필터 (8초)
      {
        target: '.category-filter',
        title: '6개 생물 카테고리',
        content: '조류, 곤충, 식물, 양서류, 파충류, 포유류 6개 카테고리와 희귀도별 필터로 체계적인 수집 목표를 설정할 수 있습니다.',
        position: 'bottom',
        duration: 8000,
        action: null
      },
      // 12. 퀘스트 시스템 (10초)
      {
        target: '#screen-quests',
        title: '퀘스트로 생태 관찰 습관 형성',
        content: '일일, 주간, 시즌 퀘스트로 꾸준한 생태 관찰 습관을 형성합니다. 퀘스트 완료 시 XP, 토큰, 특별 배지를 보상으로 제공합니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('quests');
        }
      },
      // 13. 시즌 이벤트 (8초)
      {
        target: '.seasonal-banner',
        title: '계절별 특별 이벤트',
        content: '봄 철새 관찰, 여름 곤충 탐사 등 계절별 특별 이벤트를 운영합니다. 조경 전문가와 협업한 시즌 콘텐츠로 학습과 재미를 동시에 제공합니다.',
        position: 'top',
        duration: 8000,
        action: () => {
          // 시즌 탭 활성화
          if (typeof switchQuestTab === 'function') {
            switchQuestTab('seasonal');
          }
        }
      },
      // 14. 임팩트 대시보드 (10초)
      {
        target: '#screen-impact',
        title: '데이터로 시각화하는 생태 기여',
        content: '개인의 기여가 만드는 도시 생태계 변화를 데이터로 시각화합니다. 월별 발견 추이, 카테고리 분포, 기여도 타임라인을 확인할 수 있습니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('impact');
        }
      },
      // 15. 데이터 시각화 (8초)
      {
        target: '.impact-metrics',
        title: '조경 정책의 근거 자료',
        content: '축적된 시민 관찰 데이터는 조경 정책 수립의 근거 자료로 활용됩니다. 디지털 트윈 기반 도시 생태계 모델링의 기초 데이터를 제공합니다.',
        position: 'bottom',
        duration: 8000,
        action: null
      },
      // 16. 리더보드 (8초)
      {
        target: '#screen-leaderboard',
        title: '건전한 경쟁과 협력',
        content: '글로벌, 지역, 길드 랭킹으로 건전한 경쟁을 유도합니다. 상위 탐험가에게는 특별 NFT 배지가 부여됩니다.',
        position: 'center',
        duration: 8000,
        action: () => {
          showScreen('leaderboard');
        }
      },
      // 17. 프로필 & NFT (10초)
      {
        target: '#screen-profile',
        title: '블록체인 NFT 업적 시스템',
        content: '희귀종 발견 기록은 블록체인 NFT로 영구 보존됩니다. 탐험가 프로필에서 업적, 배지, 수집 현황을 확인하고 공유할 수 있습니다.',
        position: 'center',
        duration: 10000,
        action: () => {
          showScreen('profile');
        }
      },
      // 18. 핵심 가치 요약 (15초)
      {
        target: null,
        title: '에코퀘스트 핵심 가치',
        content: '',
        position: 'center',
        duration: 15000,
        action: () => {
          this._showFinalSummary();
        },
        isFinal: true
      }
    ];
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentStep = 0;

    // 인트로/온보딩 화면 숨기기
    const introScreen = document.getElementById('introScreen');
    if (introScreen) introScreen.classList.add('hidden');

    const onboardingScreen = document.getElementById('onboardingScreen');
    if (onboardingScreen) onboardingScreen.classList.add('hidden');

    // 메인 앱 표시
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
      mainApp.classList.remove('hidden');
      mainApp.style.opacity = '1';
      if (typeof initMainApp === 'function') {
        initMainApp();
      }
    }

    // 오버레이 표시
    this._showOverlay();
    this._showStep(0);
  }

  stop() {
    this.isRunning = false;
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    this._hideOverlay();
    this._removeFinalSummary();
    this._clearHighlight();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this._showStep(this.currentStep + 1);
    } else {
      this.stop();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this._showStep(this.currentStep - 1);
    }
  }

  skipTour() {
    this.stop();
    showScreen('home');
  }

  // --- Private Methods ---

  _showOverlay() {
    const overlay = document.getElementById('guideTourOverlay');
    if (overlay) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => {
        overlay.classList.add('active');
      });
    }
  }

  _hideOverlay() {
    const overlay = document.getElementById('guideTourOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  }

  _showStep(index) {
    if (index >= this.steps.length || !this.isRunning) return;

    this.currentStep = index;
    const step = this.steps[index];

    // 이전 타이머 클리어
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }

    // 액션 실행 (화면 전환 등)
    if (step.action) {
      step.action();
    }

    // 잠시 대기 후 UI 업데이트 (화면 전환 애니메이션 대기)
    setTimeout(() => {
      if (!this.isRunning) return;

      // 최종 스텝은 별도 처리 (요약 오버레이)
      if (step.isFinal) {
        this._updateProgress();
        this._updateStepIndicator();
        // 자동 재생: 15초 후 종료
        this.autoPlayTimer = setTimeout(() => {
          if (this.isRunning) {
            this.stop();
            this._showEndScreen();
          }
        }, step.duration);
        return;
      }

      this._updateTooltip(step);
      this._updateProgress();
      this._updateStepIndicator();
      this._highlightTarget(step.target);

      // 자동 재생
      this.autoPlayTimer = setTimeout(() => {
        if (this.isRunning) {
          this.nextStep();
        }
      }, step.duration);
    }, 500);
  }

  _updateTooltip(step) {
    const tooltip = document.getElementById('guideTooltip');
    if (!tooltip) return;

    tooltip.style.display = 'block';

    const titleEl = document.getElementById('tooltipTitle');
    const descEl = document.getElementById('tooltipDesc');

    if (titleEl) titleEl.textContent = step.title;
    if (descEl) descEl.textContent = step.content;

    // 위치 조정
    tooltip.className = 'guide-tooltip';

    if (step.target && step.position !== 'center') {
      const targetEl = document.querySelector(step.target);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        if (step.position === 'bottom') {
          tooltip.style.top = `${Math.min(rect.bottom + 16, window.innerHeight - tooltipRect.height - 80)}px`;
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translateX(-50%)';
          tooltip.style.bottom = 'auto';
        } else if (step.position === 'top') {
          const topPos = rect.top - tooltipRect.height - 16;
          tooltip.style.top = `${Math.max(topPos, 60)}px`;
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translateX(-50%)';
          tooltip.style.bottom = 'auto';
        }
      } else {
        this._centerTooltip(tooltip);
      }
    } else {
      this._centerTooltip(tooltip);
    }

    // fadeIn 애니메이션
    tooltip.style.opacity = '0';
    requestAnimationFrame(() => {
      tooltip.style.transition = 'opacity 0.3s ease';
      tooltip.style.opacity = '1';
    });
  }

  _centerTooltip(tooltip) {
    tooltip.style.top = '50%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translate(-50%, -50%)';
    tooltip.style.bottom = 'auto';
  }

  _updateProgress() {
    const progressFill = document.getElementById('guideProgressFill');
    if (progressFill) {
      const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
      progressFill.style.width = `${progress}%`;
    }
  }

  _updateStepIndicator() {
    const stepEl = document.getElementById('tooltipStep');
    if (stepEl) {
      stepEl.textContent = `${this.currentStep + 1} / ${this.totalSteps}`;
    }
  }

  _highlightTarget(selector) {
    this._clearHighlight();

    if (!selector) return;

    const target = document.querySelector(selector);
    if (!target) return;

    const spotlight = document.getElementById('guideSpotlight');
    if (spotlight) {
      const rect = target.getBoundingClientRect();
      const padding = 8;
      spotlight.style.top = `${rect.top - padding}px`;
      spotlight.style.left = `${rect.left - padding}px`;
      spotlight.style.width = `${rect.width + padding * 2}px`;
      spotlight.style.height = `${rect.height + padding * 2}px`;
      spotlight.style.display = 'block';
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  _clearHighlight() {
    const spotlight = document.getElementById('guideSpotlight');
    if (spotlight) {
      spotlight.style.display = 'none';
    }
  }

  // 투어용 발견 결과 (rare 이상 종 고정)
  _showTourDiscoveryResult() {
    // rare 이상 종에서 선택
    const rareSpecies = speciesData.filter(s => s.rarity === 'rare' || s.rarity === 'legendary');
    const species = rareSpecies[Math.floor(Math.random() * rareSpecies.length)];

    if (!species) return;

    const cameraView = document.getElementById('cameraView');
    const result = document.getElementById('discoveryResult');

    if (cameraView) cameraView.style.display = 'none';
    if (result) result.style.display = 'flex';

    // 결과 내용 업데이트
    const resultImage = document.getElementById('resultImage');
    const resultName = document.getElementById('resultName');
    const resultScientific = document.getElementById('resultScientific');
    const resultRarity = document.getElementById('resultRarity');
    const resultConfidence = document.getElementById('resultConfidence');
    const rewardXp = document.getElementById('rewardXp');
    const rewardToken = document.getElementById('rewardToken');
    const newBadge = document.getElementById('newDiscoveryBadge');

    if (resultImage) { resultImage.innerHTML = species.image; resultImage.classList.add('svg-icon'); }
    if (resultName) resultName.textContent = species.name;
    if (resultScientific) resultScientific.textContent = species.scientific;
    if (resultRarity) {
      resultRarity.textContent = rarityConfig[species.rarity].name;
      resultRarity.className = `rarity-badge ${species.rarity}`;
    }
    if (resultConfidence) resultConfidence.textContent = '96.7%';
    if (rewardXp) rewardXp.textContent = `+${species.xp * 2} XP`;
    if (rewardToken) rewardToken.textContent = `+${Math.floor(species.xp / 5)} 토큰`;
    if (newBadge) newBadge.style.display = 'inline-block';

    // 축하 효과
    if (typeof triggerCelebration === 'function') {
      triggerCelebration(species.rarity);
    }
  }

  // 최종 요약 오버레이
  _showFinalSummary() {
    const tooltip = document.getElementById('guideTooltip');
    if (tooltip) tooltip.style.display = 'none';

    this._clearHighlight();

    // 기존 요약 제거
    this._removeFinalSummary();

    const overlay = document.getElementById('guideTourOverlay');
    if (!overlay) return;

    const summaryEl = document.createElement('div');
    summaryEl.id = 'tourFinalSummary';
    summaryEl.className = 'tour-final-summary';
    summaryEl.innerHTML = `
      <div class="tour-summary-card">
        <div class="summary-logo">EcoQuest</div>
        <div class="summary-subtitle">조경 비전 2050</div>
        <div class="summary-values">
          <div class="summary-value-item">
            <div class="value-number">01</div>
            <div class="value-title">시민 과학 참여</div>
            <div class="value-desc">누구나 생태계 조사원이 됩니다</div>
          </div>
          <div class="summary-value-item">
            <div class="value-number">02</div>
            <div class="value-title">생물다양성 보전</div>
            <div class="value-desc">게임이 만드는 실질적 환경 변화</div>
          </div>
          <div class="summary-value-item">
            <div class="value-number">03</div>
            <div class="value-title">조경 데이터 혁신</div>
            <div class="value-desc">시민 관찰이 도시 녹지 정책의 근거가 됩니다</div>
          </div>
        </div>
      </div>
    `;

    overlay.appendChild(summaryEl);

    // 등장 애니메이션
    requestAnimationFrame(() => {
      summaryEl.classList.add('visible');
    });
  }

  _removeFinalSummary() {
    const summary = document.getElementById('tourFinalSummary');
    if (summary) summary.remove();
  }

  // 투어 종료 화면
  _showEndScreen() {
    // 기존 종료 화면 제거
    const existing = document.getElementById('tourEndScreen');
    if (existing) existing.remove();

    const endScreen = document.createElement('div');
    endScreen.id = 'tourEndScreen';
    endScreen.className = 'tour-end-screen';
    endScreen.innerHTML = `
      <div class="tour-end-backdrop"></div>
      <div class="tour-end-card">
        <div class="end-logo">EcoQuest</div>
        <div class="end-badge">조경 비전 2050</div>
        <p class="end-message">데모가 완료되었습니다</p>
        <p class="end-sub">게이미피케이션으로 시민 과학을 활성화하고<br>도시 생태계 모니터링에 기여합니다</p>
        <div class="end-actions">
          <button class="end-btn end-btn-secondary" onclick="restartGuideTour()">투어 다시보기</button>
          <button class="end-btn end-btn-primary" onclick="closeEndScreen()">앱 체험하기</button>
        </div>
      </div>
    `;

    document.body.appendChild(endScreen);

    requestAnimationFrame(() => {
      endScreen.classList.add('visible');
    });

    // 10초 후 자동 페이드아웃
    setTimeout(() => {
      const screen = document.getElementById('tourEndScreen');
      if (screen) {
        screen.classList.remove('visible');
        setTimeout(() => {
          screen.remove();
        }, 500);
      }
    }, 10000);
  }
}

// --- 전역 함수 ---
let guideTour;

function initGuideTour() {
  guideTour = new GuideTour();
}

function startGuideTour() {
  if (!guideTour) {
    initGuideTour();
  }
  guideTour.start();
}

function stopGuideTour() {
  if (guideTour) {
    guideTour.stop();
  }
}

function endGuideTour() {
  stopGuideTour();
  showScreen('home');
}

function nextGuideStep() {
  if (guideTour) guideTour.nextStep();
}

function prevGuideStep() {
  if (guideTour) guideTour.prevStep();
}

function restartGuideTour() {
  closeEndScreen();
  setTimeout(() => {
    startGuideTour();
  }, 300);
}

function closeEndScreen() {
  const screen = document.getElementById('tourEndScreen');
  if (screen) {
    screen.classList.remove('visible');
    setTimeout(() => {
      screen.remove();
    }, 500);
  }
  showScreen('home');
}
