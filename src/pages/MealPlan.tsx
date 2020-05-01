import React, { useState } from 'react'
import ScheduleNav from '@components/ScheduleNav'
import MenuOfTheDay from '@components/MenuOfTheDay'
import MenuSelectModal from '@components/MenuSelectModal'
import { getUserHue } from '../services/getUserInformations'
import { meals, recipes } from '../fixtures'
import DailyMenu from '@components/DailyMenu'
import TwoLinesInformation from '@components/TwoLinesInformation'

interface Recipe {
    name: string
    description: string
    steps: ReadonlyArray<string>
    ingredients: ReadonlyArray<{
        name: string
        meat: boolean
        from_animals: boolean
        dairy_product: boolean
        pregnant_compliant: boolean
    }>
}

interface Meal {
    user: string
    weekday: string
    typeOfMeal: string
    recipe: Recipe
    confirmed: boolean
}

const MealPlan = () => {
    const currentWeekDay = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(Date.now())

    const [currentDay, setCurrentDay] = useState(currentWeekDay)
    const handleCurrentDayChange = (day: string) => setCurrentDay(day)

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

    return (
        <>
            <ScheduleNav
                hsl={{
                    hue: getUserHue() || 0,
                    luminosity: 50,
                }}
                currentDay={currentDay}
                onChange={handleCurrentDayChange}
            />

            {/* use uuid to generate unique key */}
            <DailyMenu>
                <DailyMenu.Section
                    style={{
                        gridArea: 'starters / starters / starters / starters',
                        border: '2px dotted #ff1101',
                        marginTop: '1em',
                    }}
                >
                    <DailyMenu.Section.Title label={'starters'} />
                    <DailyMenu.Section.Dishes>
                        {starters.map(({ name, ingredients }) => (
                            <TwoLinesInformation
                                key={name}
                                first={name}
                                second={ingredients.join(', ')}
                            />
                        ))}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>

                <DailyMenu.Section style={{ gridArea: 'mainCourses' }}>
                    <DailyMenu.Section.Title label={'main course'} />
                    <DailyMenu.Section.Dishes>
                        {mainCourses.map(({ name, ingredients }) => (
                            <TwoLinesInformation
                                key={name}
                                first={name}
                                second={ingredients.join(', ')}
                            />
                        ))}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>

                <DailyMenu.Section
                    style={{
                        marginTop: '1em',
                        gridArea: 'desserts',
                        marginLeft: '1em',
                    }}
                >
                    <DailyMenu.Section.Title label={'dessert'} />
                    <DailyMenu.Section.Dishes>
                        {desserts.map(({ name, ingredients }) => (
                            <TwoLinesInformation
                                key={name}
                                first={name}
                                second={ingredients.join(', ')}
                            />
                        ))}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>

                <DailyMenu.Section
                    style={{
                        border: '2px dotted #ff1101',
                        gridArea: 'drinks',
                    }}
                >
                    <DailyMenu.Section.Title label={'drinks'} />
                    <DailyMenu.Section.Dishes>
                        {drinks.map(({ name, ingredients }) => (
                            <TwoLinesInformation
                                key={name}
                                first={name}
                                second={ingredients.join(', ')}
                            />
                        ))}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>
            </DailyMenu>
        </>
    )
}

export default MealPlan
