import React from 'react'
import { PartnersCarousel } from '@/components/PartnersCarousel'

export const metadata = {
  title: 'Partners & Associates | Pakistan Currency Exchange',
}

export default function PartnersAssociatesPage() {
  return (
    <div className="container py-16 md:py-24 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#0a8258]">Partners & Associates</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none mb-16 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Pakistan Currency Exchange takes pride in its robust network of global partners and associates. 
          By collaborating with the world's leading financial institutions and money transfer operators, 
          we ensure that your transactions are seamless, secure, and swift.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-card/50 rounded-2xl p-8 border border-border">
        {/* We can re-use the carousel here for visual impact */}
        <PartnersCarousel />
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-border rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-[#0a8258]">Global Reach</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our association with international remittance giants like Western Union, MoneyGram, and RIA allows us to facilitate payments to and from over 200 countries and territories worldwide.
          </p>
        </div>
        <div className="p-8 border border-border rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-[#0a8258]">Compliance & Security</h3>
          <p className="text-gray-600 dark:text-gray-300">
            All our partnerships strictly adhere to the regulatory frameworks established by the State Bank of Pakistan and international AML/CFT guidelines, ensuring maximum security for your funds.
          </p>
        </div>
      </div>
    </div>
  )
}
