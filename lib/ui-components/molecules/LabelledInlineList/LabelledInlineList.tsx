import { ListItemText } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { ReactElement } from 'react'
import { theme } from 'ui-components/themes/main'
import { ChipsList } from 'ui-components/molecules'

interface Props {
    label: string
    items: ReadonlyArray<string>
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            paddingLeft: '2%',
        },
        primary: {
            textTransform: 'capitalize',
            color: theme.palette.primary.main,
        },
        secondary: {},
    })
)

export default function LabelledInlineList({
    label,
    items,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <ListItemText
            classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
            }}
            primary={label}
            secondary={
                <ChipsList
                    items={items.map((item) => ({ label: item, value: item }))}
                />
            }
        />
    )
}
