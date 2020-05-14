import React, { ReactNode } from 'react'

interface Props {
    loadOptions: () => void
    createOptions: () => void
    placeholder?: ReactNode
}

const MultiSelect = ({ loadOptions, createOptions, placeholder }: Props) => {
    return <ReactSelect />
}

export default MultiSelect
