import { ReactElement, ReactNode } from 'react'
import { Box } from '@material-ui/core'
import { theme } from 'ui-components/themes/main'

interface Props {
    bgcolorOption: 'light' | 'main'
    children: ReactNode
}

export default function RoundedBackground({
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
            borderRadius="0.8em"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            fontSize="1em"
            padding="0.5em"
        >
            {children}
        </Box>
    )
}
