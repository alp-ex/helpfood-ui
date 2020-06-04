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
                top: '0px',
                left: '0px',
                height: '100vh',
                width: '100vw',
                margin: 0,
                background: 'white',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0',
            }}
        >
            {children}
        </Component>
    )
}
