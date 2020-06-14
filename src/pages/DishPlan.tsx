import React, { ReactElement, useState, useCallback } from 'react'
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
    removeIngredientFromDish,
    useDishesState,
    useDishesDispatch,
} from 'api/dishes/DishesContext'
import {
    addDishToPlan,
    removeDishFromPlan,
    useDishPlanState,
    useDishPlanDispatch,
} from 'api/dishPlan/DishPlanContext'
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

interface Props {}

export default function DishPlan({}: Props): ReactElement {
    // we might want to add internationalisation this way :
    // const { t } = useContext(useI18nContext)
    // msg.forEach((msgToFormat) => msg.set(msgToFormat, t(msgToFormat)))

    const weekDays = getWeekDaysFromNow()
    const [currentDay, setCurrentDay] = useState(weekDays[0])
    const previousTouchMovePageY = React.useRef(null)
    const undoableActions = React.useRef([])

    const [renderDialog, setDialogToDisplay] = useState(null)
    const {
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

    const renderSelectListView = useCallback(
        () => (
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
        ),
        [currentDay]
    )

    const renderCurrentDayButton = () => (
        <Button
            noBorders
            onMouseDown={() => setDialogToDisplay(renderSelectListView())}
            onTouchStart={() => setDialogToDisplay(renderSelectListView())}
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
                {renderCurrentDayButton()}

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
                                    {renderCurrentDayButton()}

                                    {msg.get('edit plan')}
                                </ToolBar>

                                <Form>
                                    <SearchInput
                                        placeholder={msg.get(
                                            'type a dish name'
                                        )}
                                        onChange={handleDishSearchInputChange}
                                    />

                                    {fetchedDishes.length > 0 ? (
                                        <MenuList>
                                            {fetchedDishes.map(
                                                ({
                                                    id,
                                                    name,
                                                    ingredients,
                                                    category,
                                                }) => (
                                                    <MenuList.Item
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

                                    {dishesWeekPlan[currentDay].map(
                                        ({id, name}) => (
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
                                        )
                                    )}

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
                                    <Button
                                        onClick={() => {
                                            // empty form
                                        }}
                                    >
                                        {msg.get('clear all')}
                                    </Button>

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
                                    />

                                    {fetchedDishes.length > 0 ? (
                                        <MenuList>
                                            {fetchedDishes.map(
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        onClick={() => {
                                                          
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
                                    />

                                    {fetchedDishesCategories.length > 0 ? (
                                        <MenuList>
                                            {fetchedDishesCategories.map(
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        onClick={() =>
                                                        
                                                            
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
                                        <MenuList>
                                            {fetchedDishesIngredients.map(
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        onClick={() => {
                                                         
                                                        }}
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    {dishesOfTheDay.ingredients.map(({ id }) => (
                                        <Chips
                                            onClose={() =>
                                                removeIngredientFromDish({
                                                    id,
                                                    dispatch: dishesDispatch,
                                                })
                                            }
                                        >
                                            {name}
                                        </Chips>
                                    ))}

                                    <ToolBar>
                                        <Button
                                            onClick={() => {
                                                setDialogToDisplay(null)
                                            }}
                                        >
                                            {msg.get("don't save")}
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                setDialogToDisplay(null)
                                            }}
                                        >
                                            {msg.get('save')}
                                        </Button>
                                    </ToolBar>
                                </Form>
                            </>
                        ))
                    }}
                >
                    {msg.get('edit recipes')}
                </Button>
            </ToolBar>

            {renderDialog
                ? createPortal(
                      () => (
                          <FullScreenDialog>{renderDialog()}</FullScreenDialog>
                      ),
                      document.body
                  )
                : null}
        </>
    )
}
