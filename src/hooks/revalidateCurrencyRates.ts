import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath } from '@/utilities/safeRevalidatePath'

export const revalidateCurrencyRates: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    safeRevalidatePath('/')
    safeRevalidatePath('/currency-rates')
    safeRevalidatePath('/api/currency-rates')
    payload.logger.info(
      `Revalidated currency rates (id ${doc.id}, last_updated ${doc.last_updated ?? 'n/a'})`,
    )
  }
  return doc
}

export const revalidateCurrencyRatesDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    safeRevalidatePath('/')
    safeRevalidatePath('/currency-rates')
    payload.logger.info('Revalidated currency rates after delete')
  }
}
