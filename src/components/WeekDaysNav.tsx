import React, { useState, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

export interface Props {
    daysInAWeek?: number
    weekStartAt?: number
    currentDay: string
    hsl: {
        hue: number
        luminosity: number
    }
    onChange: (day: string) => void
}

// we might want to interface a prop (for a translation purpose)
const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

const WeekDaysNav = ({
    daysInAWeek = 7,
    weekStartAt = 1,
    currentDay,
    hsl: { hue, luminosity },
    onChange,
}: Props) => {
    const sortedDayOfWeek = [
        ...daysOfTheWeek.slice(weekStartAt - 1),
        ...daysOfTheWeek.slice(0, weekStartAt - 1),
    ].slice(0, daysInAWeek)
    const [shouldDisplayAllDays, setShouldDisplayAllDays] = useState(false)
    const [currentDayIndex, setCurrentDayIndex] = useState(
        sortedDayOfWeek.findIndex(
            (day) => day.toLowerCase() === currentDay.toLowerCase()
        )
    )
    const handleClickNext = () => {
        if (currentDayIndex < daysOfTheWeek.length - 1) {
            setCurrentDayIndex(currentDayIndex + 1)
        }
    }
    const handleClickPrevious = () => {
        if (currentDayIndex > 0) {
            setCurrentDayIndex(currentDayIndex - 1)
        }
    }

    useEffect(() => {
        onChange(daysOfTheWeek[currentDayIndex].toLowerCase()),
            [currentDayIndex]
    })

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2% 2% 0',
                fontSize: '1.5em',
                color: 'rgba(255, 17, 1, 0.53)',
                width: '50vw',
                fontFamily: `'Josefin Slab', serif`,
            }}
        >
            <span
                style={{
                    minWidth: '50px',
                    minHeight: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                onClick={handleClickPrevious}
            >
                <MdChevronLeft />
            </span>

            {shouldDisplayAllDays ? (
                <ul
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                    }}
                >
                    {daysOfTheWeek.map((day, index) => (
                        <span
                            key={day}
                            style={{
                                cursor: 'pointer',
                                color:
                                    index === currentDayIndex
                                        ? 'rgba(255, 17, 1, 0.18)'
                                        : 'inherit',
                            }}
                            onClick={() => {
                                setCurrentDayIndex(index)
                                setShouldDisplayAllDays(false)
                            }}
                        >
                            {day.substring(0, 1)}
                        </span>
                    ))}
                </ul>
            ) : (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setShouldDisplayAllDays(true)
                    }}
                >
                    {daysOfTheWeek[currentDayIndex]}
                </span>
            )}

            <span
                style={{
                    minWidth: '50px',
                    minHeight: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                onClick={handleClickNext}
            >
                <MdChevronRight />
            </span>
        </div>
    )
}

export default WeekDaysNav
