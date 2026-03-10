import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground">Have questions? We're here to help.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Main Office</h3>
            <p className="text-muted-foreground">
              [Head Office Address]<br />
              Karachi, Pakistan
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
            <div className="space-y-2">
              <p><strong>Phone:</strong> +92 21 111 XXX XXX</p>
              <p><strong>Email:</strong> info@pakistancurrency.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Hours of Operation</h3>
            <p className="text-muted-foreground">
              Monday - Saturday: 9:00 AM - 6:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input id="phone" placeholder="+92 3XX XXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
