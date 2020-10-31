import { ReactElement, ReactNode } from 'react'
import { IconContext } from 'react-icons'
import { theme } from '@ui-components/themes/main'

interface Props {
    children: ReactNode
    colorOption: 'light' | 'main' | 'dark'
}

export default function IconWrapper({
    colorOption,
    children,
}: Props): ReactElement {
    return (
        <IconContext.Provider
            value={{
                color: theme.palette.primary[colorOption],
            }}
        >
            {children}
        </IconContext.Provider>
    )
}
