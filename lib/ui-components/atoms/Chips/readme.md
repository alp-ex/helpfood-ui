Basic example:

```tsx
<Chips>Category</Chips>
```

Closable example:

```tsx
<Chips onClose={() => ({})}>Category</Chips>
```

List example:

```tsx
<Chips.List>
    {Array(10).fill(<Chips onClose={() => ({})}>Chips</Chips>)}
</Chips.List>
```
