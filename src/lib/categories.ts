// 카테고리 정의 — 여기 한 군데만 고치면 전체 사이트(배지, 필터, 색상)에 반영돼.
// 새 카테고리 추가하고 싶으면 이 객체에 한 줄 추가하고,
// 글 frontmatter의 `category:` 값을 아래 key(code, knitting, money)로 쓰면 돼.

export const CATEGORIES = {
  code: { label: '코딩', color: 'var(--cat-code)', soft: 'var(--cat-code-soft)' },
  knitting: { label: '뜨개질', color: 'var(--cat-knitting)', soft: 'var(--cat-knitting-soft)' },
  money: { label: '경제', color: 'var(--cat-money)', soft: 'var(--cat-money-soft)' },
  diary: { label: '일상', color: 'var(--cat-diary)', soft: 'var(--cat-diary-soft)' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export function getCategory(key?: string) {
  if (key && key in CATEGORIES) {
    return CATEGORIES[key as CategoryKey];
  }
  return { label: '기타', color: 'var(--muted)', soft: 'var(--border)' };
}
