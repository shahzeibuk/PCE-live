/**
 * Curated marketing copy aligned with https://www.pakistancurrency.com/
 * (products, testimonials). Used by migration / seed scripts — not fetched at runtime.
 */

export function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export type LegacyServiceSeed = {
  title: string
  slug: string
  short_description: string
  description: string
  process_steps: { step: string }[]
  benefits: { benefit: string }[]
  body: string
}

/** “Our Product” section — parity with legacy public site. */
export const LEGACY_SERVICES: LegacyServiceSeed[] = [
  {
    title: 'Western Union',
    slug: 'western-union',
    short_description:
      'Receive and send money online with one of the most reliable transfer networks.',
    description:
      'An easy way to receive and send money to your loved ones online with a globally trusted transfer company.',
    process_steps: [
      { step: 'Visit a PCE branch with valid ID' },
      { step: 'Provide sender/receiver details or MTCN' },
      { step: 'Collect or send funds securely' },
    ],
    benefits: [
      { benefit: 'Worldwide payout locations' },
      { benefit: 'Fast cash pickup' },
      { benefit: 'Licensed agent support' },
    ],
    body: 'Western Union offers a simple way to receive and send money to family and friends through Pakistan Currency Exchange branches nationwide.',
  },
  {
    title: 'MoneyGram',
    slug: 'moneygram',
    short_description: 'Send money globally with a provider known for reliability and speed.',
    description:
      'Save time by sending money worldwide with a well-known transfer company built for dependable, near real-time transfers.',
    process_steps: [
      { step: 'Choose amount and destination' },
      { step: 'Complete KYC at the branch' },
      { step: 'Share reference with the beneficiary' },
    ],
    benefits: [
      { benefit: 'Broad international reach' },
      { benefit: 'Straightforward branch process' },
      { benefit: 'Helpful staff at every step' },
    ],
    body: 'MoneyGram helps you move funds internationally quickly while our staff ensures a smooth experience at the counter.',
  },
  {
    title: 'RIA Money Transfer',
    slug: 'ria-money-transfer',
    short_description: 'Send or receive funds when it matters—supported round the clock by our network.',
    description:
      'Transfer money conveniently whenever you need it, with fast fund-receiving options from around the world.',
    process_steps: [
      { step: 'Bring ID and transaction details' },
      { step: 'Confirm payout method' },
      { step: 'Complete transfer or pickup' },
    ],
    benefits: [
      { benefit: 'Competitive corridors' },
      { benefit: 'Efficient counter service' },
      { benefit: 'Part of global receive network' },
    ],
    body: 'RIA focuses on quick fund-receiving solutions globally; Pakistan Currency Exchange brings that access to our branches.',
  },
  {
    title: 'Currency Exchange',
    slug: 'currency-exchange',
    short_description: 'Buy and sell major currencies at competitive open-market rates.',
    description:
      'Our nationwide branch network is built to deliver dependable currency exchange with transparent pricing.',
    process_steps: [
      { step: 'Visit any PCE branch' },
      { step: 'Present original CNIC / ID' },
      { step: 'Lock rate and complete settlement' },
    ],
    benefits: [
      { benefit: 'Major currency pairs' },
      { benefit: 'Competitive retail spreads' },
      { benefit: 'Professional, compliant desk' },
    ],
    body: 'We buy and sell foreign currency for travelers, families, and businesses—with rates aligned to market movement and SBP-compliant processes.',
  },
  {
    title: 'Telegraphic Transfer',
    slug: 'telegraphic-transfer',
    short_description: 'Secure electronic transfers to overseas bank accounts.',
    description:
      'A trusted way to send tuition, rent, invoices, or family support straight to a bank account abroad.',
    process_steps: [
      { step: 'Share beneficiary bank details' },
      { step: 'Fund the transfer at branch' },
      { step: 'Track SWIFT / credit confirmation' },
    ],
    benefits: [
      { benefit: 'Suitable for larger amounts' },
      { benefit: 'Correspondent banking partners' },
      { benefit: 'Clear fee disclosure' },
    ],
    body: 'Telegraphic transfers move funds electronically to overseas accounts—ideal when you need bank-to-bank settlement with full documentation.',
  },
  {
    title: 'Demand Draft',
    slug: 'demand-draft',
    short_description: 'Bank drafts for university fees, immigration, and official payments abroad.',
    description:
      'Avoid repeated bank queues—issue a demand draft in major currencies for institutions that require guaranteed instruments.',
    process_steps: [
      { step: 'Provide beneficiary and amount' },
      { step: 'Settle PKR / FX requirement' },
      { step: 'Receive draft for courier or submission' },
    ],
    benefits: [
      { benefit: 'Accepted by many institutions' },
      { benefit: 'Issue across key currencies' },
      { benefit: 'Guidance from branch staff' },
    ],
    body: 'Demand drafts remain a preferred payment method for many foreign universities and authorities; we issue drafts with clear timelines and support.',
  },
  {
    title: 'Pakistan Remittance Initiative',
    slug: 'pakistan-remittance-initiative',
    short_description: 'Formal inbound remittance channels promoted under national initiatives.',
    description:
      'Receive overseas remittances through regulated channels that support documentation, transparency, and beneficiary protection.',
    process_steps: [
      { step: 'Confirm corridor and partner' },
      { step: 'Provide valid ID for payout' },
      { step: 'Collect proceeds per policy' },
    ],
    benefits: [
      { benefit: 'Regulated receive path' },
      { benefit: 'Works with licensed operators' },
      { benefit: 'Nationwide branch access' },
    ],
    body: 'We support compliant remittance flows benefiting Pakistani families and align desk procedures with applicable rules and partner requirements.',
  },
  {
    title: 'IME',
    slug: 'ime',
    short_description: 'Receive international remittances through IME-supported corridors at select branches.',
    description:
      'Pakistan Currency Exchange facilitates IME remittance payouts where available, with ID verification and customer guidance at the counter.',
    process_steps: [
      { step: 'Confirm IME reference / transaction details' },
      { step: 'Visit branch with valid CNIC' },
      { step: 'Complete verification and collect funds' },
    ],
    benefits: [
      { benefit: 'Supported receive options where offered' },
      { benefit: 'Trained branch staff' },
      { benefit: 'Part of global receive network' },
    ],
    body: 'IME is a remittance channel many families rely on. Visit your nearest Pakistan Currency Exchange branch for availability, limits, and required documents.',
  },
  {
    title: 'URemit',
    slug: 'uremit',
    short_description: 'Collect remittances sent via URemit through participating PCE outlets.',
    description:
      'We help beneficiaries receive funds sent through URemit subject to partner availability and regulatory requirements.',
    process_steps: [
      { step: 'Bring reference and valid ID' },
      { step: 'Confirm payout with staff' },
      { step: 'Sign off and receive cash or credit as applicable' },
    ],
    benefits: [
      { benefit: 'Convenient branch access' },
      { benefit: 'Clear process at the desk' },
      { benefit: 'Nationwide presence where offered' },
    ],
    body: 'URemit senders can support family in Pakistan through licensed channels; beneficiaries can inquire at Pakistan Currency Exchange for supported services.',
  },
  {
    title: 'Speed Remit',
    slug: 'speed-remit',
    short_description: 'Fast remittance receive options via Speed Remit at eligible branches.',
    description:
      'Speed Remit focuses on efficient transfers; PCE branches assist with compliant collection and customer support.',
    process_steps: [
      { step: 'Obtain PIN / reference from sender' },
      { step: 'Visit branch with ID' },
      { step: 'Complete KYC and collect' },
    ],
    benefits: [
      { benefit: 'Designed for quick payouts' },
      { benefit: 'Staff-assisted process' },
      { benefit: 'Multiple cities' },
    ],
    body: 'Ask at your branch whether Speed Remit receive is available and what documents you need for your transaction.',
  },
  {
    title: 'HelloPaisa',
    slug: 'hellopaisa',
    short_description: 'HelloPaisa remittance receive services where supported at our network.',
    description:
      'Pakistan Currency Exchange may offer HelloPaisa beneficiary services at select locations—confirm with your branch.',
    process_steps: [
      { step: 'Check branch support for HelloPaisa' },
      { step: 'Bring transaction details and ID' },
      { step: 'Complete payout per policy' },
    ],
    benefits: [
      { benefit: 'Focused receive experience' },
      { benefit: 'Guidance on requirements' },
      { benefit: 'Trusted counter service' },
    ],
    body: 'HelloPaisa users can visit Pakistan Currency Exchange branches that support the product for collection and assistance.',
  },
  {
    title: 'Aussie Forex & Finance',
    slug: 'aussie-forex-finance',
    short_description: 'Remittance and forex solutions linked to Aussie Forex & Finance where offered.',
    description:
      'We support applicable Aussie Forex & Finance-linked services at participating branches alongside our core exchange and remittance desk.',
    process_steps: [
      { step: 'Confirm product availability locally' },
      { step: 'Provide sender information and ID' },
      { step: 'Complete transaction with staff' },
    ],
    benefits: [
      { benefit: 'Corridor-specific support' },
      { benefit: 'Professional handling' },
      { benefit: 'Aligned with compliance' },
    ],
    body: 'Contact us or your nearest branch to learn which Aussie Forex & Finance services are available in your city.',
  },
  {
    title: 'ARY Exchange',
    slug: 'ary-exchange',
    short_description: 'ARY Exchange remittance services through supported Pakistan Currency Exchange locations.',
    description:
      'Beneficiaries may receive ARY Exchange remittances at eligible PCE branches with valid identification and transaction details.',
    process_steps: [
      { step: 'Verify branch offers ARY Exchange' },
      { step: 'Present ID and reference' },
      { step: 'Collect proceeds securely' },
    ],
    benefits: [
      { benefit: 'Recognised brand partnership' },
      { benefit: 'Nationwide reach where enabled' },
      { benefit: 'Customer-first service' },
    ],
    body: 'ARY Exchange senders can rely on Pakistan Currency Exchange for supported receive paths—our staff will confirm steps at the branch.',
  },
]

export const LEGACY_TESTIMONIALS = [
  {
    name: 'Mr. Ali Baig',
    position: 'Customer',
    testimonial:
      'I am extremely impressed with the services they have — I find it really quick and easy whether you have a bank account or not.',
  },
  {
    name: 'Mr. Urooj',
    position: 'Customer',
    testimonial:
      "Now it's easy to transfer money to my family because it's online and I don't need to step out to get it done. It saves time also.",
  },
  {
    name: 'Mr. Zaid',
    position: 'Customer',
    testimonial:
      'Whenever I plan vacations abroad I make sure to get the currency exchanged through PCE because they offer better prices than many market options.',
  },
  {
    name: 'Mr. Mohsin',
    position: 'Customer',
    testimonial:
      'What more could you ask for when you can receive money faster and easier than ever — it makes my regular transfers efficient.',
  },
]
