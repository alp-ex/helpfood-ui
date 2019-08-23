// import {
//   MdLocalGroceryStore,
//   MdRestaurantMenu,
//   MdViewAgenda
// } from "react-icons/md";
import React, { ReactElement, HTMLProps } from "react";

import { Link } from "react-router-dom";

type Links = ReadonlyArray<{
  path: string;
  label: string;
  icon?: ReactElement;
}>;

// should I include a sorting logic here ? #overkill
const links: Links = [
  {
    path: "/recipes",
    label: "Recipes"
    // icon: <MdRestaurantMenu />
  },
  {
    path: "/",
    label: "Planning"
    // icon: <MdViewAgenda />
  },
  {
    path: "/shoplist",
    label: "Shop list"
    // icon: <MdLocalGroceryStore />
  }
];

interface LinkTab extends HTMLProps<HTMLSpanElement> {
  nbrOfSiblings: number;
}

const LinkTab = ({ children, nbrOfSiblings }) => (
  <span
    style={{
      //   maxHeight: "100%",
      cursor: "pointer",
      width: `calc(100%/${nbrOfSiblings})`,
      padding: "3%"
    }}
  >
    {children}
  </span>
);

export interface Props {}

const Nav = () => {
  const [value, setValue] = React.useState();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        fontSize: "1em",
        color: "#f0754e",
        position: "fixed",
        background: "#ffffff",
        bottom: 0
      }}
    >
      {links.map(link => (
        <LinkTab nbrOfSiblings={links.length} key={link.path}>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //   padding: "14px",
              //   height: "100%",
              ...(link === value && { filter: "brightness(42%)" })
            }}
            to={link.path}
            // onMouseOver={evt =>
            //   link !== value &&
            //   (evt.currentTarget.style.background =
            //     backgroundColorSelected || "#c7496929")
            // }
            // onMouseOut={evt =>
            //   link !== value &&
            //   (evt.currentTarget.style.background =
            //     backgroundColor || "#ef698b")
            // }
            onClick={() => setValue(link)}
          >
            {link.label}
          </Link>
        </LinkTab>
      ))}
    </nav>
  );
};

export default Nav;
