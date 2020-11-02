import { ReactElement, ReactNode } from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { theme } from 'ui-components/themes/main'

interface Props {
    children: ReactNode
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            background: theme.palette.primary.light,
            minHeight: '100vh',
        },
    })
)

export default function ContentBackground({ children }: Props): ReactElement {
    const classes = useStyles()

    return (
        <Paper square elevation={0} classes={{ root: classes.root }}>
            {children}
        </Paper>
    )
}
