import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidatePromoBanner: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context?.disableRevalidate) {
    payload.logger.info('Revalidating promo banner')
    safeRevalidateTag('global_promoBanner')
    safeRevalidatePath('/')
  }

  return doc
}
