import { ReactElement, ReactNode } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface Props {
    onClick: () => void
    children: ReactNode
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontSize: '1em',
        },
    })
)

export default function ButtonIcon({ onClick, children }: Props): ReactElement {
    const classes = useStyles()

    return (
        <Button classes={{ root: classes.root }} onClick={onClick}>
            {children}
        </Button>
    )
}
