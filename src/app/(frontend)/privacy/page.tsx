import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Pakistan Currency Exchange',
}

export default function PrivacyPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          At Pakistan Currency Exchange, protecting your privacy and security is our top priority.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information Collection</h2>
        <p>We collect personal information such as your name, identification numbers (CNIC/Passport), address, and transaction details strictly for regulatory compliance and processing your requests.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Information</h2>
        <p>Your information is used exclusively to facilitate your financial transactions, comply with anti-money laundering (AML) laws, and improve our services. We do not sell or rent your personal data to third parties.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p>We employ industry-standard security measures to protect your physical and electronic data against unauthorized access, alteration, or disclosure.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
        <p>If you have any questions or concerns regarding this Privacy Policy, please contact our support desk or reach out via our Complaints & Feedback page.</p>
      </div>
    </div>
  )
}
