Basic example:

```js
<SelectListView
    options={[
        {
            id: '1',
            render: () => <span>{`day 1`}</span>,
        },
        {
            id: '2',
            render: () => <span>{`day 2`}</span>,
        },
        {
            id: '3',
            render: () => <span>{`day 3`}</span>,
        },
        {
            id: '4',
            render: () => <span>{`day 4`}</span>,
        },
        {
            id: '5',
            render: () => <span>{`day 5`}</span>,
        },
    ]}
    selectedIndex={'4'}
/>
```
