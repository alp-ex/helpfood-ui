import React, { memo, ReactNode, CSSProperties } from 'react'

interface Props {
    selectedIndex: string
    options: ReadonlyArray<{ render: () => ReactNode | null; id: string }>
    style?: { root?: CSSProperties; option?: CSSProperties }
}

export default memo(function SelectListView({
    selectedIndex,
    options,
    style: { root: customRootStyle, option: customOptionStyle } = {},
}: Props) {
    return (
        <ul style={{ ...customRootStyle }}>
            {options.map(({ render, id }) => (
                <li
                    style={{
                        fontWeight: selectedIndex === id ? 'bold' : 'inherit',
                        listStyle: 'none',
                        ...customOptionStyle,
                    }}
                    key={id}
                >
                    {render()}
                </li>
            ))}
        </ul>
    )
})
