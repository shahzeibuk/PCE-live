import React from 'react'

export const metadata = {
  title: 'Company Profile | Pakistan Currency Exchange',
}

export default function CompanyProfilePage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Company Profile</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="mb-6">
          Pakistan Currency Exchange (Pvt) dates back to 1992, but the idea of having a physical platform was rooted on June 20, 2003, following the company’s ordinance 1984, just after the Exchange Companies Reforms passed. All the services we offer under the name of PCE are well-worded with the State Bank of Pakistan.
        </p>

        <p className="mb-6">
          Be it safety and security or reliability of all sorts of money transfers including remittance, PCE leaves no-stone unturned in providing utmost satisfaction across all the phases of customer engagement.
        </p>

        <p className="mb-6">
          We totally understand that sending and receiving money is more of an emotional exchange between loved ones than just transferring bucks; that is why we call your convenience, our asset. Here at PCE, you don't need to wait for hours in queues with tension on your face, rather you will feel relaxed and satisfied; you can thanks to our minimalistic requirements later.
        </p>

        <p className="mb-12">
          PCE expansionary strategy has reached 130 locations, improving our brand visibility, exceeding consumer feasibilities, and helping us to build a successful brand image.
        </p>

        <h2 className="text-2xl font-bold mb-6">Board of Directors</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Imran Ali Bostan</strong> – Director</li>
          <li><strong>Malik Tahir Abbas</strong> – Director</li>
          <li><strong>Maj (R) Khizar Hayat Khan</strong> – Director, Chief Executive Officer</li>
        </ul>
      </div>
    </div>
  )
}
