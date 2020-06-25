import React, { ReactElement, ReactNode, MouseEvent, TouchEvent } from 'react'

interface Props {
    children: ReactNode
    noBorders?: boolean
    onClick?: (event: MouseEvent) => void
    onMouseDown?: (event: MouseEvent) => void
    onTouchStart?: (event: TouchEvent) => void
    onTouchEnd?: (event: TouchEvent) => void
    onTouchMove?: (event: TouchEvent) => void
}

export default function Button({
    children,
    onClick,
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    noBorders = false,
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
