import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'branches_data.json')

function titleCase(s) {
  return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
}

/** Derive display city from legacy address (often ends with "(karachi)") or branch name. */
function inferCity(name, address) {
  const addr = (address || '').trim()
  const paren = addr.match(/\(([^)]+)\)\s*$/)
  if (paren) {
    let c = paren[1].replace(/\s*branch.*$/i, '').trim()
    if (c.length > 1) return titleCase(c)
  }
  const lower = addr.toLowerCase()
  const hints = [
    'karachi',
    'lahore',
    'islamabad',
    'rawalpindi',
    'faisalabad',
    'multan',
    'peshawar',
    'quetta',
    'hyderabad',
    'sialkot',
    'gujranwala',
    'gujrat',
    'abbottabad',
    'mardan',
    'bahawalpur',
    'sargodha',
    'sheikhupura',
    'sahiwal',
    'jhelum',
    'okara',
    'mirpur',
    'muzaffarabad',
    'mansehra',
    'haripur',
    'wah cantt',
    'wazirabad',
    'kharian',
    'daska',
    'kotli',
    'toba tek singh',
    'chiniot',
    'burewala',
    'chichawatni',
    'chakwal',
    'attock',
    'faislabad',
  ]
  for (const h of hints) {
    if (lower.includes(h)) return titleCase(h.replace(/\b\w/g, (l) => l.toUpperCase()))
  }
  const n = (name || '').replace(/\s+branch\s*(\d+)?$/i, '').trim()
  if (/^head office$|^main\s+branch/i.test(n)) {
    return lower.includes('karachi') ? 'Karachi' : 'Pakistan'
  }
  if (n) return titleCase(n.split(/\s+/)[0])
  return 'Pakistan'
}

async function scrapeBranches() {
  const branches = []
  const seen = new Set()
  console.log('Starting branch scrape from getbranch API...')
  const MAX_ID = 160
  let consecutiveMiss = 0

  for (let id = 1; id <= MAX_ID; id++) {
    try {
      const response = await fetch(`https://www.pakistancurrency.com/getbranch?id=${id}`)
      if (!response.ok) {
        consecutiveMiss++
        continue
      }

      const data = await response.json()
      if (!data.status || !data.message) {
        consecutiveMiss++
        continue
      }

      let branchData
      try {
        branchData = JSON.parse(data.message)
      } catch {
        consecutiveMiss++
        continue
      }

      if (branchData?.name) {
        consecutiveMiss = 0
        const key = `${branchData.name}|${branchData.address || ''}`
        if (seen.has(key)) continue
        seen.add(key)

        const phone = [branchData.phone, branchData.mobile].find((p) => p && String(p).trim())
        const branch_name = String(branchData.name).trim()
        const address = String(branchData.address || '').trim() || 'Address on file — contact branch.'
        const city = inferCity(branch_name, address)

        console.log(`Found: ${branch_name} (${city}) legacy id ${branchData.id ?? id}`)
        branches.push({
          legacy_id: branchData.id ?? id,
          branch_name,
          city,
          address,
          phone: phone ? String(phone).trim() : '0800-13537',
        })
      } else {
        consecutiveMiss++
      }
    } catch {
      consecutiveMiss++
    }

    if (consecutiveMiss >= 28 && id > 45) {
      console.log(`Stopping after ${consecutiveMiss} consecutive misses at id ${id}`)
      break
    }

    await new Promise((r) => setTimeout(r, 45))
  }

  fs.writeFileSync(OUT, JSON.stringify(branches, null, 2))
  console.log(`Wrote ${branches.length} branches to ${OUT}`)
}

scrapeBranches().catch((e) => {
  console.error(e)
  process.exit(1)
})
