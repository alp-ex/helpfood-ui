import React, { memo, ReactNode, CSSProperties, useRef, useEffect } from 'react'

interface Props {
    children: ReactNode
    style?: { root?: CSSProperties }
}

export default memo(function ToolBar({
    children,
    style: { root: customRootStyle } = {},
}: Props) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: 'white',
                padding: '1em',
                ...customRootStyle,
            }}
        >
            {children}
        </div>
    )
})
