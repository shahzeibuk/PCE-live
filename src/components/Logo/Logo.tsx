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
      width={240}
      height={78}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[15rem] w-full h-auto min-h-[2.25rem] object-contain', className)}
      src="/Pakistan%20Currency%20Logo.png"
    />
  )
}
