import { ListItemText, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { ReactElement } from 'react'
import { theme } from '~/ui-components/themes/main'

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
            textTransform: 'uppercase',
            color: theme.palette.primary.main,
            fontWeight: 600,
        },
        secondary: {
            textTransform: 'capitalize',
            color: theme.palette.primary.main,
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
            classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
            }}
            primary={label}
            secondary={items.map((item, index) => (
                <Typography
                    component="span"
                    key={item}
                    className={classes.secondary}
                >
                    {`${item}${index !== items.length - 1 ? ', ' : null}`}
                </Typography>
            ))}
        />
    )
}
