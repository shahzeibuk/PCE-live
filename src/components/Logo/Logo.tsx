import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Pakistan Currency Exchange — official logo"
      width={300}
      height={98}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        'block h-auto w-auto min-w-0 object-contain object-left',
        className,
      )}
      src="/Pakistan%20Currency%20Logo.png"
    />
  )
}
