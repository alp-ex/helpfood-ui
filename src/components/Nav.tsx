import React, { ReactElement, HTMLProps } from "react";

import { Link } from "react-router-dom";

type Links = ReadonlyArray<{
  path: string;
  label: string;
  icon?: ReactElement;
}>;

const links: Links = [
  {
    path: "/recipes",
    label: "Recipes"
  },
  {
    path: "/schedule",
    label: "Schedule"
  },
  {
    path: "/shoplist",
    label: "Shop list"
  }
];

interface LinkTab extends HTMLProps<HTMLSpanElement> {
  nbrOfSiblings: number;
}

const LinkTab = ({ children, nbrOfSiblings }) => (
  <span
    style={{
      cursor: "pointer",
      width: `calc(100%/${nbrOfSiblings})`,
      padding: "3%"
    }}
  >
    {children}
  </span>
);

export interface Props {
  hue: number;
}

const Nav = ({ hue }: Props) => {
  const [value, setValue] = React.useState(window.location.pathname);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        fontSize: "1em",
        color: `hsl(${hue}, 100%, 50%)`,
        position: "fixed",
        background: `hsl(0, 100%, 100%)`,
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
              color: `hsl(${hue}, 100%, ${value === link.path ? 50 : 90}%)`
            }}
            to={link.path}
            onClick={() => setValue(link.path)}
          >
            {link.label}
          </Link>
        </LinkTab>
      ))}
    </nav>
  );
};

export default Nav;
