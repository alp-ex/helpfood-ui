import React from 'react'

interface Props {
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
}: Props) => {
    return (
        <article
            style={{
                width: 'fit-content',
                fontFamily: `'Josefin Slab', serif`,
            }}
        >
            {/* it doesn't sounds very neat, keep on trying to search a better solution ;) */}
            {isInEditMode ? (
                <>
                    <input
                        value={title}
                        onChange={(evt) =>
                            onChange({ title: evt.target.value, content })
                        }
                    />
                    <input
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
