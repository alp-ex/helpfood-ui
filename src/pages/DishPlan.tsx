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
    addIngredientToDish,
    removeIngredientFromDish,
    setDishCategory,
    useDishesState,
} from '@providers/DishesContext'
import {
    addDishToPlan,
    removeDishFromPlan,
    useDishPlanState,
    undoDishPlanChanges,
} from '@providers/DishPlanContext'
import debounce from '@utils/debounce'
import MenuList from 'lib/ui-components/MenuList'
import Chips from 'lib/ui-components/Chips'
import Label from 'lib/ui-components/Label'

const msg = new Map([
    ['settings', 'Settings'],
    ['edit plan', 'Edit plan'],
    ['edit recipes', 'Edit recipes'],
    ['type a dish name', 'Type a dish name'],
    ['finish', 'Finish'],
    ['undo changes', 'Undo changes'],
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
    const { plannedDishes } = useDishPlanState()

    const handleDishSearchInputChange = (event) => {
        debounce(fetchDishes({ q: event.target.value }))
    }
    const handleCategorySearchInputChange = (event) => {
        debounce(fetchCategories({ q: event.target.value }))
    }
    const handleIngredientSearchInputChange = (event) => {
        debounce(fetchIngredients({ q: event.target.value }))
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
                        // EDIT DISH PLAN DIALOG FORM
                        undoableActions.current = []

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
                                                ({ id, name }) => (
                                                    <MenuList.Item
                                                        onClick={() => {
                                                            addDishToPlan({
                                                                id,
                                                                day: currentDay,
                                                            })

                                                            undoableActions.current.push(
                                                                () =>
                                                                    removeDishFromPlan(
                                                                        {
                                                                            id,
                                                                            day: currentDay,
                                                                        }
                                                                    )
                                                            )
                                                        }}
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    {plannedDishes
                                        .filter(
                                            (dish) => dish.day === currentDay
                                        )
                                        .map(({ id, name }) => (
                                            <Chips
                                                onClose={() => {
                                                    removeDishFromPlan({
                                                        id,
                                                        day: currentDay,
                                                    })

                                                    undoableActions.current.push(
                                                        () =>
                                                            addDishToPlan({
                                                                id,
                                                                day: currentDay,
                                                            })
                                                    )
                                                }}
                                            >
                                                {name}
                                            </Chips>
                                        ))}

                                    <ToolBar>
                                        <Button
                                            onClick={() => {
                                                undoableActions.current.forEach(
                                                    (action) => action()
                                                )
                                                undoableActions.current = []
                                            }}
                                        >
                                            {msg.get('undo changes')}
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                setDialogToDisplay(null)
                                                undoableActions.current = []
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
                        // EDIT DISHES DIALOG FORM
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

                                    <Label>{msg.get('edit plan')}</Label>
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
                                            {fetchedDishes.map(({ id }) => (
                                                <MenuList.Item
                                                    onClick={() =>
                                                        addDishToPlan({
                                                            id,
                                                        })
                                                    }
                                                >
                                                    {name}
                                                </MenuList.Item>
                                            ))}
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
                                                ({ id }) => (
                                                    <MenuList.Item
                                                        onClick={() =>
                                                            setDishCategory({
                                                                id,
                                                            })
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
                                                ({ id }) => (
                                                    <MenuList.Item
                                                        onClick={() =>
                                                            addIngredientToDish(
                                                                {
                                                                    id,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    {dishIngredientsInEdition.map(({ id }) => (
                                        <Chips
                                            onClose={() =>
                                                removeIngredientFromDish({
                                                    id,
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
                                            {msg.get("don's save")}
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
