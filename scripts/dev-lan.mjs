import { spawn, execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function getLanIp() {
  for (const iface of ['en0', 'en1']) {
    try {
      const ip = execSync(`ipconfig getifaddr ${iface}`, { encoding: 'utf8' }).trim()
      if (ip) return ip
    } catch {
      // try next interface
    }
  }
  return null
}

const ip = process.env.LAN_IP?.trim() || getLanIp()
if (!ip) {
  console.error('Could not detect LAN IP. Connect to Wi‑Fi, then run:')
  console.error('  ipconfig getifaddr en0')
  console.error('Or set it manually: LAN_IP=192.168.x.x pnpm dev:lan')
  process.exit(1)
}

const serverUrl = `http://${ip}:3001`
console.log('\n  Local network URLs:')
console.log(`  Site:  ${serverUrl}`)
console.log(`  Admin: ${serverUrl}/admin\n`)

const child = spawn(
  'pnpm',
  ['exec', 'cross-env', 'NODE_OPTIONS=--no-deprecation', `NEXT_PUBLIC_SERVER_URL=${serverUrl}`, 'next', 'dev', '--hostname', '0.0.0.0', '--port', '3001'],
  { stdio: 'inherit', env: process.env, cwd: root },
)

child.on('exit', (code) => process.exit(code ?? 0))
