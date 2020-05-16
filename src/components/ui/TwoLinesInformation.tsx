import React, { CSSProperties, SyntheticEvent } from 'react'

interface Props {
    styles?: { root?: CSSProperties }
    title: string
    content: string
}

const TwoLinesInformation = ({
    title,
    content,
    styles: { root: customRootStyle } = {},
}: Props) => {
    return (
        <article
            style={{
                fontFamily: `'Josefin Slab', serif`,
                ...customRootStyle,
            }}
        >
            <h3 style={{ textTransform: 'uppercase' }}>{title}</h3>

            <p style={{ fontStyle: 'italic' }}>{content}</p>
        </article>
    )
}

export default TwoLinesInformation
