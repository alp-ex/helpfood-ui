Basic example:

```tsx
const searchInputRef = React.createRef()

;<SearchInput
    ref={(ref) => (searchInputRef.current = ref)}
    onChange={(event) => {
        if (event.target.value.length > 4) {
            searchInputRef.current.style.background = 'green'
        } else {
            searchInputRef.current.style.background = 'red'
        }
    }}
/>
```
