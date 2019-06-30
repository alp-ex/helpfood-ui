import { Link } from 'react-router-dom';
import React from 'react';

const Nav = () => {
    return (
        <ul>
            <Link to="/">Planning</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/shoplist">ShopList</Link>
        </ul>
    );
};

export default Nav;
