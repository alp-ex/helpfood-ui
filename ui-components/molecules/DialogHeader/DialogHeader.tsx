import { Button, createStyles, makeStyles, Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import { AngularBackground } from '~/ui-components/atoms'
import { theme } from '~/ui-components/themes/main'
import { MdClose as CloseIcon } from 'react-icons/md'

interface Props {
    onClose: () => void
    title?: string
}

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            fontSize: '1em',
            textTransform: 'capitalize',
        },
        rootCloseButton: {
            fontSize: '1em',
            color: theme.palette.primary.main,
            alignSelf: 'end',
        },
    })
)

export default function DialogHeader({ onClose, title }: Props): ReactElement {
    const classes = useStyles({
        closeButtonPosition: title ? 'inherit' : 'end',
    })

    return (
        <AngularBackground bgcolorOption="light">
            {title ? (
                <Typography classes={{ root: classes.title }} variant="h3">
                    {title}
                </Typography>
            ) : null}

            <Button
                classes={{ root: classes.rootCloseButton }}
                onClick={onClose}
            >
                <CloseIcon />
            </Button>
        </AngularBackground>
    )
}
