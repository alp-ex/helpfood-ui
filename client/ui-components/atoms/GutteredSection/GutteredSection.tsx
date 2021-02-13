import { createStyles, makeStyles, Paper } from '@material-ui/core'
import { ReactElement, ReactNode } from 'react'

interface Props {
    bottomGutter?: number
    topGutter?: number
    children: ReactNode
}

interface StyleProps {
    bottomGutter: number
    topGutter: number
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ bottomGutter, topGutter }: StyleProps) => ({
            marginBottom: `${bottomGutter}em`,
            marginTop: `${topGutter}em`,
        }),
    })
)

export default function GutteredSection({
    bottomGutter = 1,
    topGutter = 1,
    children,
}: Props): ReactElement {
    const classes = useStyles({ bottomGutter, topGutter })

    return <Paper classes={{ root: classes.root }}>{children}</Paper>
}
