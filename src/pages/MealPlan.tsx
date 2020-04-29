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

const MealPlan = () => {
  const currentWeekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
  }).format(Date.now());
  // const [selectedMeals, setSelectedMeals] = useState([meals[0], meals[1]]);
  // const [currentTypeOfMeal, setCurrentTypeOfMeal] = useState(null);
  const [currentDay, setCurrentDay] = useState(currentWeekDay);
  // const [modalDisplayed, setModalDisplayed] = useState(false);
  const handleCurrentDayChange = (day: string) => setCurrentDay(day);
  // const handleSelectMenuButtonClick = (typeOfMeal: string) => {
  //   setCurrentTypeOfMeal(typeOfMeal);
  //   setModalDisplayed(true);
  // };
  // const handleCloseModal = () => setModalDisplayed(false);
  // const handleChooseRecipeClick = (recipe: Recipe) => {
  //   const modifiedSelectedMeals = selectedMeals.map((meal: Meal) =>
  //     meal.typeOfMeal === currentTypeOfMeal ? { ...meal, recipe: recipe } : meal
  //   );
  //   setSelectedMeals(modifiedSelectedMeals);
  // };

  const { antipasti, mainCourses } = {
    antipasti: [{ name: 'Jamon de Parma', ingredients: ['jamon', 'oil'] }],
    mainCourses: [{ name: 'carrotPie', ingredients: ['carrot', 'eggs', 'cream'] }],
  }

  return (
    <>
      <ScheduleNav
        hsl={{
          hue: getUserHue() || 0,
          // this value should be based on the filling percentage of the schedule
          luminosity: 50
        }}
        currentDay={currentDay}
        onChange={handleCurrentDayChange}
      />

      <DailyMenu>
        <DailyMenu.Section>
          <DailyMenu.Section.Title />
          <DailyMenu.Antipasti />
        </DailyMenu.Section>

        <DailyMenu.Section>
          <DailyMenu.Section.Title />
          <DailyMenu.MainCourse />
        </DailyMenu.Section>

        <DailyMenu.Section>
          <DailyMenu.Section.Title />
          <DailyMenu.Dessert />
        </DailyMenu.Section>

        <DailyMenu.Section>
          <DailyMenu.Section.Title />
          <DailyMenu.Drinks />
        </DailyMenu.Section>
      </DailyMenu>

      {/* <div>
        <h4>Antipastis</h4>
        <strong>Jamon de palma</strong>
        <span>Jamon, oil</span>
      </div>
      <div>
        <h4>Dishes</h4>
        <strong>Carot pie</strong>
        <span>Carots, eggs, cream, origan</span>
        <strong>Mountain Duck</strong>
        <span>potatoes, duck, spinachs, cream, honey, pepper</span>
      </div>
      <div>
        <h4>Desserts</h4>
        <strong>Banana bread</strong>
        <span>banana, eggs, flour</span>
        <strong>Pancakes</strong>
        <span>eggs, milk, flour</span>
      </div>
      <div>
        <h4>Drinks</h4>
        <strong>Citronnade</strong>
        <span>citron, mint, ginger</span>
        <strong>Milkshake</strong>
        <span>kinder bueno, milk, ice</span>
      </div> */}
      {/* <MenuOfTheDay
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
      )} */}
    </>
  );
};

export default MealPlan;
