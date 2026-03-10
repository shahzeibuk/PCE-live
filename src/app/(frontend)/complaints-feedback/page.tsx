'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

export default function ComplaintsFeedbackPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API/Payload endpoint
    setIsSubmitted(true)
  }

  return (
    <div className="container py-16 md:py-24 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#0a8258]">Complaints & Feedback</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#0a8258]">We Value Your Opinion</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Pakistan Currency Exchange prioritizes your suggestions and feedbacks. We welcome all responses coming from you to guide ourselves to continue providing the best services. We value your opinion and assure instant response from our Customer Representatives.
            </p>
          </div>

          <div className="bg-white dark:bg-card p-8 rounded-xl shadow-sm border border-border">
            {isSubmitted ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-primary mb-4">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300">Your feedback has been submitted successfully to our customer representatives.</p>
                <Button onClick={() => setIsSubmitted(false)} className="mt-6 bg-[#80E143] text-primary-foreground hover:bg-[#80E143]/90">
                  Submit Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="enquiryType">Enquiry Type *</Label>
                  <Select required>
                    <SelectTrigger id="enquiryType">
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product_inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="staff_behavior">Staff Behavior</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="callback_inquiry">Callback Inquiry</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Karachi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" required placeholder="+92 300 1234567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments *</Label>
                  <Textarea id="comments" required rows={5} placeholder="Please provide details..." />
                </div>

                <Button type="submit" className="w-full bg-[#80E143] text-primary-foreground hover:bg-[#80E143]/90">
                  Submit Feedback
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-card/50 p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-3 uppercase tracking-wide">Technical Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 uppercase leading-relaxed">
              VISIT PAKISTAN CURRENCY EXCHANGE SUPPORT SITE FOR QUICK ANSWERS, PRODUCT TUTORIALS, SELF-HELP GUIDES, MANUALS, AND IN-DEPTH TECHNICAL ARTICLES.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/contact">Visit Support</Link>
            </Button>
          </div>

          <div className="bg-[#0a8258] text-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-3 uppercase tracking-wide">Careers</h3>
            <p className="text-sm opacity-90 mb-4 uppercase leading-relaxed line-clamp-6">
              IMAGINE A WORK ENVIRONMENT THAT VALUES TECHNOLOGICAL INNOVATION, RESPECTS INTEGRITY AND STIMULATES ENTHUSIASM. A PLACE WHERE YOU GET A CHANCE TO DO GREAT WORK AND COLLABORATE ALONGSIDE SOME OF THE BRIGHTEST PEOPLE YOU HAVE EVER MET!
            </p>
            <Button variant="secondary" className="w-full text-[#0a8258]" asChild>
              <Link href="/careers">View Openings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
