import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React from 'react'
import CoreRichText from './Core'

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  return <CoreRichText {...props} />
}
