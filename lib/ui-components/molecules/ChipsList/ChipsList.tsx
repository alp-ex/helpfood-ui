import React, { MouseEvent, ReactElement } from 'react'
import { Chip } from '@material-ui/core'

type Item = { [key: string]: string | ReadonlyArray<string> }

interface Props {
    onClose: (item: Item) => void
    items: ReadonlyArray<{
        label: string
        value: Item
    }>
}

export default function ChipsList({ onClose, items }: Props): ReactElement {
    return (
        <ul>
            {items.map(({ label, value }) => (
                <Chip label={label} onDelete={() => onClose(value)} />
            ))}
        </ul>
    )
}
