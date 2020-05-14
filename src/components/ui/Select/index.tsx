import React, { ReactNode } from 'react'
import ReactSelect from 'react-select/async-creatable'

interface Props {
    loadOptions: () => void
    createOptions: () => void
    placeholder?: ReactNode
    canSelectMultipleValues?: boolean
}

const Select = ({
    loadOptions,
    createOptions,
    placeholder,
    canSelectMultipleValues = false,
}: Props) => {
    return (
        <ReactSelect
            isMulti={canSelectMultipleValues}
            onCreateOption={createOptions}
            loadOptions={loadOptions}
            placeholder={placeholder}
        />
    )
}

export default Select
