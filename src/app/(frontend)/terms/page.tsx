import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { CompanyInfo } from '@/payload-types'

export const metadata = {
  title: 'Terms & Conditions | Pakistan Currency Exchange',
}

export default async function TermsPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to Pakistan Currency Exchange. By accessing our services, you agree to these terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Services</h2>
        <p>Our currency exchange and remittance services are provided in accordance with the regulations set forth by the State Bank of Pakistan. You must provide valid identification for all transactions as required by law.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Exchange Rates</h2>
        <p>Currency exchange rates are subject to market fluctuations and may change without prior notice. The rate applicable will be the rate at the exact time of the transaction.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Remittance</h2>
        <p>We partner with globally recognized remittance services. Delivery times and fees vary depending on the destination and the service chosen.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations of Liability</h2>
        <p>We strive to provide seamless services, but Pakistan Currency Exchange shall not be held liable for delays caused by third-party systems, international banking networks, or regulatory holds.</p>
      </div>
    </div>
  )
}
