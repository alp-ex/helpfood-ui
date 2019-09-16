import React, { useState, useEffect, useRef } from "react";
import { MdInfoOutline } from "react-icons/md";

interface Meal {
  user: string;
  weekday: string;
  typeOfMeal: string;
  recipe: {
    name: string;
    description: string;
    steps: ReadonlyArray<string>;
    ingredients: [
      {
        name: string;
        meat: boolean;
        from_animals: boolean;
        dairy_product: boolean;
        pregnant_compliant: boolean;
      },
      {
        name: string;
        meat: boolean;
        from_animals: boolean;
        dairy_product: boolean;
        pregnant_compliant: boolean;
      }
    ];
  };
  confirmed: boolean;
}

export interface Props {
  hue: number;
  selectedMeals: ReadonlyArray<Meal>;
  onSelectMenuButtonClick: () => void;
}

export interface MenuCardProps {
  warningMessages?: {
    vegan: string;
    vegetarian: string;
    dairyTolerance: string;
    pregnant: string;
  };
  meal: Meal;
  hue: number;
  onSelectMenuButtonClick: (typeOfMeal: string) => void;
}

const defaultWarningMessages = {
  vegan: "this meal is made with products that are produced from animals",
  vegetarian: "there is meat in this meal",
  dairyTolerance: "there is lactose in this meal",
  pregnant: "pregnant woman should take caution with this meal"
};

const MenuCard = ({
  warningMessages = defaultWarningMessages,
  hue,
  onSelectMenuButtonClick,
  meal: {
    recipe: { name, description, ingredients },
    confirmed,
    typeOfMeal
  }
}: MenuCardProps) => {
  const warnings = useRef([]);
  const [isInfoDisplayed, setIsInfoDisplayed] = useState(false);
  const isVegan =
    ingredients.findIndex(ingredient => ingredient.from_animals) === -1;
  const isVegetarian =
    ingredients.findIndex(ingredient => ingredient.meat) === -1;
  const isLactoseFree =
    ingredients.findIndex(ingredient => ingredient.dairy_product) === -1;
  const isPregnantCompliant =
    ingredients.findIndex(ingredient => ingredient.pregnant_compliant) === -1;
  const handleInfoClick = () => setIsInfoDisplayed(true);

  useEffect(() => {
    isVegan && warnings.current.push(warningMessages.vegan);
    isVegetarian && warnings.current.push(warningMessages.vegetarian);
    isLactoseFree && warnings.current.push(warningMessages.dairyTolerance);
    isPregnantCompliant && warnings.current.push(warningMessages.pregnant);
  }, [isVegan, isVegetarian, isLactoseFree, isPregnantCompliant]);

  return (
    // <div style={{}}>
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
          // we might want an intermediate saturation like : not picked/picked/db confirmation
          color: `hsl(${hue}, 100%, ${confirmed ? 50 : 90}%)`,
          border: `1px solid hsl(${hue}, 100%, ${confirmed ? 50 : 90}%)`,
          fontFamily: "monospace",
          fontSize: "1em",
          borderRadius: "5px",
          flex: "0 0 40%"
        }}
        onClick={() => onSelectMenuButtonClick(typeOfMeal)}
      >
        {name}
      </button>
      {warnings.current.length > 1 && (
        <MdInfoOutline onClick={handleInfoClick} />
      )}
      {isInfoDisplayed && (
        <ul
          style={{
            padding: "3%"
          }}
        >
          {warnings.current.map(warning => (
            <li>{warning}</li>
          ))}
        </ul>
      )}
      <p
        style={{
          flex: "1 1 60%"
        }}
      >
        {description}
      </p>
      <a
        style={{
          flex: "0 0 40%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end"
        }}
      >
        -->
      </a>
    </section>
    // </div>
  );
};

const MenuOfTheDay = ({
  hue,
  onSelectMenuButtonClick,
  selectedMeals
}: Props) => {
  return (
    <div style={{}}>
      {selectedMeals.map(meal => {
        <MenuCard
          meal={meal}
          onSelectMenuButtonClick={onSelectMenuButtonClick}
          hue={hue}
        />;
      })}
    </div>
  );
};

export default MenuOfTheDay;
