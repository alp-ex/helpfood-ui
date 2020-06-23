import React, { ReactElement, useState, useRef } from 'react'
import ToolBar from 'lib/ui-components/ToolBar'
import SelectListView from 'lib/ui-components/SelectListView'
import { getWeekDaysFromNow } from '@utils/Dates'
import Button from 'lib/ui-components/Button'
import { createPortal } from 'react-dom'
import FullScreenDialog from 'lib/ui-components/FullScreenDialog'
import Form from 'lib/ui-components/Form'
import SearchInput from 'lib/ui-components/SearchInput'
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
import MenuList from 'lib/ui-components/MenuList'
import Chips from 'lib/ui-components/Chips'
import Label from 'lib/ui-components/Label'

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
    const [currentDay, setCurrentDay] = useState(weekDays[0])
    const previousTouchMovePageY = useRef(null)

    const [dialogToRender, setDialogToDisplay] = useState(null)
    console.log(dialogToRender)
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

    const renderWeekDaysSelectListView = () => (
        <SelectListView
            style={{
                option: {
                    flex: '1 1 0%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
            selectedIndex={currentDay}
            onOptionClick={(_, { optionId }) => setCurrentDay(optionId)}
            options={weekDays.map((weekDay) => ({
                render: () => <span>{weekDay}</span>,
                id: weekDay,
            }))}
            onOptionMouseOver={(_, { optionId }) => {
                setCurrentDay(optionId)
            }}
            onMouseUp={() => setDialogToDisplay(null)}
        />
    )
    const renderCurrentDayPicker = () => (
        <Button
            noBorders
            onMouseDown={() => {
                setDialogToDisplay(() => renderWeekDaysSelectListView())
            }}
            onTouchStart={() => {
                setDialogToDisplay(() => renderWeekDaysSelectListView())
            }}
            onTouchEnd={() => setDialogToDisplay(null)}
            onTouchMove={(event) => {
                const inch = event.targetTouches[0]

                if (
                    previousTouchMovePageY.current &&
                    previousTouchMovePageY.current > inch.pageY
                ) {
                    setCurrentDay((prevState) => {
                        const prevDayIndex = weekDays.findIndex(
                            (weekDay) => weekDay === prevState
                        )
                        return prevDayIndex < weekDays.length - 1
                            ? weekDays[prevDayIndex + 1]
                            : prevState
                    })
                }

                if (
                    previousTouchMovePageY.current &&
                    previousTouchMovePageY.current < inch.pageY
                ) {
                    setCurrentDay((prevState) => {
                        const prevDayIndex = weekDays.findIndex(
                            (weekDay) => weekDay === prevState
                        )

                        return prevDayIndex > 0
                            ? weekDays[prevDayIndex - 1]
                            : prevState
                    })
                }

                previousTouchMovePageY.current = inch.pageY
            }}
        >
            {currentDay}
        </Button>
    )
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
                                            day: currentDay,
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
                {dishesWeekPlan[currentDay.toLowerCase()].dishes.map(
                    ({ id, name }) => (
                        <li key={id}>
                            <Chips
                                onClose={() => {
                                    removeDishFromPlan({
                                        dish: {
                                            id,
                                            day: currentDay,
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
        <Button
            onClick={() =>
                setDialogToDisplay(() => (
                    <>
                        <span>cacoune</span>
                        {renderEditDishForm()}
                    </>
                ))
            }
        >
            GO
        </Button>
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
                {renderCurrentDayPicker()}

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
                                    {renderCurrentDayPicker()}

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
