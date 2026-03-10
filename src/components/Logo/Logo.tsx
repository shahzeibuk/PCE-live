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
      alt="Pakistan Currency Exchange Logo"
      width={180}
      height={60}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[11.25rem] w-full h-auto object-contain', className)}
      src="/logo.png"
    />
  )
}
