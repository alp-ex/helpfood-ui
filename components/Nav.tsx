import {
    MdLocalGroceryStore,
    MdRestaurantMenu,
    MdViewAgenda,
} from 'react-icons/md';
import React, { ReactElement } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Links = ReadonlyArray<{
    path: string;
    label: string;
    icon: ReactElement;
}>;

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
];

const BottomNav = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: #ef698b;
`;

const LinkIcon = styled.span`
    font-size: 1em;
    cursor: pointer;
    width: 33%;

    a {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 14px;
    }

    :hover {
        background: green;
    }
`;

/* TODO : 
    behavior on hover/click
    configure a global css file 
    doc styled-component https://www.styled-components.com/docs/basics#passed-props
    check best practice about variables and props with this lib

*/

const Nav = () => {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNav>
            {links.map(link => (
                <LinkIcon key={link.path}>
                    <Link to={link.path}>{link.icon}</Link>
                </LinkIcon>
            ))}
        </BottomNav>
    );
};

export default Nav;
