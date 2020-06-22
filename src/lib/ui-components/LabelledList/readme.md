Basic example:

```js
<LabelledList
    renderLabel={() => <h3>Title</h3>}
    items={[
        {
            id: '1',
            render: () => <span>{`this is the item number  1`}</span>,
        },
        {
            id: '2',
            render: () => <span>{`this is the item number  2`}</span>,
        },
        {
            id: '3',
            render: () => <span>{`this is the item number  3`}</span>,
        },
        {
            id: '4',
            render: () => <span>{`this is the item number  4`}</span>,
        },
        {
            id: '5',
            render: () => <span>{`this is the item number  5`}</span>,
        },
    ]}
/>
```
