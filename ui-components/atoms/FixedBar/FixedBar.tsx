import { ReactElement, ReactNode } from 'react'
import { Toolbar } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

type Location = 'top' | 'bottom'

interface Props {
    location: Location
    children: ReactNode
}

interface StyleProps {
    location: Location
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ location }: StyleProps) => ({
            [location]: '10px',
            [location === 'top' ? 'bottom' : 'top']: 'auto',
            left: 0,
            right: 0,
            position: 'fixed',
            width: 'fit-content',
            margin: '0 auto',
        }),
    })
)

export default function FixedBar({ location, children }: Props): ReactElement {
    const classes = useStyles({ location })

    return <Toolbar classes={{ root: classes.root }}>{children}</Toolbar>
}
