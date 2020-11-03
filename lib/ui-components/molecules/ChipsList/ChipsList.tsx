import { ReactElement } from 'react'
import { Chip, createStyles, makeStyles } from '@material-ui/core'
import { Group } from 'ui-components/atoms'
import { theme } from 'ui-components/themes/main'
import { MdClose as CloseIcon } from 'react-icons/md'

type Item = { label: string; value: string }

interface Props {
    onClose?: (item: Item) => void
    items: ReadonlyArray<Item>
}

const useStyles = makeStyles(() =>
    createStyles({
        chip: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.light,
            padding: '2%',
            margin: '2%',
        },
        closeIcon: {
            marginLeft: '10px',
            color: theme.palette.primary.light,
            height: '20px',
            width: '20px',
        },
        MUIDeletableChipOverride: {
            '&:focus': {
                background: theme.palette.primary.main,
            },
        },
    })
)

export default function ChipsList({ onClose, items }: Props): ReactElement {
    const classes = useStyles()

    return (
        <Group>
            {items.map(({ label, value }) => (
                <Chip
                    deleteIcon={<CloseIcon />}
                    classes={{
                        root: classes.chip,
                        deleteIcon: classes.closeIcon,
                        deletable: classes.MUIDeletableChipOverride,
                    }}
                    label={label}
                    onDelete={
                        onClose ? () => onClose({ label, value }) : undefined
                    }
                    key={label}
                />
            ))}
        </Group>
    )
}
