import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath } from '@/utilities/safeRevalidatePath'

export const revalidateService: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    safeRevalidatePath('/services')
    safeRevalidatePath('/')
    if (doc.slug) safeRevalidatePath(`/services/${doc.slug}`)
    if (previousDoc && typeof previousDoc.slug === 'string' && previousDoc.slug !== doc.slug) {
      safeRevalidatePath(`/services/${previousDoc.slug}`)
    }
    payload.logger.info(`Revalidated services (slug ${doc.slug})`)
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    safeRevalidatePath('/services')
    safeRevalidatePath('/')
    if (doc?.slug) safeRevalidatePath(`/services/${doc.slug}`)
    payload.logger.info(`Revalidated services after delete`)
  }
  return doc
}
