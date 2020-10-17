import React from 'react'
import { ListItemText } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface Props {
    label: string
    items: ReadonlyArray<string>
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            paddingLeft: '2%',
        },
    })
)

export default function LabelledInlineList({ label, items }: Props) {
    const classes = useStyles()

    return (
        <ListItemText
            classes={{ root: classes.root }}
            primary={label}
            secondary={items.join(', ')}
        />
    )
}
