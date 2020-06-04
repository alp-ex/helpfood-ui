import React, {
    ReactElement,
    ReactNode,
    CSSProperties,
    ElementType,
} from 'react'

interface Props {
    children: ReactNode
    style?: { root?: CSSProperties }
    component?: ElementType
}

export default function Label({
    style: { root: customRootStyle } = {},
    children,
    component: Component = 'span',
}: Props): ReactElement {
    return (
        <Component
            style={{
                margin: '1em',
                fontSize: '1em',
                fontFamily: 'Josefin Slab',
                ...customRootStyle,
            }}
        >
            {children}
        </Component>
    )
}
