import { ReactElement, ReactNode, ElementType, CSSProperties } from 'react'

interface Props {
    component?: ElementType
    children: ReactNode
    style?: { root?: CSSProperties }
}

export default function FullScreenDialog({
    component: Component = 'div',
    children,
    style: { root: customRootStyle } = {},
}: Props): ReactElement {
    return (
        <Component
            style={{
                overflow: 'auto',
                position: 'fixed',
                width: '100vw',
                background: 'white',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '1em',
                boxSizing: 'border-box',
                height: '100vh',
                top: 0,
                ...customRootStyle,
            }}
        >
            {children}
        </Component>
    )
}
