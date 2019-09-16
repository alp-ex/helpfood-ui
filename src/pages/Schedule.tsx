import React, { useState } from "react";
import ScheduleNav from "@components/ScheduleNav";
import MenuOfTheDay from "@components/MenuOfTheDay";
import MenuSelectModal from "@components/MenuSelectModal";
import { getUserHue } from "../services/getUserInformations";
import { meals, recipes } from "../fixtures";

interface Recipe {
  name: string;
  description: string;
  steps: ReadonlyArray<string>;
  ingredients: ReadonlyArray<{
    name: string;
    meat: boolean;
    from_animals: boolean;
    dairy_product: boolean;
    pregnant_compliant: boolean;
  }>;
}

interface Meal {
  user: string;
  weekday: string;
  typeOfMeal: string;
  recipe: Recipe;
  confirmed: boolean;
}

const Schedule = () => {
  const currentWeekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
  }).format(Date.now());
  const [selectedMeals, setSelectedMeals] = useState([meals[0], meals[1]]);
  const [currentTypeOfMeal, setCurrentTypeOfMeal] = useState(null);
  const [currentDay, setCurrentDay] = useState(currentWeekDay);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const handleClickOnDay = (day: string) => setCurrentDay(day);
  const handleSelectMenuButtonClick = (typeOfMeal: string) => {
    setCurrentTypeOfMeal(typeOfMeal);
    setModalDisplayed(true);
  };
  const handleCloseModal = () => setModalDisplayed(false);
  const handleChooseRecipeClick = (recipe: Recipe) => {
    const modifiedSelectedMeals = selectedMeals.map((meal: Meal) =>
      meal.typeOfMeal === currentTypeOfMeal ? { ...meal, recipe: recipe } : meal
    );
    setSelectedMeals(modifiedSelectedMeals);
  };

  return (
    <>
      <ScheduleNav
        hue={getUserHue() || 0}
        // this value should be based on the filling percentage of the schedule
        luminosity={50}
        currentDay={currentDay}
        onDayChoose={handleClickOnDay}
      />
      <MenuOfTheDay
        selectedMeals={selectedMeals}
        onSelectMenuButtonClick={handleSelectMenuButtonClick}
        hue={getUserHue() || 0}
      />
      {modalDisplayed && (
        <MenuSelectModal
          defaultRecipe={
            selectedMeals.find(
              (meal: Meal) => meal.typeOfMeal === currentTypeOfMeal
            ).recipe
          }
          onChooseRecipeClick={handleChooseRecipeClick}
          recipes={recipes}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Schedule;
