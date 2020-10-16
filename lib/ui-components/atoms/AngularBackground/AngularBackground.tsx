import React, { ReactElement, ReactNode } from 'react'
import { Box } from '@material-ui/core'
import { theme } from '@ui-components/themes/main'

interface Props {
    bgcolorOption: 'light' | 'main'
    children: ReactNode
}

export default function AngularBackground({
    bgcolorOption,
    children,
}: Props): ReactElement {
    return (
        <Box
            color={
                theme.palette.primary[
                    bgcolorOption === 'light' ? 'main' : 'light'
                ]
            }
            bgcolor={theme.palette.primary[bgcolorOption]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontSize="1.5em"
            padding="0.5em"
        >
            {children}
        </Box>
    )
}
