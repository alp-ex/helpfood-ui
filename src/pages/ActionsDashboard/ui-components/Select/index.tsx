import React, {
    ReactElement,
    ChangeEvent,
    ElementType,
    useRef,
    createRef,
    useState,
} from 'react'
import MenuList from '@ui-components/molecules/MenuList'
import SearchInput from '@ui-components/atoms/SearchInput'

interface Props {
    component?: ElementType
    onChange: (event: ChangeEvent) => void
    defaultValue?: string
    items: ReadonlyArray<{ id: string; name: string }>
    onOptionClick: ({ id, name }: { id: string; name: string }) => void
}

export default function Select({
    component: Component = 'div',
    onChange,
    defaultValue = '',
    items,
    onOptionClick,
}: Props): ReactElement {
    const [inputFocused, setInputFocused] = useState(false)

    return (
        <Component
            style={{
                position: 'relative',
            }}
        >
            <SearchInput
                onFocus={() => {
                    setInputFocused(true)
                }}
                onBlur={() => {
                    setInputFocused(false)
                }}
                onChange={onChange}
                // cant stay like this omg
                value={defaultValue}
            />

            {inputFocused && items.length > 0 ? (
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
                    {items.map(({ id, name }) => (
                        <MenuList.Item
                            key={id}
                            onClick={() => {
                                onOptionClick({ id, name })
                            }}
                        >
                            {name}
                        </MenuList.Item>
                    ))}
                </MenuList>
            ) : null}
        </Component>
    )
}
