/**
 * Canonical service pages for /services/[slug] — used by Payload migrations
 * and seed scripts so production deploys receive the same content.
 */

export type ServicePageSeed = {
  title: string
  slug: string
  short_description: string
  description: string
  paragraphs: [string, string]
  process_steps: { step: string }[]
  benefits: { benefit: string }[]
  cta_text?: string
  cta_link?: string
}

export function lexicalFromParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
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
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

/** All public service detail pages (matches header services dropdown + Demand Draft). */
export const SERVICE_PAGES_SEED: ServicePageSeed[] = [
  {
    title: 'Currency Exchange',
    slug: 'currency-exchange',
    short_description:
      'Buy and sell major currencies at competitive open-market rates across our nationwide branch network.',
    description:
      'Transparent, SBP-aligned currency exchange for travel, business, and everyday foreign exchange needs.',
    paragraphs: [
      'Pakistan Currency Exchange makes buying and selling foreign currency simple and reliable. Whether you are preparing for travel, managing business payments, or exchanging funds for family needs, our counters deal in major currencies including USD, GBP, EUR, SAR, AED and many more—with rates that track the open market so you can plan with confidence.',
      'Every note is authenticated with professional detection equipment, and our teams follow Know Your Customer and anti-money laundering requirements set by the State Bank of Pakistan. Visit any of our branches nationwide for clear pricing, fast settlement, and guidance on documentation before you transact.',
    ],
    process_steps: [
      { step: 'Visit any PCE branch' },
      { step: 'Present original CNIC / ID' },
      { step: 'Confirm rate and complete settlement' },
    ],
    benefits: [
      { benefit: 'Major currency pairs' },
      { benefit: 'Competitive retail spreads' },
      { benefit: 'Professional, compliant desk' },
    ],
  },
  {
    title: 'Western Union',
    slug: 'western-union',
    short_description:
      'Send and receive money worldwide through Western Union at Pakistan Currency Exchange branches.',
    description:
      'A globally trusted remittance network with cash pickup and send options at PCE locations nationwide.',
    paragraphs: [
      'Western Union is one of the world’s most recognised ways to move money across borders. At Pakistan Currency Exchange, you can send or receive Western Union transfers at branches across Pakistan, with staff who walk you through ID checks, reference numbers, and payout steps so funds reach the right person safely.',
      'Families and businesses rely on this network for speed and reach. Bring a valid CNIC and your transaction details (such as MTCN for receive), and our team will complete verification and payout according to Western Union and regulatory requirements—helping you support loved ones or collect remittances with less friction.',
    ],
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
  },
  {
    title: 'MoneyGram',
    slug: 'moneygram',
    short_description:
      'Fast, secure international money transfers through MoneyGram at participating PCE branches.',
    description:
      'Near real-time remittance send and receive powered by MoneyGram’s global network.',
    paragraphs: [
      'MoneyGram helps people send and receive funds internationally with an emphasis on speed and security. Pakistan Currency Exchange brings MoneyGram to our counters so you can complete transfers with trained staff who understand corridor rules, identification requirements, and how to keep your experience straightforward.',
      'Whether you are supporting family abroad or collecting a remittance in Pakistan, we focus on clear communication at every step. Confirm availability at your nearest branch, bring valid ID and the reference your sender provides, and we will process your transaction in line with partner and State Bank of Pakistan compliance standards.',
    ],
    process_steps: [
      { step: 'Choose amount and destination or bring receive reference' },
      { step: 'Complete KYC at the branch' },
      { step: 'Share reference with the beneficiary or collect funds' },
    ],
    benefits: [
      { benefit: 'Broad international reach' },
      { benefit: 'Straightforward branch process' },
      { benefit: 'Helpful staff at every step' },
    ],
  },
  {
    title: 'Ria Money Transfer',
    slug: 'ria-money-transfer',
    short_description:
      'Convenient Ria send and receive options for remittances that matter to your family.',
    description:
      'Global remittance coverage with cash payout support through Pakistan Currency Exchange.',
    paragraphs: [
      'Ria Money Transfer is built around the idea that international remittances connect families and businesses when timing matters. Through Pakistan Currency Exchange, you can access Ria send or receive services subject to corridor availability, with staff ready to explain fees, ID requirements, and payout methods before you commit.',
      'Beneficiaries can collect funds at participating branches with valid identification and the transaction PIN or reference. We keep the desk process efficient while meeting regulatory checks, so your remittance experience stays secure, transparent, and easy to complete.',
    ],
    process_steps: [
      { step: 'Bring ID and transaction details' },
      { step: 'Confirm payout method with staff' },
      { step: 'Complete transfer or pickup' },
    ],
    benefits: [
      { benefit: 'Competitive corridors' },
      { benefit: 'Efficient counter service' },
      { benefit: 'Part of a global receive network' },
    ],
  },
  {
    title: 'IME',
    slug: 'ime',
    short_description:
      'Collect IME remittances at supported Pakistan Currency Exchange branches.',
    description:
      'IME receive services with ID verification and clear guidance at the counter.',
    paragraphs: [
      'IME is a remittance channel many overseas senders use to support family in Pakistan. Where IME receive is enabled, Pakistan Currency Exchange helps beneficiaries complete verification and collect funds with valid CNIC and the reference information provided by the sender.',
      'Availability can vary by branch and corridor, so we recommend confirming locally before you visit. Our teams follow partner rules and applicable regulations so every payout is handled carefully, with clear communication about documents and limits.',
    ],
    process_steps: [
      { step: 'Confirm IME reference / transaction details' },
      { step: 'Visit branch with valid CNIC' },
      { step: 'Complete verification and collect funds' },
    ],
    benefits: [
      { benefit: 'Supported receive options where offered' },
      { benefit: 'Trained branch staff' },
      { benefit: 'Part of a global receive network' },
    ],
  },
  {
    title: 'URemit',
    slug: 'uremit',
    short_description:
      'Receive URemit transfers at participating Pakistan Currency Exchange outlets.',
    description:
      'Licensed-channel remittance collection with a clear, staff-assisted payout process.',
    paragraphs: [
      'URemit helps overseas senders support family through licensed remittance channels. At participating Pakistan Currency Exchange branches, beneficiaries can bring their reference and valid ID so our staff can confirm the transfer and complete collection according to partner and regulatory requirements.',
      'We focus on a calm, step-by-step desk experience: verify details, complete KYC where required, and release funds securely. Ask your nearest branch whether URemit receive is available in your city and what documents you should carry.',
    ],
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
  },
  {
    title: 'Speed Remit',
    slug: 'speed-remit',
    short_description:
      'Fast remittance receive via Speed Remit at eligible Pakistan Currency Exchange branches.',
    description:
      'Efficient international payouts with staff assistance and compliant collection.',
    paragraphs: [
      'Speed Remit is designed for efficient international transfers when families need funds quickly. At eligible Pakistan Currency Exchange locations, you can collect remittances sent through supported Speed Remit channels once you present the PIN or reference and valid identification.',
      'Our counters emphasise a quick yet compliant experience—confirming transaction details, completing required checks, and releasing payouts according to partner policy. Contact your branch to confirm Speed Remit availability and any corridor-specific requirements before you travel.',
    ],
    process_steps: [
      { step: 'Obtain PIN / reference from sender' },
      { step: 'Visit branch with ID' },
      { step: 'Complete KYC and collect' },
    ],
    benefits: [
      { benefit: 'Designed for quick payouts' },
      { benefit: 'Staff-assisted process' },
      { benefit: 'Multiple cities where enabled' },
    ],
  },
  {
    title: 'HelloPaisa',
    slug: 'hellopaisa',
    short_description:
      'HelloPaisa remittance receive services where supported across our network.',
    description:
      'Beneficiary collection for HelloPaisa transfers at select Pakistan Currency Exchange branches.',
    paragraphs: [
      'HelloPaisa remittances can be collected at Pakistan Currency Exchange branches where the product is enabled. Beneficiaries should confirm support locally, then visit with transaction details and a valid CNIC so staff can verify and complete payout according to partner rules.',
      'We prioritise clear communication at the counter—what documents you need, how the reference works, and when funds are ready. This helps HelloPaisa users avoid unnecessary trips and receive remittances securely through a licensed exchange company network.',
    ],
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
  },
  {
    title: 'Aussie Forex & Finance',
    slug: 'aussie-forex-finance',
    short_description:
      'Aussie Forex & Finance–linked remittance and forex options at participating branches.',
    description:
      'Corridor-specific support alongside our core exchange and remittance desk.',
    paragraphs: [
      'Aussie Forex & Finance–linked services may be available at selected Pakistan Currency Exchange branches alongside our standard currency exchange and remittance offering. These options help customers who need corridor-specific support connected to Aussie Forex & Finance products.',
      'Because availability and documentation can differ by city and product, we recommend contacting your nearest outlet before visiting. Our staff will confirm what is offered locally and walk you through ID, sender information, and compliance steps required for a secure transaction.',
    ],
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
  },
  {
    title: 'ARY Exchange',
    slug: 'ary-exchange',
    short_description:
      'Receive ARY Exchange remittances at supported Pakistan Currency Exchange locations.',
    description:
      'Recognised remittance partnership with secure collection and nationwide reach where enabled.',
    paragraphs: [
      'ARY Exchange senders can support beneficiaries in Pakistan through remittance paths available at eligible Pakistan Currency Exchange branches. Collection typically requires valid identification and the transaction reference provided by the sender.',
      'Our network aims to make receive straightforward and secure: confirm your branch offers ARY Exchange, bring the required documents, and let our team complete verification before payout. Ask locally for corridor details, limits, and any additional partner requirements.',
    ],
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
  },
  {
    title: 'Telegraphic Transfer',
    slug: 'telegraphic-transfer',
    short_description:
      'Secure electronic transfers to overseas bank accounts for tuition, invoices, and family support.',
    description:
      'Bank-to-bank SWIFT-style transfers with clear documentation and transparent fee guidance.',
    paragraphs: [
      'Telegraphic Transfer (TT) is a trusted way to send funds directly to an overseas bank account—ideal for education fees, commercial invoices, medical payments, or approved family support. Pakistan Currency Exchange works with correspondent banking partners so your instructions can be processed electronically with traceable settlement.',
      'Limits, purpose codes, and documentation follow State Bank of Pakistan rules. Our staff explain cut-off timings, charges, and the beneficiary details format before you book a transfer, so you know what to expect and can avoid delays caused by incomplete information.',
    ],
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
  },
  {
    title: 'PRI (Pakistan Remittance Initiative)',
    slug: 'pakistan-remittance-initiative',
    short_description:
      'Formal inbound remittance channels aligned with national remittance initiatives.',
    description:
      'Regulated receive paths that support documentation, transparency, and beneficiary protection.',
    paragraphs: [
      'Pakistan Currency Exchange supports formal remittance flows that align with national initiatives encouraging documented inflows and consumer protection. Using authorised channels and licensed partners helps ensure transfers are recorded appropriately and beneficiaries receive funds safely.',
      'Visit any branch to discuss product options—such as cash pickup or account credit where available—and the compliance steps for your corridor. Our teams will guide you through ID requirements and partner procedures so inbound remittances stay transparent and secure.',
    ],
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
  },
  {
    title: 'Demand Draft',
    slug: 'demand-draft',
    short_description:
      'Bank drafts in major currencies for university fees, immigration, and official payments abroad.',
    description:
      'Guaranteed payment instruments issued with clear timelines and branch guidance.',
    paragraphs: [
      'A Demand Draft remains a preferred instrument when universities, immigration authorities, or institutions abroad require a guaranteed bank payment. Pakistan Currency Exchange issues drafts in supported currencies through correspondent relationships, so the receiving party has confidence that the instrument is backed by settled funds.',
      'Bring valid ID and the beneficiary instructions from the institution—name, amount, and currency—and our staff will explain issuance timelines, charges, and how to collect or courier the draft. This offers a practical alternative to long bank queues while keeping the process compliant and well documented.',
    ],
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
  },
]
