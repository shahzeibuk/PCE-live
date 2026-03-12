import React from 'react'
import { cn } from '@/utilities/ui'

export type CoreRichTextProps = {
  data: any
  converters?: any
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function CoreRichText(props: CoreRichTextProps) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props

  if (!data || !data.root || !data.root.children) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    switch (node.type) {
      case 'root':
        return node.children?.map(renderNode)
      case 'paragraph':
        return (
          <p key={index} className={cn(node.format)}>
            {node.children?.map(renderNode)}
          </p>
        )
      case 'text':
        let content: React.ReactNode = node.text
        if (node.format & 1) content = <strong key={`b-${index}`}>{content}</strong>
        if (node.format & 2) content = <em key={`i-${index}`}>{content}</em>
        if (node.format & 4) content = <span key={`s-${index}`} className="underline">{content}</span>
        return content
      case 'heading':
        const Tag = node.tag as keyof React.JSX.IntrinsicElements
        return (
          <Tag key={index} className={cn(node.format)}>
            {node.children?.map(renderNode)}
          </Tag>
        )
      case 'list':
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <ListTag key={index} className={cn(node.format, 'list-inside')}>
            {node.children?.map(renderNode)}
          </ListTag>
        )
      case 'listitem':
        return (
          <li key={index}>
            {node.children?.map(renderNode)}
          </li>
        )
      case 'block':
        // Handle blocks if needed, but for debug we skip
        return null
      default:
        if (node.children) {
          return <div key={index}>{node.children.map(renderNode)}</div>
        }
        return null
    }
  }

  return (
    <div
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
    >
      {renderNode(data.root, 0)}
    </div>
  )
}
