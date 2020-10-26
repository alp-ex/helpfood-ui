import React, { MouseEvent, ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { Container, Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { theme } from '@ui-components/themes/main'
import { MdClose as CloseIcon } from 'react-icons/md'

interface Props {
    buttons: ReadonlyArray<{
        label: string
        onClick: (event: MouseEvent) => void
    }>
    onClose: (event: MouseEvent) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '100%',
            alignItems: 'center',
            position: 'fixed',
            top: '0',
            left: '0',
            background: theme.palette.primary.light,
        },
        rootButton: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.light,
            width: '60%',
            margin: '3%',
            padding: '6%',
        },
        rootCloseButton: {
            color: theme.palette.primary.main,
            fontSize: '1.5em',
            position: 'absolute',
            top: '15px',
            right: '10px',
        },
    })
)

export default function FullScreenButtonList({
    buttons,
    onClose,
}: Props): ReactElement {
    const classes = useStyles()

    return createPortal(
        <Container classes={{ root: classes.root }}>
            {buttons.map(({ label, onClick }) => (
                <Button
                    classes={{ root: classes.rootButton }}
                    onClick={onClick}
                    key={label}
                >
                    {label}
                </Button>
            ))}

            <Button
                classes={{ root: classes.rootCloseButton }}
                onClick={onClose}
            >
                <CloseIcon />
            </Button>
        </Container>,
        document.body
    )
}
