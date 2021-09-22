import React, {useState} from 'react'
import rehypeReact, { ComponentProps, ComponentPropsWithNode } from 'rehype-react'
import unified from 'unified'
import { Node } from 'unist'

import { NextLink } from '@components/NextLink'
import { NextImage } from '@components/NextImage'

const WrappedImage = (props: any) => {

  const [isImageOpened, setImageOpened] = useState(false)

  return (
    <div className={isImageOpened ? "post-full-image__expanded" : ''} onClick={() => {setImageOpened(!isImageOpened)}}>
    <NextImage {...props}/>
  </div>
  )
}

/* eslint-disable react/display-name */
const options = {
  createElement: React.createElement,
  Fragment: React.Fragment,
  passNode: true,
  components: {
    Link: (props: ComponentProps) => <NextLink {...(props as ComponentPropsWithNode)} />,
    Image: (props: ComponentProps) => <WrappedImage {...(props as ComponentPropsWithNode)} />,
  },
}

const renderAst = unified().use(rehypeReact, options)

interface RenderContentProps {
  htmlAst: Node | null
}

export const RenderContent = ({ htmlAst }: RenderContentProps) => {
  if (!htmlAst) return null
  return <>{renderAst.stringify(htmlAst)}</>
}

//<div className="post-content load-external-scripts">{renderAst.stringify(htmlAst)}</div>
