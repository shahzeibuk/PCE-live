import Script from 'next/script'
import React from 'react'

/** Frontend is light-only; lock `data-theme` before paint to avoid flash. */
export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.setAttribute('data-theme', 'light');`,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
