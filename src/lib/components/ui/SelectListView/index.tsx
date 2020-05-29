import React, { memo, ReactNode, CSSProperties, MouseEvent } from 'react'

interface Props {
    onOptionClick: (event: MouseEvent, { optionId: string }) => void
    onOptionMouseOver?: (event: MouseEvent, { optionId: string }) => void
    onMouseUp?: () => void
    selectedIndex: string
    options: ReadonlyArray<{ render: () => ReactNode | null; id: string }>
    style?: { root?: CSSProperties; option?: CSSProperties }
}

export default memo(function SelectListView({
    selectedIndex,
    onOptionClick,
    onOptionMouseOver,
    onMouseUp,
    options,
    style: { root: customRootStyle, option: customOptionStyle } = {},
}: Props) {
    return (
        <ul onMouseUp={onMouseUp} style={customRootStyle}>
            {options.map(({ render, id }) => (
                <li
                    onMouseOver={(event) => {
                        if (onOptionMouseOver) {
                            onOptionMouseOver(event, { optionId: id })
                        }
                    }}
                    onClick={(event) => onOptionClick(event, { optionId: id })}
                    style={{
                        cursor: 'pointer',
                        fontWeight: selectedIndex === id ? 'bold' : 'inherit',
                        listStyle: 'none',
                        fontSize: selectedIndex === id ? '2em' : '1.5em',
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
