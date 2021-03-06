import { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { theme } from '~/ui-components/themes/main'

interface Props {
    title: string
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '-webkit-text-fill-color': theme.palette.primary.light,
            '-webkit-text-stroke-width': '1.2px',
            '-webkit-text-stroke-color': theme.palette.primary.main,
            fontSize: '1.8em',
            textTransform: 'lowercase',
            fontWeight: 'bolder',
            letterSpacing: '0.06em',
        },
    })
)

export default function StrokedTitle({ title }: Props): ReactElement {
    const classes = useStyles()

    return <Typography classes={{ root: classes.root }}>{title}</Typography>
}
