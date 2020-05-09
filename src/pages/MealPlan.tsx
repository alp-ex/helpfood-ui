import React, { useState, useEffect, useReducer } from 'react'
import WeekDaysNav from '@components/ui/WeekDaysNav'
import DailyMenu from '@components/ui/DailyMenu'
import TwoLinesInformation from '@components/ui/TwoLinesInformation'

const {
    SUBMIT_MENU_CHANGES,
    ABORT_MENU_CHANGES,
    START_MENU_CHANGES,
    SAVE_MENU_FORM_STATE,
} = Object.freeze({
    SAVE_MENU_FORM_STATE: 'save current state of changes made in edit mode',
    SUBMIT_MENU_CHANGES: 'menu changes has been submitted',
    ABORT_MENU_CHANGES: 'menu changes has been aborted',
    START_MENU_CHANGES: 'we ran edit mode for one menu section',
})

const mealPlanReducer = (prevState, { type, payload = null }) => {
    switch (type) {
        case SUBMIT_MENU_CHANGES: {
            // add optimistic render
            return { ...prevState }
        }
        case ABORT_MENU_CHANGES: {
            return { ...prevState }
        }
        case START_MENU_CHANGES: {
            return { ...prevState, sectionInEditMode: payload }
        }
        case SAVE_MENU_FORM_STATE: {
            return { ...prevState, currentFormState: payload }
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
    const [{ sectionInEditMode, currentFormState }, dispatch] = useReducer(
        mealPlanReducer,
        {
            sectionInEditMode: null,
            currentFormState: null,
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
            'monday',
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
            'wednesday',
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
                                                    type: SAVE_MENU_FORM_STATE,
                                                    payload: {
                                                        category,
                                                        name: title,
                                                        ingredients: content,
                                                    },
                                                })
                                            }}
                                        />
                                    ))}
                                </DailyMenu.Section.Dishes>
                            </DailyMenu.Section.EditForm>
                        ) : (
                            <DailyMenu.Section
                                key={category}
                                onEditButtonClick={() => {
                                    dispatch({
                                        type: START_MENU_CHANGES,
                                        payload: category,
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
