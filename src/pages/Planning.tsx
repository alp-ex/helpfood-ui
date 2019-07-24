import React, { useState, useEffect } from 'react'
import PlanningNav from '@components/PlanningNav'
import MenuOfTheDay from '@components/MenuOfTheDay'

const Planning = () => {
    const currentWeekDay = new Intl.DateTimeFormat('default', {
        weekday: 'long',
    }).format(Date.now())
    console.log(currentWeekDay)
    const [currentDay, setCurrentDay] = useState(currentWeekDay)
    const handleClickOnDay = (day: string) => setCurrentDay(day)

    return (
        <div>
            <div
                style={{
                    height: '6vh',
                }}
            >
                <PlanningNav
                    currentDay={currentDay}
                    onDayClick={handleClickOnDay}
                />
            </div>
            <div
                style={{
                    height: '88vh',
                }}
            >
                <MenuOfTheDay currentDay={currentDay} />
            </div>
        </div>
    )
}

export default Planning
