Basic example:

```tsx
const textInputRef = React.createRef()

;<TextInput
    ref={(ref) => (textInputRef.current = ref)}
    onChange={(event) => {
        if (event.target.value.length > 4) {
            textInputRef.current.style.background = 'green'
        } else {
            textInputRef.current.style.background = 'red'
        }
    }}
/>
```
