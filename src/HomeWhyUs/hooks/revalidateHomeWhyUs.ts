import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidateHomeWhyUs: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homepage Why Choose section')
    safeRevalidateTag('global_homeWhyUs')
    safeRevalidatePath('/')
  }

  return doc
}
