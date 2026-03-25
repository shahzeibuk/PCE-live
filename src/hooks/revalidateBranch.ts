import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath } from '@/utilities/safeRevalidatePath'

export const revalidateBranch: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    safeRevalidatePath('/branches')
    safeRevalidatePath(`/branches/${doc.id}`)
    payload.logger.info(`Revalidated branches (id ${doc.id})`)
  }
  return doc
}

export const revalidateBranchDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    safeRevalidatePath('/branches')
    if (doc?.id != null) safeRevalidatePath(`/branches/${doc.id}`)
    payload.logger.info(`Revalidated branches after delete`)
  }
  return doc
}
