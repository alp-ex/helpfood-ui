import { ListItemText } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { ReactElement } from 'react'

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

export default function LabelledInlineList({
    label,
    items,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <ListItemText
            classes={{ root: classes.root }}
            primary={label}
            secondary={items.join(', ')}
        />
    )
}
