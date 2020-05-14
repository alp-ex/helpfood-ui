import React, { useState, useEffect, useReducer } from 'react'
import WeekDaysNav from '@components/ui/WeekDaysNav'
import DailyMenu from '@components/ui/DailyMenu'
import TwoLinesInformation from '@components/ui/TwoLinesInformation'
import Button from '@components/ui/Button'
import { AddIcon, SVGIcon } from '@components/icons'
import MultiSelect from '@components/ui/MultiSelect'

const msg = Object.freeze({
    selectDishes: 'Dishes',
    selectIngredients: 'Dishes',
})

const {
    SUBMIT_MENU_CHANGES,
    ABORT_MENU_CHANGES,
    START_MENU_CHANGES,
    SAVE_MENU_FORM_STATE,
    SAVE_UPDATED_DISH_FORM_STATE,
    START_DISHES_CREATION,
} = Object.freeze({
    SAVE_UPDATED_DISH_FORM_STATE:
        'save current state of changes made to a particular dish in edit mode',
    START_DISHES_CREATION: 'start creating dishes in edit mode',
    SAVE_MENU_FORM_STATE: 'save current state of changes made in edit mode',
    SUBMIT_MENU_CHANGES: 'menu changes has been submitted',
    ABORT_MENU_CHANGES: 'menu changes has been aborted',
    START_MENU_CHANGES: 'we ran edit mode for one menu section',
})

