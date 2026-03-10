import React from 'react'

export const metadata = {
  title: 'Careers | Pakistan Currency Exchange',
}

export default function CareersPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Careers</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="font-semibold uppercase tracking-wider text-primary mb-6">
          Imagine a work environment that values technological innovation, respects integrity and stimulates enthusiasm.
        </p>
        
        <p className="mb-6">
          A place where you get a chance to do great work and collaborate alongside some of the brightest people you have ever met! We are an equal opportunity employer with a diverse work force to cater.
        </p>

        <p className="mb-6">
          We focus on ability and character as the driving forces for accomplishment in career advancement for all the needs of our customers. Our employees will have the opportunity to learn more than a job to develop their career.
        </p>

        <div className="p-6 bg-primary/10 rounded-lg mt-8 border border-primary/20">
          <p className="font-medium text-center text-primary-dark">
            PCE IS LOOKING FOR INDIVIDUALS SEEKING TO WORK WITHIN AN INNOVATIVE AND PROGRESSIVE ENVIRONMENT.
          </p>
        </div>
      </div>
    </div>
  )
}
