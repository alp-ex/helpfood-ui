import React, { useState, useReducer, Fragment } from 'react'
import WeekDaysNav from '@components/ui/WeekDaysNav'
import DailyMenu from '@components/ui/DailyMenu'
import TwoLinesInformation from '@components/ui/TwoLinesInformation'
import { DeleteIcon, EditIcon, AddIcon, SVGIcon } from '@components/icons'
import DishesList from '@components/ui/DishesList'
import { createPortal } from 'react-dom'
import {
    useMealPlanState,
    useMealPlanDispatch,
    updateMeals,
} from '@components/providers/MealPlanContext'

const AddDishesForm = ({ category, onClose }) => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                background: '#cecece59',
                top: '0',
            }}
        >
            <span>{`${category}-to add`}</span>
            <span
                style={{ cursor: 'pointer', padding: '1em' }}
                onClick={onClose}
            >
                X
            </span>
        </div>
    )
}

const DishEditingForm = ({ id, name, ingredients, onClose, onSubmit }) => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                background: '#cecece59',
                top: '0',
            }}
        >
            <form>
                <span>{`${id}-${name}-${ingredients}`}</span>
                <button onSubmit={onSubmit}>ok</button>
            </form>

            <span
                style={{ cursor: 'pointer', padding: '1em' }}
                onClick={onClose}
            >
                X
            </span>
        </div>
    )
}

const MealPlan = () => {
    const currentWeekDay = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(Date.now())
    const [currentDay, setCurrentDay] = useState(currentWeekDay)
    const handleCurrentDayChange = (day: string) => {
        setCurrentDay(day)
    }

    const { meals } = useMealPlanState()
    const mealPlanDispatch = useMealPlanDispatch()

    const [renderDialog, setDialogToDisplay] = useReducer(
        (prevState, action) => {
            return JSON.stringify(prevState) !== JSON.stringify(action)
                ? action
                : prevState
        },
        null
    )
    const [
        { swipedDirection, swipedPanelIndex },
        setSwipePanelIndexToDisplay,
    ] = useReducer(
        (prevState, action) => {
            return JSON.stringify(prevState) !== JSON.stringify(action)
                ? {
                      swipedDirection: action.dir,
                      swipedPanelIndex: action.id,
                  }
                : prevState
        },
        {
            swipedDirection: '',
            swipedPanelIndex: '',
        }
    )

    return (
        <>
            <WeekDaysNav
                hsl={{
                    hue: 0,
                    luminosity: 50,
                }}
                currentDay={currentDay}
                onChange={handleCurrentDayChange}
            />

            <DailyMenu>
                {meals[currentDay.toLowerCase()].mealsSection.map(
                    ({ category, dishes, style }) => (
                        <DailyMenu.Section
                            key={category}
                            rootStyle={{
                                gridArea: category,
                                border: style.highlighted
                                    ? '2px dotted #ff1101'
                                    : 'inherit',
                                marginTop: '1em',
                            }}
                        >
                            <DailyMenu.Section.Title label={category} />

                            <DishesList>
                                {dishes.map(({ id, name, ingredients }) => (
                                    <li
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            cursor: 'pointer',
                                        }}
                                        key={id}
                                    >
                                        {swipedDirection === 'right' &&
                                        swipedPanelIndex === id ? (
                                            <SVGIcon
                                                onClick={() => {
                                                    setDialogToDisplay(
                                                        ({ onClose }) => (
                                                            <DishEditingForm
                                                                onSubmit={({
                                                                    editedName,
                                                                    editedIngredients,
                                                                }) => {
                                                                    updateMeals(
                                                                        {
                                                                            meals: {
                                                                                day: currentDay,
                                                                                category,
                                                                                dish: {
                                                                                    id,
                                                                                    name: editedName,
                                                                                    ingredients: editedIngredients,
                                                                                },
                                                                            },
                                                                            prevMeals: meals,
                                                                            dispatch: mealPlanDispatch,
                                                                            action:
                                                                                'edit',
                                                                        }
                                                                    )
                                                                }}
                                                                id={id}
                                                                name={name}
                                                                ingredients={
                                                                    ingredients
                                                                }
                                                                onClose={
                                                                    onClose
                                                                }
                                                            />
                                                        )
                                                    )
                                                }}
                                                style={{
                                                    textTransform: 'uppercase',
                                                    height: '3em',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '3em',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <EditIcon
                                                    style={{
                                                        width: '1em',
                                                        height: 'auto',
                                                        cursor: 'pointer',
                                                        alignSelf: 'baseline',
                                                    }}
                                                />
                                            </SVGIcon>
                                        ) : null}

                                        <DishesList.SwipeableItem
                                            styles={{ root: { flex: 1 } }}
                                            onSwipedRight={() => {
                                                if (
                                                    swipedDirection ===
                                                        'left' &&
                                                    swipedPanelIndex === id
                                                ) {
                                                    setSwipePanelIndexToDisplay(
                                                        {
                                                            dir: '',
                                                            id: '',
                                                        }
                                                    )
                                                } else {
                                                    setSwipePanelIndexToDisplay(
                                                        {
                                                            dir: 'right',
                                                            id,
                                                        }
                                                    )
                                                }
                                            }}
                                            onSwipedLeft={() => {
                                                if (
                                                    swipedDirection ===
                                                        'right' &&
                                                    swipedPanelIndex === id
                                                ) {
                                                    setSwipePanelIndexToDisplay(
                                                        {
                                                            dir: '',
                                                            id: '',
                                                        }
                                                    )
                                                } else {
                                                    setSwipePanelIndexToDisplay(
                                                        {
                                                            dir: 'left',
                                                            id,
                                                        }
                                                    )
                                                }
                                            }}
                                        >
                                            <TwoLinesInformation
                                                key={name}
                                                title={name}
                                                content={ingredients.join(', ')}
                                            />
                                        </DishesList.SwipeableItem>

                                        {swipedDirection === 'left' &&
                                        swipedPanelIndex === id ? (
                                            <SVGIcon
                                                onClick={() => {
                                                    updateMeals({
                                                        dispatch: useMealPlanDispatch,
                                                        meals: {
                                                            day: currentDay,
                                                            category,
                                                            dish: {
                                                                id,
                                                            },
                                                        },
                                                        prevMeals: meals,
                                                        action: 'delete',
                                                    })
                                                }}
                                                style={{
                                                    textTransform: 'uppercase',
                                                    height: '3em',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '3em',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <DeleteIcon
                                                    style={{
                                                        width: '1em',
                                                        height: 'auto',
                                                        cursor: 'pointer',
                                                        alignSelf: 'baseline',
                                                    }}
                                                />
                                            </SVGIcon>
                                        ) : null}
                                    </li>
                                ))}
                            </DishesList>

                            <SVGIcon>
                                <AddIcon
                                    onClick={() => {
                                        setDialogToDisplay(({ onClose }) => (
                                            <AddDishesForm
                                                onClose={onClose}
                                                category={category}
                                            />
                                        ))
                                    }}
                                    style={{
                                        width: '1em',
                                        height: 'auto',
                                        cursor: 'pointer',
                                        alignSelf: 'baseline',
                                    }}
                                />
                            </SVGIcon>
                        </DailyMenu.Section>
                    )
                )}
            </DailyMenu>

            {/* we might want to create a dialog ui component which is tp to body by default */}
            {renderDialog
                ? createPortal(
                      renderDialog({ onClose: () => setDialogToDisplay(null) }),
                      document.body
                  )
                : null}
        </>
    )
}

export default MealPlan
