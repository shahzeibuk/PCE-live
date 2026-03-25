import { revalidatePath, revalidateTag } from 'next/cache'

/** Revalidate in Next.js; no-op when run outside the app (CLI seeds, tests). */
export function safeRevalidatePath(path: string) {
  try {
    revalidatePath(path)
  } catch {
    // e.g. "Invariant: static generation store missing in revalidatePath"
  }
}

export function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag)
  } catch {
    // Same static generation context as revalidatePath
  }
}
