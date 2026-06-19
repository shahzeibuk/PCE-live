import type { Access } from 'payload'

import type { User } from '@/payload-types'

export const USER_ROLES = ['admin', 'rates-editor'] as const
export type UserRole = (typeof USER_ROLES)[number]

export function getUserRole(user: User | null | undefined): UserRole {
  if (!user) return 'admin'
  // Only explicitly assigned rates editors are restricted; everyone else keeps full admin access.
  if (user.role === 'rates-editor') return 'rates-editor'
  return 'admin'
}

export function canUserManageRates(user: User | null | undefined): boolean {
  if (!user) return false
  const role = getUserRole(user)
  return role === 'admin' || role === 'rates-editor'
}

/** Any logged-in user (required for Payload admin panel entry on the auth collection). */
export const canAccessAdminPanel: Access<User> = ({ req: { user } }) => Boolean(user)

/** Full access to all collections, globals, and user management. */
export const isAdmin: Access<User> = ({ req: { user } }) => Boolean(user) && getUserRole(user) === 'admin'

/** Admins manage all users; others can only read/update their own account (required for logout). */
export const adminOrSelf: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  if (getUserRole(user) === 'admin') return true
  if (user.id) return { id: { equals: user.id } }
  return false
}

/** Can open the admin panel and manage currency exchange rates only. */
export const canManageRates: Access<User> = ({ req: { user } }) => canUserManageRates(user)

/** Hide admin nav items from rates-only users. */
export function hideFromNonAdmin({ user }: { user: User | null | undefined }): boolean {
  return getUserRole(user) !== 'admin'
}
