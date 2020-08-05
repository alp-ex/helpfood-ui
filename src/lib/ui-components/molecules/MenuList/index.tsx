import React, {
    ReactElement,
    ReactNode,
    CSSProperties,
    MouseEvent,
} from 'react'

interface Props {
    children: ReactNode
    style?: { root?: CSSProperties }
}

interface MenuListProps extends Props {}

interface MenuItemProps extends Props {
    // onMouseDown seems to be executed before onBlur
    onMouseDown: (event: MouseEvent) => void
}

export default function MenuList({
    children,
    style: { root: customRootStyle } = {},
}: MenuListProps): ReactElement {
    return (
        <ul
            style={{
                border: '1px solid black',
                padding: 0,
                ...customRootStyle,
            }}
        >
            {children}
        </ul>
    )
}

MenuList.Item = function MenuItem({
    children,
    style: { root: customRootStyle } = {},
    onMouseDown,
}: MenuItemProps): ReactElement {
    return (
        <li
            onMouseDown={onMouseDown}
            style={{
                listStyle: 'none',
                padding: '1em',
                ...customRootStyle,
            }}
        >
            {children}
        </li>
    )
}
