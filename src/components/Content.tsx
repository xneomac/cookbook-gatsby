import React, { ReactNode } from 'react'
import { Typography } from '@material-ui/core'

export const HTMLContent = ({ content }: { content: string }) => (
  <Typography dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content }: { content: ReactNode }) => (
  <Typography>{content}</Typography>
)

export default Content
