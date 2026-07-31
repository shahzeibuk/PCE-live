import type { Payload, PayloadRequest } from 'payload'

/**
 * Reads the admin toggle from `currency-rates-settings`.
 * Defaults to enabled when the global row is missing (pre-migration / first boot).
 */
export async function isCurrencyApiEnabled(
  payload: Payload,
  req?: PayloadRequest,
): Promise<boolean> {
  try {
    const settings = await payload.findGlobal({
      slug: 'currency-rates-settings',
      depth: 0,
      ...(req ? { req } : {}),
    })
    // Explicit false only; undefined/null → treat as enabled for backward compatibility
    return settings?.apiEnabled !== false
  } catch (error) {
    console.error('Failed to read currency-rates-settings; defaulting API enabled:', error)
    return true
  }
}
