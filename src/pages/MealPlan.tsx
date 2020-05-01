import React, { useState } from 'react'
import WeekDaysNav from '@components/WeekDaysNav'
import DailyMenu from '@components/DailyMenu'
import TwoLinesInformation from '@components/TwoLinesInformation'

const MealPlan = () => {
    const currentWeekDay = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(Date.now())

    const [currentDay, setCurrentDay] = useState(currentWeekDay)
    const handleCurrentDayChange = (day: string) => {
        setCurrentDay(day)
    }

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

    const days = {
        monday: {
            starters: [],
            mainCourses: [mainCourses[0], mainCourses[4]],
            desserts: [],
            drinks: [drinks[0]],
        },
        tuesday: {
            starters: [starters[0]],
            mainCourses: [mainCourses[5], mainCourses[3], mainCourses[0]],
            desserts: [desserts[0]],
            drinks: [],
        },
        wednesday: {
            starters: [],
            mainCourses: [mainCourses[0], mainCourses[4]],
            desserts: [],
            drinks: [drinks[0]],
        },
        thursday: {
            starters,
            mainCourses,
            desserts,
            drinks,
        },
        friday: {
            starters: [],
            mainCourses: [mainCourses[0], mainCourses[4]],
            desserts: [],
            drinks: [drinks[0]],
        },
        saturday: {
            starters: [],
            mainCourses: [mainCourses[0], mainCourses[4]],
            desserts: [],
            drinks: [drinks[0]],
        },
        sunday: {
            starters: [],
            mainCourses: [mainCourses[0], mainCourses[4]],
            desserts: [],
            drinks: [drinks[0]],
        },
    }

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

            {/* use uuid to generate unique key because we cant trust be ? */}
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
                        {days[currentDay.toLowerCase()].starters.map(
                            ({ name, ingredients }) => (
                                <TwoLinesInformation
                                    key={name}
                                    first={name}
                                    second={ingredients.join(', ')}
                                />
                            )
                        )}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>

                <DailyMenu.Section style={{ gridArea: 'mainCourses' }}>
                    <DailyMenu.Section.Title label={'main course'} />
                    <DailyMenu.Section.Dishes>
                        {days[currentDay.toLowerCase()].mainCourses.map(
                            ({ name, ingredients }) => (
                                <TwoLinesInformation
                                    key={name}
                                    first={name}
                                    second={ingredients.join(', ')}
                                />
                            )
                        )}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>

                <DailyMenu.Section
                    style={{
                        gridArea: 'desserts',
                        margin: '3em',
                    }}
                >
                    <DailyMenu.Section.Title label={'dessert'} />
                    <DailyMenu.Section.Dishes>
                        {days[currentDay.toLowerCase()].desserts.map(
                            ({ name, ingredients }) => (
                                <TwoLinesInformation
                                    key={name}
                                    first={name}
                                    second={ingredients.join(', ')}
                                />
                            )
                        )}
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
                        {days[currentDay.toLowerCase()].drinks.map(
                            ({ name, ingredients }) => (
                                <TwoLinesInformation
                                    key={name}
                                    first={name}
                                    second={ingredients.join(', ')}
                                />
                            )
                        )}
                    </DailyMenu.Section.Dishes>
                </DailyMenu.Section>
            </DailyMenu>
        </>
    )
}

export default MealPlan
