import React, { ReactElement, useState, useRef } from 'react'
import ToolBar from '@ui-components/atoms/ToolBar'
import SelectListView from '@ui-components/molecules/SelectListView'
import { getWeekDaysFromNow } from '@utils/Dates'
import Button from '@ui-components/atoms/Button'
import { createPortal } from 'react-dom'
import FullScreenDialog from '@ui-components/molecules/FullScreenDialog'
import Form from '@ui-components/atoms/Form'
import SearchInput from '@ui-components/atoms/SearchInput'
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
import MenuList from '@ui-components/molecules/MenuList'
import Chips from '@ui-components/atoms/Chips'
import Label from '@ui-components/atoms/Label'
import WeekDayPicker from '@ui-components/molecules/WeekDayPicker'

const msg = new Map([
    ['settings', 'Settings'],
    ['edit plan', 'Edit plan'],
    ['edit recipes', 'Edit recipes'],
    ['type a dish name', 'Type a dish name'],
    ['type an ingredient name', 'Type an ingredient name'],
    ['type a category name', 'Type a category name'],
    ['type a dish plan', 'Type a dish plan'],
    ['finish', 'Finish'],
    ['undo changes', 'Undo changes'],
    ['name', 'Name'],
    ["don't save", "Don't save"],
    ['save', 'Save'],
    ['category', 'Category'],
    ['ingredients', 'Ingredients'],
    ['clear all', 'Clear all'],
])

