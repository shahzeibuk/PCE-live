import type { Block } from 'payload'

export const WhatsAppCTA: Block = {
  slug: 'whatsappCTA',
  interfaceName: 'WhatsAppCTABlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contact Us on WhatsApp',
    },
    {
      name: 'body',
      type: 'textarea',
      defaultValue: 'Need the Best Exchange Rates? Chat with us on WhatsApp for less instant updates!',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'WhatsApp Now',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      defaultValue: '+920000000000',
    },
  ],
}
