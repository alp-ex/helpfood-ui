Basic example:

```tsx
const [isDialogDisplayed, setDialogDisplayStatus] = React.useState(false)

;<>
    <button
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
