Basic example:

```tsx
const options = ['option 1', 'option 2', 'option 3', 'option 4']

;<MenuList>
    {options.map((option) => (
        <MenuList.Item>{option}</MenuList.Item>
    ))}
</MenuList>
```
