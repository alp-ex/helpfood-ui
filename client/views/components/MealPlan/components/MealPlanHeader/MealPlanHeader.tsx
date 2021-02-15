import { AngularBackground, IconWrapper, ButtonIcon } from '~/ui-components/atoms'
import { FullScreenListSelect } from '~/ui-components/molecules'
import { setCurrentDay, useCalendar } from '~/services/WeekDays'
import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdModeEdit as EditIcon } from 'react-icons/md'
import { AddMealForm } from './components'

export default function MealPlanHeader(): ReactElement {
    const {
        state: { weekDays, selectedWeekDay },
        dispatch: calendarDispatch,
    } = useCalendar()
    const [isAddMealFormVisible, setIsAddMealFormVisible] = useState(false)

    useEffect(() => {
        if (isAddMealFormVisible) {
            document.body.style.position = 'fixed'
        }

        return () => {
            document.body.style.position = 'inherit'
        }
    }, [isAddMealFormVisible])
    return (
        <>
            <AngularBackground bgcolorOption="light">
                <FullScreenListSelect<number>
                    items={weekDays.map(({ label, value }) => ({
                        label,
                        value,
                    }))}
                    onSelect={({
                        label,
                        value,
                    }: {
                        label: string
                        value: number
                    }) => {
                        setCurrentDay({
                            dispatch: calendarDispatch,
                            weekday: { label, value },
                        })
                    }}
                    selected={{
                        label: selectedWeekDay.label,
                        value: selectedWeekDay.value,
                    }}
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
