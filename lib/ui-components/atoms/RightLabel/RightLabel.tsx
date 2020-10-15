import React, { CSSProperties, ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface Props {
    label: string
    marginLeft?: string
}

interface StyleProps {
    rootMarginLeft: string
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ rootMarginLeft }: StyleProps) => ({
            marginLeft: rootMarginLeft,
        }),
    })
)

export default function RightLabel({
    label,
    marginLeft = '10px',
}: Props): ReactElement {
    const classes = useStyles({
        rootMarginLeft: marginLeft,
    })

    return (
        <Typography noWrap classes={{ body1: classes.root }}>
            {label}
        </Typography>
    )
}
