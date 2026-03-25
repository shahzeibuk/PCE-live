import { revalidatePath } from 'next/cache'

/** Revalidate in Next.js; no-op when run outside the app (CLI seeds, tests). */
export function safeRevalidatePath(path: string) {
  try {
    revalidatePath(path)
  } catch {
    // e.g. "Invariant: static generation store missing in revalidatePath"
  }
}
