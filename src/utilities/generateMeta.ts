import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { normalizeStoredMediaPath } from './normalizeStoredMediaPath'
import { formatPageTitle, getNotFoundMetadata } from './siteMetadata'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    const mediaPath = ogUrl || image.url

    if (mediaPath) {
      const normalized = normalizeStoredMediaPath(mediaPath)
      url =
        normalized.startsWith('http://') || normalized.startsWith('https://')
          ? normalized
          : `${serverUrl}${normalized}`
    }
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  if (!doc) {
    return getNotFoundMetadata()
  }

  const ogImage = getImageURL(doc?.meta?.image)
  const title = formatPageTitle(doc?.meta?.title)

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
