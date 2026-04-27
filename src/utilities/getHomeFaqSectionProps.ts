import { HOME_FAQ } from '@/components/home/homeContent'
import type { HomeFaq } from '@/payload-types'

export type HomeFaqItemProps = {
  q: string
  a: string
}

export type HomeFaqSectionProps = {
  heading: string
  subheading: string
  initialVisibleCount: number
  items: HomeFaqItemProps[]
}

const DEFAULT_VISIBLE = 5

function normalizeCount(n: unknown): number {
  const num = typeof n === 'number' ? n : Number(n)
  if (!Number.isFinite(num) || num < 1) return DEFAULT_VISIBLE
  return Math.min(50, Math.floor(num))
}

function fallbackItems(): HomeFaqItemProps[] {
  return HOME_FAQ.items.map((i) => ({ q: i.q, a: i.a }))
}

/** Maps Payload `homeFaq` global; falls back to `HOME_FAQ` when items are empty. */
export function homeFaqGlobalToSectionProps(global: HomeFaq | null | undefined): HomeFaqSectionProps {
  if (!global) {
    return {
      heading: HOME_FAQ.heading,
      subheading: HOME_FAQ.subheading,
      initialVisibleCount: DEFAULT_VISIBLE,
      items: fallbackItems(),
    }
  }

  const heading = global.heading?.trim() || HOME_FAQ.heading
  const subheading = global.subheading?.trim() || HOME_FAQ.subheading
  const initialVisibleCount = normalizeCount(global.initialVisibleCount)

  const mapped: HomeFaqItemProps[] = []
  if (global.items?.length) {
    for (const row of global.items) {
      const q = row.question?.trim()
      const a = row.answer?.trim()
      if (!q || !a) continue
      mapped.push({ q, a })
    }
  }

  const items = mapped.length > 0 ? mapped : fallbackItems()

  return {
    heading,
    subheading,
    initialVisibleCount,
    items,
  }
}
