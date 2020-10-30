import { useState } from 'react';
import useForm from '@utils/useForm'
import {
    searchCategories as searchCategoriesAPI,
    searchIngredients as searchIngredientsAPI,
} from 'api/services/DishRequests'
import {
    Form,
    Label,
    TextInput,
    Select,
    Chips,
    ToolBar,
    Button,
} from '@ui-components/atoms'

interface Props {
    labels?: {
        recipeName?: string
        categoryName?: string
        ingredientsName?: string
        validateButton?: string
        abortButton?: string
    }
    defaultValues?: {
        recipeName?: string
        categoryName?: string
        ingredientsName?: ReadonlyArray<string>
    }
    onAbort: () => void
    onValidate: ({ name, category, ingredients }) => void
}

export default function RecipeForm({
    labels: {
        recipeName: recipeNameLabel = 'Choose a recipe name',
        categoryName: categoryNameLabel = 'Choose a category',
        ingredientsName: ingredientsNameLabel = 'Pick some ingredients',
        validateButton: validateButtonLabel = 'Confirm',
        abortButton: abortButtonLabel = 'Abort',
    } = {},
    defaultValues: {
        recipeName: defaultRecipeName = '',
        categoryName: defaultCategoryName = '',
        ingredientsName: defaultIngredientsName = [],
    } = {},
    onAbort,
    onValidate,
}: Props) {
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [ingredientsOptions, setIngredientsOptions] = useState([])

    const { value: recipeNameValue, setValue: onRecipeNameChange } = useForm({
        defaultValue: defaultRecipeName,
    })
    const {
        value: categoryNameValue,
        setValue: onCategoryNameChange,
    } = useForm({
        defaultValue: defaultCategoryName,
    })
    const {
        value: ingredientsNameValues,
        setValue: onIngredientNameChange,
    } = useForm({
        defaultValue: defaultIngredientsName,
    })

    return (
        <Form>
            <Label component="strong">{recipeNameLabel}</Label>

            <TextInput
                onChange={(event) => {
                    onRecipeNameChange(event.target.value)
                }}
                value={recipeNameValue}
            />

            <Label component="strong">{categoryNameLabel}</Label>

            <Select
                onChange={(event) => {
                    searchCategoriesAPI({ q: event.target.value }).then(
                        (categories) => {
                            setCategoriesOptions(
                                categories.map(({ name }) => ({
                                    label: name,
                                    value: name,
                                }))
                            )
                        }
                    )
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
                    searchIngredientsAPI({ q: event.target.value }).then(
                        (ingredients) => {
                            setIngredientsOptions(
                                ingredients.map(({ name }) => ({
                                    label: name,
                                    value: name,
                                }))
                            )
                        }
                    )
                }}
                onOptionClick={(name) => {
                    onIngredientNameChange((prevState) => [...prevState, name])
                }}
                options={ingredientsOptions}
            />

            {ingredientsNameValues.map((ingredientName) => (
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

                <Button
                    onClick={() => {
                        if (
                            recipeNameValue === '' ||
                            categoryNameValue === '' ||
                            ingredientsNameValues.length === 0
                        ) {
                            // show validation errors
                            return
                        }

                        onValidate({
                            name: recipeNameValue,
                            category: categoryNameValue,
                            ingredients: ingredientsNameValues,
                        })
                    }}
                >
                    {validateButtonLabel}
                </Button>
            </ToolBar>
        </Form>
    )
}
