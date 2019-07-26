import React, { useState, useEffect } from 'react'
import PlanningNav from '@components/PlanningNav'
import MenuOfTheDay from '@components/MenuOfTheDay'

const Planning = () => {
    const currentWeekDay = new Intl.DateTimeFormat('default', {
        weekday: 'long',
    }).format(Date.now())
    const [currentDay, setCurrentDay] = useState(currentWeekDay)
    const handleClickOnDay = (day: string) => setCurrentDay(day)

    return (
        <div>
                <PlanningNav
                    height='6vh'
                    currentDay={currentDay}
                    onDayClick={handleClickOnDay}
                />
                <MenuOfTheDay height='88vh' currentDay={currentDay} />
        </div>
    )
}

export default Planning
