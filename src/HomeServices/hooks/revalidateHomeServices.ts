import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidateHomeServices: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homepage services section')
    safeRevalidateTag('global_homeServices')
    safeRevalidatePath('/')
  }

  return doc
}
