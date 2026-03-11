import { getPayload } from 'payload'
import config from './src/payload.config'

const contentMap = {
  about: {
    title: 'Company Profile',
    text: [
      'Pakistan Currency Exchange (Pvt) dates back to 1992, but the idea of having a physical platform was rooted on June 20, 2003, following the company’s ordinance 1984, just after the Exchange Companies Reforms passed. All the services we offer under the name of PCE are well-worded with the State Bank of Pakistan.',
      'Be it safety and security or reliability of all sorts of money transfers including remittance, PCE leaves no-stone unturned in providing utmost satisfaction across all the phases of customer engagement.',
      'We totally understand that sending and receiving money is more of an emotional exchange between loved ones than just transferring bucks; that is why we call your convenience, our asset. Here at PCE, you don\'t need to wait for hours in queues with tension on your face, rather you will feel relaxed and satisfied; you can thanks to our minimalistic requirements later.',
      'PCE expansionary strategy has reached 130 locations, improving our brand visibility, exceeding consumer feasibilities, and helping us to build a successful brand image.'
    ]
  },
  'mission-vision': {
    title: 'Mission & Vision',
    text: [
      'Our Mission is to provide secure, reliable, and swift currency exchange and remittance services to every citizen of Pakistan, ensuring technological excellence and regulatory compliance.',
      'Our Vision is to be the leading exchange company in Pakistan, known for trust, widespread accessibility, and unparalleled customer service in the financial sector.'
    ]
  },
  careers: {
    title: 'Careers at PCE',
    text: [
      'Join Pakistan Currency Exchange and be part of a dynamic and growing financial institution.',
      'We are always looking for talented, driven individuals who are passionate about customer service, compliance, and financial technology. If you are looking to build a robust career in the exchange and remittance sector, explore our current openings or drop your resume.',
      'Current Openings: Branch Manager, Customer Service Representative, Compliance Officer.'
    ]
  },
  news: {
    title: 'Latest News',
    text: [
      'Stay updated with the latest happenings at Pakistan Currency Exchange.',
      'We continuously expand our branch network and introduce innovative financial solutions to serve you better. Check back regularly for updates, press releases, and announcements regarding our services and regulatory updates from the State Bank of Pakistan.'
    ]
  },
  blog: {
    title: 'Financial Blog',
    text: [
      'Read expert insights on currency trends, remittance tips, and financial planning.',
      'Our blog covers a wide range of topics to help you make informed decisions when sending money abroad or exchanging foreign currency. Learn about exchange rate fluctuations, the safest ways to remit money, and how to maximize your transfers.'
    ]
  },
  'partners-associates': {
    title: 'Partners & Associates',
    text: [
      'We collaborate with world-renowned financial institutions to bring you the best services.',
      'Our trusted partners include Western Union, MoneyGram, RIA, and major local banks. These strategic alliances allow us to offer secure, real-time demand drafts, telegraphic transfers, and instant cash pickups globally.'
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    text: [
      'At Pakistan Currency Exchange, your privacy and data security are our top priorities.',
      'We strictly adhere to the guidelines set forth by the State Bank of Pakistan regarding customer data protection. All personal information collected during currency exchange or remittance transactions is encrypted and used solely for compliance and service delivery purposes.'
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    text: [
      'By using the services of Pakistan Currency Exchange, you agree to comply with our terms and the regulations of the State Bank of Pakistan.',
      'Customers must provide valid identification (CNIC/Passport) for transactions above the threshold limit. Exchange rates are subject to market fluctuations and are locked only at the time of transaction execution.'
    ]
  },
  gallery: {
    title: 'Media Gallery',
    text: [
      'Explore our nationwide branch network and corporate events.',
      'View photos from our branch inaugurations, corporate training sessions, and awards ceremonies. PCE prides itself on a professional and welcoming environment across all 130+ locations.'
    ]
  },
  'complaints-feedback': {
    title: 'Complaints & Feedback',
    text: [
      'We value your feedback to help us serve you better.',
      'If you have any complaints, suggestions, or feedback regarding our services or branch staff, please reach out to our dedicated support team. You can call our Toll-Free number 0800-13537 or email us at info@pakistancurrency.com.'
    ]
  }
}

async function run() {
  const payload = await getPayload({ config })
  
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  for (const doc of pages.docs) {
    const content = contentMap[doc.slug]
    if (!content) continue

    const children = [
      {
        type: 'heading',
        tag: 'h1',
        children: [{ type: 'text', text: content.title, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    ]

    for (const paragraph of content.text) {
      children.push({
        type: 'paragraph',
        children: [{ type: 'text', text: paragraph, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
    }

    try {
        await payload.update({
        collection: 'pages',
        id: doc.id,
        req: { context: { disableRevalidate: true } } as any,
        data: {
            title: content.title,
            layout: [
            {
                blockType: 'content',
                columns: [
                {
                    size: 'full',
                    richText: {
                    root: {
                        type: 'root',
                        children,
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    }
                    }
                }
                ]
            }
            ]
        }
        })
        console.log(`Updated page: ${doc.slug}`)
    } catch (e) {
        console.error(`Failed to update page ${doc.slug}:`, e)
    }
  }
}

run().catch(console.error).then(() => process.exit(0))
