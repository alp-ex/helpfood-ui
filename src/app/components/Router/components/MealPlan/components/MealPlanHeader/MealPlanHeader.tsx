import {
    AngularBackground,
    IconWrapper,
    ButtonIcon,
} from '@ui-components/atoms'
import {
    FullScreenButtonList,
    FullScreenListSelect,
} from '@ui-components/molecules'
import { setCurrentDay, useCalendar } from 'api/providers/Calendar'
import React, { ReactElement, useState } from 'react'
import { HiOutlineMenuAlt4 as MenuIcon } from 'react-icons/hi'

interface Props {
    labels?: {
        editPlanButton?: string
    }
}
export default function MealPlanHeader({
    labels: {} = {},
}: Props): ReactElement {
    const {
        state: { weekDays, selectedDay },
        dispatch: calendarDispatch,
    } = useCalendar()
    const [isFullScreenButtonVisible, setFullScreenButtonVisible] = useState(
        false
    )

    return (
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
                renderIcon={() => (
                    <IconWrapper colorOption="main">
                        <MenuIcon />
                    </IconWrapper>
                )}
                onClick={() => {
                    setFullScreenButtonVisible(true)
                }}
            />

            {isFullScreenButtonVisible ? (
                <FullScreenButtonList
                    buttons={[
                        {
                            label: 'add meal',
                            onClick: () => {
                                setFullScreenButtonVisible(false)
                            },
                        },
                        {
                            label: 'remove meals',
                            onClick: () => {
                                setFullScreenButtonVisible(false)
                            },
                        },
                    ]}
                    onClose={() => {
                        setFullScreenButtonVisible(false)
                    }}
                />
            ) : null}
        </AngularBackground>
    )
}
