import React, {
    ReactElement,
    ReactNode,
    CSSProperties,
    MouseEvent,
} from 'react'

interface Props {
    children: ReactNode
    onClose?: (event: MouseEvent) => void
    style?: { root?: CSSProperties; closeButton?: CSSProperties }
}

interface ListProps {
    children: ReactNode
    style?: { root?: CSSProperties }
}

const List = function List({
    children,
    style: { root: customRootStyle } = {},
}: ListProps): ReactElement {
    return (
        <ul
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '0.5em',
                ...customRootStyle,
            }}
        >
            {children}
        </ul>
    )
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
                border: '1px solid black',
                borderRadius: '30px',
                padding: '0.7em',
                margin: '0.5em',
                fontSize: '1em',
                width: 'fit-content',
                ...customRootStyle,
            }}
        >
            {children}

            {onClose ? (
                <button
                    onClick={onClose}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        marginLeft: '0.5em',
                        cursor: 'pointer',
                        ...customCloseButtonStyle,
                    }}
                >
                    X
                </button>
            ) : null}
        </div>
    )
}

Chips.List = List
