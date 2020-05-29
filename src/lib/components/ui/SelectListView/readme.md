Basic example:

```tsx
const [selectedIndex, setSelectedIndex] = React.useState('4')

;<SelectListView
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
    selectedIndex={selectedIndex}
    onOptionClick={(_, { optionId }) => {
        setSelectedIndex(optionId)
    }}
/>
```

Swipe example:

```tsx
const [selectedIndex, setSelectedIndex] = React.useState('4')
const [selectListViewIsDisplayed, displaySelectListView] = React.useState(false)
const debounced = React.useRef(true)
const previousTouchMovePageY = React.useRef(null)

;<>
    <span
        onMouseDown={() => displaySelectListView(true)}
        onTouchStart={(event) => (
            event.preventDefault(), displaySelectListView(true)
        )}
        onTouchEnd={(event) => (
            event.preventDefault(), displaySelectListView(false)
        )}
        onTouchMove={(event) => {
            event.preventDefault()
            const inch = event.targetTouches[0]

            if (debounced.current) {
                setTimeout(() => {
                    if (
                        previousTouchMovePageY.current &&
                        previousTouchMovePageY.current > inch.pageY
                    ) {
                        setSelectedIndex((prevState) =>
                            Number(prevState) < 5
                                ? `${Number(prevState) + 1}`
                                : prevState
                        )
                    }
                    if (
                        previousTouchMovePageY.current &&
                        previousTouchMovePageY.current < inch.pageY
                    ) {
                        setSelectedIndex((prevState) =>
                            Number(prevState) > 1
                                ? `${Number(prevState) - 1}`
                                : prevState
                        )
                    }

                    debounced.current = true
                    previousTouchMovePageY.current = inch.pageY
                }, 300)
            }
            debounced.current = false
        }}
    >
        Hold
    </span>

    <span style={{ marginLeft: '2%' }}>selected index : {selectedIndex}</span>

    {!selectListViewIsDisplayed ? null : (
        <SelectListView
            style={{
                root: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    height: '100vh',
                    width: '100vw',
                    margin: 0,
                    background: 'white',
                    zIndex: 99000,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '0',
                },
                option: {
                    flex: '1 1 0%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
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
            selectedIndex={selectedIndex}
            onOptionClick={(_, { optionId }) => {
                setSelectedIndex(optionId)
            }}
            onOptionMouseOver={(_, { optionId }) => {
                setSelectedIndex(optionId)
            }}
            onMouseUp={() => displaySelectListView(false)}
        />
    )}
</>
```
