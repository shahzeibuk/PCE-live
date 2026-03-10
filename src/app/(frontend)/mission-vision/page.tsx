import React from 'react'

export const metadata = {
  title: 'Mission & Vision | Pakistan Currency Exchange',
}

export default function MissionVisionPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-[#0a8258]">Mission & Vision</h1>
      
      <div className="prose prose-lg dark:prose-invert space-y-8">
        <div className="p-8 bg-gray-50 dark:bg-card border-l-4 border-l-[#80E143] rounded-r-lg shadow-sm">
          <p className="text-xl font-medium leading-relaxed italic">
            "We pledge to provide effortless procedures and authentic services with the touch of accuracy, security, reliability, loyalty, and most importantly, convenience to our customers."
          </p>
        </div>

        <p className="mb-6">
          We also aim to follow all the industry standards and expected thresholds of money exchange and transfers while offering services at your earliest and leveraging our financial expertise as speedy as possible.
        </p>

        <p className="mb-6">
          PCE wows to remit money in a manner that is reliable, secure, and convenient. Our team will continue hitting the highest scores in transparency and dedication while converging with known remittance providers.
        </p>
      </div>
    </div>
  )
}
