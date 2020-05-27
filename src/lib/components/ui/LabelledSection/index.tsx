import React, { memo, ReactNode } from 'react'

interface Props {
    renderLabel: () => ReactNode | null
    itemsToGroup: ReadonlyArray<{ value: ReactNode; label: string }>
}

export default memo(function LabelledSection({
    renderLabel = () => null,
    itemsToGroup,
}: Props) {
    return (
        <section>
            {renderLabel()}

            <ul>
                {itemsToGroup.map(({ value, label }) => (
                    <li key={label}>{value}</li>
                ))}
            </ul>
        </section>
    )
})
