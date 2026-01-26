# EcoQuest - 시민 참여형 생태 모니터링 플랫폼

게이미피케이션 기반의 조경 공간 생태 모니터링 웹 앱 프로토타입입니다.

## 주요 기능

- **홈 대시보드**: 사용자 프로필, 일일 퀘스트, 최근 발견
- **탐험 지도**: 서울 주요 공원 위치, 생태 핫스팟 표시
- **생물 발견**: AI 기반 생물 식별 시뮬레이션
- **생물 도감**: 발견한 생물 컬렉션 (30+ 한국 자생종)
- **퀘스트 시스템**: 일일/주간/시즌 퀘스트
- **리더보드**: 전체/지역/길드 랭킹
- **프로필**: 에코토큰, 배지, NFT 컬렉션

## 기술 스택

- HTML5 / CSS3 / Vanilla JavaScript
- 반응형 모바일 앱 UI (375px 기준)
- 목업 데이터 (한국 생물종 38종)

## 실행 방법

1. `index.html`을 브라우저에서 열기
2. 또는 로컬 서버 실행:
   ```bash
   npx serve .
   ```

## 배포

- Vercel을 통한 자동 배포
- GitHub 저장소 연동

## 프로젝트 구조

```
ecoquest-prototype/
├── index.html          # 메인 앱
├── css/
│   └── style.css       # 스타일시트
├── js/
│   ├── data.js         # 목업 데이터
│   ├── components.js   # UI 컴포넌트
│   └── app.js          # 메인 로직
├── assets/
│   └── images/         # 이미지 자산
└── README.md
```

## 라이선스

MIT License

---

Generated with Claude Code
