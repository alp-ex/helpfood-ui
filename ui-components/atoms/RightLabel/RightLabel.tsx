import { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { theme } from '~/ui-components/themes/main'

interface Props {
    label: string
    marginLeft?: string
    color?: 'light' | 'main' | 'dark'
}

interface StyleProps {
    rootMarginLeft: string
    rootColor: 'light' | 'main' | 'dark'
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ rootMarginLeft, rootColor }: StyleProps) => ({
            marginLeft: rootMarginLeft,
            color: theme.palette.primary[rootColor],
        }),
    })
)

export default function RightLabel({
    label,
    marginLeft = '10px',
    color = 'main',
}: Props): ReactElement {
    const classes = useStyles({
        rootMarginLeft: marginLeft,
        rootColor: color,
    })

    return (
        <Typography noWrap classes={{ body1: classes.root }}>
            {label}
        </Typography>
    )
}
