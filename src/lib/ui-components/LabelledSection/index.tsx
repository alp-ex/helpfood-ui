import React, { memo, ReactNode, CSSProperties } from 'react'
import { render } from 'react-dom'

interface Props {
    renderLabel: () => ReactNode | null
    itemsToGroup: ReadonlyArray<{ render: () => ReactNode; id: string }>
    style?: {
        root?: CSSProperties
        itemsContainer?: CSSProperties
        item?: CSSProperties
    }
}

export default memo(function LabelledSection({
    renderLabel = () => null,
    itemsToGroup,
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
                {itemsToGroup.map(({ render, id }) => (
                    <li
                        style={{ listStyle: 'none', ...customItemStyle }}
                        key={id}
                    >
                        {render()}
                    </li>
                ))}
            </ul>
        </section>
    )
})
