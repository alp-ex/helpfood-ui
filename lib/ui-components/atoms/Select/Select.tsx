import React, { ReactElement, ChangeEvent, ElementType, useState } from 'react'
import { TextInput } from '@ui-components/atoms'
import { MenuList } from '@ui-components/molecules'

interface Props {
    component?: ElementType
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string
    options: ReadonlyArray<{ label: string; value: any }>
    onOptionClick: (value: any) => void
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
