import { ReactElement, ReactNode } from 'react'
import {
    PagesNavigationButton,
    IconWrapper,
    RoundedBackground,
    RightLabel,
    FixedBar,
} from '@ui-components/atoms'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'

interface Props {
    pages: ReadonlyArray<{
        route: string
        label: string
        renderIcon: () => ReactNode
    }>
}

export default function NavBar({ pages }: Props): ReactElement {
    const { pathname } = useLocation()

    return (
        <FixedBar location="bottom">
            <RoundedBackground bgcolorOption="main">
                {pages.map(({ route, label, renderIcon }) => (
                    <PagesNavigationButton
                        key={route}
                        routerLink={ReactRouterLink}
                        render={() =>
                            pathname === route ? (
                                <RoundedBackground bgcolorOption="light">
                                    <IconWrapper colorOption="main">
                                        {renderIcon()}
                                    </IconWrapper>

                                    <RightLabel label={label} />
                                </RoundedBackground>
                            ) : (
                                <IconWrapper colorOption="light">
                                    {renderIcon()}
                                </IconWrapper>
                            )
                        }
                        to={route}
                    />
                ))}
            </RoundedBackground>
        </FixedBar>
    )
}
