import { ReactElement, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { createPortal } from 'react-dom'
import { theme } from '@ui-components/themes/main'

interface Props {
    items: ReadonlyArray<{ value: string | number; label: string }>
    onSelect: ({
        label,
        value,
    }: {
        value: string | number
        label: string
    }) => void
    selected: { value: string | number; label: string }
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
            alignItems: 'center',
            position: 'fixed',
            top: '0',
            left: '0',
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
        clickableLabel: {
            textTransform: 'capitalize',
            color: theme.palette.primary.main,
            cursor: 'pointer',
            fontSize: '1em',
        },
        option: {
            color: theme.palette.primary.main,
            fontSize: '1.65em',
            textTransform: 'capitalize',
            marginBottom: '10px',
            cursor: 'pointer',
        },
        selectedOption: {
            fontSize: '2.2em',
            fontWeight: 600,
        },
    })
)

export default function FullScreenListSelect({
    items,
    onSelect,
    selected,
}: Props): ReactElement {
    const classes = useStyles()
    const [fullScreenVisible, setFullScreenListVisible] = useState(false)

    return (
        <>
            <Typography
                classes={{ root: classes.clickableLabel }}
                onClick={() => {
                    setFullScreenListVisible(true)
                }}
            >
                {selected.label}
            </Typography>

            {fullScreenVisible
                ? createPortal(
                      <Container classes={{ root: classes.root }}>
                          {items.map(({ label, value }) => (
                              <Typography
                                  classes={{
                                      root: `${classes.option} ${
                                          selected.value === value
                                              ? classes.selectedOption
                                              : null
                                      }`,
                                  }}
                                  onClick={() => {
                                      onSelect({ label, value })
                                      setFullScreenListVisible(false)
                                  }}
                                  key={label}
                              >
                                  {label}
                              </Typography>
                          ))}
                      </Container>,
                      document.body
                  )
                : null}
        </>
    )
}
