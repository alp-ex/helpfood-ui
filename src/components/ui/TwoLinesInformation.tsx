import React, { CSSProperties } from 'react'
import TextField from './TextField'

interface Props {
    styles?: { root?: CSSProperties }
    title: string
    content: string
    isInEditMode?: boolean
    onChange?: ({ title, content }) => void
}

const TwoLinesInformation = ({
    title,
    content,
    isInEditMode = false,
    onChange,
    styles: { root: customRootStyle } = {},
}: Props) => {
    return (
        <article
            style={{
                fontFamily: `'Josefin Slab', serif`,
                ...customRootStyle,
            }}
        >
            {/* it doesn't sounds very neat, keep on trying to search a better solution ;) */}
            {isInEditMode ? (
                <>
                    <TextField
                        value={title}
                        onChange={(evt) =>
                            onChange({ title: evt.target.value, content })
                        }
                    />
                    <TextField
                        value={content}
                        onChange={(evt) =>
                            onChange({ title, content: evt.target.value })
                        }
                    />
                </>
            ) : (
                <>
                    <h3 style={{ textTransform: 'uppercase' }}>{title}</h3>
                    <p style={{ fontStyle: 'italic' }}>{content}</p>
                </>
            )}
        </article>
    )
}

export default TwoLinesInformation
