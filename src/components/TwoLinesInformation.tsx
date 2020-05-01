import React from 'react'

interface Props {
    first: string
    second: string
}

const TwoLinesInformation = ({ first, second }: Props) => {
    return (
        <article
            style={{
                width: 'fit-content',
                fontFamily: `'Josefin Slab', serif`,
            }}
        >
            <h3 style={{ textTransform: 'uppercase' }}>{first}</h3>
            <p style={{ fontStyle: 'italic' }}>{second}</p>
        </article>
    )
}

export default TwoLinesInformation
