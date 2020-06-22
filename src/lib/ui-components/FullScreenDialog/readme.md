Basic example:

```tsx
const [isDialogDisplayed, setDialogDisplayStatus] = React.useState(false)

;<>
    <button
        style={{
            border: '1px solid black',
            margin: '1em',
            padding: '1em',
            cursor: 'pointer',
        }}
        onClick={() => {
            setDialogDisplayStatus(true)
        }}
    >
        Show Dialog
    </button>

    {isDialogDisplayed ? (
        <FullScreenDialog>
            <span>content</span>

            <button
                style={{
                    border: '1px solid black',
                    margin: '1em',
                    padding: '1em',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    setDialogDisplayStatus(false)
                }}
            >
                Close
            </button>
        </FullScreenDialog>
    ) : null}
</>
```
