import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidateHomeFaq: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homepage FAQ')
    safeRevalidateTag('global_homeFaq')
    safeRevalidatePath('/')
  }

  return doc
}
