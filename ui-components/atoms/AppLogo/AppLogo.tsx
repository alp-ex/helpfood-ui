import { createStyles, makeStyles, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface Props {
    appName: string
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontSize: '1em',
            fontFamily: 'Josefin Slab',
            fontWeight: 900,
            textTransform: 'uppercase',
            '&:first-letter': {
                fontWeight: 100,
                fontSize: '1.8em',
            },
        },
    })
)

export default function AppLogo({ appName }: Props): ReactElement {
    const classes = useStyles()

    return <Typography classes={{ root: classes.root }}>{appName}</Typography>
}
