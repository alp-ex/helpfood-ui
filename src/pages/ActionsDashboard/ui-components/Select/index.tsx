import React, { ReactElement, ChangeEvent, ElementType, useState } from 'react'
import MenuList from './node_modules/@ui-components/molecules/MenuList'
import TextInput from './node_modules/@ui-components/atoms/TextInput'

interface Props {
    component?: ElementType
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string
    options: ReadonlyArray<{ label: string; value: string }>
    onOptionClick: (value: string) => void
}

export default function Select({
    component: Component = 'div',
    onChange,
    value,
    options,
    onOptionClick,
}: Props): ReactElement {
    const [inputFocused, setInputFocused] = useState(false)

    return (
        <Component
            style={{
                position: 'relative',
            }}
        >
            <TextInput
                onFocus={() => {
                    setInputFocused(true)
                }}
                onBlur={() => {
                    setInputFocused(false)
                }}
                onChange={onChange}
                value={value}
            />

            {inputFocused && options.length > 0 ? (
                <MenuList
                    style={{
                        root: {
                            position: 'absolute',
                            width: 'fit-content',
                            marginTop: '0.7em',
                            zIndex: 1000,
                            background: 'white',
                        },
                    }}
                >
                    {options.map(({ label, value }) => (
                        <MenuList.Item
                            key={label}
                            onMouseDown={() => {
                                onOptionClick(value)
                            }}
                        >
                            {label}
                        </MenuList.Item>
                    ))}
                </MenuList>
            ) : null}
        </Component>
    )
}
