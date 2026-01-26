// EcoQuest 파티클 효과 시스템

// 인트로 파티클
class IntroParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();

    window.addEventListener('resize', () => this.resize());
    this.init();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    if (!this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// 축하 파티클 (발견 시)
class CelebrationParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  start(rarity = 'common') {
    this.resize();
    this.particles = [];
    this.running = true;

    // 희귀도에 따른 파티클 설정
    const config = {
      common: { count: 30, colors: ['#6B7280', '#9CA3AF', '#D1D5DB'] },
      uncommon: { count: 50, colors: ['#10B981', '#34D399', '#6EE7B7'] },
      rare: { count: 80, colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FBBF24'] },
      legendary: { count: 120, colors: ['#F59E0B', '#FBBF24', '#FDE68A', '#FEF3C7', '#10B981'] }
    };

    const settings = config[rarity] || config.common;

    for (let i = 0; i < settings.count; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        size: Math.random() * 8 + 4,
        color: settings.colors[Math.floor(Math.random() * settings.colors.length)],
        speedX: (Math.random() - 0.5) * 15,
        speedY: (Math.random() - 0.5) * 15 - 5,
        gravity: 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'circle' : 'rect'
      });
    }

    this.animate();
  }

  stop() {
    this.running = false;
  }

  animate() {
    if (!this.running || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeParticles = 0;

    this.particles.forEach(p => {
      if (p.opacity <= 0) return;

      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.015;

      if (p.opacity > 0) {
        activeParticles++;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        this.ctx.restore();
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.running = false;
    }
  }
}

// 레벨업 컨페티
class LevelUpConfetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.resize();
    this.particles = [];
    this.running = true;

    const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6', '#EC4899'];

    for (let i = 0; i < 150; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.1
      });
    }

    this.animate();
  }

  stop() {
    this.running = false;
  }

  animate() {
    if (!this.running || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeParticles = 0;

    this.particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.wobble) * 0.5;
      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;

      if (p.y < this.canvas.height + 50) {
        activeParticles++;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        this.ctx.restore();
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.running = false;
    }
  }
}

// 전역 인스턴스 생성
let introParticles;
let celebrationParticles;
let levelUpConfetti;

function initParticles() {
  introParticles = new IntroParticles('introParticles');
}

function initCelebrationParticles() {
  celebrationParticles = new CelebrationParticles('celebrationCanvas');
}

function initLevelUpConfetti() {
  levelUpConfetti = new LevelUpConfetti('levelUpConfetti');
}

function triggerCelebration(rarity) {
  if (!celebrationParticles) {
    initCelebrationParticles();
  }
  celebrationParticles.start(rarity);
}

function triggerLevelUpConfetti() {
  if (!levelUpConfetti) {
    initLevelUpConfetti();
  }
  levelUpConfetti.start();
}
