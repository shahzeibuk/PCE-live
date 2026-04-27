import clsx from 'clsx'
import React from 'react'

const DEFAULT_LOGO = '/Pakistan%20Currency%20Logo.png'
const DEFAULT_ALT = 'Pakistan Currency Exchange — official logo'

export interface LogoProps {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** When set (e.g. from Media in Payload), replaces the static logo file. */
  imageUrl?: string | null
  alt?: string
}

export const Logo = (props: LogoProps) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, imageUrl, alt } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const src = (imageUrl && imageUrl.trim() !== '' ? imageUrl : DEFAULT_LOGO) as string
  const altText = (alt && alt.trim() !== '' ? alt : DEFAULT_ALT) as string

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={altText}
      width={300}
      height={98}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        'block h-auto w-auto min-w-0 object-contain object-left',
        className,
      )}
      src={src}
    />
  )
}
