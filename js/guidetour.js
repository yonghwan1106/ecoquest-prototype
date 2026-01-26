// EcoQuest 가이드 투어 시스템
// 심사위원용 3분 자동 데모

class GuideTour {
  constructor() {
    this.currentStep = 0;
    this.isRunning = false;
    this.autoPlayTimer = null;

    // 투어 단계 정의
    this.steps = [
      {
        target: '.intro-screen',
        title: '🌿 에코퀘스트에 오신 것을 환영합니다',
        content: '시민 참여형 생태 모니터링 플랫폼입니다. 게이미피케이션을 통해 시민들이 도시 생태계 조사에 참여합니다.',
        position: 'center',
        duration: 5000,
        action: null
      },
      {
        target: '#screen-home',
        title: '🏠 홈 대시보드',
        content: '사용자의 레벨, XP, 에코토큰을 확인하고 오늘의 퀘스트와 최근 발견을 한눈에 볼 수 있습니다.',
        position: 'bottom',
        duration: 6000,
        action: () => showScreen('home')
      },
      {
        target: '.profile-card',
        title: '👤 게이미피케이션 프로필',
        content: '레벨 시스템, XP 바, 에코토큰으로 사용자의 참여를 독려합니다. 레벨업 시 특별 보상이 제공됩니다.',
        position: 'bottom',
        duration: 5000,
        action: null
      },
      {
        target: '.impact-summary',
        title: '📊 실시간 임팩트',
        content: '발견한 생물 수, 탐험 거리, 기여한 데이터량을 실시간으로 보여줍니다. 과학적 기여도를 시각화합니다.',
        position: 'top',
        duration: 5000,
        action: null
      },
      {
        target: '#screen-explore',
        title: '🗺️ 탐험 지도',
        content: '서울의 주요 공원과 녹지를 실제 지도에서 확인합니다. 생태 핫스팟과 다른 탐험가들의 활동을 볼 수 있습니다.',
        position: 'center',
        duration: 6000,
        action: () => showScreen('explore')
      },
      {
        target: '.leaflet-map',
        title: '📍 실제 지도 연동',
        content: 'Leaflet 기반 실제 지도에 서울 10개 공원의 생태 정보가 표시됩니다. 공원별 출현 생물과 희귀도를 확인하세요.',
        position: 'top',
        duration: 5000,
        action: null
      },
      {
        target: '#screen-discovery',
        title: '📸 AI 생물 식별',
        content: '카메라로 생물을 촬영하면 AI가 자동으로 종을 식별합니다. 실제 서비스에서는 딥러닝 모델이 사용됩니다.',
        position: 'center',
        duration: 6000,
        action: () => {
          showScreen('discovery');
          // 카메라 데모 시작
          setTimeout(() => {
            if (typeof startCameraDemo === 'function') {
              startCameraDemo();
            }
          }, 1000);
        }
      },
      {
        target: '.capture-btn',
        title: '🎯 촬영 및 식별',
        content: '촬영 버튼을 누르면 AI가 생물을 분석합니다. 희귀한 종일수록 더 많은 XP와 토큰을 획득합니다.',
        position: 'top',
        duration: 5000,
        action: () => {
          // 자동 촬영 시뮬레이션
          setTimeout(() => {
            if (typeof simulateCapture === 'function') {
              simulateCapture();
            }
          }, 2000);
        }
      },
      {
        target: '#screen-collection',
        title: '📚 생물 도감',
        content: '발견한 모든 생물이 도감에 기록됩니다. 38종의 한국 자생 생물 데이터가 포함되어 있습니다.',
        position: 'center',
        duration: 6000,
        action: () => showScreen('collection')
      },
      {
        target: '.filter-tabs',
        title: '🔍 카테고리 필터',
        content: '조류, 곤충, 식물, 양서류, 포유류로 분류됩니다. 희귀도별 필터링도 가능합니다.',
        position: 'bottom',
        duration: 4000,
        action: null
      },
      {
        target: '#screen-quests',
        title: '🎯 퀘스트 시스템',
        content: '일일/주간/시즌 퀘스트로 지속적인 참여를 유도합니다. 미션 완료 시 보상이 제공됩니다.',
        position: 'center',
        duration: 5000,
        action: () => showScreen('quests')
      },
      {
        target: '#screen-impact',
        title: '🌍 생태계 임팩트',
        content: '시민들이 수집한 데이터의 환경적 가치를 시각화합니다. 생물다양성 지수, 탄소 절감량 등을 확인할 수 있습니다.',
        position: 'center',
        duration: 6000,
        action: () => showScreen('impact')
      },
      {
        target: '.impact-chart',
        title: '📈 데이터 시각화',
        content: '월별 발견 추이, 종 다양성 변화, 지역별 기여도를 차트로 보여줍니다.',
        position: 'top',
        duration: 5000,
        action: null
      },
      {
        target: '#screen-leaderboard',
        title: '🏆 리더보드',
        content: '전체/지역/길드 순위로 경쟁심을 자극합니다. 상위 탐험가에게는 특별 배지가 수여됩니다.',
        position: 'center',
        duration: 5000,
        action: () => showScreen('leaderboard')
      },
      {
        target: '#screen-profile',
        title: '👤 프로필 & NFT',
        content: '획득한 배지와 NFT 컬렉션을 확인합니다. 희귀 생물 발견 시 NFT로 발행됩니다.',
        position: 'center',
        duration: 5000,
        action: () => showScreen('profile')
      },
      {
        target: null,
        title: '🎉 데모 완료!',
        content: '에코퀘스트는 게이미피케이션으로 시민 과학을 활성화하고, 도시 생태계 모니터링에 기여합니다. 감사합니다!',
        position: 'center',
        duration: 6000,
        action: () => showScreen('home')
      }
    ];
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentStep = 0;

    // 인트로 화면 숨기기
    const introScreen = document.getElementById('introScreen');
    if (introScreen) {
      introScreen.classList.add('hidden');
    }

    // 온보딩 화면 숨기기
    const onboardingScreen = document.getElementById('onboardingScreen');
    if (onboardingScreen) {
      onboardingScreen.classList.add('hidden');
    }

    // 메인 앱 표시
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
      mainApp.classList.remove('hidden');
    }

