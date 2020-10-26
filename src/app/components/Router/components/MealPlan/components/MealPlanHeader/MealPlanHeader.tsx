import {
    AngularBackground,
    IconWrapper,
    ButtonIcon,
} from '@ui-components/atoms'
import { FullScreenListSelect } from '@ui-components/molecules'
import { setCurrentDay, useCalendar } from 'api/providers/Calendar'
import React, { ReactElement, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdModeEdit as EditIcon } from 'react-icons/md'
import { AddMealForm } from './components'

export default function MealPlanHeader(): ReactElement {
    const {
        state: { weekDays, selectedDay },
        dispatch: calendarDispatch,
    } = useCalendar()
    const [isAddMealFormVisible, setIsAddMealFormVisible] = useState(false)

    return (
        <>
            <AngularBackground bgcolorOption="light">
                <FullScreenListSelect
                    items={weekDays.map((dayName) => ({
                        label: dayName,
                        value: dayName,
                    }))}
                    onSelect={(day) => {
                        setCurrentDay({
                            dispatch: calendarDispatch,
                            day,
                        })
                    }}
                    selected={{ label: selectedDay, value: selectedDay }}
                />

                <ButtonIcon
                    onClick={() => {
                        setIsAddMealFormVisible(true)
                    }}
                >
                    <IconWrapper colorOption="main">
                        <EditIcon />
                    </IconWrapper>
                </ButtonIcon>
            </AngularBackground>

            {isAddMealFormVisible
                ? createPortal(
                      <AddMealForm
                          onClose={() => {
                              setIsAddMealFormVisible(false)
                          }}
                      />,
                      document.body
                  )
                : null}
        </>
    )
}
