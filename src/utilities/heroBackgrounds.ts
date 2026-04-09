/**
 * Marketing hero backgrounds under `public/hero/`.
 * Picks change per request (server render) so users see variety across visits/refreshes.
 */
export const HERO_BACKGROUND_PATHS = [
  '/hero/W6qgc.jpg',
  '/hero/wLlhs.jpg',
  '/hero/HFel9.jpg',
  '/hero/i82qk.jpg',
  '/hero/LHopV.jpg',
] as const

export type HeroBackgroundPath = (typeof HERO_BACKGROUND_PATHS)[number]

export function pickRandomHeroBackground(): HeroBackgroundPath {
  const i = Math.floor(Math.random() * HERO_BACKGROUND_PATHS.length)
  return HERO_BACKGROUND_PATHS[i]!
}

/**
 * Two images for stacked breakpoints (often different crops work better on narrow vs wide).
 * When possible, avoids using the same file twice.
 */
export function pickRandomHeroBackgroundPair(): { mobile: HeroBackgroundPath; desktop: HeroBackgroundPath } {
  const mobile = pickRandomHeroBackground()
  let desktop = pickRandomHeroBackground()
  let n = 0
  while (desktop === mobile && HERO_BACKGROUND_PATHS.length > 1 && n < 12) {
    desktop = pickRandomHeroBackground()
    n += 1
  }
  return { mobile, desktop }
}
