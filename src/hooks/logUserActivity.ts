import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

type ActivityAction = 'create' | 'update' | 'delete'

type LogActivityArgs = {
  req: PayloadRequest
  action: ActivityAction
  resource: string
  documentId?: string | number | null
  documentTitle?: string | null
  pagePath?: string | null
}

function titleFromDoc(doc: Record<string, unknown> | null | undefined, fallbackId: unknown): string {
  if (!doc) return String(fallbackId ?? 'unknown')
  for (const key of ['title', 'currency_name', 'branch_name', 'name', 'label'] as const) {
    const value = doc[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return String(doc.id ?? fallbackId ?? 'unknown')
}

function pagePathFromDoc(resource: string, doc: Record<string, unknown> | null | undefined): string | null {
  if (!doc) return null
  const slug = typeof doc.slug === 'string' ? doc.slug.trim().replace(/^\/+/, '') : ''

  if (resource === 'pages') {
    if (!slug || slug === 'home') return '/'
    return `/${slug}`
  }
  if (resource === 'services' && slug) return `/services/${slug}`
  if (resource === 'posts' && slug) return `/posts/${slug}`
  if (resource === 'news' && slug) return `/news/${slug}`
  if (resource === 'currency-rates') return '/currency-rates'
  if (resource === 'branches') return '/branches'

  return null
}

/** Skip draft autosaves so activity log is not flooded by Pages live-preview saves. */
function isDraftAutosave(
  operation: string,
  doc: Record<string, unknown>,
  previousDoc: Record<string, unknown> | null | undefined,
): boolean {
  if (operation !== 'update') return false
  const status = doc._status
  const prevStatus = previousDoc?._status
  return status === 'draft' && (prevStatus === 'draft' || prevStatus == null)
}

export async function logUserActivity({
  req,
  action,
  resource,
  documentId,
  documentTitle,
  pagePath,
}: LogActivityArgs): Promise<void> {
  if (req.context?.disableActivityLog) return

  const user = req.user
  if (!user?.id) return

  const idLabel = documentId != null ? String(documentId) : ''
  const title = (documentTitle || idLabel || resource).trim()
  const actionLabel = action === 'create' ? 'Created' : action === 'delete' ? 'Deleted' : 'Updated'
  const pathPart = pagePath ? ` (${pagePath})` : ''
  const summary = `${actionLabel} ${resource}: ${title}${pathPart}`

  try {
    await req.payload.create({
      collection: 'activity-logs',
      data: {
        summary,
        user: user.id,
        userEmail: typeof user.email === 'string' ? user.email : undefined,
        action,
        resource,
        documentId: idLabel || undefined,
        documentTitle: title,
        pagePath: pagePath || undefined,
      },
      req,
      context: {
        ...((req.context as Record<string, unknown>) || {}),
        disableActivityLog: true,
        disableRevalidate: true,
      },
    })
  } catch (error) {
    req.payload.logger.error({
      msg: 'Failed to write activity log',
      err: error,
      resource,
      action,
    })
  }
}

/**
 * Collection afterChange logger. Pass the collection slug (e.g. `pages`).
 */
export function createActivityLogAfterChange(resource: string): CollectionAfterChangeHook {
  return async ({ doc, req, operation, previousDoc, context }) => {
    if (context?.disableActivityLog) return doc
    if (!req.user) return doc

    const record = doc as Record<string, unknown>
    const previous = previousDoc as Record<string, unknown> | undefined

    // Pages/Posts drafts autosave frequently — only log publish / non-draft saves.
    if (isDraftAutosave(operation, record, previous)) {
      return doc
    }

    await logUserActivity({
      req,
      action: operation === 'create' ? 'create' : 'update',
      resource,
      documentId: doc.id,
      documentTitle: titleFromDoc(record, doc.id),
      pagePath: pagePathFromDoc(resource, record),
    })

    return doc
  }
}

export function createActivityLogAfterDelete(resource: string): CollectionAfterDeleteHook {
  return async ({ doc, req, context }) => {
    if (context?.disableActivityLog) return doc
    if (!req.user) return doc

    const record = doc as Record<string, unknown>
    await logUserActivity({
      req,
      action: 'delete',
      resource,
      documentId: doc?.id,
      documentTitle: titleFromDoc(record, doc?.id),
      pagePath: pagePathFromDoc(resource, record),
    })

    return doc
  }
}

/**
 * Global afterChange logger (e.g. header, homeHero).
 */
export function createGlobalActivityLogAfterChange(resource: string): GlobalAfterChangeHook {
  return async ({ doc, req, context }) => {
    if (context?.disableActivityLog) return doc
    if (!req.user) return doc

    await logUserActivity({
      req,
      action: 'update',
      resource: `global:${resource}`,
      documentId: resource,
      documentTitle: resource,
      pagePath: null,
    })

    return doc
  }
}
