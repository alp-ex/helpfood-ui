import React, {
    ReactElement,
    ReactNode,
    MouseEvent,
    TouchEvent,
    CSSProperties,
} from 'react'

interface Props {
    children: ReactNode
    noBorders?: boolean
    onClick?: (event: MouseEvent) => void
    onMouseDown?: (event: MouseEvent) => void
    onTouchStart?: (event: TouchEvent) => void
    onTouchEnd?: (event: TouchEvent) => void
    onTouchMove?: (event: TouchEvent) => void
    style?: { root?: CSSProperties }
}

export default function Button({
    children,
    onClick,
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    noBorders = false,
    style: { root: customRootStyle } = {},
}: Props): ReactElement {
    return (
        <button
            style={{
                cursor: 'pointer',
                background: 'white',
                borderRadius: '0',
                border: noBorders ? 'none' : '1px black solid',
                padding: '1em',
                fontSize: '1em',
                ...customRootStyle,
            }}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
        >
            {children}
        </button>
    )
}
