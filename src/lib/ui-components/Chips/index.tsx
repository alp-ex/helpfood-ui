import React, {
    ReactElement,
    ReactNode,
    CSSProperties,
    MouseEvent,
} from 'react'

interface Props {
    children: ReactNode
    onClose: (event: MouseEvent) => void
    style?: { root?: CSSProperties; closeButton?: CSSProperties }
}

export default function Chips({
    children,
    onClose,
    style: { root: customRootStyle, closeButton: customCloseButtonStyle } = {},
}: Props): ReactElement {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...customRootStyle,
            }}
        >
            {children}

            {/* this might be another ClosableChip component */}
            <button
                onClick={onClose}
                style={{
                    border: '1px solid black',
                    borderRadius: '30px',
                    padding: '1em',
                    fontSize: '1em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...customCloseButtonStyle,
                }}
            >
                X
            </button>
        </div>
    )
}
