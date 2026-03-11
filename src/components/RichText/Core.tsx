import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'
import { cn } from '@/utilities/ui'

export type CoreRichTextProps = {
  data: DefaultTypedEditorState
  converters?: JSXConvertersFunction<any>
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function CoreRichText(props: CoreRichTextProps) {
  const { className, enableProse = true, enableGutter = true, converters, ...rest } = props
  return (
    <ConvertRichText
      converters={converters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
