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

interface Props {}

const msg = new Map([
    ['actions', 'Actions'],
    ['edit plan', 'Edit plan'],
    ['edit recipes', 'Edit recipes'],
    ['edit dish', 'Edit dish'],
    ['finish', 'Finish'],
    ['undo changes', 'Undo changes'],
    ['name', 'Name'],
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
    const [dialogToRender, setDialogToDisplay] = useState(null)

    const [
        shouldDisplaySearchDishMenuList,
        setShouldDisplaySearchDishMenuList,
    ] = useState(false)
    const [
        {
            dishIdBeingEdited,
            dishIngredientsBeingEdited,
            dishCategoryBeingEdited,
            dishNameBeingEdited,
        },
        updateDishBeingEditedValues,
    ] = useState({
        dishIdBeingEdited: '',
        dishIngredientsBeingEdited: [],
        dishCategoryBeingEdited: { id: '', name: '' },
        dishNameBeingEdited: { id: '', name: '' },
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
            cb: fetchDishes({
                dispatch: dishesDispatch,
                q: event.target.value,
            }),
        })
    }
    const handleCategorySearchInputChange = (event) => {
        debounce({
            cb: fetchCategories({
                q: event.target.value,
                dispatch: dishesDispatch,
            }),
        })
    }
    const handleIngredientSearchInputChange = (event) => {
        debounce({
            cb: fetchIngredients({
                q: event.target.value,
                dispatch: dishesDispatch,
            }),
        })
    }

    return (
        <>
            <ToolBar
                style={{
                    root: {
                        bottom: 0,
                        position: 'fixed',
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Button
                    noBorders
                    onClick={() => {
                        setDialogToDisplay(() => {
                            return (
                                <FullScreenDialog>
                                    <ToolBar>
                                        <Label>{currentDay}</Label>
                                    </ToolBar>

                                    <EditDishPlanForm
                                        labels={{
                                            onSubmit: msg.get('finish'),
                                        }}
                                        onDishSearchTermChange={
                                            handleDishSearchInputChange
                                        }
                                        dishes={
                                            dishesWeekPlan[
                                                currentDay.toLowerCase()
                                            ].dishes
                                        }
                                        onSubmit={() => {
                                            setDialogToDisplay(null)
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
                                                    day: currentDay,
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
                                                    day: currentDay,
                                                },
                                                dispatch: dishesPlanDispatch,
                                            })
                                        }}
                                        shouldDisplaySearchDishMenuList={
                                            shouldDisplaySearchDishMenuList
                                        }
                                        searchDishMenuListOptions={
                                            fetchedDishes
                                        }
                                        onSearchInputFocus={() =>
                                            setShouldDisplaySearchDishMenuList(
                                                true
                                            )
                                        }
                                        onSearchInputBlur={() =>
                                            setShouldDisplaySearchDishMenuList(
                                                false
                                            )
                                        }
                                    />
                                </FullScreenDialog>
                            )
                        })
                    }}
                >
                    {msg.get('edit plan')}
                </Button>

                <Button
                    noBorders
                    onClick={() => {
                        setDialogToDisplay(() => (
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
                                    onRecipeNameChange={
                                        handleDishSearchInputChange
                                    }
                                    onCategoryNameChange={
                                        handleCategorySearchInputChange
                                    }
                                    onIngredientNameChange={
                                        handleIngredientSearchInputChange
                                    }
                                    values={{
                                        recipeName: dishNameBeingEdited.name,
                                        categoryName:
                                            dishCategoryBeingEdited.name,
                                        ingredients: dishIngredientsBeingEdited,
                                    }}
                                    dishes={fetchedDishes}
                                    matchedDishes={fetchedMatchedDishes}
                                    categories={fetchedDishesCategories}
                                    ingredients={fetchedDishesIngredients}
                                    onDishOptionClick={({ id, name }) => {
                                        updateDishBeingEditedValues(
                                            (oldState) => ({
                                                ...oldState,
                                                dishNameBeingEdited: {
                                                    id,
                                                    name,
                                                },
                                            })
                                        )
                                    }}
                                    onCategoryOptionClick={({ id, name }) => {
                                        updateDishBeingEditedValues(
                                            (oldState) => ({
                                                ...oldState,
                                                dishCategoryBeingEdited: {
                                                    id,
                                                    name,
                                                },
                                            })
                                        )
                                    }}
                                    onIngredientOptionClick={({ id, name }) => {
                                        updateDishBeingEditedValues(
                                            (oldState) => ({
                                                ...oldState,
                                                dishIngredientsBeingEdited: [
                                                    ...dishIngredientsBeingEdited,
                                                    {
                                                        id,
                                                        name,
                                                    },
                                                ],
                                            })
                                        )
                                    }}
                                    onCloseIngredientChips={({ id }) => {
                                        updateDishBeingEditedValues(
                                            (oldState) => ({
                                                ...oldState,
                                                dishIngredientsBeingEdited: [
                                                    ...oldState.dishIngredientsBeingEdited.filter(
                                                        ({
                                                            id: ingredientToRemoveId,
                                                        }) =>
                                                            ingredientToRemoveId !==
                                                            id
                                                    ),
                                                ],
                                            })
                                        )
                                    }}
                                    onAbort={() => {
                                        setDialogToDisplay(null)
                                    }}
                                    onEditDishButtonClick={() => {
                                        editDish({
                                            dispatch: dishesDispatch,
                                            dish: {
                                                id: dishIdBeingEdited,
                                                ingredients: dishIngredientsBeingEdited,
                                                category: dishCategoryBeingEdited,
                                                name: dishNameBeingEdited,
                                            },
                                        })
                                        setDialogToDisplay(null)
                                    }}
                                    onCreateDishButtonClick={() => {
                                        addDish({
                                            dispatch: dishesDispatch,
                                            dish: {
                                                ingredients: dishIngredientsBeingEdited,
                                                category: dishCategoryBeingEdited,
                                                name: dishNameBeingEdited,
                                            },
                                        })
                                        setDialogToDisplay(null)
                                    }}
                                />
                            </FullScreenDialog>
                        ))
                    }}
                >
                    {msg.get('edit recipes')}
                </Button>
            </ToolBar>

            {dialogToRender
                ? createPortal(dialogToRender, document.body)
                : null}
        </>
    )
}
