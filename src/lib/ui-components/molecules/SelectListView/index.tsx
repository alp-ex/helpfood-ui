import React, { memo, ReactNode, CSSProperties, MouseEvent } from 'react'

interface Props {
    onOptionClick: (event: MouseEvent, { optionId: string }) => void
    onOptionMouseOver?: (event: MouseEvent, { optionId: string }) => void
    onMouseUp?: () => void
    selectedId: string
    options: ReadonlyArray<{ render: () => ReactNode | null; id: string }>
    style?: { root?: CSSProperties; option?: CSSProperties }
}

export default memo(function SelectListView({
    selectedId,
    onOptionClick,
    onOptionMouseOver,
    onMouseUp,
    options,
    style: { root: customRootStyle, option: customOptionStyle } = {},
}: Props) {
    console.log(selectedId, 'cacouuuuune')
    return (
        <ul onMouseUp={onMouseUp} style={customRootStyle}>
            {options.map(({ render, id }) => (
                <li
                    onMouseOver={(event) => {
                        if (onOptionMouseOver) {
                            console.log(selectedId, id)
                            onOptionMouseOver(event, { optionId: id })
                        }
                    }}
                    onClick={(event) => onOptionClick(event, { optionId: id })}
                    style={{
                        cursor: 'pointer',
                        fontWeight: selectedId === id ? 'bold' : 'inherit',
                        listStyle: 'none',
                        fontSize: selectedId === id ? '2em' : '1.5em',
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
