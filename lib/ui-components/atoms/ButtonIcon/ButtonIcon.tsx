import React, { ReactElement, ReactNode } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface Props {
    onClick: () => void
    renderIcon: () => ReactNode
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontSize: '1em',
        },
    })
)

export default function ButtonIcon({
    onClick,
    renderIcon,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <Button classes={{ root: classes.root }} onClick={onClick}>
            {renderIcon()}
        </Button>
    )
}
