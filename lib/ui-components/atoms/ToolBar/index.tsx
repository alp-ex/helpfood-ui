import React, {
    memo,
    ReactNode,
    CSSProperties,
    useRef,
    useEffect,
    ElementType,
} from 'react'

interface Props {
    component?: ElementType
    children: ReactNode
    style?: { root?: CSSProperties }
}

export default memo(function ToolBar({
    component: Component = 'div',
    children,
    style: { root: customRootStyle } = {},
}: Props) {
    return (
        <Component
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: 'white',
                padding: '1em',
                ...customRootStyle,
            }}
        >
            {children}
        </Component>
    )
})
