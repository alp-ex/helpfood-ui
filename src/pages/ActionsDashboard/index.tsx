import React, { useState, ReactElement } from 'react'
import { createPortal } from 'react-dom'
import FullScreenDialog from '@ui-components/molecules/FullScreenDialog'
import {
    fetchDishes,
    fetchCategories,
    fetchIngredients,
    addDish,
    editDish,
    useDishesState,
    useDishesDispatch,
} from 'api/dishes/context'
import {
    addDishToPlan,
    removeDishFromPlan,
    useDishPlanState,
    useDishPlanDispatch,
} from 'api/dishPlan/context'
import debounce from '@utils/debounce'
import Label from '@ui-components/atoms/Label'
import EditRecipeForm from 'pages/ActionsDashboard/ui-components/EditRecipeForm'
import EditDishPlanForm from 'pages/ActionsDashboard/ui-components/EditDishPlanForm'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'
import { useCalendarState } from 'api/calendar/context'
import { Routes } from 'Router'
import { Link } from 'react-router-dom'
import useForm from '@utils/useForm'

interface Props {}

const msg = new Map([
    ['actions', 'Actions'],
    ['edit plan', 'Edit plan'],
    ['edit recipes', 'Edit recipes'],
    ['edit dish', 'Edit dish'],
    ['finish', 'Finish'],
    ['undo changes', 'Undo changes'],
    ['name', 'Name'],
    ['back', 'Back'],
    ["don't save", "Don't save"],
    ['save', 'Save'],
    ['edit', 'Edit'],
    ['create', 'Create'],
    ['category', 'Category'],
    ['ingredients', 'Ingredients'],
    ['clear all', 'Clear all'],
])

