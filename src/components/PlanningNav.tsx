import React, { useState } from 'react'

export interface Props {
    dayInWeek?: number
    dayStartAt?: number
    currentDay: string
    onDayClick: (day: string) => void
    listBackgroundColor?: string
    currentDayColor?: string
    dayColor?: string
    height: string
}

const daysInWeek = [
    'Monday',
    'Thursday',
    'Wednesday',
    'Tuesday',
    'Friday',
    'Saturday',
    'Sunday',
]

const PlanningNav = ({
    dayInWeek = 7,
    dayStartAt = 1,
    currentDay,
    onDayClick,
    listBackgroundColor,
    currentDayColor,
    dayColor,
    height
}: Props) => {
    const sortedDayOfWeek = [
        ...daysInWeek.slice(dayStartAt - 1),
        ...daysInWeek.slice(0, dayStartAt - 1),
    ].slice(0, dayInWeek)

    return (
        <ul
            style={{
                height: height,
                maxHeight: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                background: listBackgroundColor || '#ef698b',
                fontWeight: 700,
                fontFamily: 'none',
            }}
        >
            {sortedDayOfWeek.map(day => (
                <li
                    onClick={() => onDayClick(day)}
                    key={day}
                    style={{
                        width: `calc(100%/${sortedDayOfWeek.length})`,
                        color:
                            day === currentDay
                                ? currentDayColor || '#7fff00'
                                : dayColor || '#e8daf59c',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '14px 0',
                    }}
                >
                    {day}
                </li>
            ))}
        </ul>
    )
}

export default PlanningNav
