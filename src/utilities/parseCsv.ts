const HEADER_ALIASES: Record<string, string> = {
  branch: 'branch_name',
  branchname: 'branch_name',
  name: 'branch_name',
  city: 'city',
  address: 'address',
  phone: 'phone',
  telephone: 'phone',
  tel: 'phone',
  cell: 'cell_phone',
  cell_phone: 'cell_phone',
  mobile: 'cell_phone',
  email: 'email',
  google_map_link: 'google_map_link',
  google_maps: 'google_map_link',
  google_map: 'google_map_link',
  map_link: 'google_map_link',
  maps: 'google_map_link',
}

function normalizeHeader(header: string): string {
  const key = header.replace(/^\uFEFF/, '').trim().toLowerCase().replace(/[\s-]+/g, '_')
  return HEADER_ALIASES[key] ?? key
}

/** Parses RFC4180-style CSV into row objects keyed by header names. */
export function parseCsvToRecords(csvText: string): Record<string, string>[] {
  const rows = parseCsvRows(csvText)
  if (rows.length === 0) return []

  const headers = rows[0].map(normalizeHeader)
  const records: Record<string, string>[] = []

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i]
    if (cells.every((cell) => !cell.trim())) continue

    const record: Record<string, string> = {}
    headers.forEach((header, index) => {
      if (!header) return
      record[header] = (cells[index] ?? '').trim()
    })
    records.push(record)
  }

  return records
}

function parseCsvRows(csvText: string): string[][] {
  const text = csvText.replace(/^\uFEFF/, '')
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === ',') {
      row.push(cell)
      cell = ''
      continue
    }

    if (char === '\n' || (char === '\r' && next === '\n')) {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      if (char === '\r') i++
      continue
    }

    if (char === '\r') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      continue
    }

    cell += char
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }

  return rows
}

export type BranchCsvRow = {
  branch_name: string
  city: string
  address: string
  phone: string
  cell_phone?: string
  email?: string
  google_map_link?: string
}

export function mapCsvRecordToBranch(row: Record<string, string>, lineNumber: number): BranchCsvRow {
  const branch_name = row.branch_name?.trim()
  const city = row.city?.trim()
  const address = row.address?.trim()
  const phone = row.phone?.trim()

  const missing: string[] = []
  if (!branch_name) missing.push('branch_name')
  if (!city) missing.push('city')
  if (!address) missing.push('address')
  if (!phone) missing.push('phone')

  if (missing.length > 0) {
    throw new Error(`Row ${lineNumber}: missing required column(s): ${missing.join(', ')}`)
  }

  return {
    branch_name,
    city,
    address,
    phone,
    cell_phone: row.cell_phone?.trim() || undefined,
    email: row.email?.trim() || undefined,
    google_map_link: row.google_map_link?.trim() || undefined,
  }
}

export const BRANCH_CSV_TEMPLATE =
  'branch_name,city,address,phone,cell_phone,email,google_map_link\n' +
  'Main Branch,Karachi,"Office 7, Al-Rasheed Chamber, Shahrah-e-Faisal",021-34534780,0300-1234567,branch@example.com,https://maps.google.com/\n'
