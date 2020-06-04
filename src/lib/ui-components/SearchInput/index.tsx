import React, {
    ReactElement,
    ReactNode,
    ChangeEvent,
    forwardRef,
    Ref,
} from 'react'

interface Props {
    // can't wait to find a native type for the ts type of input type
    type?: string
    children?: ReactNode
    value?: string
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default forwardRef(function SearchInput(
    { children, type = 'text', value, placeholder, onChange }: Props,
    ref?: Ref<HTMLInputElement>
): ReactElement {
    return (
        <input
            ref={ref}
            style={{
                border: '1px solid black',
                borderRadius: '30px',
                padding: '1em',
                fontSize: '1em',
            }}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
        >
            {children}
        </input>
    )
})
