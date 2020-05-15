import React, { CSSProperties, ReactNode, MouseEvent } from 'react'

interface Props {
    variant?: 'primary' | 'secondary' | null
    children: ReactNode
    onClick: (event: MouseEvent) => void
    style?: CSSProperties
}

const variantStyles = new Map([
    [
        'primary',
        {
            background: 'red',
            color: '#fff5b2',
            border: '1px red solid',
            fontFamily: 'Josefin Slab',
            cursor: 'pointer',
            margin: '1em',
            padding: '0.5em',
            fontSize: '1.5em',
            borderRadius: '5px',
        },
    ],
    [
        'secondary',
        {
            background: 'transparent',
            color: 'red',
            border: '1px red solid',
            fontFamily: 'Josefin Slab',
            cursor: 'pointer',
            margin: '1em',
            padding: '0.5em',
            fontSize: '1.5em',
            borderRadius: '5px',
        },
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
