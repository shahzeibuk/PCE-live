import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidateHomeHero: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homepage hero')
    safeRevalidateTag('global_homeHero')
    safeRevalidatePath('/')
  }

  return doc
}
