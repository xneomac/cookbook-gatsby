import React from 'react'
import {
  Chip,
  ChipProps,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core'

interface Props extends Omit<ChipProps, 'label' | 'variant'> {
  name: string
  selected?: boolean
}

export default function Tag({ name, selected, ...props }: Props) {
  return (
    <Chip
      variant={selected ? 'default' : 'outlined'}
      color="primary"
      label={name}
      {...props}
    />
  )
}
