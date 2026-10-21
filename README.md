# My Startup & Dev Diary (Astro + GitHub Pages)

Astro로 만든 블로그 소스. 글은 `src/content/blog/` 안에 마크다운 파일로 추가하면 되고,
`main` 브랜치에 push할 때마다 GitHub Actions가 자동으로 빌드해서 GitHub Pages에 배포해.

## 1. 로컬에서 미리보기

```bash
npm install
npm run dev
```

터미널에 나오는 주소(기본 `http://localhost:4321`)를 브라우저로 열면 돼.

## 2. 새 글 쓰기

`src/content/blog/` 안에 새 `.md` 파일을 하나 만들고 맨 위에 이런 식으로 메타데이터를 적어줘:

```md
---
title: "글 제목"
description: "한 줄 요약"
pubDate: 2026-11-01
tags: ["example"]
---

여기부터 본문. 그냥 마크다운으로 쓰면 돼.
```

`draft: true`를 추가하면 홈/목록에는 안 보이지만 로컬 미리보기에서는 계속 확인할 수 있어.

## 2-1. 카테고리

`category:` 값은 `dev`(개발일지) / `knitting`(뜨개질) / `money`(경제) 셋 중 하나를 쓰면 돼. 안 쓰면 "기타"로 표시돼.
`/blog/`에서 카테고리 필터 버튼으로 걸러볼 수 있고, `/blog/category/dev/`처럼 카테고리별 페이지도 자동으로 생겨.

새 카테고리를 추가하고 싶으면 `src/lib/categories.ts` 한 파일만 고치면 돼 — 거기에 key/라벨/색상을 하나 추가하고,
`src/content.config.ts`의 `category` enum에도 같은 key를 추가해주면 끝.

## 3. GitHub에 올리기

1. github.com에서 새 저장소 생성
   - 저장소 이름을 **`내github아이디.github.io`** 로 만들면 주소가 깔끔해져 (예: `jane.github.io`)
   - 다른 이름(예: `my-blog`)으로 만들어도 되는데, 그러면 아래 3-3에서 `base` 설정을 바꿔줘야 해
   - Public으로 생성, README/gitignore는 추가하지 않기 (이미 이 폴더에 있음)

2. 이 폴더에서 Git 초기화 후 push:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/내github아이디/저장소이름.git
   git push -u origin main
   ```

3. `astro.config.mjs` 파일 열어서 `site`와 `base`를 실제 값으로 바꾸기
   - 저장소 이름이 `내github아이디.github.io` 라면:
     ```js
     site: 'https://내github아이디.github.io',
     base: '/',
     ```
   - 저장소 이름이 다른 경우(예: `my-blog`)라면:
     ```js
     site: 'https://내github아이디.github.io',
     base: '/my-blog',
     ```
   - 바꾼 뒤 다시 커밋 + push

## 4. GitHub Pages 배포 활성화

1. GitHub 저장소 페이지 → **Settings** → **Pages**
2. **Build and deployment** → **Source**를 **GitHub Actions**로 선택
3. 저장소에 이미 들어있는 `.github/workflows/deploy.yml`이 자동으로 실행됨 (Actions 탭에서 진행 상황 확인 가능)
4. 몇 분 뒤 `https://내github아이디.github.io` (또는 설정한 주소)에서 확인

이후로는 그냥 `git add . && git commit -m "..." && git push` 할 때마다 자동으로 재배포돼.

## 5. 나중에 커스텀 도메인 연결하고 싶으면

1. Cloudflare Registrar, Namecheap 등에서 도메인 구매
2. GitHub 저장소 **Settings → Pages → Custom domain**에 도메인 입력
3. 도메인 구매처 DNS에 GitHub이 안내하는 레코드 등록 (A 레코드 또는 CNAME)
4. `astro.config.mjs`의 `site`도 새 도메인으로 업데이트

## 폴더 구조

```
src/
  content/
    blog/            ← 글(마크다운)이 여기 들어감
  content.config.ts  ← 글 메타데이터 스키마 정의
  layouts/
    BaseLayout.astro ← 공통 레이아웃(헤더/푸터/스타일)
  pages/
    index.astro      ← 홈
    blog/
      index.astro       ← 전체 글 목록
      [...slug].astro   ← 글 상세 페이지 (자동 생성)
```
