import React, { ChangeEvent } from 'react'
import Form from '@ui-components/atoms/Form'
import Label from '@ui-components/atoms/Label'
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
    onRecipeNameChange: (event: ChangeEvent<HTMLInputElement>) => void
    onCategoryNameChange: (event: ChangeEvent<HTMLInputElement>) => void
    onIngredientNameChange: (event: ChangeEvent<HTMLInputElement>) => void
    values: {
        recipe: string
        category: string
        ingredients: ReadonlyArray<string>
    }
    dishes: ReadonlyArray<Dish>
    matchedDishes: ReadonlyArray<Dish>
    categories: ReadonlyArray<Category>
    ingredients: ReadonlyArray<Ingredient>
    onDishOptionClick: ({ name }) => void
    onCategoryOptionClick: ({ name }) => void
    onIngredientOptionClick: ({ name }) => void
    onCloseIngredientChips: ({ ingredientName }) => void
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
    return (
        <Form>
            <Label component="strong">{recipeNameLabel}</Label>

            <Select
                onChange={onRecipeNameChange}
                value={recipeNameValue}
                onOptionClick={({ name }) => {
                    onDishOptionClick({ name })
                }}
                items={dishes}
            />

            <Label component="strong">{categoryNameLabel}</Label>

            <Select
                onChange={onCategoryNameChange}
                value={categoryNameValue}
                onOptionClick={({ name }) => {
                    onCategoryOptionClick({ name })
                }}
                items={categories}
            />

            <Label component="strong">{ingredientsNameLabel}</Label>

            <Select
                onChange={onIngredientNameChange}
                onOptionClick={({ name }) => {
                    onIngredientOptionClick({ name })
                }}
                items={ingredients}
            />

            {ingredientsValues.map((ingredientName) => (
                <Chips
                    key={ingredientName}
                    onClose={() => onCloseIngredientChips({ ingredientName })}
                >
                    {ingredientName}
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
