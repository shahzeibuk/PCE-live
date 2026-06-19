import type { Access } from 'payload'

import type { User } from '@/payload-types'

export const USER_ROLES = ['admin', 'rates-editor'] as const
export type UserRole = (typeof USER_ROLES)[number]

export function getUserRole(user: User | null | undefined): UserRole | null {
  if (!user) return null
  // Accounts created before roles existed (or old JWTs without role): keep full admin access.
  if (!user.role) return 'admin'
  return user.role as UserRole
}

export function canUserManageRates(user: User | null | undefined): boolean {
  const role = getUserRole(user)
  return role === 'admin' || role === 'rates-editor'
}

/** Full access to all collections, globals, and user management. */
export const isAdmin: Access<User> = ({ req: { user } }) => getUserRole(user) === 'admin'

/** Admins manage all users; others can only read/update their own account (required for logout). */
export const adminOrSelf: Access<User> = ({ req: { user } }) => {
  if (getUserRole(user) === 'admin') return true
  if (user?.id) return { id: { equals: user.id } }
  return false
}

/** Can open the admin panel and manage currency exchange rates only. */
export const canManageRates: Access<User> = ({ req: { user } }) => canUserManageRates(user)

/** Hide admin nav items from rates-only users. */
export function hideFromNonAdmin({ user }: { user: User | null | undefined }): boolean {
  return getUserRole(user) !== 'admin'
}
