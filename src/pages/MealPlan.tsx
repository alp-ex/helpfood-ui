import React, { useState, useReducer, Fragment } from 'react'
import WeekDaysNav from '@components/ui/WeekDaysNav'
import DailyMenu from '@components/ui/DailyMenu'
import TwoLinesInformation from '@components/ui/TwoLinesInformation'
import { AddIcon, SVGIcon } from '@components/icons'
import DishesList from '@components/ui/DishesList'
import { mealsPlan } from 'fixtures/meals'
import { createPortal } from 'react-dom'

const msg = Object.freeze({
    selectDishes: 'Dishes',
    selectIngredients: 'Dishes',
    editDishes: 'Edit Dishes',
    createDishes: 'Create Dishes',
})

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

const DishEditingForm = ({ id, name, ingredients, onClose }) => {
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
            <span>{`${id}-${name}-${ingredients}`}</span>
            <span
                style={{ cursor: 'pointer', padding: '1em' }}
                onClick={onClose}
            >
                X
            </span>
        </div>
    )
}

const DishRemovalForm = ({ id, onClose }) => {
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
            <span>{`${id}-to remove`}</span>
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
                {mealsPlan
                    .get(currentDay.toLowerCase())
                    .mealsSection.map(({ category, dishes, style }) => (
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
                                    <Fragment key={id}>
                                        {swipedDirection === 'right' &&
                                        swipedPanelIndex === id ? (
                                            <span>edit</span>
                                        ) : null}

                                        <DishesList.SwipeableItem
                                            onSwipedRight={() => {
                                                setDialogToDisplay(
                                                    ({ onClose }) => (
                                                        <DishEditingForm
                                                            id={id}
                                                            name={name}
                                                            ingredients={
                                                                ingredients
                                                            }
                                                            onClose={onClose}
                                                        />
                                                    )
                                                )
                                                // we might want to get initial state from the top
                                                setSwipePanelIndexToDisplay({
                                                    swipedDirection: '',
                                                    swipedPanelIndex: '',
                                                })
                                            }}
                                            onSwipedLeft={() => {
                                                setDialogToDisplay(
                                                    ({ onClose }) => (
                                                        <DishRemovalForm
                                                            id={id}
                                                            onClose={onClose}
                                                        />
                                                    )
                                                )
                                                setSwipePanelIndexToDisplay({
                                                    swipedDirection: '',
                                                    swipedPanelIndex: '',
                                                })
                                            }}
                                            onSwiping={({ dir }) => {
                                                setSwipePanelIndexToDisplay({
                                                    dir,
                                                    id,
                                                })
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
                                            <span>remove</span>
                                        ) : null}
                                    </Fragment>
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
                    ))}
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
