import React, { ChangeEvent } from 'react'
import Form from '@ui-components/atoms/Form'
import Label from '@ui-components/atoms/Label'
import SearchInput from '@ui-components/atoms/SearchInput'
import MenuList from '@ui-components/molecules/MenuList'
import Chips from '@ui-components/atoms/Chips'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'
import { Ingredient, Dish, Category } from 'api/dishes/types'
import Select from '../Select'

interface Props {
    labels: {
        recipeName: string
        categoryName: string
        ingredientsName: string
        abort: string
        editDish: string
        createDish: string
    }
    onRecipeNameChange: (event: ChangeEvent) => void
    onCategoryNameChange: (event: ChangeEvent) => void
    onIngredientNameChange: (event: ChangeEvent) => void
    values: {
        recipe: string
        category: string
        ingredients: ReadonlyArray<string>
    }
    dishes: ReadonlyArray<Dish>
    matchedDishes: ReadonlyArray<Dish>
    categories: ReadonlyArray<Category>
    ingredients: ReadonlyArray<Ingredient>
    onDishOptionClick: ({ id, name }) => void
    onCategoryOptionClick: ({ id, name }) => void
    onIngredientOptionClick: ({ id, name }) => void
    onCloseIngredientChips: ({ id }) => void
    onAbort: () => void
    onEditDishButtonClick: () => void
    onCreateDishButtonClick: () => void
}

const EditRecipeForm = ({
    labels: {
        recipeName: recipeNameLabel,
        categoryName: categoryNameLabel,
        ingredientsName: ingredientsNameLabel,
        abort: abortLabel,
        editDish: editDishLabel,
        createDish: createDishLabel,
    },
    onRecipeNameChange,
    onCategoryNameChange,
    onIngredientNameChange,
    dishes,
    matchedDishes,
    categories,
    ingredients,
    values: {
        recipe: recipeNameValue,
        category: categoryNameValue,
        ingredients: ingredientsValues,
    },
    onDishOptionClick,
    onCategoryOptionClick,
    onIngredientOptionClick,
    onCloseIngredientChips,
    onAbort,
    onEditDishButtonClick,
    onCreateDishButtonClick,
}: Props) => {
    console.log(ingredientsValues)
    return (
        <Form>
            <Label component="strong">{recipeNameLabel}</Label>

            <Select
                onChange={onRecipeNameChange}
                value={recipeNameValue}
                onOptionClick={({ id, name }) => {
                    onDishOptionClick({ id, name })
                }}
                items={dishes}
            />

            <Label component="strong">{categoryNameLabel}</Label>

            <Select
                onChange={onCategoryNameChange}
                value={categoryNameValue}
                onOptionClick={({ id, name }) => {
                    onCategoryOptionClick({ id, name })
                }}
                items={categories}
            />

            <Label component="strong">{ingredientsNameLabel}</Label>

            <Select
                onChange={onIngredientNameChange}
                onOptionClick={({ id, name }) => {
                    onIngredientOptionClick({ id, name })
                }}
                items={ingredients}
                // value={ingredientNameValue}
            />

            {ingredientsValues.map((ingredient) => (
                <Chips
                    key={ingredient}
                    onClose={() => onCloseIngredientChips({ id })}
                >
                    {ingredient}
                </Chips>
            ))}

            <ToolBar
                style={{
                    root: {
                        position: 'fixed',
                        bottom: '1em',
                        justifyContent: 'space-around',
                        width: '100%',
                    },
                }}
            >
                <Button onClick={onAbort}>{abortLabel}</Button>

                {matchedDishes.find((dish) => dish.name === recipeNameValue) ? (
                    <Button onClick={onEditDishButtonClick}>
                        {editDishLabel}
                    </Button>
                ) : (
                    <Button onClick={onCreateDishButtonClick}>
                        {createDishLabel}
                    </Button>
                )}
            </ToolBar>
        </Form>
    )
}

export default EditRecipeForm
