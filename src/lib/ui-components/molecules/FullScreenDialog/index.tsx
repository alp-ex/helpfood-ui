import React, { ReactElement, ReactNode, ElementType } from 'react'

interface Props {
    component?: ElementType
    children: ReactNode
}

export default function FullScreenDialog({
    component: Component = 'div',
    children,
}: Props): ReactElement {
    return (
        <Component
            style={{
                position: 'fixed',
                width: '100vw',
                background: 'white',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                padding: '1em',
                boxSizing: 'border-box',
                height: '100vh',
            }}
        >
            {children}
        </Component>
    )
}
