import React, { ReactElement } from 'react'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'
import WeekDayPicker from '@ui-components/molecules/WeekDayPicker'
import {
    useCalendarState,
    useCalendarDispatch,
    setCurrentDay,
} from 'api/calendar/context'
import { Link } from 'react-router-dom'
import { Routes } from 'Router'
import { useDishPlanState } from 'api/dishPlan/context'
import Label from '@ui-components/atoms/Label'
import LabelledList from '@ui-components/molecules/LabelledList'

const msg = new Map([['actions', 'Actions']])

export default function DailyMenu(): ReactElement {
    const { currentDay, weekDays } = useCalendarState()
    const calendarDispatch = useCalendarDispatch()
    const { dishesWeekPlan } = useDishPlanState()

    return (
        <>
            <ToolBar
                style={{
                    root: {
                        top: 0,
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <WeekDayPicker
                    weekDays={weekDays}
                    pickDay={(day) =>
                        setCurrentDay({
                            dispatch: calendarDispatch,
                            day,
                        })
                    }
                    pickedDay={currentDay}
                />

                <Link to={Routes.ACTIONS}>
                    <Button noBorders>{msg.get('actions')}</Button>
                </Link>
            </ToolBar>

            {dishesWeekPlan[currentDay.toLowerCase()].map(
                ({ category, dishes, id }) => (
                    <LabelledList
                        key={id}
                        renderLabel={() => <Label>{category}</Label>}
                        items={dishes.map(
                            ({ id: dishId, ingredients, name }) => ({
                                id: dishId,
                                render: () => (
                                    <LabelledList
                                        renderLabel={() => (
                                            <Label>{name}</Label>
                                        )}
                                        items={ingredients.map(
                                            ({
                                                name: ingredientName,
                                                id: ingredientId,
                                            }) => ({
                                                id: ingredientId,
                                                render: () => (
                                                    <Label>
                                                        {ingredientName}
                                                    </Label>
                                                ),
                                            })
                                        )}
                                    />
                                ),
                            })
                        )}
                    />
                )
            )}
        </>
    )
}
