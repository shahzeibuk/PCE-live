import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidateSiteBranding: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context?.disableRevalidate) {
    payload.logger.info('Revalidating site branding')
    safeRevalidateTag('global_siteBranding')
    safeRevalidatePath('/')
    safeRevalidatePath('/admin')
  }

  return doc
}
