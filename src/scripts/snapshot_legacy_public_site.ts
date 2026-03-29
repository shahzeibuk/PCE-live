/**
 * Downloads public HTML from pakistancurrency.com paths into ./legacy-html-snapshot/
 * for offline comparison or a future HTML → Lexical converter.
 *
 *   pnpm snapshot:legacy
 *
 * Env: LEGACY_PUBLIC_SITE_URL (default https://www.pakistancurrency.com)
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const repoRoot = path.resolve(dirname, '../..')

const BASE = (process.env.LEGACY_PUBLIC_SITE_URL || 'https://www.pakistancurrency.com').replace(
  /\/$/,
  '',
)

/** Legacy Laravel often uses flat paths; tweak if your server uses another pattern. */
const PATHS = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/western-union',
  '/moneygram',
  '/ria-money-transfer',
  '/currency-exchange',
  '/telegraphic-transfer',
  '/demand-draft',
  '/pakistan-remittance-initiative',
  '/news',
  '/blog',
  '/posts',
]

async function main() {
  const outDir = path.join(repoRoot, 'legacy-html-snapshot')
  fs.mkdirSync(outDir, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')

  for (const p of PATHS) {
    const url = `${BASE}${p === '/' ? '/' : p}`
    const safeName = p === '/' ? 'index' : p.replace(/^\//, '').replace(/\//g, '_') || 'page'
    const filePath = path.join(outDir, `${stamp}_${safeName}.html`)

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PCE-snapshot/1.0; +https://www.pakistancurrency.com)',
          Accept: 'text/html,application/xhtml+xml',
        },
        redirect: 'follow',
      })
      const body = await res.text()
      fs.writeFileSync(filePath, body, 'utf-8')
      console.log(`${res.status} ${url} → ${path.relative(repoRoot, filePath)} (${body.length} bytes)`)
    } catch (e) {
      console.error(`FAIL ${url}`, e)
    }
  }

  console.log(`\nWrote under ${path.relative(repoRoot, outDir)}/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
