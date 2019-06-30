import {
    MdLocalGroceryStore,
    MdRestaurantMenu,
    MdViewAgenda,
} from 'react-icons/md';
import React, { ReactElement } from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#ef698b',
    },
    icon: {
        fontSize: '1em',
    },
});

const Nav = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            className={classes.root}
        >
            {links.map(link => (
                <BottomNavigationAction
                    showLabel={false}
                    component={Link}
                    key={link.path}
                    to={link.path}
                    className={classes.icon}
                    // label={link.label}
                    icon={link.icon}
                />
            ))}
        </BottomNavigation>
    );
};

export default Nav;
