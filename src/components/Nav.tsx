import {
    MdLocalGroceryStore,
    MdRestaurantMenu,
    MdViewAgenda,
} from 'react-icons/md'
import React, { ReactElement } from 'react'

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

const BottomNav = ({ children, height }) => (
    <nav
        style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100vw',
            background: '#ef698b',
            height: height,
        }}
    >
        {children}
    </nav>
)

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
    height: string
}

const Nav = (props: Props) => {
    const [value, setValue] = React.useState()

    return (
        <BottomNav {...props}>
            {links.map(link => (
                <LinkIcon nbrOfSiblings={links.length} key={link.path}>
                    <Link
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '14px',
                            background:
                                link === value ? '#c7496991' : '#ef698b',
                        }}
                        to={link.path}
                        onMouseOver={evt =>
                            link !== value &&
                            (evt.currentTarget.style.background = '#c7496929')
                        }
                        onMouseOut={evt =>
                            link !== value &&
                            (evt.currentTarget.style.background = '#ef698b')
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
