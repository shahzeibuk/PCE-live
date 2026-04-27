import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '@/utilities/safeRevalidatePath'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context?.disableRevalidate) {
    payload.logger.info(`Revalidating header`)
    safeRevalidateTag('global_header')
    safeRevalidatePath('/')
  }

  return doc
}