const mealPlanReducer = (prevState, { type, payload = null }) => {
    switch (type) {
        case SUBMIT_MENU_CHANGES: {
            // add optimistic render
            return { ...prevState, sectionInEditMode: null }
        }
        case ABORT_MENU_CHANGES: {
            return { ...prevState, sectionInEditMode: null }
        }
        case START_MENU_CHANGES: {
            return {
                ...prevState,
                sectionInEditMode: payload.sectionInEditMode,
            }
        }
        case START_DISHES_CREATION: {
            return {
                ...prevState,
                dishesToCreate: [
                    ...prevState.dishesToCreate,
                    payload.dishesToCreate,
                ],
            }
        }
        case SAVE_MENU_FORM_STATE: {
            return {
                ...prevState,
                dishesToCreate: payload.dishesToCreate,
                dishesToDelete: payload.dishesToDelete,
                dishesToUpdate: payload.dishesToUpdate,
            }
        }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

const MealPlan = () => {
    const currentWeekDay = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(Date.now())
    const [currentDay, setCurrentDay] = useState(currentWeekDay)
    const handleCurrentDayChange = (day: string) => {
        setCurrentDay(day)
    }
    const [{ sectionInEditMode, dishesToCreate }, dispatch] = useReducer(
        mealPlanReducer,
        {
            sectionInEditMode: null,
            dishesToCreate: [],
        }
    )

    const { starters, mainCourses, desserts, drinks } = {
        starters: [{ name: 'Jamon de Parma', ingredients: ['jamon', 'oil'] }],
        mainCourses: [
            {
                name: 'Basque Chicken',
                ingredients: ['chiken', 'basque', 'mozza'],
            },
            {
                name: 'Celtic Couscous',
                ingredients: ['couscous', 'pork', 'bourbon'],
            },
            {
                name: 'French Blanquette',
                ingredients: ['cream', 'meat', 'mushroom'],
            },
            { name: 'Osso Bucco', ingredients: ['meat', 'tomato', 'persil'] },
            {
                name: 'Indian Curry',
                ingredients: ['curry', 'chicken', 'cream'],
            },
            { name: 'Carrot pie', ingredients: ['carrot', 'eggs', 'cream'] },
            { name: 'Veggie Salad', ingredients: ['laitues', 'eggs', 'oil'] },
            { name: 'Carrot pie', ingredients: ['carrot', 'eggs', 'cream'] },
        ],
        desserts: [
            { name: 'Tiramisu', ingredients: ['mascarpone', 'biscuits'] },
        ],
        drinks: [
            {
                name: 'Carrot milkshake',
                ingredients: ['carrot', 'kiwi', 'milk'],
            },
            {
                name: 'Virgin Mojito',
                ingredients: ['mint', 'sugar', 'ice'],
            },
        ],
    }

    const mealsPlan = new Map([
        [
            'thursday',
            {
                mealsSection: [
                    {
                        category: 'starters',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                    {
                        category: 'desserts',
                        dishes: [],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'mainCourses',
                        dishes: [mainCourses[5], mainCourses[0]],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'drinks',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                ],
            },
        ],
        [
            'tuesday',
            {
                mealsSection: [
                    {
                        category: 'starters',
                        dishes: [],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'desserts',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                    {
                        category: 'mainCourses',
                        dishes: [
                            mainCourses[5],
                            mainCourses[3],
                            mainCourses[0],
                        ],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'drinks',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                ],
            },
        ],
        [
            'sunday',
            {
                mealsSection: [
                    {
                        category: 'starters',
                        dishes: [],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'desserts',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                    {
                        category: 'mainCourses',
                        dishes: [
                            mainCourses[5],
                            mainCourses[3],
                            mainCourses[0],
                        ],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'drinks',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                ],
            },
        ],
        [
            'saturday',
            {
                mealsSection: [
                    {
                        category: 'starters',
                        dishes: [],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'desserts',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                    {
                        category: 'mainCourses',
                        dishes: [
                            mainCourses[5],
                            mainCourses[3],
                            mainCourses[0],
                        ],
                        style: {
                            highlighted: false,
                        },
                    },
                    {
                        category: 'drinks',
                        dishes: [],
                        style: {
                            highlighted: true,
                        },
                    },
                ],
            },
        ],
    ])

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
                    .mealsSection.map(({ category, dishes, style }) =>
                        sectionInEditMode === category ? (
                            <DailyMenu.Section.EditForm
                                key={category}
                                onSubmitButtonClick={() => {
                                    dispatch({
                                        type: SUBMIT_MENU_CHANGES,
                                    })
                                }}
                                onAbortButtonClick={() => {
                                    dispatch({ type: ABORT_MENU_CHANGES })
                                }}
                            >
                                <DailyMenu.Section.Title label={category} />
                                <DailyMenu.Section.Dishes>
                                    {dishes.map(({ name, ingredients }) => (
                                        <TwoLinesInformation
                                            isInEditMode
                                            key={name}
                                            title={name}
                                            content={ingredients.join(', ')}
                                            onChange={({ title, content }) => {
                                                dispatch({
                                                    type: SAVE_UPDATED_DISH_FORM_STATE,
                                                    payload: {
                                                        category,
                                                        name: title,
                                                        ingredients: content,
                                                    },
                                                })
                                            }}
                                        />
                                    ))}

                                    <div style={{ display: 'flex' }}>
                                        <MultiSelect
                                            loadOptions={() => {}}
                                            createOptions={() => {}}
                                            // get intl context
                                            placeholder={msg.selectDishes}
                                        />

                                        <MultiSelect
                                            loadOptions={() => {}}
                                            createOptions={() => {}}
                                            placeholder={msg.selectIngredients}
                                        />
                                    </div>
                                </DailyMenu.Section.Dishes>
                            </DailyMenu.Section.EditForm>
                        ) : (
                            <DailyMenu.Section
                                key={category}
                                onEditButtonClick={() => {
                                    dispatch({
                                        type: START_MENU_CHANGES,
                                        payload: {
                                            sectionInEditMode: category,
                                        },
                                    })
                                }}
                                rootStyle={{
                                    gridArea: category,
                                    border: style.highlighted
                                        ? '2px dotted #ff1101'
                                        : 'inherit',
                                    marginTop: '1em',
                                }}
                            >
                                <DailyMenu.Section.Title label={category} />
                                <DailyMenu.Section.Dishes>
                                    {dishes.map(({ name, ingredients }) => (
                                        <TwoLinesInformation
                                            key={name}
                                            title={name}
                                            content={ingredients.join(', ')}
                                        />
                                    ))}
                                </DailyMenu.Section.Dishes>
                            </DailyMenu.Section>
                        )
                    )}
            </DailyMenu>
        </>
    )
}

export default MealPlan
