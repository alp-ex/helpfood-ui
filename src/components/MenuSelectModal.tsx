import React, {
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState,
  ChangeEvent
} from "react";

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

interface Props {
  onCloseModal: () => void;
  onChooseRecipeClick: (recipe: Recipe) => void;
  recipes: ReadonlyArray<Recipe>;
  defaultRecipe: Recipe;
}

const Recipe_Filters = {
  VEGAN: "isVegan",
  VEGETARIAN: "isVegetarian"
};

const recipeFilters = [
  { name: Recipe_Filters.VEGETARIAN, value: false, label: "vegetarian" },
  { name: Recipe_Filters.VEGAN, value: false, label: "vegan" }
];

const MenuSelectModal = ({
  onCloseModal,
  recipes,
  defaultRecipe,
  onChooseRecipeClick
}: Props) => {
  const modalBoxInput = useRef(null);
  const [selectedRecipe, setSelectedRecipe] = useState(defaultRecipe);
  const [isVeganFilterSelected, setIsVeganFilterSelected] = useState(false);
  const [isVegetarianFilterSelected, setIsVegetarianFilterSelected] = useState(
    false
  );
  const handleModalBoxClick = (event: MouseEvent) => {
    event.stopPropagation();
  };
  const handleModalBoxKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
  };
  const handleModalBoxFocus = (event: FocusEvent) => {
    console.log("je focus les gars");
  };
  const handleModalBoxBlur = (event: FocusEvent) => {
    console.log("je blur les gars");
  };
  const handleCheckBoxStatusChanged = (
    _event: ChangeEvent,
    recipeFilter: string
  ) => {
    switch (recipeFilter) {
      case Recipe_Filters.VEGETARIAN:
        return setIsVegetarianFilterSelected(!isVegetarianFilterSelected);
      case Recipe_Filters.VEGAN:
        return setIsVeganFilterSelected(!isVeganFilterSelected);
      default:
        throw "should be one of knowed recipe filter";
    }
  };
  const isRecipeFilterChecked = (recipeFilter: string) => {
    switch (recipeFilter) {
      case Recipe_Filters.VEGETARIAN:
        return isVegetarianFilterSelected;
      case Recipe_Filters.VEGAN:
        return isVeganFilterSelected;
      default:
        throw "should be one of knowed recipe filter";
    }
  };
  const handleChooseRecipeClick = () => {
    onChooseRecipeClick(selectedRecipe);
  };
  const handleSelectOptionClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    modalBoxInput.current.focus();
  }, [modalBoxInput]);

  return (
    <div
      onClick={onCloseModal}
      style={{
        position: "fixed",
        background: "hsl(0, 0%, 60%, 0.6)",
        height: "100%",
        width: "100%",
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        onFocus={handleModalBoxFocus}
        onBlur={handleModalBoxBlur}
        onClick={handleModalBoxClick}
        onKeyDown={handleModalBoxKeyDown}
        style={{
          height: "75%",
          width: "61%",
          background: "white",
          borderRadius: "20em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <ul style={{ display: "flex" }}>
          {recipeFilters.map(recipeFilter => (
            <li key={recipeFilter.name}>
              <input
                type="checkbox"
                onChange={evt =>
                  handleCheckBoxStatusChanged(evt, recipeFilter.name)
                }
                checked={isRecipeFilterChecked(recipeFilter.name)}
              />
              <span>{recipeFilter.label}</span>
            </li>
          ))}
        </ul>
        <select ref={modalBoxInput}>
          {recipes
            .filter(recipe => {
              if (!isVeganFilterSelected && !isVegetarianFilterSelected) {
                return recipe;
              }

              return (
                (isVeganFilterSelected && recipe.isVegan) ||
                (isVegetarianFilterSelected && recipe.isVegetarian)
              );
            })
            .map(recipe => (
              <option
                onClick={() => handleSelectOptionClick(recipe)}
                key={recipe.name}
              >
                {recipe.name}
              </option>
            ))}
        </select>
        <button
          style={{
            borderRadius: "0.5em"
          }}
          onClick={handleChooseRecipeClick}
        >
          Choose
        </button>
      </div>
    </div>
  );
};

export default MenuSelectModal;
