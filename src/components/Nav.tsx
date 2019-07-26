import {
    MdLocalGroceryStore,
    MdRestaurantMenu,
    MdViewAgenda,
} from 'react-icons/md'
import React, { ReactElement, HTMLProps } from 'react'

import { Link } from 'react-router-dom'

type Links = ReadonlyArray<{
    path: string
    label: string
    icon: ReactElement
}>

const links: Links = [
    {
        path: '/',
        label: 'Week',
        icon: <MdViewAgenda />,
    },
    {
        path: '/recipes',
        label: 'Recipes',
        icon: <MdRestaurantMenu />,
    },
    {
        path: '/shoplist',
        label: 'Shop list',
        icon: <MdLocalGroceryStore />,
    },
]

interface BottomNavProps extends HTMLProps<HTMLElement> {
    height?: string
    backgroundColor?: string
}

const BottomNav = ({ children, height, backgroundColor }: BottomNavProps) => (
    <nav
        style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100vw',
            background: backgroundColor || '#ef698b',
            height: height,
        }}
    >
        {children}
    </nav>
)

interface LinkIcon extends HTMLProps<HTMLSpanElement> {
    nbrOfSiblings: number
}

const LinkIcon = ({ children, nbrOfSiblings }) => (
    <span
        style={{
            maxHeight: '100%',
            fontSize: '1em',
            cursor: 'pointer',
            width: `calc(100%/${nbrOfSiblings})`,
        }}
    >
        {children}
    </span>
)

export interface Props {
    backgroundColor?: string
    backgroundColorSelected?: string
    height: string
}

const Nav = ({ backgroundColorSelected, backgroundColor, height }: Props) => {
    const [value, setValue] = React.useState()

    return (
        <BottomNav height={height}>
            {links.map(link => (
                <LinkIcon nbrOfSiblings={links.length} key={link.path}>
                    <Link
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '14px',
                            background:
                                link === value
                                    ? backgroundColorSelected || '#c7496991'
                                    : backgroundColor || '#ef698b',
                        }}
                        to={link.path}
                        onMouseOver={evt =>
                            link !== value &&
                            (evt.currentTarget.style.background =
                                backgroundColorSelected || '#c7496929')
                        }
                        onMouseOut={evt =>
                            link !== value &&
                            (evt.currentTarget.style.background =
                                backgroundColor || '#ef698b')
                        }
                        onClick={() => setValue(link)}
                    >
                        {link.icon}
                    </Link>
                </LinkIcon>
            ))}
        </BottomNav>
    )
}

export default Nav
