import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { NavBar, Router } from 'app/components'
import { Routes } from 'app/components/Router/Router'
import { AiFillHome as HomeIcon } from 'react-icons/ai'
import { BiRestaurant as MenuIcon } from 'react-icons/bi'
import { FaHamburger as RecipesIcon } from 'react-icons/fa'
import { BsCardChecklist as ShopListIcon } from 'react-icons/bs'

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <Router />
            <NavBar
                pages={[
                    {
                        route: Routes.HOMEPAGE,
                        label: 'home',
                        renderIcon: () => <HomeIcon />,
                    },
                    {
                        route: Routes.MEAL_PLAN,
                        label: 'menu',
                        renderIcon: () => <MenuIcon />,
                    },
                    {
                        route: Routes.RECIPES,
                        label: 'recipes',
                        renderIcon: () => <RecipesIcon />,
                    },
                    {
                        route: Routes.SHOPLIST,
                        label: 'shoplist',
                        renderIcon: () => <ShopListIcon />,
                    },
                ]}
            />
        </BrowserRouter>
    )
}
