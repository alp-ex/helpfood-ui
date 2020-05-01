import React, { ReactNode } from 'react'
import Section from './Section'

interface Props {
    children?: ReactNode
}

const DailyMenu = ({ children }: Props) => {
    return (
        <div
            style={{
                height: '100%',
                padding: '1em 1em 10em 1em',
                display: 'grid',
                gridTemplate: `"mainCourses mainCourses drinks" 50vh
                                "mainCourses mainCourses drinks"
                                "starters desserts drinks"
                                "starters desserts drinks"`,
            }}
        >
            {children}
        </div>
    )
}

DailyMenu.Section = Section

export default DailyMenu