    // 오버레이 표시
    this.showOverlay();
    this.showStep(0);
  }

  stop() {
    this.isRunning = false;
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
    }
    this.hideOverlay();
  }

  showOverlay() {
    const overlay = document.getElementById('guideTourOverlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  hideOverlay() {
    const overlay = document.getElementById('guideTourOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  showStep(index) {
    if (index >= this.steps.length) {
      this.stop();
      return;
    }

    this.currentStep = index;
    const step = this.steps[index];

    // 액션 실행 (화면 전환 등)
    if (step.action) {
      step.action();
    }

    // 잠시 대기 후 툴팁 표시 (화면 전환 애니메이션 대기)
    setTimeout(() => {
      this.updateTooltip(step);
      this.updateProgress();
      this.highlightTarget(step.target);

      // 자동 재생
      if (this.autoPlayTimer) {
        clearTimeout(this.autoPlayTimer);
      }

      this.autoPlayTimer = setTimeout(() => {
        if (this.isRunning) {
          this.nextStep();
        }
      }, step.duration);
    }, 500);
  }

  updateTooltip(step) {
    const tooltip = document.getElementById('guideTourTooltip');
    if (!tooltip) return;

    const titleEl = tooltip.querySelector('.tour-tooltip-title');
    const contentEl = tooltip.querySelector('.tour-tooltip-content');
    const progressText = tooltip.querySelector('.tour-progress-text');

    if (titleEl) titleEl.textContent = step.title;
    if (contentEl) contentEl.textContent = step.content;
    if (progressText) progressText.textContent = `${this.currentStep + 1} / ${this.steps.length}`;

    // 위치 조정
    tooltip.className = 'tour-tooltip';
    tooltip.classList.add(`position-${step.position}`);

    // 타겟 요소 위치에 따른 툴팁 배치
    if (step.target && step.position !== 'center') {
      const targetEl = document.querySelector(step.target);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();

        if (step.position === 'bottom') {
          tooltip.style.top = `${rect.bottom + 20}px`;
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translateX(-50%)';
        } else if (step.position === 'top') {
          tooltip.style.top = `${rect.top - tooltip.offsetHeight - 20}px`;
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translateX(-50%)';
        }
      }
    } else {
      // 중앙 배치
      tooltip.style.top = '50%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
    }
  }

  updateProgress() {
    const progressFill = document.querySelector('.tour-progress-fill');
    if (progressFill) {
      const progress = ((this.currentStep + 1) / this.steps.length) * 100;
      progressFill.style.width = `${progress}%`;
    }
  }

  highlightTarget(selector) {
    // 이전 하이라이트 제거
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    // 새 타겟 하이라이트
    if (selector) {
      const target = document.querySelector(selector);
      if (target) {
        target.classList.add('tour-highlight');
        // 스크롤 to view
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.showStep(this.currentStep + 1);
    } else {
      this.stop();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  skipTour() {
    this.stop();
    showScreen('home');
  }
}

// 전역 인스턴스
let guideTour;

function initGuideTour() {
  guideTour = new GuideTour();

  // 버튼 이벤트 연결
  const prevBtn = document.getElementById('tourPrevBtn');
  const nextBtn = document.getElementById('tourNextBtn');
  const skipBtn = document.getElementById('tourSkipBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => guideTour.prevStep());
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => guideTour.nextStep());
  }
  if (skipBtn) {
    skipBtn.addEventListener('click', () => guideTour.skipTour());
  }
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
