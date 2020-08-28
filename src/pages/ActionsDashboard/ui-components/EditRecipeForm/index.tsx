import React, { ChangeEvent, useState } from 'react'
import Form from './node_modules/@ui-components/atoms/Form'
import Label from './node_modules/@ui-components/atoms/Label'
import Chips from './node_modules/@ui-components/atoms/Chips'
import ToolBar from './node_modules/@ui-components/atoms/ToolBar'
import Button from './node_modules/@ui-components/atoms/Button'
import Select from '../Select'

interface Props {
    labels?: {
        recipeName?: string
        categoryName?: string
        ingredientsName?: string
        validateButton?: string
        abortButton?: string
    }
    options: {
        recipesOptions: ReadonlyArray<{ label: string; value: string }>
        categoriesOptions: ReadonlyArray<{ label: string; value: string }>
        ingredientsOptions: ReadonlyArray<{ label: string; value: string }>
    }
    values: {
        recipe: string
        category: string
        ingredients: ReadonlyArray<string>
    }
    onAbort: () => void
    onValidate: () => void
}

export default function RecipeForm({
    labels: {
        recipeName: recipeNameLabel = 'Choose a recipe name',
        categoryName: categoryNameLabel = 'Choose a category name',
        ingredientsName: ingredientsNameLabel = 'Pick some ingredients',
        validateButton: validateButtonLabel = 'Confirm',
        abortButton: abortButtonLabel = 'Abort',
    } = {},
    options: { recipesOptions, categoriesOptions, ingredientsOptions },
    onAbort,
    onValidate,
}: Props) {
    const [recipeNameValue, onRecipeNameChange] = useState('')
    const [categoryNameValue, onCategoryNameChange] = useState('')
    const [ingredientsValues, onIngredientNameChange] = useState([])

    return (
        <Form>
            <Label component="strong">{recipeNameLabel}</Label>

            <Select
                onChange={(event) => {
                    onRecipeNameChange(event.target.value)
                }}
                value={recipeNameValue}
                onOptionClick={(name) => {
                    onRecipeNameChange(name)
                }}
                options={recipesOptions}
            />

            <Label component="strong">{categoryNameLabel}</Label>

            <Select
                onChange={(event) => {
                    onCategoryNameChange(event.target.value)
                }}
                value={categoryNameValue}
                onOptionClick={(name) => {
                    onCategoryNameChange(name)
                }}
                options={categoriesOptions}
            />

            <Label component="strong">{ingredientsNameLabel}</Label>

            <Select
                onChange={(event) => {
                    onIngredientNameChange((prevState) => [
                        ...prevState,
                        event.target.value,
                    ])
                }}
                onOptionClick={(name) => {
                    onIngredientNameChange((prevState) => [...prevState, name])
                }}
                options={ingredientsOptions}
            />

            {ingredientsValues.map((ingredientName) => (
                <Chips
                    key={ingredientName}
                    onClose={() =>
                        onIngredientNameChange((prevState) =>
                            prevState.filter(
                                (ingredient) => ingredient !== ingredientName
                            )
                        )
                    }
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
                <Button onClick={onAbort}>{abortButtonLabel}</Button>

                <Button onClick={onValidate}>{validateButtonLabel}</Button>
            </ToolBar>
        </Form>
    )
}
