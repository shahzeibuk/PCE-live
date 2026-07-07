import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { LiveExchangeRatesBlock } from '@/blocks/LiveExchangeRates/Component'
import { CurrencyConverterBlock } from '@/blocks/CurrencyConverter/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { WhatsAppCTABlock } from '@/blocks/WhatsAppCTA/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  liveExchangeRates: LiveExchangeRatesBlock,
  currencyConverter: CurrencyConverterBlock,
  servicesGrid: ServicesGridBlock,
  whatsappCTA: WhatsAppCTABlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  pageSlug?: string
}> = (props) => {
  const { blocks, pageSlug } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const blockProps =
                blockType === 'servicesGrid' && pageSlug === 'about'
                  ? { ...block, disableInnerContainer: true, iconSize: 'large' as const }
                  : { ...block, disableInnerContainer: true }

              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...blockProps} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
