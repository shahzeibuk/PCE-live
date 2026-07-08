import type { Payload } from 'payload'

import { safeRevalidatePath } from '@/utilities/safeRevalidatePath'
import { mapCsvRecordToBranch, parseCsvToRecords, type BranchCsvRow } from '@/utilities/parseCsv'

export type BranchCsvImportResult = {
  ok: true
  created: number
  updated: number
  skipped: number
  errors: string[]
}

export type BranchCsvImportOptions = {
  replace?: boolean
}

function branchKey(row: Pick<BranchCsvRow, 'branch_name' | 'city'>): string {
  return `${row.branch_name.trim().toLowerCase()}::${row.city.trim().toLowerCase()}`
}

export async function importBranchesFromCsv(
  payload: Payload,
  csvText: string,
  options?: BranchCsvImportOptions,
): Promise<BranchCsvImportResult> {
  const records = parseCsvToRecords(csvText)
  if (records.length === 0) {
    return { ok: true, created: 0, updated: 0, skipped: 0, errors: ['CSV has no data rows.'] }
  }

  const errors: string[] = []
  const rows: BranchCsvRow[] = []

  records.forEach((record, index) => {
    try {
      rows.push(mapCsvRecordToBranch(record, index + 2))
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `Row ${index + 2}: invalid data`)
    }
  })

  if (rows.length === 0) {
    return { ok: true, created: 0, updated: 0, skipped: 0, errors }
  }

  if (options?.replace) {
    await payload.delete({
      collection: 'branches',
      where: { id: { exists: true } },
    })
  }

  let created = 0
  let updated = 0
  let skipped = 0

  const existing = options?.replace
    ? { docs: [] as { id: number; branch_name: string; city: string }[] }
    : await payload.find({
        collection: 'branches',
        limit: 5000,
        pagination: false,
        depth: 0,
      })

  const existingByKey = new Map(
    existing.docs.map((doc) => [
      branchKey({ branch_name: doc.branch_name as string, city: doc.city as string }),
      doc,
    ]),
  )

  for (const row of rows) {
    const key = branchKey(row)
    const match = existingByKey.get(key)

    const data = {
      branch_name: row.branch_name,
      city: row.city,
      address: row.address,
      phone: row.phone,
      cell_phone: row.cell_phone,
      email: row.email,
      google_map_link: row.google_map_link,
    }

    try {
      if (match && !options?.replace) {
        await payload.update({
          collection: 'branches',
          id: match.id,
          data,
        })
        updated++
      } else {
        await payload.create({ collection: 'branches', data })
        created++
        if (!options?.replace) {
          existingByKey.set(key, { id: -1, branch_name: row.branch_name, city: row.city })
        }
      }
    } catch (error) {
      skipped++
      const message = error instanceof Error ? error.message : 'Unknown error'
      errors.push(`${row.branch_name} (${row.city}): ${message}`)
    }
  }

  safeRevalidatePath('/branches')

  return { ok: true, created, updated, skipped, errors }
}
