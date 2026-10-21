import { defineConfig } from 'astro/config';

// ──────────────────────────────────────────────────────────────────────────
// 배포 설정 (deploy settings) — 딱 두 줄만 상황에 맞게 바꿔주면 돼.
//
// 1) 저장소 이름을 `username.github.io`로 만들었다면 (추천, 주소가 깔끔함):
//      site: 'https://username.github.io'
//      base: '/'
//
// 2) 저장소 이름을 다른 걸로 만들었다면 (예: my-blog):
//      site: 'https://username.github.io'
//      base: '/my-blog'
//
// 3) 커스텀 도메인을 연결했다면 (예: example.com):
//      site: 'https://example.com'
//      base: '/'
// ──────────────────────────────────────────────────────────────────────────

export default defineConfig({
  site: 'https://valiantotter.github.io',
  base: '/',
});
