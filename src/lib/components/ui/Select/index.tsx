import React, { ReactNode, CSSProperties } from 'react'
import ReactSelect from 'react-select/async-creatable'

interface Props {
    loadOptions: () => void
    createOptions: () => void
    placeholder?: ReactNode
    canSelectMultipleValues?: boolean
    styles?: {
        container?: CSSProperties
        control?: CSSProperties
        placeholder?: CSSProperties
        option?: CSSProperties
    }
}

const Select = ({
    loadOptions,
    createOptions,
    placeholder,
    canSelectMultipleValues = false,
    styles: {
        container: customContainerStyle,
        control: customControlStyle,
        placeholder: customPlaceholderStyle,
        option: customOptionStyle,
    } = {},
}: Props) => {
    return (
        <ReactSelect
            // https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/styles.js
            styles={{
                container: (styles) => ({
                    ...styles,
                    ...customContainerStyle,
                    fontSize: '1em',
                }),
                control: (styles) => ({ ...styles, ...customControlStyle }),
                option: (styles) => ({ styles, ...customOptionStyle }),
                placeholder: (styles) => ({
                    ...styles,
                    ...customPlaceholderStyle,
                }),
            }}
            isMulti={canSelectMultipleValues}
            onCreateOption={createOptions}
            loadOptions={loadOptions}
            placeholder={placeholder}
        />
    )
}

export default Select
