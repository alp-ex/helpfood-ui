import React from "react";
import { dishes } from "../fixtures";

type TypeOfMeal = "breakfast" | "launch" | "dinner";

interface DishCharacteristics {
  warnings?: ReadonlyArray<string>;
  isVegetarian: boolean;
  isVegan: boolean;
}

interface Dish {
  name: string;
  description: string;
  characteristics: DishCharacteristics;
}

export interface Props {
  // we might want a more specific type (sunday | monday | etc) but what about translation then ?
  currentDay: string;
  hue: number;
}

export interface MenuCardProps {
  typeOfMeal?: TypeOfMeal;
  dish: Dish;
  hue: number;
  picked: boolean;
}

// regarding the type of the meal the theme will be different
const MenuCard = ({
  typeOfMeal,
  hue,
  picked,
  dish: {
    name,
    description,
    characteristics: { isVegan, isVegetarian, warnings }
  }
}: MenuCardProps) => (
  <div style={{}}>
    <section
      style={{
        display: "flex",
        flexFlow: "row wrap",
        padding: "4%"
      }}
    >
      <button
        style={{
          width: "75%",
          padding: "2%",
          background: `hsl(0, 0%, 100%)`,
          // we might want an intermediate saturation like : not/picked/db confirmation
          color: `hsl(${hue}, 100%, ${picked ? 50 : 90}%)`,
          border: `1px solid hsl(${hue}, 100%, ${picked ? 50 : 90}%)`,
          fontFamily: "monospace",
          fontSize: "1em",
          borderRadius: "5px",
          flex: "0 0 40%"
        }}
      >
        {name}
      </button>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          flex: "1 1 60%"
        }}
      >
        {isVegan && (
          <li
            style={{
              marginLeft: "5%"
            }}
          >
            vegan stuff
          </li>
        )}
        {isVegetarian && (
          <li
            style={{
              marginLeft: "3%"
            }}
          >
            vegetarian stuff
          </li>
        )}
        {/* on hover this will show a tooltip with the related warnings */}
        {warnings && (
          <li
            style={{
              marginLeft: "4%"
            }}
          >
            !
          </li>
        )}
      </ul>
      <p
        style={{
          flex: "1 1 60%"
        }}
      >
        {description}
      </p>
      <p
        style={{
          flex: "0 0 40%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end"
        }}
      >
        -->
      </p>
    </section>
  </div>
);

const MenuOfTheDay = ({ currentDay, hue }: Props) => {
  return (
    <div style={{}}>
      <MenuCard
        picked={true}
        hue={hue}
        dish={dishes[1]}
        typeOfMeal={"launch"}
      />
      <MenuCard
        picked={false}
        hue={hue}
        dish={dishes[3]}
        typeOfMeal={"dinner"}
      />
    </div>
  );
};

export default MenuOfTheDay;
