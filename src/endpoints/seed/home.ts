import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'mediumImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: "Check Today's Rates",
            url: '#rates',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'WhatsApp for Best Rate',
            url: 'https://wa.me/920000000000',
          },
        },
      ],
      media: heroImage.id,
      richText: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'heading',
              tag: 'h1',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                { type: 'text', text: "Today's Live Currency ", version: 1 },
                { type: 'text', text: 'Exchange Rates ', version: 1, style: 'color: #099546' },
                { type: 'text', text: 'in Pakistan', version: 1 },
              ],
            },
            {
              type: 'paragraph',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Check the latest USD, SAR, AED and EUR rates in the open market.',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
    },
    layout: [
      {
        blockType: 'liveExchangeRates',
        title: 'Live Exchange Rates',
      },
      {
        blockType: 'currencyConverter',
        title: 'Currency Converter',
      },
      {
        blockType: 'servicesGrid',
        title: 'Our Services',
      },
      {
        blockType: 'archive',
        relationTo: 'news',
        limit: 3,
        populateBy: 'collection',
        introContent: {
          root: {
            type: 'root',
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'heading',
                tag: 'h2',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                children: [{ type: 'text', text: 'Daily Currency Updates', version: 1 }],
              },
            ],
          },
        },
      },
      {
        blockType: 'whatsappCTA',
        title: 'Contact Us on WhatsApp',
        body: 'Need the Best Exchange Rates? Chat with us on WhatsApp for instant updates!',
        buttonText: 'WhatsApp Now',
        phoneNumber: '+920000000000',
      },
    ],
    meta: {
      description: 'Pakistan Currency Exchange - Live rates and tools.',
      image: heroImage.id,
      title: 'Pakistan Currency | Home',
    },
    title: 'Home',
  }
}
