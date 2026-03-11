import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

const generateRichText = (title: string, paragraphs: string[]): any => {
  const children: any[] = []
  
  // Add a nice H2 header
  children.push({
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text: `Comprehensive Overview of ${title}`, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })

  // Add all paragraphs
  for (const para of paragraphs) {
    children.push({
      type: 'paragraph',
      children: [{ type: 'text', text: para, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })
  }

  // Add a bulleted list for flavor
  children.push({
    type: 'heading',
    tag: 'h3',
    children: [{ type: 'text', text: 'Why Choose This Service?', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })

  children.push({
    type: 'list',
    listType: 'bullet',
    children: [
      {
        type: 'listitem',
        value: 1,
        children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Industry-leading compliance and security standards mapped to SBP guidelines.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
      {
        type: 'listitem',
        value: 2,
        children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Immediate processing with real-time tracking capabilities.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
      {
        type: 'listitem',
        value: 3,
        children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Highly competitive exchange rates updated constantly against interbank markets.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })

  return {
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

const serviceContentMap: Record<string, string[]> = {
  'currency-exchange': [
    'At Pakistan Currency Exchange, we understand that whether you are traveling for business, embarking on a family vacation, or managing corporate foreign exchange needs, having access to competitive and reliable currency exchange is critical. Our foreign currency exchange service is designed to offer maximum value with minimum hassle.',
    'We deal in all major international currencies including US Dollars (USD), British Pounds (GBP), Euros (EUR), Saudi Riyals (SAR), and UAE Dirhams (AED), among dozens of others. Our rates are continuously updated in real-time to reflect the latest interbank forex market trends, ensuring that you always get the most competitive margin available in the retail market.',
    'Security and compliance are at the forefront of our operations. Every physical currency note is rigorously authenticated using state-of-the-art counterfeit detection machines. Furthermore, our dedicated customer service representatives are trained to facilitate large transactions swiftly while adhering strictly to all KYC (Know Your Customer) and AML (Anti-Money Laundering) regulations instituted by the State Bank of Pakistan.'
  ],
  'telegraphic-transfer': [
    'Our Telegraphic Transfer (TT) service is the optimal solution for customers who need to send large sums of money across borders quickly and securely. Whether you are paying university tuition fees abroad, settling commercial invoices with international suppliers, or transferring funds for medical treatments, our TT service ensures your money reaches its destination without unnecessary delays.',
    'Through our extensive network of global correspondent banks, we facilitate SWIFT transfers to almost any country in the world. Our enterprise-grade financial infrastructure guarantees that every transaction is securely encrypted, tracked, and fully compliant with international banking standards.',
    'We pride ourselves on offering highly competitive remittance exchange rates and transparent fee structures. When you book a TT with us, you are informed upfront of any applicable charges, eliminating any surprise intermediary fees. Our dedicated corporate desk also provides personalized assistance for businesses requiring regular, high-volume foreign transfers.'
  ],
  'demand-draft': [
    'A Demand Draft (DD) remains one of the most trusted and universally accepted instruments for making cross-border payments. It is widely preferred by educational institutions, government bodies, and immigration authorities for application fees and tuition payments due to its guaranteed nature.',
    'Pakistan Currency Exchange offers swift issuance of Demand Drafts in a wide variety of major global currencies. Because the funds are drawn directly from our secure correspondent bank accounts, the receiving party has the peace of mind knowing the draft cannot bounce due to insufficient funds.',
    'Our process is incredibly straightforward. Simply visit any of our 130+ branches nationwide with your original CNIC and the beneficiary details, and our staff will issue the draft over the counter. We also offer highly competitive rates for draft issuance, making it a cost-effective alternative for international payments compared to traditional banking channels.'
  ],
  'inward-remittance': [
    'Receiving money from loved ones working abroad is a lifeline for millions of families in Pakistan. Our Inward Remittance service is specifically designed to make this process as fast, seamless, and accessible as possible. We have partnered with the world\'s leading money transfer operators, including Western Union, MoneyGram, and RIA, to ensure you can receive funds from over 200 countries.',
    'When funds are sent via our international partners, they become available for cash pickup at any of our widespread branch locations within minutes. There are absolutely no receiving fees or hidden deductions for the beneficiary. The amount sent is exactly the amount you receive.',
    'We also understand the importance of convenience and safety. Our branches are strategically located in easily accessible commercial areas and operate with extended hours. All transactions are completely secure, and we ensure the highest levels of privacy and compliance when handling your foreign remittances.'
  ]
}

const defaultContent = [
  'Pakistan Currency Exchange is committed to delivering unparalleled financial services that cater to both individual and corporate needs. Our robust infrastructure and adherence to international best practices ensure that every transaction is processed with the highest level of integrity and efficiency.',
  'We continuously invest in cutting-edge financial technology and staff training to streamline our operations. This allows us to offer services that are not only fast but also highly secure. By maintaining strict compliance with the State Bank of Pakistan\'s regulations, we protect our customers and maintain the integrity of the national financial system.',
  'Our customer-centric approach means we are always looking for ways to add value. From offering the most competitive exchange rates in the market to expanding our branch network for greater accessibility, every decision we make is aimed at enhancing your experience with us.'
]

async function run() {
  const payload = await getPayload({ config })
  
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })

  for (const doc of services.docs) {
    const paragraphs = serviceContentMap[doc.slug] || defaultContent
    const richText = generateRichText(doc.title, paragraphs)

    try {
        await payload.update({
        collection: 'services',
        id: doc.id,
        req: { context: { disableRevalidate: true } } as any,
        data: {
            content: richText
        }
        })
        console.log(`Updated service content: ${doc.slug}`)
    } catch (e) {
        console.error(`Failed to update service ${doc.slug}:`, e)
    }
  }
}

run().catch(console.error).then(() => process.exit(0))
