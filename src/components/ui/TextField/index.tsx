import React, { CSSProperties, ChangeEvent } from 'react'

interface Props {
    value: string
    onChange: (evt: ChangeEvent) => void
    styles?: { root?: CSSProperties }
}

const TextField = ({
    value,
    styles: { root: customRootStyle } = {},
    onChange,
}: Props) => {
    return (
        <input
            style={{
                margin: '1em',
                padding: '1em',
                fontSize: '1em',
                border: 'none',
                background: 'white',
                borderRadius: '4px',
                fontFamily: 'Josefin Slab',
                ...customRootStyle,
            }}
            value={value}
            onChange={onChange}
        />
    )
}

export default TextField
