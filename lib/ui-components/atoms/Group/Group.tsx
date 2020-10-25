import React, { ReactElement, ReactNode } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

type Direction = 'row' | 'column'

interface Props {
    children: NonNullable<ReactNode>
    direction?: Direction
}

interface StyleProps {
    direction: Direction
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ direction }: StyleProps) => ({
            display: 'flex',
            flexDirection: direction,
            flexWrap: 'wrap',
            padding: '2%',
        }),
    })
)
export default function Group({
    children,
    direction = 'row',
}: Props): ReactElement {
    const classes = useStyles({ direction })

    return (
        <Container classes={{ root: classes.root }} disableGutters>
            {children}
        </Container>
    )
}
