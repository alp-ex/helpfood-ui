import React, { CSSProperties, ReactNode, MouseEvent } from 'react'

interface Props {
    variant?: 'primary' | 'secondary' | null
    children: ReactNode
    onClick: (event: MouseEvent) => void
    style?: CSSProperties
}

const variantStyles = new Map([
    ['primary', { background: 'red', color: 'yellow' }],
    [
        'secondary',
        { background: 'transparent', color: 'red', border: '1px red solid' },
    ],
])

const Button = ({
    variant = null,
    children,
    onClick,
    style: customRootStyle,
}: Props) => {
    return (
        <button
            onClick={onClick}
            style={{
                ...variantStyles.get(variant),
                ...customRootStyle,
            }}
        >
            {children}
        </button>
    )
}

export default Button
