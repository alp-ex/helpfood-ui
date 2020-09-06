import React, { memo, ReactNode, CSSProperties } from 'react'

interface Props {
    renderLabel: () => ReactNode | null
    items: ReadonlyArray<{ render: () => ReactNode; id: string }>
    style?: {
        root?: CSSProperties
        itemsContainer?: CSSProperties
        item?: CSSProperties
    }
}

export default memo(function LabelledList({
    renderLabel = () => null,
    items,
    style: {
        root: customRootStyle,
        itemsContainer: customItemsContainerStyle,
        item: customItemStyle,
    } = {},
}: Props) {
    return (
        <section style={{ display: 'flex', ...customRootStyle }}>
            {renderLabel()}

            <ul style={customItemsContainerStyle}>
                {items.map(({ render, id }) => (
                    <li
                        style={{
                            listStyle: 'none',
                            ...customItemStyle,
                        }}
                        key={id}
                    >
                        {render()}
                    </li>
                ))}
            </ul>
        </section>
    )
})
