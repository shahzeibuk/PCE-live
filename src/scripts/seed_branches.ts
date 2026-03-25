import type { Payload } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export type SeedBranchesOptions = {
  /** When true, deletes all branch documents before inserting from JSON. */
  replace?: boolean
}

export const seedBranches = async (payload: Payload, options?: SeedBranchesOptions): Promise<void> => {
  payload.logger.info('Seeding branches...')

  const branchesPath = path.resolve(dirname, '../../branches_data.json')

  if (!fs.existsSync(branchesPath)) {
    payload.logger.error('branches_data.json not found!')
    return
  }

  const branchesData = JSON.parse(fs.readFileSync(branchesPath, 'utf-8')) as Array<{
    branch_name: string
    city: string
    address: string
    phone?: string
    google_map_link?: string
  }>

  const replace =
    options?.replace === true || process.env.SEED_BRANCHES_REPLACE === 'true'

  if (replace) {
    await payload.delete({
      collection: 'branches',
      where: { id: { exists: true } },
    })
    payload.logger.info('Existing branches removed (replace mode).')
  }

  for (const branch of branchesData) {
    try {
      await payload.create({
        collection: 'branches',
        data: {
          branch_name: branch.branch_name,
          city: branch.city,
          address: branch.address,
          phone: branch.phone?.trim() || '0800-13537',
          // google_map_link: branch.google_map_link, // Not in scraped data currently
        },
      })
      payload.logger.info(`Created branch: ${branch.branch_name}`)
    } catch (error: any) {
      payload.logger.error(`Error creating branch ${branch.branch_name}: ${error.message}`)
    }
  }

  payload.logger.info('Branch seeding completed.')
}
