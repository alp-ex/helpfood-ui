import { Button, Container, createStyles, makeStyles } from '@material-ui/core'
import { theme } from '~/ui-components/themes/main'
import { ReactElement } from 'react'

type Location = 'bottom' | 'top'
type PrimaryColors = 'light' | 'main'

interface Props {
    location: Location
    bgcolorOption: PrimaryColors
    label: string
    action: () => void
}

interface StyleProps {
    location: Location
    containerBackground: PrimaryColors
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ location, containerBackground }: StyleProps) => ({
            [location]: '0',
            [location === 'top' ? 'bottom' : 'top']: 'auto',
            left: 0,
            right: 0,
            position: 'fixed',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            background: theme.palette.primary[containerBackground],
            padding: '2%',
        }),
        button: {
            color: theme.palette.primary.main,
        },
    })
)

export default function FixedActionBar({
    location,
    bgcolorOption,
    label,
    action,
}: Props): ReactElement {
    const classes = useStyles({ location, containerBackground: bgcolorOption })

    return (
        <Container classes={{ root: classes.root }}>
            <Button classes={{ root: classes.button }} onClick={action}>
                {label}
            </Button>
        </Container>
    )
}
