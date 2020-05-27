Basic example:

```js
<LabelledSection
    renderLabel={() => <h3>Title</h3>}
    itemsToGroup={[
        {
            label: 'first thing',
            value: () => <span>this is the first thing</span>,
        },
        {
            label: 'second thing',
            value: () => <span>this is the second thing</span>,
        },
    ]}
/>
```