export default function DishPlan(): ReactElement {
    const weekDays = getWeekDaysFromNow()
    const [dialogToRender, setDialogToDisplay] = useState(null)
    const [pickedDay, pickDay] = useState(weekDays[0])

    const [
        shouldDisplayEditDishMenuList,
        setShouldDisplayEditDishMenuList,
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
        dishMatch: fetchedDishMatch,
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

    const renderEditDishForm = () => (
        <Form>
            <SearchInput
                placeholder={msg.get('type a dish name')}
                onChange={handleDishSearchInputChange}
                onFocus={() => setShouldDisplayEditDishMenuList(true)}
                onBlur={() => setShouldDisplayEditDishMenuList(false)}
            />

            {shouldDisplayEditDishMenuList ? (
                <MenuList
                    style={{
                        root: {
                            width: 'fit-content',
                            marginTop: '0.7em',
                            zIndex: 700,
                        },
                    }}
                >
                    {fetchedDishes.map(
                        ({ id, name, ingredients, category }) => (
                            <MenuList.Item
                                key={id}
                                onClick={() => {
                                    addDishToPlan({
                                        dish: {
                                            id,
                                            name,
                                            day: pickedDay,
                                            ingredients,
                                            category,
                                        },
                                        dispatch: dishesPlanDispatch,
                                    })
                                }}
                            >
                                {name}
                            </MenuList.Item>
                        )
                    )}
                </MenuList>
            ) : null}

            <Chips.List>
                {dishesWeekPlan[pickedDay.toLowerCase()].dishes.map(
                    ({ id, name }) => (
                        <li key={id}>
                            <Chips
                                onClose={() => {
                                    removeDishFromPlan({
                                        dish: {
                                            id,
                                            day: pickedDay,
                                        },
                                        dispatch: dishesPlanDispatch,
                                    })
                                }}
                            >
                                {name}
                            </Chips>
                        </li>
                    )
                )}
            </Chips.List>

            <ToolBar>
                <Button
                    onClick={() => {
                        setDialogToDisplay(null)
                    }}
                >
                    {msg.get('finish')}
                </Button>
            </ToolBar>
        </Form>
    )

    return (
        <>
            <ToolBar
                style={{
                    root: {
                        top: 0,
                        position: 'fixed',
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <WeekDayPicker
                    weekDays={weekDays}
                    pickDay={pickDay}
                    pickedDay={pickedDay}
                />

                <Button noBorders>{msg.get('settings')}</Button>
            </ToolBar>

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
                        setDialogToDisplay(() => (
                            <>
                                <ToolBar>
                                    <WeekDayPicker
                                        weekDays={weekDays}
                                        pickDay={pickDay}
                                        pickedDay={pickedDay}
                                    />

                                    {msg.get('edit plan')}
                                </ToolBar>

                                {renderEditDishForm()}
                            </>
                        ))
                    }}
                >
                    {msg.get('edit plan')}
                </Button>

                <Button
                    noBorders
                    onClick={() => {
                        setDialogToDisplay(() => (
                            <>
                                <ToolBar>
                                    <Label>{msg.get('edit dish')}</Label>
                                </ToolBar>

                                <Form>
                                    <Label component="strong">
                                        {msg.get('name')}
                                    </Label>

                                    <SearchInput
                                        placeholder={msg.get(
                                            'type a dish name'
                                        )}
                                        onChange={handleDishSearchInputChange}
                                        value={dishNameBeingEdited.name}
                                    />

                                    {fetchedDishes.length > 0 ? (
                                        <MenuList
                                            style={{
                                                root: {
                                                    width: 'fit-content',
                                                    marginTop: '0.7em',
                                                },
                                            }}
                                        >
                                            {fetchedDishes.map(
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        key={id}
                                                        onClick={() => {
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
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    <Label component="strong">
                                        {msg.get('category')}
                                    </Label>

                                    <SearchInput
                                        placeholder={msg.get(
                                            'type a category name'
                                        )}
                                        onChange={
                                            handleCategorySearchInputChange
                                        }
                                        value={dishCategoryBeingEdited.name}
                                    />

                                    {fetchedDishesCategories.length > 0 ? (
                                        <MenuList
                                            style={{
                                                root: {
                                                    width: 'fit-content',
                                                    marginTop: '0.7em',
                                                },
                                            }}
                                        >
                                            {fetchedDishesCategories.map(
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        key={id}
                                                        onClick={() =>
                                                            updateDishBeingEditedValues(
                                                                (oldState) => ({
                                                                    ...oldState,
                                                                    dishCategoryBeingEdited: {
                                                                        id,
                                                                        name,
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    <Label component="strong">
                                        {msg.get('ingredients')}
                                    </Label>

                                    <SearchInput
                                        placeholder={msg.get(
                                            'type an ingredient name'
                                        )}
                                        onChange={
                                            handleIngredientSearchInputChange
                                        }
                                    />

                                    {fetchedDishesIngredients.length > 0 ? (
                                        <MenuList
                                            style={{
                                                root: {
                                                    width: 'fit-content',
                                                    marginTop: '0.7em',
                                                },
                                            }}
                                        >
                                            {fetchedDishesIngredients.map(
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        key={id}
                                                        onClick={() => {
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
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    {dishIngredientsBeingEdited.map(
                                        ({ id, name }) => (
                                            <Chips
                                                key={id}
                                                onClose={() =>
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
                                                }
                                            >
                                                {name}
                                            </Chips>
                                        )
                                    )}

                                    <ToolBar>
                                        <Button
                                            onClick={() => {
                                                setDialogToDisplay(null)
                                            }}
                                        >
                                            {msg.get("don't save")}
                                        </Button>

                                        {fetchedDishMatch.name ===
                                        dishNameBeingEdited.name ? (
                                            <Button
                                                onClick={() => {
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
                                            >
                                                {msg.get('edit')}
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => {
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
                                            >
                                                {msg.get('save')}
                                            </Button>
                                        )}
                                    </ToolBar>
                                </Form>
                            </>
                        ))
                    }}
                >
                    {msg.get('edit recipes')}
                </Button>
            </ToolBar>

            {dialogToRender
                ? createPortal(
                      <FullScreenDialog>{dialogToRender}</FullScreenDialog>,
                      document.body
                  )
                : null}
        </>
    )
}
