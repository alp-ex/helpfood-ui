import { ElementType, ReactElement, ReactNode } from 'react'
import { Button as ReactButton, Link as ReactLink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
    render: () => ReactNode
    to: string
    routerLink: ElementType
}

const useStyle = makeStyles(() => ({
    rootButton: {
        textTransform: 'capitalize',
    },
}))

export default function PagesNavigationButton({
    to,
    routerLink,
    render,
}: Props): ReactElement {
    const classes = useStyle()

    return (
        <ReactLink underline="none" component={routerLink} to={to}>
            <ReactButton classes={{ root: classes.rootButton }}>
                {render()}
            </ReactButton>
        </ReactLink>
    )
}