export default function ActionsDashboard(): ReactElement {
    const { currentDay } = useCalendarState()
    const [
        shouldDisplayEditRecipeDialog,
        setShouldDisplayEditRecipeDialog,
    ] = useState(false)
    const [
        shouldDisplayEditPlanDialog,
        setShouldDisplayEditPlanDialog,
    ] = useState(false)
    const [
        shouldDisplaySearchDishMenuList,
        setShouldDisplaySearchDishMenuList,
    ] = useState(false)

    const {
        values: {
            recipeIngredientsValue,
            recipeCategoryValue,
            recipeNameValue,
        },
        setValues: updateRecipeFormValues,
    } = useForm({
        defaultValues: {
            recipeIngredientsValue: [],
            recipeCategoryValue: '',
            recipeNameValue: '',
        },
    })

    const {
        matchedDishes: fetchedMatchedDishes,
        dishes: fetchedDishes,
        categories: fetchedDishesCategories,
        ingredients: fetchedDishesIngredients,
    } = useDishesState()
    const { dishesWeekPlan } = useDishPlanState()
    const dishesDispatch = useDishesDispatch()
    const dishesPlanDispatch = useDishPlanDispatch()

    const handleDishSearchInputChange = (event) => {
        debounce({
            cb: () =>
                fetchDishes({
                    dispatch: dishesDispatch,
                    q: event.target.value,
                }),
        })
    }
    const handleCategorySearchInputChange = (event) => {
        debounce({
            cb: () =>
                fetchCategories({
                    q: event.target.value,
                    dispatch: dishesDispatch,
                }),
        })
    }
    const handleIngredientSearchInputChange = (event) => {
        debounce({
            cb: () =>
                fetchIngredients({
                    q: event.target.value,
                    dispatch: dishesDispatch,
                }),
        })
    }

    return (
        <>
            <Link to={Routes.ROOT}>
                <Button noBorders>{msg.get('back')}</Button>
            </Link>

            <Button
                noBorders
                onClick={() => {
                    setShouldDisplayEditPlanDialog(true)
                }}
            >
                {msg.get('edit plan')}
            </Button>

            <Button
                noBorders
                onClick={() => {
                    setShouldDisplayEditRecipeDialog(true)
                }}
            >
                {msg.get('edit recipes')}
            </Button>

            {shouldDisplayEditPlanDialog ? (
                <FullScreenDialog>
                    <ToolBar
                        style={{
                            root: { justifyContent: 'center' },
                        }}
                    >
                        <Label>{currentDay}</Label>
                    </ToolBar>

                    <EditDishPlanForm
                        labels={{
                            onSubmit: msg.get('finish'),
                        }}
                        onDishSearchTermChange={handleDishSearchInputChange}
                        plan={dishesWeekPlan[currentDay.toLowerCase()]}
                        onSubmit={() => {
                            setShouldDisplayEditPlanDialog(false)
                        }}
                        onSearchDishOptionClick={({
                            id,
                            ingredients,
                            category,
                        }) => {
                            addDishToPlan({
                                dish: {
                                    id,
                                    name,
                                    day: currentDay.toLowerCase(),
                                    ingredients,
                                    category,
                                },
                                dispatch: dishesPlanDispatch,
                            })
                        }}
                        onCloseDishChips={({ id }) => {
                            removeDishFromPlan({
                                dish: {
                                    id,
                                    day: currentDay.toLowerCase(),
                                },
                                dispatch: dishesPlanDispatch,
                            })
                        }}
                        shouldDisplaySearchDishMenuList={
                            shouldDisplaySearchDishMenuList
                        }
                        searchDishMenuListOptions={fetchedDishes}
                        onSearchInputFocus={() =>
                            setShouldDisplaySearchDishMenuList(true)
                        }
                        onSearchInputBlur={() =>
                            setShouldDisplaySearchDishMenuList(false)
                        }
                    />
                </FullScreenDialog>
            ) : null}

            {shouldDisplayEditRecipeDialog ? (
                <FullScreenDialog>
                    <EditRecipeForm
                        labels={{
                            recipeName: msg.get('name'),
                            categoryName: msg.get('category'),
                            ingredientsName: msg.get('ingredients'),
                            abort: msg.get("don't save"),
                            editDish: msg.get('edit'),
                            createDish: msg.get('create'),
                        }}
                        onRecipeNameChange={(event) =>
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeNameValue: event.target.value,
                            }))
                        }
                        onCategoryNameChange={(event) =>
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeCategoryValue: event.target.value,
                            }))
                        }
                        onIngredientNameChange={(event) =>
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeIngredientsValue: [
                                    ...oldState.recipeIngredientsValue,
                                    event.target.value,
                                ],
                            }))
                        }
                        values={{
                            recipe: recipeNameValue,
                            category: recipeCategoryValue,
                            ingredients: recipeIngredientsValue,
                        }}
                        dishes={fetchedDishes}
                        matchedDishes={fetchedMatchedDishes}
                        categories={fetchedDishesCategories}
                        ingredients={fetchedDishesIngredients}
                        onDishOptionClick={({ name }) => {
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeNameValue: name,
                            }))
                        }}
                        onCategoryOptionClick={({ name }) => {
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeCategoryValue: name,
                            }))
                        }}
                        onIngredientOptionClick={({ name }) => {
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeIngredientsValue: [
                                    ...oldState.recipeIngredientsValue,
                                    name,
                                ],
                            }))
                        }}
                        onCloseIngredientChips={({ id }) => {
                            updateRecipeFormValues((oldState) => ({
                                ...oldState,
                                recipeIngredientsValue: [
                                    ...oldState.recipeIngredientsValue.filter(
                                        ({ id: ingredientToRemoveId }) =>
                                            ingredientToRemoveId !== id
                                    ),
                                ],
                            }))
                        }}
                        onAbort={() => {
                            setShouldDisplayEditRecipeDialog(true)
                        }}
                        onEditDishButtonClick={() => {
                            editDish({
                                dispatch: dishesDispatch,
                                dish: {
                                    ingredients: recipeIngredientsValue,
                                    category: recipeCategoryValue,
                                    name: recipeNameValue,
                                },
                            })
                            setShouldDisplayEditRecipeDialog(true)
                        }}
                        onCreateDishButtonClick={() => {
                            addDish({
                                dispatch: dishesDispatch,
                                dish: {
                                    ingredients: recipeIngredientsValue,
                                    category: recipeCategoryValue,
                                    name: recipeNameValue,
                                },
                            })
                            setShouldDisplayEditRecipeDialog(true)
                        }}
                    />
                </FullScreenDialog>
            ) : null}
        </>
    )
}
