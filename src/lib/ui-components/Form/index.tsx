import React, { ReactElement, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function Form({ children }: Props): ReactElement {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
            }}
            style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}
        >
            {children}
        </form>
    )
}
