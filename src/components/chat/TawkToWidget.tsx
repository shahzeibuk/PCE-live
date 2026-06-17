import Script from 'next/script'

const TAWK_EMBED_SRC = 'https://embed.tawk.to/6a3280b60205461d4ccc7034/1jrakdirv'

export function TawkToWidget() {
  return (
    <Script
      id="tawk-to"
      src={TAWK_EMBED_SRC}
      strategy="lazyOnload"
      crossOrigin="anonymous"
      charSet="UTF-8"
    />
  )
}
