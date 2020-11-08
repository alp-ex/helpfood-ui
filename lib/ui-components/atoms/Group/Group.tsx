import { ReactElement, ReactNode } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

type Direction = 'row' | 'column'
type Justify = 'space-between' | 'space-around' | 'center' | 'inherit'

interface Props {
    children: NonNullable<ReactNode>
    direction?: Direction
    justify?: Justify
}

interface StyleProps {
    direction: Direction
    justify: Justify
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ direction, justify }: StyleProps) => ({
            display: 'flex',
            flexDirection: direction,
            justifyContent: justify,
            flexWrap: 'wrap',
            padding: '2%',
        }),
    })
)
export default function Group({
    children,
    direction = 'row',
    justify = 'inherit',
}: Props): ReactElement {
    const classes = useStyles({ direction, justify })

    return (
        <Container classes={{ root: classes.root }} disableGutters>
            {children}
        </Container>
    )
}
