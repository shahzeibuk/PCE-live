import type { Payload } from 'payload'
import type { User } from '@/payload-types'
import React from 'react'

import { getLiveSiteURL } from '@/utilities/getURL'
import { getUserRole } from '@/access/roles'

import './index.scss'

const baseClass = 'admin-dashboard'

type Props = {
  payload: Payload
  user?: User | null
}

type CollectionSlug =
  | 'pages'
  | 'posts'
  | 'currency-rates'
  | 'branches'
  | 'services'
  | 'contact-submissions'

async function getCollectionCount(payload: Payload, collection: CollectionSlug): Promise<number> {
  try {
    const result = await payload.find({
      collection,
      limit: 0,
      depth: 0,
      overrideAccess: true,
    })
    return result.totalDocs
  } catch {
    return 0
  }
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getDisplayName(user?: User | null): string {
  if (user?.name?.trim()) return user.name.trim()
  if (user?.email) return user.email.split('@')[0] ?? 'Admin'
  return 'Admin'
}

const AdminDashboard: React.FC<Props> = async ({ payload, user }) => {
  const role = getUserRole(user)
  const isRatesEditor = role === 'rates-editor'

  const rates = await getCollectionCount(payload, 'currency-rates')

  const siteUrl = getLiveSiteURL()
  const displayName = getDisplayName(user)

  if (isRatesEditor) {
    return (
      <div className={baseClass}>
        <section className={`${baseClass}__hero`}>
          <div className={`${baseClass}__hero-text`}>
            <p className={`${baseClass}__eyebrow`}>Pakistan Currency Exchange</p>
            <h1 className={`${baseClass}__title`}>
              {getGreeting()}, {displayName}
            </h1>
            <p className={`${baseClass}__subtitle`}>
              You can update buy and sell exchange rates here. Changes appear on the live website
              when you save.
            </p>
          </div>
          <div className={`${baseClass}__hero-actions`}>
            <a
              className={`${baseClass}__btn ${baseClass}__btn--primary`}
              href="/admin/collections/currency-rates"
            >
              Open currency rates
            </a>
            <a
              className={`${baseClass}__btn ${baseClass}__btn--ghost`}
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live site
            </a>
          </div>
        </section>

        <h2 className={`${baseClass}__section-title`}>Overview</h2>
        <div className={`${baseClass}__stats`}>
          <a className={`${baseClass}__stat`} href="/admin/collections/currency-rates">
            <span className={`${baseClass}__stat-value`}>{rates.toLocaleString()}</span>
            <span className={`${baseClass}__stat-label`}>Exchange rates</span>
          </a>
        </div>
      </div>
    )
  }

  const [pages, posts, branches, services, submissions] = await Promise.all([
    getCollectionCount(payload, 'pages'),
    getCollectionCount(payload, 'posts'),
    getCollectionCount(payload, 'branches'),
    getCollectionCount(payload, 'services'),
    getCollectionCount(payload, 'contact-submissions'),
  ])

  const stats = [
    { label: 'Exchange rates', value: rates, href: '/admin/collections/currency-rates' },
    { label: 'Pages', value: pages, href: '/admin/collections/pages' },
    { label: 'Posts', value: posts, href: '/admin/collections/posts' },
    { label: 'Branches', value: branches, href: '/admin/collections/branches' },
    { label: 'Services', value: services, href: '/admin/collections/services' },
    { label: 'Contact forms', value: submissions, href: '/admin/collections/contact-submissions' },
  ] as const

  const quickActions = [
    {
      title: 'Update exchange rates',
      description: 'Refresh buy/sell rates shown on the live site.',
      href: '/admin/collections/currency-rates',
    },
    {
      title: 'Site branding',
      description: 'Upload favicon icons for the website and admin panel.',
      href: '/admin/globals/siteBranding',
    },
    {
      title: 'Homepage hero',
      description: 'Edit carousel slides and hero messaging.',
      href: '/admin/globals/homeHero',
    },
    {
      title: 'Homepage services',
      description: 'Edit service boxes on the homepage.',
      href: '/admin/globals/homeServices',
    },
    {
      title: 'Why choose us',
      description: 'Headline, bullets, and side image.',
      href: '/admin/globals/homeWhyUs',
    },
    {
      title: 'Homepage FAQs',
      description: 'Questions and answers on the homepage.',
      href: '/admin/globals/homeFaq',
    },
  ] as const

  return (
    <div className={baseClass}>
      <section className={`${baseClass}__hero`}>
        <div className={`${baseClass}__hero-text`}>
          <p className={`${baseClass}__eyebrow`}>Pakistan Currency Exchange</p>
          <h1 className={`${baseClass}__title`}>
            {getGreeting()}, {displayName}
          </h1>
          <p className={`${baseClass}__subtitle`}>
            Manage content, exchange rates, and site settings from one place. Changes publish to the
            live website when you save.
          </p>
        </div>
        <div className={`${baseClass}__hero-actions`}>
          <a className={`${baseClass}__btn ${baseClass}__btn--primary`} href={siteUrl} target="_blank" rel="noopener noreferrer">
            View live site
          </a>
          <a className={`${baseClass}__btn ${baseClass}__btn--ghost`} href="/admin/collections/currency-rates">
            Currency rates
          </a>
        </div>
      </section>

      <h2 className={`${baseClass}__section-title`}>Overview</h2>
      <div className={`${baseClass}__stats`}>
        {stats.map((stat) => (
          <a key={stat.label} className={`${baseClass}__stat`} href={stat.href}>
            <span className={`${baseClass}__stat-value`}>{stat.value.toLocaleString()}</span>
            <span className={`${baseClass}__stat-label`}>{stat.label}</span>
          </a>
        ))}
      </div>

      <h2 className={`${baseClass}__section-title`}>Quick actions</h2>
      <div className={`${baseClass}__actions`}>
        {quickActions.map((action) => (
          <a key={action.title} className={`${baseClass}__action`} href={action.href}>
            <span className={`${baseClass}__action-title`}>{action.title}</span>
            <p className={`${baseClass}__action-desc`}>{action.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
